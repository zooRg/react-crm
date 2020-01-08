import React        from 'react';
import TodoApp      from './todo';
import TodoLeftMenu from './leftMenu';
import './todo.css';

function App () {
	return (
		<div className="main-container page-container">
			<section className="menu-toggle">
				<TodoLeftMenu/>
			</section>
			<section className="my-list">
				<TodoApp/>
			</section>
		</div>
	);
}

export default App;
