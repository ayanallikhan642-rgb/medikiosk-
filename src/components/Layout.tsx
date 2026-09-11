import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bot, 
  FileText, 
  History, 
  FolderOpen, 
  Star, 
  User, 
  Settings, 
  LogOut,
  Menu,
  X,
  Leaf
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Bot, label: 'AI Case Taking', path: '/case-taking' },
    { icon: FileText, label: 'My Case Summary', path: '/case-summary' },
    { icon: History, label: 'Medical History', path: '/history' },
    { icon: FileText, label: 'Past Consultations', path: '/past-consultations' },
    { icon: FolderOpen, label: 'Reports & Documents', path: '/reports' },
    { icon: Star, label: 'Reviews & Feedback', path: '/reviews' },
    { icon: User, label: 'My Profile', path: '/profile' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "fixed top-0 left-0 h-full w-72 bg-[#004d40] text-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          "lg:static lg:block"
        )}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 p-2 rounded-lg">
              <Leaf className="w-6 h-6 text-[#004d40]" />
            </div>
            <span className="text-xl font-serif font-bold">MediKiosk</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/70 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-1 scrollbar-hide">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={({ isActive }) => cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-colors",
                isActive 
                  ? "bg-[#065f50] text-yellow-400 font-medium" 
                  : "text-white/80 hover:bg-[#065f50] hover:text-white"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-[#004d40] font-bold">
              RM
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">Rahul Mehta</p>
              <p className="text-sm text-emerald-300 truncate">PT-42945</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3 text-white/80 hover:bg-[#065f50] hover:text-white rounded-xl transition-colors mt-2"
          >
            <LogOut className="w-5 h-5" />
            <span>Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen w-full lg:w-[calc(100%-18rem)] overflow-hidden">
        {/* Mobile Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-4 flex items-center justify-between lg:hidden sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-gray-600">
              <Menu className="w-6 h-6" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-[#004d40]" />
            <span className="font-serif font-bold text-[#004d40]">MediKiosk</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-[#004d40] font-bold text-sm">
            RM
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
