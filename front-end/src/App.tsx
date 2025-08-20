import { ClerkProvider, SignedIn, SignedOut, SignInButton, useUser, useClerk } from '@clerk/clerk-react';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import React from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Toaster } from './components/ui/sonner';

import { Star, Sparkles, Users, Zap } from "lucide-react";
import celeb1 from './assets/celebrity1.jpg';
import celeb2 from './assets/celebrity2.jpg';
import celeb3 from './assets/celebrity3.jpg';

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
      // Redirect based on stored role
      const role = localStorage.getItem('userRole');
      if (role === 'celebrity') {
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
        await window.ethereum.request({ method: "eth_requestAccounts" });
        navigate("/");
      } catch (err) {
        alert("MetaMask login failed");
      }
    } else {
      alert("MetaMask not found");
    }
  };

  const handleSignIn = (redirectPath: string, role: string) => {
    localStorage.setItem('userRole', role);
    clerk.openSignIn({
      afterSignInUrl: redirectPath,
      afterSignUpUrl: redirectPath,
    });
  };

  return (
    <>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .shimmer {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .float {
          animation: float 3s ease-in-out infinite;
        }
        .celebrity-gradient {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .blockchain-glow {
          box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
        }
      `}</style>
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl float"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-purple-500 rounded-full blur-2xl float" style={{ animationDelay: "0.5s" }}></div>
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-pink-500 rounded-full blur-3xl float" style={{ animationDelay: "1s" }}></div>
        </div>
        <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
          <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-400">
                  <Sparkles className="w-6 h-6" />
                  <span className="text-sm font-semibold uppercase tracking-wider">Powered by Shardeum</span>
                </div>
                <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight">
                  Connect with Your
                  <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text block">Favorite Stars</span>
                </h1>
                <p className="text-xl text-gray-300 max-w-lg">Join the exclusive decentralized platform where fans and celebrities connect directly. Send messages, get replies, and be part of something extraordinary.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-center hover:bg-white/20 transition-all duration-300">
                  <Star className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm text-white">Direct Access</h3>
                  <p className="text-xs text-gray-300">Message celebrities directly</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 text-center hover:bg-white/20 transition-all duration-300">
                  <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <h3 className="font-semibold text-sm text-white">Blockchain Powered</h3>
                  <p className="text-xs text-gray-300">Secure & decentralized</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img src={celeb1} alt="Celebrity 1" className="w-12 h-12 rounded-full border-2 border-white float blockchain-glow" />
                  <img src={celeb2} alt="Celebrity 2" className="w-12 h-12 rounded-full border-2 border-white float blockchain-glow" style={{ animationDelay: "0.5s" }} />
                  <img src={celeb3} alt="Celebrity 3" className="w-12 h-12 rounded-full border-2 border-white float blockchain-glow" style={{ animationDelay: "1s" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Join 50,000+ fans</p>
                  <p className="text-xs text-gray-300">Already connecting with celebrities</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl blockchain-glow">
                <div className="p-8 space-y-6">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 celebrity-gradient rounded-2xl mx-auto flex items-center justify-center mb-4 blockchain-glow">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                    <p className="text-gray-300">Choose your login method to continue</p>
                  </div>
                  <div className="space-y-4">
                    <button onClick={() => handleSignIn("/", "fan")} className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg rounded-lg shimmer relative overflow-hidden group transition-all duration-300">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Star className="w-5 h-5" />
                        Login as Fan
                      </span>
                    </button>
                    <button onClick={() => handleSignIn("/dashboard", "celebrity")} className="w-full h-12 bg-gradient-to-r from-pink-600 to-red-600 hover:from-pink-700 hover:to-red-700 text-white font-semibold text-lg rounded-lg relative overflow-hidden group transition-all duration-300">
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        Login as Celebrity
                      </span>
                    </button>
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/20"></div>
                      </div>
                      
                    </div>
                   
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">By continuing, you agree to our Terms of Service and Privacy Policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
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
