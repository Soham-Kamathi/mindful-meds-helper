
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { CalendarDays, Plus, ListTodo, Clock, Calendar as CalendarIcon, PieChart } from 'lucide-react';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MedicationCard, { Medication } from "@/components/MedicationCard";
import TimelineView from "@/components/TimelineView";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  
  // Sample medications data
  const [medications, setMedications] = useState<Medication[]>([
    {
      id: '1',
      name: 'Amoxicillin',
      dosage: '500mg',
      frequency: 'Twice daily',
      time: '08:00',
      startDate: '2023-05-01',
      endDate: '2023-05-14',
      instructions: 'Take with food to reduce stomach upset',
      color: 'blue',
      taken: false
    },
    {
      id: '2',
      name: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      time: '08:00',
      startDate: '2023-04-15',
      instructions: 'Take in the morning',
      color: 'green',
      taken: false
    },
    {
      id: '3',
      name: 'Vitamin D',
      dosage: '1000 IU',
      frequency: 'Once daily',
      time: '12:30',
      startDate: '2023-01-10',
      instructions: 'Take with a meal',
      color: 'yellow',
      taken: false
    },
    {
      id: '4',
      name: 'Atorvastatin',
      dosage: '20mg',
      frequency: 'Once daily',
      time: '20:00',
      startDate: '2023-03-22',
      instructions: 'Take in the evening',
      color: 'purple',
      taken: false
    },
    {
      id: '5',
      name: 'Aspirin',
      dosage: '81mg',
      frequency: 'Once daily',
      time: '20:00',
      startDate: '2023-02-05',
      color: 'red',
      taken: false
    }
  ]);
  
  const handleMarkAsTaken = (id: string) => {
    setMedications(prevMeds => 
      prevMeds.map(med => 
        med.id === id ? { ...med, taken: true } : med
      )
    );
    
    toast({
      title: "Medication marked as taken",
      description: "Great job staying on track with your medication!",
    });
  };
  
  const handleDeleteMedication = (id: string) => {
    setMedications(prevMeds => prevMeds.filter(med => med.id !== id));
    
    toast({
      title: "Medication deleted",
      description: "The medication has been removed from your list.",
    });
  };
  
  const handleEditMedication = (id: string) => {
    navigate(`/add-medication?edit=${id}`);
  };
  
  // Stats data
  const stats = [
    { name: 'Adherence Rate', value: '92%', icon: <PieChart className="h-5 w-5 text-green-500" /> },
    { name: 'Active Medications', value: medications.length.toString(), icon: <ListTodo className="h-5 w-5 text-blue-500" /> },
    { name: 'Today\'s Doses', value: '3/5', icon: <Clock className="h-5 w-5 text-purple-500" /> },
  ];
  
  // Get medications for today
  const todayMedications = medications.filter(med => {
    // In a real app, we would check if the medication should be taken on the selected day
    // based on start date, end date, and frequency
    return true;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          <header className="mb-8">
            <h1 className="text-3xl font-bold">Your Medication Dashboard</h1>
            <p className="text-muted-foreground">Track and manage your medications</p>
          </header>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {stats.map((stat, i) => (
              <Card key={i} className="border-none shadow-sm">
                <CardContent className="p-6 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.name}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {stat.icon}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Quick Actions */}
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Medication Overview</h2>
            <Button onClick={() => navigate('/add-medication')}>
              <Plus className="h-4 w-4 mr-2" />
              Add New Medication
            </Button>
          </div>
          
          {/* Main Content */}
          <Tabs defaultValue="timeline" className="mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="timeline" className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                Timeline View
              </TabsTrigger>
              <TabsTrigger value="grid" className="flex items-center">
                <ListTodo className="h-4 w-4 mr-2" />
                Grid View
              </TabsTrigger>
              <TabsTrigger value="calendar" className="flex items-center">
                <CalendarDays className="h-4 w-4 mr-2" />
                Calendar
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="timeline">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  Showing medications for {selectedDay.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm border overflow-hidden">
                <TimelineView 
                  medications={todayMedications} 
                  onMarkAsTaken={handleMarkAsTaken} 
                />
              </div>
            </TabsContent>
            
            <TabsContent value="grid">
              <div className="mb-4">
                <p className="text-sm text-muted-foreground">
                  Showing all your active medications
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {medications.map(medication => (
                  <MedicationCard 
                    key={medication.id} 
                    medication={medication}
                    onEdit={handleEditMedication}
                    onDelete={handleDeleteMedication}
                    onMarkAsTaken={handleMarkAsTaken}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="calendar">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <Card className="lg:col-span-4 border-none shadow-sm">
                  <CardHeader>
                    <div className="flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
                      <h3 className="font-medium">Select Date</h3>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Calendar
                      mode="single"
                      selected={selectedDay}
                      onSelect={(date) => date && setSelectedDay(date)}
                      className="rounded-md border"
                    />
                  </CardContent>
                </Card>
                
                <div className="lg:col-span-8">
                  <Card className="h-full border-none shadow-sm">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <ListTodo className="h-5 w-5 mr-2 text-primary" />
                          <h3 className="font-medium">
                            Medications for {selectedDay.toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </h3>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {todayMedications.length > 0 ? (
                          todayMedications.map(medication => (
                            <MedicationCard
                              key={medication.id}
                              medication={medication}
                              compact={true}
                              onMarkAsTaken={handleMarkAsTaken}
                            />
                          ))
                        ) : (
                          <div className="text-center py-12">
                            <p className="text-muted-foreground">No medications scheduled for this day</p>
                            <Button 
                              variant="outline" 
                              className="mt-4"
                              onClick={() => navigate('/add-medication')}
                            >
                              Add Medication
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Upcoming Doses */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Today's Upcoming Doses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {medications
                .filter(med => !med.taken)
                .slice(0, 4)
                .map(medication => (
                  <MedicationCard
                    key={medication.id}
                    medication={medication}
                    compact={true}
                    onMarkAsTaken={handleMarkAsTaken}
                  />
                ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
