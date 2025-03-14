
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

type ViewMode = 'side-by-side' | 'pdf-only' | 'markdown-only' | 'images';

interface ViewControlsProps {
  onViewChange: (view: ViewMode) => void;
  currentView: ViewMode;
}

export default function ViewControls({ onViewChange, currentView }: ViewControlsProps) {
  return (
    <div className="flex justify-end p-2 bg-background border-b">
      <Tabs value={currentView} onValueChange={(value) => onViewChange(value as ViewMode)} className="w-auto">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="side-by-side" className="text-xs">
            Side-by-Side View
          </TabsTrigger>
          <TabsTrigger value="pdf-only" className="text-xs">
            PDF Only
          </TabsTrigger>
          <TabsTrigger value="markdown-only" className="text-xs">
            Markdown Only
          </TabsTrigger>
          <TabsTrigger value="images" className="text-xs">
            Images
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
