import { Router } from "./routes/Router";
import { Toaster } from 'sonner';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Toaster richColors position="top-right" />
      <Router />
    </AuthProvider>
  );
}

export default App;
