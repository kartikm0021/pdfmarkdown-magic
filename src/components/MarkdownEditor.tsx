import { useState, useEffect } from 'react';
import { RefreshCw, Save, Sparkles, Eye, EyeOff, MessageCircleQuestion, ListChecks } from 'lucide-react';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { cn } from '@/lib/utils';
import { Textarea } from './ui/textarea';
import { toast } from './ui/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';
import { Separator } from './ui/separator';

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
  const [qaItems, setQAItems] = useState<{question: string, answer: string, accepted: boolean}[]>([]);
  const [documentSummary, setDocumentSummary] = useState("");
  const [aiSummary, setAiSummary] = useState("");
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
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
    if (qaItems.length > 0) {
      // If we already have QA items, just switch to the QA tab
      setActiveTab("qa");
      return;
    }

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
    if (aiSummary) {
      // If we already have a summary, just switch to the summary tab
      setActiveTab("summary");
      return;
    }

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
            <span>{qaItems.length ? "View Q&A" : "Generate Q&A"}</span>
          </Button>
          <Button 
            variant="secondary"
            size="sm" 
            className="gap-1.5"
            onClick={handleGenerateSummary}
            disabled={isGeneratingSummary}
          >
            <ListChecks className={cn("h-4 w-4", isGeneratingSummary && "animate-pulse")} />
            <span>{aiSummary || documentSummary ? "View Summary" : "Generate Summary"}</span>
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
              <div className="prose dark:prose-invert max-w-none p-4 h-full overflow-y-auto">
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
              <div className="w-full h-full flex flex-col">
                <Textarea
                  value={improvedContent}
                  className="flex-1 rounded-none border-0 w-full h-full min-h-[300px] resize-none"
                  readOnly
                />
              </div>
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

        <TabsContent value="qa" className="flex-1 p-0 m-0 flex flex-col">
          <div className="flex-1 overflow-auto">
            <div className="p-4 bg-background">
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">AI-Generated Q&A Pairs</h3>
                <p className="text-sm text-muted-foreground">
                  Review and select the questions and answers you want to include in your document. You can edit them before saving.
                </p>
              </div>
              
              <div className="space-y-4">
                {qaItems.map((item, index) => (
                  <div 
                    key={index} 
                    className={cn(
                      "border rounded-lg overflow-hidden transition-all duration-200",
                      item.accepted ? "border-primary bg-primary/5" : "border-border"
                    )}
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h4 className="font-medium text-base mb-1">Question {index + 1}</h4>
                          <p className="text-sm text-foreground">{item.question}</p>
                        </div>
                        <Button
                          variant={item.accepted ? "default" : "outline"}
                          size="sm"
                          onClick={() => acceptQA(index)}
                          className="whitespace-nowrap"
                        >
                          {item.accepted ? "Selected" : "Select"}
                        </Button>
                      </div>
                      
                      <Separator className="my-3" />
                      
                      <div className="mt-3">
                        <h4 className="font-medium text-sm mb-1 text-muted-foreground">Answer</h4>
                        <p className="text-sm">{item.answer}</p>
                      </div>
                      
                      <div className="mt-4 pt-2 border-t flex justify-end">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            const accordionElement = document.getElementById(`edit-qa-${index}`);
                            if (accordionElement) {
                              accordionElement.setAttribute('data-state', 'open');
                            }
                          }}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                    
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value={`item-${index}`} id={`edit-qa-${index}`} className="border-t">
                        <AccordionTrigger className="px-4 py-2 text-sm font-medium">
                          Edit Question & Answer
                        </AccordionTrigger>
                        <AccordionContent className="p-4 pt-2 space-y-3 bg-muted/20">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Question:</label>
                            <Textarea
                              value={item.question}
                              onChange={(e) => updateQuestion(index, e.target.value)}
                              className="min-h-[60px] resize-vertical"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Answer:</label>
                            <Textarea
                              value={item.answer}
                              onChange={(e) => updateAnswer(index, e.target.value)}
                              className="min-h-[100px] resize-vertical"
                            />
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t p-4 bg-muted/30 flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {qaItems.filter(item => item.accepted).length} of {qaItems.length} Q&A pairs selected
            </p>
            <Button 
              onClick={applySelectedQA}
              size="sm"
              className="gap-1.5"
              disabled={!qaItems.some(item => item.accepted)}
            >
              <Save className="h-4 w-4" />
              Save Selected Q&A
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="summary" className="flex-1 p-0 m-0 flex flex-col">
          <div className="flex-1 overflow-auto">
            <div className="p-4 space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">Document Summary</h3>
                {documentSummary ? (
                  <div className="p-4 border rounded-lg bg-background">
                    <p className="text-sm">{documentSummary}</p>
                  </div>
                ) : (
                  <div className="p-4 border rounded-lg bg-muted/20">
                    <p className="text-sm text-muted-foreground italic">No summary has been set for this document yet.</p>
                  </div>
                )}
              </div>

              {(isGeneratingSummary || aiSummary) && (
                <div>
                  <Separator className="my-4" />
                  <Collapsible defaultOpen={true} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium">AI Suggestion</h3>
                      <div className="flex items-center gap-2">
                        {aiSummary && (
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
                        )}
                      </div>
                    </div>
                    
                    <CollapsibleContent className="mt-3">
                      {isGeneratingSummary ? (
                        <div className="flex items-center justify-center p-4">
                          <div className="flex flex-col items-center gap-2">
                            <Sparkles className="h-8 w-8 animate-pulse text-primary" />
                            <p className="text-sm text-muted-foreground">Generating summary...</p>
                          </div>
                        </div>
                      ) : (
                        <div className="relative mt-3">
                          {showSummaryPreview ? (
                            <div className="p-4 border rounded-lg prose dark:prose-invert prose-sm max-w-none">
                              <p>{aiSummary}</p>
                            </div>
                          ) : (
                            <Textarea
                              value={aiSummary}
                              onChange={(e) => setAiSummary(e.target.value)}
                              className="min-h-[120px] resize-vertical"
                              placeholder="AI-generated summary will appear here. You can edit it before applying."
                            />
                          )}
                          
                          {aiSummary && !isGeneratingSummary && (
                            <div className="mt-4 flex justify-end">
                              <Button 
                                onClick={applySummary}
                                size="sm"
                                className="gap-1.5"
                              >
                                <Save className="h-4 w-4" />
                                Apply This Summary
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
