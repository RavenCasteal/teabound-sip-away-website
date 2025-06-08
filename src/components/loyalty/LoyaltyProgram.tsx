import React, { useState, useEffect } from 'react';

interface LoyaltyPoints {
  current: number;
  total: number;
  history: {
    date: string;
    points: number;
    description: string;
  }[];
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  nextTierPoints: number;
}

interface LoyaltyProgramProps {
  userId: string;
}

export const LoyaltyProgram: React.FC<LoyaltyProgramProps> = ({ userId }) => {
  const [points, setPoints] = useState<LoyaltyPoints | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoyaltyPoints = async () => {
      try {
        setLoading(true);
        // Implement your loyalty points fetch logic here
        // Example: const data = await getLoyaltyPoints(userId);
        // setPoints(data);
      } catch (error) {
        console.error('Failed to fetch loyalty points:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoyaltyPoints();
  }, [userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!points) {
    return null;
  }

  const getTierColor = (tier: LoyaltyPoints['tier']) => {
    switch (tier) {
      case 'bronze':
        return 'bg-amber-600';
      case 'silver':
        return 'bg-gray-400';
      case 'gold':
        return 'bg-yellow-400';
      case 'platinum':
        return 'bg-blue-400';
      default:
        return 'bg-gray-200';
    }
  };

  const getTierBenefits = (tier: LoyaltyPoints['tier']) => {
    switch (tier) {
      case 'bronze':
        return ['5% off on all orders', 'Free birthday drink'];
      case 'silver':
        return ['10% off on all orders', 'Free birthday drink', 'Priority customer service'];
      case 'gold':
        return ['15% off on all orders', 'Free birthday drink', 'Priority customer service', 'Exclusive events access'];
      case 'platinum':
        return ['20% off on all orders', 'Free birthday drink', 'Priority customer service', 'Exclusive events access', 'Free monthly drink'];
      default:
        return [];
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-card rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Loyalty Points</h2>
            <p className="text-muted-foreground">Current Tier: {points.tier}</p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold">{points.current}</p>
            <p className="text-muted-foreground">points</p>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span>Progress to next tier</span>
            <span>{points.nextTierPoints - points.current} points needed</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${getTierColor(points.tier)}`}
              style={{ width: `${(points.current / points.nextTierPoints) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Tier Benefits</h3>
          <ul className="space-y-2">
            {getTierBenefits(points.tier).map((benefit, index) => (
              <li key={index} className="flex items-center">
                <svg
                  className="w-5 h-5 text-primary mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-card rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Points History</h3>
        <div className="space-y-4">
          {points.history.map((entry, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-muted rounded-lg"
            >
              <div>
                <p className="font-medium">{entry.description}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(entry.date).toLocaleDateString()}
                </p>
              </div>
              <span className={`font-semibold ${entry.points > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {entry.points > 0 ? '+' : ''}{entry.points}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}; 