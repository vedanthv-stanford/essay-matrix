'use client';
import React, { useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const backgroundFields = [
  {
    label: 'Intended major and minors',
    description: 'What do you hope to study in college?',
    placeholder: 'Major: Psychology, Minor: Statistics. Also interested in business.',
    name: 'majors',
    type: 'input',
  },
  {
    label: 'Activities',
    description: `What are the top three extracurriculars or clubs you\'ve been involved in? Describe your role and any accomplishments in each.`,
    placeholder:
      'Debate Club Team Captain: Led team to two state championships; organized workshops for newcomers. Food Blogger: Shared unique family recipes; gained a following of over 1,000 readers; collaborated with local restaurants for reviews.',
    name: 'activities',
    type: 'textarea',
  },
  {
    label: 'Graduation Year',
    description: 'Please enter the year you intend on graduating.',
    placeholder: '2026',
    name: 'gradYear',
    type: 'input',
  },
  {
    label: 'High School Name',
    description: 'Enter the name of the high school you go to.',
    placeholder: 'Sups AI High School',
    name: 'highSchool',
    type: 'input',
  },
  {
    label: 'Recognition',
    description: 'What accomplishments or awards are you most proud of?',
    placeholder:
      'Did biology research over the summer and got a paper published. Led a charity fashion show at my high school and raised 10K to donate toward mental health resources.',
    name: 'recognition',
    type: 'textarea',
  },
  {
    label: 'Challenges',
    description:
      'Are there any challenges or obstacles you\'ve faced in your life that you believe are crucial to your story?',
    placeholder:
      'During my sophomore year, I faced significant health challenges that impacted my academic performance, but I learned resilience and time management.',
    name: 'challenges',
    type: 'textarea',
  },
  {
    label: 'SAT Score',
    description: 'Enter your SAT scores (out of 1600)',
    placeholder: '1600 (only put numbers in here)',
    name: 'sat',
    type: 'input',
  },
  {
    label: 'ACT Score',
    description: 'Enter your ACT score (out of 36)',
    placeholder: '36 (only enter numbers here)',
    name: 'act',
    type: 'input',
  },
  {
    label: 'Core values',
    description: 'What principles or causes are important to you?',
    placeholder:
      'Integrity, compassion, and innovation. Problems I see in the world: homelessness and mental health.',
    name: 'coreValues',
    type: 'input',
  },
  {
    label: 'Hobbies',
    description:
      'Outside of school and structured activities, what do you enjoy doing in your free time?',
    placeholder:
      'I love exploring new hiking trails, tinkering with open-source projects, and cooking with my mom.',
    name: 'hobbies',
    type: 'input',
  },
  {
    label: 'Identity',
    description:
      'How have aspects of your identity, culture, or background presented challenges for you? How have they enriched your experiences?',
    placeholder:
      'Growing up in a multicultural household, I\'ve been influenced by both my Indian heritage and American upbringing. Love exploring my culture through cooking.',
    name: 'identity',
    type: 'textarea',
  },
  {
    label: 'Compliments',
    description: 'What compliments do you receive from people?',
    placeholder:
      'Good at explaining things, dedicated and passionate about community service, infectious positivity.',
    name: 'compliments',
    type: 'input',
  },
  {
    label: 'Personality',
    description: 'If your friend described your personality in 3 words, what would they be?',
    placeholder: 'Analytical, compassionate, sarcastic.',
    name: 'personality',
    type: 'input',
  },
  {
    label: 'More',
    description:
      'Are there other pivotal experiences, insights, or aspects of your story that you\'d like to share?',
    placeholder:
      'Feel free to paste content you\'ve already written about yourself (that you want reflected in your supplements).',
    name: 'more',
    type: 'textarea',
  },
];

const BackgroundPage = () => {
  const [resume, setResume] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-primary">Your Background</h1>
        <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">Changes saved automatically.</span>
      </div>
      <p className="mb-8 text-muted-foreground text-sm">
        <span className="font-semibold">Let&apos;s get to know you.</span> The more detailed you are, the better suggestions we can make.<br />
        1. Get started by answering as many of the questions below as you can, <span className="font-semibold">as fast as you can</span>. Get all your ideas on the page.<br />
        2. This is not the time to be modest. Brag!<br />
        3. If you can&apos;t answer a question, skip it. Come back later to add more.
      </p>
      <Card className="mb-8 bg-card text-card-foreground">
        <CardContent className="p-6 bg-card text-card-foreground">
          <div className="mb-2 font-semibold text-lg text-card-foreground">Upload Your Resume</div>
          <div className="mb-1 text-muted-foreground text-sm">If you have a resume or background file, upload it here to help us get to know you better.</div>
          <div
            className="flex flex-col items-center justify-center border-2 border-dashed border-primary/30 rounded-xl bg-background dark:bg-gray-900 py-8 cursor-pointer hover:bg-primary/5 dark:hover:bg-primary/10 transition mb-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
              <span className="text-base text-card-foreground font-medium">Choose a file or drag it here.</span>
            </div>
            {resume && (
              <div className="mt-2 text-sm text-muted-foreground">{resume.name}</div>
            )}
          </div>
          <div className="font-semibold mt-2 text-card-foreground">Saved Files</div>
          {/* List of saved files can go here */}
        </CardContent>
      </Card>
      <form className="space-y-6">
        {backgroundFields.map((field) => (
          <div key={field.name}>
            <Label className="font-semibold text-base mb-1 block">
              {field.label}: <span className="font-normal text-muted-foreground">{field.description}</span>
            </Label>
            {field.type === 'input' ? (
              <Input
                placeholder={field.placeholder}
                className="mt-1 placeholder:italic placeholder:text-muted-foreground bg-white/80"
                name={field.name}
                autoComplete="off"
              />
            ) : (
              <Textarea
                placeholder={field.placeholder}
                className="mt-1 placeholder:italic placeholder:text-muted-foreground bg-white/80"
                name={field.name}
                autoComplete="off"
                rows={3}
              />
            )}
          </div>
        ))}
      </form>
    </div>
  );
};

export default BackgroundPage; 