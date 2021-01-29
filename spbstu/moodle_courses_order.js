console.log("Started moodle_courses_order extension")

const ORDER_STORAGE_KEY = 'order'

const DEFAULT_DELIMITERS = ['courses-list-delimiter-1', 'courses-list-delimiter-2']
const DELIMITERS_STORAGE_KEY = 'moodle_course_delimiters'

let myCoursesBlock = document.querySelector('[data-block=course_list]')

let coursesList = document.querySelector('.block_course_list ul')

function getCoursesList() {
    return Array.from(coursesList.children)
}

if (coursesList) {
    addDelimiters()
    restoreOrder()
    enableDragging()
}

function addDelimiters() {
    let storedDelimiters = localStorage[DELIMITERS_STORAGE_KEY]
    let delimiters = storedDelimiters ? JSON.parse(storedDelimiters) : DEFAULT_DELIMITERS
    for (let delimiterId of delimiters) {
        let delimiter = document.createElement('li')
        delimiter.id = delimiterId;
        delimiter.innerHTML = '<hr>'
        delimiter.style.padding = '3px'
        coursesList.prepend(delimiter)
    }
}

function restoreOrder() {
    if (!localStorage[ORDER_STORAGE_KEY]) return;

    let order = JSON.parse(localStorage[ORDER_STORAGE_KEY])
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
        if (courses[id] != null) {
            coursesList.append(courses[id])
        }
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
    localStorage[ORDER_STORAGE_KEY] = JSON.stringify(order)
}
