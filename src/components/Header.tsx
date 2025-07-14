import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Search, Menu, X } from 'lucide-react';
import AdminLogin from '@/components/AdminLogin';
import { useAdmin } from '@/contexts/AdminContext';
import logo from '/lovable-uploads/941f5458-2738-43eb-a34c-9a47f1d5df31.png';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin } = useAdmin();

  const navigation = [
    { name: 'หน้าหลัก', href: '#home' },
    { name: 'เกี่ยวกับศูนย์ฯ', href: '#about' },
    { name: 'บริการ', href: '#services' },
    { name: 'ข่าวสาร', href: '#news' },
    { name: 'กิจกรรม', href: '#activities' },
    { name: 'ติดต่อเรา', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <div className="hidden sm:block">
            <h1 className="text-lg font-bold text-primary">
              ศูนย์การศึกษาพิเศษ เขตการศึกษา 6
            </h1>
            <p className="text-sm text-muted-foreground">จังหวัดลพบุรี</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.href)}
              className="nav-link text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Search and Mobile Menu */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="hidden md:flex">
            <Search className="h-4 w-4" />
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="block">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <img src={logo} alt="Logo" className="h-8 w-8" />
                  <span className="font-bold text-primary">ศูนย์การศึกษาพิเศษ</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <nav className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="text-left py-2 px-4 rounded-lg text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {item.name}
                  </button>
                ))}
                
                {/* Admin Section */}
                <div className="border-t border-border pt-4 mt-6">
                  <div className="mb-2">
                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                      {isAdmin ? 'โหมดแก้ไข' : 'การจัดการ'}
                    </span>
                  </div>
                  <AdminLogin />
                  {isAdmin && (
                    <div className="mt-2 p-2 bg-green-50 rounded-md">
                      <span className="text-xs text-green-700">
                        🛡️ คุณอยู่ในโหมดแก้ไข
                      </span>
                    </div>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;