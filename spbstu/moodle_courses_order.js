console.log("Started moodle_courses_order extension")

let coursesList = document.querySelector('.block_course_list ul')
function getCoursesList() {
    return Array.from(coursesList.children)
}

restoreOrder()
enableDragging()

function restoreOrder() {
    if (!localStorage['order']) return;

    let order = JSON.parse(localStorage['order'])
    let courses = {}
    getCoursesList().forEach((el) => {
        let id = el.querySelector('a').href
        courses[id] = el
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
        order.push(el.querySelector('a').href)
    })
    localStorage['order'] = JSON.stringify(order)
}