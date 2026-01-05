# VMultipleSelectInput
Multiple select dropdown dengan checkboxes, search, & infinite scroll.

## Basic Usage
```tsx
import { VMultipleSelectInput } from 'v-pack';
import { useState } from 'react';

function MultiSelectExample() {
  const [selected, setSelected] = useState<(string | number)[]>([]);

  return (
    <VMultipleSelectInput
      label="Pilih Kategori"
      value={selected}
      onChange={setSelected}
      options={[
        { label: 'Tech', value: 'tech' },
        { label: 'Design', value: 'design' },
        { label: 'Business', value: 'business' },
      ]}
    />
  );
}
```
### With Select All Option
```tsx
<VMultipleSelectInput
  value={selected}
  onChange={setSelected}
  options={options}
  selectAllOption={true}  // Shows "Select All" checkbox
  label="Multi Select"
/>
```
### With Search & Infinite Load
```tsx
const handleSearch = (query: string) => {
  // Server-side search
  fetchOptions(query);
};

<VMultipleSelectInput
  value={selected}
  onChange={setSelected}
  options={options}
  searchable={true}
  onSearch={handleSearch}
  onLoadMore={handleLoadMore}
  hasMore={hasMore}
  isLoading={isLoading}
/>
```
### Custom Display Count
```tsx
<VMultipleSelectInput
  value={selected}
  onChange={setSelected}
  options={options}
  maxDisplayCount={2}  // Shows "n item dipilih" if more than 2
/>
```
## Props
| Prop            | Type                    | Default          | Description              |
| --------------- | ----------------------- | ---------------- | ------------------------ |
| value           | (string \| number)[]    | []               | Selected values          |
| onChange        | (values) => void        | -                | Change callback          |
| options         | {label, value}[]        | []               | Options array            |
| placeholder     | string                  | 'Pilih opsi'     | Placeholder              |
| label           | string                  | -                | Input label              |
| searchable      | boolean                 | false            | Enable search            |
| onSearch        | (query: string) => void | -                | Search callback          |
| onLoadMore      | () => void              | -                | Load more callback       |
| isLoading       | boolean                 | false            | Loading state            |
| isFetchingMore  | boolean                 | false            | Fetching more state      |
| hasMore         | boolean                 | false            | Has more data            |
| selectAllOption | boolean                 | false            | Show select all          |
| maxDisplayCount | number                  | 3                | Max items to show inline |
| error           | boolean                 | false            | Error state              |
| errorMessage    | string                  | -                | Error message            |
| disabled        | boolean                 | false            | Disable input            |
| clearable       | boolean                 | true             | Show clear button        |
| drawerTitle     | string                  | 'Pilih Opsi'     | Drawer title             |
| emptyMessage    | string                  | 'Tidak ada opsi' | Empty state message      |
| searchDebounce  | number                  | 500              | Search debounce (ms)     |