import React, { Suspense, useEffect, useState } from 'react';
import LeftMenu                                 from './Todo/LeftMenu';
import Loader                                   from './Todo/Loader';

const TodoList = React.lazy(() => import('./Todo/TodoList'));
const TodoForm = React.lazy(() => import('./Todo/TodoForm'));

function App () {
	const [list, setList] = useState(
		{ items: [], text: '', formShow: true, sort: 'all' });
	
	useEffect(() => {
		let local = localStorage.getItem('newItem');
		if (local) {
			setList({
				items: JSON.parse(local),
				text: '',
				formShow: true,
				sort: 'all'
			});
		}
	}, []);
	
	useEffect(() => {
		const listItems = [...list.items];
		const newList = listItems.sort(function (a, b) {
			if (a.text.toLowerCase() > b.text.toLowerCase()) { return -1; }
			if (a.text.toLowerCase() < b.text.toLowerCase()) { return 1; }
			return 0;
		});
		
		localStorage.setItem('newItem', JSON.stringify(newList));
	}, [list]);
	
	function handleEdit (id) {
		if (!id) {
			return;
		}
		const items = list.items.concat();
		const item = items.find(item => item.id === id);
		item.isInEditMode = true;
		
		setList({ items: items, text: '', formShow: true, sort: 'all' });
	}
	
	function handleUpdateValue (text, id) {
		if (!id || !text) {
			return;
		}
		const items = list.items.concat();
		const item = items.find(item => item.id === id);
		item.text = text;
		item.isInEditMode = false;
		
		setList({ items: items, text: '', formShow: true, sort: 'all' });
	}
	
	function handleCompleted (id) {
		if (!id) {
			return;
		}
		const items = list.items.concat();
		const item = items.find(item => item.id === id);
		item.completed = !item.completed;
		item.isInEditMode = false;
		
		setList({ items: items, text: '', formShow: true, sort: 'all' });
	}
	
	function handleDelete (id) {
		if (!id) {
			return;
		}
		let items = list.items.concat();
		items = items.filter(item => item.id !== id);
		
		if (items) {
			setList({ items: items, text: '', formShow: true, sort: 'all' });
		}
	}
	
	function handleClear (e) {
		e.preventDefault();
		setList({ items: [], text: '', formShow: true, sort: 'all' });
		localStorage.clear();
	}
	
	function handleChange (e) {
		if (!e.target.value) {
			return;
		}
		setList({
			items: list.items,
			text: e.target.value,
			formShow: true,
			sort: 'all'
		});
	}
	
	function handleSubmit (e) {
		e.preventDefault();
		if (!list.text.length) {
			return;
		}
		const listItems = [...list.items];
		const newItem = {
			text: list.text,
			id: Date.now(),
			completed: false,
			isInEditMode: false
		};
		listItems.push(newItem);
		const newList = listItems.sort(function (a, b) {
			if (a.text.toLowerCase() > b.text.toLowerCase()) { return -1; }
			if (a.text.toLowerCase() < b.text.toLowerCase()) { return 1; }
			return 0;
		});
		setList({
			items: newList,
			text: '',
			loading: false,
			formShow: true,
			sort: 'all'
		});
	}
	
	function handleShowCompleted (sort) {
		let formShow = false;
		if (sort === 'all') {
			formShow = true;
		}
		return setList({ items: list.items, text: '', formShow: formShow, sort: sort });
	}
	
	return (
		<div className="main-container page-container">
			<section className="menu-toggle">
				<LeftMenu onShow={handleShowCompleted.bind(this)}/>
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
								sort={list.sort}
								onEdit={handleEdit.bind(this)}
								updateValue={handleUpdateValue}
								onCompleted={handleCompleted.bind(this)}
								onDelete={handleDelete.bind(this)}
							/>
							<TodoForm
								length={list.items.length}
								text={list.text}
								isShow={list.formShow}
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
