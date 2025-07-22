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
});