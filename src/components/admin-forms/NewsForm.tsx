import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useContent } from '@/contexts/ContentContext';
import { useToast } from '@/hooks/use-toast';
import ImageUpload from '@/components/ImageUpload';
import { Save, Plus, Trash2 } from 'lucide-react';

const NewsForm = () => {
  const { content, updateContent } = useContent();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: content.news.title,
    description: content.news.description,
    image: content.news.image,
    imageCaption: content.news.imageCaption,
    articles: [...content.news.articles]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateContent('news', formData);
    toast({
      title: "บันทึกสำเร็จ",
      description: "ข้อมูลส่วนข่าวสารถูกอัพเดทแล้ว",
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArticleChange = (index: number, field: string, value: any) => {
    const newArticles = [...formData.articles];
    newArticles[index] = { ...newArticles[index], [field]: value };
    setFormData(prev => ({ ...prev, articles: newArticles }));
  };

  const addArticle = () => {
    setFormData(prev => ({
      ...prev,
      articles: [...prev.articles, {
        title: '',
        excerpt: '',
        date: '',
        category: 'ประชาสัมพันธ์',
        featured: false
      }]
    }));
  };

  const removeArticle = (index: number) => {
    setFormData(prev => ({
      ...prev,
      articles: prev.articles.filter((_, i) => i !== index)
    }));
  };

  const categories = ['ประชาสัมพันธ์', 'กิจกรรม', 'ความสำเร็จ', 'โครงการ'];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="news-title">หัวข้อส่วน</Label>
          <Input
            id="news-title"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="news-description">คำอธิบาย</Label>
          <Textarea
            id="news-description"
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
          <Label htmlFor="news-image-caption">คำอธิบายรูปภาพ</Label>
          <Input
            id="news-image-caption"
            value={formData.imageCaption}
            onChange={(e) => handleInputChange('imageCaption', e.target.value)}
          />
        </div>
      </div>

      {/* Articles List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            บทความข่าวสาร
            <Button type="button" onClick={addArticle} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              เพิ่มบทความ
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {formData.articles.map((article, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4">
              <div className="flex justify-between items-center">
                <Label>บทความ {index + 1}</Label>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeArticle(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              
              <Input
                value={article.title}
                onChange={(e) => handleArticleChange(index, 'title', e.target.value)}
                placeholder="หัวข้อข่าว"
              />
              
              <Textarea
                value={article.excerpt}
                onChange={(e) => handleArticleChange(index, 'excerpt', e.target.value)}
                placeholder="สาระสำคัญ"
              />

              <div className="grid grid-cols-2 gap-2">
                <Input
                  value={article.date}
                  onChange={(e) => handleArticleChange(index, 'date', e.target.value)}
                  placeholder="วันที่"
                />
                
                <Select
                  value={article.category}
                  onValueChange={(value) => handleArticleChange(index, 'category', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="หมวดหมู่" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`featured-${index}`}
                  checked={article.featured}
                  onCheckedChange={(checked) => handleArticleChange(index, 'featured', checked)}
                />
                <Label htmlFor={`featured-${index}`}>ข่าวเด่น</Label>
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

export default NewsForm;