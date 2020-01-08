import React    from 'react';
import TodoItem from './TodoItem';

function TodoList ({ items, onCompleted, onDelete }) {
	return (
		<ul className="notice-card-list">
			{items.map((item, index) => {
				return (
					<TodoItem
						item={item}
						index={index}
						onCompleted={() => onCompleted(item.id)}
						onDelete={() => onDelete(item.id)}
						key={item.id}
					/>
				);
			})}
		</ul>
	);
}

export default TodoList;