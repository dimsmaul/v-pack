import React from 'react';
import { Text, View } from 'react-native';
import { useTheme, VCarousel } from 'v-pack';

type Product = {
  id: number;
  name: string;
  thumbnail: string;
  price: number;
};

const ExampleCarousel: React.FC = () => {
  const { tw } = useTheme();
  const images = [
    'https://picsum.photos/400/200?random=1',
    'https://picsum.photos/400/200?random=2',
    'https://picsum.photos/400/200?random=3',
    'https://picsum.photos/400/200?random=4',
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      thumbnail: 'https://picsum.photos/400/200?random=10',
      price: 15000000,
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24',
      thumbnail: 'https://picsum.photos/400/200?random=11',
      price: 12000000,
    },
    {
      id: 3,
      name: 'Google Pixel 8',
      thumbnail: 'https://picsum.photos/400/200?random=12',
      price: 10000000,
    },
  ];
  return (
    <View
      style={tw`m-4 bg-white rounded-xl border border-gray-300 overflow-hidden`}
    >
      <Text
        style={tw`text-lg font-bold p-4 bg-gray-50 border-b border-gray-300`}
      >
        Carousel
      </Text>
      <View style={tw`p-4 flex flex-row flex-wrap gap-6`}>
        <VCarousel items={images} />
        <VCarousel items={images} showArrows />
        <Text>With Text</Text>
        <VCarousel
          items={products}
          imageKey="thumbnail"
          itemHeight={250}
          autoPlay
          interval={4000}
          renderItem={({ item }) => (
            <View style={tw`flex-1 rounded-lg overflow-hidden`}>
              <View style={tw`p-4`}>
                <Text style={tw`text-lg font-semibold mb-2`}>{item.name}</Text>
                <Text style={tw`text-blue-600 font-bold text-xl`}>
                  Rp {item.price.toLocaleString('id-ID')}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ExampleCarousel;
