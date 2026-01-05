# VInput
Text input component dengan support untuk prefix/suffix icons dan multiple variants.

## Basic Usage
```tsx
import { VInput } from 'v-pack';
import { useState } from 'react';

function InputExample() {
  const [text, setText] = useState('');

  return (
    <VInput
      placeholder="Enter text"
      value={text}
      onChangeText={setText}
    />
  );
}
Input Variants
```
### Outline (Default)
```tsx
<VInput
  variant="outline"
  placeholder="Outline input"
  value={text}
  onChangeText={setText}
/>
```
### Underline
```tsx
<VInput
  variant="underline"
  placeholder="Underline input"
  value={text}
  onChangeText={setText}
/>
```
### With Prefix Icon
```tsx
import { Mail } from 'lucide-react-native';

<VInput
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
  prefix={<Mail size={20} color="#6b7280" />}
/>
```
### With Suffix Icon
```tsx
import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';

function PasswordInput() {
  const [visible, setVisible] = useState(false);

  return (
    <VInput
      placeholder="Enter password"
      secureTextEntry={!visible}
      value={password}
      onChangeText={setPassword}
      suffix={
        <Pressable onPress={() => setVisible(!visible)}>
          {visible ? (
            <Eye size={20} color="#6b7280" />
          ) : (
            <EyeOff size={20} color="#6b7280" />
          )}
        </Pressable>
      }
    />
  );
}
```
### With Both Prefix & Suffix
```tsx
<VInput
  placeholder="$0.00"
  value={amount}
  onChangeText={setAmount}
  keyboardType="decimal-pad"
  prefix={<Text style={tw`text-gray-400`}>$</Text>}
  suffix={<Text style={tw`text-gray-400`}>.00</Text>}
/>
```
### Error State
```tsx
<VInput
  placeholder="Enter email"
  value={email}
  onChangeText={setEmail}
  error={!!emailError}
/>
```

## Props
| Prop            | Type                    | Default   | Description         |
| --------------- | ----------------------- | --------- | ------------------- |
| placeholder     | string                  | -         | Placeholder text    |
| value           | string                  | -         | Input value         |
| onChangeText    | (text: string) => void  | -         | Change callback     |
| variant         | 'outline' \| 'underline' | 'outline' | Input variant       |
| prefix          | ReactNode               | -         | Prefix icon/element |
| suffix          | ReactNode               | -         | Suffix icon/element |
| error           | boolean                 | false     | Error state         |
| disabled        | boolean                 | false     | Disable input       |
| secureTextEntry | boolean                 | false     | Password mode       |
| keyboardType    | string                  | 'default' | Keyboard type       |