import React, { useState } from 'react';

function MenuItem ({ item, onClick }) {
	const classes = ['menu-toggle__item'];
	if (item.active) {
		classes.push('menu_toggle__item--current');
	}
	return (
		<li
			className={classes.join(' ')}
			key={item.name}
			onClick={() => onClick(item.name)}>
			{item.name}
		</li>
	);
}

function TodoLeftMenu ({ onShow }) {
	const [menuItems, setMenuItem] = useState({
		items: [
			{
				active: true,
				name: 'Add',
				link: '#',
				sort: 'all'
			},
			{
				active: false,
				name: 'Completed',
				link: '#',
				sort: 'complete'
			},
			{
				active: false,
				name: 'Active',
				link: '#',
				sort: 'active'
			}
		]
	});
	
	function handleClick (name, sort) {
		const items = menuItems.items.concat();
		
		items.map(item => {
			item.active = false;
			if (item.name === name) {
				item.active = !item.active;
			}
			return item;
		});
		
		onShow(sort);
		setMenuItem({ items });
	}
	
	return (
		<ul className="menu-toggle__list">
			{menuItems.items.map(item => (
				<MenuItem
					item={item}
					onClick={() => handleClick(item.name, item.sort)}
					key={item.name}/>
			))}
		</ul>
	);
}

export default TodoLeftMenu;