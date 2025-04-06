document.querySelectorAll('.list-item').forEach(item => {
    item.addEventListener('click', event => {
        // Remove 'selected' class from all list items
        document.querySelectorAll('.list-item').forEach(el => el.classList.remove('selected'));

        // Add 'selected' class to the clicked item
        item.classList.add('selected');
    });
});