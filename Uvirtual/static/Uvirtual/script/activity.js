  const activities = [];
  let currentRole = '';
  let userEmail = '';
  
    document.getElementById('role-form').addEventListener('submit', function (e) {
        e.preventDefault();
        currentRole = document.getElementById('role-select').value;
        userEmail = document.getElementById('email-input').value.toLowerCase();
        if (currentRole === "Docente" && userEmail.endsWith("@gmail.com") && validateTeacherEmail(userEmail)) {
            document.getElementById('role-form').style.display = 'none';
            document.getElementById('subject-form').style.display = 'block';
            document.getElementById('role-back-button').style.display = 'block';
        } else if (currentRole === "Estudiante" && validateStudentEmail(userEmail)) {
            document.getElementById('role-form').style.display = 'none';
            document.getElementById('role-back-button').style.display = 'block';
            showStudentView();
        } else {
            alert("Correo inválido para el rol seleccionado.");
        }
    });

    function validateTeacherEmail(email) {
        const pattern = /^[0-9]{4}@gmail\.com$/;
        return pattern.test(email);
    }

    function validateStudentEmail(email) {
        const pattern = /^[a-z]+\.[a-z]@gmail\.com$/;
        return pattern.test(email);
    }

    document.getElementById('subject-form').addEventListener('submit', function (e) {
        e.preventDefault();
        const subject = document.getElementById('subject-select').value;
        if (subject) {
            document.getElementById('subject-form').style.display = 'none';
            document.getElementById('activity-form').style.display = 'block';
            document.getElementById('subject-back-button').style.display = 'block';
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
            `;
            if (currentRole === 'Docente' && userEmail.endsWith("@gmail.com") && validateTeacherEmail(userEmail)) {
                li.innerHTML += `
                    <div class="actions">
                        <button onclick="editActivity(${index})">Modificar</button>
                        <button onclick="deleteActivity(${index})">Eliminar</button>
                    </div>
                `;
            } else if (currentRole === 'Estudiante' && validateStudentEmail(userEmail)) {
                li.innerHTML += `
                    <div class="actions">
                        <button onclick="addSubmission(${index})">Agregar Entrega</button>
                    </div>
                    <form id="submission-form-${index}" class="upload-button" style="display: none;">
                        <input type="file" id="file-upload-${index}" name="file-upload" required>
                        <button type="button" onclick="submitFile(${index})">Enviar</button>
                    </form>
                `;
            }
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

    function addSubmission(index) {
        const form = document.getElementById(`submission-form-${index}`);
        form.style.display = 'block';
    }

    function submitFile(index) {
        const fileInput = document.getElementById(`file-upload-${index}`);
        const file = fileInput.files[0];
        if (file) {
            alert(`Archivo ${file.name} enviado correctamente.`);
            const form = document.getElementById(`submission-form-${index}`);
            form.style.display = 'none';
            fileInput.value = ''; // Clear file input
        } else {
            alert('Por favor seleccione un archivo.');
        }
    }

    function showRoleForm() {
        document.getElementById('role-form').style.display = 'block';
        document.getElementById('role-back-button').style.display = 'none';
        document.getElementById('subject-form').style.display = 'none';
        document.getElementById('subject-back-button').style.display = 'none';
        document.getElementById('activity-form').style.display = 'none';
        document.getElementById('activity-back-button').style.display = 'none';
        document.getElementById('activity-list').innerHTML = '';
        currentRole = '';
        userEmail = '';
    }

    function showSubjectForm() {
        document.getElementById('subject-form').style.display = 'block';
        document.getElementById('subject-back-button').style.display = 'none';
        document.getElementById('activity-form').style.display = 'none';
        document.getElementById('activity-back-button').style.display = 'none';
        renderActivityList();
    }

    function showStudentView() {
        renderActivityList();
    }

