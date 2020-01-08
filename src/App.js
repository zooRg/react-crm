import React, { useEffect, useState } from 'react';
import LeftMenu                       from './Todo/LeftMenu';
import Loader                         from './Todo/Loader';
import TodoList                       from './Todo/TodoList';
import TodoForm                       from './Todo/TodoForm';

function App () {
	const [list, setList] = useState({ items: [], text: '', loading: true });
	
	useEffect(() => {
		let local = localStorage.getItem('newItem');
		if (local) {
			setTimeout(function () {
				setList({ items: JSON.parse(local), text: '', loading: false });
			}, 1000);
		}
	}, []);
	
	useEffect(() => {
		localStorage.setItem('newItem', JSON.stringify(list.items));
	}, [list]);
	
	function handleCompleted (id) {
		const items = list.items.concat();
		
		const item = items.find(item => item.id === id);
		item.completed = !item.completed;
		
		setList({ items: items, text: '', loading: false });
	}
	
	function handleDelete (id) {
		let items = list.items.concat();
		items = items.filter(item => item.id !== id);
		if (items) {
			setList({ items: items, text: '', loading: false });
		}
	}
	
	function handleClear (e) {
		e.preventDefault();
		setList({ items: [], text: '', loading: false });
		localStorage.clear();
	}
	
	function handleChange (e) {
		setList({ items: list.items, text: e.target.value, loading: false });
	}
	
	function handleSubmit (e) {
		e.preventDefault();
		if (!list.text) {
			return;
		}
		const newItem = {
			text: list.text,
			id: Date.now(),
			completed: false
		};
		setList(state => ({
			items: state.items.concat(newItem),
			text: '',
			loading: false
		}));
	}
	
	return (
		<div className="main-container page-container">
			<section className="menu-toggle">
				<LeftMenu/>
			</section>
			<section className="my-list">
				{list.loading ? <Loader/> : ''}
				<div className="landing-notice-card">
					<h3>Task list</h3>
					<TodoList
						items={list.items}
						onCompleted={handleCompleted.bind(this)}
						onDelete={handleDelete.bind(this)}
					/>
					<TodoForm
						length={list.items.length}
						text={list.text}
						onSubmit={handleSubmit.bind(this)}
						onChange={handleChange.bind(this)}
						onClear={handleClear.bind(this)}
					/>
				</div>
			</section>
		</div>
	);
}

export default App;
