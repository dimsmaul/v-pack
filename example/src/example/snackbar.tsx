import React from 'react';
import { Text, View } from 'react-native';
import tw from '../../../src/utils/tw';
import { useSnackbar, VButton } from 'v-pack';
import { CheckCircle } from 'lucide-react-native';

const ExampleSnackbar: React.FC = () => {
  const snackbar = useSnackbar();
  return (
    <View
      style={tw`m-4 bg-white rounded-xl border border-gray-300 overflow-hidden`}
    >
      <Text
        style={tw`text-lg font-bold p-4 bg-gray-50 border-b border-gray-300`}
      >
        Snackbar
      </Text>
      <View style={tw`p-4 gap-3`}>
        <VButton
          onPress={() =>
            snackbar.show({
              message: 'Data berhasil disimpan!',
              type: 'success',
              icon: CheckCircle,
            })
          }
        >
          Show Success
        </VButton>

        {/* Error */}
        <VButton
          onPress={() =>
            snackbar.show({
              message: 'Gagal menyimpan data',
              type: 'danger',
            })
          }
        >
          Show Error
        </VButton>

        {/* Warning */}
        <VButton
          onPress={() =>
            snackbar.show({
              message: 'Peringatan: Koneksi tidak stabil',
              type: 'warning',
              duration: 5000, // 5 detik
            })
          }
        >
          Show Warning
        </VButton>

        {/* Info */}
        <VButton
          onPress={() =>
            snackbar.show({
              message: 'Informasi: Update tersedia',
              type: 'info',
            })
          }
        >
          Show Info
        </VButton>

        {/* With Action */}
        <VButton
          onPress={() =>
            snackbar.show({
              message: 'Item dihapus',
              type: 'danger',
              action: {
                label: 'UNDO',
                onPress: () => console.log('Undo delete'),
              },
            })
          }
        >
          With Action
        </VButton>

        {/* Custom Duration */}
        <VButton
          onPress={() =>
            snackbar.show({
              message: 'Pesan ini akan tampil 10 detik',
              type: 'info',
              duration: 10000,
            })
          }
        >
          Long Duration
        </VButton>

        {/* No Auto Hide */}
        <VButton
          onPress={() =>
            snackbar.show({
              message: 'Klik X untuk menutup',
              type: 'warning',
              duration: 0, // Tidak auto hide
            })
          }
        >
          Manual Close Only
        </VButton>

        {/* Manual Hide */}
        <VButton onPress={() => snackbar.hide()}>Hide Snackbar</VButton>
      </View>
    </View>
  );
};

export default ExampleSnackbar;
