// User Management System for D365 Training Platform
class UserManager {
    constructor() {
        this.storageKey = 'salesforce_users';
        this.currentUserKey = 'salesforce_current_user';
        this.progressKey = 'salesforce_user_progress';
        this.adminKey = 'salesforce_admin_users';
        this.initializeStorage();
    }

    initializeStorage() {
        // Initialize users storage if it doesn't exist
        if (!localStorage.getItem(this.storageKey)) {
            localStorage.setItem(this.storageKey, JSON.stringify({}));
        }
        
        // Initialize admin users (default admin account)
        if (!localStorage.getItem(this.adminKey)) {
            const adminUsers = {
                'admin@salesforcetraining.com': {
                    password: 'admin123', // In production, this would be hashed
                    role: 'admin',
                    name: 'System Administrator'
                }
            };
            localStorage.setItem(this.adminKey, JSON.stringify(adminUsers));
        }
        
        // Initialize progress tracking
        if (!localStorage.getItem(this.progressKey)) {
            localStorage.setItem(this.progressKey, JSON.stringify({}));
        }
    }

    // User Registration
    registerUser(userData) {
        const users = JSON.parse(localStorage.getItem(this.storageKey));
        
        // Check if user already exists
        if (users[userData.email]) {
            return { success: false, message: 'User already exists with this email' };
        }
        
        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'email', 'company', 'role', 'password'];
        for (let field of requiredFields) {
            if (!userData[field]) {
                return { success: false, message: `${field} is required` };
            }
        }
        
        // Create user record
        const newUser = {
            id: this.generateUserId(),
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            company: userData.company,
            role: userData.role,
            password: userData.password, // In production, this would be hashed
            registrationDate: new Date().toISOString(),
            lastLogin: null,
            isActive: true
        };
        
        // Save user
        users[userData.email] = newUser;
        localStorage.setItem(this.storageKey, JSON.stringify(users));
        
        // Initialize user progress
        this.initializeUserProgress(userData.email);
        
        return { success: true, message: 'Account created successfully', user: newUser };
    }

    // User Login
    loginUser(email, password) {
        const users = JSON.parse(localStorage.getItem(this.storageKey));
        const adminUsers = JSON.parse(localStorage.getItem(this.adminKey));
        
        // Check admin users first
        if (adminUsers[email] && adminUsers[email].password === password) {
            const adminUser = adminUsers[email];
            adminUser.email = email;
            adminUser.lastLogin = new Date().toISOString();
            localStorage.setItem(this.currentUserKey, JSON.stringify(adminUser));
            return { success: true, message: 'Admin login successful', user: adminUser, isAdmin: true };
        }
        
        // Check regular users
        if (users[email] && users[email].password === password) {
            const user = users[email];
            user.lastLogin = new Date().toISOString();
            
            // Update last login time
            users[email] = user;
            localStorage.setItem(this.storageKey, JSON.stringify(users));
            localStorage.setItem(this.currentUserKey, JSON.stringify(user));
            
            return { success: true, message: 'Login successful', user: user, isAdmin: false };
        }
        
        return { success: false, message: 'Invalid email or password' };
    }

    // Get Current User
    getCurrentUser() {
        const currentUser = localStorage.getItem(this.currentUserKey);
        return currentUser ? JSON.parse(currentUser) : null;
    }

    // Logout
    logout() {
        localStorage.removeItem(this.currentUserKey);
        return { success: true, message: 'Logged out successfully' };
    }

    // Check if user is logged in
    isLoggedIn() {
        return localStorage.getItem(this.currentUserKey) !== null;
    }

    // Check if current user is admin
    isAdmin() {
        const currentUser = this.getCurrentUser();
        return currentUser && currentUser.role === 'admin';
    }

    // Initialize user progress tracking
    initializeUserProgress(email) {
        const allProgress = JSON.parse(localStorage.getItem(this.progressKey));
        if (!allProgress[email]) {
            allProgress[email] = {
                modules: {
                    module1: { completed: false, completedLessons: [], completionDate: null },
                    module2: { completed: false, completedLessons: [], completionDate: null },
                    module3: { completed: false, completedLessons: [], completionDate: null },
                    module4: { completed: false, completedLessons: [], completionDate: null },
                    module5: { completed: false, completedLessons: [], completionDate: null },
                    module6: { completed: false, completedLessons: [], completionDate: null },
                    module7: { completed: false, completedLessons: [], completionDate: null }
                },
                quizzes: {},
                overallProgress: 0,
                startDate: new Date().toISOString(),
                lastActivity: new Date().toISOString()
            };
            localStorage.setItem(this.progressKey, JSON.stringify(allProgress));
        }
    }

    // Update user progress
    updateProgress(email, moduleId, lessonId = null, quizScore = null) {
        const allProgress = JSON.parse(localStorage.getItem(this.progressKey));
        
        if (!allProgress[email]) {
            this.initializeUserProgress(email);
        }
        
        const userProgress = allProgress[email];
        userProgress.lastActivity = new Date().toISOString();
        
        if (moduleId && userProgress.modules[moduleId]) {
            if (lessonId && !userProgress.modules[moduleId].completedLessons.includes(lessonId)) {
                userProgress.modules[moduleId].completedLessons.push(lessonId);
            }
            
            // Check if module is completed (you can define your own completion criteria)
            if (userProgress.modules[moduleId].completedLessons.length >= 3) { // Assuming 3 lessons per module
                userProgress.modules[moduleId].completed = true;
                userProgress.modules[moduleId].completionDate = new Date().toISOString();
            }
        }
        
        if (quizScore !== null) {
            userProgress.quizzes[moduleId] = {
                score: quizScore,
                completedDate: new Date().toISOString()
            };
        }
        
        // Calculate overall progress
        const totalModules = Object.keys(userProgress.modules).length;
        const completedModules = Object.values(userProgress.modules).filter(m => m.completed).length;
        userProgress.overallProgress = Math.round((completedModules / totalModules) * 100);
        
        allProgress[email] = userProgress;
        localStorage.setItem(this.progressKey, JSON.stringify(allProgress));
        
        return userProgress;
    }

    // Get user progress
    getUserProgress(email) {
        const allProgress = JSON.parse(localStorage.getItem(this.progressKey));
        return allProgress[email] || null;
    }

    // Get all users (admin function)
    getAllUsers() {
        if (!this.isAdmin()) {
            return { success: false, message: 'Access denied' };
        }
        
        const users = JSON.parse(localStorage.getItem(this.storageKey));
        const allProgress = JSON.parse(localStorage.getItem(this.progressKey));
        
        // Combine user data with progress
        const usersWithProgress = {};
        for (let email in users) {
            usersWithProgress[email] = {
                ...users[email],
                progress: allProgress[email] || null
            };
        }
        
        return { success: true, users: usersWithProgress };
    }

    // Generate unique user ID
    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }

    // Get user statistics (admin function)
    getUserStatistics() {
        if (!this.isAdmin()) {
            return { success: false, message: 'Access denied' };
        }
        
        const users = JSON.parse(localStorage.getItem(this.storageKey));
        const allProgress = JSON.parse(localStorage.getItem(this.progressKey));
        
        const stats = {
            totalUsers: Object.keys(users).length,
            activeUsers: Object.values(users).filter(u => u.isActive).length,
            completedCourses: 0,
            averageProgress: 0,
            registrationsByMonth: {},
            roleDistribution: {},
            companyDistribution: {}
        };
        
        let totalProgress = 0;
        
        for (let email in users) {
            const user = users[email];
            const progress = allProgress[email];
            
            // Role distribution
            stats.roleDistribution[user.role] = (stats.roleDistribution[user.role] || 0) + 1;
            
            // Company distribution
            stats.companyDistribution[user.company] = (stats.companyDistribution[user.company] || 0) + 1;
            
            // Registration by month
            const regDate = new Date(user.registrationDate);
            const monthKey = `${regDate.getFullYear()}-${String(regDate.getMonth() + 1).padStart(2, '0')}`;
            stats.registrationsByMonth[monthKey] = (stats.registrationsByMonth[monthKey] || 0) + 1;
            
            if (progress) {
                totalProgress += progress.overallProgress;
                if (progress.overallProgress === 100) {
                    stats.completedCourses++;
                }
            }
        }
        
        stats.averageProgress = stats.totalUsers > 0 ? Math.round(totalProgress / stats.totalUsers) : 0;
        
        return { success: true, stats };
    }
}

// Create global instance
window.userManager = new UserManager();

