import { cn } from '@/lib/utils';
import { Button } from './ui/button';

type Props = {
    backAction: () => void;
    setFormStep: (step: number) => void;
    formStep: number;
};

const Stepper = ({ backAction, setFormStep, formStep }: Props) => {
    return (
        <div className='hborder-t-2 py-3 px-8 bg-opacity-50 backdrop-blur-md bg-white z-50 fixed bottom-0 left-0 w-full flex justify-between h-[70px] md-[80px]'>
            <Button onClick={backAction} className='h-12 md:h-full text-lg w-32 pulse-button'>
                Back
            </Button>
            <div className='hidden md:flex w-[250px] justify-between relative'>
                <Button
                    onClick={() => setFormStep(0)}
                    variant='outline'
                    className={cn(
                        'text-2xl rounded-full h-[50px] w-[50px] p-0 z-30',
                        formStep === 0 ? 'pulse-button border-sky-600 bg-sky-200 border-2' : ''
                    )}
                >
                    🏠
                </Button>
                <div
                    className={cn(
                        'w-[60px] h-[3px] border-2 border-gray-200 absolute top-1/2 right-36 z',
                        formStep > 0 ? 'border-sky-500' : ''
                    )}
                />
                <Button
                    onClick={() => setFormStep(1)}
                    variant='outline'
                    className={cn(
                        'text-2xl rounded-full h-[50px] w-[50px] p-0 z-30',
                        formStep === 1 ? 'pulse-button border-sky-600 bg-sky-200 border-2' : ''
                    )}
                >
                    🛋️
                </Button>
                <div
                    className={cn(
                        'w-[60px] h-[3px] border-2 border-gray-200 absolute top-1/2 right-10 z',
                        formStep > 1 ? 'border-sky-500' : ''
                    )}
                />

                <Button
                    onClick={() => setFormStep(2)}
                    variant='outline'
                    className={cn(
                        'text-2xl rounded-full h-[50px] w-[50px] p-0 z-30',
                        formStep === 2 ? 'pulse-button border-sky-600 bg-sky-200 border-2' : ''
                    )}
                >
                    🪴
                </Button>
            </div>
            <Button type='submit' className='h-12 md:h-full text-lg w-32 pulse-button'>
                Next
            </Button>
        </div>
    );
};

export default Stepper;
