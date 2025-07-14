import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAdmin } from '@/contexts/AdminContext';
import { Settings } from 'lucide-react';

// Import form components
import HeroForm from './admin-forms/HeroForm';
import AboutForm from './admin-forms/AboutForm';
import ServicesForm from './admin-forms/ServicesForm';
import ServiceUnitsForm from './admin-forms/ServiceUnitsForm';
import NewsForm from './admin-forms/NewsForm';
import ActivitiesForm from './admin-forms/ActivitiesForm';
import ContactForm from './admin-forms/ContactForm';

const AdminPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin } = useAdmin();

  if (!isAdmin) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-primary hover:bg-primary/90 shadow-lg z-50"
          size="icon"
        >
          <Settings className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            จัดการเนื้อหาเว็บไซต์
          </DialogTitle>
          <DialogDescription>
            แก้ไขเนื้อหาและรูปภาพในแต่ละส่วนของเว็บไซต์
          </DialogDescription>
        </DialogHeader>
        
        <Tabs defaultValue="hero" className="w-full h-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="hero">หน้าหลัก</TabsTrigger>
            <TabsTrigger value="about">เกี่ยวกับ</TabsTrigger>
            <TabsTrigger value="services">บริการ</TabsTrigger>
            <TabsTrigger value="units">หน่วยบริการ</TabsTrigger>
            <TabsTrigger value="news">ข่าวสาร</TabsTrigger>
            <TabsTrigger value="activities">กิจกรรม</TabsTrigger>
            <TabsTrigger value="contact">ติดต่อ</TabsTrigger>
          </TabsList>
          
          <div className="mt-4 max-h-[60vh] overflow-y-auto">
            <TabsContent value="hero">
              <HeroForm />
            </TabsContent>
            
            <TabsContent value="about">
              <AboutForm />
            </TabsContent>
            
            <TabsContent value="services">
              <ServicesForm />
            </TabsContent>
            
            <TabsContent value="units">
              <ServiceUnitsForm />
            </TabsContent>
            
            <TabsContent value="news">
              <NewsForm />
            </TabsContent>
            
            <TabsContent value="activities">
              <ActivitiesForm />
            </TabsContent>
            
            <TabsContent value="contact">
              <ContactForm />
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AdminPanel;