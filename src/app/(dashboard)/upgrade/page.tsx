'use client';

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
  Award
} from 'lucide-react';

const StanfordProfile = () => {
  const collegeData = {
    name: "Stanford University",
    location: "Stanford, California",
    type: "Private University",
    acceptanceRate: "3.9%",
    undergradPopulation: "7,645",
    tuition: "$62,193",
    applicationFee: "$90",
    testPolicy: "Test-Optional",
    decisionTypes: ["Restrictive Early Action", "Regular Decision"],
    applicationSystems: ["Common App"],
    website: "stanford.edu",
    address: "450 Jane Stanford Way, Stanford, CA 94305"
  };

  const applicationRequirements = [
    { id: 'common-app', label: 'Common Application', completed: true },
    { id: 'transcript', label: 'Official High School Transcript', completed: true },
    { id: 'test-scores', label: 'SAT/ACT Scores (Optional)', completed: false },
    { id: 'recommendations', label: '2 Teacher Recommendations', completed: false },
    { id: 'counselor-rec', label: '1 Counselor Recommendation', completed: false },
    { id: 'essays', label: 'Personal Statement + Stanford Essays', completed: false },
    { id: 'activities', label: 'Activities List', completed: true },
    { id: 'supplements', label: 'Additional Supplements', completed: false },
    { id: 'interview', label: 'Optional Interview', completed: false },
    { id: 'portfolio', label: 'Portfolio (if applicable)', completed: false }
  ];

  const essayPrompts = [
    {
      title: "Personal Statement",
      description: "Common App essay (650 words)",
      prompt: "Share an essay on any topic of your choice. It can be one you've already written, one that responds to a different prompt, or one of your own design."
    },
    {
      title: "Stanford Short Essays",
      description: "Three short responses (50 words each)",
      prompts: [
        "What is the most significant challenge that society faces today?",
        "How did you spend your last two summers?",
        "What historical moment or event do you wish you could have witnessed?"
      ]
    },
    {
      title: "Stanford Short Questions",
      description: "Five short responses (50 words each)",
      prompts: [
        "Name one thing that is a source of joy for you.",
        "Name one thing that you are looking forward to learning at Stanford.",
        "Name one thing that you are looking forward to experiencing at Stanford.",
        "Briefly describe an example of when you used something someone else taught you in a meaningful way.",
        "Briefly describe a problem you've solved or a problem you'd like to solve."
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-neutral-800 to-black">
      {/* Hero Section with Background Image */}
      <div className="relative h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 flex items-end h-full p-8">
          <div className="text-white">
            <h1 className="text-5xl font-bold mb-2">{collegeData.name}</h1>
            <div className="flex items-center gap-4 text-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{collegeData.location}</span>
              </div>
              <span>•</span>
              <span>{collegeData.type}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 relative z-20">
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
                    <div className="text-2xl font-bold text-white">{collegeData.acceptanceRate}</div>
                    <div className="text-sm text-gray-300">Acceptance Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{collegeData.undergradPopulation}</div>
                    <div className="text-sm text-gray-300">Undergrad Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{collegeData.tuition}</div>
                    <div className="text-sm text-gray-300">Annual Tuition</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{collegeData.applicationFee}</div>
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
                  <TabsList className="grid w-full grid-cols-3 bg-white/10">
                    <TabsTrigger value="personal" className="text-white">Personal Statement</TabsTrigger>
                    <TabsTrigger value="short-essays" className="text-white">Short Essays</TabsTrigger>
                    <TabsTrigger value="questions" className="text-white">Short Questions</TabsTrigger>
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
                  
                                     <TabsContent value="short-essays" className="mt-4">
                     <div className="space-y-4">
                       <div>
                         <h4 className="font-semibold text-white mb-2">{essayPrompts[1]?.title}</h4>
                         <p className="text-gray-300 text-sm mb-3">{essayPrompts[1]?.description}</p>
                         <div className="space-y-2">
                           {essayPrompts[1]?.prompts?.map((prompt, index) => (
                             <p key={index} className="text-white text-sm">
                               <span className="font-medium">{index + 1}.</span> "{prompt}"
                             </p>
                           ))}
                         </div>
                       </div>
                     </div>
                   </TabsContent>
                   
                   <TabsContent value="questions" className="mt-4">
                     <div className="space-y-4">
                       <div>
                         <h4 className="font-semibold text-white mb-2">{essayPrompts[2]?.title}</h4>
                         <p className="text-gray-300 text-sm mb-3">{essayPrompts[2]?.description}</p>
                         <div className="space-y-2">
                           {essayPrompts[2]?.prompts?.map((prompt, index) => (
                             <p key={index} className="text-white text-sm">
                               <span className="font-medium">{index + 1}.</span> "{prompt}"
                             </p>
                           ))}
                         </div>
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
                     <p className="text-gray-300 text-sm">{collegeData.website}</p>
                   </div>
                 </div>
                 
                 <div className="flex items-center gap-3">
                   <MapPin className="w-5 h-5 text-red-400" />
                   <div>
                     <p className="text-white font-medium">Address</p>
                     <p className="text-gray-300 text-sm">{collegeData.address}</p>
                   </div>
                 </div>
                 
                 <div className="flex items-center gap-3">
                   <Users className="w-5 h-5 text-red-400" />
                   <div>
                     <p className="text-white font-medium">Student Body</p>
                     <p className="text-gray-300 text-sm">47% Female, 53% Male</p>
                   </div>
                 </div>
                 
                 <div className="flex items-center gap-3">
                   <DollarSign className="w-5 h-5 text-red-400" />
                  <div>
                    <p className="text-white font-medium">Financial Aid</p>
                    <p className="text-gray-300 text-sm">Need Blind</p>
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
                                     <div className="border-l-2 border-red-400 pl-4">
                     <p className="text-white font-medium">Restrictive Early Action</p>
                     <p className="text-gray-300 text-sm">November 1st</p>
                   </div>
                   <div className="border-l-2 border-red-400 pl-4">
                     <p className="text-white font-medium">Regular Decision</p>
                     <p className="text-gray-300 text-sm">January 5th</p>
                   </div>
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
};

export default StanfordProfile; 