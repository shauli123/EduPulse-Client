import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseAPI } from '../services/api';
import Layout from '../components/Layout';
import { Sparkles, BookOpen, Loader2 } from 'lucide-react';

const CreateCourse = () => {
    const navigate = useNavigate();
    const [subject, setSubject] = useState('');
    const [numLessons, setNumLessons] = useState(5);
    const [language, setLanguage] = useState('Hebrew');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [progress, setProgress] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!subject.trim()) {
            setError('אנא הזן נושא לקורס');
            return;
        }

        setLoading(true);
        setError('');
        setProgress('יוצר מתווה קורס...');

        try {
            const response = await courseAPI.generateCourse({
                subject,
                numLessons,
                language,
                questionsPerLesson: 5,
            });

            setProgress('הקורס נוצר בהצלחה!');

            // Navigate to the course viewer after a short delay
            setTimeout(() => {
                navigate(`/course/${response.data.course.id}`);
            }, 1500);
        } catch (err: any) {
            console.error('Error generating course:', err);
            setError(err.response?.data?.message || 'יצירת הקורס נכשלה. אנא נסה שוב.');
            setLoading(false);
            setProgress('');
        }
    };

    const suggestions = [
        'מבוא לתכנות פייתון',
        'מלחמת העולם השנייה',
        'יסודות הפיזיקה הקוונטית',
        'יסודות השיווק הדיגיטלי',
        'שינויי אקלים וקיימות',
        'מבוא ללמידת מכונה',
    ];

    return (
        <Layout>
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Header */}
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl mb-4">
                        <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        צור קורס מונחה AI
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                        הזן כל נושא והבינה המלאכותית שלנו תייצר קורס מקיף עם שיעורים קצרים וחידונים אינטראקטיביים
                    </p>
                </div>

                {/* Main Form */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Subject Input */}
                        <div>
                            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                נושא הקורס *
                            </label>
                            <input
                                type="text"
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="לדוגמה: מבוא לתכנות פייתון"
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                disabled={loading}
                                dir="rtl"
                            />
                        </div>

                        {/* Suggestions */}
                        <div>
                            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                הצעות פופולריות:
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {suggestions.map((suggestion) => (
                                    <button
                                        key={suggestion}
                                        type="button"
                                        onClick={() => setSubject(suggestion)}
                                        disabled={loading}
                                        className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-400 transition-all text-sm font-medium disabled:opacity-50"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="numLessons" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    מספר שיעורים
                                </label>
                                <select
                                    id="numLessons"
                                    value={numLessons}
                                    onChange={(e) => setNumLessons(Number(e.target.value))}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    disabled={loading}
                                    dir="rtl"
                                >
                                    <option value={3}>3 שיעורים</option>
                                    <option value={5}>5 שיעורים</option>
                                    <option value={7}>7 שיעורים</option>
                                    <option value={10}>10 שיעורים</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="language" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                    שפה
                                </label>
                                <select
                                    id="language"
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    disabled={loading}
                                    dir="rtl"
                                >
                                    <option value="Hebrew">עברית</option>
                                    <option value="English">אנגלית</option>
                                    <option value="Spanish">ספרדית</option>
                                    <option value="French">צרפתית</option>
                                </select>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800" dir="rtl">
                                <p className="text-red-700 dark:text-red-400 text-sm">{error}</p>
                            </div>
                        )}

                        {/* Progress Message */}
                        {progress && (
                            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800" dir="rtl">
                                <p className="text-blue-700 dark:text-blue-400 text-sm font-medium">{progress}</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading || !subject.trim()}
                            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    יוצר קורס...
                                </>
                            ) : (
                                <>
                                    <BookOpen className="w-5 h-5" />
                                    צור קורס
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800">
                        <div className="text-3xl mb-2">🎯</div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">שיעורים קצרים</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            כל שיעור מעוצב להיות קליט ומרתק
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 p-6 rounded-2xl border border-orange-100 dark:border-orange-800">
                        <div className="text-3xl mb-2">📝</div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">חידונים אינטראקטיביים</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            בדוק את הידע שלך עם חידונים שנוצרו על ידי AI
                        </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 p-6 rounded-2xl border border-green-100 dark:border-green-800">
                        <div className="text-3xl mb-2">🚀</div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">יצירה מיידית</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            קבל קורס מלא תוך דקות, לא שעות
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CreateCourse;
