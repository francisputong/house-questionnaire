import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Select from 'react-select';
import { motion } from 'framer-motion';

import InputRadioGroup from '@/components/inputs/input-radio-group';
import { FormField } from '@/components/ui/form';
import { roofTypes } from './options/roof-options';

import flowers from '../../db/flowers.json';
import InputWrapper from '../inputs/input-wrapper';
import { slideInRight } from '@/lib/animation';
import { HouseFormData } from '@/pages/start';

const Roof = () => {
    const form = useFormContext<HouseFormData>();
    const [flowersList] = useState(flowers);

    const flowerOptions = flowersList.flowerlist.map((flower) => ({
        value: flower.name,
        label: flower.name
    }));

    return (
        <div className='flex flex-col h-full justify-center w-full'>
            <div className='mb-4'>
                <p className='font-semibold tracking-tight text-xl lg:text-3xl 2xl:text-4xl text-left'>
                    Roof and Garden
                </p>
                <p className='text-muted-foreground text-sm lg:text-md text-left'>
                    Select the roof type and plants you want for your new home!
                </p>
            </div>
            <motion.div {...slideInRight} className='flex flex-col items-center justify-between text-center'>
                <FormField
                    control={form.control}
                    name='roofType'
                    render={({ field }) => {
                        return (
                            <InputWrapper label='what is the roof type?' className='mb-16'>
                                <InputRadioGroup value={field.value} onChange={field.onChange} radioItems={roofTypes} />
                            </InputWrapper>
                        );
                    }}
                />
                <FormField
                    control={form.control}
                    name='gardenPlants'
                    render={({ field }) => {
                        return (
                            <InputWrapper className='mb-10' label='choose your garden plants'>
                                <Select
                                    id='gardenPlants'
                                    isMulti={true}
                                    value={field.value}
                                    onChange={(option) => {
                                        field.onChange(option);
                                    }}
                                    menuPlacement='top'
                                    className='w-1/2'
                                    closeMenuOnSelect={false}
                                    options={flowerOptions}
                                />
                            </InputWrapper>
                        );
                    }}
                />
            </motion.div>
        </div>
    );
};

export default Roof;
