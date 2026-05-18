import Link from 'next/link';
import { Settings, Home, ListTodo } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b bg-background shadow-sm">
      <div className="max-w-4xl mx-auto flex h-16 items-center px-4 md:px-8">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <ListTodo className="h-6 w-6" />
          <span>تطبيق مهامي</span>
        </div>
        
        <div className="mr-auto flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
            <Home className="h-4 w-4" /> الرئيسية
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5">
            <Settings className="h-4 w-4" /> الإعدادات
          </Link>
        </div>
      </div>
    </nav>
  );
}
