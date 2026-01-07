# VOtpInput
OTP/PIN input component with auto-focus between fields, paste support, and customizable styling.

## Basic Usage
```tsx
import { VOtpInput } from 'v-pack';
import { useState } from 'react';

// Simple OTP input
<VOtpInput
  length={6}
  onChange={(otp) => console.log('OTP:', otp)}
  onComplete={(otp) => console.log('Complete:', otp)}
/>

// Controlled
const [otp, setOtp] = useState('');

<VOtpInput
  length={6}
  value={otp}
  onChange={setOtp}
  onComplete={(code) => {
    // Verify OTP
    verifyOtp(code);
  }}
/>
```
## Features
### Length
```tsx
// 4-digit PIN
<VOtpInput length={4} />

// 6-digit OTP (default)
<VOtpInput length={6} />

// Custom length
<VOtpInput length={8} />
```
### Secure Entry (PIN/Password)
```tsx
// Hide digits for PIN entry
<VOtpInput
  length={4}
  secureTextEntry
  onComplete={verifyPin}
/>

// Password with 8 digits
<VOtpInput
  length={8}
  secureTextEntry
  onComplete={handlePassword}
/>
```
### Auto Focus
```tsx
// Auto-focus first input (default)
<VOtpInput autoFocus />

// Don't auto-focus
<VOtpInput autoFocus={false} />
```
### Error State
```tsx
const [otp, setOtp] = useState('');
const [error, setError] = useState(false);

<VOtpInput
  value={otp}
  onChange={(code) => {
    setOtp(code);
    setError(false);
  }}
  onComplete={async (code) => {
    const isValid = await verifyOtp(code);
    if (!isValid) {
      setError(true);
      setOtp(''); // Clear input
    }
  }}
  error={error}
/>

{error && (
  <Text style={tw`text-danger-500 text-sm mt-2`}>
    Invalid OTP code. Please try again.
  </Text>
)}
```
### Disabled State
```tsx
<VOtpInput
  length={6}
  disabled
  value="123456"
/>
```
### Custom Styling
```tsx
// Custom input style
<VOtpInput
  length={6}
  inputStyle={tw`w-14 h-16 text-2xl bg-gray-50`}
  focusedInputStyle={tw`bg-primary-50 border-primary-600`}
  errorInputStyle={tw`bg-danger-50 border-danger-600`}
/>

// Custom container
<VOtpInput
  length={6}
  containerStyle={tw`gap-4 justify-center`}
/>
```
## Props
| Prop              | Type                  | Default | Description                               |
| ----------------- | --------------------- | ------- | ----------------------------------------- |
| length            | number                | 6       | Number of input fields                    |
| value             | string                | ''      | Controlled value                          |
| onChange          | (otp: string) => void | -       | Callback fired on every change            |
| onComplete        | (otp: string) => void | -       | Callback fired when all fields are filled |
| disabled          | boolean               | false   | Disable all inputs                        |
| secureTextEntry   | boolean               | false   | Hide input characters (for PIN)           |
| autoFocus         | boolean               | true    | Auto-focus first input on mount           |
| error             | boolean               | false   | Show error state                          |
| containerStyle    | ViewStyle             | -       | Custom container style                    |
| inputStyle        | ViewStyle             | -       | Custom input field style                  |
| focusedInputStyle | ViewStyle             | -       | Style for focused input                   |
| errorInputStyle   | ViewStyle             | -       | Style for inputs in error state           |
| inputProps        | TextInputProps        | -       | Additional props for TextInput            |

## Advanced Examples
### Using with VForm

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  VForm,
  VFormField,
  VFormItem,
  VFormLabel,
  VFormControl,
  VFormMessage,
  VOtpInput,
  VButton,
} from 'v-pack';

const otpSchema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be 6 digits')
    .regex(/^\d+$/, 'OTP must contain only numbers'),
});

type OtpFormValues = z.infer<typeof otpSchema>;

export default function OtpVerificationScreen() {
  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = async (data: OtpFormValues) => {
    try {
      await verifyOtp(data.otp);
      navigation.navigate('Success');
    } catch (error) {
      form.setError('otp', {
        message: 'Invalid OTP code. Please try again.',
      });
      form.setValue('otp', '');
    }
  };

  return (
    <View style={tw`flex-1 p-6 justify-center`}>
      <Text style={tw`text-3xl font-bold mb-2`}>Verify OTP</Text>
      <Text style={tw`text-gray-600 mb-8`}>
        Enter the 6-digit code sent to your phone
      </Text>

      <VForm form={form}>
        <VFormField
          name="otp"
          render={({ field, fieldState }) => (
            <VFormItem>
              <VFormLabel>Verification Code</VFormLabel>
              <VFormControl>
                <VOtpInput
                  length={6}
                  value={field.value}
                  onChange={field.onChange}
                  error={!!fieldState.error}
                  onComplete={() => form.handleSubmit(onSubmit)()}
                />
              </VFormControl>
              <VFormMessage />
            </VFormItem>
          )}
        />

        <VButton
          onPress={form.handleSubmit(onSubmit)}
          disabled={form.formState.isSubmitting}
          style={tw`mt-4`}
        >
          {form.formState.isSubmitting ? 'Verifying...' : 'Verify'}
        </VButton>
      </VForm>

      <TouchableOpacity style={tw`mt-4`} onPress={resendOtp}>
        <Text style={tw`text-primary-500 text-center`}>Resend Code</Text>
      </TouchableOpacity>
    </View>
  );
}
```