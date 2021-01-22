import * as model from './model';
import view from './View.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlSortTodo = function (purpose) {
    const items = model.sort(purpose);

    view.clear();
    view.updateCount(model.itemLeft());
    items.map(todo => view.generateMarkup(todo));
};

const controlAddTodo = function (itemName) {
    const todo = new model.TodoItem(itemName);
    model.data.push(todo);

    // re render output todo list
    // view.clear();
    // model.data.map(todo => view.generateMarkup(todo));

    const purpose = view.curActive();
    controlSortTodo(purpose);
};

const controlCompleted = function (id, checked) {
    model.addCompleted(id, checked);

    const purpose = view.curActive();
    controlSortTodo(purpose);
};

const controlClearCompleted = function () {
    model.clearCompleted();
    const purpose = view.curActive();
    controlSortTodo(purpose);
};

const controlBtnCrossDel = function (id) {
    model.deleteItem(id);
    const purpose = view.curActive();
    controlSortTodo(purpose);
};

const controlDragToSortTodo = function (oldIndex, newIndex) {
    const purpose = view.curActive();
    model.sortDataByDrag(purpose, oldIndex, newIndex);
    controlSortTodo(purpose);
};

const init = function () {
    view.addHandlerAddTodo(controlAddTodo);
    view.addHandlerAddRemoveCompleted(controlCompleted);
    view.addHandlerSort(controlSortTodo);
    view.addHandlerToggleTheme();
    view.addHandlerClearCompleted(controlClearCompleted);
    view.addHandlerBtnCrossDel(controlBtnCrossDel);
    view.addHandlerDragSortTodo(controlDragToSortTodo);
};
init();
