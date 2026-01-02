import React from 'react';
import { Text, View } from 'react-native';
import { useTheme, VQuantityInput } from 'v-pack';

const ExampleQuantity: React.FC = () => {
  const { tw } = useTheme();
  const [quantity, setQuantity] = React.useState(1);
  const itemId = 'item-123';
  const [qty, setQty] = React.useState(1);

  const removeFromCart = (id: string) => {
    console.log(`Removing item with id: ${id}`);
  };

  return (
    <View
      style={tw`m-4 bg-white rounded-xl border border-gray-300 overflow-hidden`}
    >
      <Text
        style={tw`text-lg font-bold p-4 bg-gray-50 border-b border-gray-300`}
      >
        Quantity
      </Text>
      <View style={tw`p-4`}>
        {/* First Row */}
        <View style={tw`mb-4 flex-row items-center flex-wrap -mr-4`}>
          <View style={tw`mr-4 mb-2`}>
            <VQuantityInput
              value={quantity}
              onValueChange={setQuantity}
              min={1}
              max={10}
            />
          </View>
          <View style={tw`mr-4 mb-2`}>
            <VQuantityInput
              value={quantity}
              onValueChange={setQuantity}
              min={1}
              max={10}
              showDelete={true}
              onDelete={() => removeFromCart(itemId)}
            />
          </View>
        </View>

        {/* Second Row */}
        <View style={tw`flex-row items-center flex-wrap -mr-4`}>
          <View style={tw`mr-4 mb-2`}>
            <VQuantityInput value={qty} onValueChange={setQty} size="sm" />
          </View>
          <View style={tw`mr-4 mb-2`}>
            <VQuantityInput value={qty} onValueChange={setQty} size="md" />
          </View>
          <View style={tw`mr-4 mb-2`}>
            <VQuantityInput value={qty} onValueChange={setQty} size="lg" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ExampleQuantity;
