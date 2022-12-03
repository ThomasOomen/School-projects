const containers = document.querySelectorAll('.block')

const droppable = new Draggable.Droppable(containers, {
    draggable: '.draggable',
    droppable: '.droppable'
});