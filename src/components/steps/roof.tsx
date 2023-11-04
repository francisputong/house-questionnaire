import { useFormContext } from 'react-hook-form';
import Select from 'react-select';

import InputRadioGroup from '@/components/inputs/input-radio-group';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { roofTypes } from './options/roof-options';

import { useState } from 'react';
import flowers from './flowers.json';
import Stepper from '../stepper';

type RoofData = {
    roofType: 'straw' | 'thatched' | 'tiled' | 'flat';
    gardenPlants: { label: string; value: string }[];
};

type Props = {
    prevFormStep: () => void;
    setFormStep: (step: number) => void;
    formStep: number;
};

const Roof = ({ prevFormStep, setFormStep, formStep }: Props) => {
    const form = useFormContext<RoofData>();
    const [flowersList] = useState(flowers);

    const onSubmit = (values: RoofData) => {
        // nextFormStep();
        console.log(values);
    };
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

            <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='flex flex-col items-center justify-between text-center'>
                    <FormField
                        control={form.control}
                        name='roofType'
                        render={({ field }) => {
                            return (
                                <FormItem className='w-full mb-16'>
                                    <FormLabel className='flex items-start uppercase text-base font-bold text-zinc-500 dark:text-secondary/70'>
                                        Roof type
                                    </FormLabel>
                                    <FormControl>
                                        <InputRadioGroup
                                            value={field.value}
                                            onChange={field.onChange}
                                            radioItems={roofTypes}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <FormField
                        control={form.control}
                        name='gardenPlants'
                        render={({ field }) => {
                            return (
                                <FormItem className='w-full mb-10'>
                                    <FormLabel className='flex items-start uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70'>
                                        Choose your garden plants
                                    </FormLabel>
                                    <FormControl>
                                        <Select
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
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                </div>
                <Stepper backAction={prevFormStep} setFormStep={setFormStep} formStep={formStep} />
            </form>
        </div>
    );
};

export default Roof;
