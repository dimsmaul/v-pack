import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme, VRating } from 'v-pack';

const ExampleRating: React.FC = () => {
  const { tw } = useTheme();
  const [rating, setRating] = useState(3);
  return (
    <View
      style={tw`m-4 bg-white rounded-xl border border-gray-300 overflow-hidden`}
    >
      <Text
        style={tw`text-lg font-bold p-4 bg-gray-50 border-b border-gray-300`}
      >
        Rating
      </Text>
      <View style={tw`p-4 flex flex-row flex-wrap gap-6`}>
        <VRating value={rating} onChange={setRating} />
        <VRating value={3.5} allowHalf readOnly />
        <VRating value={4} showValue />
        <VRating size={32} color="#EF4444" emptyColor="#FEE2E2" />
        <VRating value={4.5} allowHalf readOnly showValue />
        <VRating value={3} disabled />
        <VRating max={10} value={7} />
      </View>
    </View>
  );
};

export default ExampleRating;
