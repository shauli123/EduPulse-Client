import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { courseAPI } from '../services/api';
import { BookOpen, Clock, ChevronLeft, Loader2 } from 'lucide-react';

interface Course {
    id: string;
    title: string;
    description: string;
    num_lessons: number;
    created_at: string;
}

const CourseList = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            const response = await courseAPI.getCourses();
            // The API returns the array directly, not wrapped in an object
            const coursesData = Array.isArray(response.data) ? response.data : [];
            setCourses(coursesData);
        } catch (err) {
            console.error('Error fetching courses:', err);
            setError('לא הצלחנו לטעון את הקורסים שלך. אנא נסה שוב מאוחר יותר.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
                <button
                    onClick={fetchCourses}
                    className="mt-4 text-purple-600 hover:underline"
                >
                    נסה שוב
                </button>
            </div>
        );
    }

    if (courses.length === 0) {
        return (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                    <BookOpen className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">אין קורסים עדיין</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
                    נראה שעדיין לא יצרת קורסים. זה הזמן המושלם להתחיל ללמוד משהו חדש!
                </p>
                <button
                    onClick={() => navigate('/create-course')}
                    className="px-6 py-2 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
                >
                    צור קורס ראשון
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">הקורסים שלי</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="group bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800 hover:shadow-xl hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-300 flex flex-col"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl group-hover:bg-purple-100 dark:group-hover:bg-purple-900/40 transition-colors">
                                <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                            </div>
                            <span className="text-xs font-medium px-2.5 py-1 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-lg">
                                {course.num_lessons} שיעורים
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
                            {course.title}
                        </h3>

                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-2 flex-1">
                            {course.description}
                        </p>

                        <button
                            onClick={() => navigate(`/course/${course.id}`)}
                            className="w-full py-2.5 px-4 bg-gray-50 dark:bg-slate-800 hover:bg-purple-600 hover:text-white text-gray-900 dark:text-white rounded-xl font-medium transition-all flex items-center justify-center gap-2 group-hover:shadow-md"
                        >
                            המשך למידה
                            <ChevronLeft className="w-4 h-4 rotate-180" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CourseList;
