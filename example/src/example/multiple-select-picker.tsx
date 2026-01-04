import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme, VMultipleSelectInput } from 'v-pack';

const hobbies = [
  { label: 'Membaca', value: 'reading' },
  { label: 'Menulis', value: 'writing' },
  { label: 'Coding', value: 'coding' },
  { label: 'Gaming', value: 'gaming' },
  { label: 'Traveling', value: 'traveling' },
  { label: 'Photography', value: 'photography' },
  { label: 'Music', value: 'music' },
  { label: 'Sports', value: 'sports' },
];
const ExampleMultipleSelectPicker: React.FC = () => {
  const { tw } = useTheme();
  const [selectedHobbies, setSelectedHobbies] = useState<(string | number)[]>(
    []
  );

  return (
    <View
      style={tw`m-4 bg-white rounded-xl border border-gray-300 overflow-hidden`}
    >
      <Text
        style={tw`text-lg font-bold p-4 bg-gray-50 border-b border-gray-300`}
      >
        Multiple Select Picker
      </Text>
      <View style={tw`p-4`}>
        <VMultipleSelectInput
          value={selectedHobbies}
          onChange={setSelectedHobbies}
          options={hobbies}
          placeholder="Pilih hobi"
        />

        {/* With Label */}
        <VMultipleSelectInput
          label="Hobi"
          value={selectedHobbies}
          onChange={setSelectedHobbies}
          options={hobbies}
          placeholder="Pilih hobi"
        />

        {/* With Select All */}
        <VMultipleSelectInput
          label="Hobi"
          value={selectedHobbies}
          onChange={setSelectedHobbies}
          options={hobbies}
          placeholder="Pilih hobi"
          selectAllOption={true}
        />

        {/* Searchable */}
        <VMultipleSelectInput
          label="Hobi"
          value={selectedHobbies}
          onChange={setSelectedHobbies}
          options={hobbies}
          placeholder="Pilih hobi"
          searchable={true}
        />

        {/* With Custom Max Display Count */}
        <VMultipleSelectInput
          label="Hobi"
          value={selectedHobbies}
          onChange={setSelectedHobbies}
          options={hobbies}
          placeholder="Pilih hobi"
          maxDisplayCount={2} // Show "n item selected" after 2 items
        />

        {/* With Description */}
        <VMultipleSelectInput
          label="Skills"
          value={selectedHobbies}
          onChange={setSelectedHobbies}
          options={[
            {
              label: 'React Native',
              value: 'rn',
              description: 'Mobile development',
            },
            {
              label: 'TypeScript',
              value: 'ts',
              description: 'Type-safe JavaScript',
            },
            {
              label: 'Node.js',
              value: 'node',
              description: 'Backend development',
            },
          ]}
          placeholder="Pilih skills"
        />

        {/* Display Selected Count */}
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            marginTop: 16,
            padding: 12,
            backgroundColor: '#F0F9FF',
            borderRadius: 8,
          }}
        >
          <Text style={{ fontSize: 14, color: '#1E40AF', fontWeight: 'bold' }}>
            {selectedHobbies.length} hobi dipilih
          </Text>
          {selectedHobbies.length > 0 && (
            <Text style={{ fontSize: 12, color: '#64748B', marginTop: 4 }}>
              {selectedHobbies
                .map((val) => hobbies.find((h) => h.value === val)?.label)
                .join(', ')}
            </Text>
          )}
        </View>
      </View>
    </View>
  );
};

export default ExampleMultipleSelectPicker;
