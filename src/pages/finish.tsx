import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function Finish() {
    const navigate = useNavigate();

    const navigateAndClear = () => {
        localStorage.removeItem('houseForm');
        navigate('/');
    };

    return (
        <div className='flex items-center justify-center h-screen max-w-screen-lg mx-auto p-5'>
            {/* header */}
            <div className='flex flex-col gap-6 lg:gap-12 text-center w-full mx-auto'>
                <h1 className='text-4xl lg:text-6xl font-bold text-center leading-relaxed'>Form Submitted!</h1>

                <p className='text-lg text-neutral-400 lg:px-24 mx-auto'>Thank you for using our questionnaire!</p>
                <Button
                    data-cy='finish-button'
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
