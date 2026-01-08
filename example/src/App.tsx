import { ScrollView, View } from 'react-native';
import tw, { useDeviceContext } from 'twrnc';
import ExampleTabs from './example/tabs';
import ExampleAccordion from './example/accordion';
import ExampleButton from './example/button';
import ExampleBanner from './example/banner';
import { VPackProvider } from 'v-pack';
import ExampleSnackbar from './example/snackbar';
import ExampleDrawer from './example/drawer';
import ExampleDialog from './example/dialog';
import ExampleDatePicker from './example/datepicker';
import ExampleForm from './example/input';
import ExampleCheckbox from './example/checkbox';
import ExampleQuantity from './example/quantity';
import ExampleBadge from './example/badge';
import ExampleTooltip from './example/tooltip';
import ExampleCalendar from './example/calendar';
import ExampleCalendarRange from './example/calendar-range';
import ExampleAvatar from './example/avatar';
import ExampleCalendarInput from './example/calendar-input';
import ExampleCalendarRangeInput from './example/calendar-range-input';
import ExampleSelectPicker from './example/select-picker';
import ExampleMultipleSelectPicker from './example/multiple-select-picker';
import ExampleCarousel from './example/carousel';
import ExampleOtp from './example/otp';
import ExampleRating from './example/rating';
import ExampleStepper from './example/stepper';

const theme = require('./../tailwind.config.js');

export default function App() {
  useDeviceContext(tw);
  return (
    <VPackProvider theme={theme}>
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

            <ExampleCarousel />
            <ExampleStepper />
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
            <ExampleAvatar />
            <ExampleCalendarInput />
            <ExampleCalendarRangeInput />

            <ExampleSelectPicker />
            <ExampleMultipleSelectPicker />
            <ExampleOtp />
            <ExampleRating />
          </View>
        </View>

        {/* Bottom spacing */}
        <View style={tw`h-10`} />
      </ScrollView>
    </VPackProvider>
  );
}
