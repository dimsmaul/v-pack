# VForm
Form management component dengan react-hook-form integration untuk handling form state, validation, dan error messages.

## Basic Usage
```tsx
import { VForm, VFormField, VFormItem, VFormLabel, VFormControl, VFormMessage } from 'v-pack';
import { useForm } from 'react-hook-form';
import { VInput, VButton } from 'v-pack';
import { View } from 'react-native';

function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <VForm form={form} onSubmit={form.handleSubmit(onSubmit)}>
      <VFormField
        name="email"
        control={form.control}
        rules={{ required: 'Email is required' }}
        render={({ field }) => (
          <VFormItem>
            <VFormLabel>Email</VFormLabel>
            <VFormControl>
              <VInput
                placeholder="Enter email"
                value={field.value}
                onChangeText={field.onChange}
              />
            </VFormControl>
            <VFormMessage />
          </VFormItem>
        )}
      />

      <VButton onPress={form.handleSubmit(onSubmit)}>
        Submit
      </VButton>
    </VForm>
  );
}
```
### With Validation Rules
```tsx
<VFormField
  name="email"
  control={form.control}
  rules={{
    required: 'Email is required',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
  }}
  render={({ field }) => (
    <VFormItem>
      <VFormLabel>Email</VFormLabel>
      <VFormControl>
        <VInput
          placeholder="example@email.com"
          value={field.value}
          onChangeText={field.onChange}
        />
      </VFormControl>
      <VFormMessage />
    </VFormItem>
  )}
/>
```
### With Description
```tsx
<VFormItem>
  <VFormLabel>Password</VFormLabel>
  <VFormControl>
    <VInput
      placeholder="Enter password"
      secureTextEntry
      value={field.value}
      onChangeText={field.onChange}
    />
  </VFormControl>
  <VFormDescription>
    Minimal 8 characters dengan kombinasi huruf dan angka
  </VFormDescription>
  <VFormMessage />
</VFormItem>
```
### Multi-Field Form
```tsx
const form = useForm({
  defaultValues: {
    name: '',
    email: '',
    phone: '',
    message: '',
  },
});

<VForm form={form}>
  {/* Name field */}
  <VFormField
    name="name"
    control={form.control}
    rules={{ required: 'Name required' }}
    render={({ field }) => (
      <VFormItem>
        <VFormLabel>Full Name</VFormLabel>
        <VFormControl>
          <VInput
            placeholder="John Doe"
            value={field.value}
            onChangeText={field.onChange}
          />
        </VFormControl>
        <VFormMessage />
      </VFormItem>
    )}
  />

  {/* Email field */}
  <VFormField
    name="email"
    control={form.control}
    rules={{ required: 'Email required' }}
    render={({ field }) => (
      <VFormItem>
        <VFormLabel>Email</VFormLabel>
        <VFormControl>
          <VInput
            placeholder="john@example.com"
            value={field.value}
            onChangeText={field.onChange}
          />
        </VFormControl>
        <VFormMessage />
      </VFormItem>
    )}
  />
</VForm>
```
## Components
### VForm
Main form wrapper dengan context provider.
| Prop     | Type          | Description                  |
| -------- | ------------- | ---------------------------- |
| form     | UseFormReturn | Form instance dari useForm() |
| children | ReactNode     | Form fields                  |

### VFormField
Field wrapper dengan controller untuk sync dengan react-hook-form.
| Prop    | Type     | Description                           |
| ------- | -------- | ------------------------------------- |
| name    | string   | Field name                            |
| control | Control  | Form control (optional, from context) |
| rules   | object   | Validation rules                      |
| render  | function | Render prop dengan field & fieldState |

### VFormItem
Wrapper untuk label + input + message.

### VFormLabel
Label text untuk input field.

### VFormControl
Passes error state ke wrapped component.

### VFormDescription
Helper text dibawah input.

### VFormMessage
Error message display (auto-shows when error exists).

