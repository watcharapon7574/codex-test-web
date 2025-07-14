import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useContent } from '@/contexts/ContentContext';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';
import { Save, Plus, Trash2 } from 'lucide-react';

const ContactForm = () => {
  const { content, updateContent } = useContent();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: content.contact.title,
    description: content.contact.description,
    image: content.contact.image,
    imageCaption: content.contact.imageCaption,
    contactInfo: [...content.contact.contactInfo]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent('contact', formData);
    toast({
      title: "บันทึกสำเร็จ",
      description: "ข้อมูลส่วนติดต่อถูกอัพเดทแล้ว",
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactInfoChange = (index: number, field: string, value: any) => {
    const newContactInfo = [...formData.contactInfo];
    newContactInfo[index] = { ...newContactInfo[index], [field]: value };
    setFormData(prev => ({ ...prev, contactInfo: newContactInfo }));
  };

  const handleDetailChange = (contactIndex: number, detailIndex: number, value: string) => {
    const newContactInfo = [...formData.contactInfo];
    const newDetails = [...newContactInfo[contactIndex].details];
    newDetails[detailIndex] = value;
    newContactInfo[contactIndex] = { ...newContactInfo[contactIndex], details: newDetails };
    setFormData(prev => ({ ...prev, contactInfo: newContactInfo }));
  };

  const addContactInfo = () => {
    setFormData(prev => ({
      ...prev,
      contactInfo: [...prev.contactInfo, { title: '', details: [''] }]
    }));
  };

  const removeContactInfo = (index: number) => {
    setFormData(prev => ({
      ...prev,
      contactInfo: prev.contactInfo.filter((_, i) => i !== index)
    }));
  };

  const addDetail = (contactIndex: number) => {
    const newContactInfo = [...formData.contactInfo];
    newContactInfo[contactIndex].details.push('');
    setFormData(prev => ({ ...prev, contactInfo: newContactInfo }));
  };

  const removeDetail = (contactIndex: number, detailIndex: number) => {
    const newContactInfo = [...formData.contactInfo];
    newContactInfo[contactIndex].details = newContactInfo[contactIndex].details.filter((_, i) => i !== detailIndex);
    setFormData(prev => ({ ...prev, contactInfo: newContactInfo }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contact-title">หัวข้อส่วน</Label>
          <Input
            id="contact-title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-description">คำอธิบาย</Label>
          <Textarea
            id="contact-description"
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
          <Label htmlFor="contact-image-caption">คำอธิบายรูปภาพ</Label>
          <Input
            id="contact-image-caption"
            value={formData.imageCaption}
            onChange={(e) => handleInputChange('imageCaption', e.target.value)}
          />
        </div>
      </div>

      {/* Contact Info List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            ข้อมูลการติดต่อ
            <Button type="button" onClick={addContactInfo} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มข้อมูล
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.contactInfo.map((contact, contactIndex) => (
            <div key={contactIndex} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <Label>ข้อมูลติดต่อ {contactIndex + 1}</Label>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeContactInfo(contactIndex)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <Input
                value={contact.title}
                onChange={(e) => handleContactInfoChange(contactIndex, 'title', e.target.value)}
                placeholder="หัวข้อ"
              />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>รายละเอียด</Label>
                  <Button
                    type="button"
                    onClick={() => addDetail(contactIndex)}
                    size="sm"
                    variant="outline"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    เพิ่ม
                  </Button>
                </div>
                
                {contact.details.map((detail, detailIndex) => (
                  <div key={detailIndex} className="flex gap-2">
                    <Input
                      value={detail}
                      onChange={(e) => handleDetailChange(contactIndex, detailIndex, e.target.value)}
                      placeholder="รายละเอียด"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeDetail(contactIndex, detailIndex)}
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                ))}
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

export default ContactForm;