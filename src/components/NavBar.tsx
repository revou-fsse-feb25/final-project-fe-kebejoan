"use client";
import Link from "next/link";
import { LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "./ModeToggle";
import { SidebarTrigger } from "./ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { signOut } from "next-auth/react";

function handleSignout() {
	signOut({ callbackUrl: "/login" });
}

const NavBar = () => {
	const { user } = useAuth();

	return (
		<nav className="flex p-4 items-center justify-between">
			<SidebarTrigger className="cursor-pointer" />
			<div className="flex items-center gap-4">
				<Link href="/">Hello, {user?.name}</Link>
				<ModeToggle />
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>JD</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent sideOffset={10}>
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<User className="h-[1.2rem] w-[1.2rem] mr-2" />
							Profile
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Settings className="h-[1.2rem] w-[1.2rem] mr-2" />
							Settings
						</DropdownMenuItem>
						<DropdownMenuItem
							variant="destructive"
							onClick={() => handleSignout()}
						>
							<LogOut className="h-[1.2rem] w-[1.2rem] mr-2" />
							Logout
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	);
};

export default NavBar;
