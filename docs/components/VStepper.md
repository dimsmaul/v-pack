# VStepper
Display step-by-step progress indicators for multi-step processes.

## Basic Usage
```tsx
import { VStepper } from 'v-pack';

const steps = [
  { label: 'Cart', description: 'Review items' },
  { label: 'Shipping', description: 'Enter address' },
  { label: 'Payment', description: 'Choose method' },
  { label: 'Confirm', description: 'Place order' },
];

<VStepper steps={steps} currentStep={2} />
```
### Orientation
```tsx
// Horizontal (default)
<VStepper 
  steps={steps} 
  currentStep={1} 
  orientation="horizontal" 
/>

// Vertical
<VStepper 
  steps={steps} 
  currentStep={1} 
  orientation="vertical" 
/>
```
### Variant
```tsx
// Default - with numbers and checkmarks
<VStepper steps={steps} currentStep={1} variant="default" />

// Dots - minimal style
<VStepper steps={steps} currentStep={1} variant="dots" />
```
### Custom Colors
```tsx
<VStepper
  steps={steps}
  currentStep={2}
  activeColor="#3B82F6"
  completedColor="#10B981"
  inactiveColor="#D1D5DB"
/>
```
### Hide Descriptions
```tsx
<VStepper 
  steps={steps} 
  currentStep={1} 
  showDescription={false} 
/>
```
## Props
| Prop            | Type                           | Default      | Description                  |
| --------------- | ------------------------------ | ------------ | ---------------------------- |
| steps           | VStepperStep[]                 | -            | Array of step objects        |
| currentStep     | number                         | -            | Active step index (0-based)  |
| variant         | 'default' \| 'dots' \| 'numbers' | 'default'    | Visual style variant         |
| orientation     | 'horizontal' \| 'vertical'     | 'horizontal' | Layout direction             |
| showDescription | boolean                        | true         | Show/hide step descriptions  |
| activeColor     | string                         | '#3B82F6'    | Color for active step        |
| inactiveColor   | string                         | '#D1D5DB'    | Color for inactive steps     |
| completedColor  | string                         | '#10B981'    | Color for completed steps    |
| containerStyle  | ViewStyle                      | -            | Custom container styles      |
| stepStyle       | ViewStyle                      | -            | Custom step indicator styles |
| labelStyle      | ViewStyle                      | -            | Custom label text styles     |