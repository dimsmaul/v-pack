# VCalendar
Single date picker calendar component dengan smooth animations dan date range restrictions.

## Basic Usage
```tsx
import { VCalendar } from 'v-pack';
import { useState } from 'react';

function CalendarExample() {
  const [selectedDate, setSelectedDate] = useState<Date>();

  return (
    <VCalendar
      selectedDate={selectedDate}
      onDateSelect={setSelectedDate}
    />
  );
}
```

### With Date Restrictions
```tsx
<VCalendar
  selectedDate={selectedDate}
  onDateSelect={setSelectedDate}
  minDate={new Date(2024, 0, 1)}  // January 1, 2024
  maxDate={new Date(2024, 11, 31)} // December 31, 2024
/>
```
## Props
| Prop         | Type                 | Default | Description                    |
| ------------ | -------------------- | ------- | ------------------------------ |
| selectedDate | Date \| undefined    | -       | Currently selected date        |
| onDateSelect | (date: Date) => void | -       | Callback when date is selected |
| minDate      | Date                 | -       | Earliest selectable date       |
| maxDate      | Date                 | -       | Latest selectable date         |