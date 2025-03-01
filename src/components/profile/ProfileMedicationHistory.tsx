
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Calendar } from "lucide-react";

// Sample medication history data
const recentMedications = [
  { id: '1', name: 'Lisinopril', dosage: '10mg', date: '2023-10-01', time: '08:00', status: 'taken' },
  { id: '2', name: 'Atorvastatin', dosage: '20mg', date: '2023-10-01', time: '20:00', status: 'taken' },
  { id: '3', name: 'Metformin', dosage: '500mg', date: '2023-10-01', time: '12:00', status: 'missed' },
  { id: '4', name: 'Lisinopril', dosage: '10mg', date: '2023-09-30', time: '08:00', status: 'taken' },
  { id: '5', name: 'Atorvastatin', dosage: '20mg', date: '2023-09-30', time: '20:00', status: 'taken' },
];

type MedicationStatus = 'taken' | 'missed' | 'skipped';

export const ProfileMedicationHistory = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medication History</CardTitle>
        <CardDescription>
          Review your medication history and adherence.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="recent">
          <TabsList className="mb-4">
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="monthly">Monthly Report</TabsTrigger>
          </TabsList>
          
          <TabsContent value="recent">
            <div className="space-y-4">
              {recentMedications.map((med) => (
                <div 
                  key={med.id} 
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex items-center gap-3">
                    <StatusIcon status={med.status as MedicationStatus} />
                    <div>
                      <h4 className="font-medium">{med.name} {med.dosage}</h4>
                      <p className="text-sm text-muted-foreground">
                        {new Date(med.date).toLocaleDateString()} at {med.time}
                      </p>
                    </div>
                  </div>
                  <span className={`text-sm font-medium ${getStatusColor(med.status as MedicationStatus)}`}>
                    {capitalizeFirstLetter(med.status)}
                  </span>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="monthly">
            <div className="flex items-center justify-center rounded-lg border border-dashed p-8">
              <div className="flex flex-col items-center text-center gap-2">
                <Calendar className="h-8 w-8 text-muted-foreground" />
                <h3 className="font-medium">Monthly Reports</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Detailed monthly medication adherence reports will be available soon. 
                  Check back later for insights into your medication routine.
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

const StatusIcon = ({ status }: { status: MedicationStatus }) => {
  switch (status) {
    case 'taken':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'missed':
      return <XCircle className="h-5 w-5 text-red-500" />;
    case 'skipped':
      return <Calendar className="h-5 w-5 text-amber-500" />;
    default:
      return null;
  }
};

const getStatusColor = (status: MedicationStatus): string => {
  switch (status) {
    case 'taken':
      return 'text-green-500';
    case 'missed':
      return 'text-red-500';
    case 'skipped':
      return 'text-amber-500';
    default:
      return '';
  }
};

const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
