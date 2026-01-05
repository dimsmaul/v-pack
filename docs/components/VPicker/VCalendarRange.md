# VCalendarRange
Date range picker component untuk select start & end dates dengan visual range highlighting.

## Basic Usage
```tsx
import { VCalendarRange } from 'v-pack';
import { useState } from 'react';

function DateRangeExample() {
  const [dates, setDates] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null,
  });

  return (
    <VCalendarRange
      startDate={dates.startDate}
      endDate={dates.endDate}
      onChange={setDates}
    />
  );
}
```

## Props
| Prop            | Type                           | Default | Description                |
| --------------- | ------------------------------ | ------- | -------------------------- |
| startDate       | Date \| null                   | -       | Start date of range        |
| endDate         | Date \| null                   | -       | End date of range          |
| onChange        | ({startDate, endDate}) => void | -       | Callback on date change    |
| minDate         | Date                           | -       | Earliest selectable date   |
| maxDate         | Date                           | -       | Latest selectable date     |
| singleMonthView | boolean                        | false   | Keep calendar on one month |