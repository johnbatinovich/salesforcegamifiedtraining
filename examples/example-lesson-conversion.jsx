// Example: Converting your existing lesson content to use the enhanced components

import React from 'react';
import LessonContentEnhanced from '../components/LessonContentEnhanced';

// EXAMPLE 1: Welcome to Dynamics 365 Lesson
export function WelcomeLessonExample() {
  const moduleData = {
    id: 'intro-dynamics',
    title: 'Introduction to Dynamics 365'
  };

  const lessonData = {
    id: 'welcome',
    title: 'Welcome to Dynamics 365',
    sections: [
      {
        id: 'overview',
        title: 'Training Overview',
        content: `Welcome to your comprehensive training journey with Microsoft Dynamics 365 Sales, specifically designed for broadcast advertising professionals. This training will transform how you manage customer relationships, track opportunities, and drive revenue growth in the competitive broadcast advertising landscape.

Key benefits of this training:
• Industry-specific focus on broadcast advertising
• Hands-on practical exercises
• Real-world scenarios and case studies
• Expert guidance from certified trainers
• Comprehensive coverage of all essential features`
      },
      {
        id: 'learning-objectives',
        title: 'What You\'ll Learn',
        content: `This comprehensive training program covers seven essential modules designed to make you proficient in Dynamics 365 Sales:

**Module 1: Introduction & Welcome**
- Understanding the platform and its benefits
- Navigation and basic interface
- Setting up your user profile

**Module 2: Personalizing Your Workspace**
- Customizing views and settings for efficiency
- Creating personal dashboards
- Setting up notifications and alerts

**Module 3: Mastering Lead Management**
- Capturing, qualifying, and converting prospects
- Lead scoring and prioritization
- Automated lead nurturing

**Module 4: Managing Opportunities Effectively**
- Tracking deals through the sales pipeline
- Forecasting and reporting
- Collaboration tools for sales teams

**Module 5: Integrating with Microsoft Ecosystem**
- Leveraging Teams, Outlook, and other tools
- Document management with SharePoint
- Power BI integration for analytics

**Module 6: Capstone Module**
- Real-world scenario practice
- End-to-end sales process simulation
- Best practices and troubleshooting

**Module 7: Resources & Next Steps**
- Ongoing learning and support
- Certification pathways
- Community resources and forums`
      },
      {
        id: 'workflow',
        title: 'Broadcast Advertising Sales Workflow',
        content: `Understanding the broadcast advertising sales workflow is crucial for maximizing Dynamics 365's potential in your industry. The typical workflow includes:

**1. Lead Generation** 📡
- Identify potential advertisers
- Capture leads from multiple sources
- Initial contact and interest assessment

**2. Qualification** ✅
- Assess advertiser needs and budget
- Determine decision-making process
- Evaluate timeline and urgency

**3. Proposal Creation** 📄
- Develop customized advertising packages
- Create compelling presentations
- Calculate pricing and availability

**4. Negotiation** 🤝
- Discuss terms and conditions
- Handle objections and concerns
- Finalize contract details

**5. Contract Signing** ✍️
- Execute legal agreements
- Set up billing and payment terms
- Schedule campaign implementation

**6. Performance Tracking** 📊
- Monitor campaign effectiveness
- Provide regular reporting
- Optimize for better results

Each stage requires specific tools and processes that Dynamics 365 provides to streamline your sales operations and maximize revenue potential.`
      }
    ]
  };

  return <LessonContentEnhanced module={moduleData} lesson={lessonData} />;
}

// HOW TO USE THESE EXAMPLES:
// 1. Copy the structure and adapt it to your existing content
// 2. Replace the content with your actual lesson material
// 3. Make sure the lesson.id and section.id match your quiz questions in data/quizzes.js
// 4. Test the quiz functionality for each section
// 5. Verify the certificate generation works when all sections are complete

