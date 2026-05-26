export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'confirmed' | 'completed';
  coverImage: string;
  totalDays: number;
  travelers: number;
  budget?: string;
}

export interface ItineraryDay {
  id: string;
  dayNumber: number;
  date: string;
  title: string;
  activities: Activity[];
  intensity: 'low' | 'medium' | 'high';
}

export interface Activity {
  id: string;
  time: string;
  period: 'morning' | 'afternoon' | 'evening';
  title: string;
  description: string;
  location: string;
  duration: string;
  type: 'transport' | 'accommodation' | 'attraction' | 'food' | 'experience' | 'free';
  price?: string;
  tips?: string[];
  benefits?: string[];
  miles?: number;
  bookingUrl?: string;
  image?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestions?: string[];
}

export interface Expert {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  bio: string;
  destinations: string[];
  rating: number;
  reviews: number;
  itineraries: number;
  verified: boolean;
  featured?: boolean;
}

export interface Card {
  id: string;
  name: string;
  brand: 'visa' | 'mastercard' | 'amex';
  bank: string;
  lastDigits: string;
  color: string;
  benefits: CardBenefit[];
  milesProgram?: string;
  milesBalance?: number;
}

export interface CardBenefit {
  id: string;
  title: string;
  description: string;
  category: 'lounge' | 'insurance' | 'cashback' | 'miles' | 'concierge' | 'priority';
  active: boolean;
}

export interface MilesProgram {
  id: string;
  name: string;
  logo: string;
  balance: number;
  expiringMiles?: number;
  expirationDate?: string;
}

export interface RouteTemplate {
  id: string;
  title: string;
  description: string;
  destination: string;
  duration: string;
  coverImage: string;
  price: string;
  rating: number;
  reviews: number;
  tags: string[];
  expert?: Expert;
  featured?: boolean;
}

export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  flightNumber: string;
  departure: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  arrival: {
    airport: string;
    city: string;
    time: string;
    date: string;
  };
  duration: string;
  stops: number;
  price: string;
  miles?: number;
  cabinClass: 'economy' | 'premium' | 'business' | 'first';
  benefits?: string[];
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  reviews: number;
  price: string;
  pricePerNight: string;
  amenities: string[];
  stars: number;
  benefits?: string[];
  miles?: number;
}

export interface Experience {
  id: string;
  title: string;
  location: string;
  image: string;
  duration: string;
  price: string;
  rating: number;
  reviews: number;
  category: string;
  description: string;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  cta: string;
}
