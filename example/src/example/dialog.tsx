import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme, VButton, VDialog } from 'v-pack';

const ExampleDialog: React.FC = () => {
  const { tw } = useTheme();
  const [visible, setVisible] = useState(false);
  return (
    <View
      style={tw`m-4 bg-white rounded-xl border border-gray-300 overflow-hidden`}
    >
      <Text
        style={tw`text-lg font-bold p-4 bg-gray-50 border-b border-gray-300`}
      >
        Dialog
      </Text>
      <View style={tw`p-4 gap-3`}>
        <VButton onPress={() => setVisible(true)}>Open Dialog</VButton>

        <VDialog
          visible={visible}
          onClose={() => setVisible(false)}
          title="Dialog Title"
        >
          <Text style={tw`text-gray-600`}>
            This is a simple dialog with fade in/out animation. Lorem ipsum,
            dolor sit amet consectetur adipisicing elit. Temporibus placeat
            possimus aliquam necessitatibus voluptatem numquam consectetur nulla
            facere, praesentium voluptates dolores ratione aspernatur asperiores
            dolorum quasi sit incidunt hic earum.
          </Text>
        </VDialog>
      </View>
    </View>
  );
};

export default ExampleDialog;
