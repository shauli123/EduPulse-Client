import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { courseAPI } from '../services/api';
import Layout from '../components/Layout';
import Quiz from '../components/Quiz';
import { BookOpen, ChevronLeft, ChevronRight, CheckCircle, Clock, Trophy } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Lesson {
    id: string;
    title: string;
    content: string;
    lesson_order: number;
    duration_minutes: number;
    quizzes: any[];
}

interface Course {
    id: string;
    title: string;
    description: string;
    subject: string;
    lessons: Lesson[];
}

const CourseViewer = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [course, setCourse] = useState<Course | null>(null);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
    const [showQuiz, setShowQuiz] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [completedLessons, setCompletedLessons] = useState<Set<number>>(new Set());

    useEffect(() => {
        fetchCourse();
    }, [id]);

    const fetchCourse = async () => {
        try {
            setLoading(true);
            const response = await courseAPI.getCourseWithLessons(id!);
            setCourse(response.data);
            setLoading(false);
        } catch (err: any) {
            console.error('Error fetching course:', err);
            setError('Failed to load course');
            setLoading(false);
        }
    };

    const handleQuizComplete = async (score: number) => {
        const newCompleted = new Set(completedLessons);
        newCompleted.add(currentLessonIndex);
        setCompletedLessons(newCompleted);
        setShowQuiz(false);

        // Update progress on backend
        try {
            await courseAPI.updateProgress(id!, {
                lessonId: currentLesson.id,
                quizScore: score,
            });
        } catch (err) {
            console.error('Error updating progress:', err);
        }

        // Auto-advance to next lesson if not the last one
        if (currentLessonIndex < course!.lessons.length - 1) {
            setTimeout(() => {
                setCurrentLessonIndex(currentLessonIndex + 1);
            }, 1500);
        }
    };

    const handlePreviousLesson = () => {
        if (currentLessonIndex > 0) {
            setCurrentLessonIndex(currentLessonIndex - 1);
            setShowQuiz(false);
        }
    };

    const handleNextLesson = () => {
        if (currentLessonIndex < course!.lessons.length - 1) {
            setCurrentLessonIndex(currentLessonIndex + 1);
            setShowQuiz(false);
        }
    };

    if (loading) {
        return (
            <Layout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center space-y-4">
                        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                        <p className="text-gray-600 dark:text-gray-400">Loading course...</p>
                    </div>
                </div>
            </Layout>
        );
    }

    if (error || !course) {
        return (
            <Layout>
                <div className="text-center py-12">
                    <p className="text-red-600 dark:text-red-400">{error || 'Course not found'}</p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                        Back to Dashboard
                    </button>
                </div>
            </Layout>
        );
    }

    const currentLesson = course.lessons[currentLessonIndex];
    const progress = (completedLessons.size / course.lessons.length) * 100;

    return (
        <Layout>
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Course Header */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
                            <p className="text-purple-100 mb-4">{course.description}</p>
                            <div className="flex items-center gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-4 h-4" />
                                    <span>{course.lessons.length} Lessons</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Trophy className="w-4 h-4" />
                                    <span>{completedLessons.size} Completed</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-4xl font-bold">{Math.round(progress)}%</div>
                            <div className="text-sm text-purple-100">Complete</div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Lesson Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-gray-100 dark:border-slate-800 sticky top-6">
                            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">Lessons</h2>
                            <div className="space-y-2">
                                {course.lessons.map((lesson, index) => (
                                    <button
                                        key={lesson.id}
                                        onClick={() => {
                                            setCurrentLessonIndex(index);
                                            setShowQuiz(false);
                                        }}
                                        className={`w-full text-left p-3 rounded-xl transition-all ${currentLessonIndex === index
                                            ? 'bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-500'
                                            : 'bg-gray-50 dark:bg-slate-800 border-2 border-transparent hover:border-gray-300 dark:hover:border-slate-700'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex-1 min-w-0">
                                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                                    Lesson {lesson.lesson_order}
                                                </div>
                                                <div className="font-medium text-sm text-gray-900 dark:text-white truncate">
                                                    {lesson.title}
                                                </div>
                                                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    <Clock className="w-3 h-3" />
                                                    {lesson.duration_minutes} min
                                                </div>
                                            </div>
                                            {completedLessons.has(index) && (
                                                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-6">
                        {!showQuiz ? (
                            <>
                                {/* Lesson Content */}
                                <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-100 dark:border-slate-800">
                                    <div className="mb-6">
                                        <div className="text-sm text-purple-600 dark:text-purple-400 font-semibold mb-2">
                                            Lesson {currentLesson.lesson_order} of {course.lessons.length}
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                            {currentLesson.title}
                                        </h2>
                                    </div>

                                    <div className="prose prose-lg dark:prose-invert max-w-none">
                                        <ReactMarkdown>{currentLesson.content}</ReactMarkdown>
                                    </div>
                                </div>

                                {/* Navigation & Quiz Button */}
                                <div className="flex items-center justify-between gap-4">
                                    <button
                                        onClick={handlePreviousLesson}
                                        disabled={currentLessonIndex === 0}
                                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                        Previous
                                    </button>

                                    {currentLesson.quizzes && currentLesson.quizzes.length > 0 && (
                                        <button
                                            onClick={() => setShowQuiz(true)}
                                            className="px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
                                        >
                                            Take Quiz
                                        </button>
                                    )}

                                    <button
                                        onClick={handleNextLesson}
                                        disabled={currentLessonIndex === course.lessons.length - 1}
                                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        Next
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-gray-100 dark:border-slate-800">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                    Quiz: {currentLesson.title}
                                </h2>
                                <Quiz
                                    questions={currentLesson.quizzes}
                                    onComplete={handleQuizComplete}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default CourseViewer;
