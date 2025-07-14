import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useContent } from '@/contexts/ContentContext';
import { useToast } from '@/hooks/use-toast';
import { Save, Plus, Trash2 } from 'lucide-react';

const ServiceUnitsForm = () => {
  const { content, updateContent } = useContent();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: content.serviceUnits.title,
    description: content.serviceUnits.description,
    units: [...content.serviceUnits.units]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent('serviceUnits', formData);
    toast({
      title: "บันทึกสำเร็จ",
      description: "ข้อมูลหน่วยบริการถูกอัพเดทแล้ว",
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleUnitChange = (index: number, field: string, value: string) => {
    const newUnits = [...formData.units];
    newUnits[index] = { ...newUnits[index], [field]: value };
    setFormData(prev => ({ ...prev, units: newUnits }));
  };

  const addUnit = () => {
    setFormData(prev => ({
      ...prev,
      units: [...prev.units, { name: '', district: '', facebookUrl: '' }]
    }));
  };

  const removeUnit = (index: number) => {
    setFormData(prev => ({
      ...prev,
      units: prev.units.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="units-title">หัวข้อส่วน</Label>
          <Input
            id="units-title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="units-description">คำอธิบาย</Label>
          <Textarea
            id="units-description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="min-h-[100px]"
          />
        </div>
      </div>

      {/* Service Units List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            หน่วยบริการ
            <Button type="button" onClick={addUnit} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มหน่วยบริการ
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.units.map((unit, index) => (
            <div key={index} className="grid grid-cols-1 gap-2 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <Label>หน่วยบริการ {index + 1}</Label>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeUnit(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <Input
                value={unit.name}
                onChange={(e) => handleUnitChange(index, 'name', e.target.value)}
                placeholder="ชื่อหน่วยบริการ"
              />
              
              <Input
                value={unit.district}
                onChange={(e) => handleUnitChange(index, 'district', e.target.value)}
                placeholder="อำเภอ"
              />
              
              <Input
                value={unit.facebookUrl}
                onChange={(e) => handleUnitChange(index, 'facebookUrl', e.target.value)}
                placeholder="ลิงก์ Facebook"
              />
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

export default ServiceUnitsForm;