# Cleanup Log

This document outlines the changes made to the D365 Training project to clean up and organize the codebase.

## Changes Made:

1.  **Removed Redundant Files:**
    *   Deleted the large, unnecessary zip file: `github-pages-deployment (1).zip`.
    *   Removed duplicate HTML files with the `-enhanced` suffix, as they were identical to the regular versions.
    *   Deleted the `enhanced-lessons-index.html` file, which was also a duplicate.

2.  **Reorganized Project Structure:**
    *   Moved all `module*.md` content files into the `/content/` directory for better organization.
    *   Created a new `/lessons/` directory and moved all `lesson-*.html` files into it.
    *   Created a new `/docs/` directory and consolidated all documentation files (`README.md`, `DEPLOYMENT_GUIDE.md`, etc.) into it.

3.  **Consolidated Documentation:**
    *   All markdown documentation files are now located in the `/docs/` directory.

## New Project Structure:

The project now has a cleaner, more organized structure. Here is an overview of the key directories:

*   `/assets/`: Contains CSS, JS, and other asset files.
*   `/content/`: Contains all the training module content in Markdown format.
*   `/docs/`: Contains all project documentation.
*   `/images/`: Contains all image assets.
*   `/lessons/`: Contains the HTML files for individual lessons.
*   `/videos/`: Contains all video assets.

This cleanup makes the project easier to navigate, maintain, and update.


