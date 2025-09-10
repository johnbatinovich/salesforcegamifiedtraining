import React from 'react';
import CertificateGenerator from './CertificateGenerator';

const CertificateModal = ({ 
  isOpen, 
  onClose, 
  userName = "Demo User",
  lessonTitle,
  moduleTitle,
  completionDate = new Date(),
  certificateId
}) => {
  if (!isOpen) return null;

  const handleShare = () => {
    // Simple share functionality
    if (navigator.share) {
      navigator.share({
        title: 'I completed a Dynamics 365 training lesson!',
        text: `I just completed "${lessonTitle}" in the ${moduleTitle} module.`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      const shareText = `I just completed "${lessonTitle}" in the ${moduleTitle} module! 🎉`;
      navigator.clipboard.writeText(shareText).then(() => {
        alert('Achievement copied to clipboard!');
      });
    }
  };

  const handleDownload = () => {
    console.log('Certificate download initiated');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                🏆
              </div>
              <div>
                <h2 className="text-2xl font-bold">Congratulations!</h2>
                <p className="text-green-100">You've earned a completion certificate</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors text-xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Achievement Summary */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full mb-4 text-2xl">
              🏆
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2">
              Lesson Complete!
            </h3>
            <p className="text-green-700">
              You have successfully completed all sections and passed all quizzes for this lesson.
              Your certificate is ready for download.
            </p>
          </div>

          {/* Certificate Preview and Download */}
          <CertificateGenerator
            userName={userName}
            lessonTitle={lessonTitle}
            moduleTitle={moduleTitle}
            completionDate={completionDate}
            certificateId={certificateId}
            onDownload={handleDownload}
          />

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button 
              onClick={handleShare}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span>📤</span>
              Share Achievement
            </button>
            
            <button 
              onClick={onClose}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Continue Learning
            </button>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-800 mb-2">What's Next?</h4>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Continue with the next lesson in this module</li>
              <li>• Complete all lessons to earn your module certificate</li>
              <li>• Apply your new skills in real-world scenarios</li>
              <li>• Share your achievement with colleagues and on social media</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;

