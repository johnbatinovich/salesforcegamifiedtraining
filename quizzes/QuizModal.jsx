import React, { useState, useEffect } from 'react';

const QuizModal = ({ 
  isOpen, 
  onClose, 
  quiz, 
  onQuizComplete 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (!quizStarted || !isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizStarted, isOpen]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleSubmitQuiz = () => {
    const score = calculateScore();
    const passed = score >= 80;
    onQuizComplete(passed, score);
    resetQuiz();
  };

  const calculateScore = () => {
    if (!quiz?.questions) return 0;
    
    let correct = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        correct++;
      }
    });
    
    return Math.round((correct / quiz.questions.length) * 100);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(300);
    setQuizStarted(false);
  };

  const startQuiz = () => {
    setQuizStarted(true);
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const allQuestionsAnswered = () => {
    return quiz?.questions?.every((_, index) => answers[index] !== undefined);
  };

  if (!isOpen || !quiz) return null;

  const currentQ = quiz.questions?.[currentQuestion];
  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{quiz.title}</h2>
              <p className="text-blue-100">Section: {quiz.section}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          {!quizStarted ? (
            /* Quiz Instructions */
            <div className="text-center space-y-6">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Quiz Instructions</h3>
                <div className="text-left space-y-2 text-gray-700">
                  <p>• This quiz contains {quiz.questions?.length || 0} questions</p>
                  <p>• Passing score: 80%</p>
                  <p>• Time limit: {formatTime(timeLeft)}</p>
                  <p>• You can navigate between questions before submitting</p>
                  <p>• Review your answers before final submission</p>
                </div>
              </div>
              
              <button 
                onClick={startQuiz}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Start Quiz
              </button>
            </div>
          ) : (
            /* Quiz Content */
            <div className="space-y-6">
              {/* Progress and Timer */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
                    <span>{Math.round(progress)}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="ml-6 text-right">
                  <div className="text-sm text-gray-600">Time Remaining</div>
                  <div className={`text-lg font-bold ${timeLeft < 60 ? 'text-red-600' : 'text-gray-800'}`}>
                    {formatTime(timeLeft)}
                  </div>
                </div>
              </div>

              {/* Question */}
              {currentQ && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Question {currentQuestion + 1}: {currentQ.question}
                  </h3>
                  
                  <div className="space-y-3">
                    {currentQ.options?.map((option, index) => (
                      <label 
                        key={index}
                        className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          answers[currentQuestion] === index 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${currentQuestion}`}
                          value={index}
                          checked={answers[currentQuestion] === index}
                          onChange={() => handleAnswerSelect(currentQuestion, index)}
                          className="mr-3"
                        />
                        <span className="text-gray-700">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between pt-6 border-t">
                <button
                  onClick={previousQuestion}
                  disabled={currentQuestion === 0}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {currentQuestion === quiz.questions.length - 1 ? (
                  <div className="text-center">
                    {!allQuestionsAnswered() && (
                      <p className="text-orange-600 text-sm mb-2">
                        Please answer all questions before submitting.
                      </p>
                    )}
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={!allQuestionsAnswered()}
                      className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                        allQuestionsAnswered()
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Submit Quiz
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={nextQuestion}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizModal;

