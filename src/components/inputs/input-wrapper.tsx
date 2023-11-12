import { ReactNode } from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';
import { cn } from '@/lib/utils';

type Props = {
    children: ReactNode;
    label?: string;
    className?: string;
    isError?: boolean;
};

const InputWrapper = ({ children, label, className, isError = true }: Props) => {
    return (
        <FormItem className={cn('w-full mb-12', className)}>
            {label && (
                <FormLabel className='flex items-start uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70'>
                    {label}
                </FormLabel>
            )}
            <FormControl>{children}</FormControl>
            {isError && <FormMessage className='text-left' />}
        </FormItem>
    );
};

export default InputWrapper;
