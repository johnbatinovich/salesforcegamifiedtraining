import React, { useRef } from 'react';

const CertificateGenerator = ({ 
  userName = "Demo User", 
  lessonTitle, 
  moduleTitle, 
  completionDate = new Date(),
  certificateId,
  onDownload 
}) => {
  const certificateRef = useRef(null);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const generateCertificateId = () => {
    return certificateId || `D365-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  };

  const handleDownload = async () => {
    // Create a new window with the certificate content for printing
    const certificateContent = certificateRef.current;
    
    if (certificateContent) {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Certificate - ${lessonTitle}</title>
          <style>
            body {
              font-family: 'Times New Roman', serif;
              margin: 0;
              padding: 20px;
              background: white;
            }
            .certificate {
              max-width: 800px;
              margin: 0 auto;
              border: 8px solid #1e40af;
              padding: 40px;
              text-align: center;
              background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
            }
            .header {
              color: #1e40af;
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .title {
              font-size: 36px;
              color: #1e40af;
              margin: 20px 0;
              font-weight: bold;
            }
            .recipient {
              font-size: 28px;
              color: #374151;
              margin: 30px 0;
              font-style: italic;
            }
            .course-info {
              font-size: 20px;
              color: #374151;
              margin: 20px 0;
            }
            .completion-info {
              font-size: 16px;
              color: #6b7280;
              margin: 30px 0;
            }
            .signature-section {
              margin-top: 50px;
              display: flex;
              justify-content: space-between;
              align-items: center;
            }
            .signature {
              text-align: center;
              flex: 1;
            }
            .signature-line {
              border-top: 2px solid #374151;
              margin: 10px 20px;
              padding-top: 5px;
            }
            .logo {
              width: 60px;
              height: 60px;
              background: #1e40af;
              border-radius: 50%;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-size: 24px;
              font-weight: bold;
              margin-bottom: 20px;
            }
            .certificate-id {
              position: absolute;
              bottom: 20px;
              right: 20px;
              font-size: 12px;
              color: #9ca3af;
            }
            @media print {
              body { margin: 0; padding: 0; }
              .certificate { border: 8px solid #1e40af; }
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="logo">D365</div>
            <div class="header">Microsoft Dynamics 365 Training</div>
            <div class="title">Certificate of Completion</div>
            
            <div style="margin: 40px 0;">
              <div style="font-size: 18px; color: #6b7280;">This is to certify that</div>
              <div class="recipient">${userName}</div>
              <div style="font-size: 18px; color: #6b7280;">has successfully completed</div>
            </div>
            
            <div class="course-info">
              <strong>${lessonTitle}</strong><br>
              <em>${moduleTitle}</em>
            </div>
            
            <div class="completion-info">
              Completed on ${formatDate(completionDate)}<br>
              All sections completed with passing quiz scores
            </div>
            
            <div class="signature-section">
              <div class="signature">
                <div class="signature-line">Training Administrator</div>
              </div>
              <div style="text-align: center; flex: 0 0 100px;">
                <div style="width: 80px; height: 80px; background: #10b981; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: white; font-size: 30px;">✓</div>
              </div>
              <div class="signature">
                <div class="signature-line">Microsoft Dynamics 365</div>
              </div>
            </div>
            
            <div class="certificate-id">Certificate ID: ${generateCertificateId()}</div>
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      
      // Trigger print dialog
      setTimeout(() => {
        printWindow.print();
      }, 500);
    }
    
    if (onDownload) {
      onDownload();
    }
  };

  return (
    <div className="space-y-6">
      {/* Certificate Preview */}
      <div className="overflow-hidden border-2 border-gray-200 rounded-lg">
        <div 
          ref={certificateRef}
          className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 border-8 border-blue-600"
          style={{ aspectRatio: '4/3' }}
        >
          <div className="text-center space-y-6">
            {/* Logo */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-2xl font-bold">
              D365
            </div>
            
            {/* Header */}
            <div className="text-blue-600 text-xl font-bold">
              Microsoft Dynamics 365 Training
            </div>
            
            {/* Title */}
            <div className="text-3xl font-bold text-blue-600 mb-8">
              Certificate of Completion
            </div>
            
            {/* Recipient Section */}
            <div className="space-y-4">
              <div className="text-gray-600">This is to certify that</div>
              <div className="text-2xl font-bold text-gray-800 italic">
                {userName}
              </div>
              <div className="text-gray-600">has successfully completed</div>
            </div>
            
            {/* Course Info */}
            <div className="space-y-2">
              <div className="text-xl font-bold text-gray-800">
                {lessonTitle}
              </div>
              <div className="text-lg text-gray-600 italic">
                {moduleTitle}
              </div>
            </div>
            
            {/* Completion Info */}
            <div className="text-gray-600 space-y-1">
              <div className="flex items-center justify-center gap-2">
                <span>📅</span>
                <span>Completed on {formatDate(completionDate)}</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <span>✅</span>
                <span>All sections completed with passing quiz scores</span>
              </div>
            </div>
            
            {/* Signature Section */}
            <div className="flex items-end justify-between pt-8">
              <div className="text-center">
                <div className="border-t-2 border-gray-400 pt-2 px-8">
                  <div className="text-sm text-gray-600">Training Administrator</div>
                </div>
              </div>
              
              <div className="flex items-center justify-center w-20 h-20 bg-green-500 text-white rounded-full text-3xl">
                🏆
              </div>
              
              <div className="text-center">
                <div className="border-t-2 border-gray-400 pt-2 px-8">
                  <div className="text-sm text-gray-600">Microsoft Dynamics 365</div>
                </div>
              </div>
            </div>
            
            {/* Certificate ID */}
            <div className="text-xs text-gray-400 text-right">
              Certificate ID: {generateCertificateId()}
            </div>
          </div>
        </div>
      </div>
      
      {/* Download Button */}
      <div className="text-center">
        <button 
          onClick={handleDownload}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2 mx-auto"
        >
          <span>📥</span>
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default CertificateGenerator;

