import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/ui/navigation";
import CategoryCard from "@/components/CategoryCard";
import { ArrowRight, Search, Shield, Zap, Users, Mic, Music, Megaphone, Headphones } from "lucide-react";
import heroImage from "@/assets/hero-artistly.jpg";
import categoriesData from "@/data/categories.json";

const Index = () => {
  const iconMap = {
    mic: Mic,
    music: Music,
    megaphone: Megaphone,
    headphones: Headphones,
  };

  const features = [
    {
      icon: Search,
      title: "Discover Talent",
      description: "Browse through hundreds of verified performing artists across all categories"
    },
    {
      icon: Shield,
      title: "Secure Booking",
      description: "Safe and secure booking process with verified artist profiles and reviews"
    },
    {
      icon: Zap,
      title: "Quick Response",
      description: "Get quotes and responses from artists within 24 hours of your request"
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "Our team helps match you with the perfect artist for your event"
    }
  ];

  const stats = [
    { number: "500+", label: "Verified Artists" },
    { number: "1,200+", label: "Successful Events" },
    { number: "50+", label: "Cities Covered" },
    { number: "4.9", label: "Average Rating" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${heroImage})` }}
        ></div>
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/90 text-primary hover:bg-white">
              🎭 The Premier Artist Booking Platform
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
              Book Amazing
              <span className="bg-gradient-primary bg-clip-text text-transparent"> Artists </span>
              for Your Events
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Connect with talented performers across all categories. From intimate gatherings to large-scale events, find the perfect artist for your occasion.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8">
                <Link to="/artists">
                  Browse Artists
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button size="lg" variant="outline" asChild className="text-lg px-8">
                <Link to="/onboard">Join as Artist</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore Artist Categories
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Whether you need entertainment for a wedding, corporate event, or private party, we have the perfect artists for you.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoriesData.map((category) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap];
              return (
                <CategoryCard
                  key={category.id}
                  name={category.name}
                  description={category.description}
                  icon={IconComponent}
                  count={category.count}
                  onClick={() => window.location.href = `/artists?category=${category.id}`}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Artistly?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make booking performers simple, secure, and successful for event planners and artists alike.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="h-12 w-12 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-primary text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Book Your Perfect Artist?
              </h2>
              <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
                Join thousands of event planners who trust Artistly to make their events unforgettable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild className="text-lg px-8">
                  <Link to="/artists">Start Browsing</Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
                  <Link to="/onboard">List Your Talent</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
