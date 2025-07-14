import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAdmin } from '@/contexts/AdminContext';
import { LogIn, LogOut, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { isAdmin, login, logout } = useAdmin();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      toast({
        title: "เข้าสู่ระบบสำเร็จ",
        description: "คุณสามารถแก้ไขข้อมูลได้แล้ว",
      });
      setIsOpen(false);
      setPassword('');
    } else {
      toast({
        title: "รหัสผ่านไม่ถูกต้อง",
        description: "กรุณาตรวจสอบรหัสผ่านแล้วลองใหม่",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "ออกจากระบบแล้ว",
      description: "กลับสู่โหมดการดูทั่วไป",
    });
  };

  if (isAdmin) {
    return (
      <Button 
        variant="ghost" 
        onClick={handleLogout}
        className="w-full justify-start text-left bg-red-50 hover:bg-red-100 text-red-700"
      >
        <LogOut className="w-4 h-4 mr-2" />
        ออกจากระบบ Admin
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start text-left">
          <Shield className="w-4 h-4 mr-2" />
          Admin Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            เข้าสู่ระบบผู้ดูแลระบบ
          </DialogTitle>
          <DialogDescription>
            กรุณาใส่รหัสผ่านเพื่อเข้าสู่โหมดแก้ไขข้อมูล
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">รหัสผ่าน</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="กรุณาใส่รหัสผ่าน"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            <LogIn className="w-4 h-4 mr-2" />
            เข้าสู่ระบบ
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AdminLogin;