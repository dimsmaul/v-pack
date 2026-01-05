# VCheckbox
Checkbox dan radio button component dengan multiple variants dan sizes.

## Basic Usage
```tsx
import { VCheckbox } from 'v-pack';
import { useState } from 'react';

function CheckboxExample() {
  const [checked, setChecked] = useState(false);

  return (
    <VCheckbox
      checked={checked}
      onCheckedChange={setChecked}
    />
  );
}
```
### Checkbox Variants
```tsx
<VCheckbox checked={checked} onCheckedChange={setChecked} variant="primary" />
<VCheckbox checked={checked} onCheckedChange={setChecked} variant="secondary" />
<VCheckbox checked={checked} onCheckedChange={setChecked} variant="success" />
<VCheckbox checked={checked} onCheckedChange={setChecked} variant="danger" />
```
### Sizes
```tsx
<VCheckbox checked={checked} onCheckedChange={setChecked} size="sm" />
<VCheckbox checked={checked} onCheckedChange={setChecked} size="md" />
<VCheckbox checked={checked} onCheckedChange={setChecked} size="lg" />
```
### Radio Button
```tsx
<VCheckbox
  checked={isSelected}
  onCheckedChange={setIsSelected}
  type="radio"  // Radio mode
  variant="primary"
/>
```
### Disabled State
```tsx
<VCheckbox
  checked={checked}
  onCheckedChange={setChecked}
  disabled={true}
/>
```
## Props
| Prop            | Type                                           | Default    | Description       |
| --------------- | ---------------------------------------------- | ---------- | ----------------- |
| checked         | boolean                                        | false      | Is checked        |
| onCheckedChange | (checked: boolean) => void                     | -          | Change callback   |
| disabled        | boolean                                        | false      | Disable checkbox  |
| size            | 'sm' \| 'md' \| 'lg'                           | 'md'       | Checkbox size     |
| variant         | 'primary' \| 'secondary' \| 'success' \| 'danger' | 'primary'  | Color variant     |
| type            | 'checkbox' \| 'radio'                          | 'checkbox' | Checkbox or radio |