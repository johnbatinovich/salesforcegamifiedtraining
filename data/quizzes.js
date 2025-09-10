// Quiz questions for each lesson section
// Key format: "{lessonId}-{sectionId}"

export const quizzes = {
  // Welcome to Dynamics 365 - Training Overview section
  'welcome-overview': {
    title: 'Training Overview Quiz',
    section: 'Training Overview',
    questions: [
      {
        question: 'This training is specifically designed for which industry?',
        type: 'multiple-choice',
        options: [
          'General CRM usage',
          'Broadcast advertising sales professionals',
          'Manufacturing processes',
          'Healthcare management'
        ],
        correct: 1
      },
      {
        question: 'Dynamics 365 helps transform customer relationship management in broadcast advertising.',
        type: 'true-false',
        options: ['True', 'False'],
        correct: 0
      },
      {
        question: 'What is the main goal of this training in the broadcast advertising landscape?',
        type: 'multiple-choice',
        options: [
          'Educational landscape',
          'Competitive broadcast advertising landscape',
          'Healthcare landscape',
          'Manufacturing landscape'
        ],
        correct: 1
      }
    ]
  },

  // Welcome to Dynamics 365 - Learning Objectives section
  'welcome-learning-objectives': {
    title: 'Learning Objectives Quiz',
    section: 'What You\'ll Learn',
    questions: [
      {
        question: 'How many essential modules does this training program cover?',
        type: 'multiple-choice',
        options: ['5', '6', '7', '8'],
        correct: 2
      },
      {
        question: 'Which module focuses on real-world scenario practice?',
        type: 'multiple-choice',
        options: [
          'Introduction & Welcome',
          'Lead Management',
          'Capstone Module',
          'Resources & Next Steps'
        ],
        correct: 2
      },
      {
        question: 'The training includes integration with Microsoft ecosystem tools like Teams and Outlook.',
        type: 'true-false',
        options: ['True', 'False'],
        correct: 0
      }
    ]
  },

  // Welcome to Dynamics 365 - Workflow section
  'welcome-workflow': {
    title: 'Sales Workflow Quiz',
    section: 'Broadcast Advertising Sales Workflow',
    questions: [
      {
        question: 'What is the first stage in the broadcast advertising sales workflow?',
        type: 'multiple-choice',
        options: [
          'Qualification',
          'Lead Generation',
          'Proposal Creation',
          'Negotiation'
        ],
        correct: 1
      },
      {
        question: 'How many stages are there in the typical broadcast advertising sales workflow?',
        type: 'multiple-choice',
        options: ['4', '5', '6', '7'],
        correct: 2
      },
      {
        question: 'Dynamics 365 provides specific tools and processes for each stage of the sales workflow.',
        type: 'true-false',
        options: ['True', 'False'],
        correct: 0
      }
    ]
  },

  // System Overview lesson sections
  'system-overview-basics': {
    title: 'System Basics Quiz',
    section: 'System Basics',
    questions: [
      {
        question: 'Dynamics 365 is primarily a cloud-based solution.',
        type: 'true-false',
        options: ['True', 'False'],
        correct: 0
      },
      {
        question: 'Which company develops Dynamics 365?',
        type: 'multiple-choice',
        options: ['Google', 'Microsoft', 'Salesforce', 'Oracle'],
        correct: 1
      },
      {
        question: 'Dynamics 365 can integrate with other Microsoft Office applications.',
        type: 'true-false',
        options: ['True', 'False'],
        correct: 0
      }
    ]
  },

  // Dashboard Customization lesson sections
  'dashboard-customization-basics': {
    title: 'Dashboard Basics Quiz',
    section: 'Dashboard Fundamentals',
    questions: [
      {
        question: 'Dashboards in Dynamics 365 can be customized for different user roles.',
        type: 'true-false',
        options: ['True', 'False'],
        correct: 0
      },
      {
        question: 'What is the primary purpose of a dashboard in Dynamics 365?',
        type: 'multiple-choice',
        options: [
          'Data entry',
          'Visual overview of key metrics',
          'User management',
          'System configuration'
        ],
        correct: 1
      },
      {
        question: 'Charts and graphs can be added to Dynamics 365 dashboards.',
        type: 'true-false',
        options: ['True', 'False'],
        correct: 0
      }
    ]
  },

  // Lead Capture lesson sections
  'lead-capture-sources': {
    title: 'Lead Sources Quiz',
    section: 'Lead Sources',
    questions: [
      {
        question: 'Which of the following is NOT a typical lead source in broadcast advertising?',
        type: 'multiple-choice',
        options: [
          'Website inquiries',
          'Trade shows',
          'Cold calling',
          'Manufacturing equipment'
        ],
        correct: 3
      },
      {
        question: 'Dynamics 365 can automatically capture leads from web forms.',
        type: 'true-false',
        options: ['True', 'False'],
        correct: 0
      },
      {
        question: 'Lead scoring helps prioritize which leads to follow up with first.',
        type: 'true-false',
        options: ['True', 'False'],
        correct: 0
      }
    ]
  },

  // Add more quiz sections as needed for other lessons...
  // You can expand this object with quizzes for all your lesson sections

  // Template for adding new quizzes:
  /*
  'lesson-id-section-id': {
    title: 'Section Quiz Title',
    section: 'Section Name',
    questions: [
      {
        question: 'Your question here?',
        type: 'multiple-choice', // or 'true-false'
        options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
        correct: 0 // Index of correct answer (0-based)
      }
    ]
  }
  */
};

