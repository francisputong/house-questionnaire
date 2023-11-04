import { capitalizeFirstLetter } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
    value: string;
    size: string;
    onChange: (value: number) => void;
};

const InputSlider = ({ value, size, onChange }: Props) => {
    const incrementCounter = (value: number) => {
        return value + 1;
    };

    const decrementCounter = (value: number) => {
        return value - 1;
    };

    return (
        <div>
            <div className='flex flex-col w-fit mb-4'>
                <div className='flex flex-row items-center gap-4'>
                    <Button
                        disabled={Number(value) === 50}
                        onClick={(e) => {
                            e.preventDefault();
                            onChange(decrementCounter(Number(value)));
                        }}
                        variant='outline'
                        className='rounded-full h-[50px] w-[50px] p-0'
                    >
                        <Minus width={30} height={30} />
                    </Button>
                    <p className='text-5xl font-bold'>{value}</p>
                    <Button
                        disabled={Number(value) === 300}
                        onClick={(e) => {
                            e.preventDefault();
                            onChange(incrementCounter(Number(value)));
                        }}
                        variant='outline'
                        className='rounded-full h-[50px] w-[50px] p-0'
                    >
                        <Plus width={30} height={30} />
                    </Button>
                </div>
                <p>{capitalizeFirstLetter(size)} in meters</p>
            </div>
            <Slider
                onValueChange={(e) => onChange(e[0])}
                defaultValue={[50]}
                max={300}
                min={50}
                step={1}
                className='w-full'
                value={[Number(value)]}
            />
        </div>
    );
};

export default InputSlider;
