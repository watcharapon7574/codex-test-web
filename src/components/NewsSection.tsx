import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, ArrowRight } from 'lucide-react';
import EditableContent from '@/components/EditableContent';
import { useAdmin } from '@/contexts/AdminContext';
import { useState } from 'react';

const NewsSection = () => {
  const { isAdmin } = useAdmin();
  const [newsTitle, setNewsTitle] = useState('ข่าวสาร / ประชาสัมพันธ์');
  const [newsDescription, setNewsDescription] = useState('ติดตามข่าวสารและกิจกรรมล่าสุดของศูนย์การศึกษาพิเศษ เพื่อไม่พลาดโอกาสดีๆ ในการพัฒนาและเรียนรู้');
  const news = [
    {
      id: 1,
      title: 'เปิดรับสมัครนักเรียนใหม่ ปีการศึกษา 2567',
      excerpt: 'ศูนย์การศึกษาพิเศษ เขตการศึกษา 6 จังหวัดลพบุรี เปิดรับสมัครนักเรียนใหม่สำหรับปีการศึกษา 2567 โดยมีหลักสูตรและโปรแกรมการศึกษาที่หลากหลาย',
      date: '15 มีนาคม 2567',
      category: 'ประชาสัมพันธ์',
      featured: true,
      image: '/api/placeholder/400/250'
    },
    {
      id: 2,
      title: 'อบรมผู้ปกครอง: การดูแลเด็กพิเศษในยุคดิจิทัล',
      excerpt: 'โครงการอบรมพิเศษสำหรับผู้ปกครองเพื่อเรียนรู้วิธีการดูแลและส่งเสริมการเรียนรู้ของเด็กพิเศษในยุคเทคโนโลยี',
      date: '8 มีนาคม 2567',
      category: 'กิจกรรม',
      featured: false,
      image: '/api/placeholder/400/250'
    },
    {
      id: 3,
      title: 'ผลงานเด็กพิเศษในงานแสดงศิลปกรรมระดับจังหวัด',
      excerpt: 'นักเรียนจากศูนย์การศึกษาพิเศษได้รับรางวัลชนะเลิศในการประกวดศิลปกรรมระดับจังหวัด สะท้อนถึงความสามารถและศักยภาพ',
      date: '2 มีนาคม 2567',
      category: 'ความสำเร็จ',
      featured: false,
      image: '/api/placeholder/400/250'
    },
    {
      id: 4,
      title: 'โครงการพัฒนาทักษะชีวิตผ่านกิจกรรมทำขนม',
      excerpt: 'โครงการใหม่ที่สอนทักษะการทำขนมเพื่อพัฒนาความมั่นใจและทักษะการดำรงชีวิตอิสระของนักเรียน',
      date: '25 กุมภาพันธ์ 2567',
      category: 'โครงการ',
      featured: false,
      image: '/api/placeholder/400/250'
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'ประชาสัมพันธ์':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'กิจกรรม':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'ความสำเร็จ':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'โครงการ':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <section id="news" className="section-container bg-gradient-to-b from-accent/20 to-background">
      <div className="text-center mb-16">
        <h2 className="section-title">
          <EditableContent 
            title="หัวข้อส่วนข่าวสาร" 
            content={newsTitle} 
            onSave={setNewsTitle} 
          />
        </h2>
        <p className="section-subtitle">
          <EditableContent 
            title="คำอธิบายส่วนข่าวสาร" 
            content={newsDescription} 
            onSave={setNewsDescription}
            type="textarea"
          />
        </p>
      </div>

      {/* News Image */}
      <div className="mb-16">
        <div className="max-w-4xl mx-auto">
          <img 
            src="/lovable-uploads/d6a90565-3729-4851-a769-bc8bb5e2f68b.png" 
            alt="ข่าวสารและกิจกรรม" 
            className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-card"
          />
          <p className="text-center text-muted-foreground mt-4">
            ข่าวสารและกิจกรรมต่างๆ ของศูนย์การศึกษาพิเศษ
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured News */}
        {news.filter(item => item.featured).map((item) => (
          <Card key={item.id} className="lg:col-span-2 education-card border-0 shadow-card hover:shadow-card-hover overflow-hidden">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary-light/20 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <p className="text-muted-foreground">รูปภาพข่าวสาร</p>
              </div>
            </div>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge className={getCategoryColor(item.category)}>
                  {item.category}
                </Badge>
                <span className="text-sm text-muted-foreground flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {item.date}
                </span>
              </div>
              <CardTitle className="text-2xl font-bold text-primary leading-tight">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed mb-4">
                {item.excerpt}
              </CardDescription>
              <Button className="btn-primary group">
                อ่านเพิ่มเติม
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* Regular News List */}
        <div className="space-y-6">
          {news.filter(item => !item.featured).map((item) => (
            <Card key={item.id} className="education-card border-0 shadow-card hover:shadow-card-hover">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <Badge className={getCategoryColor(item.category)} variant="secondary">
                    {item.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {item.date}
                  </span>
                </div>
                <CardTitle className="text-lg font-bold text-primary leading-tight">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm leading-relaxed mb-3">
                  {item.excerpt.substring(0, 100)}...
                </CardDescription>
                <Button variant="ghost" size="sm" className="text-primary hover:text-primary-foreground hover:bg-primary p-0">
                  อ่านต่อ
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* View All News Button */}
      <div className="text-center mt-12">
        <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
          ดูข่าวสารทั้งหมด
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </section>
  );
};

export default NewsSection;