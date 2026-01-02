import React from 'react';
import { Text, View } from 'react-native';
import { useTheme, VBadge } from 'v-pack';
import { Bell, Mail, ShoppingCart } from 'lucide-react-native';

const ExampleBadge: React.FC = () => {
  const { tw } = useTheme();

  return (
    <View
      style={tw`m-4 bg-white rounded-xl border border-gray-300 overflow-hidden`}
    >
      <Text
        style={tw`text-lg font-bold p-4 bg-gray-50 border-b border-gray-300`}
      >
        Badge
      </Text>
      <View style={tw`p-4 flex flex-row flex-wrap gap-6`}>
        <VBadge content={6}>
          <Bell size={24} />
        </VBadge>

        <VBadge content={156} max={99}>
          <Mail size={24} />
        </VBadge>

        <VBadge dot>
          <Bell size={24} />
        </VBadge>

        <VBadge content={24} variant="primary">
          <ShoppingCart size={24} />
        </VBadge>
        <VBadge content={18} variant="success">
          <Bell size={24} />
        </VBadge>

        <VBadge content={2} size="sm">
          <Bell size={20} />
        </VBadge>
        <VBadge content={24} size="lg">
          <Bell size={28} />
        </VBadge>

        <VBadge content={5} offset={{ top: -4, right: -4 }}>
          <Bell size={24} />
        </VBadge>

        <VBadge content={16} />
        <VBadge content="NEW" variant="primary" />
      </View>
    </View>
  );
};

export default ExampleBadge;
