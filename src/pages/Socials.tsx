import { Link } from "react-router-dom";

const Instagram = () => {
	return (
		<div className='min-h-screen flex items-center justify-center bg-gray-100'>
			<div className='text-center'>
				<h1 className='text-4xl font-bold mb-4'>COMING SOON</h1>
				<Link to='/dashboard' className='text-blue-500 hover:text-blue-700 underline'>
					Return to Home
				</Link>
			</div>
		</div>
	);
};

export default Instagram;
