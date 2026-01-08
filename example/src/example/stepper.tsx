import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useTheme, VButton, VStepper } from 'v-pack';

const steps = [
  { label: 'Cart', description: 'Review items' },
  { label: 'Shipping', description: 'Enter address' },
  { label: 'Payment', description: 'Choose method' },
  { label: 'Confirm', description: 'Place order' },
];

const ExampleStepper: React.FC = () => {
  const { tw } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <View
      style={tw`m-4 bg-white rounded-xl border border-gray-300 overflow-hidden`}
    >
      <Text
        style={tw`text-lg font-bold p-4 bg-gray-50 border-b border-gray-300`}
      >
        Stepper
      </Text>
      <View style={tw`p-4 gap-3`}>
        <VStepper steps={steps} currentStep={currentStep} />
        <VStepper
          steps={steps}
          currentStep={currentStep}
          orientation="vertical"
        />
        <VStepper steps={steps} currentStep={currentStep} variant="dots" />
        <VStepper
          steps={steps}
          currentStep={currentStep}
          activeColor="#EF4444"
          completedColor="#10B981"
          inactiveColor="#E5E7EB"
        />
        <VStepper
          steps={steps}
          currentStep={currentStep}
          showDescription={false}
        />

        <VButton
          onPress={() => {
            setCurrentStep((prev) => (prev + 1) % steps.length);
          }}
        >
          Next Step
        </VButton>
      </View>
    </View>
  );
};

export default ExampleStepper;
