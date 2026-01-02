import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme, VCheckbox, VSlider, VToggle } from 'v-pack';

const ExampleCheckbox: React.FC = () => {
  const { tw } = useTheme();
  const [checked, setChecked] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  return (
    <View
      style={tw`m-4 bg-white rounded-xl border border-gray-300 overflow-hidden`}
    >
      <Text
        style={tw`text-lg font-bold p-4 bg-gray-50 border-b border-gray-300`}
      >
        Checkbox
      </Text>
      <View style={tw`p-4 gap-6`}>
        {/* Checkbox */}
        <View>
          <Text style={tw`mb-2 font-semibold`}>
            Checkbox (checked: {checked.toString()})
          </Text>
          <View style={tw`flex-row items-center gap-2`}>
            <VCheckbox
              checked={checked}
              onCheckedChange={setChecked}
              size="sm"
            />
            <VCheckbox
              checked={checked}
              onCheckedChange={setChecked}
              size="md"
            />
            <VCheckbox
              checked={checked}
              onCheckedChange={setChecked}
              size="lg"
            />
          </View>
        </View>
        <View>
          <Text style={tw`mb-2 font-semibold`}>
            Radio (checked: {checked.toString()})
          </Text>
          <View style={tw`flex-row items-center gap-2`}>
            <VCheckbox
              checked={checked}
              onCheckedChange={setChecked}
              size="sm"
              type="radio"
            />
            <VCheckbox
              checked={checked}
              onCheckedChange={setChecked}
              size="md"
              type="radio"
            />
            <VCheckbox
              checked={checked}
              onCheckedChange={setChecked}
              size="lg"
              type="radio"
            />
          </View>
        </View>

        {/* Toggle */}
        <View>
          <Text style={tw`mb-2 font-semibold`}>
            Toggle (toggled: {toggled.toString()})
          </Text>
          <View style={tw`flex-row items-center gap-2`}>
            <VToggle checked={toggled} onCheckedChange={setToggled} size="sm" />
            <VToggle checked={toggled} onCheckedChange={setToggled} size="md" />
            <VToggle checked={toggled} onCheckedChange={setToggled} size="lg" />
          </View>
        </View>

        {/* Slider */}
        <View>
          <Text style={tw`mb-2 font-semibold`}>Slider: {sliderValue}</Text>
          <VSlider
            value={sliderValue}
            onValueChange={setSliderValue}
            min={0}
            max={100}
            step={5}
            variant="primary"
          />
        </View>
      </View>
    </View>
  );
};

export default ExampleCheckbox;
