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
        iframe.style.display = 'none';
        const iframeElement = iframe.querySelector('iframe');
        if (iframeElement) {
            iframeElement.style.display = 'none';
        }
    });

    // Add click event listeners to session links
    sessions.forEach(session => {
        const sessionLink = session.querySelector('a');

        if (sessionLink && session.id) {
            sessionLink.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent default link behavior

                // Remove active class from all sessions
                sessions.forEach(s => s.classList.remove('active'));

                // Add active class to clicked session
                session.classList.add('active');

                // Hide all iframes
                iframes.forEach(iframe => {
                    iframe.style.display = 'none';
                    const iframeElement = iframe.querySelector('iframe');
                    if (iframeElement) {
                        iframeElement.style.display = 'none';
                    }
                });

                // Find and display the corresponding iframe
                const targetIframe = document.querySelector(`.blog-iframe[data-post-id="${session.id}"]`);

                if (targetIframe) {
                    targetIframe.style.display = 'block';

                    const iframe = targetIframe.querySelector('iframe');
                    if (iframe) {
                        iframe.style.display = 'block';
                        iframe.style.width = '100%';
                        iframe.style.height = '100%';
                    }
                }
            });
        }
    });
});