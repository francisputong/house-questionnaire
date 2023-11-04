import { Label } from '@radix-ui/react-label';
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import { z } from 'zod';
import { formSchemaValidate } from './formValidator';
import InputSlider from '@/components/inputs/input-slider';
import InputRadioGroup from '@/components/inputs/input-radio-group';
import { Button } from '@/components/ui/button';

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

const foundationSizeFields = ['length', 'width', 'height'];

type FoundationData = {
    foundation: string;
    foundationSize: {
        length: number;
        width: number;
        height: number;
    };
};

function mapFieldNameToField(fieldName: string): keyof FoundationData {
    if (foundationSizeFields.includes(fieldName)) {
        return `foundationSize.${fieldName}` as keyof FoundationData;
    }
    throw new Error('Invalid field name');
}

const Foundation = () => {
    const { handleSubmit, control } = useFormContext<FoundationData>();

    const onSubmit = (values: z.infer<typeof formSchemaValidate>) => {
        console.log(values);
    };

    return (
        <div className='flex flex-col w-full space-y-3'>
            <form onSubmit={handleSubmit(onSubmit)} className=''>
                <div className=''>
                    <div className='flex flex-col items-center justify-between text-center'>
                        <FormField
                            control={control}
                            name='foundation'
                            render={({ field }) => {
                                return (
                                    <FormItem className='w-full mb-16'>
                                        <Label className='flex items-start uppercase text-base font-bold text-zinc-500 dark:text-secondary/70'>
                                            Foundation
                                        </Label>
                                        <FormControl>
                                            <InputRadioGroup
                                                value={field.value}
                                                onChange={field.onChange}
                                                radioItems={foundationMaterials}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />
                        <div className='w-full mb-16'>
                            <FormLabel className='flex items-start uppercase text-base font-bold text-zinc-500 dark:text-secondary/70 mb-4'>
                                Size of foundation
                            </FormLabel>
                            {foundationSizeFields.map((size) => {
                                return (
                                    <FormField
                                        key={size}
                                        control={control}
                                        name={mapFieldNameToField(size)}
                                        render={({ field }) => {
                                            return (
                                                <FormItem className='w-full mb-16'>
                                                    <FormControl>
                                                        <InputSlider
                                                            size={size}
                                                            onChange={field.onChange}
                                                            value={field.value.toString()}
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            );
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className='border-t-2 py-3 px-8 bg-opacity-50 backdrop-blur-md bg-white z-50 fixed bottom-0 left-0 w-full flex justify-end h-[75px]'>
                    <Button type='submit' className='h-full text-lg w-32 pulse-button'>
                        Next
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Foundation;
