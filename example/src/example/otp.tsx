import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme, VOtpInput } from 'v-pack';

const ExampleOtp: React.FC = () => {
  const { tw } = useTheme();
  const [otp, setOtp] = useState('');

  const verifyOtp = (enteredOtp: string) => {
    console.log('Verifying OTP:', enteredOtp);
    // Add your OTP verification logic here
  };

  const verifyPin = (enteredPin: string) => {
    console.log('Verifying PIN:', enteredPin);
    // Add your PIN verification logic here
  };

  const hasError = otp.length > 0 && otp !== '123456';
  return (
    <View
      style={tw`m-4 bg-white rounded-xl border border-gray-300 overflow-hidden`}
    >
      <Text
        style={tw`text-lg font-bold p-4 bg-gray-50 border-b border-gray-300`}
      >
        OTP
      </Text>
      <View style={tw`p-4 flex flex-row flex-wrap gap-6`}>
        <VOtpInput
          length={6}
          onChange={(dt) => console.log('OTP:', dt)}
          onComplete={(dt) => {
            console.log('Complete:', dt);
            // Verify OTP
          }}
        />
        <Text>{otp ? `Entered OTP: ${otp}` : 'Please enter the OTP'}</Text>
        <VOtpInput
          length={6}
          value={otp}
          onChange={setOtp}
          onComplete={verifyOtp}
        />
        <VOtpInput length={4} secureTextEntry onComplete={verifyPin} />
        <VOtpInput
          length={6}
          error={hasError}
          errorInputStyle={tw`bg-red-50`}
        />
      </View>
    </View>
  );
};

export default ExampleOtp;
