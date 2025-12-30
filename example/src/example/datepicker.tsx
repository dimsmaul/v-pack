import React, { useState } from 'react';
import { Text, View } from 'react-native';
import tw from '../../../src/utils/tw';
import { VButton, VDatePicker, VDialog, VDrawer, VTimePicker } from 'v-pack';

const ExampleDatePicker: React.FC = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [showPickerDrawer, setShowPickerDrawer] = useState(false);

  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showTimePickerDrawer, setShowTimePickerDrawer] = useState(false);

  return (
    <View
      style={tw`m-4 bg-white rounded-xl border border-gray-300 overflow-hidden`}
    >
      <Text
        style={tw`text-lg font-bold p-4 bg-gray-50 border-b border-gray-300`}
      >
        Date Picker
      </Text>
      <View style={tw`p-4 gap-3`}>
        <View style={tw`flex-1 justify-center items-center p-4`}>
          <Text style={tw`text-lg font-bold mb-2`}>Selected Date:</Text>
          <Text style={tw`text-gray-600 mb-4`}>
            {date.toLocaleDateString('en-US', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </Text>

          <View style={tw`flex-col gap-2`}>
            <VButton onPress={() => setShowPicker(true)}>
              Select Date Modal
            </VButton>
            <VButton onPress={() => setShowPickerDrawer(true)}>
              Select Date Drawer
            </VButton>
          </View>

          <VDialog
            visible={showPicker}
            onClose={() => setShowPicker(false)}
            title="Select Date"
            scrollable={false}
            bottomAction={
              <VButton type="primary" onPress={() => setShowPicker(false)}>
                Done
              </VButton>
            }
          >
            <VDatePicker value={date} onValueChange={setDate} />
          </VDialog>

          <VDrawer
            visible={showPickerDrawer}
            onClose={() => setShowPickerDrawer(false)}
            title="Select Date"
            scrollable={false}
            bottomAction={
              <VButton
                type="primary"
                onPress={() => {
                  console.log('OK pressed');
                  setShowPickerDrawer(false);
                }}
              >
                Oke
              </VButton>
            }
          >
            <VDatePicker value={date} onValueChange={setDate} />
          </VDrawer>
        </View>

        <View style={tw`flex-1 justify-center items-center p-4`}>
          <Text style={tw`text-lg font-bold mb-2`}>Selected Time:</Text>
          <Text style={tw`text-gray-600 mb-4`}>
            {time.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
            })}
          </Text>

          <View style={tw`flex-col gap-2`}>
            <VButton onPress={() => setShowTimePicker(true)}>
              Select Time Modal
            </VButton>
            <VButton onPress={() => setShowTimePickerDrawer(true)}>
              Select Time Drawer
            </VButton>
          </View>

          <VDialog
            visible={showTimePicker}
            onClose={() => setShowTimePicker(false)}
            title="Select Time"
            scrollable={false}
            bottomAction={
              <VButton type="primary" onPress={() => setShowTimePicker(false)}>
                Done
              </VButton>
            }
          >
            <VTimePicker
              value={time}
              onValueChange={setTime}
              mode="24h"
              showSeconds={true}
            />
          </VDialog>

          <VDrawer
            visible={showTimePickerDrawer}
            onClose={() => setShowTimePickerDrawer(false)}
            title="Select Time"
            scrollable={false}
            bottomAction={
              <VButton
                type="primary"
                onPress={() => {
                  console.log('OK pressed');
                  setShowTimePickerDrawer(false);
                }}
              >
                Oke
              </VButton>
            }
          >
            <VTimePicker
              value={time}
              onValueChange={setTime}
              mode="24h"
              showSeconds={true}
            />
          </VDrawer>
        </View>

        {/* <VButton onPress={() => setVisible(true)}>Open Drawer</VButton>

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
        </VDrawer> */}
      </View>
    </View>
  );
};

export default ExampleDatePicker;
