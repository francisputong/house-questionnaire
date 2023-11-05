import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormContext } from 'react-hook-form';
import { motion } from 'framer-motion';

import InputSlider from '@/components/inputs/input-slider';
import { FormField, FormLabel } from '@/components/ui/form';
import InputRadioGroup from '@/components/inputs/input-radio-group';
import Stepper from '@/components/stepper';
import { capitalizeFirstLetter } from '@/lib/utils';
import { foundationMaterials } from './options/foundation-options';
import InputWrapper from '@/components/inputs/input-wrapper';
import { slideInRight } from '@/lib/animation';

const foundationSizeFields = ['length', 'width', 'height'];

type FoundationData = {
    foundationType: string;
    foundationSize: {
        length: number;
        width: number;
        height: number;
    };
};

type Props = {
    nextFormStep: () => void;
    setFormStep: (step: number) => void;
    formStep: number;
};

function mapFieldNameToField(fieldName: string): keyof FoundationData {
    if (foundationSizeFields.includes(fieldName)) {
        return `foundationSize.${fieldName}` as keyof FoundationData;
    }
    throw new Error('Invalid field name');
}

const Foundation = ({ formStep, nextFormStep, setFormStep }: Props) => {
    const form = useFormContext<FoundationData>();

    const navigate = useNavigate();

    useEffect(() => {
        const storedForm = localStorage.getItem('houseForm');

        if (storedForm) {
            const initialData: FoundationData = JSON.parse(storedForm);

            form.setValue('foundationType', initialData.foundationType);
            form.setValue('foundationSize', initialData.foundationSize);
        }
    }, []);

    const onSubmit = (values: FoundationData) => {
        nextFormStep();
        localStorage.setItem('houseForm', JSON.stringify(values));
    };

    return (
        <div className='flex flex-col w-full space-y-3'>
            <div className='mb-4'>
                <p className='font-semibold text-xl lg:text-3xl 2xl:text-4xl text-left'>Foundation</p>
                <p className='text-muted-foreground text-sm lg:text-md text-left'>
                    Create your foundation by choosing the details below!
                </p>
            </div>
            <form onSubmit={form.handleSubmit(onSubmit)} className='overflow-x-hidden'>
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
                <Stepper backAction={() => navigate('/')} setFormStep={setFormStep} formStep={formStep} />
            </form>
        </div>
    );
};

export default Foundation;
