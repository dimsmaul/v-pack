import { View, Text, type ViewStyle } from 'react-native';
import { Check } from 'lucide-react-native';
import { useTheme } from '../../theme/ThemeProvider';

export type VStepperStep = {
  label: string;
  description?: string;
};

export type VStepperProps = {
  steps: VStepperStep[];
  currentStep: number;
  variant?: 'default' | 'dots' | 'numbers';
  orientation?: 'horizontal' | 'vertical';
  showDescription?: boolean;
  activeColor?: string;
  inactiveColor?: string;
  completedColor?: string;
  containerStyle?: ViewStyle;
  stepStyle?: ViewStyle;
  labelStyle?: ViewStyle;
};

export default function VStepper({
  steps,
  currentStep,
  variant = 'default',
  orientation = 'horizontal',
  showDescription = true,
  activeColor,
  inactiveColor,
  completedColor,
  containerStyle,
  stepStyle,
  labelStyle,
}: VStepperProps) {
  const { tw } = useTheme();

  const activeColorClass = activeColor || '#3B82F6';
  const inactiveColorClass = inactiveColor || '#D1D5DB';
  const completedColorClass = completedColor || '#10B981';

  const getStepStatus = (
    index: number
  ): 'completed' | 'active' | 'inactive' => {
    if (index < currentStep) return 'completed';
    if (index === currentStep) return 'active';
    return 'inactive';
  };

  const renderStepIndicator = (
    index: number,
    status: 'completed' | 'active' | 'inactive'
  ) => {
    const stepNumber = index + 1;

    if (variant === 'dots') {
      return (
        <View
          style={tw.style(
            `rounded-full`,

            status === 'completed' && {
              backgroundColor: completedColorClass,
              width: 12,
              height: 12,
            },
            status === 'active' && {
              backgroundColor: activeColorClass,
              width: 16,
              height: 16,
            },
            status === 'inactive' && {
              backgroundColor: inactiveColorClass,
              width: 12,
              height: 12,
            },
            stepStyle
          )}
        />
      );
    }

    return (
      <View
        style={[
          tw`w-10 h-10 rounded-full items-center justify-center`,
          status === 'completed' && { backgroundColor: completedColorClass },
          status === 'active' && { backgroundColor: activeColorClass },
          status === 'inactive' && { backgroundColor: inactiveColorClass },
          stepStyle,
        ]}
      >
        {status === 'completed' ? (
          <Check size={20} color="white" />
        ) : (
          <Text style={tw`text-white font-bold`}>{stepNumber}</Text>
        )}
      </View>
    );
  };

  if (orientation === 'horizontal') {
    return (
      <View style={[tw``, containerStyle]}>
        {/* Row untuk indicators + connectors */}
        <View style={tw`flex-row items-center`}>
          {steps.map((_, index) => {
            const status = getStepStatus(index);
            const isLastStep = index === steps.length - 1;
            const stepWidth = 100 / steps.length; // percentage width per step

            return (
              <View
                key={index}
                style={[tw`items-center`, { width: `${stepWidth}%` }]}
              >
                <View style={tw`relative w-full items-center`}>
                  {/* Connector - positioned absolutely behind indicator */}
                  {!isLastStep && (
                    <View
                      style={[
                        tw`absolute h-0.5`,
                        {
                          backgroundColor:
                            index < currentStep
                              ? completedColorClass
                              : inactiveColorClass,
                          width: '100%',
                          left: '50%',
                          top: '50%',
                        },
                      ]}
                    />
                  )}

                  {/* Indicator - rendered on top */}
                  <View style={tw`z-10`}>
                    {renderStepIndicator(index, status)}
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* Row untuk labels + descriptions */}
        <View style={tw`flex-row items-start mt-2`}>
          {steps.map((step, index) => {
            const status = getStepStatus(index);
            const stepWidth = 100 / steps.length;

            return (
              <View
                key={index}
                style={[tw`items-center px-1`, { width: `${stepWidth}%` }]}
              >
                <Text
                  style={[
                    tw`text-sm font-semibold text-center`,
                    status === 'active' && { color: activeColorClass },
                    status === 'completed' && { color: completedColorClass },
                    status === 'inactive' && tw`text-gray-400`,
                    labelStyle,
                  ]}
                >
                  {step.label}
                </Text>

                {showDescription && step.description && (
                  <Text
                    style={[
                      tw`text-xs text-center mt-1`,
                      status === 'inactive'
                        ? tw`text-gray-400`
                        : tw`text-gray-600`,
                    ]}
                  >
                    {step.description}
                  </Text>
                )}
              </View>
            );
          })}
        </View>
      </View>
    );
  }

  // Vertical orientation
  return (
    <View style={[tw`flex-col`, containerStyle]}>
      {steps.map((step, index) => {
        const status = getStepStatus(index);
        const isLastStep = index === steps.length - 1;

        return (
          <View key={index}>
            <View style={tw`flex-row items-start`}>
              <View style={tw`items-center`}>
                {renderStepIndicator(index, status)}

                {!isLastStep && (
                  <View
                    style={[
                      tw`w-0.5 h-12 my-2`,
                      {
                        backgroundColor:
                          index < currentStep
                            ? completedColorClass
                            : inactiveColorClass,
                      },
                    ]}
                  />
                )}
              </View>

              <View style={tw`ml-4 flex-1 ${!isLastStep ? 'pb-2' : ''}`}>
                <Text
                  style={[
                    tw`text-base font-semibold`,
                    status === 'active' && { color: activeColorClass },
                    status === 'completed' && { color: completedColorClass },
                    status === 'inactive' && tw`text-gray-400`,
                    labelStyle,
                  ]}
                >
                  {step.label}
                </Text>

                {showDescription && step.description && (
                  <Text
                    style={[
                      tw`text-sm mt-1`,
                      status === 'inactive'
                        ? tw`text-gray-400`
                        : tw`text-gray-600`,
                    ]}
                  >
                    {step.description}
                  </Text>
                )}
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
}
