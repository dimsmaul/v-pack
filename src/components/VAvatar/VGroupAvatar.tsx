// src/components/VAvatar/VAvatarGroup.tsx
import React from 'react';
import { View, type StyleProp, type ViewStyle, Text } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

export interface VAvatarGroupProps {
  children: React.ReactNode;
  max?: number;
  spacing?: number;
  style?: StyleProp<ViewStyle>;
}

export const VAvatarGroup: React.FC<VAvatarGroupProps> = ({
  children,
  max = 3,
  spacing = -8,
  style,
}) => {
  const { tw } = useTheme();
  const childArray = React.Children.toArray(children);
  const displayChildren = max ? childArray.slice(0, max) : childArray;
  const remaining =
    max && childArray.length > max ? childArray.length - max : 0;

  return (
    <View style={[tw`flex-row items-center`, style]}>
      {displayChildren.map((child, index) => (
        <View
          key={index}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginLeft: index > 0 ? spacing : 0,
            zIndex: displayChildren.length - index,
          }}
        >
          {child}
        </View>
      ))}
      {remaining > 0 && (
        <View
          style={[
            tw`w-10 h-10 rounded-full bg-gray-300 items-center justify-center`,
            // eslint-disable-next-line react-native/no-inline-styles
            {
              marginLeft: spacing,
              zIndex: 0,
            },
          ]}
        >
          <Text style={tw`text-sm text-gray-700 font-semibold`}>
            +{remaining}
          </Text>
        </View>
      )}
    </View>
  );
};

export default VAvatarGroup;
