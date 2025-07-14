import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Contact, Home, Users } from 'lucide-react';

const ServiceUnitsSection = () => {
  const serviceUnits = [
    {
      id: 1,
      name: 'หน่วยบริการหนองม่วง',
      facebookUrl: 'https://www.facebook.com/profile.php?id=100057078505352',
      district: 'อำเภอหนองม่วง'
    },
    {
      id: 2,
      name: 'หน่วยบริการโคกเจริญ',
      facebookUrl: 'https://www.facebook.com/profile.php?id=100057482198011',
      district: 'อำเภอโคกเจริญ'
    },
    {
      id: 3,
      name: 'หน่วยบริการสระโบสถ์',
      facebookUrl: 'https://www.facebook.com/sabotunit',
      district: 'อำเภอสระโบสถ์'
    },
    {
      id: 4,
      name: 'หน่วยบริการท่าวุ้ง',
      facebookUrl: 'https://www.facebook.com/profile.php?id=100041453576705',
      district: 'อำเภอท่าวุ้ง'
    },
    {
      id: 5,
      name: 'หน่วยบริการบ้านหมี่',
      facebookUrl: 'https://www.facebook.com/profile.php?id=61565519155307',
      district: 'อำเภอบ้านหมี่'
    },
    {
      id: 6,
      name: 'หน่วยบริการท่าหลวง',
      facebookUrl: 'https://www.facebook.com/profile.php?id=100063575322291',
      district: 'อำเภอท่าหลวง'
    },
    {
      id: 7,
      name: 'หน่วยบริการชัยบาดาล',
      facebookUrl: 'https://www.facebook.com/profile.php?id=100063748895134',
      district: 'อำเภอชัยบาดาล'
    },
    {
      id: 8,
      name: 'หน่วยบริการอำเภอเมือง',
      facebookUrl: 'https://www.facebook.com/profile.php?id=100063639993195',
      district: 'อำเภอเมืองลพบุรี'
    },
    {
      id: 9,
      name: 'หน่วยบริการลำสนธิ',
      facebookUrl: 'https://www.facebook.com/profile.php?id=100057516246242',
      district: 'อำเภอลำสนธิ'
    },
    {
      id: 10,
      name: 'หน่วยบริการพัฒนานิคม',
      facebookUrl: 'https://www.facebook.com/SKS.LB.Phatthananikhom',
      district: 'อำเภอพัฒนานิคม'
    },
    {
      id: 11,
      name: 'หน่วยบริการโคกสำโรง',
      facebookUrl: 'https://www.facebook.com/profile.php?id=100087143725721',
      district: 'อำเภอโคกสำโรง'
    }
  ];

  const handleContactUnit = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="section-container bg-gradient-to-b from-background to-accent/20">
      <div className="text-center mb-16">
        <h2 className="section-title">หน่วยบริการการศึกษาพิเศษ</h2>
        <p className="section-subtitle">
          ศูนย์การศึกษาพิเศษ เขตการศึกษา 6 จังหวัดลพบุรี มีการให้บริการทางการศึกษาโดยหน่วยบริการ 11 อำเภอของจังหวัดลพบุรี 
          ผู้ปกครองหรือหน่วยงานที่เกี่ยวข้องสามารถติดต่อตามลิงก์ของแต่ละหน่วยบริการ
        </p>
      </div>

      {/* Service Units Accordion */}
      <div className="max-w-4xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="service-units" className="border border-border rounded-lg shadow-card">
            <AccordionTrigger className="px-6 py-4 hover:no-underline">
              <div className="flex items-center space-x-4 text-left">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary">
                    หน่วยบริการทั้ง 11 อำเภอ
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    คลิกเพื่อดูรายชื่อและข้อมูลติดต่อ
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {serviceUnits.map((unit) => (
                  <Card 
                    key={unit.id} 
                    className="border border-border/50 hover:border-primary/30 transition-colors group"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Home className="w-4 h-4 text-primary" />
                        </div>
                        <span className="text-xs text-muted-foreground bg-primary/5 px-2 py-1 rounded-md">
                          #{unit.id}
                        </span>
                      </div>
                      <CardTitle className="text-base font-bold text-primary leading-tight">
                        {unit.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {unit.district}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-0">
                      <Button 
                        size="sm"
                        className="w-full bg-primary/90 hover:bg-primary text-white"
                        onClick={() => handleContactUnit(unit.facebookUrl)}
                      >
                        <Contact className="w-3 h-3 mr-2" />
                        ติดต่อ Facebook
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Information Box */}
      <div className="mt-16 bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-2xl p-8 md:p-12 text-center">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold text-primary mb-4">
            ข้อมูลสำหรับผู้ปกครองและหน่วยงานที่เกี่ยวข้อง
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            แต่ละหน่วยบริการมีทีมงานที่พร้อมให้คำปรึกษาและสนับสนุนการศึกษาพิเศษในพื้นที่ 
            สามารถติดต่อสอบถามข้อมูลเพิ่มเติมหรือขอรับบริการได้โดยตรง
          </p>
          <div className="text-sm text-muted-foreground">
            <p>📞 สอบถามข้อมูลทั่วไป: 036-123-456</p>
            <p>📧 อีเมล: info@specialed6.ac.th</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceUnitsSection;