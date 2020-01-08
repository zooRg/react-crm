import React     from 'react';
import PropTypes from 'prop-types';

function TodoItem ({ item, index, onEdit, updateValue, onCompleted, onDelete }) {
	const classes = ['list-item'];
	let itemValue = '';
	let buttonDisabled = false;
	if (item.completed) {
		classes.push('isCompleted');
		buttonDisabled = true;
	}
	
	function inputWatch (e) {
		itemValue = e.target.value;
	}
	
	function renderEditView () {
		return (
			<span>{index + 1}&nbsp;-&nbsp;
				<input
					type="text"
					defaultValue={item.text}
					className="input"
					onChange={inputWatch}/>
				<button onClick={() => onEdit(item.id)}>X</button>
				<button
					onClick={() => updateValue(itemValue, item.id)}>OK</button>
			</span>
		);
	}
	
	function renderDefaultView () {
		return (<span>{index + 1}&nbsp;-&nbsp;{item.text}</span>);
	}
	
	return (
		<li className={classes.join(' ')}>
			{(item.isInEditMode && !buttonDisabled)
				? renderEditView()
				: renderDefaultView()}
			{
				buttonDisabled ||
				(
					<button
						className="list__item-edit"
						onClick={() => onEdit(item.id)}>
					</button>
				)
			}
			<button
				className="list__item-status"
				onClick={() => onCompleted(item.id)}>
				{buttonDisabled ? 'Completed' : 'Active'}
			</button>
			<button onClick={() => onDelete(item.id)}>&times;</button>
		</li>
	);
}

TodoItem.propTypes = {
	index: PropTypes.number,
	item: PropTypes.object,
	onEdit: PropTypes.func.isRequired,
	onCompleted: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	updateValue: PropTypes.func.isRequired
};

export default TodoItem;