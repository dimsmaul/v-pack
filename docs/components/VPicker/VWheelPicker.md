# VWheelPicker
Low-level wheel/picker component untuk scrollable item selection.

## Basic Usage
```tsx
import { VWheelPicker } from 'v-pack';
import { useState } from 'react';

function WheelPickerExample() {
  const [selected, setSelected] = useState('Option 1');

  return (
    <VWheelPicker
      data={['Option 1', 'Option 2', 'Option 3']}
      selectedValue={selected}
      onValueChange={(value) => setSelected(value)}
    />
  );
}
```

## With Numbers
```tsx
const numbers = Array.from({ length: 100 }, (_, i) => i + 1);

<VWheelPicker
  data={numbers}
  selectedValue={selectedNumber}
  onValueChange={setSelectedNumber}
/>
```

### With Infinite Loop
```tsx
<VWheelPicker
  data={items}
  selectedValue={selected}
  onValueChange={setSelected}
  loop={true}
/>
```

## Props
| Prop          | Type                   | Default  | Description             |
| ------------- | ---------------------- | -------- | ----------------------- |
| data          | (string \| number)[]   | required | Items to pick from      |
| selectedValue | string \| number       | required | Currently selected item |
| onValueChange | (value, index) => void | required | Selection callback      |
| style         | any                    | -        | Custom styling          |
| loop          | boolean                | false    | Infinite loop scrolling |