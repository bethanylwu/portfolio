document.querySelectorAll('.list-item').forEach(item => {
    item.addEventListener('click', event => {
        // Remove 'selected' class from all list items
        document.querySelectorAll('.list-item').forEach(el => el.classList.remove('selected'));

        // Add 'selected' class to the clicked item
        item.classList.add('selected');
    });
});

// Handle click events to scroll to the associated project
document.querySelectorAll('.list-item').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault(); // Prevent default anchor behavior

        // Remove 'selected' class from all list items
        document.querySelectorAll('.list-item').forEach(el => el.classList.remove('selected'));

        // Add 'selected' class to the clicked item
        item.classList.add('selected');

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

// // Automatically select the .list-item when scrolling to the associated .project
// const projectElements = document.querySelectorAll('.project');
// const observer = new IntersectionObserver(
//     (entries) => {
//         entries.forEach(entry => {
//             if (entry.isIntersecting) {
//                 // Get the ID of the project in view
//                 const projectId = entry.target.id;

//                 // Find the corresponding list item
//                 const activeListItem = document.querySelector(`.list-item[data-project-id="${projectId}"]`);

//                 // Update the 'selected' class on the list items
//                 document.querySelectorAll('.list-item').forEach(item => item.classList.remove('selected'));
//                 if (activeListItem) {
//                     activeListItem.classList.add('selected');
//                 }
//             }
//         });
//     },
//     {
//         root: null, // Use the viewport as the root
//         threshold: 0.5, // Trigger when 50% of the project is visible
//     }
// );

document.querySelectorAll('.list-item').forEach(item => {
    item.addEventListener('click', event => {
        event.preventDefault(); // Prevent default anchor behavior

        // Remove 'selected' class from all list items and hide all expandable text
        document.querySelectorAll('.list-item').forEach(el => el.classList.remove('selected'));
        document.querySelectorAll('.expandable-text').forEach(text => text.style.display = 'none');

        // Add 'selected' class to the clicked item
        item.classList.add('selected');

        // Show the expandable text below the selected item
        const expandableText = item.nextElementSibling; // Get the next sibling element
        if (expandableText && expandableText.classList.contains('expandable-text')) {
            expandableText.style.display = 'block';
        }
    });
});

// Observe each project element
projectElements.forEach(project => observer.observe(project));

