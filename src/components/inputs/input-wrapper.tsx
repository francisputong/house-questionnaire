import { ReactNode } from 'react';
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';
import { cn } from '@/lib/utils';

type Props = {
    children: ReactNode;
    label?: string;
    className?: string;
};

const InputWrapper = ({ children, label, className }: Props) => {
    return (
        <FormItem className={cn('w-full mb-12', className)}>
            {label && (
                <FormLabel className='flex items-start uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70'>
                    {label}
                </FormLabel>
            )}
            <FormControl>{children}</FormControl>
            <FormMessage />
        </FormItem>
    );
};

export default InputWrapper;
