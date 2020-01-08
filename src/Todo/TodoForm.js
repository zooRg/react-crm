import React     from 'react';
import PropTypes from 'prop-types';

function TodoForm ({ length, text, isShow, onChange, onClear, onSubmit }) {
	return (
		<form
			style={isShow ? {} : {display: 'none'}}
			className="create__task-form form-create"
			onSubmit={onSubmit}>
			<label htmlFor="new-todo">Add a task with title?</label>
			<input
				type="text"
				id="new-todo"
				className="input"
				onChange={onChange}
				value={text}/>
			<div className="create__task-form--bottom">
				<button className="button red-button">
					Add #{length}
				</button>
				<button
					className="button red-button"
					onClick={onClear}>
					Clear LocalStorage
				</button>
			</div>
		</form>
	);
}

TodoForm.propTypes = {
	length: PropTypes.number,
	text: PropTypes.string,
	isShow: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	onClear: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired
};

export default TodoForm;