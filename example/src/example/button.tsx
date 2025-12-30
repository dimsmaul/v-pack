import React from 'react';
import { Text, View } from 'react-native';
import tw from '../../../src/utils/tw';
import { VButton } from 'v-pack';

const ExampleButton: React.FC = () => {
  return (
    <View
      style={tw`m-4 bg-white rounded-xl border border-gray-300 overflow-hidden`}
    >
      <Text
        style={tw`text-lg font-bold p-4 bg-gray-50 border-b border-gray-300`}
      >
        Button
      </Text>
      <View style={tw`p-4 gap-3`}>
        <VButton type="primary">Primary Button</VButton>
        <VButton type="warning" variant="outline">
          Warning Outline
        </VButton>
        <VButton type="success" variant="ghost">
          Success Ghost
        </VButton>
        <VButton size="small">Small</VButton>
        <VButton size="medium">Medium</VButton>
        <VButton size="large">Large</VButton>
        <VButton disabled>Disabled Button</VButton>
        <VButton variant="outline" disabled>
          Disabled Outline
        </VButton>
        <VButton type="danger" onPress={() => console.log('Pressed')}>
          Delete
        </VButton>
      </View>
    </View>
  );
};

export default ExampleButton;
