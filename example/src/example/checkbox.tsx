import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme, VCheckbox, VSlider, VToggle } from 'v-pack';

const ExampleCheckbox: React.FC = () => {
  const { tw } = useTheme();
  const [checked, setChecked] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [volume, setVolume] = useState(50);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000000);
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
          <Text style={tw`mb-2 font-semibold`}>Slider: {volume}</Text>
          <VSlider
            min={0}
            max={100}
            value={volume}
            onChange={setVolume}
            showMinMax
          />
          <VSlider
            min={0}
            max={100}
            value={volume}
            onChange={setVolume}
            showMinMax
            disabled
          />
          <VSlider
            min={0}
            max={10}
            step={1}
            trackColor="#E5E7EB"
            activeTrackColor="#10B981"
            thumbColor="#10B981"
            showValue
            showMinMax
          />

          <View style={tw`p-4`}>
            <Text style={tw`text-lg font-bold mb-4`}>Price Range</Text>

            <Text style={tw`text-gray-600 mb-2`}>
              Min: Rp {minPrice.toLocaleString()}
            </Text>
            <VSlider
              min={0}
              max={1000000}
              step={50000}
              value={minPrice}
              onChange={setMinPrice}
              showMinMax
            />

            <Text style={tw`text-gray-600 mb-2 mt-4`}>
              Max: Rp {maxPrice.toLocaleString()}
            </Text>
            <VSlider
              min={0}
              max={1000000}
              step={50000}
              value={maxPrice}
              onChange={setMaxPrice}
              showMinMax
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ExampleCheckbox;
