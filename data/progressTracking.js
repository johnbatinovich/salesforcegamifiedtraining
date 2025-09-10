// Progress tracking utilities for lessons and modules

// Save lesson progress to localStorage
export const saveLessonProgress = (lessonId, completedSections) => {
  const progressKey = `lesson-progress-${lessonId}`;
  localStorage.setItem(progressKey, JSON.stringify([...completedSections]));
};

// Load lesson progress from localStorage
export const loadLessonProgress = (lessonId) => {
  const progressKey = `lesson-progress-${lessonId}`;
  const saved = localStorage.getItem(progressKey);
  return saved ? new Set(JSON.parse(saved)) : new Set();
};

// Check if a lesson is complete
export const isLessonComplete = (lessonId, totalSections) => {
  const progress = loadLessonProgress(lessonId);
  return progress.size === totalSections;
};

// Get lesson completion percentage
export const getLessonProgress = (lessonId, totalSections) => {
  const progress = loadLessonProgress(lessonId);
  return Math.round((progress.size / totalSections) * 100);
};

// Save module progress
export const saveModuleProgress = (moduleId, completedLessons) => {
  const progressKey = `module-progress-${moduleId}`;
  localStorage.setItem(progressKey, JSON.stringify([...completedLessons]));
};

// Load module progress
export const loadModuleProgress = (moduleId) => {
  const progressKey = `module-progress-${moduleId}`;
  const saved = localStorage.getItem(progressKey);
  return saved ? new Set(JSON.parse(saved)) : new Set();
};

// Mark a lesson as complete in module progress
export const markLessonComplete = (moduleId, lessonId) => {
  const progress = loadModuleProgress(moduleId);
  progress.add(lessonId);
  saveModuleProgress(moduleId, progress);
};

// Check if a module is complete
export const isModuleComplete = (moduleId, totalLessons) => {
  const progress = loadModuleProgress(moduleId);
  return progress.size === totalLessons;
};

// Get module completion percentage
export const getModuleProgress = (moduleId, totalLessons) => {
  const progress = loadModuleProgress(moduleId);
  return Math.round((progress.size / totalLessons) * 100);
};

// Save quiz results
export const saveQuizResult = (lessonId, sectionId, score, passed) => {
  const quizKey = `quiz-result-${lessonId}-${sectionId}`;
  const result = {
    score,
    passed,
    completedAt: new Date().toISOString()
  };
  localStorage.setItem(quizKey, JSON.stringify(result));
};

// Load quiz result
export const loadQuizResult = (lessonId, sectionId) => {
  const quizKey = `quiz-result-${lessonId}-${sectionId}`;
  const saved = localStorage.getItem(quizKey);
  return saved ? JSON.parse(saved) : null;
};

// Check if a quiz was passed
export const isQuizPassed = (lessonId, sectionId) => {
  const result = loadQuizResult(lessonId, sectionId);
  return result ? result.passed : false;
};

// Get overall training progress
export const getOverallProgress = (modules) => {
  let totalLessons = 0;
  let completedLessons = 0;

  modules.forEach(module => {
    totalLessons += module.lessons.length;
    const moduleProgress = loadModuleProgress(module.id);
    completedLessons += moduleProgress.size;
  });

  return {
    total: totalLessons,
    completed: completedLessons,
    percentage: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
  };
};

// Clear all progress (for testing or reset)
export const clearAllProgress = () => {
  const keys = Object.keys(localStorage);
  keys.forEach(key => {
    if (key.startsWith('lesson-progress-') || 
        key.startsWith('module-progress-') || 
        key.startsWith('quiz-result-')) {
      localStorage.removeItem(key);
    }
  });
};

// Export user progress data (for backup or transfer)
export const exportProgressData = () => {
  const progressData = {};
  const keys = Object.keys(localStorage);
  
  keys.forEach(key => {
    if (key.startsWith('lesson-progress-') || 
        key.startsWith('module-progress-') || 
        key.startsWith('quiz-result-')) {
      progressData[key] = localStorage.getItem(key);
    }
  });
  
  return progressData;
};

// Import user progress data (for restore)
export const importProgressData = (progressData) => {
  Object.entries(progressData).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
};

