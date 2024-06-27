'use client';

import { usePathname } from 'next/navigation';
import Header from '@/Components/Header/Header';
import Footer from '@/Components/Footer/Footer';

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const hideHeaderFooter = pathname === '/sign-in' || pathname === '/sign-up';
    
    return (
        <>
            {!hideHeaderFooter && <Header />}
            <main>{children}</main>
            {!hideHeaderFooter && <Footer />}
        </>
    );
};

export default ClientWrapper;
