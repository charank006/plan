export interface Destination {
  id: string;
  name: string;
  state: string;
  image: string;
  description: string;
  bestSeason: string[];
  avgCostPerDay: number;
  highlights: string[];
  weather: {
    temp: string;
    condition: string;
  };
}

export interface TravelOption {
  id: string;
  type: 'flight' | 'train' | 'bus';
  from: string;
  to: string;
  duration: string;
  price: number;
  departure: string;
  arrival: string;
  bestFor: string;
  operator: string;
}

export interface Stay {
  id: string;
  name: string;
  type: string;
  pricePerNight: number;
  rating: number;
  location: string;
}

export interface PackingItem {
  id: string;
  name: string;
  category: 'clothing' | 'essentials' | 'electronics' | 'documents' | 'health';
  weather: string[];
}

export const destinations: Destination[] = [
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600',
    description: 'Sun-kissed beaches, vibrant nightlife, and Portuguese heritage',
    bestSeason: ['winter', 'autumn'],
    avgCostPerDay: 3500,
    highlights: ['Beaches', 'Nightlife', 'Water Sports', 'Churches'],
    weather: { temp: '28°C', condition: 'Sunny' }
  },
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=600',
    description: 'Snow-capped mountains, adventure sports, and serene valleys',
    bestSeason: ['summer', 'winter'],
    avgCostPerDay: 4000,
    highlights: ['Rohtang Pass', 'Solang Valley', 'Old Manali', 'Trekking'],
    weather: { temp: '15°C', condition: 'Pleasant' }
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    image: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=600',
    description: 'The Pink City with magnificent forts and royal heritage',
    bestSeason: ['winter', 'autumn'],
    avgCostPerDay: 3000,
    highlights: ['Amber Fort', 'Hawa Mahal', 'City Palace', 'Local Bazaars'],
    weather: { temp: '25°C', condition: 'Sunny' }
  },
  {
    id: 'kerala',
    name: 'Kerala',
    state: 'Kerala',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600',
    description: 'Backwaters, tea gardens, and Ayurvedic wellness',
    bestSeason: ['winter', 'monsoon'],
    avgCostPerDay: 4500,
    highlights: ['Backwaters', 'Tea Gardens', 'Beaches', 'Ayurveda'],
    weather: { temp: '30°C', condition: 'Tropical' }
  },
  {
    id: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=600',
    description: 'City of Lakes with romantic palaces and heritage hotels',
    bestSeason: ['winter', 'autumn'],
    avgCostPerDay: 3500,
    highlights: ['Lake Pichola', 'City Palace', 'Jag Mandir', 'Sunset Views'],
    weather: { temp: '26°C', condition: 'Pleasant' }
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    state: 'Ladakh',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600',
    description: 'High-altitude desert with stunning monasteries and landscapes',
    bestSeason: ['summer'],
    avgCostPerDay: 5000,
    highlights: ['Pangong Lake', 'Monasteries', 'Nubra Valley', 'Khardung La'],
    weather: { temp: '12°C', condition: 'Cold' }
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    image: 'https://images.unsplash.com/photo-1600267185393-e158a98703de?w=600',
    description: 'Yoga capital with adventure sports and spiritual vibes',
    bestSeason: ['spring', 'autumn'],
    avgCostPerDay: 2500,
    highlights: ['River Rafting', 'Yoga', 'Temples', 'Bungee Jumping'],
    weather: { temp: '22°C', condition: 'Pleasant' }
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600',
    description: 'Ancient spiritual city on the banks of the Ganges',
    bestSeason: ['winter', 'autumn'],
    avgCostPerDay: 2000,
    highlights: ['Ghats', 'Ganga Aarti', 'Temples', 'Boat Rides'],
    weather: { temp: '24°C', condition: 'Pleasant' }
  }
];

export const generateTravelOptions = (from: string, to: string): TravelOption[] => {
  const baseFlightPrice = Math.floor(Math.random() * 3000) + 3500;
  const baseTrainPrice = Math.floor(Math.random() * 800) + 800;
  const baseBusPrice = Math.floor(Math.random() * 500) + 600;

  return [
    {
      id: `flight-${from}-${to}`,
      type: 'flight',
      from,
      to,
      duration: '2h 15m',
      price: baseFlightPrice,
      departure: '06:30 AM',
      arrival: '08:45 AM',
      bestFor: 'Time-saving',
      operator: 'IndiGo'
    },
    {
      id: `train-${from}-${to}`,
      type: 'train',
      from,
      to,
      duration: '12h 30m',
      price: baseTrainPrice,
      departure: '08:00 PM',
      arrival: '08:30 AM',
      bestFor: 'Budget-friendly',
      operator: 'Rajdhani Express'
    },
    {
      id: `bus-${from}-${to}`,
      type: 'bus',
      from,
      to,
      duration: '14h 00m',
      price: baseBusPrice,
      departure: '07:00 PM',
      arrival: '09:00 AM',
      bestFor: 'Economical',
      operator: 'VRL Travels'
    }
  ];
};

export const stays: Stay[] = [
  { id: '1', name: 'Cozy Heritage Hotel', type: 'Hotel', pricePerNight: 2500, rating: 4.5, location: 'City Center' },
  { id: '2', name: 'Backpacker Hostel', type: 'Hostel', pricePerNight: 800, rating: 4.2, location: 'Near Station' },
  { id: '3', name: 'Luxury Resort', type: 'Resort', pricePerNight: 8000, rating: 4.8, location: 'Beachfront' },
  { id: '4', name: 'Budget Inn', type: 'Guest House', pricePerNight: 1200, rating: 4.0, location: 'Market Area' }
];

export const packingItems: PackingItem[] = [
  { id: '1', name: 'Light cotton clothes', category: 'clothing', weather: ['summer', 'tropical'] },
  { id: '2', name: 'Warm jacket', category: 'clothing', weather: ['winter', 'cold', 'mountains'] },
  { id: '3', name: 'Rain poncho', category: 'clothing', weather: ['monsoon', 'tropical'] },
  { id: '4', name: 'Comfortable walking shoes', category: 'clothing', weather: ['all'] },
  { id: '5', name: 'Sunglasses', category: 'essentials', weather: ['summer', 'beach', 'mountains'] },
  { id: '6', name: 'Sunscreen SPF 50', category: 'essentials', weather: ['summer', 'beach', 'mountains'] },
  { id: '7', name: 'Power bank', category: 'electronics', weather: ['all'] },
  { id: '8', name: 'Camera', category: 'electronics', weather: ['all'] },
  { id: '9', name: 'ID Proof (Aadhar/Passport)', category: 'documents', weather: ['all'] },
  { id: '10', name: 'Travel insurance documents', category: 'documents', weather: ['all'] },
  { id: '11', name: 'First aid kit', category: 'health', weather: ['all'] },
  { id: '12', name: 'Altitude sickness medicine', category: 'health', weather: ['mountains', 'cold'] },
  { id: '13', name: 'Mosquito repellent', category: 'health', weather: ['tropical', 'monsoon'] },
  { id: '14', name: 'Thermal wear', category: 'clothing', weather: ['winter', 'cold', 'mountains'] },
  { id: '15', name: 'Waterproof bag', category: 'essentials', weather: ['monsoon', 'beach'] },
  { id: '16', name: 'Swimwear', category: 'clothing', weather: ['beach', 'summer'] },
];

export const popularCities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow'
];

export const travelTypes = [
  { id: 'solo', label: 'Solo', icon: '🧍' },
  { id: 'couple', label: 'Couple', icon: '💑' },
  { id: 'family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
  { id: 'friends', label: 'Friends', icon: '👯' }
];

export const budgetRanges = [
  { id: 'budget', label: 'Budget', range: '₹5,000 - ₹15,000', min: 5000, max: 15000 },
  { id: 'moderate', label: 'Moderate', range: '₹15,000 - ₹35,000', min: 15000, max: 35000 },
  { id: 'comfort', label: 'Comfort', range: '₹35,000 - ₹60,000', min: 35000, max: 60000 },
  { id: 'luxury', label: 'Luxury', range: '₹60,000+', min: 60000, max: 200000 }
];
