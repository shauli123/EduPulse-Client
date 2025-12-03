import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-gray-100 font-sans" dir="rtl">
            <Sidebar />
            <main className="mr-64 min-h-screen transition-all duration-300">
                <div className="container mx-auto p-6 max-w-7xl">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default Layout;
