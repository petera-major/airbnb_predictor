"use client";
import { useEffect, useState } from "react";
import { Card } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, MapPin, DollarSign, Users } from "lucide-react";

const priceData = [
  { month: "Jan", price: 120, bookings: 45 },
  { month: "Feb", price: 115, bookings: 42 },
  { month: "Mar", price: 135, bookings: 52 },
  { month: "Apr", price: 145, bookings: 58 },
  { month: "May", price: 160, bookings: 65 },
  { month: "Jun", price: 180, bookings: 72 },
  { month: "Jul", price: 195, bookings: 78 },
  { month: "Aug", price: 190, bookings: 75 },
];

const locationData = [
  { location: "New York", avgPrice: 185 },
  { location: "Paris", avgPrice: 165 },
  { location: "Tokyo", avgPrice: 145 },
  { location: "London", avgPrice: 175 },
  { location: "Barcelona", avgPrice: 125 },
  { location: "Rome", avgPrice: 135 },
];

const propertyTypeData = [
  { name: "Apartment", value: 45, color: "#8b5cf6" },
  { name: "House", value: 25, color: "#ec4899" },
  { name: "Villa", value: 15, color: "#06b6d4" },
  { name: "Studio", value: 10, color: "#f59e0b" },
  { name: "Other", value: 5, color: "#10b981" },
];

export function MarketInsights() {
  const [insights, setInsights] = useState({
    avg_price: 160,
    market_growth: 10.5,
    active_listings: 23000,
    avg_occupancy: 68,
  });
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // ⏳ Simulate live updates every few seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setInsights({
        avg_price: 150 + Math.floor(Math.random() * 40),
        market_growth: 9 + Math.random() * 5,
        active_listings: 22000 + Math.floor(Math.random() * 4000),
        avg_occupancy: 60 + Math.random() * 10,
      });
      setLastUpdated(new Date());
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-6">
      {/* ---- TOP CARD ---- */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 shadow-lg transition-all duration-500">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-purple-700">Market Insights</h2>
          {lastUpdated && (
            <p className="text-xs text-gray-500 italic">
              Last updated{" "}
              {Math.floor((Date.now() - lastUpdated.getTime()) / 1000)}s ago
            </p>
          )}
        </div>

        <p className="text-gray-500 mb-6">
          Real-time market trends and analytics
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center">
            <DollarSign className="w-5 h-5 text-purple-600" />
            <p className="text-sm text-gray-500 mt-1">Avg Nightly Price</p>
            <p className="text-xl font-bold text-gray-800">
              ${insights.avg_price}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <p className="text-sm text-gray-500 mt-1">Market Growth</p>
            <p className="text-xl font-bold text-green-600">
              +{insights.market_growth.toFixed(1)}%
            </p>
          </div>

          <div className="flex flex-col items-center">
            <MapPin className="w-5 h-5 text-blue-600" />
            <p className="text-sm text-gray-500 mt-1">Active Listings</p>
            <p className="text-xl font-bold text-blue-600">
              {insights.active_listings.toLocaleString()}
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Users className="w-5 h-5 text-orange-500" />
            <p className="text-sm text-gray-500 mt-1">Avg Occupancy</p>
            <p className="text-xl font-bold text-orange-500">
              {insights.avg_occupancy.toFixed(1)}%
            </p>
          </div>
        </div>
      </Card>

      {/* ---- CHARTS SECTION ---- */}
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="trends">Price Trends</TabsTrigger>
            <TabsTrigger value="locations">Top Locations</TabsTrigger>
            <TabsTrigger value="types">Property Types</TabsTrigger>
          </TabsList>

          {/* PRICE TRENDS */}
          <TabsContent value="trends" className="space-y-4">
            <h3 className="text-xl mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Market Price Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="month" stroke="#6366f1" />
                <YAxis stroke="#6366f1" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f0f9ff",
                    border: "2px solid #3b82f6",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  name="Avg Price ($)"
                  dot={{ fill: "#8b5cf6", r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="bookings"
                  stroke="#ec4899"
                  strokeWidth={3}
                  name="Bookings"
                  dot={{ fill: "#ec4899", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>

          {/* LOCATIONS */}
          <TabsContent value="locations" className="space-y-4">
            <h3 className="text-xl mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Average Prices by Location
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={locationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="location" stroke="#6366f1" />
                <YAxis stroke="#6366f1" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f0f9ff",
                    border: "2px solid #3b82f6",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Bar
                  dataKey="avgPrice"
                  fill="url(#colorGradient)"
                  name="Avg Price ($)"
                  radius={[8, 8, 0, 0]}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>

          {/* PROPERTY TYPES */}
          <TabsContent value="types" className="space-y-4">
            <h3 className="text-xl mb-4">Property Type Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={propertyTypeData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(props) => {
                    const { name, percent } = props as {
                      name?: string;
                      percent?: number;
                    };
                    return `${name ?? ""} ${((percent ?? 0) * 100).toFixed(0)}%`;
                  }}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {propertyTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#f0f9ff",
                    border: "2px solid #3b82f6",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
