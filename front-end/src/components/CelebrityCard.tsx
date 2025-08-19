import { Star, Verified, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface CelebrityCardProps {
  name: string;
  category: string;
  verified: boolean;
  messageCount: number;
  rating: number;
  avatar: string;
  price: string;
  onSendMessage: () => void;
}

export const CelebrityCard = ({
  name,
  category,
  verified,
  messageCount,
  rating,
  avatar,
  price,
  onSendMessage,
}: CelebrityCardProps) => {
  return (
    <Card className="card-gradient border border-gold/20 hover:border-gold/40 transition-all duration-300 hover:shadow-gold group">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="relative">
            <img
              src={avatar}
              alt={name}
              className="w-20 h-20 rounded-full object-cover ring-2 ring-gold/30 group-hover:ring-gold/60 transition-all duration-300"
            />
            {verified && (
              <div className="absolute -bottom-1 -right-1 bg-gold rounded-full p-1 star-glow">
                <Verified className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-lg gradient-text">{name}</h3>
            </div>
            
            <p className="text-muted-foreground text-sm mb-2">{category}</p>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-star-gold text-star-gold" />
                <span>{rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{messageCount}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold gradient-text">{price} SHM</div>
              <Button 
                variant="message" 
                onClick={onSendMessage}
                className="transform hover:scale-105"
              >
                Send Message
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};