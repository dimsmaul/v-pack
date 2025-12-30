import { ScrollView, View } from 'react-native';
import tw from 'twrnc';
import ExampleTabs from './example/tabs';
import ExampleAccordion from './example/accordion';
import ExampleButton from './example/button';
import ExampleBanner from './example/banner';
import { VSnackbarProvider } from 'v-pack';
import ExampleSnackbar from './example/snackbar';

export default function App() {
  return (
    <VSnackbarProvider>
      <ScrollView style={tw`flex-1 bg-gray-100`}>
        {/* Accordion Section */}
        <ExampleAccordion />

        {/* Tabs Section */}
        <ExampleTabs />

        {/* Banner Section */}
        <ExampleBanner />

        {/* Button Section */}
        <ExampleButton />

        <ExampleSnackbar />

        {/* Bottom spacing */}
        <View style={tw`h-10`} />
      </ScrollView>
    </VSnackbarProvider>
  );
}
