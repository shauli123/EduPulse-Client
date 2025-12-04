import React, { useState } from 'react';
import { CheckCircle2, XCircle, Lightbulb } from 'lucide-react';

interface QuizQuestion {
    id: string;
    question: string;
    options: string[];
    correct_answer_index: number;
    explanation: string;
}

interface QuizProps {
    questions: QuizQuestion[];
    onComplete: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);
    const [score, setScore] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(
        new Array(questions.length).fill(false)
    );

    if (!questions || questions.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No quiz questions available</p>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];
    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    const handleAnswerSelect = (index: number) => {
        if (!showExplanation) {
            setSelectedAnswer(index);
        }
    };

    const handleSubmitAnswer = () => {
        if (selectedAnswer === null) return;

        const isCorrect = selectedAnswer === currentQuestion.correct_answer_index;

        if (isCorrect && !answeredQuestions[currentQuestionIndex]) {
            setScore(score + 1);
        }

        const newAnsweredQuestions = [...answeredQuestions];
        newAnsweredQuestions[currentQuestionIndex] = true;
        setAnsweredQuestions(newAnsweredQuestions);

        setShowExplanation(true);
    };

    const handleNextQuestion = () => {
        if (isLastQuestion) {
            onComplete(score);
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setShowExplanation(false);
        }
    };

    const getOptionClassName = (index: number) => {
        const baseClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200";

        if (!showExplanation) {
            return `${baseClass} ${selectedAnswer === index
                    ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700'
                }`;
        }

        if (index === currentQuestion.correct_answer_index) {
            return `${baseClass} border-green-500 bg-green-50 dark:bg-green-900/20`;
        }

        if (selectedAnswer === index && index !== currentQuestion.correct_answer_index) {
            return `${baseClass} border-red-500 bg-red-50 dark:bg-red-900/20`;
        }

        return `${baseClass} border-gray-200 dark:border-slate-700 opacity-50`;
    };

    return (
        <div className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                    <span>Score: {score}/{questions.length}</span>
                </div>
                <div className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300"
                        style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* Question */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-gray-100 dark:border-slate-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                    {currentQuestion.question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showExplanation}
                            className={getOptionClassName(index)}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-gray-900 dark:text-white">{option}</span>
                                {showExplanation && index === currentQuestion.correct_answer_index && (
                                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                                )}
                                {showExplanation && selectedAnswer === index && index !== currentQuestion.correct_answer_index && (
                                    <XCircle className="w-5 h-5 text-red-600" />
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Explanation */}
                {showExplanation && (
                    <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                        <div className="flex gap-3">
                            <Lightbulb className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-1">
                                    Explanation
                                </h4>
                                <p className="text-blue-800 dark:text-blue-400 text-sm">
                                    {currentQuestion.explanation}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="mt-6 flex gap-3">
                    {!showExplanation ? (
                        <button
                            onClick={handleSubmitAnswer}
                            disabled={selectedAnswer === null}
                            className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Submit Answer
                        </button>
                    ) : (
                        <button
                            onClick={handleNextQuestion}
                            className="flex-1 py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-700 hover:to-blue-700 transition-all"
                        >
                            {isLastQuestion ? 'Complete Quiz' : 'Next Question'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Quiz;
