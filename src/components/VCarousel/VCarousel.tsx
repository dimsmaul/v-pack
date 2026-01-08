import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  Dimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  type ViewStyle,
  TouchableOpacity,
  type LayoutChangeEvent,
  // Platform,
} from 'react-native';
import { ChevronLeft, ChevronRight } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Types
export type VCarouselProps<T = string> = {
  items: T[];
  renderItem?: (props: { item: T; index: number }) => React.ReactNode;
  imageKey?: keyof T;
  renderIndicator?: (props: {
    isActive: boolean;
    index: number;
    onPress: () => void;
  }) => React.ReactNode;
  autoPlay?: boolean;
  interval?: number;
  showIndicators?: boolean;
  showArrows?: boolean;
  itemWidth?: number;
  itemHeight?: number;
  containerStyle?: ViewStyle;
  onIndexChange?: (index: number) => void;
};

export default function VCarousel<T = string>({
  items,
  renderItem,
  imageKey,
  renderIndicator,
  autoPlay = false,
  interval = 3000,
  showIndicators = true,
  showArrows = false,
  itemWidth,
  itemHeight = 200,
  containerStyle,
  onIndexChange,
}: VCarouselProps<T>) {
  const { tw } = useTheme();
  const flatListRef = useRef<FlatList>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoPlayInterval = useRef<NodeJS.Timeout | null>(null);
  const [carouselWidth, setCarouselWidth] = useState<number>(0);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    if (width > 0) {
      setCarouselWidth(width);
    }
  }, []);

  // Use measured width or fallback
  const effectiveWidth =
    carouselWidth > 0 ? carouselWidth : itemWidth || SCREEN_WIDTH;

  // Handle scroll to index
  const scrollToIndex = useCallback(
    (index: number, animated = true) => {
      if (flatListRef.current && items.length > 0 && carouselWidth > 0) {
        const safeIndex = Math.max(0, Math.min(index, items.length - 1));

        // Always use scrollToOffset for consistency across platforms
        flatListRef.current.scrollToOffset({
          offset: safeIndex * carouselWidth,
          animated,
        });
      }
    },
    [items.length, carouselWidth]
  );

  // Navigate to previous item
  const goToPrevious = useCallback(() => {
    const prevIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    scrollToIndex(prevIndex);
  }, [activeIndex, items.length, scrollToIndex]);

  // Navigate to next item
  const goToNext = useCallback(() => {
    const nextIndex = (activeIndex + 1) % items.length;
    scrollToIndex(nextIndex);
  }, [activeIndex, items.length, scrollToIndex]);

  const handleScroll = useCallback(
    (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (carouselWidth === 0) return;

      const scrollPosition = event.nativeEvent.contentOffset.x;
      const index = Math.round(scrollPosition / carouselWidth);

      if (index !== activeIndex && index >= 0 && index < items.length) {
        setActiveIndex(index);
        onIndexChange?.(index);
      }
    },
    [activeIndex, carouselWidth, items.length, onIndexChange]
  );

  // Auto play logic
  useEffect(() => {
    if (autoPlay && items.length > 1 && carouselWidth > 0) {
      autoPlayInterval.current = setInterval(() => {
        setActiveIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % items.length;
          scrollToIndex(nextIndex);
          return nextIndex;
        });
      }, interval);
    }

    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, [autoPlay, interval, items.length, scrollToIndex, carouselWidth]);

  // Render individual item
  const renderCarouselItem = useCallback(
    ({ item, index }: { item: T; index: number }) => {
      // Get image source
      let imageSource: string | undefined;

      if (typeof item === 'string') {
        imageSource = item;
      } else if (imageKey && typeof item === 'object' && item !== null) {
        imageSource = (item as any)[imageKey];
      }

      const itemContainerStyle = {
        width: carouselWidth > 0 ? carouselWidth : effectiveWidth,
        height: itemHeight,
      };

      // Custom render item WITH image background
      if (renderItem && imageSource) {
        return (
          <View style={itemContainerStyle}>
            {/* Background Image */}
            <Image
              source={{ uri: imageSource }}
              style={tw`w-full h-full absolute`}
              resizeMode="cover"
            />
            {/* Custom Content Overlay */}
            <View style={tw`flex-1`}>{renderItem({ item, index })}</View>
          </View>
        );
      }

      // Custom render item WITHOUT image (no imageKey provided)
      if (renderItem) {
        return (
          <View style={itemContainerStyle}>{renderItem({ item, index })}</View>
        );
      }

      // Default: only image rendering (no renderItem)
      return (
        <View style={itemContainerStyle}>
          <Image
            source={{ uri: imageSource }}
            style={tw`w-full h-full`}
            resizeMode="cover"
          />
        </View>
      );
    },
    [renderItem, imageKey, carouselWidth, effectiveWidth, itemHeight, tw]
  );

  // Render default dots indicator
  const renderDefaultIndicator = useCallback(
    (index: number) => {
      const isActive = index === activeIndex;
      return (
        <TouchableOpacity
          key={index}
          onPress={() => scrollToIndex(index)}
          style={tw`w-2 h-2 rounded-full ${
            isActive ? 'bg-white w-6' : 'bg-white/50'
          }`}
        />
      );
    },
    [activeIndex, scrollToIndex, tw]
  );

  // Render custom or default indicators
  const renderIndicators = useCallback(() => {
    if (!showIndicators) return null;

    return (
      <View
        style={tw`flex-row justify-center items-center absolute bottom-4 left-0 right-0 gap-2`}
      >
        {items.map((_, index) => {
          if (renderIndicator) {
            return (
              <View key={index}>
                {renderIndicator({
                  isActive: index === activeIndex,
                  index,
                  onPress: () => scrollToIndex(index),
                })}
              </View>
            );
          }
          return renderDefaultIndicator(index);
        })}
      </View>
    );
  }, [
    showIndicators,
    items,
    renderIndicator,
    activeIndex,
    scrollToIndex,
    renderDefaultIndicator,
    tw,
  ]);

  // Render navigation arrows
  const renderArrows = useCallback(() => {
    if (!showArrows || items.length <= 1) return null;

    return (
      <>
        {/* Left Arrow */}
        <TouchableOpacity
          onPress={goToPrevious}
          style={tw`absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 z-10`}
          activeOpacity={0.7}
        >
          <ChevronLeft size={24} color="white" />
        </TouchableOpacity>

        {/* Right Arrow */}
        <TouchableOpacity
          onPress={goToNext}
          style={tw`absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 z-10`}
          activeOpacity={0.7}
        >
          <ChevronRight size={24} color="white" />
        </TouchableOpacity>
      </>
    );
  }, [showArrows, items.length, goToPrevious, goToNext, tw]);

  return (
    <View style={[tw`relative`, containerStyle]} onLayout={onLayout}>
      {carouselWidth > 0 && (
        <FlatList
          ref={flatListRef}
          data={items}
          renderItem={renderCarouselItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          keyExtractor={(_, index) => `carousel-item-${index}`}
          snapToInterval={carouselWidth}
          snapToAlignment="start"
          decelerationRate="fast"
          bounces={false}
          getItemLayout={(_, index) => ({
            length: carouselWidth,
            offset: carouselWidth * index,
            index,
          })}
          onScrollToIndexFailed={(info) => {
            setTimeout(() => {
              flatListRef.current?.scrollToOffset({
                offset: info.index * carouselWidth,
                animated: true,
              });
            }, 100);
          }}
        />
      )}

      {renderArrows()}
      {renderIndicators()}
    </View>
  );
}

// /**
//  * FIXME: on android the image slider problem
//  */

// import React, { useRef, useState, useCallback, useEffect } from 'react';
// import {
//   View,
//   FlatList,
//   Image,
//   Dimensions,
//   type NativeScrollEvent,
//   type NativeSyntheticEvent,
//   type ViewStyle,
//   TouchableOpacity,
//   type LayoutChangeEvent,
// } from 'react-native';
// import { ChevronLeft, ChevronRight } from 'lucide-react-native';
// import { useTheme } from '../../theme/ThemeProvider';

// const { width: SCREEN_WIDTH } = Dimensions.get('window');

// // Types
// export type VCarouselProps<T = string> = {
//   items: T[];
//   renderItem?: (props: { item: T; index: number }) => React.ReactNode;
//   imageKey?: keyof T;
//   renderIndicator?: (props: {
//     isActive: boolean;
//     index: number;
//     onPress: () => void;
//   }) => React.ReactNode;
//   autoPlay?: boolean;
//   interval?: number;
//   showIndicators?: boolean;
//   showArrows?: boolean;
//   itemWidth?: number;
//   itemHeight?: number;
//   containerStyle?: ViewStyle;
//   onIndexChange?: (index: number) => void;
// };

// export default function VCarousel<T = string>({
//   items,
//   renderItem,
//   imageKey,
//   renderIndicator,
//   autoPlay = false,
//   interval = 3000,
//   showIndicators = true,
//   showArrows = false,
//   itemWidth = SCREEN_WIDTH,
//   itemHeight = 200,
//   containerStyle,
//   onIndexChange,
// }: VCarouselProps<T>) {
//   const { tw } = useTheme();
//   const flatListRef = useRef<FlatList>(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const autoPlayInterval = useRef<NodeJS.Timeout | null>(null);

//   const [carouselWidth, setCarouselWidth] = useState<number>(0);
//   const onLayout = useCallback((event: LayoutChangeEvent) => {
//     const { width } = event.nativeEvent.layout;
//     setCarouselWidth(width);
//   }, []);

//   const effectiveWidth = carouselWidth > 0 ? carouselWidth : itemWidth;

//   // Handle scroll to index
//   const scrollToIndex = useCallback(
//     (index: number, animated = true) => {
//       if (flatListRef.current && items.length > 0) {
//         const safeIndex = Math.max(0, Math.min(index, items.length - 1));
//         flatListRef.current.scrollToIndex({
//           index: safeIndex,
//           animated,
//         });
//       }
//     },
//     [items.length]
//   );

//   // Navigate to previous item
//   const goToPrevious = useCallback(() => {
//     const prevIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
//     scrollToIndex(prevIndex);
//   }, [activeIndex, items.length, scrollToIndex]);

//   // Navigate to next item
//   const goToNext = useCallback(() => {
//     const nextIndex = (activeIndex + 1) % items.length;
//     scrollToIndex(nextIndex);
//   }, [activeIndex, items.length, scrollToIndex]);

//   // Ganti di handleScroll - pakai carouselWidth kalau ada
//   const handleScroll = useCallback(
//     (event: NativeSyntheticEvent<NativeScrollEvent>) => {
//       const width = carouselWidth > 0 ? carouselWidth : itemWidth;
//       const scrollPosition = event.nativeEvent.contentOffset.x;
//       const index = Math.round(scrollPosition / width);

//       if (index !== activeIndex && index >= 0 && index < items.length) {
//         setActiveIndex(index);
//         onIndexChange?.(index);
//       }
//     },
//     [activeIndex, itemWidth, carouselWidth, items.length, onIndexChange]
//   );

//   // Auto play logic
//   useEffect(() => {
//     if (autoPlay && items.length > 1) {
//       autoPlayInterval.current = setInterval(() => {
//         setActiveIndex((prevIndex) => {
//           const nextIndex = (prevIndex + 1) % items.length;
//           scrollToIndex(nextIndex);
//           return nextIndex;
//         });
//       }, interval);
//     }

//     return () => {
//       if (autoPlayInterval.current) {
//         clearInterval(autoPlayInterval.current);
//       }
//     };
//   }, [autoPlay, interval, items.length, scrollToIndex]);

//   // Render individual item
//   const renderCarouselItem = useCallback(
//     ({ item, index }: { item: T; index: number }) => {
//       // Get image source
//       let imageSource: string | undefined;

//       if (typeof item === 'string') {
//         imageSource = item;
//       } else if (imageKey && typeof item === 'object' && item !== null) {
//         imageSource = (item as any)[imageKey];
//       }

//       // Custom render item WITH image background
//       if (renderItem && imageSource) {
//         return (
//           <View style={{ width: effectiveWidth, height: itemHeight }}>
//             {/* Background Image */}
//             <Image
//               source={{ uri: imageSource }}
//               style={tw`w-full h-full absolute`}
//               resizeMode="cover"
//             />
//             {/* Custom Content Overlay */}
//             <View style={tw`flex-1`}>{renderItem({ item, index })}</View>
//           </View>
//         );
//       }

//       // Custom render item WITHOUT image (no imageKey provided)
//       if (renderItem) {
//         return (
//           <View style={{ width: effectiveWidth, height: itemHeight }}>
//             {renderItem({ item, index })}
//           </View>
//         );
//       }

//       // Default: only image rendering (no renderItem)
//       return (
//         <View
//           style={tw.style('flex items-center justify-center', {
//             width: effectiveWidth,
//             height: itemHeight,
//           })}
//         >
//           <Image
//             source={{ uri: imageSource }}
//             style={tw`w-full h-full`}
//             resizeMode="cover"
//           />
//         </View>
//       );
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [renderItem, imageKey, itemWidth, itemHeight]
//   );

//   // Render default dots indicator
//   const renderDefaultIndicator = useCallback(
//     (index: number) => {
//       const isActive = index === activeIndex;
//       return (
//         <TouchableOpacity
//           key={index}
//           onPress={() => scrollToIndex(index)}
//           style={tw`w-2 h-2 rounded-full ${
//             isActive ? 'bg-white w-6' : 'bg-white/50'
//           }`}
//         />
//       );
//     },
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     [activeIndex, scrollToIndex]
//   );

//   // Render custom or default indicators
//   const renderIndicators = useCallback(() => {
//     if (!showIndicators) return null;

//     return (
//       <View
//         style={tw`flex-row justify-center items-center absolute bottom-4 left-0 right-0 gap-2`}
//       >
//         {items.map((_, index) => {
//           if (renderIndicator) {
//             return (
//               <View key={index}>
//                 {renderIndicator({
//                   isActive: index === activeIndex,
//                   index,
//                   onPress: () => scrollToIndex(index),
//                 })}
//               </View>
//             );
//           }
//           return renderDefaultIndicator(index);
//         })}
//       </View>
//     );
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [
//     showIndicators,
//     items,
//     renderIndicator,
//     activeIndex,
//     scrollToIndex,
//     renderDefaultIndicator,
//   ]);

//   // Render navigation arrows
//   const renderArrows = useCallback(() => {
//     if (!showArrows || items.length <= 1) return null;

//     return (
//       <>
//         {/* Left Arrow */}
//         <TouchableOpacity
//           onPress={goToPrevious}
//           style={tw`absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 z-10`}
//           activeOpacity={0.7}
//         >
//           <ChevronLeft size={24} color="white" />
//         </TouchableOpacity>

//         {/* Right Arrow */}
//         <TouchableOpacity
//           onPress={goToNext}
//           style={tw`absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-2 z-10`}
//           activeOpacity={0.7}
//         >
//           <ChevronRight size={24} color="white" />
//         </TouchableOpacity>
//       </>
//     );
//   }, [showArrows, items.length, goToPrevious, goToNext, tw]);
//   return (
//     <View style={[tw`relative`, containerStyle]} onLayout={onLayout}>
//       <FlatList
//         ref={flatListRef}
//         data={items}
//         renderItem={renderCarouselItem}
//         horizontal
//         pagingEnabled
//         showsHorizontalScrollIndicator={false}
//         onScroll={handleScroll}
//         scrollEventThrottle={16}
//         keyExtractor={(_, index) => `carousel-item-${index}`}
//         snapToInterval={effectiveWidth}
//         snapToAlignment="start"
//         decelerationRate="fast"
//         bounces={false}
//         getItemLayout={(_, index) => ({
//           length: effectiveWidth,
//           offset: effectiveWidth * index,
//           index,
//         })}
//         onScrollToIndexFailed={(info) => {
//           setTimeout(() => {
//             flatListRef.current?.scrollToOffset({
//               offset: info.index * effectiveWidth,
//               animated: true,
//             });
//           }, 100);
//         }}
//       />

//       {renderArrows()}
//       {renderIndicators()}
//     </View>
//   );
// }
