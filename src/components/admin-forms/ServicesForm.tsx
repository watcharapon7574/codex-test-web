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

const ServicesForm = () => {
  const { content, updateContent } = useContent();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: content.services.title,
    description: content.services.description,
    image: content.services.image,
    imageCaption: content.services.imageCaption,
    serviceList: [...content.services.serviceList]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent('services', formData);
    toast({
      title: "บันทึกสำเร็จ",
      description: "ข้อมูลส่วนบริการถูกอัพเดทแล้ว",
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleServiceChange = (index: number, field: string, value: any) => {
    const newServices = [...formData.serviceList];
    newServices[index] = { ...newServices[index], [field]: value };
    setFormData(prev => ({ ...prev, serviceList: newServices }));
  };

  const handleFeatureChange = (serviceIndex: number, featureIndex: number, value: string) => {
    const newServices = [...formData.serviceList];
    const newFeatures = [...newServices[serviceIndex].features];
    newFeatures[featureIndex] = value;
    newServices[serviceIndex] = { ...newServices[serviceIndex], features: newFeatures };
    setFormData(prev => ({ ...prev, serviceList: newServices }));
  };

  const addService = () => {
    setFormData(prev => ({
      ...prev,
      serviceList: [...prev.serviceList, { title: '', description: '', features: [''] }]
    }));
  };

  const removeService = (index: number) => {
    setFormData(prev => ({
      ...prev,
      serviceList: prev.serviceList.filter((_, i) => i !== index)
    }));
  };

  const addFeature = (serviceIndex: number) => {
    const newServices = [...formData.serviceList];
    newServices[serviceIndex].features.push('');
    setFormData(prev => ({ ...prev, serviceList: newServices }));
  };

  const removeFeature = (serviceIndex: number, featureIndex: number) => {
    const newServices = [...formData.serviceList];
    newServices[serviceIndex].features = newServices[serviceIndex].features.filter((_, i) => i !== featureIndex);
    setFormData(prev => ({ ...prev, serviceList: newServices }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="services-title">หัวข้อส่วน</Label>
          <Input
            id="services-title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="services-description">คำอธิบาย</Label>
          <Textarea
            id="services-description"
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
          <Label htmlFor="services-image-caption">คำอธิบายรูปภาพ</Label>
          <Input
            id="services-image-caption"
            value={formData.imageCaption}
            onChange={(e) => handleInputChange('imageCaption', e.target.value)}
          />
        </div>
      </div>

      {/* Services List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            รายการบริการ
            <Button type="button" onClick={addService} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มบริการ
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.serviceList.map((service, serviceIndex) => (
            <div key={serviceIndex} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <Label>บริการ {serviceIndex + 1}</Label>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeService(serviceIndex)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <Input
                value={service.title}
                onChange={(e) => handleServiceChange(serviceIndex, 'title', e.target.value)}
                placeholder="ชื่อบริการ"
              />
              
              <Textarea
                value={service.description}
                onChange={(e) => handleServiceChange(serviceIndex, 'description', e.target.value)}
                placeholder="คำอธิบายบริการ"
              />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>รายละเอียดบริการ</Label>
                  <Button
                    type="button"
                    onClick={() => addFeature(serviceIndex)}
                    size="sm"
                    variant="outline"
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    เพิ่ม
                  </Button>
                </div>
                
                {service.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => handleFeatureChange(serviceIndex, featureIndex, e.target.value)}
                      placeholder="รายละเอียด"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeFeature(serviceIndex, featureIndex)}
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

export default ServicesForm;