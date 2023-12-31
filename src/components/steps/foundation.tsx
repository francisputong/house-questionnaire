import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';

import { FormField, FormLabel } from '@/components/ui/form';
import { capitalizeFirstLetter } from '@/lib/utils';
import { foundationMaterials } from './options/foundation-options';
import { slideInRight } from '@/lib/animation';
import InputSlider from '@/components/inputs/input-slider';
import InputRadioGroup from '@/components/inputs/input-radio-group';
import InputWrapper from '@/components/inputs/input-wrapper';
import { HouseFormData } from '@/pages/start';

const foundationSizeFields = ['length', 'width', 'height'];

function mapFieldNameToField(fieldName: string): keyof HouseFormData {
    if (foundationSizeFields.includes(fieldName)) {
        return `foundationSize.${fieldName}` as keyof HouseFormData;
    }
    throw new Error('Invalid field name');
}

const Foundation = () => {
    const form = useFormContext<HouseFormData>();

    return (
        <div className='flex flex-col w-full space-y-3'>
            <div className='mb-4'>
                <p className='font-semibold text-xl lg:text-3xl 2xl:text-4xl text-left'>Foundation</p>
                <p className='text-muted-foreground text-sm lg:text-md text-left'>
                    Create your foundation by choosing the details below!
                </p>
            </div>
            <motion.div {...slideInRight} className='flex flex-col items-center justify-between text-center'>
                <FormField
                    control={form.control}
                    name='foundationType'
                    render={({ field }) => {
                        return (
                            <InputWrapper label='Foundation'>
                                <InputRadioGroup
                                    value={field.value}
                                    onChange={field.onChange}
                                    radioItems={foundationMaterials}
                                />
                            </InputWrapper>
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
                                        <InputWrapper>
                                            <InputSlider
                                                name={size}
                                                min={50}
                                                max={300}
                                                label={`${capitalizeFirstLetter(size)} in meters`}
                                                onChange={field.onChange}
                                                value={field.value.toString()}
                                            />
                                        </InputWrapper>
                                    );
                                }}
                            />
                        );
                    })}
                </div>
            </motion.div>
        </div>
    );
};

export default Foundation;
