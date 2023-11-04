import { useState } from 'react';
import Foundation from '@/components/steps/foundation';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Floor from '@/components/steps/floor';
import { v4 as uuidv4 } from 'uuid';

import * as z from 'zod';

const windowSchema = z.object({
    style: z.string(),
    glassType: z.string()
});

const roomSchema = z.object({
    size: z.number().min(1),
    roomType: z.string(),
    floorType: z.string(),
    windows: z.array(windowSchema)
});

const floorDetailSchema = z.object({
    rooms: z.array(roomSchema)
});

const formSchemaValidate = z.object({
    foundationType: z.string(),
    foundationSize: z.object({
        length: z.number().min(1),
        width: z.number().min(1),
        height: z.number().min(1)
    }),
    floorDetails: z.array(floorDetailSchema)
});

export default function Start() {
    const [formStep, setFormStep] = useState(0);

    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

    // const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

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
            ]
        }
    });

    return (
        <div className='flex items-center justify-center h-screen max-w-screen-lg mx-auto p-5'>
            {/* header */}
            <div className='flex flex-col gap-6 lg:gap-12 text-center w-full mx-auto h-full'>
                <div className='flex flex-col w-full space-y-3'>
                    <FormProvider {...form}>
                        {formStep === 0 && <Foundation nextFormStep={nextFormStep} />}
                        {formStep === 1 && <Floor />}
                    </FormProvider>
                </div>
            </div>
        </div>
    );
}
