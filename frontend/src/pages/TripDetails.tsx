import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, Wallet, ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import StepIndicator from '@/components/StepIndicator';
import { useTripContext } from '@/context/TripContext';
import { popularCities, travelTypes, budgetRanges } from '@/data/mockData';
import planService from "@/services/plan.service";

const TripDetails = () => {
  const navigate = useNavigate();
  const { tripDetails, setTripDetails, setCurrentStep } = useTripContext();

  const [formData, setFormData] = useState({
    startingLocation: tripDetails.startingLocation || '',
    startDate: tripDetails.startDate || '',
    endDate: tripDetails.endDate || '',
    numberOfPeople: tripDetails.numberOfPeople || 1,
    travelType: tripDetails.travelType || '',
    budgetRange: tripDetails.budgetRange || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.startingLocation) newErrors.startingLocation = 'Please select your starting city';
    if (!formData.startDate) newErrors.startDate = 'Please select start date';
    if (!formData.endDate) newErrors.endDate = 'Please select end date';
    if (!formData.travelType) newErrors.travelType = 'Please select travel type';
    if (!formData.budgetRange) newErrors.budgetRange = 'Please select budget range';

    if (formData.startDate && formData.endDate) {
      if (new Date(formData.endDate) <= new Date(formData.startDate)) {
        newErrors.endDate = 'End date must be after start date';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      console.log("Submitting to backend...");

      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      const payload = {
        startDate: formData.startDate,
        days,
        people: formData.numberOfPeople,
        budget: formData.budgetRange,
        travelType: formData.travelType,
        startingLocation: formData.startingLocation,
      };

      console.log("Payload:", payload);

      const data = await planService.generatePlan(payload);

      console.log("Backend response:", data);

      // Save to context
      setTripDetails({
        ...tripDetails,
        ...formData
      });
      setCurrentStep(2);

      navigate('/destinations', { state: { plan: data } });

    } catch (error) {
      console.error("Error calling backend:", error);
      alert("Backend call failed. Check console.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="section-padding">
        <div className="container-base">
          <StepIndicator currentStep={1} />

          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Tell us about your <span className="text-primary">trip</span>
              </h1>
              <p className="text-muted-foreground">
                Help us understand your travel preferences to find the perfect destinations
              </p>
            </div>

            <div className="space-y-8">

              {/* Starting Location */}
              <div className="card-base">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-light flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Starting Location</h3>
                    <p className="text-sm text-muted-foreground">Where will your journey begin?</p>
                  </div>
                </div>

                <select
                  value={formData.startingLocation}
                  onChange={(e) => handleInputChange('startingLocation', e.target.value)}
                  className={`input-base ${errors.startingLocation ? 'ring-2 ring-destructive' : ''}`}
                >
                  <option value="">Select your city</option>
                  {popularCities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
                {errors.startingLocation && (
                  <p className="text-sm text-destructive mt-2">{errors.startingLocation}</p>
                )}
              </div>

              {/* Travel Dates */}
              <div className="card-base">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-light flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Travel Dates</h3>
                    <p className="text-sm text-muted-foreground">When do you plan to travel?</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Start Date</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => handleInputChange('startDate', e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={`input-base ${errors.startDate ? 'ring-2 ring-destructive' : ''}`}
                    />
                    {errors.startDate && (
                      <p className="text-sm text-destructive mt-2">{errors.startDate}</p>
                    )}
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">End Date</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => handleInputChange('endDate', e.target.value)}
                      min={formData.startDate || new Date().toISOString().split('T')[0]}
                      className={`input-base ${errors.endDate ? 'ring-2 ring-destructive' : ''}`}
                    />
                    {errors.endDate && (
                      <p className="text-sm text-destructive mt-2">{errors.endDate}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Number of People & Travel Type */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="card-base">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-orange-light flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">Travelers</h3>
                  </div>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleInputChange('numberOfPeople', Math.max(1, formData.numberOfPeople - 1))}
                      className="w-10 h-10 rounded-xl bg-secondary text-foreground font-semibold hover:bg-muted transition-colors"
                    >
                      -
                    </button>
                    <span className="text-2xl font-bold text-foreground w-12 text-center">
                      {formData.numberOfPeople}
                    </span>
                    <button
                      onClick={() => handleInputChange('numberOfPeople', Math.min(10, formData.numberOfPeople + 1))}
                      className="w-10 h-10 rounded-xl bg-secondary text-foreground font-semibold hover:bg-muted transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="card-base">
                  <h3 className="font-semibold text-foreground mb-4">Travel Type</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {travelTypes.map(type => (
                      <button
                        key={type.id}
                        onClick={() => handleInputChange('travelType', type.id)}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 ${
                          formData.travelType === type.id
                            ? 'border-primary bg-orange-light'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <span className="text-2xl mb-1 block">{type.icon}</span>
                        <span className="text-sm font-medium text-foreground">{type.label}</span>
                      </button>
                    ))}
                  </div>
                  {errors.travelType && (
                    <p className="text-sm text-destructive mt-2">{errors.travelType}</p>
                  )}
                </div>
              </div>

              {/* Budget Range */}
              <div className="card-base">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-light flex items-center justify-center">
                    <Wallet className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Budget Range</h3>
                    <p className="text-sm text-muted-foreground">Per person, entire trip</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-4 gap-3">
                  {budgetRanges.map(budget => (
                    <button
                      key={budget.id}
                      onClick={() => handleInputChange('budgetRange', budget.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                        formData.budgetRange === budget.id
                          ? 'border-primary bg-orange-light'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <span className="text-sm font-semibold text-foreground block">{budget.label}</span>
                      <span className="text-xs text-muted-foreground">{budget.range}</span>
                    </button>
                  ))}
                </div>
                {errors.budgetRange && (
                  <p className="text-sm text-destructive mt-2">{errors.budgetRange}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-4"
              >
                Find Places
                <ArrowRight className="w-5 h-5" />
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetails;
