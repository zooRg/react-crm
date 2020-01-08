import React    from 'react';
import TodoList from './Todo/TodoList';
import LeftMenu from './Todo/LeftMenu';

function App () {
	return (
		<div className="main-container page-container">
			<section className="menu-toggle">
				<LeftMenu />
			</section>
			<section className="my-list">
				<TodoList />
			</section>
		</div>
	);
}

export default App;
