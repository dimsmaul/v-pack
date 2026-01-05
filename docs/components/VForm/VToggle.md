# VToggle
Toggle/switch component dengan smooth animation.

## Basic Usage
```tsx
import { VToggle } from 'v-pack';
import { useState } from 'react';

function ToggleExample() {
  const [enabled, setEnabled] = useState(false);

  return (
    <VToggle
      checked={enabled}
      onCheckedChange={setEnabled}
    />
  );
}
```
### Toggle Variants
```tsx
<VToggle checked={enabled} onCheckedChange={setEnabled} variant="primary" />
<VToggle checked={enabled} onCheckedChange={setEnabled} variant="secondary" />
<VToggle checked={enabled} onCheckedChange={setEnabled} variant="success" />
<VToggle checked={enabled} onCheckedChange={setEnabled} variant="danger" />
```
### Different Sizes
```tsx
<VToggle checked={enabled} onCheckedChange={setEnabled} size="sm" />
<VToggle checked={enabled} onCheckedChange={setEnabled} size="md" />
<VToggle checked={enabled} onCheckedChange={setEnabled} size="lg" />
```
### With Label
```tsx
<View style={tw`flex-row items-center gap-3`}>
  <Text style={tw`text-base font-medium`}>Enable notifications</Text>
  <VToggle checked={notif} onCheckedChange={setNotif} />
</View>
```
### Disabled State
```tsx
<VToggle
  checked={enabled}
  onCheckedChange={setEnabled}
  disabled={true}
/>
```
## Props
| Prop            | Type                                           | Default   | Description     |
| --------------- | ---------------------------------------------- | --------- | --------------- |
| checked         | boolean                                        | false     | Toggle state    |
| onCheckedChange | (checked: boolean) => void                     | -         | Change callback |
| disabled        | boolean                                        | false     | Disable toggle  |
| size            | 'sm' \| 'md' \| 'lg'                           | 'md'      | Toggle size     |
| variant         | 'primary' \| 'secondary' \| 'success' \| 'danger' | 'primary' | Color variant   |

### Sized 
| Size | Width | Height | Thumb |
| ---- | ----- | ------ | ----- |
| sm   | 36px  | 20px   | 16px  |
| md   | 44px  | 24px   | 20px  |
| lg   | 52px  | 28px   | 24px  |