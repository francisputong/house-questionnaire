import { FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';
import { useFormContext } from 'react-hook-form';
import InputSlider from '@/components/inputs/input-slider';
import InputRadioGroup from '@/components/inputs/input-radio-group';
import { Button } from '@/components/ui/button';
import { capitalizeFirstLetter } from '@/lib/utils';
import { foundationMaterials } from './options/foundation-options';

const foundationSizeFields = ['length', 'width', 'height'];

type FoundationData = {
    foundationType: string;
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

type Props = {
    nextFormStep: () => void;
};

const Foundation = ({ nextFormStep }: Props) => {
    const form = useFormContext<FoundationData>();

    const onSubmit = (values: FoundationData) => {
        nextFormStep();
        console.log(values);
    };

    return (
        <div className='flex flex-col w-full space-y-3'>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='flex flex-col items-center justify-between text-center'>
                    <FormField
                        control={form.control}
                        name='foundationType'
                        render={({ field }) => {
                            return (
                                <FormItem className='w-full mb-16'>
                                    <FormLabel className='flex items-start uppercase text-base font-bold text-zinc-500 dark:text-secondary/70'>
                                        Foundation
                                    </FormLabel>
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
                                    control={form.control}
                                    name={mapFieldNameToField(size)}
                                    render={({ field }) => {
                                        return (
                                            <FormItem className='w-full mb-16'>
                                                <FormControl>
                                                    <InputSlider
                                                        min={50}
                                                        max={300}
                                                        label={`${capitalizeFirstLetter(size)} in meters`}
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
