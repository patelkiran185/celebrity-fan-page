import { useState } from "react";
import { X, Send, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  celebrity: {
    name: string;
    avatar: string;
    price: string;
  } | null;
  account: string;
  status: string;
  connectWallet: () => Promise<void>;
  sendMessage: (message: string, price: string) => Promise<void>;
}

export const MessageModal = ({ isOpen, onClose, celebrity ,account,
  status,
  connectWallet,
  sendMessage, }: MessageModalProps) => {
  const [message, setMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();

  if (!isOpen || !celebrity) return null;

  const handleConnectWallet = async () => {
    // Simulate wallet connection
    setIsConnected(true);
    toast({
      title: "Wallet Connected",
      description: "Your wallet has been connected successfully.",
    });
  };

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast({
        title: "Message Required",
        description: "Please enter a message before sending.",
        variant: "destructive",
      });
      return;
    }

    setIsSending(true);
    
    // Simulate sending message
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: `Your message has been sent to ${celebrity.name} for ${celebrity.price} SHM.`,
      });
      setIsSending(false);
      setMessage("");
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg card-gradient border border-gold/30">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="gradient-text">Send Message</CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex items-center gap-3">
            <img
              src={celebrity.avatar}
              alt={celebrity.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-gold/30"
            />
            <div>
              <h3 className="font-semibold">{celebrity.name}</h3>
              <p className="text-sm text-muted-foreground">Cost: {celebrity.price} SHM</p>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Your Message</label>
            <Textarea
              placeholder="Write your message to the celebrity..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[120px] bg-muted/50 border-gold/20 focus:border-gold/40"
            />
          </div>

          <div className="space-y-3">
            {!isConnected ? (
              <Button 
                variant="premium" 
                className="w-full"
                onClick={handleConnectWallet}
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
              </Button>
            ) : (
              <Button 
                variant="premium" 
                className="w-full"
                onClick={handleSendMessage}
                disabled={isSending}
              >
                <Send className="w-4 h-4 mr-2" />
                {isSending ? "Sending..." : `Send Message (${celebrity.price} SHM)`}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};