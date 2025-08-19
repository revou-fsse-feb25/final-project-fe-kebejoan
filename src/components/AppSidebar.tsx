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
  SidebarSeparator,
} from "@/components/ui/sidebar";
import {
  ChevronUp,
  ClipboardList,
  HardHat,
  Home,
  HomeIcon,
  Hourglass,
  LayoutDashboardIcon,
  LogOut,
  Projector,
  Settings2,
  User,
  User2,
  Users,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const userItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboardIcon />,
    url: "/main/dashboard",
  },
  {
    title: "Projects",
    icon: <HardHat />,
    url: "/main/projects",
  },
  {
    title: "Timesheet Reports",
    icon: <Hourglass />,
    url: "/main/timesheet",
  },
  {
    title: "Progress Reports",
    icon: <ClipboardList />,
    url: "/main/progress",
  },
];

const adminItems = [
  {
    title: "Users",
    icon: <Users />,
    url: "/main/users",
  },
];

const AppSidebar = () => {
  const admin = true; //change this dynamic

  const items = admin ? [...adminItems, ...userItems] : userItems;

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/main/dashboard">
                <img
                  src="/yok-mock.png"
                  alt="comp-logo"
                  width={32}
                  height={32}
                />
                <span>Eng. Tracker</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarSeparator />
          <SidebarGroupLabel>Navigation Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 />
                  John Doe
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings2 />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem variant="destructive">
                  <LogOut />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
