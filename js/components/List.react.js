var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoListActions = require('../actions/TodoListActions');
var Todo = require('./Todo.react');

var List = React.createClass({

  propTypes: {
    allTodos: ReactPropTypes.object.isRequired,
    areAllComplete: ReactPropTypes.bool.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    // This section should be hidden by default
    // and shown when there are todos.
    if (Object.keys(this.props.allTodos).length < 1) {
      return null;
    }

    var allTodos = this.props.allTodos;
    var todos = [];

    for (var key in allTodos) {
      todos.push(<Todo key={key} todo={allTodos[key]} />);
    }

    return (
      <div className="col-md-12 list">
        <ul className="list-unstyled" id="todo-list">{todos}</ul>
        <div className="col-md-12 done">
          <div className="checkbox">
            <label htmlFor="toggle-all">
              <input
                id="toggle-all"
                type="checkbox"
                onChange={this._onToggleCompleteAll}
                checked={this.props.areAllComplete ? 'checked' : ''}
              />
              Já fiz tudo!
            </label>
          </div>  
        </div>
      </div>
    );
  },

  /**
   * Event handler to mark all TODOs as complete
   */
  _onToggleCompleteAll: function() {
    TodoListActions.toggleCompleteAll();
  }

});

module.exports = List;

