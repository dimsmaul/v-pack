import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme, VButton, VDrawer } from 'v-pack';

const ExampleDrawer: React.FC = () => {
  const { tw } = useTheme();
  const [visible, setVisible] = useState(false);
  return (
    <View
      style={tw`m-4 bg-white rounded-xl border border-gray-300 overflow-hidden`}
    >
      <Text
        style={tw`text-lg font-bold p-4 bg-gray-50 border-b border-gray-300`}
      >
        Drawer
      </Text>
      <View style={tw`p-4 gap-3`}>
        <VButton onPress={() => setVisible(true)}>Open Drawer</VButton>

        <VDrawer
          visible={visible}
          onClose={() => setVisible(false)}
          title="Choose your team"
          bottomAction={
            <VButton
              type="primary"
              onPress={() => {
                console.log('OK pressed');
                setVisible(false);
              }}
            >
              Oke
            </VButton>
          }
        >
          {/* Scrollable Content */}
          <View>
            <Text style={tw`py-4 text-base border-b border-gray-200`}>
              Barcelona
            </Text>
            <Text style={tw`py-4 text-base border-b border-gray-200`}>
              Manchaster United
            </Text>
            <Text style={tw`py-4 text-base border-b border-gray-200`}>
              Real Madrid
            </Text>
            <Text style={tw`py-4 text-base border-b border-gray-200`}>
              Juventus
            </Text>
            <Text style={tw`py-4 text-base border-b border-gray-200`}>
              Ajax
            </Text>
            <Text style={tw`py-4 text-base border-b border-gray-200`}>
              Liverpool
            </Text>
            <Text style={tw`py-4 text-base border-b border-gray-200`}>
              Chelsea
            </Text>
            <Text style={tw`py-4 text-base border-b border-gray-200`}>
              Arsenal
            </Text>
            <Text style={tw`py-4 text-base border-b border-gray-200`}>
              Barcelona
            </Text>
            <Text style={tw`py-4 text-base border-b border-gray-200`}>
              Manchaster United
            </Text>
            <Text style={tw`py-4 text-base border-b border-gray-200`}>
              Real Madrid
            </Text>
            <Text style={tw`py-4 text-base border-b border-gray-200`}>
              Juventus
            </Text>
            <Text style={tw`py-4 text-base border-b border-gray-200`}>
              Ajax
            </Text>
            <Text style={tw`py-4 text-base border-b border-gray-200`}>
              Liverpool
            </Text>
          </View>
        </VDrawer>
      </View>
    </View>
  );
};

export default ExampleDrawer;
