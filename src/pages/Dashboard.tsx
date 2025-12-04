import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAuth } from '../context/AuthContext';
import { Sparkles, BookOpen, TrendingUp } from 'lucide-react';

import CourseList from '../components/CourseList';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="space-y-8">
                <header>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        שלום, {user?.name || 'סטודנט'} 👋
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">
                        הנה מה שקורה בלמידה שלך היום
                    </p>
                </header>

                {/* AI Course Creation CTA */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white">
                    <div className="flex items-center justify-between">
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                                <Sparkles className="w-8 h-8" />
                                <h2 className="text-2xl font-bold">צור קורס מונחה AI</h2>
                            </div>
                            <p className="text-purple-100 mb-6 max-w-2xl">
                                הזן כל נושא ותן לבינה המלאכותית שלנו ליצור קורס מקיף עם שיעורים קצרים וחידונים אינטראקטיביים תוך דקות!
                            </p>
                            <button
                                onClick={() => navigate('/create-course')}
                                className="px-8 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-purple-50 transition-all shadow-lg hover:shadow-xl"
                            >
                                <span className="flex items-center gap-2">
                                    <BookOpen className="w-5 h-5" />
                                    צור קורס חדש
                                </span>
                            </button>
                        </div>
                        <div className="hidden lg:block text-8xl opacity-20">
                            🚀
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold">התקדמות יומית</h3>
                        </div>
                        <div className="text-3xl font-bold text-blue-600">85%</div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                                <span className="text-xl">🔥</span>
                            </div>
                            <h3 className="text-lg font-semibold">רצף למידה</h3>
                        </div>
                        <div className="text-3xl font-bold text-orange-500">{user?.streak || 0} ימים</div>
                    </div>

                    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                <span className="text-xl">⭐</span>
                            </div>
                            <h3 className="text-lg font-semibold">נקודות XP</h3>
                        </div>
                        <div className="text-3xl font-bold text-purple-600">{user?.xp || 0} XP</div>
                    </div>
                </div>

                {/* Course List */}
                <CourseList />
            </div>
        </Layout>
    );
};

export default Dashboard;
