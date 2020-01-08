import React     from 'react';
import PropTypes from 'prop-types';

function TodoItem ({ item, index, onCompleted, onDelete }) {
	const classes = ['list-item'];
	let buttonDisabled = false;
	if (item.completed) {
		classes.push('isCompleted');
		buttonDisabled = true;
	}
	return (
		<li className={classes.join(' ')}>
			<span>{index + 1}&nbsp;-&nbsp;{item.text}</span>
			<button
				className="list__item-edit"
				onClick={() => onCompleted(item.id)}>
			</button>
			<button
				className="list__item-status"
				onClick={() => onCompleted(item.id)}
				disabled={buttonDisabled}>
				{buttonDisabled ? 'Completed' : 'Active'}
			</button>
			<button
				onClick={() => onDelete(item.id)}>&times;</button>
		</li>
	);
}

TodoItem.propTypes = {
	index: PropTypes.number,
	item: PropTypes.object,
	onCompleted: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired
};

export default TodoItem;