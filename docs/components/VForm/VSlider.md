# VSlider
A customizable slider component for value selection with drag interaction.

## Basic Usage
```tsx
import { VSlider } from 'v-pack';
import { useState } from 'react';

// Simple slider
<VSlider />

// Controlled slider
const [volume, setVolume] = useState(50);

<VSlider
  value={volume}
  onChange={setVolume}
/>
```

## Features

### Min, Max, and Step
```tsx
// Volume control (0-100, step 5)
<VSlider
  min={0}
  max={100}
  step={5}
  defaultValue={50}
/>

// Price range (0-1M, step 10K)
<VSlider
  min={0}
  max={1000000}
  step={10000}
  defaultValue={500000}
/>

// Percentage (0-1, step 0.1)
<VSlider
  min={0}
  max={1}
  step={0.1}
  defaultValue={0.5}
/>

```

### Show Value and Min/Max Labels
```tsx
// Show current value
<VSlider
  showValue
  defaultValue={75}
/>

// Show min/max labels
<VSlider
  showMinMax
  min={0}
  max={100}
/>

// Both
<VSlider
  showValue
  showMinMax
  min={0}
  max={100}
  defaultValue={50}
/>

// Hide value display
<VSlider
  showValue={false}
  defaultValue={50}
/>

```
### Custom Colors
```tsx
// Custom track colors
<VSlider
  trackColor="#E5E7EB"
  activeTrackColor="#EF4444"
  thumbColor="#DC2626"
  defaultValue={60}
/>

// Using Tailwind colors
<VSlider
  trackColor="#F3F4F6"
  activeTrackColor="#3B82F6"
  thumbColor="#2563EB"
/>

// Success theme
<VSlider
  activeTrackColor="#10B981"
  thumbColor="#059669"
  defaultValue={80}
/>

```
### Disabled State
```tsx
<VSlider
  disabled
  defaultValue={50}
/>
```
### Callbacks
```tsx
const [price, setPrice] = useState(100000);

<VSlider
  min={0}
  max={1000000}
  step={10000}
  value={price}
  onChange={(value) => {
    // Called during drag
    console.log('Dragging:', value);
    setPrice(value);
  }}
  onChangeEnd={(value) => {
    // Called when drag ends
    console.log('Final value:', value);
    // Make API call, etc.
  }}
/>
```
## Props
| Prop             | Type                    | Default | Description                         |
| ---------------- | ----------------------- | ------- | ----------------------------------- |
| min              | number                  | 0       | Minimum value                       |
| max              | number                  | 100     | Maximum value                       |
| step             | number                  | 1       | Step increment                      |
| value            | number                  | -       | Controlled value                    |
| defaultValue     | number                  | min     | Default value (uncontrolled)        |
| onChange         | (value: number) => void | -       | Callback fired during value changes |
| onChangeEnd      | (value: number) => void | -       | Callback fired when drag ends       |
| disabled         | boolean                 | false   | Disable slider interaction          |
| showValue        | boolean                 | true    | Show current value above slider     |
| showMinMax       | boolean                 | false   | Show min/max labels below slider    |
| trackColor       | string                  | -       | Background track color              |
| activeTrackColor | string                  | -       | Active (filled) track color         |
| thumbColor       | string                  | -       | Thumb (draggable circle) color      |
| containerStyle   | ViewStyle               | -       | Custom container style              |