
document.getElementById('subject-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const subject = document.getElementById('subject-select').value;
    if (subject) {
        document.getElementById('subject-form').style.display = 'none';
        document.getElementById('activity-form').style.display = 'block';
        document.getElementById('activity-form').dataset.subject = subject;
    }
});

document.getElementById('activity-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('activity-name').value;
    const startDate = document.getElementById('activity-start-date').value;
    const endDate = document.getElementById('activity-end-date').value;
    const description = document.getElementById('activity-description').value;
    const subject = document.getElementById('activity-form').dataset.subject;
    addActivity(subject, name, startDate, endDate, description);
    document.getElementById('activity-form').reset();
});

function addActivity(subject, name, startDate, endDate, description) {
    const list = document.getElementById('activity-list');
    const li = document.createElement('li');
    li.innerHTML = `
        <span><strong>${subject}</strong> - <strong>${name}</strong></span>
        <p>Fecha de inicio: ${startDate}</p>
        <p>Fecha de finalización: ${endDate}</p>
        <p>${description}</p>
        <div class="actions">
            <button onclick="editActivity(this)">Modificar</button>
            <button onclick="deleteActivity(this)">Eliminar</button>
        </div>
    `;
    list.appendChild(li);
}

function deleteActivity(button) {
    const li = button.parentElement.parentElement;
    li.remove();
}

function editActivity(button) {
    const li = button.parentElement.parentElement;
    const span = li.querySelector('span');
    const p = li.querySelectorAll('p');
    const [subject, name] = span.textContent.split(' - ');
    const startDate = p[0].textContent.split(': ')[1];
    const endDate = p[1].textContent.split(': ')[1];
    const description = p[2].textContent;

    const newSubject = prompt('Modificar materia de la actividad', subject);
    const newName = prompt('Modificar nombre de la actividad', name);
    const newStartDate = prompt('Modificar fecha de inicio de la actividad', startDate);
    const newEndDate = prompt('Modificar fecha de finalización de la actividad', endDate);
    const newDescription = prompt('Modificar descripción de la actividad', description);

    if (newSubject && newName && newStartDate && newEndDate && newDescription) {
        span.innerHTML = `<strong>${newSubject}</strong> - <strong>${newName}</strong>`;
        p[0].textContent = `Fecha de inicio: ${newStartDate}`;
        p[1].textContent = `Fecha de finalización: ${newEndDate}`;
        p[2].textContent = newDescription;
    }
}