import tw, { useDeviceContext } from 'twrnc';
import { VPackProvider } from 'v-pack';
import Documentation from './pages/Documentation';

export default function App() {
  useDeviceContext(tw);
  return (
    <VPackProvider>
      <Documentation />
    </VPackProvider>
  );
}
