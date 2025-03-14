
import { useState } from 'react';
import { 
  ChevronDown, 
  ChevronRight, 
  FileText, 
  FolderClosed, 
  FolderOpen, 
  Upload,
  Settings,
  Search
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

type DocumentItem = {
  id: string;
  name: string;
  type: 'folder' | 'file';
  children?: DocumentItem[];
  isOpen?: boolean;
  isActive?: boolean;
};

export default function DocumentSidebar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: '1',
      name: 'PDF Documents',
      type: 'folder',
      isOpen: true,
      children: [
        {
          id: '2',
          name: 'Health Plans',
          type: 'folder',
          isOpen: true,
          children: [
            {
              id: '3',
              name: 'Contracts',
              type: 'folder',
              isOpen: true,
              children: [
                {
                  id: '4',
                  name: 'Basic Health Contract.pdf',
                  type: 'file',
                  isActive: true,
                },
                {
                  id: '5',
                  name: 'Premium Health Plan.pdf',
                  type: 'file',
                }
              ]
            },
            {
              id: '6',
              name: 'Product Summaries',
              type: 'folder',
              children: []
            }
          ]
        },
        {
          id: '7',
          name: 'Cancer Plans',
          type: 'folder',
          children: []
        },
        {
          id: '8',
          name: 'Life Plans',
          type: 'folder',
          children: []
        },
        {
          id: '9',
          name: 'Reports',
          type: 'folder',
          children: []
        }
      ]
    }
  ]);

  const toggleFolder = (itemId: string) => {
    setDocuments(prevDocs => {
      const toggleItem = (items: DocumentItem[]): DocumentItem[] => {
        return items.map(item => {
          if (item.id === itemId) {
            return { ...item, isOpen: !item.isOpen };
          }
          if (item.children) {
            return { ...item, children: toggleItem(item.children) };
          }
          return item;
        });
      };
      return toggleItem(prevDocs);
    });
  };

  const setActiveDocument = (itemId: string) => {
    setDocuments(prevDocs => {
      const toggleActive = (items: DocumentItem[]): DocumentItem[] => {
        return items.map(item => {
          if (item.type === 'file') {
            return { ...item, isActive: item.id === itemId };
          }
          if (item.children) {
            return { ...item, children: toggleActive(item.children) };
          }
          return item;
        });
      };
      return toggleActive(prevDocs);
    });
  };

  const renderDocumentTree = (items: DocumentItem[], level = 0) => {
    return items.map(item => (
      <div key={item.id} style={{ marginLeft: `${level * 12}px` }} className="animate-fade-in">
        {item.type === 'folder' ? (
          <div className="flex flex-col">
            <button 
              onClick={() => toggleFolder(item.id)}
              className="document-tree-item text-left"
            >
              <span className="mr-1">
                {item.isOpen ? 
                  <ChevronDown className="h-4 w-4" /> : 
                  <ChevronRight className="h-4 w-4" />
                }
              </span>
              <span className="mr-1">
                {item.isOpen ? 
                  <FolderOpen className="h-4 w-4 text-blue-400" /> : 
                  <FolderClosed className="h-4 w-4 text-blue-400" />
                }
              </span>
              <span className="truncate">{item.name}</span>
            </button>
            {item.isOpen && item.children && (
              <div className="mt-1 transition-all">
                {renderDocumentTree(item.children, level + 1)}
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setActiveDocument(item.id)}
            className={cn(
              "document-tree-item text-left",
              item.isActive && "document-tree-item-active"
            )}
          >
            <FileText className="h-4 w-4 flex-shrink-0 text-gray-400" />
            <span className="truncate">{item.name}</span>
          </button>
        )}
      </div>
    ));
  };

  return (
    <div className="flex flex-col h-full border-r bg-sidebar">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold text-sidebar-foreground mb-4">Document Navigator</h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search documents..."
            className="pl-9 bg-sidebar-accent text-sidebar-foreground placeholder:text-sidebar-foreground/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="p-2">
        <Button className="w-full bg-primary hover:bg-primary/90 gap-2">
          <Upload className="h-4 w-4" />
          Upload PDF
        </Button>
      </div>
      <div className="flex-1 overflow-auto p-2">
        {renderDocumentTree(documents)}
      </div>
      <div className="p-2 border-t mt-auto">
        <Button variant="outline" className="w-full gap-2 text-sidebar-foreground bg-sidebar-accent hover:bg-sidebar-accent/90 hover:text-sidebar-foreground">
          <Settings className="h-4 w-4" />
          Settings
        </Button>
      </div>
    </div>
  );
}
