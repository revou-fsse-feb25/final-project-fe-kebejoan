'use client';
import { usePathname } from "next/navigation";
import Header from "./header/page";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {

    const pathname = usePathname();
    const hideComponent = ['/login', '/register'].includes(pathname);


    return (
        <>
            {!hideComponent && <Header />}
                { children }
            {/* {!hideComponent && <FooterSection />} */}
        </>
    );
}