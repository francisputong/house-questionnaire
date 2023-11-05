import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Select from 'react-select';

import InputRadioGroup from '@/components/inputs/input-radio-group';
import { FormField } from '@/components/ui/form';
import { roofTypes } from './options/roof-options';

import flowers from '../../db/flowers.json';
import Stepper from '../stepper';
import InputWrapper from '../inputs/input-wrapper';

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
        localStorage.setItem('houseForm', JSON.stringify(values));
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
                                <InputWrapper label='what is the roof type?' className='mb-16'>
                                    <InputRadioGroup
                                        value={field.value}
                                        onChange={field.onChange}
                                        radioItems={roofTypes}
                                    />
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
                </div>
                <Stepper backAction={prevFormStep} setFormStep={setFormStep} formStep={formStep} />
            </form>
        </div>
    );
};

export default Roof;
