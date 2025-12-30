import { ScrollView, View } from 'react-native';
import tw from 'twrnc';
import ExampleTabs from './example/tabs';
import ExampleAccordion from './example/accordion';
import ExampleButton from './example/button';
import ExampleBanner from './example/banner';

export default function App() {
  return (
    <ScrollView style={tw`flex-1 bg-gray-100`}>
      {/* Accordion Section */}
      <ExampleAccordion />

      {/* Tabs Section */}
      <ExampleTabs />

      {/* Banner Section */}
      <ExampleBanner />

      {/* Button Section */}
      <ExampleButton />

      {/* Bottom spacing */}
      <View style={tw`h-10`} />
    </ScrollView>
  );
}
