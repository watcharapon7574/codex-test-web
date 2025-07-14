function parseYouTubeToEmbed(url: string): string {
  try {
    const yt = new URL(url);
    if (yt.hostname === "youtu.be") {
      const id = yt.pathname.slice(1);
      const t = yt.searchParams.get("t");
      let embedUrl = `https://www.youtube.com/embed/${id}`;
      if (t) {
        const sec = t.replace('s','');
        embedUrl += `?start=${sec}`;
      }
      return embedUrl;
    }
    if (yt.hostname.includes("youtube.com")) {
      if (yt.pathname.startsWith("/embed/")) {
        return url;
      }
      const id = yt.searchParams.get("v");
      let embedUrl = `https://www.youtube.com/embed/${id}`;
      let params = [];
      if (yt.searchParams.has("t")) {
        const t = yt.searchParams.get("t");
        const sec = t?.replace('s','');
        params.push(`start=${sec}`);
      }
      if (params.length > 0) {
        embedUrl += `?${params.join("&")}`;
      }
      return embedUrl;
    }
    return url;
  } catch {
    return url;
  }
}

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useContent } from '@/contexts/ContentContext';
import { useToast } from '@/hooks/use-toast';
import { Save } from 'lucide-react';

const HeroForm = () => {
  const { content, updateContent } = useContent();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: content.hero.title,
    subtitle: content.hero.subtitle,
    description: content.hero.description,
    backgroundVideo: content.hero.backgroundVideo
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const embedVideo = parseYouTubeToEmbed(formData.backgroundVideo);
    const { backgroundVideo, ...rest } = formData;
    const { error } = await supabase
      .from('hero')
      .upsert({ id: 1, ...rest, background_video: embedVideo });

    if (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    updateContent('hero', { ...formData, backgroundVideo: embedVideo });
    toast({
      title: "บันทึกสำเร็จ",
      description: "ข้อมูลหน้าหลักถูกอัพเดทแล้ว",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="hero-title">หัวข้อหลัก</Label>
          <Input
            id="hero-title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="หัวข้อหลักของหน้าแรก"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hero-subtitle">หัวข้อรอง</Label>
          <Input
            id="hero-subtitle"
            value={formData.subtitle}
            onChange={(e) => handleInputChange('subtitle', e.target.value)}
            placeholder="หัวข้อรองของหน้าแรก"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hero-description">คำอธิบาย</Label>
          <Textarea
            id="hero-description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="คำอธิบายหลักของศูนย์"
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hero-video">YouTube Video URL</Label>
          <Input
            id="hero-video"
            value={formData.backgroundVideo}
            onChange={(e) => handleInputChange('backgroundVideo', e.target.value)}
            placeholder="https://www.youtube.com/embed/..."
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        <Save className="w-4 h-4 mr-2" />
        บันทึกการเปลี่ยนแปลง
      </Button>
    </form>
  );
};

export default HeroForm;