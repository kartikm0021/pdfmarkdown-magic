
import { useState, useEffect } from 'react';
import { RefreshCw, Save, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { cn } from '@/lib/utils';
import { Textarea } from './ui/textarea';
import { toast } from './ui/use-toast';

export default function MarkdownEditor() {
  const [markdownContent, setMarkdownContent] = useState(`# Document Content

This is the extracted markdown content from the PDF document. You can edit it here.

## Key Points

- Coverage details
- Premium information
- Eligibility criteria
- Claim procedures
`);
  
  const [originalContent, setOriginalContent] = useState(markdownContent);
  const [improvedContent, setImprovedContent] = useState("");
  const [activeTab, setActiveTab] = useState("markdown");
  const [isSaving, setIsSaving] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isImproving, setIsImproving] = useState(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownContent(e.target.value);
  };

  const handleSave = () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setOriginalContent(markdownContent);
      toast({
        title: "Changes saved",
        description: "Your markdown has been updated successfully.",
      });
    }, 800);
  };

  const handleRegenerate = () => {
    setIsRegenerating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsRegenerating(false);
      setMarkdownContent(originalContent);
      toast({
        title: "Content regenerated",
        description: "Markdown has been regenerated from the PDF.",
      });
    }, 1000);
  };

  const handleImproveReadability = () => {
    setIsImproving(true);
    
    // Simulate AI improvement API call
    setTimeout(() => {
      // This would be replaced with an actual AI API call
      const aiImprovedContent = `# Health Insurance Coverage Document

## Overview
This document outlines the comprehensive coverage details for your health insurance plan. 
Please review all sections carefully to understand your benefits.

## Key Benefits
- **Coverage Details**: Full hospital and outpatient services
- **Premium Information**: Monthly premium of $250 with family discounts
- **Eligibility**: Available for all employees and dependents
- **Claims Process**: Simple online submission with 7-day processing

## Additional Information
For further assistance, please contact customer support at support@insurance.com or call 1-800-555-1234.`;
      
      setImprovedContent(aiImprovedContent);
      setIsImproving(false);
      setActiveTab("improved");
      toast({
        title: "AI suggestions ready",
        description: "View the improved version in the 'AI Suggestions' tab.",
      });
    }, 1500);
  };

  const applyImprovedVersion = () => {
    setMarkdownContent(improvedContent);
    setActiveTab("markdown");
    toast({
      title: "Improvements applied",
      description: "The AI suggestions have been applied to your document.",
    });
  };

  const hasUnsavedChanges = markdownContent !== originalContent;

  return (
    <div className="flex flex-col h-full border-l">
      <div className="flex items-center justify-between p-4 border-b bg-background">
        <h2 className="text-lg font-medium">Extracted Markdown</h2>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="gap-1.5"
            onClick={handleRegenerate}
            disabled={isRegenerating}
          >
            <RefreshCw className={cn("h-4 w-4", isRegenerating && "animate-spin")} />
            <span>Regenerate</span>
          </Button>
          <Button 
            variant="secondary"
            size="sm" 
            className="gap-1.5"
            onClick={handleImproveReadability}
            disabled={isImproving}
          >
            <Sparkles className={cn("h-4 w-4", isImproving && "animate-pulse")} />
            <span>Improve Readability</span>
          </Button>
          <Button 
            size="sm" 
            className="gap-1.5"
            onClick={handleSave}
            disabled={isSaving || !hasUnsavedChanges}
          >
            <Save className="h-4 w-4" />
            <span>Save Changes</span>
          </Button>
        </div>
      </div>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="flex-1 flex flex-col"
      >
        <div className="border-b px-4">
          <TabsList className="bg-transparent p-0 h-auto">
            <TabsTrigger 
              value="markdown" 
              className="rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Markdown
            </TabsTrigger>
            <TabsTrigger 
              value="preview" 
              className="rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary"
            >
              Preview
            </TabsTrigger>
            {improvedContent && (
              <TabsTrigger 
                value="improved" 
                className="rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                AI Suggestions
              </TabsTrigger>
            )}
          </TabsList>
        </div>
        
        <TabsContent value="markdown" className="flex-1 p-0 m-0">
          <Textarea
            value={markdownContent}
            onChange={handleContentChange}
            className="markdown-editor rounded-none border-0"
            placeholder="Enter markdown content..."
          />
        </TabsContent>
        
        <TabsContent value="preview" className="flex-1 p-4 overflow-auto m-0">
          <div className="prose dark:prose-invert max-w-none">
            {/* This would be rendered markdown in a real implementation */}
            <h1>Document Content</h1>
            <p>This is the extracted markdown content from the PDF document. You can edit it here.</p>
            <h2>Key Points</h2>
            <ul>
              <li>Coverage details</li>
              <li>Premium information</li>
              <li>Eligibility criteria</li>
              <li>Claim procedures</li>
            </ul>
          </div>
        </TabsContent>

        <TabsContent value="improved" className="flex-1 p-0 m-0 flex flex-col">
          <div className="flex-1 overflow-auto">
            <Textarea
              value={improvedContent}
              className="markdown-editor rounded-none border-0"
              readOnly
            />
          </div>
          <div className="border-t p-3 bg-muted/30 flex justify-end">
            <Button 
              onClick={applyImprovedVersion}
              size="sm"
              className="gap-1.5"
            >
              <Sparkles className="h-4 w-4" />
              Apply Suggestions
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
