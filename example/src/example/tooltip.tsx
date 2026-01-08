import React from 'react';
import { Text, View } from 'react-native';
import { useTheme, VTooltip } from 'v-pack';
import { Info } from 'lucide-react-native';

const ExampleTooltip: React.FC = () => {
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
        <VTooltip
          content="A tooltip displays when the cursor hovers over an icon, image, hyperlink, or other element in a graphical user interface."
          placement="top"
        >
          <Text>Tooltips</Text>
        </VTooltip>
        <VTooltip
          content="A tooltip displays when the cursor hovers over an icon, image, hyperlink, or other element in a graphical user interface."
          placement="bottom"
        >
          <Text>Tooltips</Text>
        </VTooltip>
        <VTooltip
          content="A tooltip displays when the cursor hovers over an icon, image, hyperlink, or other element in a graphical user interface."
          placement="left"
        >
          <Info size={24} />
        </VTooltip>
        <VTooltip
          content="A tooltip displays when the cursor hovers over an icon, image, hyperlink, or other element in a graphical user interface."
          placement="right"
        >
          <Text>Tooltips</Text>
        </VTooltip>
      </View>
    </View>
  );
};

export default ExampleTooltip;
