# VRating
Star rating component with support for full and half stars, interactive and read-only modes.

## Basic Usage
```tsx
import { VRating } from 'v-pack';
import { useState } from 'react';

// Simple rating
<VRating />

// Controlled rating
const [rating, setRating] = useState(0);

<VRating
  value={rating}
  onChange={setRating}
/>

// With callback
<VRating
  onChange={(rating) => console.log('Rating:', rating)}
/>
```
## Features
### Max Stars
```tsx
// 5 stars (default)
<VRating max={5} />

// 10 stars
<VRating max={10} />

// Custom max
<VRating max={7} />
```
### Size
```tsx
// Small
<VRating size={16} />

// Medium (default)
<VRating size={24} />

// Large
<VRating size={32} />

// Extra large
<VRating size={48} />
```
### Half Stars
```tsx
// Allow half star ratings
<VRating
  value={3.5}
  allowHalf
  onChange={setRating}
/>

// Display half stars (read-only)
<VRating
  value={4.5}
  allowHalf
  readOnly
/>
```
### Show Value
```tsx
// Show numeric value
<VRating
  value={4}
  showValue
/>

// With half stars
<VRating
  value={3.5}
  allowHalf
  showValue
/>
```
### Custom Colors
```tsx
// Custom filled color
<VRating
  color="#EF4444"
  emptyColor="#FEE2E2"
/>

// Success theme
<VRating
  color="#10B981"
  emptyColor="#D1FAE5"
/>

// Primary theme
<VRating
  color="#3B82F6"
  emptyColor="#DBEAFE"
/>
```
### Read-Only
```tsx
// Display only (no interaction)
<VRating
  value={4.5}
  allowHalf
  readOnly
/>

// Product rating display
<VRating
  value={4.2}
  allowHalf
  readOnly
  showValue
  size={20}
/>
```
### Disabled
```tsx
<VRating
  value={3}
  disabled
/>
```
### Icon Spacing
```tsx
// Default spacing
<VRating iconSpacing={4} />

// Wider spacing
<VRating iconSpacing={8} />

// Compact
<VRating iconSpacing={2} />
```
## Props
| Prop           | Type                     | Default   | Description                        |
| -------------- | ------------------------ | --------- | ---------------------------------- |
| value          | number                   | -         | Controlled value                   |
| defaultValue   | number                   | 0         | Default value (uncontrolled)       |
| onChange       | (rating: number) => void | -         | Callback fired on rating change    |
| max            | number                   | 5         | Maximum number of stars            |
| size           | number                   | 24        | Size of star icons in pixels       |
| disabled       | boolean                  | false     | Disable interaction                |
| readOnly       | boolean                  | false     | Display only mode (no interaction) |
| allowHalf      | boolean                  | false     | Allow half star ratings            |
| showValue      | boolean                  | false     | Show numeric value next to stars   |
| color          | string                   | '#FBBF24' | Color for filled stars             |
| emptyColor     | string                   | '#D1D5DB' | Color for empty stars              |
| iconSpacing    | number                   | 4         | Spacing between star icons         |
| containerStyle | ViewStyle                | -         | Custom container style             |