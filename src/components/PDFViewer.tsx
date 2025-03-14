
import { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

export default function PDFViewer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [isLoading, setIsLoading] = useState(false);

  const navigateToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setIsLoading(true);
      setCurrentPage(pageNumber);
      
      // Simulate loading delay
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  const goToPreviousPage = () => navigateToPage(currentPage - 1);
  const goToNextPage = () => navigateToPage(currentPage + 1);

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const page = parseInt(e.target.value);
    if (!isNaN(page)) {
      navigateToPage(page);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center p-4 border-b">
        <div className="text-lg font-medium">Basic Health Contract.pdf</div>
      </div>
      
      <div className="flex items-center p-2 bg-secondary/10 border-b">
        <div className="flex items-center space-x-1">
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8" 
            onClick={goToPreviousPage}
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm">Page</span>
            <Input
              type="number"
              min={1}
              max={totalPages}
              value={currentPage}
              onChange={handlePageInputChange}
              className="w-14 h-8 text-center p-1"
            />
            <span className="text-sm">of {totalPages}</span>
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="h-8 w-8" 
            onClick={goToNextPage}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-muted/30">
        <div 
          className={cn(
            "w-[600px] h-[800px] bg-white shadow-lg rounded-md flex items-center justify-center transition-opacity duration-300 border",
            isLoading ? "opacity-50" : "opacity-100"
          )}
        >
          {isLoading ? (
            <div className="animate-pulse">Loading page...</div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <FileText className="h-24 w-24 text-muted" />
              <p className="text-muted-foreground mt-4">PDF preview</p>
              <p className="text-muted-foreground mt-2">Page {currentPage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
