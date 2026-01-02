import { Text, View } from 'react-native';
import { useTheme, VBanner } from 'v-pack';
import { Truck } from 'lucide-react-native';

const ExampleBanner = () => {
  const { tw } = useTheme();
  return (
    <View
      style={tw`m-4 bg-white rounded-xl border border-gray-300 overflow-hidden`}
    >
      <Text
        style={tw`text-lg font-bold p-4 bg-gray-50 border-b border-gray-300`}
      >
        Banner
      </Text>
      <View style={tw`p-4`}>
        {/* Example 1: 2 Tabs */}
        {/* Danger */}
        <VBanner
          type="danger"
          title="Status Pesanan"
          message="Menunggu Pembayaran"
          style={tw`mb-3`}
        />

        {/* Info */}
        <VBanner
          type="info"
          title="Status Pesanan"
          message="Menunggu Pembayaran"
          style={tw`mb-3`}
        />

        {/* Secondary/Default */}
        <VBanner
          type="secondary"
          title="Status Pesanan"
          message="Menunggu Pembayaran"
          style={tw`mb-3`}
        />

        {/* Warning */}
        <VBanner
          type="warning"
          title="Status Pesanan"
          message="Menunggu Pembayaran"
          style={tw`mb-3`}
        />

        {/* Success */}
        <VBanner
          type="success"
          title="Status Pesanan"
          message="Menunggu Pembayaran"
          style={tw`mb-3`}
        />

        {/* Primary */}
        <VBanner
          type="primary"
          title="Status Pesanan"
          message="Menunggu Pembayaran"
          style={tw`mb-3`}
        />

        {/* Without Title */}
        <VBanner
          type="info"
          message="Pesanan Anda sedang diproses"
          style={tw`mb-3`}
        />

        {/* With Custom Content */}
        <VBanner
          type="warning"
          title="Perhatian"
          message="Pembayaran akan kadaluarsa dalam:"
          style={tw`mb-3`}
        >
          <Text style={tw`text-warning-800 font-bold text-base mt-2`}>
            02:30:45
          </Text>
        </VBanner>

        {/* Custom Icon */}
        <VBanner
          type="success"
          title="Berhasil"
          message="Pesanan telah dikirim"
          icon={Truck} // Import dari lucide-react-native
          style={tw`mb-3`}
        />
      </View>
    </View>
  );
};

export default ExampleBanner;
