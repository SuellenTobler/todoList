var TodoListDispatcher = require('../dispatcher/TodoListDispatcher');
var TodoListConstants = require('../constants/TodoListConstants');

var TodoListActions = {

  /**
   * @param  {string} text
   */
  create: function(text) {
    TodoListDispatcher.dispatch({
      actionType: TodoListConstants.TODO_CREATE,
      text: text
    });
  },

  /**
   * @param  {string} id The ID of the ToDo item
   * @param  {string} text
   */
  updateText: function(id, text) {
    TodoListDispatcher.dispatch({
      actionType: TodoListConstants.TODO_UPDATE_TEXT,
      id: id,
      text: text
    });
  },

  /**
   * Toggle whether a single ToDo is complete
   * @param  {object} todo
   */
  toggleComplete: function(todo) {
    var id = todo.id;
    var actionType = todo.complete ?
        TodoListConstants.TODO_UNDO_COMPLETE :
        TodoListConstants.TODO_COMPLETE;

    TodoListDispatcher.dispatch({
      actionType: actionType,
      id: id
    });
  },

  /**
   * Mark all ToDos as complete
   */
  toggleCompleteAll: function() {
    TodoListDispatcher.dispatch({
      actionType: TodoListConstants.TODO_TOGGLE_COMPLETE_ALL
    });
  },

  /**
   * @param  {string} id
   */
  destroy: function(id) {
    TodoListDispatcher.dispatch({
      actionType: TodoListConstants.TODO_DESTROY,
      id: id
    });
  }


};

module.exports = TodoListActions;
