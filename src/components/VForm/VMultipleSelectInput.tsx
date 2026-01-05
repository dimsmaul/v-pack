// src/components/VMultipleSelectInput/VMultipleSelectInput.tsx
import React, { useState, useCallback, useEffect } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Pressable,
  ActivityIndicator,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { ChevronDown, X } from 'lucide-react-native';
import VInput from './VInput';
import VDrawer from '../VDrawer/VDrawer';
import VCheckbox from './VCheckbox';
import { useTheme } from '../../theme/ThemeProvider';

export interface MultiSelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  description?: string;
}

export interface VMultipleSelectInputProps {
  value?: (string | number)[];
  onChange?: (value: (string | number)[]) => void;

  // Static options (client-side filter)
  options?: MultiSelectOption[];

  // Infinite query mode (server-side)
  onSearch?: (query: string) => void;
  onLoadMore?: () => void;
  isLoading?: boolean;
  isFetchingMore?: boolean;
  hasMore?: boolean;

  placeholder?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  drawerTitle?: string;
  emptyMessage?: string;
  maxDisplayCount?: number;
  selectAllOption?: boolean;
  searchDebounce?: number;
}

const VMultipleSelectInput: React.FC<VMultipleSelectInputProps> = ({
  value = [],
  onChange,
  options = [],
  onSearch,
  onLoadMore,
  isLoading = false,
  isFetchingMore = false,
  hasMore = false,
  placeholder = 'Pilih opsi',
  label,
  error = false,
  errorMessage,
  disabled = false,
  clearable = true,
  searchable = false,
  drawerTitle = 'Pilih Opsi',
  emptyMessage = 'Tidak ada opsi tersedia',
  maxDisplayCount = 3,
  selectAllOption = false,
  searchDebounce = 500,
}) => {
  const { tw } = useTheme();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>(
    value || []
  );

  // Debounced search
  const [searchTimeoutId, setSearchTimeoutId] = useState<NodeJS.Timeout | null>(
    null
  );

  // Get display value
  const getDisplayValue = () => {
    if (!value || value.length === 0) return '';

    if (value.length <= maxDisplayCount) {
      // Show all labels
      return value
        .map((val) => options.find((opt) => opt.value === val)?.label)
        .filter(Boolean)
        .join(', ');
    } else {
      // Show "n item selected"
      return `${value.length} item dipilih`;
    }
  };

  const displayValue = getDisplayValue();

  // Client-side filter (if no onSearch provided)
  const filteredOptions =
    !onSearch && searchable
      ? options.filter((option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options;

  // Handle search with debounce
  const handleSearchChange = useCallback(
    (query: string) => {
      setSearchQuery(query);

      // If server-side search
      if (onSearch) {
        // Clear previous timeout
        if (searchTimeoutId) {
          clearTimeout(searchTimeoutId);
        }

        // Set new timeout
        const timeoutId = setTimeout(() => {
          onSearch(query);
        }, searchDebounce);

        setSearchTimeoutId(timeoutId);
      }
    },
    [onSearch, searchDebounce, searchTimeoutId]
  );

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutId) {
        clearTimeout(searchTimeoutId);
      }
    };
  }, [searchTimeoutId]);

  // Handle scroll for infinite loading
  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (!onLoadMore || !hasMore || isFetchingMore) return;

      const { layoutMeasurement, contentOffset, contentSize } =
        event.nativeEvent;

      // Trigger load more when near bottom (100px threshold)
      const paddingToBottom = 100;
      const isCloseToBottom =
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom;

      if (isCloseToBottom) {
        onLoadMore();
      }
    },
    [onLoadMore, hasMore, isFetchingMore]
  );

  const handleToggle = (optionValue: string | number) => {
    setSelectedValues((prev) => {
      if (prev.includes(optionValue)) {
        return prev.filter((v) => v !== optionValue);
      } else {
        return [...prev, optionValue];
      }
    });
  };

  const handleSelectAll = () => {
    // Only select visible/available options (not disabled)
    const allValues = filteredOptions
      .filter((opt) => !opt.disabled)
      .map((opt) => opt.value);
    setSelectedValues(allValues);
  };

  const handleDeselectAll = () => {
    setSelectedValues([]);
  };

  const handleConfirm = () => {
    onChange?.(selectedValues);
    setDrawerVisible(false);
    setSearchQuery('');
  };

  const handleClear = (e: any) => {
    e.stopPropagation();
    setSelectedValues([]);
    onChange?.([]);
  };

  const handleCancel = () => {
    setSelectedValues(value || []);
    setDrawerVisible(false);
    setSearchQuery('');
  };

  // Check if all visible options are selected
  const isAllSelected =
    filteredOptions.length > 0 &&
    filteredOptions
      .filter((opt) => !opt.disabled)
      .every((opt) => selectedValues.includes(opt.value));

  // Reset search when drawer opens
  const handleDrawerOpen = () => {
    setDrawerVisible(true);
    if (onSearch) {
      onSearch(''); // Initial load
    }
  };

  return (
    <View>
      {/* Label */}
      {label && (
        <Text style={tw`text-sm font-medium text-gray-700 mb-2`}>{label}</Text>
      )}

      {/* Input Field */}
      <TouchableOpacity
        onPress={() => !disabled && handleDrawerOpen()}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <VInput
          value={displayValue}
          placeholder={placeholder}
          editable={false}
          pointerEvents="none"
          error={error}
          suffix={
            <View style={tw`flex-row items-center gap-2`}>
              {clearable && value && value.length > 0 ? (
                <TouchableOpacity onPress={handleClear} hitSlop={10}>
                  <X size={20} color={tw.color('gray-500')} />
                </TouchableOpacity>
              ) : null}
              <ChevronDown size={20} color={tw.color('gray-500')} />
            </View>
          }
          style={tw.style(disabled && 'opacity-50')}
        />
      </TouchableOpacity>

      {/* Error Message */}
      {error && errorMessage && (
        <Text style={tw`text-xs text-danger-600 mt-1`}>{errorMessage}</Text>
      )}

      {/* Drawer with Options */}
      <VDrawer
        visible={drawerVisible}
        onClose={handleCancel}
        title={drawerTitle}
        scrollable={false}
        bottomAction={
          <View style={tw`flex-row gap-2`}>
            <TouchableOpacity
              onPress={handleCancel}
              style={tw`flex-1 py-3 rounded-lg border border-gray-300`}
              activeOpacity={0.7}
            >
              <Text style={tw`text-center font-semibold text-gray-700`}>
                Batal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={handleConfirm}
              style={tw`flex-1 py-3 rounded-lg bg-primary-500`}
              activeOpacity={0.7}
            >
              <Text style={tw`text-center font-semibold text-white`}>
                Pilih ({selectedValues.length})
              </Text>
            </TouchableOpacity>
          </View>
        }
      >
        <View style={tw`flex-1`}>
          {/* Search Input */}
          {searchable && (
            <View style={tw`mb-4`}>
              <VInput
                value={searchQuery}
                onChangeText={handleSearchChange}
                placeholder="Cari..."
                autoFocus
              />
            </View>
          )}

          {/* Loading Indicator */}
          {isLoading && !isFetchingMore && (
            <View style={tw`py-8 items-center`}>
              <ActivityIndicator size="large" color={tw.color('primary-500')} />
              <Text style={tw`text-gray-500 mt-2`}>Memuat...</Text>
            </View>
          )}

          {/* Select All / Deselect All */}
          {!isLoading && selectAllOption && filteredOptions.length > 0 && (
            <View style={tw`mb-3 flex-row gap-2`}>
              <TouchableOpacity
                onPress={isAllSelected ? handleDeselectAll : handleSelectAll}
                style={tw`flex-1 py-2 px-3 rounded-lg border border-primary-300 bg-primary-50`}
                activeOpacity={0.7}
              >
                <Text
                  style={tw`text-center text-sm font-semibold text-primary-700`}
                >
                  {isAllSelected ? 'Hapus Semua' : 'Pilih Semua'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Selected Count Info */}
          {!isLoading && selectedValues.length > 0 && (
            <View style={tw`mb-3 p-2 rounded-lg bg-primary-50`}>
              <Text style={tw`text-xs text-center text-primary-700`}>
                {selectedValues.length} item dipilih
              </Text>
            </View>
          )}

          {/* Options List */}
          {!isLoading && (
            <ScrollView
              style={tw`flex-1`}
              showsVerticalScrollIndicator={true}
              contentContainerStyle={tw`pb-4`}
              onScroll={handleScroll}
              scrollEventThrottle={400}
            >
              {filteredOptions.length === 0 ? (
                <View style={tw`py-8 items-center`}>
                  <Text style={tw`text-gray-500 text-center`}>
                    {emptyMessage}
                  </Text>
                </View>
              ) : (
                <>
                  {filteredOptions.map((option) => {
                    const isSelected = selectedValues.includes(option.value);

                    return (
                      <Pressable
                        key={option.value}
                        onPress={() =>
                          !option.disabled && handleToggle(option.value)
                        }
                        disabled={option.disabled}
                        style={tw.style(
                          'flex-row items-center justify-between py-3 px-4 rounded-lg mb-2',
                          option.disabled && 'opacity-50'
                        )}
                      >
                        {/* Label & Description */}
                        <View style={tw`flex-1 mr-3`}>
                          <Text
                            style={tw.style(
                              'text-base font-medium',
                              isSelected ? 'text-primary-700' : 'text-gray-900'
                            )}
                          >
                            {option.label}
                          </Text>
                          {option.description && (
                            <Text style={tw`text-xs text-gray-500 mt-1`}>
                              {option.description}
                            </Text>
                          )}
                        </View>

                        {/* Checkbox - Right Side */}
                        <VCheckbox
                          type="checkbox"
                          checked={isSelected}
                          onCheckedChange={() =>
                            !option.disabled && handleToggle(option.value)
                          }
                          disabled={option.disabled}
                          size="md"
                          variant="primary"
                        />
                      </Pressable>
                    );
                  })}

                  {/* Load More Indicator */}
                  {isFetchingMore && (
                    <View style={tw`py-4 items-center`}>
                      <ActivityIndicator
                        size="small"
                        color={tw.color('primary-500')}
                      />
                      <Text style={tw`text-gray-500 text-xs mt-2`}>
                        Memuat lebih banyak...
                      </Text>
                    </View>
                  )}

                  {/* End of List */}
                  {!hasMore && filteredOptions.length > 10 && (
                    <View style={tw`py-4 items-center`}>
                      <Text style={tw`text-gray-400 text-xs`}>
                        - Akhir dari daftar -
                      </Text>
                    </View>
                  )}
                </>
              )}
            </ScrollView>
          )}
        </View>
      </VDrawer>
    </View>
  );
};

export default VMultipleSelectInput;

// // src/components/VMultipleSelectInput/VMultipleSelectInput.tsx
// import React, { useState } from 'react';
// import {
//   TouchableOpacity,
//   Text,
//   View,
//   ScrollView,
//   Pressable,
// } from 'react-native';
// import { ChevronDown, X } from 'lucide-react-native';
// import VInput from './VInput';
// import VDrawer from '../VDrawer/VDrawer';
// import VCheckbox from './VCheckbox';
// import { useTheme } from '../../theme/ThemeProvider';

// export interface MultiSelectOption {
//   label: string;
//   value: string | number;
//   disabled?: boolean;
//   description?: string;
// }

// export interface VMultipleSelectInputProps {
//   value?: (string | number)[];
//   onChange?: (value: (string | number)[]) => void;
//   options: MultiSelectOption[];
//   placeholder?: string;
//   label?: string;
//   error?: boolean;
//   errorMessage?: string;
//   disabled?: boolean;
//   clearable?: boolean;
//   searchable?: boolean;
//   drawerTitle?: string;
//   emptyMessage?: string;
//   maxDisplayCount?: number; // Show "n item selected" after this count
//   selectAllOption?: boolean; // Add "Select All" option
// }

// const VMultipleSelectInput: React.FC<VMultipleSelectInputProps> = ({
//   value = [],
//   onChange,
//   options,
//   placeholder = 'Pilih opsi',
//   label,
//   error = false,
//   errorMessage,
//   disabled = false,
//   clearable = true,
//   searchable = false,
//   drawerTitle = 'Pilih Opsi',
//   emptyMessage = 'Tidak ada opsi tersedia',
//   maxDisplayCount = 3,
//   selectAllOption = false,
// }) => {
//   const { tw } = useTheme();
//   const [drawerVisible, setDrawerVisible] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedValues, setSelectedValues] = useState<(string | number)[]>(
//     value || []
//   );

//   // Get display value
//   const getDisplayValue = () => {
//     if (!value || value.length === 0) return '';

//     if (value.length <= maxDisplayCount) {
//       // Show all labels
//       return value
//         .map((val) => options.find((opt) => opt.value === val)?.label)
//         .filter(Boolean)
//         .join(', ');
//     } else {
//       // Show "n item selected"
//       return `${value.length} item dipilih`;
//     }
//   };

//   const displayValue = getDisplayValue();

//   // Filter options based on search
//   const filteredOptions = searchable
//     ? options.filter((option) =>
//         option.label.toLowerCase().includes(searchQuery.toLowerCase())
//       )
//     : options;

//   const handleToggle = (optionValue: string | number) => {
//     setSelectedValues((prev) => {
//       if (prev.includes(optionValue)) {
//         return prev.filter((v) => v !== optionValue);
//       } else {
//         return [...prev, optionValue];
//       }
//     });
//   };

//   const handleSelectAll = () => {
//     const allValues = options
//       .filter((opt) => !opt.disabled)
//       .map((opt) => opt.value);
//     setSelectedValues(allValues);
//   };

//   const handleDeselectAll = () => {
//     setSelectedValues([]);
//   };

//   const handleConfirm = () => {
//     onChange?.(selectedValues);
//     setDrawerVisible(false);
//     setSearchQuery('');
//   };

//   const handleClear = (e: any) => {
//     e.stopPropagation();
//     setSelectedValues([]);
//     onChange?.([]);
//   };

//   const handleCancel = () => {
//     setSelectedValues(value || []);
//     setDrawerVisible(false);
//     setSearchQuery('');
//   };

//   const isAllSelected =
//     selectedValues.length === options.filter((opt) => !opt.disabled).length &&
//     options.length > 0;

//   return (
//     <View>
//       {/* Label */}
//       {label && (
//         <Text style={tw`text-sm font-medium text-gray-700 mb-2`}>{label}</Text>
//       )}

//       {/* Input Field */}
//       <TouchableOpacity
//         onPress={() => !disabled && setDrawerVisible(true)}
//         activeOpacity={0.7}
//         disabled={disabled}
//       >
//         <VInput
//           value={displayValue}
//           placeholder={placeholder}
//           editable={false}
//           pointerEvents="none"
//           error={error}
//           suffix={
//             <View style={tw`flex-row items-center gap-2`}>
//               {clearable && value && value.length > 0 ? (
//                 <TouchableOpacity onPress={handleClear} hitSlop={10}>
//                   <X size={20} color={tw.color('gray-500')} />
//                 </TouchableOpacity>
//               ) : null}
//               <ChevronDown size={20} color={tw.color('gray-500')} />
//             </View>
//           }
//           style={tw.style(disabled && 'opacity-50')}
//         />
//       </TouchableOpacity>

//       {/* Error Message */}
//       {error && errorMessage && (
//         <Text style={tw`text-xs text-danger-600 mt-1`}>{errorMessage}</Text>
//       )}

//       {/* Drawer with Options */}
//       <VDrawer
//         visible={drawerVisible}
//         onClose={handleCancel}
//         title={drawerTitle}
//         scrollable={false}
//         bottomAction={
//           <View style={tw`flex-row gap-2`}>
//             <TouchableOpacity
//               onPress={handleCancel}
//               style={tw`flex-1 py-3 rounded-lg border border-gray-300`}
//               activeOpacity={0.7}
//             >
//               <Text style={tw`text-center font-semibold text-gray-700`}>
//                 Batal
//               </Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={handleConfirm}
//               style={tw`flex-1 py-3 rounded-lg bg-primary-500`}
//               activeOpacity={0.7}
//             >
//               <Text style={tw`text-center font-semibold text-white`}>
//                 Pilih ({selectedValues.length})
//               </Text>
//             </TouchableOpacity>
//           </View>
//         }
//       >
//         <View style={tw`flex-1`}>
//           {/* Search Input */}
//           {searchable && (
//             <View style={tw`mb-4`}>
//               <VInput
//                 value={searchQuery}
//                 onChangeText={setSearchQuery}
//                 placeholder="Cari..."
//                 autoFocus
//               />
//             </View>
//           )}

//           {/* Select All / Deselect All */}
//           {selectAllOption && options.length > 0 && (
//             <View style={tw`mb-3 flex-row gap-2`}>
//               <TouchableOpacity
//                 onPress={isAllSelected ? handleDeselectAll : handleSelectAll}
//                 style={tw`flex-1 py-2 px-3 rounded-lg border border-primary-300 bg-primary-50`}
//                 activeOpacity={0.7}
//               >
//                 <Text
//                   style={tw`text-center text-sm font-semibold text-primary-700`}
//                 >
//                   {isAllSelected ? 'Hapus Semua' : 'Pilih Semua'}
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           )}

//           {/* Selected Count Info */}
//           {selectedValues.length > 0 && (
//             <View style={tw`mb-3 p-2 rounded-lg bg-primary-50`}>
//               <Text style={tw`text-xs text-center text-primary-700`}>
//                 {selectedValues.length} item dipilih
//               </Text>
//             </View>
//           )}

//           {/* Options List */}
//           <ScrollView
//             style={tw`flex-1`}
//             showsVerticalScrollIndicator={true}
//             contentContainerStyle={tw`pb-4`}
//           >
//             {filteredOptions.length === 0 ? (
//               <View style={tw`py-8 items-center`}>
//                 <Text style={tw`text-gray-500 text-center`}>
//                   {emptyMessage}
//                 </Text>
//               </View>
//             ) : (
//               filteredOptions.map((option) => {
//                 const isSelected = selectedValues.includes(option.value);

//                 return (
//                   <Pressable
//                     key={option.value}
//                     onPress={() =>
//                       !option.disabled && handleToggle(option.value)
//                     }
//                     disabled={option.disabled}
//                     style={tw.style(
//                       'flex-row items-center justify-between py-3 px-4 rounded-lg mb-2',
//                       //   isSelected && 'bg-primary-50',
//                       //   !isSelected && 'bg-gray-50',
//                       option.disabled && 'opacity-50'
//                     )}
//                   >
//                     {/* Label & Description */}
//                     <View style={tw`flex-1 mr-3`}>
//                       <Text
//                         style={tw.style(
//                           'text-base font-medium',
//                           isSelected ? 'text-primary-700' : 'text-gray-900'
//                         )}
//                       >
//                         {option.label}
//                       </Text>
//                       {option.description && (
//                         <Text style={tw`text-xs text-gray-500 mt-1`}>
//                           {option.description}
//                         </Text>
//                       )}
//                     </View>

//                     {/* Checkbox - Right Side */}
//                     <VCheckbox
//                       type="checkbox"
//                       checked={isSelected}
//                       onCheckedChange={() =>
//                         !option.disabled && handleToggle(option.value)
//                       }
//                       disabled={option.disabled}
//                       size="md"
//                       variant="primary"
//                     />
//                   </Pressable>
//                 );
//               })
//             )}
//           </ScrollView>
//         </View>
//       </VDrawer>
//     </View>
//   );
// };

// export default VMultipleSelectInput;
