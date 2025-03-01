
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Bell, Shield, UserPlus, Map, Heart, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);
  
  // Animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            entry.target.classList.remove('opacity-0');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.reveal').forEach((el) => {
      el.classList.add('opacity-0');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const features = [
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: 'Smart Medication Reminders',
      description: 'Never miss a dose with intelligent reminders tailored to your medication schedule.',
    },
    {
      icon: <Bell className="h-6 w-6 text-primary" />,
      title: 'Customizable Notifications',
      description: 'Choose how you want to be reminded - push notifications, SMS, or voice alerts.',
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: 'Privacy-First Design',
      description: 'Your health data stays private with advanced encryption and privacy controls.',
    },
    {
      icon: <UserPlus className="h-6 w-6 text-primary" />,
      title: 'Caregiver Connectivity',
      description: 'Connect with family or caregivers who can monitor your medication adherence.',
    },
    {
      icon: <Map className="h-6 w-6 text-primary" />,
      title: 'Pharmacy Locator',
      description: 'Find nearby pharmacies when you need to refill your prescriptions quickly.',
    },
    {
      icon: <Heart className="h-6 w-6 text-primary" />,
      title: 'Health Insights',
      description: 'Track your medication history and identify patterns to improve your health.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-to-b from-blue-50 to-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="headline mb-6">
              Take control of your 
              <span className="relative inline-block px-2">
                <span className="relative z-10">medication</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/20 rounded-sm -z-0"></span>
              </span>
              routine
            </h1>
            <p className="subheadline mb-10">
              A privacy-focused app designed to help you manage your medications, 
              remember to take them on time, and keep your caregivers in the loop.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <Button size="lg" className="text-base px-6 py-6">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base px-6 py-6"
                onClick={scrollToFeatures}
              >
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Hero illustration/mockup */}
          <div className="mt-16 max-w-4xl mx-auto relative">
            <div className="aspect-video bg-gradient-to-tr from-primary/5 to-primary/30 rounded-2xl overflow-hidden p-4 border border-primary/20 shadow-xl">
              <div className="w-full h-full rounded-xl bg-white/60 backdrop-blur-sm border border-white/40 p-6 flex items-center justify-center">
                <div className="w-full max-w-2xl mx-auto">
                  <div className="h-12 bg-primary/10 rounded-lg mb-4 animate-pulse-soft"></div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="h-36 bg-primary/5 rounded-lg animate-pulse-soft delay-75"></div>
                    <div className="h-36 bg-primary/5 rounded-lg animate-pulse-soft delay-100"></div>
                    <div className="h-36 bg-primary/5 rounded-lg animate-pulse-soft delay-150"></div>
                    <div className="h-36 bg-primary/5 rounded-lg animate-pulse-soft delay-200"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-blue-100 rounded-full animate-float opacity-70"></div>
            <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-blue-50 rounded-full animate-float delay-1000 opacity-50"></div>
            <div className="absolute top-1/2 -right-12 w-12 h-12 bg-primary/30 rounded-full animate-float delay-500"></div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section ref={featuresRef} className="py-20 bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center mb-16 reveal">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Features designed for your health
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to manage your medications effectively and with privacy in mind.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={cn(
                  "reveal p-6 rounded-xl border bg-white hover:shadow-lg transition-all duration-500",
                  "transform hover:-translate-y-1"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Privacy Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50 reveal">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your privacy is our priority
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                We believe that your medical information should remain private. 
                That's why MindfulMeds is built with privacy by design.
              </p>
              <ul className="space-y-4">
                {[
                  'End-to-end encryption for all your health data',
                  'No data selling or sharing with third parties',
                  'GDPR & HIPAA compliant privacy practices',
                  'Complete control over your information sharing',
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center mt-1">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 3L4.5 8.5L2 6" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="ml-3">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button>Learn About Our Privacy</Button>
              </div>
            </div>
            
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="relative">
                <div className="w-full aspect-square max-w-md mx-auto bg-white rounded-2xl p-6 shadow-lg border border-primary/10">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-primary/20 rounded-2xl -z-10 blur-2xl transform scale-95 opacity-70"></div>
                  <div className="w-full h-full flex flex-col justify-between">
                    <div className="flex justify-between items-center mb-6">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-primary" />
                      </div>
                      <div className="pill-badge">End-to-End Encrypted</div>
                    </div>
                    
                    <div className="flex-grow flex flex-col justify-center items-center text-center p-6">
                      <div className="w-24 h-24 rounded-full bg-primary/10 mb-6 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                          <Lock className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">Your data belongs to you</h3>
                      <p className="text-muted-foreground">
                        We encrypt your medical information so that only you and those you trust can access it.
                      </p>
                    </div>
                    
                    <div className="mt-6 w-full bg-primary/5 rounded-lg p-4 flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium">GDPR & HIPAA Compliant</p>
                        <p className="text-xs text-muted-foreground">Meeting global privacy standards</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary-50 reveal">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto glassmorphism rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to manage your medications with confidence?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who are taking control of their medication routines and improving their health.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <Button size="lg" className="text-base px-6 py-6">
                Get Started for Free
              </Button>
              <Button variant="outline" size="lg" className="text-base px-6 py-6">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

// Lock icon component
const Lock = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

export default Index;
