import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Clock
} from "lucide-react";

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
  return (
    <div className="py-20 bg-career-gradient">
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
            {careerPaths.map((career, index) => (
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
                    <Button variant="default" className="flex-1">
                      View Learning Path
                      <ArrowUpRight className="h-4 w-4 ml-1" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Save
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
                  <Button variant="hero" size="lg">
                    Create Learning Plan
                  </Button>
                  <Button variant="outline" size="lg">
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