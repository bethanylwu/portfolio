// Handle click events to scroll to the associated project
document.querySelectorAll('.list-item, .bio-header').forEach(item => {
    item.addEventListener('click', () => {

        // Remove 'selected' class from all list items
        document.querySelectorAll('.list-item, .description, .bio-header, .bio-contact').forEach(el => el.classList.remove('selected'));

        // Add 'selected' class to the clicked item
        item.classList.add('selected');

        // Show the expandable text based on element type
        if (item.classList.contains('bio-header')) {
            // For bio-header, get the previous element (bio-contact)
            const expandableText = item.previousElementSibling;
            if (expandableText && expandableText.classList.contains('bio-contact')) {
                expandableText.classList.add('selected');
            }
        } else {
            // For other items, get the next element (description)
            const expandableText = item.nextElementSibling;
            if (expandableText && expandableText.classList.contains('description')) {
                expandableText.classList.add('selected');
            }
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

// Header hover interaction
document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');
    const quotes = document.querySelectorAll('.header-quote');

    // Function to show a random quote
    function showRandomQuote() {
        // Hide all quotes first
        quotes.forEach(quote => {
            quote.classList.remove('active');
        });

        // Select a random quote
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quotes[randomIndex].classList.add('active');
    }

    // Add event listeners for mouse enter/leave
    header.addEventListener('mouseenter', showRandomQuote);

    // When mouse leaves, all quotes will be hidden due to CSS rules
});

document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const listContainer = document.querySelector('.list-container');

    if (mobileMenuToggle && listContainer) {
        mobileMenuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            listContainer.classList.toggle('active');
        });

        // Close dropdown when a list item is clicked
        const listItems = document.querySelectorAll('.list-item');
        listItems.forEach(item => {
            item.addEventListener('click', function () {
                if (window.innerWidth <= 600) {
                    listContainer.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        });
    }
});

// Function to update the selected project title in the header
function updateSelectedProjectTitle() {
    const selectedItem = document.querySelector('.list-item.selected');
    const titleDisplay = document.querySelector('.selected-project-title');

    if (selectedItem && titleDisplay) {
        const projectName = selectedItem.querySelector('.project-name').textContent;
        titleDisplay.textContent = projectName;
    } else if (titleDisplay) {
        titleDisplay.textContent = 'Projects'; // Default text when nothing is selected
    }
}

// Call this function whenever a project is selected
document.addEventListener('DOMContentLoaded', function () {
    // Set default title
    updateSelectedProjectTitle();

    // Add click event listeners to project list items
    document.querySelectorAll('.list-item').forEach(item => {
        item.addEventListener('click', function () {
            // Update the selected project title after a small delay to ensure selected class is applied
            setTimeout(updateSelectedProjectTitle, 50);
        });
    });
});