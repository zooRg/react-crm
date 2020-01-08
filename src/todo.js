import React from 'react';

class TodoList extends React.Component {
	render () {
		return (
			<ul className="notice-card-list">
				{this.props.items.map(item => (
					<li key={item.id}>
						{item.text}
					</li>
				))}
			</ul>
		);
	}
}

class TodoApp extends React.Component {
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
				<h3>Список дел</h3>
				<TodoList items={this.state.items}/>
				<form
					className="create__task-form form-create"
					onSubmit={this.handleSubmit}>
					<label htmlFor="new-todo">
						Что нужно сделать?
					</label>
					<input
						id="new-todo"
						className="input textarea"
						onChange={this.handleChange}
						value={this.state.text}
					/>
					<button className="button red-button">
						Добавить #{this.state.items.length + 1}
					</button>
					<button
						className="button red-button"
						onClick={this.handleClear.bind(this)}>
						Очистить историю
					</button>
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
			disabled: false
		};
		this.setState(state => ({
			items: state.items.concat(newItem),
			text: ''
		}));
	}
}

export default TodoApp;