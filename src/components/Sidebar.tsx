import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, BookOpen, Trophy, User, MessageSquare, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const menuItems = [
        { icon: Home, label: 'לוח בקרה', path: '/' },
        { icon: BookOpen, label: 'למידה', path: '/learn' },
        { icon: MessageSquare, label: 'Pulse AI', path: '/chat' },
        { icon: Trophy, label: 'הישגים', path: '/leaderboard' },
        { icon: User, label: 'פרופיל', path: '/profile' },
    ];

    return (
        <div className="h-screen w-64 bg-white dark:bg-slate-900 border-l border-gray-200 dark:border-slate-800 flex flex-col fixed right-0 top-0 z-50 transition-all duration-300">
            <div className="p-6 flex items-center justify-center border-b border-gray-100 dark:border-slate-800">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    EduPulse
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;

                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                                ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium'
                                : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'
                                }`}
                        >
                            <Icon size={20} className={isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 group-hover:text-gray-600'} />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-gray-100 dark:border-slate-800">
                <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                    <LogOut size={20} />
                    <span>התנתק</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
