import { FC } from 'react';
import './Header.css';

interface Title {
	title: string;
}

export const Header: FC<Title> = props => {
	return (
		<div className='header-div'>
			<h1 className='header-txt'>{props.title}</h1>
		</div>
	);
};
