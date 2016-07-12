var Form = require('./Form.react');
var List = require('./List.react');
var React = require('react');
var TodoListActions = require('../actions/TodoListActions');
var TodoListStore = require('../stores/TodoListStore');



/**
 * Retrieve the current TODO data from the TodoListStore
 */
function getTodoState() {
  return {
    allTodos: TodoListStore.getAll(),
    areAllComplete: TodoListStore.areAllComplete()
  };
}

var TodoListApp = React.createClass({

  getInitialState: function() {
    return getTodoState();
  },

  componentDidMount: function() {
    TodoListStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    TodoListStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div>
        <div className="form-group">
          <Form
              id="new-todo"
              placeholder="q cê vai fzr hj?"
              onSave={this._onSave}
              className="form-control"
            />
        </div>
        <List
          allTodos={this.state.allTodos}
          areAllComplete={this.state.areAllComplete}
        />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the TodoListStore
   */
  _onChange: function() {
    this.setState(getTodoState());
  },


  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param {string} text
   */
  _onSave: function(text) {
    if (text.trim()){ 
      TodoListActions.create(text);
    }  
  }

});

module.exports = TodoListApp;
