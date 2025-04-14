// Handle click events to scroll to the associated project
document.querySelectorAll('.list-item').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault(); // Prevent default anchor behavior

        // Remove 'selected' class from all list items
        document.querySelectorAll('.list-item').forEach(el => el.classList.remove('selected'));
        document.querySelectorAll('.description').forEach(el => el.classList.remove('selected'));

        // Add 'selected' class to the clicked item
        item.classList.add('selected');

        // Show the expandable text below the selected item
        const expandableText = item.nextElementSibling; // Get the next sibling element
        if (expandableText && expandableText.classList.contains('description')) {
            expandableText.classList.add('selected');
        }

        // Get the associated project ID from the data attribute
        const projectId = item.getAttribute('data-project-id');

        // Find the corresponding project element
        const projectElement = document.getElementById(projectId);

        // Scroll to the project element smoothly
        if (projectElement) {
            projectElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start' // Align to the top of the container
            });
        }
    });
});

// Select all project elements and list items
const projectElements = document.querySelectorAll('.project');
const listItems = document.querySelectorAll('.list-item');
const descriptionItems = document.querySelectorAll('.description');

// Create an Intersection Observer
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            // TODO: don't trigger when scrolling through projects after clicking
            if (entry.isIntersecting) {
                // Get the ID of the project in view
                const projectId = entry.target.id;

                // Find the corresponding list item
                const activeListItem = document.querySelector(`.list-item[data-project-id="${projectId}"]`);

                // Remove 'selected' class from all list items
                listItems.forEach((item) => item.classList.remove('selected'));
                descriptionItems.forEach((item) => item.classList.remove('selected'));

                // Add 'selected' class to the active list item and its description
                if (activeListItem) {
                    activeListItem.classList.add('selected');

                    const expandableText = activeListItem.nextElementSibling; // Get the next sibling element
                    if (expandableText && expandableText.classList.contains('description')) {
                        expandableText.classList.add('selected');
                    }
                }
            }
        });
    },
    {
        root: null, // Use the viewport as the root
        threshold: 0.25, // Trigger when 25% of the project is visible
    }
);

// Observe each project element
projectElements.forEach((project) => observer.observe(project));