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

                console.log(entry.target);


                if (projectId == 'about-me') {
                    document.querySelector('.bio-contact').classList.add('selected');
                    document.querySelector('.bio-header').classList.add('selected');
                } else if (projectId != '') {
                    document.querySelector('.bio-contact').classList.remove('selected');
                    document.querySelector('.bio-header').classList.remove('selected');
                }

                // Update the selected project title
                updateSelectedProjectTitle();
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


document.addEventListener('DOMContentLoaded', function () {

    // Header hover interaction for desktop and tablet view
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


    /* --------------- MOBILE VIEW MENU JAVASCRIPT --------------- */
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const listContainer = document.querySelector('.list-container');

    if (mobileMenuToggle && listContainer) {
        mobileMenuToggle.addEventListener('click', function () {
            this.classList.toggle('active');
            listContainer.classList.toggle('active');
        });

        // Close dropdown when a list item is clicked
        const listItems = document.querySelectorAll('.list-item, .bio-header');
        listItems.forEach(item => {
            item.addEventListener('click', function () {
                if (window.innerWidth <= 600) {
                    listContainer.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                }
            });
        });
    }


    // Set default title
    updateSelectedProjectTitle();

    // Add click event listeners to project list items
    document.querySelectorAll('.list-item, .bio-header').forEach(item => {
        item.addEventListener('click', function () {
            // Update the selected project title after a small delay to ensure selected class is applied
            setTimeout(updateSelectedProjectTitle, 50);
        });
    });


    // Update click events to handle bio-header and bio-contact properly
    document.querySelectorAll('.list-item, .bio-header').forEach(item => {
        item.addEventListener('click', function () {
            // Hide all expandable content first
            document.querySelectorAll('.description, .bio-contact').forEach(
                content => content.classList.remove('selected')
            );

            // Remove selected class from all items
            document.querySelectorAll('.list-item, .bio-header').forEach(
                listItem => listItem.classList.remove('selected')
            );

            // Add selected class to clicked item
            this.classList.add('selected');

            // Show appropriate expandable content
            if (this.classList.contains('bio-header')) {
                // For bio-header, find the bio-contact element
                const bioContact = document.querySelector('.bio-contact');
                if (bioContact) {
                    bioContact.classList.add('selected');
                }
            } else {
                // For regular list items, show description
                const description = this.nextElementSibling;
                if (description && description.classList.contains('description')) {
                    description.classList.add('selected');
                }
            }

            // Close mobile menu
            listContainer.classList.remove('active');
            mobileMenuToggle.classList.remove('active');

            // Update the title display after a small delay
            setTimeout(updateSelectedProjectTitle, 50);
        });
    });

});

// Function to update the selected project title in the header
function updateSelectedProjectTitle() {
    const selectedItem = document.querySelector('.list-item.selected, .bio-header.selected');
    const titleDisplay = document.querySelector('.selected-project-title');

    if (selectedItem && titleDisplay) {
        // Check if it's bio-header or a regular list item
        if (selectedItem.classList.contains('bio-header')) {
            // For bio header, get text from project
            const bioText = selectedItem.querySelector('.name').textContent;
            titleDisplay.textContent = bioText;
        } else if (selectedItem.classList.contains('list-item')) {
            // For regular list items, get text from project-name
            const projectName = selectedItem.querySelector('.project-name').textContent;
            titleDisplay.textContent = projectName;
        }
    } else if (titleDisplay) {
        titleDisplay.textContent = 'Select Project'; // Default text when nothing is selected
    }
}

