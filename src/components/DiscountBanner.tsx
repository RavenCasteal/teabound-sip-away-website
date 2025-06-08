
import React from 'react';
import { AlertCircle, BadgePercent } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface DiscountProps {
  title: string;
  description: string;
}

const DiscountBanner = ({ title, description }: DiscountProps) => {
  return (
    <Alert className="border-primary/20 bg-primary/5 mb-4">
      <BadgePercent className="h-5 w-5 text-primary" />
      <AlertTitle className="text-primary font-medium">{title}</AlertTitle>
      <AlertDescription>{description}</AlertDescription>
    </Alert>
  );
};

export default DiscountBanner;
