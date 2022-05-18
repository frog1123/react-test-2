import { FC, useState, useEffect, MouseEvent } from 'react';
import './User.css';

interface Thing {
	user: any;
	loading: boolean;
}
interface UserID {
	userid: number;
}
type ClickHandler = (event: any) => (e: MouseEvent) => void;

export const User: FC<UserID> = props => {
	const [data, setData] = useState<Thing>({ user: null, loading: true });

	useEffect(() => {
		async function fetchData() {
			const url = `http://localhost:3001/api/users/${props.userid}`;
			const response = await fetch(url);
			const data = await response.json();

			setData({ user: data, loading: false });

			console.log(data);
		}

		fetchData();
	}, []);

	const deleteUser: ClickHandler = () => async e => {
		console.log(props.userid);

		const res = await fetch(`http://localhost:3001/api/users/${props.userid}`, {
			method: 'DELETE'
		});
		return res.json();
	};

	return (
		<div className='container'>
			{data.loading ? (
				<h1>loading...</h1>
			) : (
				<div>
					<h1>Username: {data.user.name}</h1>
					<h1>ID: {data.user.id}</h1>
					<button onClick={deleteUser(data.user.id)} className='delete-btn'>
						<h2>DELETE</h2>
					</button>
				</div>
			)}
		</div>
	);
};
