
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, Trash2, Edit, Save } from "lucide-react";

const medicalInfoSchema = z.object({
  height: z.string().optional(),
  weight: z.string().optional(),
  bloodType: z.string().optional(),
  allergies: z.string().optional(),
  emergencyContact: z.string().optional(),
  emergencyPhone: z.string().optional(),
  additionalInfo: z.string().optional(),
});

type MedicalInfoValues = z.infer<typeof medicalInfoSchema>;

const medicalHistorySchema = z.object({
  condition: z.string().min(1, { message: "Condition is required" }),
  diagnosisDate: z.string().optional(),
  treatment: z.string().optional(),
  notes: z.string().optional(),
});

type MedicalHistoryValues = z.infer<typeof medicalHistorySchema>;

// Sample medical conditions
const initialConditions = [
  { id: '1', condition: 'Hypertension', diagnosisDate: '2018-05-15', treatment: 'Lisinopril 10mg', notes: 'Well controlled with medication' },
  { id: '2', condition: 'High Cholesterol', diagnosisDate: '2019-02-10', treatment: 'Atorvastatin 20mg', notes: 'Annual blood tests required' },
];

export const ProfileMedicalInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showAddCondition, setShowAddCondition] = useState(false);
  const [conditions, setConditions] = useState(initialConditions);
  
  // Medical info form
  const medicalInfoForm = useForm<MedicalInfoValues>({
    resolver: zodResolver(medicalInfoSchema),
    defaultValues: {
      height: "5'8\"",
      weight: "160 lbs",
      bloodType: "O+",
      allergies: "Penicillin",
      emergencyContact: "John Smith",
      emergencyPhone: "(555) 987-6543",
      additionalInfo: "",
    },
  });
  
  // Add condition form
  const conditionForm = useForm<MedicalHistoryValues>({
    resolver: zodResolver(medicalHistorySchema),
    defaultValues: {
      condition: "",
      diagnosisDate: "",
      treatment: "",
      notes: "",
    },
  });
  
  const onMedicalInfoSubmit = (data: MedicalInfoValues) => {
    console.log("Medical info submitted:", data);
    setIsEditing(false);
  };
  
  const onAddCondition = (data: MedicalHistoryValues) => {
    console.log("Condition added:", data);
    setConditions([
      ...conditions,
      {
        id: Date.now().toString(),
        ...data,
      },
    ]);
    setShowAddCondition(false);
    conditionForm.reset();
  };
  
  const deleteCondition = (id: string) => {
    setConditions(conditions.filter(condition => condition.id !== id));
  };
  
  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Medical Information</CardTitle>
            <CardDescription>
              Your personal health information and vitals.
            </CardDescription>
          </div>
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
          </Button>
        </CardHeader>
        <CardContent>
          <Form {...medicalInfoForm}>
            <form onSubmit={medicalInfoForm.handleSubmit(onMedicalInfoSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <FormField
                  control={medicalInfoForm.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={medicalInfoForm.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={medicalInfoForm.control}
                  name="bloodType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Blood Type</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={medicalInfoForm.control}
                name="allergies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allergies</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormDescription>
                      List any allergies to medications, foods, or other substances.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid md:grid-cols-2 gap-6">
                <FormField
                  control={medicalInfoForm.control}
                  name="emergencyContact"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={medicalInfoForm.control}
                  name="emergencyPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Emergency Contact Phone</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={!isEditing} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={medicalInfoForm.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Information</FormLabel>
                    <FormControl>
                      <Textarea {...field} disabled={!isEditing} />
                    </FormControl>
                    <FormDescription>
                      Any other health information that healthcare providers should know.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {isEditing && (
                <div className="flex justify-end">
                  <Button type="submit">Save Changes</Button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Medical Conditions</CardTitle>
            <CardDescription>
              Your medical history and ongoing conditions.
            </CardDescription>
          </div>
          <Button 
            variant="outline"
            onClick={() => setShowAddCondition(!showAddCondition)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Condition
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {showAddCondition && (
            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-lg">Add New Condition</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...conditionForm}>
                  <form onSubmit={conditionForm.handleSubmit(onAddCondition)} className="space-y-4">
                    <FormField
                      control={conditionForm.control}
                      name="condition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Condition/Diagnosis</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter medical condition" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={conditionForm.control}
                        name="diagnosisDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Date of Diagnosis</FormLabel>
                            <FormControl>
                              <Input type="date" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={conditionForm.control}
                        name="treatment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Treatment/Medication</FormLabel>
                            <FormControl>
                              <Input placeholder="Current treatment" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={conditionForm.control}
                      name="notes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Notes</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Additional notes" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end space-x-2">
                      <Button 
                        variant="outline" 
                        type="button"
                        onClick={() => setShowAddCondition(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Add Condition</Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
          
          {conditions.length > 0 ? (
            <div className="space-y-4">
              {conditions.map((condition, index) => (
                <React.Fragment key={condition.id}>
                  {index > 0 && <Separator />}
                  <div className="pt-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-lg">{condition.condition}</h3>
                        {condition.diagnosisDate && (
                          <p className="text-sm text-muted-foreground">
                            Diagnosed: {new Date(condition.diagnosisDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => deleteCondition(condition.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                    
                    {condition.treatment && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">Treatment:</p>
                        <p className="text-sm">{condition.treatment}</p>
                      </div>
                    )}
                    
                    {condition.notes && (
                      <div className="mt-2">
                        <p className="text-sm font-medium">Notes:</p>
                        <p className="text-sm">{condition.notes}</p>
                      </div>
                    )}
                  </div>
                </React.Fragment>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center p-6 border border-dashed rounded-lg">
              <p className="text-muted-foreground">No medical conditions added yet.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
};
