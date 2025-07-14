import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useContent } from '@/contexts/ContentContext';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';
import { Save, Plus, Trash2 } from 'lucide-react';

const ActivitiesForm = () => {
  const { content, updateContent } = useContent();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: content.activities.title,
    description: content.activities.description,
    image: content.activities.image,
    imageCaption: content.activities.imageCaption,
    events: [...content.activities.events]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent('activities', formData);
    toast({
      title: "บันทึกสำเร็จ",
      description: "ข้อมูลส่วนกิจกรรมถูกอัพเดทแล้ว",
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEventChange = (index: number, field: string, value: any) => {
    const newEvents = [...formData.events];
    newEvents[index] = { ...newEvents[index], [field]: value };
    setFormData(prev => ({ ...prev, events: newEvents }));
  };

  const addEvent = () => {
    setFormData(prev => ({
      ...prev,
      events: [...prev.events, {
        title: '',
        description: '',
        date: '',
        time: '',
        participants: '',
        status: 'เตรียมจัด'
      }]
    }));
  };

  const removeEvent = (index: number) => {
    setFormData(prev => ({
      ...prev,
      events: prev.events.filter((_, i) => i !== index)
    }));
  };

  const statuses = ['เปิดรับสมัคร', 'เตรียมจัด', 'เสร็จสิ้น'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="activities-title">หัวข้อส่วน</Label>
          <Input
            id="activities-title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="activities-description">คำอธิบาย</Label>
          <Textarea
            id="activities-description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <ImageUpload
          currentImage={formData.image}
          onImageUpload={(imageUrl) => handleInputChange('image', imageUrl)}
          label="รูปภาพหลัก"
        />

        <div className="space-y-2">
          <Label htmlFor="activities-image-caption">คำอธิบายรูปภาพ</Label>
          <Input
            id="activities-image-caption"
            value={formData.imageCaption}
            onChange={(e) => handleInputChange('imageCaption', e.target.value)}
          />
        </div>
      </div>

      {/* Events List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            กิจกรรม
            <Button type="button" onClick={addEvent} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มกิจกรรม
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.events.map((event, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <Label>กิจกรรม {index + 1}</Label>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeEvent(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <Input
                value={event.title}
                onChange={(e) => handleEventChange(index, 'title', e.target.value)}
                placeholder="ชื่อกิจกรรม"
              />
              
              <Textarea
                value={event.description}
                onChange={(e) => handleEventChange(index, 'description', e.target.value)}
                placeholder="คำอธิบายกิจกรรม"
              />

              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={event.date}
                  onChange={(e) => handleEventChange(index, 'date', e.target.value)}
                  placeholder="วันที่"
                />
                
                <Input
                  value={event.time}
                  onChange={(e) => handleEventChange(index, 'time', e.target.value)}
                  placeholder="เวลา"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={event.participants}
                  onChange={(e) => handleEventChange(index, 'participants', e.target.value)}
                  placeholder="จำนวนผู้เข้าร่วม"
                />
                
                <Select
                  value={event.status}
                  onValueChange={(value) => handleEventChange(index, 'status', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="สถานะ" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Button type="submit" className="w-full">
        <Save className="w-4 h-4 mr-2" />
        บันทึกการเปลี่ยนแปลง
      </Button>
    </form>
  );
};

export default ActivitiesForm;