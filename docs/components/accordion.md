# VAccordion

Accordion component for collapsible content sections with smooth animations.

## Basic Usage

```tsx
import { VAccordion, VAccordionItem, VAccordionTrigger, VAccordionContent } from 'v-pack';

function AccordionExample() {
  return (
    <VAccordion type="single">
      <VAccordionItem>
        <VAccordionTrigger>
          <Text>Section 1</Text>
        </VAccordionTrigger>
        <VAccordionContent>
          <Text>Content for section 1</Text>
        </VAccordionContent>
      </VAccordionItem>

      <VAccordionItem>
        <VAccordionTrigger>
          <Text>Section 2</Text>
        </VAccordionTrigger>
        <VAccordionContent>
          <Text>Content for section 2</Text>
        </VAccordionContent>
      </VAccordionItem>
    </VAccordion>
  );
}
```
## Types
### Single (One open at a time)
```tsx
<VAccordion type="single">
  {/* Only one item open at a time */}
</VAccordion>
```

### Multiple (Multiple open)
```tsx
<VAccordion type="multiple">
  {/* Multiple items can be open simultaneously */}
</VAccordion>
```

### Controlled
```tsx
function ControlledAccordion() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <VAccordionItem
      isOpen={isOpen}
      onToggle={setIsOpen}
    >
      <VAccordionTrigger>
        <Text>Controlled Section</Text>
      </VAccordionTrigger>
      <VAccordionContent>
        <Text>Content here</Text>
      </VAccordionContent>
    </VAccordionItem>
  );
}
```

### Disable 
```tsx
<VAccordionItem disabled>
  <VAccordionTrigger>
    <Text>Disabled Section</Text>
  </VAccordionTrigger>
  <VAccordionContent>
    <Text>Cannot open</Text>
  </VAccordionContent>
</VAccordionItem>
```

### Custom Duration Animation
```tsx
<VAccordionItem duration={300}>
  <VAccordionTrigger>
    <Text>Slow Animation</Text>
  </VAccordionTrigger>
  <VAccordionContent>
    <Text>Content with 300ms animation</Text>
  </VAccordionContent>
</VAccordionItem>
```

## Props
### VAccordion
| Prop     | Type                  | Default  | Description             |
| -------- | --------------------- | -------- | ----------------------- |
| type     | 'single' \| 'multiple' | 'single' | Accordion behavior mode |
| children | ReactNode             | required | Accordion items         |

### VAccordionItem
| Prop     | Type                      | Default  | Description              |
| -------- | ------------------------- | -------- | ------------------------ |
| isOpen   | boolean                   | false    | Controls open state      |
| onToggle | (isOpen: boolean) => void | -        | Callback when toggled    |
| disabled | boolean                   | false    | Disable item toggle      |
| duration | number                    | 200      | Animation duration in ms |
| children | ReactNode                 | required | Trigger and content      |

### VAccordionTrigger
| Prop     | Type                 | Description           |
| -------- | -------------------- | --------------------- |
| children | ReactNode            | Trigger label/content |
| style    | StyleProp<ViewStyle> | Custom styles         |

### VAccordionContent
| Prop     | Type                 | Description          |
| -------- | -------------------- | -------------------- |
| children | ReactNode            | Content to show/hide |
| style    | StyleProp<ViewStyle> | Custom styles        |