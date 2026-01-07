import { ArrowRight, MapPin, Calendar, Users, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-light via-background to-background" />
        <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        
        <div className="container-base section-padding relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <span className="inline-block px-4 py-2 rounded-full bg-orange-light text-primary text-sm font-medium mb-6">
                ✨ Your journey starts here
              </span>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Don't know where to travel?{' '}
                <span className="text-primary">We'll plan it for you.</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                From your starting point to your dream destinations and back home. 
                Let us craft the perfect circuit trip tailored just for you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/trip-details" className="btn-primary inline-flex items-center justify-center gap-2 text-lg">
                  Start Planning
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="btn-secondary inline-flex items-center justify-center gap-2 text-lg">
                  Learn More
                </button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-12 pt-8 border-t border-border">
                <div>
                  <p className="text-3xl font-bold text-primary">50+</p>
                  <p className="text-sm text-muted-foreground">Destinations</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">10K+</p>
                  <p className="text-sm text-muted-foreground">Trips Planned</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-primary">98%</p>
                  <p className="text-sm text-muted-foreground">Happy Travelers</p>
                </div>
              </div>
            </div>

            {/* Hero Image/Illustration */}
            <div className="hidden lg:block relative animate-fade-in">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-3xl rotate-6 transform" />
                <img 
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600"
                  alt="Travel Adventure"
                  className="relative rounded-3xl shadow-card object-cover w-full h-[500px]"
                />
                
                {/* Floating Card */}
                <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-card animate-bounce-slow">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">Mumbai → Goa</p>
                      <p className="text-sm text-muted-foreground">Next adventure awaits</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="section-padding bg-secondary">
        <div className="container-base">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              How <span className="text-primary">PlanYours</span> Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to your perfect journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: 'Set Your Dates',
                description: 'Tell us when you want to travel and from where you\'ll start your journey.'
              },
              {
                icon: Compass,
                title: 'Choose Destinations',
                description: 'Pick multiple destinations to create your perfect circuit trip.'
              },
              {
                icon: Users,
                title: 'Get Your Plan',
                description: 'Receive a complete itinerary with travel options, stays, and daily activities.'
              }
            ].map((step, index) => (
              <div key={index} className="card-base text-center group">
                <div className="w-16 h-16 rounded-2xl bg-orange-light mx-auto mb-6 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                  <step.icon className="w-8 h-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-base">
          <div className="bg-primary rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-orange-hover opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Plan Your Next Adventure?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Start your journey today and discover the perfect destinations for your next trip.
              </p>
              <Link to="/trip-details" className="inline-flex items-center gap-2 bg-card text-foreground px-8 py-4 rounded-xl font-semibold hover:shadow-hover transition-all duration-300">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="section-padding py-8 border-t border-border">
        <div className="container-base">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-bold">
                <span className="text-primary">Plan</span>
                <span className="text-foreground">Yours</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 PlanYours. Made with ❤️ for travelers.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
