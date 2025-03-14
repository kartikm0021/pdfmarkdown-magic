
import { useState } from 'react';
import DocumentSidebar from '@/components/DocumentSidebar';
import PDFViewer from '@/components/PDFViewer';
import MarkdownEditor from '@/components/MarkdownEditor';
import ViewControls from '@/components/ViewControls';
import { cn } from '@/lib/utils';

type ViewMode = 'side-by-side' | 'pdf-only' | 'markdown-only' | 'images';

export default function Index() {
  const [viewMode, setViewMode] = useState<ViewMode>('side-by-side');

  const handleViewChange = (newView: ViewMode) => {
    setViewMode(newView);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background animate-fade-in">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 h-full overflow-hidden">
        <DocumentSidebar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* View Controls */}
        <ViewControls onViewChange={handleViewChange} currentView={viewMode} />
        
        {/* Content Area */}
        <div className="flex-1 flex overflow-hidden">
          {/* PDF Viewer - Hidden in markdown-only mode */}
          <div 
            className={cn(
              "transition-all duration-300 ease-in-out",
              viewMode === 'side-by-side' ? 'flex-1' : 
              viewMode === 'pdf-only' ? 'flex-1' : 
              viewMode === 'markdown-only' ? 'hidden' : 
              viewMode === 'images' ? 'flex-1' : 'flex-1'
            )}
          >
            <PDFViewer />
          </div>
          
          {/* Markdown Editor - Hidden in pdf-only mode */}
          <div 
            className={cn(
              "transition-all duration-300 ease-in-out",
              viewMode === 'side-by-side' ? 'flex-1' : 
              viewMode === 'pdf-only' ? 'hidden' : 
              viewMode === 'markdown-only' ? 'flex-1' : 
              viewMode === 'images' ? 'hidden' : 'flex-1'
            )}
          >
            <MarkdownEditor />
          </div>
        </div>
      </div>
    </div>
  );
}
