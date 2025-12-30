import { View, StyleSheet } from 'react-native';
import { VButton } from 'v-pack';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.previewBtn}>
        <VButton type="primary">Primary Button</VButton>
        <VButton type="warning" variant="outline">
          Warning Outline
        </VButton>
        <VButton type="success" variant="ghost">
          Success Ghost
        </VButton>
        <VButton size="small">Small</VButton>
        <VButton size="medium">Medium</VButton>
        <VButton size="large">Large</VButton>
        <VButton disabled>Disabled Button</VButton>
        <VButton variant="outline" disabled>
          Disabled Outline
        </VButton>
        <VButton type="danger" onPress={() => console.log('Pressed')}>
          Delete
        </VButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewBtn: {
    flexDirection: 'column',
    gap: 12,
  },
});
