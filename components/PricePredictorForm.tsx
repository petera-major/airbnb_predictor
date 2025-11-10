"use client";
import { useState } from "react";
import { Card } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectItem } from "./ui/select";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Home, Bed, Users, Star, MapPin } from "lucide-react";

interface PropertyData {
  location: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  rating: number;
  amenities: string[];
}

interface PricePredictorFormProps {
  onPredict: (data: PropertyData) => void;
}

export function PricePredictorForm({ onPredict }: PricePredictorFormProps) {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("apartment");
  const [bedrooms, setBedrooms] = useState(1);
  const [bathrooms, setBathrooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const [rating, setRating] = useState([4.5]);
  const [amenities, setAmenities] = useState<string[]>([]);

  const amenitiesList = [
    "WiFi",
    "Kitchen",
    "Pool",
    "Parking",
    "AC",
    "Heating",
    "Washer",
    "TV",
    "Workspace",
    "Gym",
  ];

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location,
          propertyType,
          bedrooms,
          bathrooms,
          guests,
          rating: rating[0],
          amenities,
        }),
      });
  
      const prediction = await res.json();
  
      onPredict({
        location,
        propertyType,
        bedrooms,
        bathrooms,
        guests,
        rating: rating[0],
        amenities,
      });
    } catch (err) {
      console.error("Prediction failed:", err);
    }
  };
  
  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
          <Home className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl">Property Details</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location */}
        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-purple-600" />
            Location
          </Label>
          <Input
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g., New York, Paris, Tokyo"
            required
            className="border-purple-300 focus:border-purple-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="propertyType">Property Type</Label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectItem value="apartment">Apartment</SelectItem>
            <SelectItem value="house">House</SelectItem>
            <SelectItem value="villa">Villa</SelectItem>
            <SelectItem value="studio">Studio</SelectItem>
            <SelectItem value="condo">Condo</SelectItem>
          </Select>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="bedrooms" className="flex items-center gap-1">
              <Bed className="w-4 h-4 text-purple-600" />
              Bedrooms
            </Label>
            <Select
              value={bedrooms.toString()}
              onValueChange={(v) => setBedrooms(Number(v))}
            >
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <SelectItem key={n} value={n.toString()}>
                  {n}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bathrooms">Bathrooms</Label>
            <Select
              value={bathrooms.toString()}
              onValueChange={(v) => setBathrooms(Number(v))}
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <SelectItem key={n} value={n.toString()}>
                  {n}
                </SelectItem>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests" className="flex items-center gap-1">
              <Users className="w-4 h-4 text-purple-600" />
              Guests
            </Label>
            <Select
              value={guests.toString()}
              onValueChange={(v) => setGuests(Number(v))}
            >
              {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((n) => (
                <SelectItem key={n} value={n.toString()}>
                  {n}
                </SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            Expected Rating: {rating[0].toFixed(1)}
          </Label>
          <Slider
            value={rating}
            onValueChange={setRating}
            min={1}
            max={5}
            step={0.1}
            className="py-4"
          />
        </div>

        <div className="space-y-3">
          <Label>Amenities</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {amenitiesList.map((amenity) => (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`px-3 py-2 rounded-lg text-sm transition-all ${
                  amenities.includes(amenity)
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md"
                    : "bg-white border-2 border-purple-200 text-purple-700 hover:border-purple-400"
                }`}
              >
                {amenity}
              </button>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-lg"
        >
          Predict Price
        </Button>
      </form>
    </Card>
  );
}
