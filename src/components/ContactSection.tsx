import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Contact, Home, Calendar } from 'lucide-react';
import EditableContent from '@/components/EditableContent';
import { useAdmin } from '@/contexts/AdminContext';
import { useState } from 'react';

const ContactSection = () => {
  const { isAdmin } = useAdmin();
  const [contactTitle, setContactTitle] = useState('ติดต่อเรา');
  const [contactDescription, setContactDescription] = useState('พร้อมให้คำปรึกษาและตอบข้อสงสัยเกี่ยวกับการศึกษาพิเศษ ติดต่อเราได้ทุกวันในเวลาทำการ');
  const contactInfo = [
    {
      icon: Home,
      title: 'ที่อยู่',
      details: [
        '123 ถนนพหลโยธิน ตำบลป่าตาล',
        'อำเภอเมือง จังหวัดลพบุรี 15000'
      ]
    },
    {
      icon: Contact,
      title: 'ติดต่อ',
      details: [
        'โทรศัพท์: 036-123-456',
        'แฟกซ์: 036-123-457',
        'อีเมล: info@specialed6.ac.th'
      ]
    },
    {
      icon: Calendar,
      title: 'เวลาทำการ',
      details: [
        'จันทร์ - ศุกร์: 08:00 - 16:30 น.',
        'เสาร์ - อาทิตย์: ปิดทำการ',
        'วันหยุดนักขัตฤกษ์: ปิดทำการ'
      ]
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('ขอบคุณสำหรับการติดต่อ! เราจะติดต่อกลับโดยเร็วที่สุด');
  };

  return (
    <section id="contact" className="section-container bg-gradient-to-b from-background to-accent/20">
      <div className="text-center mb-16">
        <h2 className="section-title">
          <EditableContent 
            title="หัวข้อส่วนติดต่อ" 
            content={contactTitle} 
            onSave={setContactTitle} 
          />
        </h2>
        <p className="section-subtitle">
          <EditableContent 
            title="คำอธิบายส่วนติดต่อ" 
            content={contactDescription} 
            onSave={setContactDescription}
            type="textarea"
          />
        </p>
      </div>

      {/* Contact Image */}
      <div className="mb-16">
        <div className="max-w-4xl mx-auto">
          <img 
            src="/lovable-uploads/d6a90565-3729-4851-a769-bc8bb5e2f68b.png" 
            alt="ติดต่อศูนย์การศึกษาพิเศษ" 
            className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-card"
          />
          <p className="text-center text-muted-foreground mt-4">
            ติดต่อเราเพื่อสอบถามข้อมูลและขอรับคำปรึกษา
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-8">
          <h3 className="text-2xl font-bold text-primary mb-6">ข้อมูลการติดต่อ</h3>
          
          {contactInfo.map((info, index) => {
            const IconComponent = info.icon;
            return (
              <Card key={index} className="education-card border-0 shadow-card">
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-bold text-primary">
                      {info.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  {info.details.map((detail, detailIndex) => (
                    <p key={detailIndex} className="text-muted-foreground mb-1">
                      {detail}
                    </p>
                  ))}
                </CardContent>
              </Card>
            );
          })}

          {/* Map Placeholder */}
          <Card className="education-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-primary">แผนที่</CardTitle>
              <CardDescription>
                ศูนย์การศึกษาพิเศษ เขตการศึกษา 6 จังหวัดลพบุรี
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary-light/20 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Home className="w-12 h-12 text-primary mx-auto mb-4" />
                  <p className="text-muted-foreground">แผนที่ตั้งศูนย์การศึกษา</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    คลิกเพื่อดูแผนที่ใน Google Maps
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div>
          <Card className="education-card border-0 shadow-card">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-primary">ส่งข้อความหาเรา</CardTitle>
              <CardDescription>
                กรอกข้อมูลด้านล่าง เราจะติดต่อกลับโดยเร็วที่สุด
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">ชื่อ *</Label>
                    <Input 
                      id="firstName" 
                      placeholder="ชื่อ" 
                      required 
                      className="border-input focus:border-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">นามสกุล *</Label>
                    <Input 
                      id="lastName" 
                      placeholder="นามสกุล" 
                      required 
                      className="border-input focus:border-primary"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">อีเมล *</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="example@email.com" 
                    required 
                    className="border-input focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">เบอร์โทรศัพท์</Label>
                  <Input 
                    id="phone" 
                    type="tel" 
                    placeholder="08X-XXX-XXXX" 
                    className="border-input focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">หัวข้อ *</Label>
                  <Input 
                    id="subject" 
                    placeholder="สอบถามเกี่ยวกับ..." 
                    required 
                    className="border-input focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">ข้อความ *</Label>
                  <Textarea 
                    id="message" 
                    placeholder="กรุณาอธิบายรายละเอียดที่ต้องการสอบถาม..."
                    className="min-h-[120px] border-input focus:border-primary"
                    required
                  />
                </div>

                <Button type="submit" className="w-full btn-primary text-lg py-6">
                  ส่งข้อความ
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  * ข้อมูลที่จำเป็นต้องกรอก<br />
                  เราจะตอบกลับภายใน 24 ชั่วโมง ในวันทำการ
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;