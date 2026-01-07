import { ArrowRight, Home, MapPin, Plane, Train, Bus } from 'lucide-react';

interface DepartureReturnCardProps {
  type: 'departure' | 'return';
  from: string;
  to: string;
  date: string;
  mode: 'flight' | 'train' | 'bus';
  duration: string;
  price: number;
}

const DepartureReturnCard = ({
  type,
  from,
  to,
  date,
  mode,
  duration,
  price
}: DepartureReturnCardProps) => {
  const getModeIcon = () => {
    switch (mode) {
      case 'flight':
        return <Plane className="w-5 h-5" />;
      case 'train':
        return <Train className="w-5 h-5" />;
      case 'bus':
        return <Bus className="w-5 h-5" />;
    }
  };

  return (
    <div className={`card-base border-l-4 ${
      type === 'departure' ? 'border-l-primary' : 'border-l-green-500'
    }`}>
      <div className="flex items-center gap-2 mb-4">
        {type === 'departure' ? (
          <Home className="w-5 h-5 text-primary" />
        ) : (
          <MapPin className="w-5 h-5 text-green-500" />
        )}
        <h3 className="font-semibold text-foreground">
          {type === 'departure' ? 'Departure from Home' : 'Return to Home'}
        </h3>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex-1">
          <p className="text-lg font-semibold text-foreground">{from}</p>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
        
        <div className="flex flex-col items-center px-4">
          <div className="w-10 h-10 rounded-full bg-orange-light flex items-center justify-center text-primary mb-1">
            {getModeIcon()}
          </div>
          <span className="text-xs text-muted-foreground">{duration}</span>
          <ArrowRight className="w-4 h-4 text-primary" />
        </div>
        
        <div className="flex-1 text-right">
          <p className="text-lg font-semibold text-foreground">{to}</p>
          <p className="text-sm text-muted-foreground capitalize">{mode}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-sm text-muted-foreground">Estimated cost</span>
        <span className="text-xl font-bold text-primary">₹{price.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default DepartureReturnCard;
