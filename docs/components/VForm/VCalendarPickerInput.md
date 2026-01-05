# VCalendarPickerInput
Input field dengan calendar picker terintegrasi dalam drawer untuk select single date.

## Basic Usage
```tsx
import { VCalendarPickerInput } from 'v-pack';
import { useState } from 'react';

function DateInputExample() {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <VCalendarPickerInput
      label="Tanggal Lahir"
      value={date}
      onChange={setDate}
      placeholder="Pilih tanggal"
    />
  );
}
```
### Custom Date Format
```tsx
<VCalendarPickerInput
  value={date}
  onChange={setDate}
  format="DD/MM/YYYY"  // Display format
  placeholder="DD/MM/YYYY"
/>
```
### With Date Restrictions
```tsx
<VCalendarPickerInput
  value={date}
  onChange={setDate}
  minDate={new Date(2000, 0, 1)}
  maxDate={new Date()}  // Max today
  label="Tanggal"
/>
```
### With Error Handling
```tsx
<VCalendarPickerInput
  value={date}
  onChange={setDate}
  error={!date}
  errorMessage="Tanggal harus dipilih"
  label="Appointment Date"
/>
```
### Disabled State
```tsx
<VCalendarPickerInput
  value={date}
  onChange={setDate}
  disabled={true}
  label="Read Only Date"
/>
```
### Clear Button
```tsx
<VCalendarPickerInput
  value={date}
  onChange={setDate}
  clearable={true}  // Shows X button to clear
  label="Date"
/>
```
## Props
| Prop         | Type                        | Default         | Description              |
| ------------ | --------------------------- | --------------- | ------------------------ |
| value        | Date \| null                | -               | Selected date            |
| onChange     | (date: Date \| null) => void | -               | Date change callback     |
| placeholder  | string                      | 'Pilih tanggal' | Input placeholder        |
| format       | string                      | 'DD MMMM YYYY'  | Date display format      |
| minDate      | Date                        | -               | Earliest selectable date |
| maxDate      | Date                        | -               | Latest selectable date   |
| label        | string                      | -               | Input label              |
| error        | boolean                     | false           | Error state              |
| errorMessage | string                      | -               | Error message text       |
| disabled     | boolean                     | false           | Disable input            |
| clearable    | boolean                     | true            | Show clear button        |
| drawerTitle  | string                      | 'Pilih Tanggal' | Drawer title             |