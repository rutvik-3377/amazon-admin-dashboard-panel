
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  CreditCard,
  BarChart3,
  ChevronDown,
  LogOut,
  HelpCircle
} from "lucide-react";
import { cn } from '@/lib/utils';

type SidebarItemType = {
  icon: React.ReactNode;
  title: string;
  href: string;
  submenu?: {title: string; href: string}[];
};

const sidebarItems: SidebarItemType[] = [
  {
    icon: <LayoutDashboard className="h-5 w-5" />,
    title: "Dashboard",
    href: "/"
  },
  {
    icon: <Package className="h-5 w-5" />,
    title: "Products",
    href: "/products",
    submenu: [
      { title: "All Products", href: "/products" },
      { title: "Add New", href: "/products/add" },
      { title: "Categories", href: "/products/categories" }
    ]
  },
  {
    icon: <ShoppingCart className="h-5 w-5" />,
    title: "Orders",
    href: "/orders"
  },
  {
    icon: <Users className="h-5 w-5" />,
    title: "Customers",
    href: "/customers"
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Analytics",
    href: "/analytics"
  },
  {
    icon: <CreditCard className="h-5 w-5" />,
    title: "Payments",
    href: "/payments"
  },
  {
    icon: <Settings className="h-5 w-5" />,
    title: "Settings",
    href: "/settings"
  }
];

const Sidebar = () => {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (title: string) => {
    setOpenSubmenu(openSubmenu === title ? null : title);
  };

  return (
    <div className="h-full flex flex-col bg-amazon-blue text-white w-64 flex-shrink-0">
      <div className="p-4 border-b border-amazon-lightBlue">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-amazon-orange rounded-sm flex items-center justify-center font-bold text-black">
            A
          </div>
          <span className="text-xl font-semibold">Amazon Admin</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-3">
          {sidebarItems.map((item) => (
            <div key={item.title} className="mb-1">
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={cn(
                      "flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-amazon-lightBlue transition-colors",
                      openSubmenu === item.title && "bg-amazon-lightBlue"
                    )}
                  >
                    <span className="flex items-center gap-3">
                      {item.icon}
                      <span>{item.title}</span>
                    </span>
                    <ChevronDown 
                      className={cn(
                        "h-4 w-4 transition-transform", 
                        openSubmenu === item.title && "transform rotate-180"
                      )} 
                    />
                  </button>
                  
                  {openSubmenu === item.title && (
                    <div className="pl-10 mt-1 space-y-1">
                      {item.submenu.map((subitem) => (
                        <Link
                          key={subitem.title}
                          to={subitem.href}
                          className="block px-3 py-2 rounded-md text-sm hover:bg-amazon-lightBlue transition-colors"
                        >
                          {subitem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-amazon-lightBlue transition-colors"
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-amazon-lightBlue">
        <div className="flex flex-col space-y-2">
          <Link
            to="/help"
            className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-amazon-lightBlue transition-colors text-sm"
          >
            <HelpCircle className="h-4 w-4" />
            <span>Help & Documentation</span>
          </Link>
          <button className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-amazon-lightBlue transition-colors text-sm">
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
