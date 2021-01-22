// export const data = {
//     all: [],
//     active: [],
//     completed: [],
// };

export let data = [];

export class TodoItem {
    constructor(listName) {
        this.listName = listName;
        this.id = Math.trunc(Math.random() * 10000);
        this.completed = false;
    }
}

export const addCompleted = function (id, completed) {
    const index = data.findIndex(todo => todo.id === id);
    data[index].completed = completed;
};

export const itemLeft = function () {
    return data.slice().filter(item => !item.completed).length;
};

export const sort = function (purpose) {
    if (purpose === 'all') return data;
    const targetSort = purpose === 'completed' ? true : false;
    return data.slice().filter(item => item.completed === targetSort);
};

export const clearCompleted = function () {
    data = data.filter(todo => !todo.completed);
};

export const deleteItem = function (id) {
    const index = data.findIndex(todo => todo.id === id);
    data.splice(index, 1);
};

export const sortDataByDrag = function (purpose, oldIndex, newIndex) {
    // clone data that's current active
    let arr = [];
    if (purpose === 'all') arr = data.slice();
    if (purpose === 'active')
        arr = data.slice().filter(todo => !todo.completed);
    if (purpose === 'completed')
        arr = data.slice().filter(todo => todo.completed);
    arr.reverse();

    // change todo position
    if (newIndex >= arr.length) {
        let k = newIndex - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);

    // merge arr and data todo
    if (purpose === 'all') return (data = arr.reverse());

    let index = 0;
    const curActive = purpose === 'completed' ? true : false;
    data.reverse();
    data.forEach((todo, i) => {
        if (todo.completed === curActive) data[i] = arr[index++];
    });
    data.reverse();
};
