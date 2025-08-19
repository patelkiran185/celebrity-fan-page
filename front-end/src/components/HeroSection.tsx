import { Star, MessageCircle, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-bg.jpg";

export const HeroSection = () => {
  return (
    <div 
      className="relative min-h-[70vh] flex items-center justify-center text-center px-4 py-20"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${heroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple/20 via-transparent to-gold/20" />
      
      <div className="relative max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Star className="w-6 h-6 text-star-gold star-glow animate-pulse-slow" />
            <Star className="w-8 h-8 text-star-gold star-glow animate-float" />
            <Star className="w-6 h-6 text-star-gold star-glow animate-pulse-slow" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold gradient-text leading-tight">
            Celebrity Fan Messages
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Send personalized messages to your favorite celebrities. 
            Pay with crypto, get verified responses.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="premium" size="lg" className="text-lg">
            <MessageCircle className="w-5 h-5 mr-2" />
            Start Messaging
          </Button>
          <Button variant="celebrity" size="lg" className="text-lg">
            <Shield className="w-5 h-5 mr-2" />
            Browse Celebrities
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-gradient-to-r from-gold to-purple rounded-full flex items-center justify-center mx-auto star-glow">
              <MessageCircle className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold">Direct Messages</h3>
            <p className="text-muted-foreground">Send messages directly to verified celebrities</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-gradient-to-r from-purple to-gold rounded-full flex items-center justify-center mx-auto star-glow">
              <Shield className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold">Verified Responses</h3>
            <p className="text-muted-foreground">Get authentic replies with on-chain verification</p>
          </div>
          
          <div className="text-center space-y-3">
            <div className="w-16 h-16 bg-gradient-to-r from-gold to-purple rounded-full flex items-center justify-center mx-auto star-glow">
              <Star className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-semibold">Premium Experience</h3>
            <p className="text-muted-foreground">Crypto payments ensure quality interactions</p>
          </div>
        </div>
      </div>
    </div>
  );
};