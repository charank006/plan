import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import StepIndicator from "@/components/StepIndicator";
import TravelCard from "@/components/TravelCard";
import ItineraryCard from "@/components/ItineraryCard";
import { useTripContext } from "@/context/TripContext";
import planService from "@/services/plan.service";


const TripPlan = () => {
  const navigate = useNavigate();
  const { tripDetails, selectedDestinations } = useTripContext();

  const [travelOptions, setTravelOptions] = useState<Record<string, any[]>>({});
  const [itinerary, setItinerary] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!tripDetails.startingLocation || selectedDestinations.length === 0) {
      navigate("/trip-details");
      return;
    }

    const fetchPlan = async () => {
      setLoading(true);
      setError(null);

      try {
        const start = new Date(tripDetails.startDate);
        const end = new Date(tripDetails.endDate);
        const days = Math.ceil(
          (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
        );

        const payload = {
          startDate: tripDetails.startDate,
          days,
          people: tripDetails.numberOfPeople,
          budget: tripDetails.budgetRange,
          startingLocation: tripDetails.startingLocation,
          destinations: selectedDestinations.map((d) => d.name),
        };

        console.log("Calling backend with payload:", payload);

        const data = await planService.generatePlan(payload);

        console.log("Backend response:", data);


        setTravelOptions(data.travelOptions || {});
        setItinerary(data.itinerary || []);
      } catch (err) {
        console.error("Backend error:", err);
        setError("Failed to generate plan");
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [tripDetails, selectedDestinations, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="section-padding">
        <div className="container-base">
          <StepIndicator currentStep={3} />

          <h1 className="text-3xl font-bold mb-6">Your Trip Plan</h1>

          {loading && <p>Loading plan...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {/* Travel Options */}
          {Object.keys(travelOptions).length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-4">Travel Options</h2>

              {Object.entries(travelOptions).map(([route, options]) => (
                <div key={route} className="mb-6">
                  <h3 className="font-medium mb-2">{route}</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {options.map((option, index) => (
                      <TravelCard key={index} option={option} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Itinerary */}
          {itinerary.length > 0 && (
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-4">Day-wise Itinerary</h2>
              <div className="space-y-4">
                {itinerary.map((day, index) => (
                  <ItineraryCard key={index} {...day} />
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between mt-10">
            <button
              onClick={() => navigate("/destinations")}
              className="btn-secondary flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>

            <Link
              to="/packing"
              className="btn-primary flex items-center gap-2"
            >
              Packing List
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripPlan;
