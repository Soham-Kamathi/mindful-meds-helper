
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock } from 'lucide-react';
import { Medication } from '@/components/MedicationCard';

export interface TimelineEvent {
  time: string;
  title: string;
  description: string;
  status: 'taken' | 'missed' | 'skipped';
}

interface TimelineViewProps {
  events?: TimelineEvent[];
  medications?: Medication[];
  onMarkAsTaken?: (id: string) => void;
}

interface TimeSlot {
  time: string;
  medications: Medication[];
}

const TimelineView = ({ medications = [], events = [], onMarkAsTaken }: TimelineViewProps) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    // Group medications by time
    const groupedByTime: Record<string, Medication[]> = {};
    
    medications.forEach(med => {
      if (!groupedByTime[med.time]) {
        groupedByTime[med.time] = [];
      }
      groupedByTime[med.time].push(med);
    });
    
    // Sort times and create time slots
    const sortedTimeSlots = Object.keys(groupedByTime)
      .sort((a, b) => {
        const timeA = new Date(`1970/01/01 ${a}`);
        const timeB = new Date(`1970/01/01 ${b}`);
        return timeA.getTime() - timeB.getTime();
      })
      .map(time => ({
        time,
        medications: groupedByTime[time],
      }));
      
    setTimeSlots(sortedTimeSlots);
    
    // Set current time
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setCurrentTime(`${hours}:${minutes}`);
    
    // Update current time every minute
    const intervalId = setInterval(() => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    }, 60000);
    
    return () => clearInterval(intervalId);
  }, [medications]);
  
  const isTimeSlotPast = (time: string) => {
    const slotTime = new Date(`1970/01/01 ${time}`);
    const current = new Date(`1970/01/01 ${currentTime}`);
    return slotTime < current;
  };
  
  const isTimeSlotCurrent = (time: string) => {
    const [slotHours, slotMinutes] = time.split(':').map(Number);
    const [currentHours, currentMinutes] = currentTime.split(':').map(Number);
    
    // Check if we're within 30 minutes of the time slot
    if (slotHours === currentHours) {
      return Math.abs(slotMinutes - currentMinutes) <= 30;
    } else if (slotHours === currentHours + 1) {
      return slotMinutes + (60 - currentMinutes) <= 30;
    } else if (slotHours + 1 === currentHours) {
      return currentMinutes + (60 - slotMinutes) <= 30;
    }
    
    return false;
  };
  
  const handleMarkAsTaken = (id: string) => {
    if (onMarkAsTaken) {
      onMarkAsTaken(id);
    }
  };
  
  // Render events timeline if events are provided
  if (events.length > 0) {
    return (
      <div className="space-y-8 relative">
        {/* Timeline line */}
        <div className="absolute top-0 bottom-0 left-4 w-[1px] bg-border"></div>
        
        {events.map((event, index) => (
          <div key={index} className="relative pl-12">
            {/* Time indicator */}
            <div className={cn(
              "absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center",
              event.status === 'taken' ? "bg-green-100" : 
              event.status === 'missed' ? "bg-red-100" : "bg-amber-100"
            )}>
              <Clock className={cn(
                "h-4 w-4",
                event.status === 'taken' ? "text-green-600" : 
                event.status === 'missed' ? "text-red-600" : "text-amber-600"
              )} />
            </div>
            
            {/* Event content */}
            <div>
              <div className="flex items-center mb-3">
                <h3 className="text-lg font-medium">{event.time}</h3>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h4 className="font-medium">{event.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  // Render medication timeline if no events but medications
  if (medications.length === 0) {
    return (
      <div className="p-6 text-center border border-dashed rounded-lg">
        <p className="text-muted-foreground">No medications scheduled for today</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-8 relative">
      {/* Timeline line */}
      <div className="absolute top-0 bottom-0 left-4 w-[1px] bg-border"></div>
      
      {timeSlots.map((slot, index) => (
        <div key={index} className="relative pl-12">
          {/* Time indicator */}
          <div className={cn(
            "absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center",
            isTimeSlotPast(slot.time) ? "bg-muted" : "bg-primary/10"
          )}>
            <Clock className={cn(
              "h-4 w-4",
              isTimeSlotPast(slot.time) ? "text-muted-foreground" : "text-primary"
            )} />
          </div>
          
          {/* Time slot content */}
          <div>
            <div className="flex items-center mb-3">
              <h3 className={cn(
                "text-lg font-medium",
                isTimeSlotCurrent(slot.time) && "text-primary"
              )}>
                {slot.time}
              </h3>
              {isTimeSlotCurrent(slot.time) && (
                <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full">
                  Current
                </span>
              )}
            </div>
            
            <div className="space-y-3">
              {slot.medications.map(med => (
                <div 
                  key={med.id}
                  className={cn(
                    "p-4 border rounded-lg transition-all",
                    med.taken ? "bg-muted/50" : "bg-card hover:shadow-md"
                  )}
                >
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">{med.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {med.dosage} • {med.frequency}
                      </p>
                    </div>
                    {med.taken ? (
                      <div className="flex items-center text-green-600">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                    ) : (
                      <button
                        onClick={() => handleMarkAsTaken(med.id)}
                        className="px-3 py-1 text-sm bg-primary/10 text-primary hover:bg-primary/20 rounded-full transition-colors"
                      >
                        Take now
                      </button>
                    )}
                  </div>
                  
                  {med.instructions && (
                    <div className="mt-2 p-2 bg-accent rounded-md text-sm">
                      {med.instructions}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineView;
