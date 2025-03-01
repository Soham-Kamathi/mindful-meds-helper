
import { useState } from 'react';
import { Clock, Copy, Edit, Trash2, CheckCircle2, AlertTriangle, MoreVertical } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  time: string;
  startDate: string;
  endDate?: string;
  instructions?: string;
  color?: string;
  taken?: boolean;
}

interface MedicationCardProps {
  medication: Medication;
  compact?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onMarkAsTaken?: (id: string) => void;
}

const MedicationCard = ({ 
  medication, 
  compact = false,
  onEdit,
  onDelete,
  onMarkAsTaken
}: MedicationCardProps) => {
  const { toast } = useToast();
  const [isTaken, setIsTaken] = useState(medication.taken || false);
  
  const colorMap: Record<string, string> = {
    red: "bg-red-50 border-red-200",
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
    yellow: "bg-yellow-50 border-yellow-200",
    purple: "bg-purple-50 border-purple-200",
    default: "bg-slate-50 border-slate-200"
  };
  
  const colorClasses = medication.color && colorMap[medication.color] 
    ? colorMap[medication.color] 
    : colorMap.default;
    
  const handleMarkAsTaken = () => {
    setIsTaken(true);
    if (onMarkAsTaken) {
      onMarkAsTaken(medication.id);
    }
    toast({
      title: "Medication taken",
      description: `You've marked ${medication.name} as taken.`,
    });
  };
  
  const handleDelete = () => {
    if (onDelete) {
      onDelete(medication.id);
    }
  };
  
  const handleEdit = () => {
    if (onEdit) {
      onEdit(medication.id);
    }
  };
  
  if (compact) {
    return (
      <div className={cn(
        "p-4 rounded-lg border transition-all duration-300 card-hover",
        colorClasses,
        isTaken && "opacity-70"
      )}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium">{medication.name}</h3>
            <p className="text-sm text-muted-foreground">{medication.dosage}</p>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{medication.time}</span>
          </div>
        </div>
        {!isTaken ? (
          <Button
            size="sm"
            variant="outline"
            className="mt-2 w-full"
            onClick={handleMarkAsTaken}
          >
            Mark as Taken
          </Button>
        ) : (
          <div className="mt-2 flex items-center text-green-600 text-sm">
            <CheckCircle2 className="h-4 w-4 mr-1" />
            <span>Taken</span>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 border card-hover",
      colorClasses,
      isTaken && "opacity-80"
    )}>
      <CardHeader className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-semibold">{medication.name}</h3>
            <p className="text-sm text-muted-foreground">{medication.dosage}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => {
                  toast({
                    title: "Duplicated",
                    description: `${medication.name} has been duplicated.`,
                  });
                }}
              >
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-destructive focus:text-destructive" 
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-5 pt-0">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Frequency</p>
            <p className="font-medium">{medication.frequency}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Time</p>
            <p className="font-medium">{medication.time}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Start Date</p>
            <p className="font-medium">{medication.startDate}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">End Date</p>
            <p className="font-medium">{medication.endDate || "Ongoing"}</p>
          </div>
        </div>
        
        {medication.instructions && (
          <div className="mt-3 p-3 bg-accent/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Instructions</p>
            <p className="text-sm">{medication.instructions}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-5 pt-0">
        {!isTaken ? (
          <Button
            className="w-full"
            onClick={handleMarkAsTaken}
          >
            <CheckCircle2 className="h-4 w-4 mr-2" />
            Mark as Taken
          </Button>
        ) : (
          <div className="w-full p-2 bg-green-50 text-green-700 rounded-lg flex items-center justify-center">
            <CheckCircle2 className="h-4 w-4 mr-2" />
            <span className="font-medium">Taken</span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default MedicationCard;
