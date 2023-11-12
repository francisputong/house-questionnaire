import { useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';

import { formSchemaValidate } from '@/lib/schema';
import Foundation from '@/components/steps/foundation';
import { zodResolver } from '@hookform/resolvers/zod';
import Floor from '@/components/steps/floor';
import Roof from '@/components/steps/roof';
import Stepper from '@/components/stepper';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';

export type HouseFormData = {
    foundationType: string;
    foundationSize: {
        length: number;
        width: number;
        height: number;
    };
    floorDetails: {
        id: string;
        rooms: {
            id: string;
            size: number;
            roomType: string;
            floorType: string;
            additionalFurniture: string;
            windows: {
                id: string;
                style: string;
                glassType: string;
            }[];
        }[];
    }[];
    roofType: string;
    gardenPlants: { label: string; value: string }[];
};

type FieldName = keyof HouseFormData;

const stepFields = [['foundationType', 'foundationSize'], ['floorDetails'], ['roofType', 'gardenPlants']];

export default function Start() {
    const [formStep, setFormStep] = useState(0);
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchemaValidate>>({
        resolver: zodResolver(formSchemaValidate),
        defaultValues: {
            foundationType: '',
            foundationSize: {
                length: 50,
                width: 50,
                height: 50
            },
            floorDetails: [
                {
                    id: uuidv4(),
                    rooms: [
                        {
                            id: uuidv4(),
                            size: 50,
                            roomType: '',
                            floorType: '',
                            windows: [
                                {
                                    id: uuidv4(),
                                    style: '',
                                    glassType: ''
                                }
                            ],
                            additionalFurniture: ''
                        }
                    ]
                }
            ],
            roofType: '',
            gardenPlants: [{ label: 'Azalea', value: 'Azalea' }]
        }
    });

    const onSubmit: SubmitHandler<HouseFormData> = () => {
        localStorage.setItem('houseForm', JSON.stringify(form.getValues()));

        navigate('/finish');
    };
    const nextFormStep = async () => {
        const output = await form.trigger(stepFields[formStep] as FieldName[], { shouldFocus: true });
        if (!output) return;

        if (formStep === 2) {
            form.handleSubmit(onSubmit);
        } else {
            localStorage.setItem('houseForm', JSON.stringify(form.getValues()));
            setFormStep((currentStep) => currentStep + 1);
        }
    };

    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

    useEffect(() => {
        const storedForm = localStorage.getItem('houseForm');

        if (storedForm) {
            const initialData: HouseFormData = JSON.parse(storedForm);

            form.setValue('foundationType', initialData.foundationType);
            form.setValue('foundationSize', initialData.foundationSize);
            form.setValue('floorDetails', initialData.floorDetails);
        }
    }, []);

    return (
        <div className='flex items-center justify-center h-screen max-w-screen-lg mx-auto p-5'>
            {/* header */}
            <div className='flex flex-col gap-6 lg:gap-12 text-center w-full mx-auto h-full'>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormProvider {...form}>
                        {formStep === 0 && <Foundation />}
                        {formStep === 1 && <Floor />}
                        {formStep === 2 && <Roof />}
                    </FormProvider>
                    <Stepper
                        nextFormStep={nextFormStep}
                        setFormStep={setFormStep}
                        formStep={formStep}
                        prevFormStep={prevFormStep}
                    />
                </form>
            </div>
        </div>
    );
}
