import React from 'react';
import { ScrollView, View } from 'react-native';
import tw from '../../../src/utils/tw';
import ExampleAccordion from '../example/accordion';
import ExampleBadge from '../example/badge';
import ExampleBanner from '../example/banner';
import ExampleButton from '../example/button';
import ExampleCalendar from '../example/calendar';
import ExampleCalendarRange from '../example/calendar-range';
import ExampleCheckbox from '../example/checkbox';
import ExampleDatePicker from '../example/datepicker';
import ExampleDialog from '../example/dialog';
import ExampleDrawer from '../example/drawer';
import ExampleForm from '../example/input';
import ExampleQuantity from '../example/quantity';
import ExampleSnackbar from '../example/snackbar';
import ExampleTabs from '../example/tabs';
import ExampleTooltip from '../example/tooltip';

const Documentation: React.FC = () => {
  return (
    <>
      <ScrollView style={tw`flex-1 bg-gray-100`}>
        <View
          style={tw`md:flex-row md:flex-wrap flex flex-col justify-center items-start pt-6`}
        >
          <View style={tw`md:w-1/2 w-full`}>
            <ExampleForm />

            {/* Banner Section */}
            <ExampleBanner />

            <ExampleSnackbar />

            <ExampleCheckbox />
            <ExampleCalendar />
            <ExampleCalendarRange />
          </View>
          <View style={tw`md:w-1/2 w-full`}>
            {/* Accordion Section */}
            <ExampleAccordion />

            {/* Tabs Section */}
            <ExampleTabs />

            {/* Button Section */}
            <ExampleButton />

            <ExampleDrawer />
            <ExampleDialog />
            <ExampleDatePicker />
            <ExampleQuantity />
            <ExampleBadge />
            <ExampleTooltip />
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={tw`h-10`} />
      </ScrollView>
    </>
  );
};

export default Documentation;
