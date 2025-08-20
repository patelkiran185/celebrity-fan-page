import React from "react";
import { useClerk } from '@clerk/clerk-react';

const messages = [
  {
    id: 1,
    from: "0x1dc9a3244d23509bd795f37ae90b28e3d943fde9",
    message: "Hello, I am a big fan!",
    amount: "0.2 SHM",
    txHash: "0xa58bc39991983d52f12d6338b532d1810b6cc12df42c6c87e9e3c934cda6da",
    timestamp: "2025-08-20 02:33:32",
  },
  {
    id: 2,
    from: "0x330618814e923759...",
    message: "You are awesome!",
    amount: "0.3 SHM",
    txHash: "0xb7b6f7d29439e73df50207cdba462a1f732cf3660ef518028d5a0a85e9748c700",
    timestamp: "2025-08-20 02:44:05",
  },
];

const Dashboard: React.FC = () => {
  const clerk = useClerk();
  const handleLogout = async () => {
    await clerk.signOut();
    window.location.href = '/login';
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-black to-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-end mb-4">
          <button
            className="bg-red-600 text-white px-4 py-2 rounded font-semibold hover:bg-red-700 transition"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
        <h2 className="text-4xl font-bold text-white mb-8 text-center">Celebrity Inbox</h2>
        <div className="max-w-2xl mx-auto bg-white/10 rounded-lg shadow-lg p-6">
          {messages.length === 0 ? (
            <div className="text-center text-gray-300 py-12">
              <span className="text-lg">No messages yet.</span>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className="bg-white/20 rounded-lg p-4 border border-purple-400 shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-purple-200">From:</span>
                    <span className="font-mono text-xs text-purple-100">{msg.from}</span>
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold text-purple-200">Message:</span>
                    <span className="ml-2 text-white">{msg.message}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-purple-200">Amount:</span>
                    <span className="text-white">{msg.amount}</span>
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-purple-200">Tx Hash:</span>
                    <a
                      href={`https://explorer-unstable.shardeum.org/tx/${msg.txHash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-300 underline break-all"
                    >
                      {msg.txHash}
                    </a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-purple-200">Timestamp:</span>
                    <span className="text-white">{msg.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
