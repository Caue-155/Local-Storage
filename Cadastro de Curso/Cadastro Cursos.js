function saveCourse() {
    const name = document.getElementById('name').value;
    const duration = document.getElementById('duration').value;
    const coordinator = document.getElementById('coordinator').value;

    if (name && duration && coordinator) {
        const course = {
            name: name,
            duration: duration,
            coordinator: coordinator
        };

        let courses = JSON.parse(localStorage.getItem('courses')) || [];
        courses.push(course);
        localStorage.setItem('courses', JSON.stringify(courses));
        displayCourses();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function displayCourses() {
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const courseList = document.getElementById('courseList');
    courseList.innerHTML = '';

    courses.forEach((course, index) => {
        const courseDiv = document.createElement('div');
        courseDiv.innerHTML = `
            <h3>${course.name}</h3>
            <p>Duração: ${course.duration} anos</p>
            <p>Coordenador: ${course.coordinator}</p>
            <button onclick="deleteCourse(${index})">Excluir</button>
        `;
        courseList.appendChild(courseDiv);
    });
}

function deleteCourse(index) {
    let courses = JSON.parse(localStorage.getItem('courses')) || [];
    courses.splice(index, 1);
    localStorage.setItem('courses', JSON.stringify(courses));
    displayCourses();
}


window.onload = displayCourses;
