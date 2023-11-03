// import { Button } from '@/components/ui/button';

import Foundation from '@/components/steps/foundation';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { formSchemaValidate } from '@/components/steps/formValidator';

export default function Start() {
    const [formStep, setFormStep] = useState(0);

    const nextFormStep = () => setFormStep((currentStep) => currentStep + 1);

    const prevFormStep = () => setFormStep((currentStep) => currentStep - 1);

    const form = useForm({
        resolver: zodResolver(formSchemaValidate),
        defaultValues: {
            foundation: '',
            foundationSize: {
                length: 50,
                width: 50,
                height: 50
            }
        }
    });

    return (
        <div className='flex items-center justify-center h-screen max-w-screen-lg mx-auto p-5'>
            {/* header */}
            <div className='flex flex-col gap-6 lg:gap-12 text-center w-full mx-auto'>
                <div className='flex flex-col w-full space-y-3'>
                    <FormProvider {...form}>
                        <Foundation />
                    </FormProvider>
                </div>
            </div>
        </div>
    );
}
