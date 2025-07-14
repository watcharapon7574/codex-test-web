import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Home, Contact, Book, Users } from 'lucide-react';
import logo from '/lovable-uploads/941f5458-2738-43eb-a34c-9a47f1d5df31.png';

const Footer = () => {
  const quickLinks = [
    { name: 'เกี่ยวกับศูนย์ฯ', href: '#about', icon: Book },
    { name: 'บริการ', href: '#services', icon: Users },
    { name: 'ข่าวสาร', href: '#news', icon: Contact },
    { name: 'กิจกรรม', href: '#activities', icon: Users },
  ];

  const services = [
    'การศึกษาพิเศษ',
    'บำบัดและฟื้นฟู', 
    'ให้คำปรึกษาผู้ปกครอง',
    'บริการชุมชน'
  ];

  const policies = [
    'นโยบายความเป็นส่วนตัว',
    'เงื่อนไขการใช้งาน',
    'นโยบายคุกกี้',
    'นโยบายการคุ้มครองข้อมูล'
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-br from-primary/5 to-primary-light/10 border-t border-border">
      <div className="container max-w-screen-2xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Logo" className="h-12 w-12" />
              <div>
                <h3 className="font-bold text-primary text-lg">
                  ศูนย์การศึกษาพิเศษ
                </h3>
                <p className="text-muted-foreground text-sm">
                  เขตการศึกษา 6 จังหวัดลพบุรี
                </p>
              </div>
            </div>
            
            <p className="text-muted-foreground leading-relaxed">
              มุ่งมั่นในการให้บริการการศึกษาที่มีคุณภาพสำหรับเด็กที่มีความต้องการพิเศษ 
              ด้วยความเอาใจใส่และความใส่ใจในรายบุคคล
            </p>

            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start">
                <Home className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                <span>123 ถนนพหลโยธิน ตำบลป่าตาล อำเภอเมือง จังหวัดลพบุรี 15000</span>
              </div>
              <div className="flex items-center">
                <Contact className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                <span>036-123-456</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="font-bold text-primary text-lg">ลิงก์ด่วน</h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className="flex items-center text-muted-foreground hover:text-primary transition-colors text-left group"
                  >
                    <IconComponent className="w-4 h-4 mr-2 group-hover:text-primary" />
                    {link.name}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h4 className="font-bold text-primary text-lg">บริการของเรา</h4>
            <nav className="space-y-3">
              {services.map((service, index) => (
                <button
                  key={index}
                  onClick={() => handleNavClick('#services')}
                  className="block text-muted-foreground hover:text-primary transition-colors text-left"
                >
                  {service}
                </button>
              ))}
            </nav>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-6">
            <h4 className="font-bold text-primary text-lg">ติดต่อเรา</h4>
            
            <div className="space-y-4">
              <div>
                <p className="font-medium text-foreground mb-2">เวลาทำการ</p>
                <p className="text-sm text-muted-foreground">จันทร์ - ศุกร์</p>
                <p className="text-sm text-muted-foreground">08:00 - 16:30 น.</p>
              </div>

              <div>
                <p className="font-medium text-foreground mb-2">อีเมล</p>
                <p className="text-sm text-muted-foreground">info@specialed6.ac.th</p>
              </div>

              <Button 
                className="w-full btn-primary"
                onClick={() => handleNavClick('#contact')}
              >
                ติดต่อเราเลย
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-sm text-muted-foreground">
              © 2024 ศูนย์การศึกษาพิเศษ เขตการศึกษา 6 จังหวัดลพบุรี สงวนลิขสิทธิ์
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {policies.map((policy, index) => (
              <button
                key={index}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {policy}
              </button>
            ))}
          </div>
        </div>

        {/* Back to Top */}
        <div className="text-center mt-8">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="border-primary/20 text-primary hover:bg-primary hover:text-white"
          >
            กลับสู่ด้านบน ↑
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;