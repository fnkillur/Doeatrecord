import React from 'react';

const ButtonGroup = ({containerClass, buttons}) => (
	<div className={containerClass}>
		{
			buttons.map(({className, onClick, label}, index) => (
				<button key={index} className={className} onClick={onClick}>
					{label}
				</button>
			))
		}
	</div>
);

export default ButtonGroup;