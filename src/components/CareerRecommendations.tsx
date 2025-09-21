import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Brain, 
  Code, 
  Palette, 
  TrendingUp, 
  Users, 
  Star, 
  ArrowUpRight,
  MapPin,
  IndianRupee,
  Clock,
  BookOpen,
  Heart
} from "lucide-react";
import { useAssessment } from "@/contexts/AssessmentContext";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface CareerPath {
  id: string;
  title: string;
  match: number;
  icon: React.ReactNode;
  description: string;
  averageSalary: string;
  growthRate: string;
  requiredSkills: string[];
  locations: string[];
  timeToEntry: string;
  trending: boolean;
}

const careerPaths: CareerPath[] = [
  {
    id: "ai-engineer",
    title: "AI/ML Engineer",
    match: 92,
    icon: <Brain className="h-6 w-6" />,
    description: "Design and develop AI systems and machine learning models to solve complex problems across industries.",
    averageSalary: "₹8-25 LPA",
    growthRate: "+28%",
    requiredSkills: ["Python", "TensorFlow", "Machine Learning", "Data Science"],
    locations: ["Bangalore", "Hyderabad", "Mumbai"],
    timeToEntry: "6-12 months",
    trending: true
  },
  {
    id: "fullstack-developer",
    title: "Full Stack Developer",
    match: 87,
    icon: <Code className="h-6 w-6" />,
    description: "Build complete web applications from front-end user interfaces to back-end server logic.",
    averageSalary: "₹6-18 LPA",
    growthRate: "+22%",
    requiredSkills: ["JavaScript", "React", "Node.js", "MongoDB"],
    locations: ["Bangalore", "Pune", "Chennai"],
    timeToEntry: "4-8 months",
    trending: false
  },
  {
    id: "product-manager",
    title: "Product Manager",
    match: 78,
    icon: <Users className="h-6 w-6" />,
    description: "Lead product development from concept to launch, managing cross-functional teams and user experience.",
    averageSalary: "₹10-30 LPA",
    growthRate: "+18%",
    requiredSkills: ["Product Strategy", "Analytics", "User Research", "Communication"],
    locations: ["Bangalore", "Mumbai", "Delhi NCR"],
    timeToEntry: "8-15 months",
    trending: true
  },
  {
    id: "ui-ux-designer",
    title: "UI/UX Designer",
    match: 71,
    icon: <Palette className="h-6 w-6" />,
    description: "Create intuitive and beautiful user experiences for digital products and applications.",
    averageSalary: "₹4-15 LPA",
    growthRate: "+15%",
    requiredSkills: ["Figma", "User Research", "Prototyping", "Design Systems"],
    locations: ["Mumbai", "Bangalore", "Delhi NCR"],
    timeToEntry: "3-6 months",
    trending: false
  }
];

const CareerRecommendations = () => {
  const { selectedSkills, assessmentComplete } = useAssessment();
  const { toast } = useToast();
  const [savedCareers, setSavedCareers] = useState<Set<string>>(new Set());

  // Calculate match percentages based on selected skills
  const calculateMatch = (careerSkills: string[]) => {
    if (selectedSkills.size === 0) return 70; // Default for demo
    
    const skillsArray = Array.from(selectedSkills);
    const matchingSkills = careerSkills.filter(skill => 
      skillsArray.some(selectedSkill => 
        selectedSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(selectedSkill.toLowerCase())
      )
    );
    
    const baseMatch = Math.min(95, 60 + (matchingSkills.length / careerSkills.length) * 35);
    return Math.round(baseMatch);
  };

  const handleSaveCareer = (careerId: string, careerTitle: string) => {
    const newSaved = new Set(savedCareers);
    if (newSaved.has(careerId)) {
      newSaved.delete(careerId);
      toast({
        title: "Career Removed",
        description: `${careerTitle} removed from saved careers`,
      });
    } else {
      newSaved.add(careerId);
      toast({
        title: "Career Saved!",
        description: `${careerTitle} added to your saved careers`,
      });
    }
    setSavedCareers(newSaved);
  };

  // Update career paths with calculated matches
  const updatedCareerPaths = careerPaths.map(career => ({
    ...career,
    match: calculateMatch(career.requiredSkills)
  })).sort((a, b) => b.match - a.match);

  if (!assessmentComplete && selectedSkills.size === 0) {
    return (
      <div id="career-recommendations" className="py-20 bg-career-gradient">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="shadow-medium">
              <CardContent className="py-12">
                <Brain className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-4">Complete Your Skills Assessment</h3>
                <p className="text-muted-foreground mb-6">
                  Take our personalized skills assessment to get AI-powered career recommendations 
                  tailored specifically for you.
                </p>
                <Button 
                  variant="hero" 
                  onClick={() => {
                    const assessmentElement = document.getElementById('skills-assessment');
                    assessmentElement?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Start Assessment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="career-recommendations" className="py-20 bg-career-gradient">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">Your Career Recommendations</h2>
            <p className="text-xl text-muted-foreground">
              Personalized career paths based on your skills and interests
            </p>
          </div>

          {/* Career Cards Grid */}
          <div className="grid lg:grid-cols-2 gap-6 animate-fade-in">
            {updatedCareerPaths.map((career, index) => (
              <Card 
                key={career.id} 
                className="shadow-medium hover:shadow-strong transition-all duration-300 hover:-translate-y-1"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        {career.icon}
                      </div>
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          {career.title}
                          {career.trending && (
                            <Badge variant="secondary" className="bg-success/10 text-success">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`h-4 w-4 ${
                                  i < Math.floor(career.match / 20) 
                                    ? 'text-warning fill-current' 
                                    : 'text-muted-foreground'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm font-semibold text-success">
                            {career.match}% match
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Match Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Skill Match</span>
                      <span>{career.match}%</span>
                    </div>
                    <Progress value={career.match} className="h-2" />
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <CardDescription className="text-base leading-relaxed">
                    {career.description}
                  </CardDescription>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <IndianRupee className="h-4 w-4 text-success" />
                        <span className="text-muted-foreground">Salary Range</span>
                      </div>
                      <div className="font-semibold">{career.averageSalary}</div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <TrendingUp className="h-4 w-4 text-success" />
                        <span className="text-muted-foreground">Growth Rate</span>
                      </div>
                      <div className="font-semibold text-success">{career.growthRate}</div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Entry Time</span>
                      </div>
                      <div className="font-semibold">{career.timeToEntry}</div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-muted-foreground">Top Locations</span>
                      </div>
                      <div className="font-semibold text-sm">
                        {career.locations.join(", ")}
                      </div>
                    </div>
                  </div>

                  {/* Required Skills */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Key Skills Required</h4>
                    <div className="flex flex-wrap gap-2">
                      {career.requiredSkills.map((skill) => (
                        <Badge key={skill} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="default" className="flex-1">
                          <BookOpen className="h-4 w-4 mr-2" />
                          View Learning Path
                          <ArrowUpRight className="h-4 w-4 ml-1" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            {career.icon}
                            {career.title} Learning Path
                          </DialogTitle>
                          <DialogDescription>
                            Structured roadmap to become a successful {career.title.toLowerCase()}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="grid gap-4">
                            <div className="p-4 border rounded-lg">
                              <h4 className="font-semibold mb-2">Phase 1: Foundation (Months 1-3)</h4>
                              <ul className="space-y-1 text-sm text-muted-foreground">
                                {career.requiredSkills.slice(0, 2).map(skill => (
                                  <li key={skill}>• Master {skill} fundamentals</li>
                                ))}
                                <li>• Complete 2-3 practical projects</li>
                              </ul>
                            </div>
                            <div className="p-4 border rounded-lg">
                              <h4 className="font-semibold mb-2">Phase 2: Specialization (Months 4-8)</h4>
                              <ul className="space-y-1 text-sm text-muted-foreground">
                                {career.requiredSkills.slice(2).map(skill => (
                                  <li key={skill}>• Advanced {skill} techniques</li>
                                ))}
                                <li>• Build portfolio projects</li>
                                <li>• Contribute to open source</li>
                              </ul>
                            </div>
                            <div className="p-4 border rounded-lg">
                              <h4 className="font-semibold mb-2">Phase 3: Job Preparation (Months 9-12)</h4>
                              <ul className="space-y-1 text-sm text-muted-foreground">
                                <li>• Interview preparation</li>
                                <li>• Network with professionals</li>
                                <li>• Apply for internships/jobs</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button 
                      variant={savedCareers.has(career.id) ? "default" : "outline"} 
                      size="sm"
                      onClick={() => handleSaveCareer(career.id, career.title)}
                    >
                      <Heart className={`h-4 w-4 ${savedCareers.has(career.id) ? 'fill-current' : ''}`} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12 animate-slide-up">
            <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="py-8">
                <h3 className="text-2xl font-bold mb-4">Ready to start your journey?</h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Get personalized learning roadmaps, connect with mentors, and access exclusive job opportunities 
                  tailored to your career goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="hero" 
                    size="lg"
                    onClick={() => {
                      toast({
                        title: "Feature Coming Soon!",
                        description: "Personalized learning plans will be available soon.",
                      });
                    }}
                  >
                    Create Learning Plan
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => {
                      toast({
                        title: "Feature Coming Soon!",
                        description: "Mentor connections will be available soon.",
                      });
                    }}
                  >
                    Connect with Mentors
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerRecommendations;