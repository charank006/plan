import { Plane, Train, Bus, Clock, Tag } from 'lucide-react';
import { TravelOption } from '@/data/mockData';

interface TravelCardProps {
  option: TravelOption;
  isSelected?: boolean;
  onSelect?: () => void;
}

const TravelCard = ({ option, isSelected = false, onSelect }: TravelCardProps) => {
  const getIcon = () => {
    switch (option.type) {
      case 'flight':
        return <Plane className="w-6 h-6" />;
      case 'train':
        return <Train className="w-6 h-6" />;
      case 'bus':
        return <Bus className="w-6 h-6" />;
    }
  };

  const getTypeLabel = () => {
    switch (option.type) {
      case 'flight':
        return 'Flight';
      case 'train':
        return 'Train';
      case 'bus':
        return 'Bus';
    }
  };

  return (
    <div 
      onClick={onSelect}
      className={`card-interactive ${isSelected ? 'card-selected' : ''}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-orange-light flex items-center justify-center text-primary">
            {getIcon()}
          </div>
          <div>
            <p className="font-semibold text-foreground">{getTypeLabel()}</p>
            <p className="text-sm text-muted-foreground">{option.operator}</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-orange-light text-primary text-xs font-medium">
          {option.bestFor}
        </span>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">{option.departure}</p>
          <p className="text-sm text-muted-foreground">{option.from}</p>
        </div>
        
        <div className="flex-1 mx-4 flex flex-col items-center">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{option.duration}</span>
          </div>
          <div className="w-full h-0.5 bg-border relative">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary" />
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-lg font-semibold text-foreground">{option.arrival}</p>
          <p className="text-sm text-muted-foreground">{option.to}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Tag className="w-4 h-4" />
          <span className="text-sm">Per person</span>
        </div>
        <p className="text-xl font-bold text-primary">₹{option.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default TravelCard;
