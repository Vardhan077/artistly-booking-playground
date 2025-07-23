import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Calendar } from "lucide-react";

interface Artist {
  id: number;
  name: string;
  category: string;
  priceRange: string;
  location: string;
  image: string;
  rating: number;
  bookings: number;
  bio: string;
}

interface ArtistCardProps {
  artist: Artist;
  onQuoteRequest?: (artistId: number) => void;
}

const ArtistCard = ({ artist, onQuoteRequest }: ArtistCardProps) => {
  return (
    <Card className="group h-full flex flex-col bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            {artist.category}
          </Badge>
        </div>
        <div className="absolute top-3 left-3 flex items-center space-x-1 bg-white/90 rounded-full px-2 py-1">
          <Star className="h-3 w-3 text-yellow-500 fill-current" />
          <span className="text-xs font-medium">{artist.rating}</span>
        </div>
      </div>
      
      <CardContent className="flex-1 p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {artist.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {artist.bio}
            </p>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {artist.location}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              {artist.bookings} bookings
            </div>
            <div className="font-semibold text-primary">
              {artist.priceRange}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          className="w-full" 
          onClick={() => onQuoteRequest?.(artist.id)}
        >
          Ask for Quote
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArtistCard;