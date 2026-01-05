# VSelectInput
Single select dropdown dengan search & infinite scroll support.

## Basic Usage
```tsx
import { VSelectInput } from 'v-pack';
import { useState } from 'react';

function SelectExample() {
  const [selected, setSelected] = useState<string | number | null>(null);

  return (
    <VSelectInput
      label="Pilih Negara"
      value={selected}
      onChange={setSelected}
      options={[
        { label: 'Indonesia', value: 'id' },
        { label: 'Malaysia', value: 'my' },
        { label: 'Singapura', value: 'sg' },
      ]}
    />
  );
}
```
### With Search
```tsx
<VSelectInput
  label="Cari Kota"
  value={city}
  onChange={setCity}
  options={cityOptions}
  searchable={true}
  placeholder="Ketik kota..."
/>
```
### With Infinite Load
```tsx
const [options, setOptions] = useState([]);
const [hasMore, setHasMore] = useState(true);
const [isLoading, setIsLoading] = useState(false);

const handleLoadMore = async () => {
  setIsLoading(true);
  const newOptions = await fetchMoreOptions();
  setOptions(prev => [...prev, ...newOptions]);
  setIsLoading(false);
};

<VSelectInput
  value={selected}
  onChange={setSelected}
  options={options}
  onLoadMore={handleLoadMore}
  hasMore={hasMore}
  isLoading={isLoading}
  searchable
/>
```
### Disabled & Error State
```tsx
<VSelectInput
  value={selected}
  onChange={setSelected}
  options={options}
  disabled={true}
  error={!selected}
  errorMessage="Harus dipilih"
  label="Required Field"
/>
```
## Props
| Prop         | Type                    | Default          | Description        |
| ------------ | ----------------------- | ---------------- | ------------------ |
| value        | string \| number \| null | -                | Selected value     |
| onChange     | (value) => void         | -                | Change callback    |
| options      | {label, value}[]        | []               | Select options     |
| placeholder  | string                  | 'Pilih opsi'     | Placeholder text   |
| label        | string                  | -                | Input label        |
| searchable   | boolean                 | false            | Enable search      |
| onSearch     | (query: string) => void | -                | Search callback    |
| onLoadMore   | () => void              | -                | Load more callback |
| isLoading    | boolean                 | false            | Loading state      |
| hasMore      | boolean                 | false            | Has more data      |
| error        | boolean                 | false            | Error state        |
| errorMessage | string                  | -                | Error message      |
| disabled     | boolean                 | false            | Disable input      |
| clearable    | boolean                 | true             | Show clear button  |
| drawerTitle  | string                  | 'Pilih Opsi'     | Drawer title       |
| emptyMessage | string                  | 'Tidak ada opsi' | Empty message      |