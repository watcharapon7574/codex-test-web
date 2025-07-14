import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, Users, Activity, Contact } from 'lucide-react';
import EditableContent from '@/components/EditableContent';
import { useAdmin } from '@/contexts/AdminContext';
import { useState } from 'react';

const ServicesSection = () => {
  const { isAdmin } = useAdmin();
  const [servicesTitle, setServicesTitle] = useState('บริการสำหรับเด็กพิเศษและผู้ปกครอง');
  const [servicesDescription, setServicesDescription] = useState('บริการครบวงจรที่ออกแบบมาเฉพาะเพื่อตอบสนองความต้องการของเด็กที่มีความต้องการพิเศษและสนับสนุนครอบครัวในทุกขั้นตอนของการพัฒนา');
  const services = [
    {
      icon: Book,
      title: 'การศึกษาพิเศษ',
      description: 'หลักสูตรการศึกษาที่ปรับให้เหมาะสมกับความต้องการของเด็กแต่ละคน',
      features: [
        'หลักสูตรเฉพาะบุคคล (IEP)',
        'การสอนแบบตัวต่อตัว',
        'การประเมินพัฒนาการ',
        'การบำบัดทางการศึกษา'
      ]
    },
    {
      icon: Activity,
      title: 'บำบัดและฟื้นฟู',
      description: 'บริการบำบัดครบวงจรเพื่อพัฒนาทักษะด้านต่างๆ',
      features: [
        'กายภาพบำบัด',
        'กิจกรรมบำบัด',
        'การบำบัดทางการพูด',
        'การบำบัดเชิงพฤติกรรม'
      ]
    },
    {
      icon: Users,
      title: 'ให้คำปรึกษาผู้ปกครอง',
      description: 'แนะนำและสนับสนุนครอบครัวในการดูแลเด็กพิเศษ',
      features: [
        'การให้คำปรึกษาครอบครัว',
        'โปรแกรมฝึกอบรมผู้ปกครอง',
        'กลุ่มสนับสนุนผู้ปกครอง',
        'แนวทางการดูแลในบ้าน'
      ]
    },
    {
      icon: Contact,
      title: 'บริการชุมชน',
      description: 'กิจกรรมและโครงการเพื่อสร้างสังคมที่เข้าใจและยอมรับ',
      features: [
        'โครงการรับรู้สังคม',
        'กิจกรรมชุมชน',
        'การประชาสัมพันธ์',
        'เครือข่ายองค์กรพันธมิตร'
      ]
    }
  ];

  return (
    <section id="services" className="section-container">
      <div className="text-center mb-16">
        <h2 className="section-title">
          <EditableContent 
            title="หัวข้อส่วนบริการ" 
            content={servicesTitle} 
            onSave={setServicesTitle} 
          />
        </h2>
        <p className="section-subtitle">
          <EditableContent 
            title="คำอธิบายส่วนบริการ" 
            content={servicesDescription} 
            onSave={setServicesDescription}
            type="textarea"
          />
        </p>
      </div>

      {/* Services Image */}
      <div className="mb-16">
        <div className="max-w-4xl mx-auto">
          <img 
            src="/lovable-uploads/d6a90565-3729-4851-a769-bc8bb5e2f68b.png" 
            alt="บริการการศึกษาพิเศษ" 
            className="w-full h-64 md:h-80 object-cover rounded-2xl shadow-card"
          />
          <p className="text-center text-muted-foreground mt-4">
            บริการการศึกษาและการบำบัดที่ครอบคลุมทุกความต้องการ
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {services.map((service, index) => (
          <Card 
            key={index} 
            className="education-card border-0 shadow-card hover:shadow-card-hover h-full"
          >
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mb-4">
                <service.icon className="w-10 h-10 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-primary mb-2">
                {service.title}
              </CardTitle>
              <CardDescription className="text-muted-foreground text-base leading-relaxed">
                {service.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full btn-primary" 
                onClick={() => {
                  const contactSection = document.querySelector('#contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                สอบถามรายละเอียด
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Call to Action */}
      <div className="mt-16 text-center bg-gradient-to-r from-primary to-primary-light rounded-2xl p-8 md:p-12 text-white">
        <h3 className="text-3xl font-bold mb-4">
          พร้อมที่จะเริ่มต้นการเดินทางแห่งการเรียนรู้หรือยัง?
        </h3>
        <p className="text-xl mb-8 opacity-90">
          ติดต่อเราเพื่อปรึกษาและวางแผนการศึกษาที่เหมาะสมกับลูกของคุณ
        </p>
        <Button 
          size="lg" 
          variant="outline" 
          className="bg-white/20 text-white border-white/30 hover:bg-white/30 backdrop-blur-sm text-lg px-8 py-4"
          onClick={() => {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
              contactSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          ติดต่อเราเลย
        </Button>
      </div>
    </section>
  );
};

export default ServicesSection;