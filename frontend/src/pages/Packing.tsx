import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Shirt, Briefcase, Smartphone, FileText, Heart, Sun, Cloud, Snowflake, Droplets } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useTripContext } from '@/context/TripContext';
import { packingItems, PackingItem } from '@/data/mockData';

const Packing = () => {
  const navigate = useNavigate();
  const { tripDetails, selectedDestinations } = useTripContext();
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!tripDetails.startingLocation || selectedDestinations.length === 0) {
      navigate('/trip-details');
    }
  }, [tripDetails, selectedDestinations, navigate]);

  const getWeatherConditions = () => {
    const conditions = new Set<string>();
    conditions.add('all');
    
    selectedDestinations.forEach(dest => {
      const condition = dest.weather.condition.toLowerCase();
      if (condition.includes('sunny') || condition.includes('hot')) {
        conditions.add('summer');
        conditions.add('beach');
      }
      if (condition.includes('cold') || condition.includes('winter')) {
        conditions.add('winter');
        conditions.add('cold');
      }
      if (condition.includes('pleasant')) {
        conditions.add('spring');
      }
      if (condition.includes('tropical')) {
        conditions.add('tropical');
        conditions.add('monsoon');
      }
      
      // Check for mountain destinations
      if (['Ladakh', 'Manali'].includes(dest.name)) {
        conditions.add('mountains');
        conditions.add('cold');
      }
      // Check for beach destinations
      if (['Goa', 'Kerala'].includes(dest.name)) {
        conditions.add('beach');
      }
    });

    return conditions;
  };

  const weatherConditions = getWeatherConditions();

  const relevantItems = packingItems.filter(item => 
    item.weather.some(w => weatherConditions.has(w))
  );

  const categorizedItems = {
    clothing: relevantItems.filter(item => item.category === 'clothing'),
    essentials: relevantItems.filter(item => item.category === 'essentials'),
    electronics: relevantItems.filter(item => item.category === 'electronics'),
    documents: relevantItems.filter(item => item.category === 'documents'),
    health: relevantItems.filter(item => item.category === 'health')
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'clothing':
        return <Shirt className="w-5 h-5" />;
      case 'essentials':
        return <Briefcase className="w-5 h-5" />;
      case 'electronics':
        return <Smartphone className="w-5 h-5" />;
      case 'documents':
        return <FileText className="w-5 h-5" />;
      case 'health':
        return <Heart className="w-5 h-5" />;
      default:
        return <Briefcase className="w-5 h-5" />;
    }
  };

  const getWeatherIcon = () => {
    if (weatherConditions.has('cold') || weatherConditions.has('winter')) {
      return <Snowflake className="w-5 h-5 text-blue-500" />;
    }
    if (weatherConditions.has('monsoon') || weatherConditions.has('tropical')) {
      return <Droplets className="w-5 h-5 text-blue-500" />;
    }
    if (weatherConditions.has('summer') || weatherConditions.has('beach')) {
      return <Sun className="w-5 h-5 text-yellow-500" />;
    }
    return <Cloud className="w-5 h-5 text-gray-500" />;
  };

  const toggleItem = (itemId: string) => {
    setCheckedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const progress = Math.round((checkedItems.size / relevantItems.length) * 100);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="section-padding">
        <div className="container-base">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Packing <span className="text-primary">Essentials</span>
              </h1>
              <p className="text-muted-foreground mb-4">
                Customized checklist based on your destinations and weather
              </p>
              
              <div className="flex items-center justify-center gap-4">
                {getWeatherIcon()}
                <span className="text-sm text-muted-foreground">
                  Weather at destinations: {selectedDestinations.map(d => d.weather.condition).join(', ')}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="card-base mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="font-semibold text-foreground">Packing Progress</span>
                <span className="text-sm text-muted-foreground">
                  {checkedItems.size} / {relevantItems.length} items
                </span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-2 text-center">
                {progress === 100 ? '🎉 All packed and ready to go!' : `${progress}% complete`}
              </p>
            </div>

            {/* Categories */}
            <div className="space-y-6">
              {Object.entries(categorizedItems).map(([category, items]) => {
                if (items.length === 0) return null;
                
                const categoryChecked = items.filter(item => checkedItems.has(item.id)).length;
                
                return (
                  <div key={category} className="card-base">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-light flex items-center justify-center text-primary">
                          {getCategoryIcon(category)}
                        </div>
                        <h2 className="font-semibold text-foreground capitalize">{category}</h2>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {categoryChecked}/{items.length}
                      </span>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      {items.map(item => (
                        <button
                          key={item.id}
                          onClick={() => toggleItem(item.id)}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                            checkedItems.has(item.id)
                              ? 'border-primary bg-orange-light'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                            checkedItems.has(item.id)
                              ? 'bg-primary'
                              : 'bg-secondary'
                          }`}>
                            {checkedItems.has(item.id) && (
                              <Check className="w-4 h-4 text-primary-foreground" />
                            )}
                          </div>
                          <span className={`font-medium ${
                            checkedItems.has(item.id)
                              ? 'text-foreground line-through opacity-70'
                              : 'text-foreground'
                          }`}>
                            {item.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tips */}
            <div className="card-base mt-8 bg-orange-light border-l-4 border-l-primary">
              <h3 className="font-semibold text-foreground mb-3">💡 Pro Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Pack light - you can always buy essentials at your destination</li>
                <li>• Roll your clothes instead of folding to save space</li>
                <li>• Keep important documents in a waterproof pouch</li>
                <li>• Carry a small first-aid kit for emergencies</li>
              </ul>
            </div>

            {/* Back Button */}
            <div className="flex justify-center mt-8">
              <button 
                onClick={() => navigate('/trip-plan')}
                className="btn-secondary flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Trip Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Packing;
