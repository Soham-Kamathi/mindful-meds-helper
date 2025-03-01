
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Bell, BellRing, Calendar, Check } from 'lucide-react';
import { toast } from 'sonner';

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  date: string;
  isRead: boolean;
  type: 'reminder' | 'alert' | 'info';
}

const Notifications = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [reminderNotifications, setReminderNotifications] = useState(true);
  const [alertNotifications, setAlertNotifications] = useState(true);
  
  // Sample notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Medication Reminder',
      message: 'Time to take Lisinopril (10mg)',
      time: '08:00 AM',
      date: 'Today',
      isRead: false,
      type: 'reminder'
    },
    {
      id: '2',
      title: 'Medication Alert',
      message: 'You missed your Metformin dose',
      time: '02:30 PM',
      date: 'Yesterday',
      isRead: true,
      type: 'alert'
    },
    {
      id: '3',
      title: 'Refill Required',
      message: 'Your Atorvastatin prescription needs to be refilled (3 days remaining)',
      time: '11:45 AM',
      date: 'Yesterday',
      isRead: true,
      type: 'info'
    },
    {
      id: '4',
      title: 'Medication Reminder',
      message: 'Time to take Metformin (500mg)',
      time: '08:00 PM',
      date: '2 days ago',
      isRead: true,
      type: 'reminder'
    }
  ]);
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
    toast.success("Notification marked as read");
  };
  
  const clearAllNotifications = () => {
    setNotifications([]);
    toast.success("All notifications cleared");
  };
  
  const getNotificationTypeIcon = (type: string) => {
    switch(type) {
      case 'reminder':
        return <Bell className="h-4 w-4" />;
      case 'alert':
        return <BellRing className="h-4 w-4" />;
      case 'info':
        return <Calendar className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };
  
  const getNotificationTypeBadge = (type: string) => {
    switch(type) {
      case 'reminder':
        return <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">Reminder</Badge>;
      case 'alert':
        return <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200">Alert</Badge>;
      case 'info':
        return <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">Info</Badge>;
      default:
        return <Badge variant="outline">Notification</Badge>;
    }
  };
  
  return (
    <div className="page-container">
      <h1 className="headline text-3xl font-bold mb-6">Notifications</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recent Notifications</CardTitle>
                {notifications.length > 0 && (
                  <button 
                    onClick={clearAllNotifications}
                    className="text-sm text-primary hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>
              <CardDescription>
                {notifications.length > 0 
                  ? `You have ${notifications.filter(n => !n.isRead).length} unread notifications`
                  : "No new notifications"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {notifications.length > 0 ? (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-4 rounded-lg transition-colors ${
                        notification.isRead ? 'bg-secondary/50' : 'bg-secondary'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`rounded-full p-1 ${
                            notification.type === 'alert' ? 'bg-red-100 text-red-600' :
                            notification.type === 'info' ? 'bg-green-100 text-green-600' :
                            'bg-blue-100 text-blue-600'
                          }`}>
                            {getNotificationTypeIcon(notification.type)}
                          </span>
                          <h3 className="font-medium">{notification.title}</h3>
                          {getNotificationTypeBadge(notification.type)}
                        </div>
                        {!notification.isRead && (
                          <button 
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 rounded-full text-green-600 hover:bg-green-100"
                            title="Mark as read"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                      <p className="text-muted-foreground mb-2">{notification.message}</p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{notification.time}</span>
                        <span>{notification.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No notifications to display</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="notifications">Enable Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications for your medications
                  </p>
                </div>
                <Switch 
                  id="notifications" 
                  checked={notificationsEnabled}
                  onCheckedChange={(checked) => {
                    setNotificationsEnabled(checked);
                    toast.success(checked ? "Notifications enabled" : "Notifications disabled");
                  }}
                />
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="text-sm font-medium">Notification Types</h3>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reminders">Medication Reminders</Label>
                    <p className="text-sm text-muted-foreground">
                      Get reminded when it's time to take medication
                    </p>
                  </div>
                  <Switch 
                    id="reminders" 
                    checked={reminderNotifications}
                    disabled={!notificationsEnabled}
                    onCheckedChange={setReminderNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="alerts">Missed Dose Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get alerted when you miss a medication dose
                    </p>
                  </div>
                  <Switch 
                    id="alerts" 
                    checked={alertNotifications}
                    disabled={!notificationsEnabled}
                    onCheckedChange={setAlertNotifications}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
