
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="text-center max-w-md p-8 glass-panel rounded-lg animate-zoom-in">
        <FileQuestion className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
        <h1 className="text-3xl font-bold mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-6">
          The document you're looking for cannot be found
        </p>
        <Button asChild>
          <a href="/">Return to Document Navigator</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
