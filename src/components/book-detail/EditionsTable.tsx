
import React, { useState } from 'react';
import { Edition } from '@/integrations/supabase/schema';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface EditionsTableProps {
  editions: Edition[];
}

const EditionsTable = ({ editions }: EditionsTableProps) => {
  const [isEditionsOpen, setIsEditionsOpen] = useState(false);
  
  if (editions.length === 0) return null;

  return (
    <div className="mt-8">
      <Collapsible
        open={isEditionsOpen}
        onOpenChange={setIsEditionsOpen}
        className="w-full"
      >
        <div className="flex items-center justify-between">
          <h3 className="editions-title text-lg font-semibold uppercase mb-2">
            ÉDITIONS ({editions.length})
          </h3>
          <CollapsibleTrigger asChild>
            <button className="p-1 rounded-md hover:bg-gray-100">
              {isEditionsOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Édition</TableHead>
                <TableHead>Éditeur</TableHead>
                <TableHead>Année</TableHead>
                <TableHead>Langue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {editions.map((edition, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{edition.name}</TableCell>
                  <TableCell>{edition.publisher || '-'}</TableCell>
                  <TableCell>{edition.year || '-'}</TableCell>
                  <TableCell>{edition.language || '-'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default EditionsTable;
