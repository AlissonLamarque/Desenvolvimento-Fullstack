
import { Calendar, Home, PlusCircle, List, Users, Heart } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar';

const menuItems = [
  {
    title: "Início",
    url: "/",
    icon: Home,
  },
  {
    title: "Meus Pets",
    url: "/pets",
    icon: List,
  },
  {
    title: "Cadastrar Pet",
    url: "/add-pet",
    icon: PlusCircle,
  },
  {
    title: "Atendimentos",
    url: "/appointments",
    icon: Calendar,
  },
  {
    title: "Agendar Consulta",
    url: "/add-appointment",
    icon: Users,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-veterinary-primary" />
          <span className="text-lg font-bold text-gray-900">VetCare</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <p className="text-xs text-gray-500 text-center">
          Sistema de Gestão Veterinária
        </p>
      </SidebarFooter>
    </Sidebar>
  );
}
