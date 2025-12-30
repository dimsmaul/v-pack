// src/components/VPicker/VWheelPicker.tsx
import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import tw from '../../utils/tw';

const ITEM_HEIGHT = 44;

interface VWheelPickerProps {
  data: (string | number)[];
  selectedValue: string | number;
  onValueChange: (value: string | number, index: number) => void;
  style?: any;
  loop?: boolean; // Tambahkan prop loop
}

const VWheelPicker: React.FC<VWheelPickerProps> = ({
  data,
  selectedValue,
  onValueChange,
  style,
  loop = false,
}) => {
  const flatListRef = useRef<FlatList>(null);
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Create looped data (repeat 3 times for infinite scroll effect)
  const loopedData = loop ? [...data, ...data, ...data] : data;
  const dataLength = data.length;
  const middleStartIndex = loop ? dataLength : 0;

  // Find selected index in the middle section
  const getSelectedIndex = () => {
    const baseIndex = data.indexOf(selectedValue);
    return baseIndex >= 0 ? middleStartIndex + baseIndex : middleStartIndex;
  };

  const [selectedIndex, setSelectedIndex] = useState(getSelectedIndex());

  useEffect(() => {
    // Scroll to selected item on mount
    if (flatListRef.current && !isScrollingRef.current) {
      setTimeout(() => {
        flatListRef.current?.scrollToOffset({
          offset: getSelectedIndex() * ITEM_HEIGHT,
          animated: false,
        });
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    const clampedIndex = Math.max(0, Math.min(index, loopedData.length - 1));

    // Handle loop repositioning
    if (loop) {
      let targetIndex = clampedIndex;
      let shouldReposition = false;

      // If scrolled to first section, jump to middle
      if (clampedIndex < dataLength) {
        targetIndex = clampedIndex + dataLength;
        shouldReposition = true;
      }
      // If scrolled to last section, jump to middle
      else if (clampedIndex >= dataLength * 2) {
        targetIndex = clampedIndex - dataLength;
        shouldReposition = true;
      }

      if (shouldReposition) {
        // Reposition without animation after a tiny delay
        scrollTimeoutRef.current = setTimeout(() => {
          flatListRef.current?.scrollToOffset({
            offset: targetIndex * ITEM_HEIGHT,
            animated: false,
          });
          setSelectedIndex(targetIndex);
        }, 50);
      } else {
        setSelectedIndex(clampedIndex);
      }

      // Get actual data index (remove offset)
      const actualIndex = clampedIndex % dataLength;
      if (data[actualIndex] !== selectedValue) {
        onValueChange(data[actualIndex]!, actualIndex);
      }
    } else {
      // Non-loop behavior
      flatListRef.current?.scrollToOffset({
        offset: clampedIndex * ITEM_HEIGHT,
        animated: true,
      });

      setSelectedIndex(clampedIndex);

      if (data[clampedIndex] !== selectedValue) {
        onValueChange(data[clampedIndex]!, clampedIndex);
      }
    }

    isScrollingRef.current = false;
  };

  const handleScrollBeginDrag = () => {
    isScrollingRef.current = true;
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: string | number;
    index: number;
  }) => {
    const isSelected = index === selectedIndex;
    return (
      <View
        style={[
          tw.style('justify-center items-center'),
          { height: ITEM_HEIGHT },
        ]}
      >
        <Text
          style={tw.style(
            'text-base',
            isSelected
              ? 'text-gray-900 font-semibold'
              : 'text-gray-400 font-normal'
          )}
        >
          {item}
        </Text>
      </View>
    );
  };

  const getItemLayout = (_: any, index: number) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  });

  return (
    <View style={[tw.style('h-44 overflow-hidden'), style]}>
      <FlatList
        ref={flatListRef}
        data={loopedData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item}-${index}`}
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        snapToAlignment="start"
        decelerationRate="fast"
        onScrollBeginDrag={handleScrollBeginDrag}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        getItemLayout={getItemLayout}
        contentContainerStyle={{
          paddingTop: ITEM_HEIGHT * 2,
          paddingBottom: ITEM_HEIGHT * 2,
        }}
        removeClippedSubviews={false}
        maxToRenderPerBatch={20}
        windowSize={21}
      />
    </View>
  );
};

export default VWheelPicker;
