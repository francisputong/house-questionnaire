import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Finish() {
    const navigate = useNavigate();

    useEffect(() => localStorage.removeItem('houseForm'), []);

    const navigateAndClear = () => {
        navigate('/');
    };

    return (
        <div className='flex items-center justify-center h-screen max-w-screen-lg mx-auto p-5'>
            {/* header */}
            <div className='flex flex-col gap-6 lg:gap-12 text-center w-full mx-auto'>
                <h1 className='text-4xl lg:text-6xl font-bold text-center leading-relaxed'>Form Submitted!</h1>

                <p className='text-lg text-neutral-400 lg:px-24 mx-auto'>Thank you for using our questionnaire!</p>

                <Button
                    onClick={navigateAndClear}
                    size='lg'
                    className='w-60 mt-16 py-7 text-xl rounded-full shadow-lg mx-auto text-white pulse-button'
                >
                    Done
                </Button>
            </div>
        </div>
    );
}
