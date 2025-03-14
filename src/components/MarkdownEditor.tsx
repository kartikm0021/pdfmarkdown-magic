
import { useState, useEffect } from 'react';
import { RefreshCw, Save, Sparkles, Eye, EyeOff, MessageCircleQuestion, ListChecks } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { cn } from '@/lib/utils';
import { Textarea } from './ui/textarea';
import { toast } from './ui/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

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
  const [showAiPreview, setShowAiPreview] = useState(false);
  const [isGeneratingQA, setIsGeneratingQA] = useState(false);
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [qaItems, setQAItems] = useState<{question: string, answer: string, accepted: boolean}[]>([]);
  const [documentSummary, setDocumentSummary] = useState("");
  const [aiSummary, setAiSummary] = useState("");
  const [showSummaryPreview, setShowSummaryPreview] = useState(false);

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

  const toggleAiPreview = () => {
    setShowAiPreview(!showAiPreview);
  };

  const handleGenerateQA = () => {
    setIsGeneratingQA(true);
    
    // Simulate AI Q&A generation API call
    setTimeout(() => {
      // This would be replaced with an actual AI API call
      const generatedQA = [
        {
          question: "What type of services are covered by this health insurance plan?",
          answer: "This health insurance plan covers full hospital and outpatient services.",
          accepted: false
        },
        {
          question: "What is the monthly premium for this insurance plan?",
          answer: "The monthly premium is $250 with available family discounts.",
          accepted: false
        },
        {
          question: "Who is eligible for this health insurance coverage?",
          answer: "The coverage is available for all employees and their dependents.",
          accepted: false
        },
        {
          question: "How does the claims process work?",
          answer: "Claims can be submitted online with a 7-day processing timeline.",
          accepted: false
        }
      ];
      
      setQAItems(generatedQA);
      setIsGeneratingQA(false);
      setActiveTab("qa");
      toast({
        title: "Q&A suggestions ready",
        description: "View and edit suggested questions and answers.",
      });
    }, 1500);
  };

  const handleGenerateSummary = () => {
    setIsGeneratingSummary(true);
    
    // Simulate AI summary generation API call
    setTimeout(() => {
      // This would be replaced with an actual AI API call
      const generatedSummary = "This document provides comprehensive information about health insurance coverage, including details on service coverage, premium costs, eligibility requirements, and claim submission procedures. The plan offers full hospital and outpatient services with a monthly premium of $250, and it's available to all employees and their dependents.";
      
      setAiSummary(generatedSummary);
      setIsGeneratingSummary(false);
      setActiveTab("summary");
      toast({
        title: "Summary suggestion ready",
        description: "View and edit the suggested document summary.",
      });
    }, 1500);
  };

  const toggleSummaryPreview = () => {
    setShowSummaryPreview(!showSummaryPreview);
  };

  const applySummary = () => {
    setDocumentSummary(aiSummary);
    toast({
      title: "Summary applied",
      description: "The AI-generated summary has been applied to your document.",
    });
  };

  const acceptQA = (index: number) => {
    const updatedQA = [...qaItems];
    updatedQA[index].accepted = !updatedQA[index].accepted;
    setQAItems(updatedQA);
    
    const acceptedCount = updatedQA.filter(item => item.accepted).length;
    if (updatedQA[index].accepted) {
      toast({
        title: "Q&A accepted",
        description: `Question ${index + 1} has been accepted.`,
      });
    } else {
      toast({
        title: "Q&A unaccepted",
        description: `Question ${index + 1} has been removed from selection.`,
      });
    }
  };

  const updateQuestion = (index: number, newQuestion: string) => {
    const updatedQA = [...qaItems];
    updatedQA[index].question = newQuestion;
    setQAItems(updatedQA);
  };

  const updateAnswer = (index: number, newAnswer: string) => {
    const updatedQA = [...qaItems];
    updatedQA[index].answer = newAnswer;
    setQAItems(updatedQA);
  };

  const applySelectedQA = () => {
    const acceptedItems = qaItems.filter(item => item.accepted);
    if (acceptedItems.length === 0) {
      toast({
        title: "No Q&A selected",
        description: "Please select at least one question and answer pair.",
      });
      return;
    }
    
    // In a real implementation, this would save the selected Q&A pairs to a database
    toast({
      title: "Q&A pairs saved",
      description: `${acceptedItems.length} question-answer pairs have been added to the document.`,
    });
    setActiveTab("markdown");
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
            variant="secondary"
            size="sm" 
            className="gap-1.5"
            onClick={handleGenerateQA}
            disabled={isGeneratingQA}
          >
            <MessageCircleQuestion className={cn("h-4 w-4", isGeneratingQA && "animate-pulse")} />
            <span>Generate Q&A</span>
          </Button>
          <Button 
            variant="secondary"
            size="sm" 
            className="gap-1.5"
            onClick={handleGenerateSummary}
            disabled={isGeneratingSummary}
          >
            <ListChecks className={cn("h-4 w-4", isGeneratingSummary && "animate-pulse")} />
            <span>Generate Summary</span>
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
            {qaItems.length > 0 && (
              <TabsTrigger 
                value="qa" 
                className="rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Q&A Pairs
              </TabsTrigger>
            )}
            {(documentSummary || aiSummary) && (
              <TabsTrigger 
                value="summary" 
                className="rounded-none px-4 py-2 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary"
              >
                Summary
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
            {showAiPreview ? (
              <div className="prose dark:prose-invert max-w-none p-4">
                {/* This would be rendered markdown in a real implementation */}
                <h1>Health Insurance Coverage Document</h1>
                <h2>Overview</h2>
                <p>This document outlines the comprehensive coverage details for your health insurance plan. Please review all sections carefully to understand your benefits.</p>
                <h2>Key Benefits</h2>
                <ul>
                  <li><strong>Coverage Details</strong>: Full hospital and outpatient services</li>
                  <li><strong>Premium Information</strong>: Monthly premium of $250 with family discounts</li>
                  <li><strong>Eligibility</strong>: Available for all employees and dependents</li>
                  <li><strong>Claims Process</strong>: Simple online submission with 7-day processing</li>
                </ul>
                <h2>Additional Information</h2>
                <p>For further assistance, please contact customer support at support@insurance.com or call 1-800-555-1234.</p>
              </div>
            ) : (
              <Textarea
                value={improvedContent}
                className="markdown-editor rounded-none border-0"
                readOnly
              />
            )}
          </div>
          <div className="border-t p-3 bg-muted/30 flex justify-between">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={toggleAiPreview}
            >
              {showAiPreview ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  <span>Show Markdown</span>
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </>
              )}
            </Button>
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

        <TabsContent value="qa" className="flex-1 p-4 overflow-auto m-0 flex flex-col">
          <div className="flex-1 space-y-4">
            <p className="text-sm text-muted-foreground mb-4">
              Review the AI-generated questions and answers. Edit them as needed and select the ones you want to add to the document.
            </p>
            
            <Accordion type="multiple" className="w-full">
              {qaItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b">
                  <div className="flex items-start gap-2 py-2">
                    <Button
                      variant={item.accepted ? "default" : "outline"}
                      size="sm"
                      className="mt-4"
                      onClick={() => acceptQA(index)}
                    >
                      {item.accepted ? "Selected" : "Select"}
                    </Button>
                    <div className="flex-1">
                      <AccordionTrigger className="py-2 hover:no-underline">
                        <span className="text-left font-medium">{item.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="space-y-3">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Question:</label>
                          <Textarea
                            value={item.question}
                            onChange={(e) => updateQuestion(index, e.target.value)}
                            className="min-h-[60px]"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Answer:</label>
                          <Textarea
                            value={item.answer}
                            onChange={(e) => updateAnswer(index, e.target.value)}
                            className="min-h-[100px]"
                          />
                        </div>
                      </AccordionContent>
                    </div>
                  </div>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
          
          <div className="border-t mt-4 p-3 bg-muted/30 flex justify-end">
            <Button 
              onClick={applySelectedQA}
              size="sm"
              className="gap-1.5"
            >
              <Save className="h-4 w-4" />
              Save Selected Q&A
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="summary" className="flex-1 p-0 m-0 flex flex-col">
          <div className="flex-1 overflow-auto">
            <div className="p-4 bg-background">
              <Collapsible className="w-full space-y-2">
                <div className="flex items-center justify-between space-x-4 px-4">
                  <h4 className="text-sm font-medium">Current Document Summary</h4>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">Toggle</span>
                    </Button>
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="p-4 pt-0 border rounded-md">
                  {documentSummary ? (
                    <p className="text-sm">{documentSummary}</p>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No summary has been set for this document.</p>
                  )}
                </CollapsibleContent>
              </Collapsible>
            </div>
            
            <div className="p-4 border-t">
              <h4 className="text-sm font-medium mb-2">AI-Generated Summary</h4>
              {showSummaryPreview ? (
                <div className="prose dark:prose-invert max-w-none p-4 border rounded-md">
                  <p>{aiSummary}</p>
                </div>
              ) : (
                <Textarea
                  value={aiSummary}
                  onChange={(e) => setAiSummary(e.target.value)}
                  className="min-h-[150px]"
                  placeholder="AI-generated summary will appear here. You can edit it before applying."
                />
              )}
            </div>
          </div>
          
          <div className="border-t p-3 bg-muted/30 flex justify-between">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={toggleSummaryPreview}
            >
              {showSummaryPreview ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  <span>Edit</span>
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  <span>Preview</span>
                </>
              )}
            </Button>
            <Button 
              onClick={applySummary}
              size="sm"
              className="gap-1.5"
            >
              <Save className="h-4 w-4" />
              Apply Summary
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
