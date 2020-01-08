import React from 'react';

function TodoItem (props) {
	const classes = ['list-item'];
	if (props.item.completed) {
		classes.push('isCompleted')
	}
	return (
		<li className={classes.join(' ')}>{props.item.text}</li>
	);
}

export default TodoItem;