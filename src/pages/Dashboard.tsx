import React from 'react';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <Layout>
            <div className="space-y-6">
                <header>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        שלום, {user?.name || 'סטודנט'} 👋
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        הנה מה שקורה בלמידה שלך היום
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <h3 className="text-lg font-semibold mb-2">התקדמות יומית</h3>
                        <div className="text-3xl font-bold text-blue-600">85%</div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <h3 className="text-lg font-semibold mb-2">רצף למידה</h3>
                        <div className="text-3xl font-bold text-orange-500">{user?.streak || 0} ימים</div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <h3 className="text-lg font-semibold mb-2">נקודות XP</h3>
                        <div className="text-3xl font-bold text-purple-600">{user?.xp || 0} XP</div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
