var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoListActions = require('../actions/TodoListActions');
var Form = require('./Form.react');

var classNames = require('classnames');

var Todo = React.createClass({

  propTypes: {
   todo: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      isEditing: false
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var todo = this.props.todo;

    var input;
    if (this.state.isEditing) {
      input =
        <Todo
          className="edit"
          onSave={this._onSave}
          value={todo.text}
        />;
    }

    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    return (
      <li
        className={classNames({
          'completed': todo.complete,
          'editing': this.state.isEditing
        })}
        key={todo.id}>
        <div className="checkbox">
          <label onDoubleClick={this._onDoubleClick}>
            <input
              className="toggle"
              type="checkbox"
              checked={todo.complete}
              onChange={this._onToggleComplete}
            />
            {todo.text}
          </label>
          <button className="destroy" onClick={this._onDestroyClick} ><i className="glyphicon glyphicon-remove"></i></button>
          {input}
        </div>
      </li>
    );
  },

  _onToggleComplete: function() {
    TodoListActions.toggleComplete(this.props.todo);
  },

  _onDoubleClick: function() {
    this.setState({isEditing: true});
  },
 
  /**
   * Event handler called within TodoTextInput.
   * Defining this here allows TodoTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave: function(text) {
    TodoListActions.updateText(this.props.todo.id, text);
    this.setState({isEditing: false});
  },

  _onDestroyClick: function() {
    TodoListActions.destroy(this.props.todo.id);
  }

});

module.exports = Todo;

