import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ArrowLeft, MapPin } from 'lucide-react';
import Navbar from '@/components/Navbar';
import StepIndicator from '@/components/StepIndicator';
import DestinationCard from '@/components/DestinationCard';
import { useTripContext } from '@/context/TripContext';
import { destinations, Destination } from '@/data/mockData';

const Destinations = () => {
  const navigate = useNavigate();
  const { tripDetails, selectedDestinations, setSelectedDestinations, setCurrentStep } = useTripContext();
  const [selected, setSelected] = useState<string[]>(selectedDestinations.map(d => d.id));

  useEffect(() => {
    if (!tripDetails.startingLocation) {
      navigate('/trip-details');
    }
  }, [tripDetails, navigate]);

  const getCurrentSeason = () => {
    const month = new Date(tripDetails.startDate).getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 8) return 'summer';
    if (month >= 9 && month <= 10) return 'autumn';
    return 'winter';
  };

  const season = getCurrentSeason();

  const filteredDestinations = destinations.filter(dest => 
    dest.bestSeason.includes(season) || dest.bestSeason.includes('monsoon')
  );

  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    const aSelected = selected.includes(a.id);
    const bSelected = selected.includes(b.id);
    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;
    return 0;
  });

  const handleToggleDestination = (destination: Destination) => {
    setSelected(prev => {
      if (prev.includes(destination.id)) {
        return prev.filter(id => id !== destination.id);
      }
      return [...prev, destination.id];
    });
  };

  const handleContinue = () => {
    if (selected.length > 0) {
      const selectedDests = destinations.filter(d => selected.includes(d.id));
      setSelectedDestinations(selectedDests);
      setCurrentStep(3);
      navigate('/trip-plan');
    }
  };

  const handleBack = () => {
    navigate('/trip-details');
  };

  const getDaysCount = () => {
    if (!tripDetails.startDate || !tripDetails.endDate) return 0;
    const start = new Date(tripDetails.startDate);
    const end = new Date(tripDetails.endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="section-padding">
        <div className="container-base">
          <StepIndicator currentStep={2} />

          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Choose your <span className="text-primary">destinations</span>
            </h1>
            <p className="text-muted-foreground mb-4">
              Select multiple destinations to create your perfect circuit trip
            </p>
            <div className="flex items-center justify-center gap-4 text-sm">
              <span className="px-3 py-1 rounded-full bg-orange-light text-primary font-medium">
                Season: {season.charAt(0).toUpperCase() + season.slice(1)}
              </span>
              <span className="px-3 py-1 rounded-full bg-secondary text-muted-foreground">
                {getDaysCount()} Days Trip
              </span>
            </div>
          </div>

          {/* Selected Journey Preview */}
          {selected.length > 0 && (
            <div className="card-base mb-8 p-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium text-muted-foreground">Your Journey:</span>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    {tripDetails.startingLocation}
                  </span>
                  {selected.map((id, index) => {
                    const dest = destinations.find(d => d.id === id);
                    return (
                      <div key={id} className="flex items-center gap-2">
                        <span className="text-primary">→</span>
                        <span className="px-3 py-1 rounded-full bg-orange-light text-primary text-sm font-medium">
                          {dest?.name}
                        </span>
                      </div>
                    );
                  })}
                  <span className="text-primary">→</span>
                  <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                    {tripDetails.startingLocation}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Destinations Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
            {sortedDestinations.map((destination, index) => (
              <div 
                key={destination.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <DestinationCard
                  destination={destination}
                  isSelected={selected.includes(destination.id)}
                  onToggle={() => handleToggleDestination(destination)}
                />
              </div>
            ))}
          </div>

          {/* Bottom Navigation */}
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            <button 
              onClick={handleBack}
              className="btn-secondary flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {selected.length} destination{selected.length !== 1 ? 's' : ''} selected
              </p>
            </div>

            <button 
              onClick={handleContinue}
              disabled={selected.length === 0}
              className={`btn-primary flex items-center gap-2 ${
                selected.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              View Plan
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;
