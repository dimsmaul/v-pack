import React from 'react';
import { Text, View } from 'react-native';
import { useTheme, VAvatar, VAvatarGroup } from 'v-pack';
import { User } from 'lucide-react-native';

const ExampleAvatar: React.FC = () => {
  const { tw } = useTheme();
  return (
    <View
      style={tw`m-4 bg-white rounded-xl border border-gray-300 overflow-hidden`}
    >
      <Text
        style={tw`text-lg font-bold p-4 bg-gray-50 border-b border-gray-300`}
      >
        Avatar
      </Text>
      <View style={tw`p-4 flex flex-col flex-wrap gap-6`}>
        <View style={tw`flex-row flex-wrap gap-4`}>
          <VAvatar
            src="https://images.unsplash.com/photo-1761839258623-e232e15f7ff3?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            size="md"
          />
          <VAvatar src={require('./../../assets/avatar.jpg')} size="lg" />
          <VAvatar
            fallback="Dimas Maulana" // ✅ Displays "DM"
            size="md"
          />
          <VAvatar
            icon={<User size={20} color="#FFFFFF" />}
            size="md"
            backgroundColor="#9CA3AF"
          />
          <VAvatar
            fallback="John Doe"
            variant="square" // ✅ Square with rounded corners
            size="lg"
          />
          <VAvatar
            fallback="Sarah Wilson"
            backgroundColor="#EF4444"
            textColor="#FFFFFF"
            size="xl"
          />
          <VAvatar
            src="https://images.unsplash.com/photo-1761839258623-e232e15f7ff3?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            size="2xl"
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ borderWidth: 2, borderColor: '#4A9B9F' }}
          />
        </View>

        <View>
          <VAvatarGroup max={3} spacing={-12}>
            <VAvatar src="https://i.pravatar.cc/150?img=1" size="md" />
            <VAvatar src="https://i.pravatar.cc/150?img=2" size="md" />
            <VAvatar src="https://i.pravatar.cc/150?img=3" size="md" />
            <VAvatar src="https://i.pravatar.cc/150?img=4" size="md" />
            <VAvatar src="https://i.pravatar.cc/150?img=5" size="md" />
          </VAvatarGroup>
        </View>

        <View>
          {/* Rounded (Circle) */}
          <View style={{ flexDirection: 'row', gap: 16, marginBottom: 16 }}>
            <VAvatar fallback="DM" variant="rounded" size="sm" />
            <VAvatar fallback="DM" variant="rounded" size="md" />
            <VAvatar fallback="DM" variant="rounded" size="lg" />
          </View>

          {/* Square */}
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <VAvatar fallback="DM" variant="square" size="sm" />
            <VAvatar fallback="DM" variant="square" size="md" />
            <VAvatar fallback="DM" variant="square" size="lg" />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ExampleAvatar;
