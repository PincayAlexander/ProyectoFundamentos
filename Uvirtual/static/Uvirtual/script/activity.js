const activities = [];

document.getElementById('subject-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const subject = document.getElementById('subject-select').value;
    if (subject) {
        document.getElementById('subject-form').style.display = 'none';
        document.getElementById('activity-form').style.display = 'block';
        document.getElementById('subject-back-button').style.display = 'block';
        document.getElementById('activity-form').dataset.subject = subject;
        renderActivityList();
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
    const activity = { subject, name, startDate, endDate, description };
    activities.push(activity);
    renderActivityList();
}

function renderActivityList() {
    const list = document.getElementById('activity-list');
    list.innerHTML = '';
    activities.forEach((activity, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${activity.subject}</strong> - <strong>${activity.name}</strong></span>
            <p>Fecha de inicio: ${activity.startDate}</p>
            <p>Fecha de finalización: ${activity.endDate}</p>
            <p>${activity.description}</p>
            <div class="actions">
                <button onclick="editActivity(${index})">Modificar</button>
                <button onclick="deleteActivity(${index})">Eliminar</button>
            </div>
        `;
        list.appendChild(li);
    });
}

function deleteActivity(index) {
    activities.splice(index, 1);
    renderActivityList();
}

function editActivity(index) {
    const activity = activities[index];
    const newSubject = prompt('Modificar materia de la actividad', activity.subject);
    const newName = prompt('Modificar nombre de la actividad', activity.name);
    const newStartDate = prompt('Modificar fecha de inicio de la actividad', activity.startDate);
    const newEndDate = prompt('Modificar fecha de finalización de la actividad', activity.endDate);
    const newDescription = prompt('Modificar descripción de la actividad', activity.description);

    if (newSubject && newName && newStartDate && newEndDate && newDescription) {
        activities[index] = {
            subject: newSubject,
            name: newName,
            startDate: newStartDate,
            endDate: newEndDate,
            description: newDescription
        };
        renderActivityList();
    }
}

function showSubjectForm() {
    document.getElementById('subject-form').style.display = 'block';
    document.getElementById('subject-back-button').style.display = 'none';
    document.getElementById('activity-form').style.display = 'none';
    renderActivityList();
}

