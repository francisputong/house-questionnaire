import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className='flex items-center justify-center h-screen max-w-screen-lg mx-auto p-5'>
            {/* header */}
            <div className='flex flex-col gap-6 lg:gap-12 text-center w-full mx-auto'>
                <h1 className='text-4xl lg:text-6xl font-bold text-center leading-relaxed'>
                    Build a <span className='text-sky-500'>House 🏠</span> in{' '}
                    <span className='text-sky-500'>minutes</span> ⏱
                </h1>

                <p className='text-lg text-neutral-400 lg:px-24 mx-auto'>
                    Transform your dream home into a reality with our cutting-edge house design questionnaire! No design
                    experience needed – just your vision and our intuitive tool. Join us in crafting the home you've
                    always dreamed of – let's start building memories today!
                </p>

                <Button
                    onClick={() => navigate('/start')}
                    size='lg'
                    className='w-60 mt-16 py-7 text-xl rounded-full shadow-lg mx-auto text-white pulse-button'
                >
                    Start Now
                </Button>
            </div>
        </div>
    );
}
