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

                // Remove active class from all courses (hide all sessions)
                courses.forEach(c => c.classList.remove('active'));

                // If the clicked course wasn't active, make it active
                if (!isCurrentlyActive) {
                    course.classList.add('active');
                }
            });
        }
    });

    // Session click functionality to display corresponding iframe
    const sessions = document.querySelectorAll('.sessions li');
    const iframes = document.querySelectorAll('.blog-iframe');

    // Hide all iframes initially
    iframes.forEach(iframe => {
        iframe.classList.add('hidden');
    });

    // Function to show a specific post by ID
    function showPost(postId) {
        // Remove active class from all sessions
        sessions.forEach(s => s.classList.remove('active'));

        // Hide all iframes
        iframes.forEach(iframe => {
            iframe.classList.add('hidden');
            iframe.classList.remove('visible');
        });

        if (postId && postId !== 'preload') {
            // Find the session with matching ID and make it active
            const targetSession = document.getElementById(postId);
            if (targetSession) {
                targetSession.classList.add('active');

                // Also expand the parent course
                const parentCourse = targetSession.closest('.course');
                if (parentCourse) {
                    parentCourse.classList.add('active');
                }
            }

            // Find and display the corresponding iframe
            const targetIframe = document.querySelector(`.blog-iframe[data-post-id="${postId}"]`);
            if (targetIframe) {
                targetIframe.classList.remove('hidden');
                targetIframe.classList.add('visible');
                return;
            }
        }

        // If no valid post ID or post not found, show preload
        const preloadIframe = document.querySelector('.blog-iframe[data-post-id="preload"]');
        if (preloadIframe) {
            preloadIframe.classList.remove('hidden');
            preloadIframe.classList.add('visible');
        }
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