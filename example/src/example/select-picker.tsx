import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme, VSelectInput } from 'v-pack';

const countries = [
  { label: 'Indonesia', value: 'id' },
  { label: 'Malaysia', value: 'my' },
  { label: 'Singapore', value: 'sg' },
  { label: 'Thailand', value: 'th' },
  { label: 'Vietnam', value: 'vn' },
];

const ExampleSelectPicker: React.FC = () => {
  const { tw } = useTheme();
  const [country, setCountry] = useState<string | number | null>(null);
  return (
    <View
      style={tw`m-4 bg-white rounded-xl border border-gray-300 overflow-hidden`}
    >
      <Text
        style={tw`text-lg font-bold p-4 bg-gray-50 border-b border-gray-300`}
      >
        Select Picker
      </Text>
      <View style={tw`p-4`}>
        <VSelectInput
          value={country}
          onChange={setCountry}
          options={countries}
          placeholder="Pilih negara"
        />

        {/* With Label */}
        <VSelectInput
          label="Negara"
          value={country}
          onChange={setCountry}
          options={countries}
          placeholder="Pilih negara"
        />

        {/* Searchable */}
        <VSelectInput
          label="Negara"
          value={country}
          onChange={setCountry}
          options={countries}
          placeholder="Pilih negara"
          searchable={true}
        />

        {/* With Description */}
        <VSelectInput
          label="Kota"
          value={country}
          onChange={setCountry}
          options={[
            {
              label: 'Jakarta',
              value: 'jkt',
              description: 'Ibu kota Indonesia',
            },
            { label: 'Surabaya', value: 'sby', description: 'Kota Pahlawan' },
            { label: 'Bandung', value: 'bdg', description: 'Kota Kembang' },
          ]}
          placeholder="Pilih kota"
        />

        {/* With Disabled Option */}
        <VSelectInput
          value={country}
          onChange={setCountry}
          options={[
            { label: 'Indonesia', value: 'id' },
            { label: 'Malaysia', value: 'my', disabled: true },
            { label: 'Singapore', value: 'sg' },
          ]}
          placeholder="Pilih negara"
        />

        {/* With Error */}
        <VSelectInput
          label="Negara"
          value={country}
          onChange={setCountry}
          options={countries}
          error={!country}
          errorMessage="Negara harus dipilih"
          placeholder="Pilih negara"
        />

        {/* Display Selected */}
        {country && (
          <Text style={{ marginTop: 16, color: '#4A9B9F' }}>
            Selected: {countries.find((c) => c.value === country)?.label}
          </Text>
        )}
      </View>
    </View>
  );
};

export default ExampleSelectPicker;
