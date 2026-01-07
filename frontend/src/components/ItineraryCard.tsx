import { MapPin, Sun, Coffee, Moon, Camera } from 'lucide-react';

interface Activity {
  time: string;
  activity: string;
  icon: 'sun' | 'coffee' | 'moon' | 'camera';
}

interface ItineraryCardProps {
  day: number;
  date: string;
  location: string;
  activities: Activity[];
  isTravel?: boolean;
  travelDetails?: {
    from: string;
    to: string;
    mode: string;
  };
}

const ItineraryCard = ({ 
  day, 
  date, 
  location, 
  activities, 
  isTravel = false,
  travelDetails 
}: ItineraryCardProps) => {
  const getIcon = (icon: string) => {
    switch (icon) {
      case 'sun':
        return <Sun className="w-4 h-4" />;
      case 'coffee':
        return <Coffee className="w-4 h-4" />;
      case 'moon':
        return <Moon className="w-4 h-4" />;
      case 'camera':
        return <Camera className="w-4 h-4" />;
      default:
        return <Sun className="w-4 h-4" />;
    }
  };

  return (
    <div className="card-base animate-slide-up">
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-primary flex flex-col items-center justify-center text-primary-foreground">
            <span className="text-xs font-medium">Day</span>
            <span className="text-xl font-bold">{day}</span>
          </div>
          <div className="w-0.5 h-full bg-border mt-2 min-h-[100px]" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-primary" />
            <h3 className="font-semibold text-foreground">{location}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{date}</p>

          {isTravel && travelDetails && (
            <div className="bg-orange-light rounded-xl p-4 mb-4">
              <p className="font-medium text-foreground mb-1">Travel Day</p>
              <p className="text-sm text-muted-foreground">
                {travelDetails.from} → {travelDetails.to} via {travelDetails.mode}
              </p>
            </div>
          )}

          <div className="space-y-3">
            {activities.map((activity, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-muted-foreground">
                  {getIcon(activity.icon)}
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{activity.time}</p>
                  <p className="text-sm font-medium text-foreground">{activity.activity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItineraryCard;
