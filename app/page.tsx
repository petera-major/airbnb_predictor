"use client";
import { useState } from 'react';
import { PricePredictorForm } from '../components/PricePredictorForm';
import { PredictionResult } from '../components/PredictionResult';
import { MarketInsights } from '../components/Marketinsights';
import { Sparkles, BarChart3 } from 'lucide-react';

interface PropertyData {
  location: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  rating: number;
  amenities: string[];
}

interface PredictionData {
  price: number;
  confidence: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  occupancyRate: number;
}

export default function App() {
  const [prediction, setPrediction] = useState<PredictionData | null>(null);

  const calculatePrediction = (data: PropertyData): PredictionData => {
    const locationMultipliers: Record<string, number> = {
      'new york': 1.8,
      'paris': 1.6,
      'tokyo': 1.5,
      'london': 1.7,
      'barcelona': 1.3,
      'rome': 1.4,
      'miami': 1.5,
      'los angeles': 1.6,
      'san francisco': 1.9,
    };

    const propertyMultipliers: Record<string, number> = {
      'apartment': 1.0,
      'house': 1.3,
      'villa': 1.8,
      'studio': 0.8,
      'condo': 1.1,
    };

    const basePrice = 80;
    const locationKey = data.location ? data.location.toLowerCase() : "";
    const locationMultiplier = locationMultipliers[locationKey] || 1.2;
    const propertyMultiplier = propertyMultipliers[data.propertyType] || 1.0;

    let price = basePrice * locationMultiplier * propertyMultiplier;
    
    price += data.bedrooms * 25;
    price += data.bathrooms * 15;
    
    price += data.guests * 10;
    
    price += (data.rating - 3) * 20;
    
    price += data.amenities.length * 8;

    const randomVariation = 0.95 + Math.random() * 0.1;
    price = price * randomVariation;

    const occupancyRate = Math.min(95, 55 + data.rating * 8 + data.amenities.length * 2);
    const daysOccupiedWeekly = (occupancyRate / 100) * 7;
    const daysOccupiedMonthly = (occupancyRate / 100) * 30;
    
    const weeklyRevenue = price * daysOccupiedWeekly;
    const monthlyRevenue = price * daysOccupiedMonthly;
    
    const confidence = Math.min(98, 75 + data.amenities.length + (data.rating - 3) * 5);

    return {
      price: Math.round(price),
      confidence: Math.round(confidence),
      weeklyRevenue: Math.round(weeklyRevenue),
      monthlyRevenue: Math.round(monthlyRevenue),
      occupancyRate: Math.round(occupancyRate),
    };
  };

  const handlePredict = (data: PropertyData) => {
    const result = calculatePrediction(data);
    setPrediction(result);
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b-2 border-purple-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Airbnb Price Predictor
                </h1>
                <p className="text-sm text-gray-600">Smart pricing with AI-powered insights</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full border-2 border-green-300">
              <BarChart3 className="w-5 h-5 text-green-600" />
              <span className="text-green-700">Live Market Data</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column Form */}
          <div>
            <PricePredictorForm onPredict={handlePredict} />
          </div>

          {/* Right Column Results */}
          <div id="results" className="space-y-6">
            {prediction ? (
              <PredictionResult {...prediction} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center p-8 bg-white/50 backdrop-blur-sm rounded-2xl border-2 border-dashed border-purple-300">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mb-4">
                    <Sparkles className="w-10 h-10 text-purple-600" />
                  </div>
                  <h3 className="text-xl text-gray-700 mb-2">Ready to predict?</h3>
                  <p className="text-gray-600">Fill out the form to get your price prediction</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Market Insights */}
        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-3xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Market Insights
            </h2>
            <p className="text-gray-600">Real-time market trends and analytics</p>
          </div>
          <MarketInsights />
        </div>
      </main>

      <footer className="mt-16 py-8 bg-white/80 backdrop-blur-md border-t-2 border-purple-200">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>Built for hosts and property managers</p>
        </div>
      </footer>
    </div>
  );
}
