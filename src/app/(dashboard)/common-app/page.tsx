'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

const prompts = [
  'Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story.',
  'The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?',
  'Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?',
  'Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?',
  'Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others.',
  'Describe a topic, idea, or concept you find so engaging that it makes you lose all track of time. Why does it captivate you? What or who do you turn to when you want to learn more?',
  "Share an essay on any topic of your choice. It can be one you've already written, one that responds to a different prompt, or one of your own design."
];

const CommonAppPage = () => {
  const [showInstructions, setShowInstructions] = useState(true);
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [drafts, setDrafts] = useState(['']);
  const [activeDraft, setActiveDraft] = useState(0);

  const handleDraftChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newDrafts = [...drafts];
    newDrafts[activeDraft] = e.target.value;
    setDrafts(newDrafts);
  };

  const handleAddDraft = () => {
    setDrafts([...drafts, '']);
    setActiveDraft(drafts.length);
  };

  const handlePromptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPrompt(Number(e.target.value));
  };

  const wordCount = drafts[activeDraft].trim().split(/\s+/).filter(Boolean).length;

  return (
    <div className="flex flex-col md:flex-row gap-8 max-w-6xl mx-auto py-10">
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-primary">Common App</h1>
            <span className="ml-2 text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-semibold">beta</span>
          </div>
          <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">Changes saved automatically.</span>
        </div>
        {showInstructions && (
          <div className="relative mb-6 p-4 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 border border-primary/10">
            <button
              className="absolute top-3 right-3 text-muted-foreground hover:text-primary text-lg"
              onClick={() => setShowInstructions(false)}
              aria-label="Dismiss instructions"
            >
              &times;
            </button>
            <div className="font-semibold text-base mb-1">Write and revise your essays 5x faster.</div>
            <ol className="list-decimal list-inside text-sm text-muted-foreground mb-1">
              <li>Get started with the <span className="text-primary underline cursor-pointer">Advice</span> and <span className="text-primary underline cursor-pointer">Brainstorm</span> buttons.</li>
              <li><span className="text-primary underline cursor-pointer">Ask Sups</span> for custom help (like writing an outline).</li>
              <li>Spend 10 minutes writing a rough draft. Then <span className="text-primary underline cursor-pointer">Ask Sups</span> or get <span className="text-primary underline cursor-pointer">Advice</span> to improve it.</li>
            </ol>
            <div className="text-sm text-muted-foreground">Already have a draft? Paste it in and get <span className="text-primary underline cursor-pointer">Advice</span>.</div>
          </div>
        )}
        <div className="mb-4 flex flex-col gap-2">
          <div className="text-sm text-muted-foreground">The Common App admissions team has provided the following questions.</div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="text-primary border-primary/30" size="sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A2 2 0 0122 9.618v4.764a2 2 0 01-1.447 1.894L15 18" /></svg>
              Schedule a free consultation with a college counselor.
            </Button>
            <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full font-semibold">New!</span>
          </div>
        </div>
        <div className="mb-2 font-medium">Select a Common App Prompt:</div>
        <select
          className="w-full border rounded-md px-3 py-2 mb-2 bg-card text-base focus:outline-none focus:ring-2 focus:ring-primary/30"
          value={selectedPrompt}
          onChange={handlePromptChange}
        >
          {prompts.map((prompt, idx) => (
            <option value={idx} key={idx}>{`${idx + 1}. ${prompt.slice(0, 60)}${prompt.length > 60 ? '...' : ''}`}</option>
          ))}
        </select>
        <div className="mb-4 text-base font-medium">
          {selectedPrompt + 1}. {prompts[selectedPrompt]}
        </div>
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              {drafts.map((_, idx) => (
                <button
                  key={idx}
                  className={`px-3 py-1 rounded-t-md border-b-2 text-sm font-medium focus:outline-none transition-colors
                    ${activeDraft === idx
                      ? 'border-primary text-primary bg-background dark:bg-card'
                      : 'border-transparent text-muted-foreground bg-muted dark:bg-muted'}`}
                  onClick={() => setActiveDraft(idx)}
                  type="button"
                >
                  Draft {idx + 1}
                </button>
              ))}
              <button
                className="ml-2 px-2 py-1 rounded-md border text-primary border-primary/30 text-lg font-bold hover:bg-primary/10 bg-muted dark:bg-muted"
                onClick={handleAddDraft}
                type="button"
                aria-label="Add new draft"
              >
                +
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mb-2">
              <Button type="button" className="bg-muted text-foreground dark:bg-muted dark:text-foreground" size="sm">Brainstorm</Button>
              <Button type="button" className="bg-muted text-foreground dark:bg-muted dark:text-foreground" size="sm">Advice</Button>
              <Button type="button" className="bg-muted text-foreground dark:bg-muted dark:text-foreground" size="sm">Ask Sups</Button>
            </div>
            <div className="flex items-center justify-between mb-1 text-xs text-muted-foreground">
              <span>&nbsp;</span>
              <span>{wordCount} / 650 words</span>
            </div>
            <Textarea
              className="w-full min-h-[120px] resize-vertical mb-2 bg-card placeholder:italic placeholder:text-muted-foreground"
              placeholder="Start writing or click Brainstorm..."
              value={drafts[activeDraft]}
              onChange={handleDraftChange}
              maxLength={650 * 10} // allow more chars, but word count is what matters
            />
            <div className="flex justify-start">
              <Button variant="outline" className="border-primary/30 text-primary" size="sm">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                .docx
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <aside className="w-full md:w-72 flex-shrink-0">
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="font-semibold mb-1">No comments yet...</div>
            <div className="text-sm text-muted-foreground">Highlight text to ask Sups about specific parts of your essay.</div>
            <div className="mt-2 text-xs text-muted-foreground">⌘ K</div>
          </CardContent>
        </Card>
        {/* Additional sidebar content can go here */}
      </aside>
    </div>
  );
};

export default CommonAppPage; 