
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BellRing, Calendar, Check, List, Pill, Plus } from 'lucide-react';

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="flex-1 py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-secondary/20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Manage Your Medications with Ease
                </h1>
                <p className="subheadline max-w-[600px] text-muted-foreground md:text-xl">
                  Never miss a dose again with our simple, secure medication management app. Track your medications, get reminders, and share with caregivers.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/auth">
                  <Button size="lg" className="card-hover">
                    Get Started
                  </Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="card-hover">
                    Explore Dashboard
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mx-auto flex w-full max-w-[400px] items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                alt="Medication Management App"
                className="aspect-video overflow-hidden rounded-xl object-cover object-center shadow-xl glassmorphism"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
        <div className="container space-y-12 px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="pill-badge mb-3">Features</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our medication management app is designed to make medication adherence simple and stress-free.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Link to="/dashboard" className="group">
              <div className="relative overflow-hidden rounded-lg border bg-background p-6 shadow transition-shadow hover:shadow-lg card-hover">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                  <List className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary">Dashboard</h3>
                <p className="mt-2 text-muted-foreground">
                  Get an overview of your medications, upcoming doses, and adherence statistics.
                </p>
              </div>
            </Link>
            
            <Link to="/add-medication" className="group">
              <div className="relative overflow-hidden rounded-lg border bg-background p-6 shadow transition-shadow hover:shadow-lg card-hover">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                  <Plus className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary">Add Medications</h3>
                <p className="mt-2 text-muted-foreground">
                  Easily add and manage your medication regimen with dosage and schedule information.
                </p>
              </div>
            </Link>
            
            <Link to="/medication-tracker" className="group">
              <div className="relative overflow-hidden rounded-lg border bg-background p-6 shadow transition-shadow hover:shadow-lg card-hover">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary">Medication Tracker</h3>
                <p className="mt-2 text-muted-foreground">
                  Track your medication history and adherence with detailed logs and reports.
                </p>
              </div>
            </Link>
            
            <Link to="/notifications" className="group">
              <div className="relative overflow-hidden rounded-lg border bg-background p-6 shadow transition-shadow hover:shadow-lg card-hover">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                  <BellRing className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary">Notifications</h3>
                <p className="mt-2 text-muted-foreground">
                  Get timely reminders about your medications and never miss a dose.
                </p>
              </div>
            </Link>
            
            <div className="group">
              <div className="relative overflow-hidden rounded-lg border bg-background p-6 shadow transition-shadow hover:shadow-lg card-hover">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                  <Pill className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary">Medication Library</h3>
                <p className="mt-2 text-muted-foreground">
                  Access a comprehensive library of medications with information about dosages and side effects.
                </p>
              </div>
            </div>
            
            <div className="group">
              <div className="relative overflow-hidden rounded-lg border bg-background p-6 shadow transition-shadow hover:shadow-lg card-hover">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary mb-3">
                  <Calendar className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold group-hover:text-primary">Calendar View</h3>
                <p className="mt-2 text-muted-foreground">
                  View your medication schedule in a convenient calendar format for better planning.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/5">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Simplify Your Medication Management?</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              Join thousands of users who have made managing their medications easier and safer.
            </p>
          </div>
          <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
            <Link to="/auth">
              <Button size="lg" className="card-hover">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="card-hover">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
