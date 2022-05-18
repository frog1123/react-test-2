import { FC, useEffect, useState } from 'react';
import { User } from './User';

export const Users: FC = () => {
	const [data, setData] = useState<any>({ users: null, loading: true });

	useEffect(() => {
		async function fetchData() {
			const url = `http://localhost:3001/api/users`;
			const response = await fetch(url);
			const data = await response.json();

			setData({ users: data, loading: false });

			console.log(data);
		}

		fetchData();
	}, []);

	return (
		<div>
			{data.loading ? (
				<h1>loading...</h1>
			) : (
				<div>
					{data.users.map((value: any, index: number) => (
						<User userid={index + data.users[0].id} /> // gets lowest id
					))}
				</div>
			)}
		</div>
	);
};
