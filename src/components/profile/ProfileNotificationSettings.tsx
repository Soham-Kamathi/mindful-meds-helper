import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "@/components/ui/label";
import { Bell, AlertCircle, Clock, Calendar, Smartphone, Mail } from "lucide-react";

export const ProfileNotificationSettings = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Manage how and when you receive notifications about your medications.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Notification Types</h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Medication Reminders</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive reminders when it's time to take your medication.
                  </p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Missed Dose Alerts</h4>
                  <p className="text-sm text-muted-foreground">
                    Get notified if you've missed taking a scheduled medication.
                  </p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Refill Reminders</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive alerts when your medications are running low.
                  </p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Appointment Reminders</h4>
                  <p className="text-sm text-muted-foreground">
                    Get notifications about upcoming doctor appointments.
                  </p>
                </div>
              </div>
              <Switch />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Delivery Methods</h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications on your device.
                  </p>
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email.
                  </p>
                </div>
              </div>
              <Switch />
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Reminder Timing</h3>
            <RadioGroup defaultValue="15">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="5" id="r1" />
                <Label htmlFor="r1">5 minutes before</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="15" id="r2" />
                <Label htmlFor="r2">15 minutes before</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="30" id="r3" />
                <Label htmlFor="r3">30 minutes before</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="60" id="r4" />
                <Label htmlFor="r4">1 hour before</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>
    </>
  );
};
