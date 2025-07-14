import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAdmin } from '@/contexts/AdminContext';
import { Edit, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EditableContentProps {
  title: string;
  content: string;
  onSave: (newContent: string) => void;
  type?: 'text' | 'textarea';
}

const EditableContent: React.FC<EditableContentProps> = ({ 
  title, 
  content, 
  onSave, 
  type = 'text' 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const { isAdmin } = useAdmin();
  const { toast } = useToast();

  const handleSave = () => {
    onSave(editContent);
    setIsOpen(false);
    toast({
      title: "บันทึกสำเร็จ",
      description: `อัปเดต ${title} แล้ว`,
    });
  };

  if (!isAdmin) {
    return <span>{content}</span>;
  }

  return (
    <div className="relative group">
      <span>{content}</span>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary/10 hover:bg-primary/20"
          >
            <Edit className="w-3 h-3" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>แก้ไข {title}</DialogTitle>
            <DialogDescription>
              คุณสามารถแก้ไขเนื้อหาได้ตามต้องการ
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-content">เนื้อหา</Label>
              {type === 'textarea' ? (
                <Textarea
                  id="edit-content"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="min-h-[100px]"
                />
              ) : (
                <Input
                  id="edit-content"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
              )}
            </div>
            <Button onClick={handleSave} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              บันทึก
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditableContent;