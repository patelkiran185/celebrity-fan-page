import { ClerkProvider, SignedIn, SignedOut, SignInButton, useUser, useClerk } from '@clerk/clerk-react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Toaster } from './components/ui/sonner';


declare global {
  interface Window {
    ethereum?: any;
  }
}

const queryClient = new QueryClient();
const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function AuthRouter() {
  const { user, isSignedIn } = useUser();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isSignedIn) {
      navigate('/login');
    } else if (user) {
      if (user.primaryEmailAddress?.emailAddress?.endsWith('@gmail.com')) {
        navigate('/dashboard');
      } else {
        navigate('/');
      }
    }
  }, [user, isSignedIn, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}




  function LoginPage() {
    const clerk = useClerk();
    const navigate = useNavigate();
    const handleMetaMaskLogin = async () => {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          navigate('/');
        } catch (err) {
          alert('MetaMask login failed');
        }
      } else {
        alert('MetaMask not found');
      }
    };

    const handleSignIn = (redirectPath: string) => {
      clerk.openSignIn({
        afterSignInUrl: redirectPath,
        afterSignUpUrl: redirectPath
      });
    };

    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-black to-gray-900">
        <div className="bg-white/10 rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-white">Login to Celebrity Fan Messages</h2>
          <div className="mb-4">
            <button
              className="bg-purple-600 text-white px-6 py-2 rounded font-semibold hover:bg-purple-700 transition"
              onClick={() => handleSignIn('/')}
            >
              Login
            </button>
          </div>
          <div className="mb-4">
            <button
              className="bg-pink-600 text-white px-6 py-2 rounded font-semibold hover:bg-pink-700 transition"
              onClick={() => handleSignIn('/dashboard')}
            >
              Login like Celebrity
            </button>
          </div>
        </div>
      </div>
    );
  }

const App = () => (
  <ClerkProvider publishableKey={clerkKey}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <AuthRouter />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
