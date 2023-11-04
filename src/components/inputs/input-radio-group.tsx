import { Label } from '@radix-ui/react-label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type Props = {
    value: string;
    onChange: (value: string) => void;
    radioItems: {
        value: string;
        icon?: string;
        name: string;
        id: string;
    }[];
};

const InputRadioGroup = ({ value, radioItems, onChange }: Props) => {
    return (
        <RadioGroup
            value={value}
            onValueChange={onChange}
            className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-3 gap-4'
        >
            {radioItems.map((item) => {
                return (
                    <div key={item.id} className='w-full'>
                        <RadioGroupItem
                            checked={value === item.value}
                            value={item.value}
                            id={item.id}
                            className='peer sr-only'
                        />
                        <Label
                            htmlFor={item.id}
                            className='flex h-full text-center text-xl gap-2 flex-col items-center justify-between rounded-md border-2 border-muted 
                                    p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-sky-500 peer-data-[state=checked]:bg-secondary 
                                    [&:has([data-state=checked])]:border-primary cursor-pointer'
                        >
                            {item.icon && <span className='text-2xl lg:text-3xl'>{item.icon}</span>}
                            {item.name}
                        </Label>
                    </div>
                );
            })}
        </RadioGroup>
    );
};

export default InputRadioGroup;
