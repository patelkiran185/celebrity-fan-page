import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react';

<ClerkProvider publishableKey="pk_test_aW5ub2NlbnQtamF2ZWxpbi05NS5jbGVyay5hY2NvdW50cy5kZXYk">
  <App />
</ClerkProvider>


createRoot(document.getElementById("root")!).render(<App />);
