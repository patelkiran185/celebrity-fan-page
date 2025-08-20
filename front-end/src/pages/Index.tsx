import { useState } from "react";
import { useClerk } from '@clerk/clerk-react';
import { Search } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { CelebrityCard } from "@/components/CelebrityCard";
import { MessageModal } from "@/components/MessageModal";
import { Input } from "@/components/ui/input";
import celebrity1 from "@/assets/celebrity1.jpg";
import celebrity2 from "@/assets/celebrity2.jpg";
import celebrity3 from "@/assets/celebrity3.jpg";

import { ethers } from "ethers";

const RPC_URL = 'https://api-unstable.shardeum.org';
const CHAIN_ID = 8080;
const CONTRACT_ADDRESS = '0xb08E78fCB8D9cc29cfE7D8f1E3Ef322611598BAE';


const celebrities = [
  {
    id: 1,
    name: "Alex Rivera",
    category: "Pop Singer",
    verified: true,
    messageCount: 1247,
    rating: 4.9,
    avatar: celebrity1,
    price: "0.2",
  },
  {
    id: 2,
    name: "Sophie Chen",
    category: "Movie Actress",
    verified: true,
    messageCount: 892,
    rating: 4.8,
    avatar: celebrity2,
    price: "0.3",
  },
  {
    id: 3,
    name: "Marcus Johnson",
    category: "TV Actor",
    verified: true,
    messageCount: 634,
    rating: 4.7,
    avatar: celebrity3,
    price: "0.15",
  },
];

const Index = () => {
  const clerk = useClerk();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCelebrity, setSelectedCelebrity] = useState<typeof celebrities[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [account, setAccount] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSending, setIsSending] = useState(false);


  const filteredCelebrities = celebrities.filter(celebrity =>
    celebrity.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    celebrity.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (celebrity: typeof celebrities[0]) => {
    setSelectedCelebrity(celebrity);
    setIsModalOpen(true);
    setMessage("");
    setStatus("");
  };

  async function ensureNetwork() {
    const provider = (window as any).ethereum;
    if (!provider) throw new Error('MetaMask not found');
    const network = await provider.request({ method: 'eth_chainId' });
    if (parseInt(network, 16) !== CHAIN_ID) {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x' + CHAIN_ID.toString(16),
          chainName: 'Shardeum Unstablenet',
          nativeCurrency: { name: 'Shardeum', symbol: 'SHM', decimals: 18 },
          rpcUrls: [RPC_URL],
          blockExplorerUrls: ['https://explorer-unstable.shardeum.org/']
        }]
      });
    }
  }

  // async function connectWallet() {
  //   try {
  //     await ensureNetwork();
  //     const provider = (window as any).ethereum;
  //     const accounts = await provider.request({ method: 'eth_requestAccounts' });
  //     setAccount(accounts[0]);
  //     setStatus("Wallet connected!");
  //   } catch (e: any) {
  //     setStatus(e.message);
  //   }
  // }

  async function sendMessageToContract() {
    if (!selectedCelebrity) return;
    try {
      setIsSending(true);
      if (!account) await connectWallet();
      if (CONTRACT_ADDRESS.startsWith('REPLACE')) throw new Error('Deploy contract first and set CONTRACT_ADDRESS');
      const abi = await (await fetch('/abi.json')).json();
      await ensureNetwork();
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
      if (!message.trim()) throw new Error('Message cannot be empty');
      setStatus('Sending transaction...');
      const tx = await contract.sendMessage(message, { value: ethers.parseEther(selectedCelebrity.price) });
      await tx.wait();
      setStatus('Message sent! Tx: ' + tx.hash);
      setIsModalOpen(false);
    } catch (e: any) {
      setStatus('Error: ' + (e?.message || e));
    } finally {
      setIsSending(false);
    }
  }
  //  async function ensureNetwork() {
  //   const provider = (window as any).ethereum;
  //   if (!provider) throw new Error('MetaMask not found');
  //   const network = await provider.request({ method: 'eth_chainId' });
  //   if (parseInt(network, 16) !== CHAIN_ID) {
  //     await provider.request({
  //       method: 'wallet_addEthereumChain',
  //       params: [{
  //         chainId: '0x' + CHAIN_ID.toString(16),
  //         chainName: 'Shardeum Unstablenet',
  //         nativeCurrency: { name: 'Shardeum', symbol: 'SHM', decimals: 18 },
  //         rpcUrls: [RPC_URL],
  //         blockExplorerUrls: ['https://explorer-unstable.shardeum.org/']
  //       }]
  //     });
  //   }
  // }

  async function connectWallet() {
    try {
      await ensureNetwork();
      const provider = (window as any).ethereum;
      const accounts = await provider.request({ method: 'eth_requestAccounts' });
      setAccount(accounts[0]);
      setStatus("Wallet connected!");
    } catch (e: any) {
      setStatus(e.message);
    }
  }

  async function sendMessage(message: string, price: string) {
    try {
      if (!account) await connectWallet();
      if (CONTRACT_ADDRESS.startsWith('REPLACE')) throw new Error('Deploy contract first and set CONTRACT_ADDRESS');
      const abi = await (await fetch('/abi.json')).json();
      await ensureNetwork();
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
      if (!message.trim()) throw new Error('Message cannot be empty');
      setStatus('Sending transaction...');
      const tx = await contract.sendMessage(message, { value: ethers.parseEther(price) });
      await tx.wait();
      setStatus('Message sent! Tx: ' + tx.hash);
    } catch (e: any) {
      setStatus('Error: ' + (e?.message || e));
    }
  }


  return (
    <div className="min-h-screen">
      <div className="flex justify-end p-4">
        <button
          className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition"
          onClick={async () => {
            await clerk.signOut();
            window.location.href = 'http://localhost:8080';
          }}
        >
          Log Out
        </button>
      </div>
      <HeroSection />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold gradient-text mb-4">Featured Celebrities</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Connect with verified celebrities and send personalized messages
          </p>
          
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search celebrities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-muted/50 border-gold/20 focus:border-gold/40"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCelebrities.map((celebrity) => (
            <CelebrityCard
              key={celebrity.id}
              name={celebrity.name}
              category={celebrity.category}
              verified={celebrity.verified}
              messageCount={celebrity.messageCount}
              rating={celebrity.rating}
              avatar={celebrity.avatar}
              price={celebrity.price}
              onSendMessage={() => handleSendMessage(celebrity)}
            />
          ))}
        </div>

        {filteredCelebrities.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">
              No celebrities found matching your search.
            </p>
          </div>
        )}
      </div>

      {/* Modal UI using React, but logic from HTML/app.js for MetaMask and contract */}
      {isModalOpen && selectedCelebrity && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg card-gradient border border-gold/30 bg-white rounded-lg p-6">
            <div className="flex flex-row items-center justify-between pb-4">
              <span className="gradient-text text-xl font-bold">Send Message</span>
              <button className="text-gray-500 hover:text-gray-700" onClick={() => setIsModalOpen(false)}>
                ×
              </button>
            </div>
            <div className="flex items-center gap-3 mb-6">
              <img
                src={selectedCelebrity.avatar}
                alt={selectedCelebrity.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-gold/30"
              />
              <div>
                <h3 className="font-semibold">{selectedCelebrity.name}</h3>
                <p className="text-sm text-muted-foreground">Cost: {selectedCelebrity.price} SHM</p>
              </div>
            </div>
            <div className="space-y-2 mb-6">
              <label className="text-sm font-medium">Your Message</label>
              <textarea
                placeholder="Write your message to the celebrity..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="min-h-[120px] w-full bg-muted/50 border-gold/20 focus:border-gold/40 rounded p-2"
              />
            </div>
            <div className="space-y-3">
              {!account ? (
                <button
                  className="w-full bg-yellow-500 text-white py-2 rounded font-semibold flex items-center justify-center"
                  onClick={connectWallet}
                  disabled={isSending}
                >
                  Connect Wallet
                </button>
              ) : (
                <button
                  className="w-full bg-blue-600 text-white py-2 rounded font-semibold flex items-center justify-center"
                  onClick={sendMessageToContract}
                  disabled={isSending}
                >
                  {isSending ? "Sending..." : `Send Message (${selectedCelebrity.price} SHM)`}
                </button>
              )}
              {status && (
                <div className="mt-2 text-sm text-gray-700">{status}</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;