import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as z from 'zod';
import { v4 as uuidv4 } from 'uuid';

import Foundation from '@/components/steps/foundation';
import { zodResolver } from '@hookform/resolvers/zod';
import Floor from '@/components/steps/floor';
import Roof from '@/components/steps/roof';

const windowSchema = z.object({
    style: z.string(),
    glassType: z.string()
});

const roomSchema = z.object({
    size: z.number().min(1),
    roomType: z.string(),
    floorType: z.string(),
    additionalFurniture: z.string(),
    windows: z.array(windowSchema)
});

const floorDetailSchema = z.object({
    rooms: z.array(roomSchema)
});

const formSchemaValidate = z.object({
    foundationType: z.string().min(1, 'Please select a foundation'),
    foundationSize: z.object({
        length: z.number().min(1),
        width: z.number().min(1),
        height: z.number().min(1)
    }),
    floorDetails: z.array(floorDetailSchema),
    roofType: z.string().min(1, 'Please select a roof type'),
    gardenPlants: z.array(z.object({ label: z.string(), value: z.string() }))
});

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
    roofType: 'Straw' | 'Thatched' | 'Tiled' | 'Flat';
    gardenPlants: { label: string; value: string }[];
};

export default function Start() {
    const [formStep, setFormStep] = useState(0);

    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

    const form = useForm({
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
                            roomType: 'Bedroom',
                            floorType: 'Wood',
                            windows: [
                                {
                                    id: uuidv4(),
                                    style: 'Bay',
                                    glassType: 'Tempered'
                                }
                            ],
                            additionalFurniture: ''
                        }
                    ]
                }
            ],
            roofType: 'Straw',
            gardenPlants: [{ label: 'Azalea', value: 'Azalea' }]
        }
    });

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
                <FormProvider {...form}>
                    {formStep === 0 && (
                        <Foundation formStep={formStep} setFormStep={setFormStep} nextFormStep={nextFormStep} />
                    )}
                    {formStep === 1 && (
                        <Floor
                            formStep={formStep}
                            setFormStep={setFormStep}
                            prevFormStep={prevFormStep}
                            nextFormStep={nextFormStep}
                        />
                    )}
                    {formStep === 2 && (
                        <Roof formStep={formStep} setFormStep={setFormStep} prevFormStep={prevFormStep} />
                    )}
                </FormProvider>
            </div>
        </div>
    );
}
