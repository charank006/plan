import { MapPin, Sun, Check } from 'lucide-react';
import { Destination } from '@/data/mockData';

interface DestinationCardProps {
  destination: Destination;
  isSelected: boolean;
  onToggle: () => void;
}

const DestinationCard = ({ destination, isSelected, onToggle }: DestinationCardProps) => {
  return (
    <div 
      onClick={onToggle}
      className={`card-interactive relative overflow-hidden ${isSelected ? 'card-selected' : ''}`}
    >
      {isSelected && (
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10">
          <Check className="w-5 h-5 text-primary-foreground" />
        </div>
      )}
      
      <div className="relative h-40 -mx-6 -mt-6 mb-4 overflow-hidden">
        <img 
          src={destination.image} 
          alt={destination.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <h3 className="text-lg font-bold text-white">{destination.name}</h3>
          <div className="flex items-center gap-1 text-white/80 text-sm">
            <MapPin className="w-3 h-3" />
            <span>{destination.state}</span>
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
        {destination.description}
      </p>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-1 text-sm">
          <Sun className="w-4 h-4 text-primary" />
          <span className="text-foreground">{destination.weather.temp}</span>
        </div>
        <span className="text-sm text-muted-foreground">{destination.weather.condition}</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {destination.highlights.slice(0, 3).map((highlight, index) => (
          <span 
            key={index}
            className="px-2 py-1 rounded-lg bg-secondary text-xs text-muted-foreground"
          >
            {highlight}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-sm text-muted-foreground">From</span>
        <span className="text-lg font-bold text-primary">
          ₹{destination.avgCostPerDay.toLocaleString()}/day
        </span>
      </div>
    </div>
  );
};

export default DestinationCard;
