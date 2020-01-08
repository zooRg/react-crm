import React from 'react';

class TodoLeftMenu extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			items: [
				{
					className: 'menu-toggle__item menu_toggle__item--current',
					active: true,
					name: 'Add',
					link: '#'
				},
				{
					className: 'menu-toggle__item',
					active: false,
					name: 'Completed',
					link: '#'
				},
				{
					className: 'menu-toggle__item',
					active: false,
					name: 'Active',
					link: '#'
				}
			]
		};
	}
	
	render () {
		return (
			<ul className="menu-toggle__list">
				{this.state.items.map(item => (
					<li
						className={item.className}
						key={item.name}
						onClick={this.handleClick.bind(this, item.name)}>
						{item.name}
					</li>
				))}
			</ul>
		);
	}
	
	handleClick (name) {
		const items = this.state.items.concat();
		
		items.map(item => {
			if (item.name === name)
				 return (item.className = 'menu-toggle__item menu_toggle__item--current');
			else
				return (item.className = 'menu-toggle__item');
		});
		
		this.setState({ items: items });
	}
}

export default TodoLeftMenu;