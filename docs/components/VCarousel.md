# VCarousel
A flexible and customizable carousel component with auto-play, navigation arrows, and custom indicators.

## Basic Usage
```tsx
import { VCarousel } from 'v-pack';

// Simple image carousel
<VCarousel
  items={[
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
    'https://example.com/image3.jpg',
  ]}
/>

// With object array
<VCarousel
  items={products}
  imageKey="thumbnail"
  itemHeight={300}
/>
```

## Features

### Auto-play
```tsx
<VCarousel
  items={images}
  autoPlay
  interval={5000}
  itemHeight={250}
/>
```
### Navigation Arrows
```tsx
<VCarousel
  items={images}
  showArrows
  itemHeight={300}
/>
```
### Custom Render Item
```tsx
// With image background
<VCarousel
  items={products}
  imageKey="thumbnail"
  renderItem={({ item, index }) => (
    <View style={tw`flex-1 justify-end p-4 bg-black/30`}>
      <Text style={tw`text-white text-2xl font-bold`}>
        {item.name}
      </Text>
      <Text style={tw`text-white text-lg`}>
        {item.price}
      </Text>
    </View>
  )}
/>

// Without image (full custom)
<VCarousel
  items={data}
  renderItem={({ item, index }) => (
    <CustomCard data={item} />
  )}
/>
```
### Custom Indicators
```tsx
// Number indicators
<VCarousel
  items={images}
  renderIndicator={({ isActive, index, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={tw`w-8 h-8 rounded-full ${
        isActive ? 'bg-primary-500' : 'bg-gray-400'
      } justify-center items-center`}
    >
      <Text style={tw`text-white font-bold`}>{index + 1}</Text>
    </TouchableOpacity>
  )}
/>

// Line indicators
<VCarousel
  items={images}
  renderIndicator={({ isActive, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      style={tw`h-1 flex-1 mx-1 rounded ${
        isActive ? 'bg-white' : 'bg-white/30'
      }`}
    />
  )}
/>
```
### Hide Indicators
```tsx
<VCarousel
  items={images}
  showIndicators={false}
/>
```
### Index Change Callback
```tsx
const [currentIndex, setCurrentIndex] = useState(0);

<VCarousel
  items={images}
  onIndexChange={(index) => {
    console.log('Current slide:', index);
    setCurrentIndex(index);
  }}
/>
```
### Responsive Width
The carousel automatically adapts to its parent container width [web:48][web:49]:

```tsx
// Full width
<VCarousel items={images} />

// With padding
<View style={tw`px-4`}>
  <VCarousel items={images} itemHeight={200} />
</View>

// Custom width container
<View style={tw`w-80 mx-auto`}>
  <VCarousel items={images} />
</View>
```
## Props
| Prop            | Type                                                                   | Default  | Description                                |
| --------------- | ---------------------------------------------------------------------- | -------- | ------------------------------------------ |
| items           | T[]                                                                    | required | Array of items (strings or objects)        |
| renderItem      | ({item: T, index: number}) => ReactNode                                | -        | Custom render function for each item       |
| imageKey        | keyof T                                                                | -        | Key to extract image URL from object items |
| renderIndicator | ({isActive: boolean, index: number, onPress: () => void}) => ReactNode | -        | Custom indicator render function           |
| autoPlay        | boolean                                                                | false    | Enable auto-play                           |
| interval        | number                                                                 | 3000     | Auto-play interval in milliseconds         |
| showIndicators  | boolean                                                                | true     | Show/hide indicators                       |
| showArrows      | boolean                                                                | false    | Show/hide navigation arrows                |
| itemHeight      | number                                                                 | 200      | Height of carousel items                   |
| containerStyle  | ViewStyle                                                              | -        | Custom container style                     |
| onIndexChange   | (index: number) => void                                                | -        | Callback when active index changes         |

## Advanced Examples
### Product Carousel with Overlay
```tsx
<VCarousel
  items={products}
  imageKey="image"
  itemHeight={350}
  showArrows
  autoPlay
  renderItem={({ item }) => (
    <View style={tw`flex-1 justify-end p-6 bg-gradient-to-t from-black/70`}>
      <Text style={tw`text-white text-2xl font-bold mb-2`}>
        {item.name}
      </Text>
      <Text style={tw`text-white text-xl mb-1`}>
        Rp {item.price.toLocaleString('id-ID')}
      </Text>
      <View style={tw`flex-row items-center`}>
        <Text style={tw`text-yellow-400 mr-2`}>⭐ {item.rating}</Text>
        <Text style={tw`text-white/80`}>{item.sold} sold</Text>
      </View>
    </View>
  )}
/>
```
### Banner Carousel
```tsx
<VCarousel
  items={banners}
  imageKey="backgroundImage"
  itemHeight={200}
  autoPlay
  interval={4000}
  renderItem={({ item }) => (
    <View style={tw`flex-1 justify-center items-center`}>
      <Text style={tw`text-white text-3xl font-bold`}>
        {item.title}
      </Text>
      <Text style={tw`text-white text-lg mt-2`}>
        {item.subtitle}
      </Text>
    </View>
  )}
/>
```