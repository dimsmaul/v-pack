import { useState } from 'react';
import { Text, View } from 'react-native';
import { VTabs, VTabsContent, VTabsList, VTabsTrigger } from 'v-pack';
import tw from '../../../src/utils/tw';

const ExampleTabs = () => {
  const [activeTab, setActiveTab] = useState('tab1');
  return (
    <View
      style={tw`m-4 bg-white rounded-xl border border-gray-300 overflow-hidden`}
    >
      <Text
        style={tw`text-lg font-bold p-4 bg-gray-50 border-b border-gray-300`}
      >
        Tabs
      </Text>
      <View style={tw`p-4`}>
        {/* Example 1: 2 Tabs */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-lg font-bold mb-2`}>2 Tabs</Text>
          <VTabs value={activeTab} onValueChange={setActiveTab}>
            <VTabsList>
              <VTabsTrigger value="tab1">Tabs 1</VTabsTrigger>
              <VTabsTrigger value="tab2">Tabs 2</VTabsTrigger>
            </VTabsList>
            <VTabsContent value="tab1">
              <View style={tw`bg-white p-4 rounded-lg`}>
                <Text>Content for Tab 1</Text>
              </View>
            </VTabsContent>
            <VTabsContent value="tab2">
              <View style={tw`bg-white p-4 rounded-lg`}>
                <Text>Content for Tab 2</Text>
              </View>
            </VTabsContent>
          </VTabs>
        </View>

        {/* Example 2: 3 Tabs */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-lg font-bold mb-2`}>3 Tabs</Text>
          <VTabs value={activeTab} onValueChange={setActiveTab}>
            <VTabsList>
              <VTabsTrigger value="tab1">Tabs 1</VTabsTrigger>
              <VTabsTrigger value="tab2">Tabs 2</VTabsTrigger>
              <VTabsTrigger value="tab3">Tabs 3</VTabsTrigger>
            </VTabsList>
            <VTabsContent value="tab1">
              <Text>Content 1</Text>
            </VTabsContent>
            <VTabsContent value="tab2">
              <Text>Content 2</Text>
            </VTabsContent>
            <VTabsContent value="tab3">
              <Text>Content 3</Text>
            </VTabsContent>
          </VTabs>
        </View>

        {/* Example 3: 4 Tabs */}
        <View style={tw`mb-6`}>
          <Text style={tw`text-lg font-bold mb-2`}>4 Tabs</Text>
          <VTabs value={activeTab} onValueChange={setActiveTab}>
            <VTabsList>
              <VTabsTrigger value="tab1">Tabs 1</VTabsTrigger>
              <VTabsTrigger value="tab2">Tabs 2</VTabsTrigger>
              <VTabsTrigger value="tab3">Tabs 3</VTabsTrigger>
              <VTabsTrigger value="tab4">Tabs 4</VTabsTrigger>
            </VTabsList>
            <VTabsContent value="tab1">
              <Text>Content 1</Text>
            </VTabsContent>
            <VTabsContent value="tab2">
              <Text>Content 2</Text>
            </VTabsContent>
            <VTabsContent value="tab3">
              <Text>Content 3</Text>
            </VTabsContent>
            <VTabsContent value="tab4">
              <Text>Content 4</Text>
            </VTabsContent>
          </VTabs>
        </View>
      </View>
    </View>
  );
};

export default ExampleTabs;
