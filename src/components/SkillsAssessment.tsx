import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Brain, Code, Users, Palette, Calculator, Globe } from "lucide-react";
import { useAssessment } from "@/contexts/AssessmentContext";
import { useToast } from "@/components/ui/use-toast";

interface Skill {
  id: string;
  name: string;
  category: string;
  icon: React.ReactNode;
  description: string;
}

const skillCategories = [
  {
    name: "Technical Skills",
    skills: [
      { id: "programming", name: "Programming", category: "technical", icon: <Code className="h-5 w-5" />, description: "Software development and coding" },
      { id: "data-analysis", name: "Data Analysis", category: "technical", icon: <Calculator className="h-5 w-5" />, description: "Statistical analysis and insights" },
      { id: "ai-ml", name: "AI & Machine Learning", category: "technical", icon: <Brain className="h-5 w-5" />, description: "Artificial intelligence and ML algorithms" },
    ]
  },
  {
    name: "Soft Skills", 
    skills: [
      { id: "leadership", name: "Leadership", category: "soft", icon: <Users className="h-5 w-5" />, description: "Leading teams and projects" },
      { id: "communication", name: "Communication", category: "soft", icon: <Globe className="h-5 w-5" />, description: "Verbal and written communication" },
      { id: "creativity", name: "Creative Thinking", category: "soft", icon: <Palette className="h-5 w-5" />, description: "Innovation and creative problem-solving" },
    ]
  }
];

const SkillsAssessment = () => {
  const { selectedSkills, currentStep, toggleSkill, setCurrentStep, completeAssessment } = useAssessment();
  const { toast } = useToast();
  
  const totalSkills = skillCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  const progress = (selectedSkills.size / totalSkills) * 100;

  const handleNext = () => {
    if (currentStep < skillCategories.length - 1) {
      setCurrentStep(currentStep + 1);
      toast({
        title: "Progress Saved",
        description: `Moving to ${skillCategories[currentStep + 1].name}`,
      });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompleteAssessment = () => {
    if (selectedSkills.size === 0) {
      toast({
        title: "No Skills Selected",
        description: "Please select at least one skill before proceeding.",
        variant: "destructive",
      });
      return;
    }
    
    completeAssessment();
    toast({
      title: "Assessment Complete!",
      description: "Generating your personalized career recommendations...",
    });
    
    // Scroll to career recommendations
    setTimeout(() => {
      const careersElement = document.getElementById('career-recommendations');
      careersElement?.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  };

  const currentCategory = skillCategories[currentStep];

  return (
    <div id="skills-assessment" className="py-20 bg-skill-gradient">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="text-4xl font-bold mb-4">Skills Assessment</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Help us understand your current skills and interests
            </p>
            
            {/* Progress */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-sm text-muted-foreground mb-2">
                <span>Progress</span>
                <span>{selectedSkills.size}/{totalSkills} skills</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          </div>

          {/* Assessment Card */}
          <Card className="shadow-medium animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  {currentCategory.name === "Technical Skills" ? 
                    <Code className="h-6 w-6 text-primary" /> : 
                    <Users className="h-6 w-6 text-primary" />
                  }
                </div>
                {currentCategory.name}
              </CardTitle>
              <CardDescription>
                Select the skills you have experience with or are interested in learning
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Skills Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                {currentCategory.skills.map((skill) => (
                  <Card 
                    key={skill.id}
                    className={`cursor-pointer transition-all duration-200 hover:shadow-soft ${
                      selectedSkills.has(skill.id) 
                        ? 'ring-2 ring-primary bg-primary/5' 
                        : 'hover:bg-muted/50'
                    }`}
                    onClick={() => toggleSkill(skill.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {selectedSkills.has(skill.id) ? (
                            <CheckCircle2 className="h-5 w-5 text-primary" />
                          ) : (
                            <Circle className="h-5 w-5 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {skill.icon}
                            <h3 className="font-semibold">{skill.name}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {skill.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Selected Skills Summary */}
              {selectedSkills.size > 0 && (
                <div className="space-y-3">
                  <h4 className="font-semibold">Selected Skills ({selectedSkills.size})</h4>
                  <div className="flex flex-wrap gap-2">
                    {Array.from(selectedSkills).map((skillId) => {
                      const skill = skillCategories
                        .flatMap(cat => cat.skills)
                        .find(s => s.id === skillId);
                      return (
                        <Badge key={skillId} variant="secondary" className="gap-1">
                          {skill?.icon}
                          {skill?.name}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between pt-6">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  Previous
                </Button>
                
                <div className="flex gap-2">
                  {skillCategories.map((_, index) => (
                    <div 
                      key={index}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentStep ? 'bg-primary' : 'bg-muted'
                      }`}
                    />
                  ))}
                </div>
                
                {currentStep < skillCategories.length - 1 ? (
                  <Button variant="default" onClick={handleNext}>
                    Next Category
                  </Button>
                ) : (
                  <Button variant="hero" onClick={handleCompleteAssessment}>
                    Generate Career Recommendations
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SkillsAssessment;