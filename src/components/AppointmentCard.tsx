
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface AppointmentCardProps {
  id: string;
  serviceName: string;
  providerName: string;
  providerImage: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  location: string;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  id,
  serviceName,
  providerName,
  providerImage,
  date,
  time,
  status,
  location,
}) => {
  const statusColors = {
    upcoming: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
  };

  const statusText = {
    upcoming: 'আসন্ন',
    completed: 'সম্পন্ন',
    cancelled: 'বাতিল',
  };

  return (
    <Card className="border appointment-card transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full overflow-hidden">
            <img
              src={providerImage}
              alt={providerName}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{serviceName}</h3>
            <p className="text-sm text-muted-foreground">{providerName}</p>
          </div>
          <Badge className={statusColors[status]}>
            {statusText[status]}
          </Badge>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;
