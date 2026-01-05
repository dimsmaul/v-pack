# VPasswordInput
Password input dengan show/hide toggle untuk visibility control.

## Basic Usage
```tsx
import { VPasswordInput } from 'v-pack';
import { useState } from 'react';

function PasswordExample() {
  const [password, setPassword] = useState('');

  return (
    <VPasswordInput
      placeholder="Enter password"
      value={password}
      onChangeText={setPassword}
    />
  );
}
```
### With Custom Icons
```tsx
import { Eye, EyeOff } from 'lucide-react-native';

<VPasswordInput
  value={password}
  onChangeText={setPassword}
  placeholder="Password"
  IconShow={Eye}
  IconHide={EyeOff}
  iconColor="#6b7280"
/>
```
### Without Show/Hide Icon
```tsx
<VPasswordInput
  value={password}
  onChangeText={setPassword}
  showIcon={false}  // Disable show/hide toggle
/>
```
### With Error State
```tsx
<VPasswordInput
  value={password}
  onChangeText={setPassword}
  error={passwordError}
  placeholder="Password"
/>
```
## Props
| Prop           | Type                    | Default   | Description              |
| -------------- | ----------------------- | --------- | ------------------------ |
| value          | string                  | -         | Password value           |
| onChangeText   | (text: string) => void  | -         | Change callback          |
| placeholder    | string                  | -         | Placeholder text         |
| variant        | 'outline' \| 'underline' | 'outline' | Input variant            |
| showIcon       | boolean                 | true      | Show visibility toggle   |
| defaultVisible | boolean                 | false     | Show password by default |
| IconShow       | ComponentType           | -         | Custom show icon         |
| IconHide       | ComponentType           | -         | Custom hide icon         |
| iconColor      | string                  | '#6b7280' | Icon color               |
| error          | boolean                 | false     | Error state              |
| disabled       | boolean                 | false     | Disable input            |