import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Course API methods
export const courseAPI = {
    generateCourse: (data: { subject: string; numLessons?: number; questionsPerLesson?: number; language?: string }) =>
        api.post('/courses/generate', data),

    getCourseWithLessons: (courseId: string) =>
        api.get(`/courses/${courseId}/lessons`),

    submitQuizAnswer: (courseId: string, lessonId: string, data: { quizId: string; selectedAnswerIndex: number }) =>
        api.post(`/courses/${courseId}/lessons/${lessonId}/quiz`, data),

    getCourses: () =>
        api.get('/courses'),

    updateProgress: (courseId: string, data: { lessonId?: string; quizScore?: number }) =>
        api.post(`/courses/${courseId}/progress`, data),
};

export default api;

