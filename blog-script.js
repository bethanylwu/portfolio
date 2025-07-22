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

    // Hide all iframes initially and show preload as default
    iframes.forEach(iframe => {
        iframe.classList.add('hidden');
    });

    // Show preload iframe by default
    const preloadIframe = document.querySelector('.blog-iframe[data-post-id="preload"]');
    if (preloadIframe) {
        preloadIframe.classList.remove('hidden');
        preloadIframe.classList.add('visible');
    }

    // Add click event listeners to session links
    sessions.forEach(session => {
        const sessionLink = session.querySelector('a');

        if (sessionLink && session.id) {
            sessionLink.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent default link behavior

                // Check if this session is already active
                const isCurrentlyActive = session.classList.contains('active');

                // Remove active class from all sessions
                sessions.forEach(s => s.classList.remove('active'));

                // Hide all iframes
                iframes.forEach(iframe => {
                    iframe.classList.add('hidden');
                    iframe.classList.remove('visible');
                });

                // If the clicked session wasn't active, make it active and show its iframe
                if (!isCurrentlyActive) {
                    session.classList.add('active');

                    // Find and display the corresponding iframe
                    const targetIframe = document.querySelector(`.blog-iframe[data-post-id="${session.id}"]`);

                    if (targetIframe) {
                        targetIframe.classList.remove('hidden');
                        targetIframe.classList.add('visible');
                    }
                } else {
                    // If no sessions are active, show the preload iframe
                    const preloadIframe = document.querySelector('.blog-iframe[data-post-id="preload"]');
                    if (preloadIframe) {
                        preloadIframe.classList.remove('hidden');
                        preloadIframe.classList.add('visible');
                    }
                }
            });
        }
    });
});