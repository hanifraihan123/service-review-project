import Lottie from 'lottie-react';
import error from '../../assets/error.json';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='flex gap-4 items-center justify-center pt-10'>
            <div>
                <Lottie animationData={error}></Lottie>
            </div>
            <div>
            <p className='font-bold text-4xl'>Page Not Found</p>
            <Link to="/"><button className='btn mt-4 btn-secondary'>Go Back</button></Link>
            </div>
        </div>
    );
};

export default ErrorPage;