
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  Plus, 
  Save, 
  Clock, 
  Calendar, 
  ChevronLeft, 
  Pill, 
  AlertCircle, 
  RotateCcw,
  Check
} from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from 'date-fns';
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Medication } from '@/components/MedicationCard';

// Define the form schema
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Medication name must be at least 2 characters.",
  }),
  dosage: z.string().min(1, {
    message: "Dosage is required.",
  }),
  frequency: z.string({
    required_error: "Frequency is required.",
  }),
  time: z.string({
    required_error: "Time is required.",
  }),
  startDate: z.date({
    required_error: "Start date is required.",
  }),
  endDate: z.date().optional(),
  instructions: z.string().optional(),
  color: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AddMedication = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const editId = queryParams.get('edit');
  const [isEditing, setIsEditing] = useState(false);
  
  // Sample medication data for editing (in a real app, this would come from an API or state)
  const [medicationData, setMedicationData] = useState<Medication | null>(null);
  
  // Sample medication data for editing
  const sampleMedications: Medication[] = [
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
    },
  ];
  
  // Initialize the form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      dosage: '',
      frequency: 'Once daily',
      time: '',
      startDate: new Date(),
      instructions: '',
      color: 'blue',
    },
  });
  
  // Fetch medication data if editing
  useEffect(() => {
    if (editId) {
      setIsEditing(true);
      // In a real app, fetch the medication from API
      const medication = sampleMedications.find(m => m.id === editId);
      
      if (medication) {
        setMedicationData(medication);
        
        // Set form values
        form.setValue('name', medication.name);
        form.setValue('dosage', medication.dosage);
        form.setValue('frequency', medication.frequency);
        form.setValue('time', medication.time);
        form.setValue('startDate', new Date(medication.startDate));
        if (medication.endDate) {
          form.setValue('endDate', new Date(medication.endDate));
        }
        if (medication.instructions) {
          form.setValue('instructions', medication.instructions);
        }
        if (medication.color) {
          form.setValue('color', medication.color);
        }
      }
    }
  }, [editId, form]);
  
  // Form submission
  const onSubmit = (values: FormValues) => {
    console.log(values);
    
    // Show success message
    toast({
      title: isEditing ? "Medication updated" : "Medication added",
      description: isEditing 
        ? `${values.name} has been updated successfully.` 
        : `${values.name} has been added to your medications.`,
    });
    
    // Redirect to dashboard
    navigate('/dashboard');
  };
  
  // Reset form
  const handleReset = () => {
    form.reset();
    toast({
      title: "Form reset",
      description: "All fields have been cleared.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Button 
              variant="ghost" 
              className="mb-6" 
              onClick={() => navigate('/dashboard')}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            
            <div className="bg-white shadow-sm rounded-xl p-6 md:p-8 border">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                    <Pill className="h-5 w-5 text-primary" />
                  </div>
                  <h1 className="text-2xl font-bold">
                    {isEditing ? 'Edit Medication' : 'Add New Medication'}
                  </h1>
                </div>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Medication Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter medication name" {...field} />
                          </FormControl>
                          <FormDescription>
                            The name of your medication or supplement.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dosage"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dosage</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 500mg, 10ml" {...field} />
                          </FormControl>
                          <FormDescription>
                            The amount to take each time.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="frequency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Frequency</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Once daily">Once daily</SelectItem>
                              <SelectItem value="Twice daily">Twice daily</SelectItem>
                              <SelectItem value="Three times daily">Three times daily</SelectItem>
                              <SelectItem value="Every other day">Every other day</SelectItem>
                              <SelectItem value="Weekly">Weekly</SelectItem>
                              <SelectItem value="As needed">As needed</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            How often to take this medication.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <div className="relative">
                            <FormControl>
                              <Input 
                                type="time" 
                                {...field} 
                              />
                            </FormControl>
                            <Clock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground pointer-events-none" />
                          </div>
                          <FormDescription>
                            What time to take this medication.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Start Date</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className="w-full pl-3 text-left font-normal"
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            When to start taking this medication.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>End Date (Optional)</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className="w-full pl-3 text-left font-normal"
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <CalendarComponent
                                mode="single"
                                selected={field.value as Date}
                                onSelect={field.onChange}
                                initialFocus
                                disabled={(date) => date < form.getValues('startDate')}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            Leave blank for ongoing medications.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="instructions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Instructions (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="e.g., Take with food, Take before bedtime..."
                            {...field}
                            rows={3}
                          />
                        </FormControl>
                        <FormDescription>
                          Any special instructions for taking this medication.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="color"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Color Tag</FormLabel>
                        <div className="flex space-x-2">
                          {['blue', 'green', 'red', 'yellow', 'purple'].map((color) => (
                            <div 
                              key={color} 
                              className={`
                                w-8 h-8 rounded-full cursor-pointer transition-all
                                ${field.value === color ? 'ring-2 ring-primary ring-offset-2' : ''}
                              `}
                              style={{ backgroundColor: `var(--${color}-300)` }}
                              onClick={() => form.setValue('color', color)}
                            >
                              {field.value === color && (
                                <div className="flex items-center justify-center h-full">
                                  <Check className="h-4 w-4 text-white" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <FormDescription>
                          Choose a color to help identify this medication.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4 border-t flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset
                    </Button>
                    <div className="flex space-x-2">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => navigate('/dashboard')}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        <Save className="h-4 w-4 mr-2" />
                        {isEditing ? 'Update' : 'Save'} Medication
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
            
            <div className="mt-6 p-4 border border-amber-200 bg-amber-50 rounded-lg flex items-start">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-amber-800">Important note</h3>
                <p className="text-sm text-amber-700 mt-1">
                  Always consult with your healthcare provider before making changes to your medication routine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AddMedication;
