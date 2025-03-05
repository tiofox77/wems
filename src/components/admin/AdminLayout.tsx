import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  FileText,
  Image,
  Settings,
  Users,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Home,
  Globe,
  Handshake,
  Cog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogo } from "@/components/LogoProvider";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logoUrl } = useLogo();

  const handleLogout = () => {
    localStorage.removeItem("wemsAdminAuth");
    navigate("/wemsadmin");
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/wemsadmin/dashboard",
    },
    {
      title: "Seções",
      icon: <FileText className="h-5 w-5" />,
      path: "/wemsadmin/sections",
      submenu: [
        { title: "Hero Slider", path: "/wemsadmin/sections/hero" },
        { title: "Quem Somos", path: "/wemsadmin/sections/about" },
        { title: "Missão e Visão", path: "/wemsadmin/sections/mission" },
        { title: "Contato", path: "/wemsadmin/sections/contact" },
      ],
    },
    {
      title: "Serviços",
      icon: <Settings className="h-5 w-5" />,
      path: "/wemsadmin/services",
    },
    {
      title: "Clientes",
      icon: <Users className="h-5 w-5" />,
      path: "/wemsadmin/clients",
    },
    {
      title: "Parceiros",
      icon: <Handshake className="h-5 w-5" />,
      path: "/wemsadmin/partners",
    },
    {
      title: "Imagens",
      icon: <Image className="h-5 w-5" />,
      path: "/wemsadmin/images",
    },
    {
      title: "Configurações",
      icon: <Cog className="h-5 w-5" />,
      path: "/wemsadmin/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar for desktop */}
      <motion.aside
        initial={{ width: 250 }}
        animate={{ width: isSidebarOpen ? 250 : 80 }}
        transition={{ duration: 0.3 }}
        className={`bg-white dark:bg-slate-800 shadow-md hidden md:block overflow-hidden`}
      >
        <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          {isSidebarOpen ? (
            <div className="flex items-center">
              <img
                src={logoUrl}
                alt="WEMS Logo"
                className="h-8"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/wems-logo.png";
                }}
              />
              <span className="ml-2 font-bold text-lg">Admin</span>
            </div>
          ) : (
            <img
              src={logoUrl}
              alt="WEMS Logo"
              className="h-8 mx-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/wems-logo.png";
              }}
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="ml-auto"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => (
              <li key={index}>
                {item.submenu ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className={`w-full justify-start ${!isSidebarOpen ? "justify-center" : ""}`}
                      >
                        {item.icon}
                        {isSidebarOpen && (
                          <>
                            <span className="ml-2">{item.title}</span>
                            <ChevronDown className="h-4 w-4 ml-auto" />
                          </>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {item.submenu.map((subItem, subIndex) => (
                        <DropdownMenuItem key={subIndex} asChild>
                          <Link to={subItem.path}>{subItem.title}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link to={item.path}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start ${!isSidebarOpen ? "justify-center" : ""}`}
                    >
                      {item.icon}
                      {isSidebarOpen && (
                        <span className="ml-2">{item.title}</span>
                      )}
                    </Button>
                  </Link>
                )}
              </li>
            ))}
            <li className="pt-4 border-t border-slate-200 dark:border-slate-700 mt-4">
              <Button
                variant="ghost"
                className={`w-full justify-start ${!isSidebarOpen ? "justify-center" : ""} text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20`}
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                {isSidebarOpen && <span className="ml-2">Sair</span>}
              </Button>
            </li>
          </ul>
        </nav>
      </motion.aside>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white dark:bg-slate-800 shadow-md z-50">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src={logoUrl}
              alt="WEMS Logo"
              className="h-8"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/wems-logo.png";
              }}
            />
            <span className="ml-2 font-bold text-lg">Admin</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700"
          >
            <nav className="p-4">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    {item.submenu ? (
                      <div className="space-y-2">
                        <div className="flex items-center px-4 py-2 text-sm font-medium">
                          {item.icon}
                          <span className="ml-2">{item.title}</span>
                        </div>
                        <ul className="pl-8 space-y-1">
                          {item.submenu.map((subItem, subIndex) => (
                            <li key={subIndex}>
                              <Link
                                to={subItem.path}
                                className="block px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subItem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : (
                      <Link
                        to={item.path}
                        className="flex items-center px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.icon}
                        <span className="ml-2">{item.title}</span>
                      </Link>
                    )}
                  </li>
                ))}
                <li className="pt-4 border-t border-slate-200 dark:border-slate-700 mt-4">
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="ml-2">Sair</span>
                  </Button>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </div>

      {/* Main content */}
      <main className="flex-1 md:overflow-y-auto">
        <div className="md:hidden h-16"></div> {/* Spacer for mobile header */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 shadow-sm mb-4 md:mb-0">
          <h1 className="text-xl font-bold">Painel Administrativo WEMS</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" asChild>
              <a href="/" target="_blank" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                <span className="hidden md:inline">Ver Site</span>
              </a>
            </Button>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
