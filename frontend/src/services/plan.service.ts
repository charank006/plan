import axios from "axios";
import { TravelOption } from "@/data/mockData";

export interface ItineraryActivity {
  time: string;
  activity: string;
  icon?: string;
}

export interface ItineraryItem {
  day: number;
  date: string;
  location: string;
  isTravel?: boolean;
  travelDetails?: {
    from: string;
    to: string;
    mode?: string;
  };
  activities?: ItineraryActivity[];
}

export interface PlanResponse {
  travelOptions?: Record<string, TravelOption[]>;
  itinerary?: ItineraryItem[];
  [key: string]: any;
}

export interface GeneratePlanPayload {
  startDate: string;
  days: number;
  people: number;
  budget: number;
  startingLocation: string;
  destinations: string[];
}

const planService = {
  generatePlan: async (payload: GeneratePlanPayload): Promise<PlanResponse> => {
    console.log("Inside generatePlan, payload:", payload);

    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/plan`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  },
};

export default planService;
