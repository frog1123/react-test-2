import './App.css';
import { Header } from './components/Header/Header';
import { Users } from './components/Users/Users';

export default function App() {
	return (
		<div className='App'>
			<Header title='React thing' />
			<Users />
		</div>
	);
}
