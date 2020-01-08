import React, { Suspense, useEffect, useState } from 'react';
import LeftMenu                                 from './Todo/LeftMenu';
import Loader                                   from './Todo/Loader';

const TodoList = React.lazy(() => import('./Todo/TodoList'));
const TodoForm = React.lazy(() => import('./Todo/TodoForm'));

function App () {
	const [list, setList] = useState({ items: [], text: '' });
	
	useEffect(() => {
		let local = localStorage.getItem('newItem');
		if (local) {
			setList({ items: JSON.parse(local), text: '' });
		}
	}, []);
	
	useEffect(() => {
		localStorage.setItem('newItem', JSON.stringify(list.items));
	}, [list]);
	
	function handleEdit (id) {
		if (!id) {
			return;
		}
		const items = list.items.concat();
		const item = items.find(item => item.id === id);
		item.isInEditMode = true;
		
		setList({ items: items, text: '' });
	}
	
	function handleUpdateValue (text, id) {
		if (!id || !text) {
			return;
		}
		const items = list.items.concat();
		const item = items.find(item => item.id === id);
		item.text = text;
		item.isInEditMode = false;
		
		setList({ items: items, text: '' });
	}
	
	function handleCompleted (id) {
		if (!id) {
			return;
		}
		const items = list.items.concat();
		const item = items.find(item => item.id === id);
		item.completed = !item.completed;
		item.isInEditMode = false;
		
		setList({ items: items, text: '' });
	}
	
	function handleDelete (id) {
		if (!id) {
			return;
		}
		let items = list.items.concat();
		items = items.filter(item => item.id !== id);
		
		if (items) {
			setList({ items: items, text: '' });
		}
	}
	
	function handleClear (e) {
		e.preventDefault();
		setList({ items: [], text: '' });
		localStorage.clear();
	}
	
	function handleChange (e) {
		if (!e.target.value) {
			return;
		}
		setList({ items: list.items, text: e.target.value });
	}
	
	function handleSubmit (e) {
		e.preventDefault();
		if (!list.text.length) {
			return;
		}
		const newItem = {
			text: list.text,
			id: Date.now(),
			completed: false,
			isInEditMode: false
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
				{list.loading ? (
					<Loader/>
				) : (
					<div className="landing-notice-card">
						<h3>Task list</h3>
						<Suspense fallback={<Loader/>}>
							<TodoList
								items={list.items}
								onEdit={handleEdit.bind(this)}
								updateValue={handleUpdateValue}
								onCompleted={handleCompleted.bind(this)}
								onDelete={handleDelete.bind(this)}
							/>
							<TodoForm
								length={list.items.length}
								text={list.text}
								onChange={handleChange.bind(this)}
								onClear={handleClear.bind(this)}
								onSubmit={handleSubmit.bind(this)}
							/>
						</Suspense>
					</div>
				)}
			</section>
		</div>
	);
}

export default App;
