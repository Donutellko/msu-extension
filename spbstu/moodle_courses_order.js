console.log("Started moodle_courses_order extension")

let coursesList = document.querySelector('.block_course_list ul')
function getCoursesList() {
    return Array.from(coursesList.children)
}

addDelimiter('courses-list-delimiter')
restoreOrder()
enableDragging()

function addDelimiter(id) {
    let delimiter = document.createElement('li')
    delimiter.id = id
    delimiter.href = 'delimiter'
    delimiter.innerHTML = '<hr>'
    delimiter.style.padding = '3px'
    coursesList.append(delimiter)
}

function restoreOrder() {
    if (!localStorage['order']) return;

    let order = JSON.parse(localStorage['order'])
    let courses = {}
    getCoursesList().forEach((el) => {
        let a = el.querySelector('a')
        if (a != null) {
            courses[a.href] = el
        } else {
            courses[el.id] = el
        }
    })
    order.forEach((id) => {
        coursesList.append(courses[id])
    })
}

function enableDragging() {
    let dragging, draggedOver;

    getCoursesList().forEach((el) => {
        el.draggable = true
        el.ondrag = (e) => {
            dragging = el
        };
        el.ondragover = (e) => {
            e.preventDefault();
            draggedOver = el
        };
        el.ondrop = (e) => {
            if (dragging && draggedOver) {
                coursesList.insertBefore(dragging, draggedOver)
                draggedOver = null
                dragging = null

                saveOrder();
            }
        };
    })
}

function saveOrder() {
    let order = []
    getCoursesList().forEach((el) => {
        let a = el.querySelector('a')
        order.push(a !== null ? a.href : el.id)
    })
    localStorage['order'] = JSON.stringify(order)
}
