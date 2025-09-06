// Course and session toggle functionality
document.addEventListener('DOMContentLoaded', function () {

    // Get all course elements
    const courses = document.querySelectorAll('.course');

    // Add click event listeners to each course link
    courses.forEach(course => {
        const courseLink = course.querySelector('a');

        if (courseLink) {
            courseLink.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent default link behavior

                // Check if this course is already active
                const isCurrentlyActive = course.classList.contains('active');

                // Remove active class from all courses and sessions
                courses.forEach(c => c.classList.remove('active'));
                sessions.forEach(s => s.classList.remove('active'));

                // If the clicked course wasn't active, make it active and show course content
                if (!isCurrentlyActive) {
                    course.classList.add('active');

                    // Get course identifier from the text content or create one
                    const courseText = courseLink.textContent.trim();
                    const courseId = getCourseId(courseText);

                    // Update URL hash for course
                    window.location.hash = courseId;

                    // Try to load course overview page
                    showCourseOrPost(courseId, true);
                } else {
                    // If clicking active course, go back to preload
                    window.location.hash = '';
                    showCourseOrPost('preload', false);
                }
            });
        }
    });

    // Session click functionality to display corresponding iframe
    const sessions = document.querySelectorAll('.sessions li');
    const blogIframe = document.getElementById('blog-iframe');

    // Helper function to convert course name to course ID
    function getCourseId(courseText) {
        const courseMap = {
            'Physical Computing': 'pcomp',
            'Intro to Computational Media (ICM)': 'icm',
            'Hypercinema': 'hypercinema',
            'Cabinets of Wonder': 'cow',
            'Soft Robotics': 'soft-robotics',
            'Code Your Way': 'code-your-way',
            'Haptics': 'haptics',
            'Project Development Studio': 'pdev',
            'Medium of Memory': 'mom',
            'Shared Minds': 'shared-minds',
            'Time': 'time',
            'On Becoming': 'on-becoming'
        };
        return courseMap[courseText] || courseText.toLowerCase().replace(/\s+/g, '-');
    }

    // Function to show course overview or specific post
    function showCourseOrPost(id, isCourse = false) {
        if (isCourse) {
            // Try to load course overview page first
            const coursePath = `blog-posts/courses/${id}.html`;
            blogIframe.src = coursePath;
            blogIframe.title = `Course Overview: ${id}`;

            // If course overview doesn't exist, you could fallback to preload
            blogIframe.onerror = function () {
                blogIframe.src = 'blog-posts/preload.html';
                blogIframe.title = 'Select a blog post';
            };
        } else if (id && id !== 'preload') {
            // Load specific session/post
            blogIframe.src = `blog-posts/${id}.html`;
            blogIframe.title = `Blog Post: ${id}`;
        } else {
            // Load preload page
            blogIframe.src = 'blog-posts/preload.html';
            blogIframe.title = 'Select a blog post';
        }
    }

    // Function to show a specific post by ID (for sessions)
    function showPost(postId) {
        // Remove active class from all sessions
        sessions.forEach(s => s.classList.remove('active'));
        courses.forEach(c => c.classList.remove('active'));

        if (postId && postId !== 'preload') {
            // First check if it's a session ID
            const targetSession = document.getElementById(postId);
            if (targetSession) {
                targetSession.classList.add('active');

                // Also expand the parent course
                const parentCourse = targetSession.closest('.course');
                if (parentCourse) {
                    parentCourse.classList.add('active');
                }

                // Update iframe source
                showCourseOrPost(postId, false);
                return;
            }

            // If not a session, check if it's a course ID
            const courseIds = {
                'pcomp': 'Physical Computing',
                'icm': 'Intro to Computational Media (ICM)',
                'hypercinema': 'Hypercinema',
                'cow': 'Cabinets of Wonder',
                'soft-robotics': 'Soft Robotics',
                'code-your-way': 'Code Your Way',
                'haptics': 'Haptics',
                'pdev': 'Project Development Studio',
                'mom': 'Medium of Memory',
                'shared-minds': 'Shared Minds',
                'time': 'Time',
                'on-becoming': 'On Becoming'
            };

            if (courseIds[postId]) {
                // Find and activate the course
                courses.forEach(course => {
                    const courseLink = course.querySelector('a');
                    if (courseLink && courseLink.textContent.trim() === courseIds[postId]) {
                        course.classList.add('active');
                    }
                });

                // Update iframe source for course
                showCourseOrPost(postId, true);
                return;
            }
        }

        // If no valid post ID or post not found, show preload
        showCourseOrPost('preload', false);
    }

    // Check for hash in URL on page load
    const initialHash = window.location.hash.substring(1); // Remove the # symbol
    showPost(initialHash || 'preload');

    // Add click event listeners to session links
    sessions.forEach(session => {
        const sessionLink = session.querySelector('a');

        if (sessionLink && session.id) {
            sessionLink.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent default link behavior

                // Check if this session is already active
                const isCurrentlyActive = session.classList.contains('active');

                if (!isCurrentlyActive) {
                    // Update URL hash
                    window.location.hash = session.id;
                    // Show the post
                    showPost(session.id);
                } else {
                    // If clicking active session, go back to preload
                    window.location.hash = '';
                    showPost('preload');
                }
            });
        }
    });

    // Listen for hash changes (back/forward navigation)
    window.addEventListener('hashchange', function () {
        const hash = window.location.hash.substring(1);
        showPost(hash || 'preload');
    });
});