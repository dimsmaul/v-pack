# VCalendarRangePickerInput
Input field dengan date range picker untuk select start & end dates.

## Basic Usage
```tsx
import { VCalendarRangePickerInput } from 'v-pack';
import { useState } from 'react';

function DateRangeInputExample() {
  const [dates, setDates] = useState({
    startDate: null as Date | null,
    endDate: null as Date | null,
  });

  return (
    <VCalendarRangePickerInput
      label="Periode"
      value={dates}
      onChange={setDates}
      placeholder="Pilih periode"
    />
  );
}
```
### Custom Date Format
```tsx
<VCalendarRangePickerInput
  value={dates}
  onChange={setDates}
  format="DD/MM/YYYY"
  rangeSeparator=" - "  // Separator text
  placeholder="DD/MM/YYYY - DD/MM/YYYY"
/>
```
### With Date Restrictions
```tsx
<VCalendarRangePickerInput
  value={dates}
  onChange={setDates}
  minDate={new Date(2024, 0, 1)}
  maxDate={new Date(2024, 11, 31)}
  label="Booking Period"
/>
```
### With Error Handling
```tsx
<VCalendarRangePickerInput
  value={dates}
  onChange={setDates}
  error={!dates.startDate || !dates.endDate}
  errorMessage="Periode harus lengkap"
  label="Date Range"
/>
```
## Props
| Prop           | Type                 | Default         | Description                |
| -------------- | -------------------- | --------------- | -------------------------- |
| value          | {startDate, endDate} | -               | Selected date range        |
| onChange       | (dates) => void      | -               | Date range change callback |
| placeholder    | string               | 'Pilih periode' | Input placeholder          |
| format         | string               | 'DD MMMM YYYY'  | Date display format        |
| rangeSeparator | string               | ' - '           | Range separator text       |
| minDate        | Date                 | -               | Earliest selectable date   |
| maxDate        | Date                 | -               | Latest selectable date     |
| label          | string               | -               | Input label                |
| error          | boolean              | false           | Error state                |
| errorMessage   | string               | -               | Error message text         |
| disabled       | boolean              | false           | Disable input              |
| clearable      | boolean              | true            | Show clear button          |
| drawerTitle    | string               | 'Pilih Periode' | Drawer title               |