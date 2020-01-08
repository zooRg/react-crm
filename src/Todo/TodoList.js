import React    from 'react';
import TodoItem from './TodoItem';

class TodoList extends React.Component {
	constructor (props) {
		super(props);
		this.state = { items: [], text: '' };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	componentDidMount () {
		const local = localStorage.getItem('newItem');
		if (local) {
			this.setState({ items: JSON.parse(local) });
		}
	}
	
	componentDidUpdate () {
		localStorage.setItem('newItem', JSON.stringify(this.state.items));
	}
	
	render () {
		return (
			<div className="landing-notice-card">
				<h3>Task list</h3>
				<ul className="notice-card-list">
					{this.state.items.map((item, index) => {
						return (
							<TodoItem
								item={item}
								key={index}
							/>
						);
					})}
				</ul>
				<form
					className="create__task-form form-create"
					onSubmit={this.handleSubmit}>
					<label htmlFor="new-todo">Add a task with title?</label>
					<input
						id="new-todo"
						className="input"
						onChange={this.handleChange}
						value={this.state.text}
					/>
					<div className="create__task-form--bottom">
						<button className="button red-button">
							Add #{this.state.items.length + 1}
						</button>
						<button
							className="button red-button"
							onClick={this.handleClear.bind(this)}>
							Clear LocalStorage
						</button>
					</div>
				</form>
			</div>
		);
	}
	
	handleClear (e) {
		e.preventDefault();
		this.setState({ items: [], text: '' });
		localStorage.clear();
	}
	
	handleChange (e) {
		this.setState({ text: e.target.value });
	}
	
	handleSubmit (e) {
		e.preventDefault();
		if (!this.state.text.length) {
			return;
		}
		const newItem = {
			text: this.state.text,
			id: Date.now(),
			completed: false
		};
		this.setState(state => ({
			items: state.items.concat(newItem),
			text: ''
		}));
	}
}

export default TodoList;