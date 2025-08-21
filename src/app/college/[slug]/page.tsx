import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MapPin, 
  Globe, 
  Users, 
  DollarSign, 
  Calendar,
  FileText,
  CheckCircle,
  Clock,
  GraduationCap,
  Award,
  ArrowLeft
} from 'lucide-react';
import { slugify, essaysBySlug } from '@/lib/essay-utils';
import { notFound } from 'next/navigation';
import collegeMetadata from '@/lib/college_metadata.json';
import collegeRequirements from '@/lib/college-app-requirement.json';
import { getCollegeBackgroundStyle } from '@/lib/college-background-utils';
import Link from 'next/link';

export const dynamicParams = false;
export async function generateStaticParams() {
  return collegeMetadata.colleges.map((college: any) => ({ slug: slugify(college.name) }));
}

export default function CollegePage({ params }: { params: { slug: string } }) {
  // Find the college in metadata
  const college = collegeMetadata.colleges.find((c: any) => slugify(c.name) === params.slug);
  
  if (!college) return notFound();
  
  const prompts = essaysBySlug[params.slug] ?? [];

  // Get college-specific requirements
  const collegeReq = collegeRequirements.colleges[college.name];
  
  // Fallback if college requirements not found
  if (!collegeReq) {
    console.warn(`College requirements not found for: ${college.name}`);
  }
  
  // Application requirements based on actual college data
  const applicationRequirements = [
    { 
      id: 'common-app', 
      label: collegeReq?.commonApp ? 'Common Application (Required)' : 'Common Application (Not Required)', 
      completed: collegeReq?.commonApp || false 
    },
    { 
      id: 'transcript', 
      label: 'Official High School Transcript', 
      completed: collegeReq?.highSchoolTranscript || false 
    },
    { 
      id: 'test-scores', 
      label: `SAT/ACT Scores (${college.testPolicy})`, 
      completed: collegeReq?.satActScores || false 
    },
    { 
      id: 'recommendations', 
      label: collegeReq?.teacherRecommendations ? '2 Teacher Recommendations (Required)' : '2 Teacher Recommendations (Not Required)', 
      completed: collegeReq?.teacherRecommendations || false 
    },
    { 
      id: 'counselor-rec', 
      label: collegeReq?.counselorRecommendation ? '1 Counselor Recommendation (Required)' : '1 Counselor Recommendation (Not Required)', 
      completed: collegeReq?.counselorRecommendation || false 
    },
    { 
      id: 'essays', 
      label: 'Personal Statement + College Essays', 
      completed: collegeReq?.personalStatementEssays || false 
    },
    { 
      id: 'activities', 
      label: 'Activities List', 
      completed: collegeReq?.activitiesList || false 
    },
    { 
      id: 'supplements', 
      label: collegeReq?.additionalSupplements ? 'Additional Supplements (Required)' : 'Additional Supplements (Not Required)', 
      completed: collegeReq?.additionalSupplements || false 
    },
    { 
      id: 'interview', 
      label: collegeReq?.optionalInterview ? 'Optional Interview (Available)' : 'Optional Interview (Not Available)', 
      completed: collegeReq?.optionalInterview || false 
    },
    { 
      id: 'portfolio', 
      label: 'Portfolio (if applicable)', 
      completed: collegeReq?.portfolio || false 
    }
  ];

  // Organize essay prompts into categories
  const essayPrompts = [
    {
      title: "Personal Statement",
      description: "Common App essay (650 words)",
      prompt: "Share an essay on any topic of your choice. It can be one you've already written, one that responds to a different prompt, or one of your own design."
    },
    {
      title: "College-Specific Essays",
      description: `${prompts.length} supplemental essay${prompts.length !== 1 ? 's' : ''}`,
      prompts: prompts.map((p: any) => p.prompt)
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-black">
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-20">
        <Button variant="outline" asChild className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-white/10">
          <Link href="/colleges" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Colleges
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={getCollegeBackgroundStyle(college.name)}
        >
          <div className="absolute inset-0 bg-black/30" />
        </div>
        
        <div className="relative z-10 flex items-end h-full p-8">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-2">{college.name}</h1>
            <div className="flex items-center gap-4 text-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{college.location}</span>
              </div>
              <span>•</span>
              <span>{college.collegeType} University</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column - College Information */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Key Stats */}
            <Card className="bg-white/5 backdrop-blur-sm border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-red-400" />
                  Key Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{college.acceptanceRate}</div>
                    <div className="text-sm text-gray-300">Acceptance Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{college.undergradPopulation}</div>
                    <div className="text-sm text-gray-300">Undergrad Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{college.inStateTuition}</div>
                    <div className="text-sm text-gray-300">Annual Tuition</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{college.appFeeDomestic}</div>
                    <div className="text-sm text-gray-300">Application Fee</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Requirements */}
            <Card className="bg-white/5 backdrop-blur-sm border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-red-400" />
                  Application Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {applicationRequirements.map((requirement) => (
                    <div key={requirement.id} className="flex items-center space-x-3">
                      <Checkbox 
                        id={requirement.id} 
                        checked={requirement.completed}
                        className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                      />
                      <label 
                        htmlFor={requirement.id} 
                        className={`text-sm font-medium ${
                          requirement.completed ? 'text-green-300 line-through' : 'text-white'
                        }`}
                      >
                        {requirement.label}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Essay Prompts */}
            <Card className="bg-white/5 backdrop-blur-sm border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-red-400" />
                  Essay Prompts & Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 bg-white/10">
                    <TabsTrigger value="personal" className="text-white">Personal Statement</TabsTrigger>
                    <TabsTrigger value="supplemental" className="text-white">Supplemental Essays</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="personal" className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-white mb-2">{essayPrompts[0]?.title}</h4>
                        <p className="text-gray-300 text-sm mb-3">{essayPrompts[0]?.description}</p>
                        <p className="text-white italic">"{essayPrompts[0]?.prompt}"</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="supplemental" className="mt-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-white mb-2">{essayPrompts[1]?.title}</h4>
                        <p className="text-gray-300 text-sm mb-3">{essayPrompts[1]?.description}</p>
                        {prompts.length === 0 ? (
                          <p className="text-gray-300 text-sm">No supplemental essays found for this college.</p>
                        ) : (
                          <div className="space-y-2">
                            {prompts.map((prompt: any, index: number) => (
                              <div key={index} className="border-l-2 border-red-400 pl-4">
                                <p className="text-white text-sm mb-1">
                                  <span className="font-medium">{index + 1}.</span> "{prompt.prompt}"
                                </p>
                                <p className="text-gray-400 text-xs">{prompt.word_count}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Additional Info */}
          <div className="space-y-6">
            
            {/* Quick Info */}
            <Card className="bg-white/5 backdrop-blur-sm border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white">Quick Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-white font-medium">Website</p>
                    <p className="text-gray-300 text-sm">{college.domain}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-white font-medium">Location</p>
                    <p className="text-gray-300 text-sm">{college.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-white font-medium">Student Body</p>
                    <p className="text-gray-300 text-sm">{college.genderAdmission}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-white font-medium">Financial Aid</p>
                    <p className="text-gray-300 text-sm">{college.aidStatusDomestic}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-white font-medium">Application Systems</p>
                    <p className="text-gray-300 text-sm">{Array.isArray(college.applicationSystems) ? college.applicationSystems.join(', ') : college.applicationSystems}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Application Timeline */}
            <Card className="bg-white/5 backdrop-blur-sm border-red-500/30">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-400" />
                  Application Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.isArray(college.decisionTypes) ? college.decisionTypes.map((decisionType: string, index: number) => (
                    <div key={index} className="border-l-2 border-red-400 pl-4">
                      <p className="text-white font-medium">{decisionType}</p>
                      <p className="text-gray-300 text-sm">
                        {decisionType.includes('Early') ? 'November 1st' : 'January 5th'}
                      </p>
                    </div>
                  )) : (
                    <div className="border-l-2 border-red-400 pl-4">
                      <p className="text-white font-medium">Regular Decision</p>
                      <p className="text-gray-300 text-sm">January 5th</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <Card className="bg-white/5 backdrop-blur-sm border-red-500/30">
              <CardContent className="pt-6">
                <div className="space-y-3">
                  <Button className="w-full bg-red-600 hover:bg-red-700 text-white border-red-500">
                    Start Application
                  </Button>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    Save to List
                  </Button>
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                    Request Information
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 