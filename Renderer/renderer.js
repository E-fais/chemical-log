document.addEventListener('DOMContentLoaded', () => {
    const addChem = document.getElementById('addChem');
    addChem.addEventListener('click', () => document.getElementById('formContainer').style.display = 'block');
})
document.addEventListener('DOMContentLoaded', () => {
    const saveChem = document.getElementById('chemicalForm');
    saveChem.addEventListener('submit', (event) => {
        event.preventDefault();
        const chemicalName = document.getElementById('chemicalName').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const chemical = {
            name: chemicalName,
            expiryDate: expiryDate
        };
        document.getElementById('chemicalForm').reset();
        document.getElementById('formContainer').style.display = 'none';
        window.electron.send('save-chemical', chemical);
    });

    window.electron.on('load-chemicals', (event, chemicals) => {
        const displayLog = document.getElementById('display-log');
        displayLog.innerHTML = ''; // Clear the existing rows
        chemicals.forEach((chemical, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${chemical.name}</td>
                <td>${chemical.expiryDate}</td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            `;
            displayLog.appendChild(row);
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                window.electron.send('delete-chemical', index);
            });
        });
    });

    // Request initial load of chemicals when the page is loaded
    window.electron.send('request-chemicals');
});
