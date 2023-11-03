import { Label } from '@radix-ui/react-label';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { FormField, FormItem, FormControl, FormMessage } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
// import { Button } from '../ui/button';
import { z } from 'zod';
import { formSchemaValidate } from './formValidator';
import { Slider } from '../ui/slider';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { Minus, Plus } from 'lucide-react';
// import { Button } from '../ui/button';

const foundationMaterials = [
    {
        value: 'brick',
        icon: '🧱',
        name: 'Brick'
    },
    {
        value: 'slab',
        icon: '🪨',
        name: 'Slab'
    },
    {
        value: 'concrete',
        icon: '🪨',
        name: 'Concrete'
    }
];

type FoundationData = {
    foundation: string;
    foundationSize: {
        length: 50;
        width: 50;
        height: 50;
    };
};

const Foundation = () => {
    const form = useFormContext<FoundationData>();

    const onSubmit = (values: z.infer<typeof formSchemaValidate>) => {
        console.log(values);
    };

    return (
        <div>
            <div className='flex flex-col w-full space-y-3'>
                <Label htmlFor='gender' className='text-md lg:text-lg text-left font-semibold'>
                    Foundation
                </Label>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                    <div className='space-y-8'>
                        <div className='flex flex-col items-center justify-between text-center'>
                            <FormField
                                control={form.control}
                                name='foundation'
                                render={({ field }) => {
                                    return (
                                        <FormItem className='w-full mb-10'>
                                            <FormControl>
                                                <RadioGroup
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                    className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4'
                                                >
                                                    {foundationMaterials.map((foundation) => {
                                                        return (
                                                            <div key={foundation.name} className='w-full'>
                                                                <RadioGroupItem
                                                                    checked={field.value === foundation.value}
                                                                    value={foundation.value}
                                                                    id={foundation.name}
                                                                    className='peer sr-only'
                                                                />
                                                                <Label
                                                                    htmlFor={foundation.name}
                                                                    className='flex h-full text-center text-xl lg:text-2xl gap-2 flex-col items-center justify-between rounded-md border-2 border-muted 
                                                                        p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-sky-500 peer-data-[state=checked]:bg-secondary 
                                                                        [&:has([data-state=checked])]:border-primary cursor-pointer'
                                                                >
                                                                    <span className='text-2xl lg:text-3xl'>
                                                                        {foundation.icon}
                                                                    </span>
                                                                    {foundation.name}
                                                                    <p className='text-sm'>aw</p>
                                                                </Label>
                                                            </div>
                                                        );
                                                    })}
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                            <FormField
                                control={form.control}
                                name='foundationSize.height'
                                render={({ field }) => {
                                    return (
                                        <FormItem className='w-full'>
                                            <FormControl>
                                                <div>
                                                    <div className='flex flex-row items-center gap-4 mb-4'>
                                                        <Button
                                                            variant='outline'
                                                            className='rounded-full h-[50px] w-[50px] p-0'
                                                        >
                                                            <Minus width={30} height={30} />
                                                        </Button>
                                                        <p className='text-5xl'>{field.value}</p>
                                                        <Button
                                                            variant='outline'
                                                            className='rounded-full h-[50px] w-[50px] p-0'
                                                        >
                                                            <Plus width={30} height={30} />
                                                        </Button>
                                                    </div>

                                                    <Slider
                                                        onValueChange={(e) => field.onChange(e[0])}
                                                        defaultValue={[50]}
                                                        max={100}
                                                        step={1}
                                                        className='w-full'
                                                        value={[field.value]}
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                    </div>
                    {/* <Button>submit</Button> */}
                </form>
            </div>
        </div>
    );
};

export default Foundation;
