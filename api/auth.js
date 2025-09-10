// Simple client-side authentication system for GitHub Pages
// Note: This is a simplified version for demonstration. In production, use proper backend authentication.

class AuthSystem {
    constructor() {
        this.users = this.loadUsers();
        this.currentUser = this.loadCurrentUser();
        this.quizResults = this.loadQuizResults();
    }

    // Load users from localStorage
    loadUsers() {
        const users = localStorage.getItem('training_users');
        return users ? JSON.parse(users) : [];
    }

    // Save users to localStorage
    saveUsers() {
        localStorage.setItem('training_users', JSON.stringify(this.users));
    }

    // Load current user session
    loadCurrentUser() {
        const user = localStorage.getItem('current_user');
        return user ? JSON.parse(user) : null;
    }

    // Save current user session
    saveCurrentUser(user) {
        this.currentUser = user;
        localStorage.setItem('current_user', JSON.stringify(user));
    }

    // Load quiz results
    loadQuizResults() {
        const results = localStorage.getItem('quiz_results');
        return results ? JSON.parse(results) : [];
    }

    // Save quiz results
    saveQuizResults() {
        localStorage.setItem('quiz_results', JSON.stringify(this.quizResults));
    }

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Hash password (simple client-side hashing - not secure for production)
    hashPassword(password) {
        // Simple hash function for demo purposes
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString();
    }

    // Sign up new user
    signup(userData) {
        const { username, email, password, first_name, last_name, company } = userData;

        // Check if user already exists
        const existingUser = this.users.find(u => u.username === username || u.email === email);
        if (existingUser) {
            throw new Error('User with this username or email already exists');
        }

        // Create new user
        const newUser = {
            id: this.generateId(),
            username,
            email,
            first_name,
            last_name,
            company: company || '',
            password: this.hashPassword(password),
            role: this.users.length === 0 ? 'admin' : 'user', // First user is admin
            created_at: new Date().toISOString(),
            last_login: null
        };

        this.users.push(newUser);
        this.saveUsers();

        // Auto-login after signup
        const userSession = { ...newUser };
        delete userSession.password;
        this.saveCurrentUser(userSession);

        return userSession;
    }

    // Login user
    login(username, password) {
        const user = this.users.find(u => 
            (u.username === username || u.email === username) && 
            u.password === this.hashPassword(password)
        );

        if (!user) {
            throw new Error('Invalid username or password');
        }

        // Update last login
        user.last_login = new Date().toISOString();
        this.saveUsers();

        // Create session
        const userSession = { ...user };
        delete userSession.password;
        this.saveCurrentUser(userSession);

        return userSession;
    }

    // Logout user
    logout() {
        this.currentUser = null;
        localStorage.removeItem('current_user');
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.currentUser !== null;
    }

    // Check if user is admin
    isAdmin() {
        return this.currentUser && this.currentUser.role === 'admin';
    }

    // Get current user
    getCurrentUser() {
        return this.currentUser;
    }

    // Save quiz result
    saveQuizResult(moduleId, score, totalQuestions, answers) {
        if (!this.currentUser) {
            throw new Error('User must be logged in to save quiz results');
        }

        const result = {
            id: this.generateId(),
            user_id: this.currentUser.id,
            username: this.currentUser.username,
            module_id: moduleId,
            score: score,
            total_questions: totalQuestions,
            percentage: Math.round((score / totalQuestions) * 100),
            answers: answers,
            completed_at: new Date().toISOString()
        };

        this.quizResults.push(result);
        this.saveQuizResults();

        return result;
    }

    // Get quiz results for current user
    getUserQuizResults() {
        if (!this.currentUser) return [];
        return this.quizResults.filter(r => r.user_id === this.currentUser.id);
    }

    // Get all quiz results (admin only)
    getAllQuizResults() {
        if (!this.isAdmin()) {
            throw new Error('Admin access required');
        }
        return this.quizResults;
    }

    // Get all users (admin only)
    getAllUsers() {
        if (!this.isAdmin()) {
            throw new Error('Admin access required');
        }
        return this.users.map(user => {
            const userCopy = { ...user };
            delete userCopy.password;
            return userCopy;
        });
    }

    // Get analytics data (admin only)
    getAnalytics() {
        if (!this.isAdmin()) {
            throw new Error('Admin access required');
        }

        const totalUsers = this.users.length;
        const totalQuizAttempts = this.quizResults.length;
        const averageScore = this.quizResults.length > 0 
            ? Math.round(this.quizResults.reduce((sum, r) => sum + r.percentage, 0) / this.quizResults.length)
            : 0;

        // Module performance
        const moduleStats = {};
        this.quizResults.forEach(result => {
            if (!moduleStats[result.module_id]) {
                moduleStats[result.module_id] = {
                    attempts: 0,
                    totalScore: 0,
                    passCount: 0
                };
            }
            moduleStats[result.module_id].attempts++;
            moduleStats[result.module_id].totalScore += result.percentage;
            if (result.percentage >= 70) {
                moduleStats[result.module_id].passCount++;
            }
        });

        const modulePerformance = Object.keys(moduleStats).map(moduleId => ({
            module_id: moduleId,
            attempts: moduleStats[moduleId].attempts,
            average_score: Math.round(moduleStats[moduleId].totalScore / moduleStats[moduleId].attempts),
            pass_rate: Math.round((moduleStats[moduleId].passCount / moduleStats[moduleId].attempts) * 100)
        }));

        // Recent activity
        const recentSignups = this.users
            .filter(u => {
                const signupDate = new Date(u.created_at);
                const weekAgo = new Date();
                weekAgo.setDate(weekAgo.getDate() - 7);
                return signupDate > weekAgo;
            }).length;

        return {
            totalUsers,
            totalQuizAttempts,
            averageScore,
            recentSignups,
            modulePerformance,
            activeUsers: this.users.filter(u => u.last_login).length
        };
    }

    // Export quiz results as CSV (admin only)
    exportQuizResults() {
        if (!this.isAdmin()) {
            throw new Error('Admin access required');
        }

        const headers = ['Date', 'Username', 'Module', 'Score', 'Percentage', 'Status'];
        const rows = this.quizResults.map(result => [
            new Date(result.completed_at).toLocaleDateString(),
            result.username,
            result.module_id,
            `${result.score}/${result.total_questions}`,
            `${result.percentage}%`,
            result.percentage >= 70 ? 'Pass' : 'Fail'
        ]);

        const csvContent = [headers, ...rows]
            .map(row => row.map(field => `"${field}"`).join(','))
            .join('\n');

        // Create and download CSV file
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `quiz_results_${new Date().toISOString().split('T')[0]}.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }
}

// Create global auth instance
window.authSystem = new AuthSystem();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthSystem;
}

