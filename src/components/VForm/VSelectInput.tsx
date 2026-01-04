// src/components/VSelectInput/VSelectInput.tsx
import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import { ChevronDown, X } from 'lucide-react-native';
import VDrawer from '../VDrawer/VDrawer';
import { useTheme } from '../../theme/ThemeProvider';
import VInput from './VInput';
import VCheckbox from './VCheckbox';

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
  description?: string;
}

export interface VSelectInputProps {
  value?: string | number | null;
  onChange?: (value: string | number | null) => void;
  options: SelectOption[];
  placeholder?: string;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  clearable?: boolean;
  searchable?: boolean;
  drawerTitle?: string;
  emptyMessage?: string;
}

const VSelectInput: React.FC<VSelectInputProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Pilih opsi',
  label,
  error = false,
  errorMessage,
  disabled = false,
  clearable = true,
  searchable = false,
  drawerTitle = 'Pilih Opsi',
  emptyMessage = 'Tidak ada opsi tersedia',
}) => {
  const { tw } = useTheme();
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedValue, setSelectedValue] = useState<string | number | null>(
    value || null
  );

  // Get selected option label
  const selectedOption = options.find((opt) => opt.value === value);
  const displayValue = selectedOption?.label || '';

  // Filter options based on search
  const filteredOptions = searchable
    ? options.filter((option) =>
        option.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : options;

  const handleSelect = (optionValue: string | number) => {
    setSelectedValue(optionValue);
  };

  const handleConfirm = () => {
    onChange?.(selectedValue);
    setDrawerVisible(false);
    setSearchQuery('');
  };

  const handleClear = (e: any) => {
    e.stopPropagation();
    setSelectedValue(null);
    onChange?.(null);
  };

  const handleCancel = () => {
    setSelectedValue(value || null);
    setDrawerVisible(false);
    setSearchQuery('');
  };

  return (
    <View>
      {/* Label */}
      {label && (
        <Text style={tw`text-sm font-medium text-gray-700 mb-2`}>{label}</Text>
      )}

      {/* Input Field */}
      <TouchableOpacity
        onPress={() => !disabled && setDrawerVisible(true)}
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
              {clearable && value ? (
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
                Pilih
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
                onChangeText={setSearchQuery}
                placeholder="Cari..."
                autoFocus
              />
            </View>
          )}

          {/* Options List */}
          <ScrollView
            style={tw`flex-1`}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={tw`pb-4`}
          >
            {filteredOptions.length === 0 ? (
              <View style={tw`py-8 items-center`}>
                <Text style={tw`text-gray-500 text-center`}>
                  {emptyMessage}
                </Text>
              </View>
            ) : (
              filteredOptions.map((option) => {
                const isSelected = selectedValue === option.value;

                return (
                  <Pressable
                    key={option.value}
                    onPress={() =>
                      !option.disabled && handleSelect(option.value)
                    }
                    disabled={option.disabled}
                    style={tw.style(
                      'flex-row items-center justify-between py-3 px-4 rounded-lg mb-2',
                      //   isSelected && 'bg-primary-50 border border-primary-200',
                      //   !isSelected && 'bg-gray-50',
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

                    {/* Radio Button - Right Side */}
                    <VCheckbox
                      type="radio"
                      checked={isSelected}
                      onCheckedChange={() =>
                        !option.disabled && handleSelect(option.value)
                      }
                      disabled={option.disabled}
                      size="md"
                      variant="primary"
                    />
                  </Pressable>
                );
              })
            )}
          </ScrollView>
        </View>
      </VDrawer>
    </View>
  );
};

export default VSelectInput;
