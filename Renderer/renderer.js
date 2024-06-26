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
        console.log(chemical);
    });
});