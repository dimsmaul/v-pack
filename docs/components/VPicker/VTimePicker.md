# VTimePicker
Time picker dengan hour, minute, second, dan period (AM/PM) selection.

## Basic Usage
```tsx
import { VTimePicker } from 'v-pack';
import { useState } from 'react';

function TimePickerExample() {
  const [time, setTime] = useState(new Date());

  return (
    <VTimePicker
      value={time}
      onValueChange={setTime}
    />
  );
}
```

### 12-Hour Format
```tsx
<VTimePicker
  value={time}
  onValueChange={setTime}
  mode="12h"  // Shows AM/PM
/>
```

### 24-Hour Format (Default)
```tsx
<VTimePicker
  value={time}
  onValueChange={setTime}
  mode="24h"
/>
```

### With Seconds
```tsx
<VTimePicker
  value={time}
  onValueChange={setTime}
  showSeconds={true}
/>
```

## Props
| Prop          | Type                 | Default  | Description             |
| ------------- | -------------------- | -------- | ----------------------- |
| value         | Date                 | required | Current time            |
| onValueChange | (date: Date) => void | required | Time change callback    |
| mode          | '12h' \| '24h'       | '24h'    | Time format             |
| showSeconds   | boolean              | false    | Show seconds column     |
| loop          | boolean              | true     | Infinite loop scrolling |