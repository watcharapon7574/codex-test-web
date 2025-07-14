import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Activity } from 'lucide-react';
import EditableContent from '@/components/EditableContent';
import { useAdmin } from '@/contexts/AdminContext';
import { useState } from 'react';

const ActivitiesSection = () => {
  const { isAdmin } = useAdmin();
  const [activitiesTitle, setActivitiesTitle] = useState('กิจกรรม / โครงการเด่น');
  const [activitiesDescription, setActivitiesDescription] = useState('กิจกรรมและโครงการที่ออกแบบมาเพื่อส่งเสริมการพัฒนาเด็กพิเศษในทุกมิติ พร้อมสร้างประสบการณ์การเรียนรู้ที่สนุกสนานและมีประสิทธิภาพ');
  const activities = [
    {
      id: 1,
      title: 'โครงการพัฒนาทักษะสังคม',
      description: 'กิจกรรมส่งเสริมการปฏิสัมพันธ์ทางสังคมและการสื่อสารของเด็กพิเศษ ผ่านเกมและกิจกรรมกลุ่ม',
      date: '20 มีนาคม 2567',
      time: '09:00 - 12:00 น.',
      participants: '25 คน',
      status: 'เปิดรับสมัคร',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'วันกีฬาเด็กพิเศษ',
      description: 'การแข่งขันกีฬาและกิจกรรมนันทนาการเพื่อส่งเสริมสุขภาพและความมั่นใจในตนเอง',
      date: '15 เมษายน 2567',
      time: '08:00 - 16:00 น.',
      participants: '100 คน',
      status: 'เตรียมจัด',
      icon: Activity,
      color: 'bg-green-500'
    },
    {
      id: 3,
      title: 'เวิร์กช็อปศิลปะบำบัด',
      description: 'การใช้ศิลปะและงานฝีมือเป็นเครื่องมือในการพัฒนาความคิดสร้างสรรค์และทักษะการใช้มือ',
      date: '5 พฤษภาคม 2567',
      time: '13:00 - 16:00 น.',
      participants: '15 คน',
      status: 'เปิดรับสมัคร',
      icon: Activity,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      title: 'ค่ายดนตรีบำบัด',
      description: 'การใช้ดนตรีเป็นเครื่องมือในการบำบัดและพัฒนาทักษะการฟัง การจำ และการแสดงออก',
      date: '18 พฤษภาคม 2567',
      time: '09:00 - 15:00 น.',
      participants: '20 คน',
      status: 'เตรียมจัด',
      icon: Activity,
      color: 'bg-pink-500'
    },
    {
      id: 5,
      title: 'โครงการเรียนรู้การดำรงชีวิต',
      description: 'การฝึกทักษะการดำรงชีวิตประจำวัน เช่น การทำอาหาร การดูแลตนเอง และการใช้เงิน',
      date: '10 มิถุนายน 2567',
      time: '10:00 - 14:00 น.',
      participants: '18 คน',
      status: 'เปิดรับสมัคร',
      icon: Users,
      color: 'bg-orange-500'
    },
    {
      id: 6,
      title: 'งานแสดงผลงานนักเรียน',
      description: 'นิทรรศการแสดงผลงานและความสามารถของนักเรียน เพื่อสร้างความภาคภูมิใจและแรงบันดาลใจ',
      date: '25 มิถุนายน 2567',
      time: '09:00 - 17:00 น.',
      participants: '200 คน',
      status: 'เตรียมจัด',
      icon: Activity,
      color: 'bg-indigo-500'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'เปิดรับสมัคร':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'เตรียมจัด':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'เสร็จสิ้น':
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
      default:
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    }
  };

  return (
    <section id="activities" className="section-container">
      <div className="text-center mb-16">
        <h2 className="section-title">
          <EditableContent 
            title="หัวข้อส่วนกิจกรรม" 
            content={activitiesTitle} 
            onSave={setActivitiesTitle} 
          />
        </h2>
        <p className="section-subtitle">
          <EditableContent 
            title="คำอธิบายส่วนกิจกรรม" 
            content={activitiesDescription} 
            onSave={setActivitiesDescription}
            type="textarea"
          />
        </p>
      </div>

      {/* Activities Image */}
      <div className="mb-16">
        <div className="max-w-4xl mx-auto">
          <img 
            src="/lovable-uploads/d6a90565-3729-4851-a769-bc8bb5e2f68b.png" 
            alt="กิจกรรมและโครงการเด่น" 
            className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-card"
          />
          <p className="text-center text-muted-foreground mt-4">
            กิจกรรมการเรียนรู้และพัฒนาทักษะที่หลากหลาย
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activities.map((activity) => {
          const IconComponent = activity.icon;
          return (
            <Card 
              key={activity.id} 
              className="education-card border-0 shadow-card hover:shadow-card-hover relative overflow-hidden"
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-10">
                <Badge className={getStatusColor(activity.status)}>
                  {activity.status}
                </Badge>
              </div>

              <CardHeader className="pb-4">
                <div className={`w-16 h-16 ${activity.color} rounded-full flex items-center justify-center mb-4`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-primary leading-tight pr-20">
                  {activity.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {activity.description}
                </CardDescription>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2 text-primary" />
                    <span>{activity.date}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Activity className="w-4 h-4 mr-2 text-primary" />
                    <span>{activity.time}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="w-4 h-4 mr-2 text-primary" />
                    <span>จำนวนผู้เข้าร่วม: {activity.participants}</span>
                  </div>
                </div>

                {activity.status === 'เปิดรับสมัคร' && (
                  <Button 
                    className="w-full btn-primary mt-4"
                    onClick={() => {
                      const contactSection = document.querySelector('#contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    สมัครเข้าร่วม
                  </Button>
                )}

                {activity.status === 'เตรียมจัด' && (
                  <Button 
                    variant="outline" 
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white mt-4"
                  >
                    แจ้งเตือนเมื่อเปิดสมัคร
                  </Button>
                )}
              </CardContent>

              {/* Decorative Element */}
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-primary/5 rounded-full"></div>
            </Card>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center">
        <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-primary mb-4">
            มีกิจกรรมที่น่าสนใจหรือไม่?
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            ติดต่อเราเพื่อสอบถามรายละเอียดเพิ่มเติมหรือสมัครเข้าร่วมกิจกรรม
            ทีมงานของเราพร้อมให้คำแนะนำและดูแลลูกของคุณอย่างดีที่สุด
          </p>
          <Button 
            size="lg" 
            className="btn-primary text-lg px-8 py-4"
            onClick={() => {
              const contactSection = document.querySelector('#contact');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            ติดต่อสอบถาม
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ActivitiesSection;