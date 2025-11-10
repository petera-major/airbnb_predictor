import { Card } from './ui/card';
import { DollarSign, TrendingUp, Percent, Calendar } from 'lucide-react';

interface PredictionResultProps {
  price: number;
  confidence: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  occupancyRate: number;
}

export function PredictionResult({ 
  price, 
  confidence, 
  weeklyRevenue, 
  monthlyRevenue,
  occupancyRate 
}: PredictionResultProps) {
  return (
    <div className="space-y-4">
      <Card className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mb-2">
            <DollarSign className="w-8 h-8 text-white" />
          </div>
          <div>
            <p className="text-gray-600 mb-2">Predicted Nightly Price</p>
            <p className="text-5xl bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              ${price.toFixed(0)}
            </p>
          </div>
          <div className="flex items-center justify-center gap-2 text-green-600">
            <TrendingUp className="w-5 h-5" />
            <span className="text-lg">{confidence}% Confidence</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Weekly Revenue</p>
              <p className="text-xl text-blue-700">${weeklyRevenue.toFixed(0)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Monthly Revenue</p>
              <p className="text-xl text-orange-700">${monthlyRevenue.toFixed(0)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 border-2 border-pink-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg">
              <Percent className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Occupancy Rate</p>
              <p className="text-xl text-pink-700">{occupancyRate}%</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
