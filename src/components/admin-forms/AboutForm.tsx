import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';
import { Save, Plus, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

const AboutForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    imageCaption: "",
    imageDescription: "",
    features: [],
    stats: [],
    mission_points: []
  });

  useEffect(() => {
    const fetchAbout = async () => {
      const { data, error } = await supabase.from('about').select('*').single();
      if (data) {
        setFormData({
          ...data,
          features: data.features || [],
          stats: data.stats || [],
          mission_points: data.mission_points || [],
          imageDescription: data.imageDescription || ""
        });
      }
    };
    fetchAbout();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from('about').upsert([{ ...formData, id: 1 }]);
    toast({
      title: error ? "เกิดข้อผิดพลาด" : "บันทึกสำเร็จ",
      description: error ? error.message : "ข้อมูลส่วนเกี่ยวกับถูกอัพเดทแล้ว",
      variant: error ? "destructive" : "default"
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const addFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, { image: '', title: '', description: '' }]
    }));
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleStatChange = (index: number, field: string, value: string) => {
    const newStats = [...formData.stats];
    newStats[index] = { ...newStats[index], [field]: value };
    setFormData(prev => ({ ...prev, stats: newStats }));
  };

  // Add/Remove Stat functions
  const addStat = () => {
    setFormData(prev => ({
      ...prev,
      stats: [...prev.stats, { number: '', label: '' }]
    }));
  };
  const removeStat = (index: number) => {
    setFormData(prev => ({
      ...prev,
      stats: prev.stats.filter((_, i) => i !== index)
    }));
  };

  const handleMissionChange = (index: number, field: string, value: string) => {
    const newMission = [...formData.mission_points];
    newMission[index] = { ...newMission[index], [field]: value };
    setFormData(prev => ({ ...prev, mission_points: newMission }));
  };

  const addMissionPoint = () => {
    setFormData(prev => ({
      ...prev,
      mission_points: [...prev.mission_points, { title: '', description: '' }]
    }));
  };

  const removeMissionPoint = (index: number) => {
    setFormData(prev => ({
      ...prev,
      mission_points: prev.mission_points.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="about-title">หัวข้อส่วน</Label>
          <Input
            id="about-title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="about-description">คำอธิบาย</Label>
          <Textarea
            id="about-description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        <ImageUpload
          currentImage={formData.image}
          onImageUpload={(url) => handleInputChange('image', url)}
          label="รูปภาพหลัก"
          storagePath="about/main.jpg"
        />

        <div className="space-y-2">
          <Label htmlFor="about-image-caption">คำอธิบายรูปภาพ</Label>
          <Input
            id="about-image-caption"
            value={formData.imageCaption}
            onChange={(e) => handleInputChange('imageCaption', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="about-image-description">คำอธิบายใต้ภาพกิจกรรม</Label>
          <Input
            id="about-image-description"
            value={formData.imageDescription}
            onChange={(e) => handleInputChange('imageDescription', e.target.value)}
          />
        </div>
      </div>

      {/* Features Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            จุดเด่น
            <Button type="button" onClick={addFeature} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              เพิ่ม
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.features.map((feature, index) => (
            <div key={index} className="grid grid-cols-1 gap-2 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <Label>จุดเด่น {index + 1}</Label>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeFeature(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <Label>เลือกรูปจุดเด่น</Label>
              <ImageUpload
                key={index}
                currentImage={feature.image}
                onImageUpload={(url) => handleFeatureChange(index, 'image', url)}
                label="เลือกรูปจุดเด่น"
                storagePath={`about/feature-${index}.jpg`}
              />
              <Label>ชื่อหัวข้อ</Label>
              <Input
                value={feature.title}
                onChange={(e) => handleFeatureChange(index, 'title', e.target.value)}
                placeholder="หัวข้อ"
              />
              <Label>รายละเอียด</Label>
              <Textarea
                value={feature.description}
                onChange={(e) => handleFeatureChange(index, 'description', e.target.value)}
                placeholder="คำอธิบาย"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Mission Points Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            พันธกิจของเรา
            <Button type="button" onClick={addMissionPoint} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              เพิ่ม
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.mission_points.map((mission, index) => (
            <div key={index} className="grid grid-cols-1 gap-2 p-4 border rounded-lg">
              <div className="flex justify-between items-center">
                <Label>พันธกิจ {index + 1}</Label>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeMissionPoint(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <Input
                value={mission.title}
                onChange={(e) => handleMissionChange(index, 'title', e.target.value)}
                placeholder="หัวข้อ"
              />
              <Textarea
                value={mission.description}
                onChange={(e) => handleMissionChange(index, 'description', e.target.value)}
                placeholder="คำอธิบาย"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Stats Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            สถิติ
            <Button type="button" onClick={addStat} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              เพิ่ม
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.stats.map((stat, index) => (
            <div key={index} className="grid grid-cols-2 gap-2 items-center">
              <Input
                value={stat.number}
                onChange={(e) => handleStatChange(index, 'number', e.target.value)}
                placeholder="ตัวเลข"
              />
              <div className="flex gap-2 items-center">
                <Input
                  value={stat.label}
                  onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                  placeholder="ป้ายกำกับ"
                />
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeStat(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
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

export default AboutForm;