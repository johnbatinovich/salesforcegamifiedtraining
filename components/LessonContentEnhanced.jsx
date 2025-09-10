import React, { useState, useEffect } from 'react';
import QuizModal from '../quizzes/QuizModal';
import CertificateModal from '../certificates/CertificateModal';
import { quizzes } from '../data/quizzes';

const LessonContentEnhanced = ({ module, lesson }) => {
  const [completedSections, setCompletedSections] = useState(new Set());
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [showCertificate, setShowCertificate] = useState(false);

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem(`lesson-progress-${lesson.id}`);
    if (savedProgress) {
      setCompletedSections(new Set(JSON.parse(savedProgress)));
    }
  }, [lesson.id]);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(`lesson-progress-${lesson.id}`, JSON.stringify([...completedSections]));
  }, [completedSections, lesson.id]);

  // Check if lesson is complete
  useEffect(() => {
    if (lesson.sections && completedSections.size === lesson.sections.length) {
      setShowCertificate(true);
    }
  }, [completedSections, lesson.sections]);

  const handleSectionComplete = (sectionId) => {
    const quizKey = `${lesson.id}-${sectionId}`;
    const quiz = quizzes[quizKey];
    
    if (quiz) {
      setActiveQuiz({ ...quiz, sectionId });
    } else {
      // No quiz for this section, mark as complete
      markSectionComplete(sectionId);
    }
  };

  const handleQuizComplete = (sectionId, passed, score) => {
    setActiveQuiz(null);
    
    if (passed) {
      markSectionComplete(sectionId);
    } else {
      alert(`Quiz failed with ${score}%. You need 80% to pass. Please review the content and try again.`);
    }
  };

  const markSectionComplete = (sectionId) => {
    setCompletedSections(prev => new Set([...prev, sectionId]));
  };

  const isSectionCompleted = (sectionId) => {
    return completedSections.has(sectionId);
  };

  const getProgressPercentage = () => {
    if (!lesson.sections) return 0;
    return Math.round((completedSections.size / lesson.sections.length) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Lesson Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => window.history.back()}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            ← Back to Training Home
          </button>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{lesson.title}</h1>
        <p className="text-gray-600 mb-4">Module: {module.title}</p>
        
        {/* Progress Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold text-blue-800">Lesson Progress</span>
            <span className="text-blue-600">{completedSections.size}/{lesson.sections?.length || 0} Sections Complete</span>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-3">
            <div 
              className="bg-blue-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <p className="text-blue-700 text-sm mt-2">
            Complete all sections and pass their quizzes to earn your lesson certificate.
          </p>
        </div>
      </div>

      {/* Lesson Sections */}
      <div className="space-y-8">
        {lesson.sections?.map((section, index) => {
          const isCompleted = isSectionCompleted(section.id);
          
          return (
            <div 
              key={section.id}
              className={`border rounded-lg p-6 transition-all duration-300 ${
                isCompleted 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white border-gray-200'
              }`}
            >
              {/* Section Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    isCompleted ? 'bg-green-500' : 'bg-blue-500'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{section.title}</h2>
                    {isCompleted && (
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          ✓ Quiz Passed
                        </span>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Section Complete
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Section Content */}
              <div className="prose max-w-none mb-6">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>
              </div>

              {/* Section Actions */}
              {!isCompleted && (
                <div className="flex justify-end">
                  <button
                    onClick={() => handleSectionComplete(section.id)}
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-semibold"
                  >
                    Mark Section Complete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Lesson Summary */}
      {completedSections.size === lesson.sections?.length && (
        <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <div className="text-green-600 text-4xl mb-4">🎉</div>
          <h3 className="text-xl font-bold text-green-800 mb-2">Lesson Complete!</h3>
          <p className="text-green-700 mb-4">
            Congratulations! You've completed all sections and earned your certificate.
          </p>
          <button
            onClick={() => setShowCertificate(true)}
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
          >
            View Certificate
          </button>
        </div>
      )}

      {/* Quiz Modal */}
      {activeQuiz && (
        <QuizModal
          isOpen={!!activeQuiz}
          onClose={() => setActiveQuiz(null)}
          quiz={activeQuiz}
          onQuizComplete={(passed, score) => handleQuizComplete(activeQuiz.sectionId, passed, score)}
        />
      )}

      {/* Certificate Modal */}
      {showCertificate && (
        <CertificateModal
          isOpen={showCertificate}
          onClose={() => setShowCertificate(false)}
          userName="Demo User"
          lessonTitle={lesson.title}
          moduleTitle={module.title}
          completionDate={new Date()}
          certificateId={`D365-${module.id}-${lesson.id}-${Date.now()}`}
        />
      )}
    </div>
  );
};

export default LessonContentEnhanced;

