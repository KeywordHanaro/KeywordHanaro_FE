import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { signOut } from 'next-auth/react';
import { RiLogoutBoxLine } from 'react-icons/ri';
import UserInfo from '../molecules/UserInfo';

export function AppSidebar() {
  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };
  return (
    <Sidebar side='right'>
      <SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>사용자 정보</SidebarGroupLabel>
          <SidebarGroupContent>
            <UserInfo />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>계정 관리</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} asChild>
                  <p className=''>
                    <RiLogoutBoxLine />
                    <span>로그아웃</span>
                  </p>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
