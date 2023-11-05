import { Slider } from '@/components/ui/slider';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Props = {
    value: string;
    label?: string;
    min: number;
    max: number;
    onChange: (value: number) => void;
};

const InputSlider = ({ value, label, min, max, onChange }: Props) => {
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
                        disabled={Number(value) === min}
                        onClick={(e) => {
                            e.preventDefault();
                            onChange(decrementCounter(Number(value)));
                        }}
                        variant='outline'
                        className='rounded-full h-[40px] w-[40px] p-0'
                    >
                        <Minus width={30} height={30} />
                    </Button>
                    <p className='text-4xl font-bold w-16'>{value}</p>
                    <Button
                        disabled={Number(value) === max}
                        onClick={(e) => {
                            e.preventDefault();
                            onChange(incrementCounter(Number(value)));
                        }}
                        variant='outline'
                        className='rounded-full h-[40px] w-[40px] p-0'
                    >
                        <Plus width={30} height={30} />
                    </Button>
                </div>
                <p className='text-lg'>{label}</p>
            </div>
            <div className='flex flex-row gap-2'>
                <p>{min}</p>
                <Slider
                    onValueChange={(e) => onChange(e[0])}
                    defaultValue={[min]}
                    max={max}
                    min={min}
                    step={1}
                    className='w-full'
                    value={[Number(value)]}
                />
                <p>{max}</p>
            </div>
        </div>
    );
};

export default InputSlider;
