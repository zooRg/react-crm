import React     from 'react';
import TodoItem  from './TodoItem';
import PropTypes from 'prop-types';

function TodoList ({ items, onEdit, updateValue, onCompleted, onDelete }) {
	return (
		<ul className="notice-card-list">
			{items.map((item, index) => {
				return (
					<TodoItem
						item={item}
						index={index}
						onEdit={() => onEdit(item.id)}
						onCompleted={() => onCompleted(item.id)}
						onDelete={() => onDelete(item.id)}
						updateValue={updateValue}
						key={item.id}
					/>
				);
			})}
		</ul>
	);
}

TodoItem.propTypes = {
	items: PropTypes.object,
	onEdit: PropTypes.func.isRequired,
	onCompleted: PropTypes.func.isRequired,
	onDelete: PropTypes.func.isRequired,
	updateValue: PropTypes.func.isRequired
};

export default TodoList;