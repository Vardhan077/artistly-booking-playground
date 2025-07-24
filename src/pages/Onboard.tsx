import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/ui/navigation";
import { useToast } from "@/hooks/use-toast";
import { Upload, X, CheckCircle, User, FileText, DollarSign, MapPin } from "lucide-react";

interface FormData {
  name: string;
  bio: string;
  categories: string[];
  languages: string[];
  feeRange: string;
  location: string;
  profileImage?: FileList;
  portfolio?: string;
  experience: string;
  specialties: string;
}

const Onboard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const { toast } = useToast();

  const { register, handleSubmit, control, formState: { errors }, watch, setValue } = useForm<FormData>();

  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  const categories = ["Singer", "Dancer", "DJ", "Speaker", "Musician", "Comedian", "Magician", "Band"];
  const languages = ["English", "Spanish", "French", "German", "Italian", "Portuguese", "Mandarin", "Hindi", "Arabic", "Japanese"];
  const feeRanges = ["$200-500", "$500-1000", "$1000-2000", "$2000-5000", "$5000+"];

  const handleCategoryToggle = (category: string) => {
    const updated = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(updated);
    setValue("categories", updated);
  };

  const handleLanguageToggle = (language: string) => {
    const updated = selectedLanguages.includes(language)
      ? selectedLanguages.filter(l => l !== language)
      : [...selectedLanguages, language];
    setSelectedLanguages(updated);
    setValue("languages", updated);
  };

  const onSubmit = (data: FormData) => {
    console.log("Artist Registration Data:", {
      ...data,
      categories: selectedCategories,
      languages: selectedLanguages,
    });
    
    toast({
      title: "Registration Successful!",
      description: "Your artist profile has been submitted for review. We'll contact you within 24 hours.",
    });
    
    // Reset form or redirect
    setCurrentStep(1);
  };

  const nextStep = () => setCurrentStep(Math.min(currentStep + 1, totalSteps));
  const prevStep = () => setCurrentStep(Math.max(currentStep - 1, 1));

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
              <p className="text-muted-foreground">Tell us about yourself and your artistic background</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="bio">Bio *</Label>
                <Textarea
                  id="bio"
                  {...register("bio", { 
                    required: "Bio is required",
                    minLength: { value: 50, message: "Bio must be at least 50 characters" }
                  })}
                  placeholder="Tell us about your artistic background, experience, and what makes you unique..."
                  rows={4}
                />
                {errors.bio && (
                  <p className="text-sm text-destructive mt-1">{errors.bio.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  {...register("experience")}
                  placeholder="e.g., 5 years"
                />
              </div>

              <div>
                <Label htmlFor="profileImage">Profile Image</Label>
                <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center">
                  <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop your image here, or click to browse
                  </p>
                  <Input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    {...register("profileImage")}
                    className="hidden"
                  />
                  <Button variant="outline" size="sm" onClick={() => document.getElementById("profileImage")?.click()}>
                    Choose File
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <FileText className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Categories & Specialties</h2>
              <p className="text-muted-foreground">Select your performance categories and areas of expertise</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-4 block">Performance Categories *</Label>
                <p className="text-sm text-muted-foreground mb-4">Select all categories that apply to your performances</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedCategories.includes(category)
                          ? "border-primary bg-primary/5"
                          : "border-muted hover:border-primary/50"
                      }`}
                      onClick={() => handleCategoryToggle(category)}
                    >
                      <Checkbox
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryToggle(category)}
                      />
                      <Label className="cursor-pointer">{category}</Label>
                    </div>
                  ))}
                </div>
                {selectedCategories.length === 0 && (
                  <p className="text-sm text-destructive mt-2">Please select at least one category</p>
                )}
              </div>

              <div>
                <Label htmlFor="specialties">Specialties & Unique Skills</Label>
                <Textarea
                  id="specialties"
                  {...register("specialties")}
                  placeholder="Describe your unique skills, signature performances, or special techniques..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="portfolio">Portfolio/Website URL</Label>
                <Input
                  id="portfolio"
                  {...register("portfolio")}
                  placeholder="https://your-website.com or social media profile"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <DollarSign className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Languages & Pricing</h2>
              <p className="text-muted-foreground">Set your languages and fee structure</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label className="text-base font-medium mb-4 block">Languages Spoken *</Label>
                <p className="text-sm text-muted-foreground mb-4">Select all languages you can perform in</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {languages.map((language) => (
                    <div
                      key={language}
                      className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                        selectedLanguages.includes(language)
                          ? "border-primary bg-primary/5"
                          : "border-muted hover:border-primary/50"
                      }`}
                      onClick={() => handleLanguageToggle(language)}
                    >
                      <Checkbox
                        checked={selectedLanguages.includes(language)}
                        onCheckedChange={() => handleLanguageToggle(language)}
                      />
                      <Label className="cursor-pointer">{language}</Label>
                    </div>
                  ))}
                </div>
                {selectedLanguages.length === 0 && (
                  <p className="text-sm text-destructive mt-2">Please select at least one language</p>
                )}
              </div>

              <div>
                <Label>Fee Range *</Label>
                <Controller
                  name="feeRange"
                  control={control}
                  rules={{ required: "Please select a fee range" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your typical fee range" />
                      </SelectTrigger>
                      <SelectContent>
                        {feeRanges.map((range) => (
                          <SelectItem key={range} value={range}>
                            {range}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.feeRange && (
                  <p className="text-sm text-destructive mt-1">{errors.feeRange.message}</p>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  This is your typical fee range. You can negotiate specific rates for each booking.
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Location & Review</h2>
              <p className="text-muted-foreground">Add your location and review your information</p>
            </div>

            <div className="space-y-6">
              <div>
                <Label htmlFor="location">Primary Location *</Label>
                <Input
                  id="location"
                  {...register("location", { required: "Location is required" })}
                  placeholder="City, State (e.g., New York, NY)"
                />
                {errors.location && (
                  <p className="text-sm text-destructive mt-1">{errors.location.message}</p>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                  This is your primary location. You can specify travel availability after registration.
                </p>
              </div>

              {/* Review Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Review Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium">Name:</Label>
                    <p className="text-sm">{watch("name") || "Not provided"}</p>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Categories:</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedCategories.map(cat => (
                        <Badge key={cat} variant="secondary" className="text-xs">{cat}</Badge>
                      ))}
                      {selectedCategories.length === 0 && <p className="text-sm text-muted-foreground">None selected</p>}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Languages:</Label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedLanguages.map(lang => (
                        <Badge key={lang} variant="secondary" className="text-xs">{lang}</Badge>
                      ))}
                      {selectedLanguages.length === 0 && <p className="text-sm text-muted-foreground">None selected</p>}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-sm font-medium">Fee Range:</Label>
                    <p className="text-sm">{watch("feeRange") || "Not selected"}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Join Artistly as a Performer
            </h1>
            <p className="text-xl text-muted-foreground">
              Create your artist profile and start getting booked for amazing events
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span>Step {currentStep} of {totalSteps}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Form */}
          <Card>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                {renderStep()}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    Previous
                  </Button>

                  {currentStep < totalSteps ? (
                    <Button
                      type="button"
                      onClick={nextStep}
                      disabled={
                        (currentStep === 1 && (!watch("name") || !watch("bio"))) ||
                        (currentStep === 2 && selectedCategories.length === 0) ||
                        (currentStep === 3 && (selectedLanguages.length === 0 || !watch("feeRange")))
                      }
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!watch("location") || selectedCategories.length === 0 || selectedLanguages.length === 0}
                    >
                      Submit Application
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our team is here to help you create the perfect artist profile. Contact us if you have any questions.
              </p>
              <Button variant="outline" size="sm">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Onboard;