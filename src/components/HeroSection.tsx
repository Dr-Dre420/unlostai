import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Brain, Target, Zap } from "lucide-react";
import heroImage from "@/assets/career-advisor-hero.jpg";

const HeroSection = () => {
  return (
    <div className="relative min-h-screen bg-hero-gradient overflow-hidden">
      {/* Hero Content */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="space-y-8 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                Your AI Career
                <span className="bg-gradient-to-r from-primary-glow to-accent bg-clip-text text-transparent">
                  {" "}Compass
                </span>
              </h1>
              <p className="text-xl text-primary-foreground/90 max-w-xl">
                Navigate India's evolving job market with personalized AI guidance. 
                Map your skills, discover career paths, and prepare for tomorrow's opportunities.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="group"
                onClick={() => {
                  const assessmentElement = document.getElementById('skills-assessment');
                  assessmentElement?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Start Your Assessment
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20"
                onClick={() => {
                  const careersElement = document.getElementById('career-recommendations');
                  careersElement?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Explore Careers
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-foreground">50K+</div>
                <div className="text-sm text-primary-foreground/80">Students Guided</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-foreground">200+</div>
                <div className="text-sm text-primary-foreground/80">Career Paths</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-foreground">95%</div>
                <div className="text-sm text-primary-foreground/80">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-fade-in">
            <div className="relative rounded-2xl overflow-hidden shadow-strong">
              <img 
                src={heroImage} 
                alt="AI Career Advisory Platform for Indian Students"
                className="w-full h-auto object-cover animate-float"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
            </div>
            
            {/* Floating Cards */}
            <Card className="absolute -bottom-4 -left-4 p-4 shadow-medium animate-float" style={{animationDelay: '1s'}}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Brain className="h-5 w-5 text-success" />
                </div>
                <div>
                  <div className="font-semibold text-sm">AI Analysis Complete</div>
                  <div className="text-xs text-muted-foreground">Skills mapped successfully</div>
                </div>
              </div>
            </Card>

            <Card className="absolute -top-4 -right-4 p-4 shadow-medium animate-float" style={{animationDelay: '2s'}}>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Target className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <div className="font-semibold text-sm">Career Match Found</div>
                  <div className="text-xs text-muted-foreground">92% compatibility</div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-20 h-20 bg-primary-glow/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-32 left-10 w-32 h-32 bg-accent/20 rounded-full blur-xl animate-float" style={{animationDelay: '1.5s'}}></div>
    </div>
  );
};

export default HeroSection;