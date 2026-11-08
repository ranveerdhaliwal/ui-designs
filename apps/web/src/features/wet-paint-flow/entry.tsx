import { createRoot } from 'react-dom/client';
import WetPaintApp from './WetPaintApp';
// The imperative engine owns its isolated document. StrictMode double mounting is not applicable here.
createRoot(document.getElementById('root')!).render(<WetPaintApp />);
