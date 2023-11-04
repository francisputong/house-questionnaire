import { v4 as uuidv4 } from 'uuid';
import { useFormContext } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';
import Select from 'react-select';

import InputSlider from '@/components/inputs/input-slider';
import Stepper from '@/components/stepper';
import { FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/components/ui/form';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { floorTypes, glassType, roomTypes, windowStyle, additionalFurniture } from './options/floor-options';
import { cn } from '@/lib/utils';

type FloorData = {
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
};

type Props = {
    prevFormStep: () => void;
    nextFormStep: () => void;
    setFormStep: (step: number) => void;
    formStep: number;
};

const Floor = ({ prevFormStep, nextFormStep, setFormStep, formStep }: Props) => {
    const { handleSubmit, control, setValue, getValues, watch } = useFormContext<FloorData>();

    const onSubmit = (values: FloorData) => {
        console.log(values);
        nextFormStep();
    };

    watch('floorDetails');

    const handleFloorCountChange = (count: number) => {
        const currentFloorDetails = getValues('floorDetails');

        const updatedFloorDetails = [...currentFloorDetails];

        if (count > currentFloorDetails.length) {
            const newFloorDetail = {
                id: uuidv4(),
                rooms: [
                    {
                        id: uuidv4(),
                        size: 50,
                        roomType: 'Bedroom',
                        floorType: 'Wood',
                        additionalFurniture: '',
                        windows: [
                            {
                                id: uuidv4(),
                                style: 'Bay',
                                glassType: 'Tempered'
                            }
                        ]
                    }
                ]
            };

            updatedFloorDetails.push(newFloorDetail);
        } else {
            updatedFloorDetails.pop();
        }

        setValue('floorDetails', updatedFloorDetails);
    };

    const handleWindowCountChange = (count: number, floorIndex: number, roomIndex: number) => {
        const currentFloorDetails = getValues('floorDetails');
        const updatedFloorDetails = [...currentFloorDetails];
        const currentWindow = [...updatedFloorDetails[floorIndex].rooms[roomIndex].windows];

        if (count > currentWindow.length) {
            const newWindowDetails = {
                id: uuidv4(),
                style: 'Bay',
                glassType: 'Tempered'
            };
            currentWindow.push(newWindowDetails);
        } else {
            currentWindow.pop();
        }

        setValue(`floorDetails.${floorIndex}.rooms.${roomIndex}.windows`, currentWindow);
    };

    const handleRoomCountChange = (count: number, index: number) => {
        const currentFloorDetails = getValues('floorDetails');
        const updatedFloorDetails = [...currentFloorDetails];
        const currentRooms = [...updatedFloorDetails[index].rooms];

        if (count > updatedFloorDetails[index].rooms.length) {
            const newWindowDetails = {
                id: uuidv4(),
                size: 50,
                roomType: 'Bedroom',
                floorType: 'Wood',
                additionalFurniture: '',
                windows: [
                    {
                        id: uuidv4(),
                        style: 'Bay',
                        glassType: 'Tempered'
                    }
                ]
            };
            currentRooms.push(newWindowDetails);
        } else {
            currentRooms.pop();
        }

        setValue(`floorDetails.${index}.rooms`, currentRooms);
    };

    const floorDetails = getValues('floorDetails');

    return (
        <div className='flex flex-col w-full space-y-3'>
            <div className='mb-4'>
                <p className='font-semibold tracking-tight text-xl lg:text-3xl 2xl:text-4xl text-left'>
                    Floors and Rooms
                </p>
                <p className='text-muted-foreground text-sm lg:text-md text-left'>
                    Select the number of floors and design the rooms!
                </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col items-center justify-between text-center'>
                    <FormField
                        control={control}
                        name='floorDetails'
                        render={({ field }) => {
                            return (
                                <FormItem className='w-full mb-12'>
                                    <FormLabel className='flex items-start uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70 mb-4'>
                                        what is the Floor Count?
                                    </FormLabel>
                                    <FormControl>
                                        <InputSlider
                                            min={1}
                                            max={5}
                                            onChange={handleFloorCountChange}
                                            value={field.value.length.toString()}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                </div>
                {floorDetails.map((floorDetail, floorIndex) => {
                    return (
                        <Card
                            key={floorDetail.id}
                            className={cn(
                                'w-full bg-gray-200',
                                floorDetails.length === floorIndex + 1 ? 'mb-24' : 'mb-8'
                            )}
                        >
                            <CardHeader>
                                <CardTitle className='text-4xl'>Floor {floorIndex + 1}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <FormField
                                    control={control}
                                    name={`floorDetails.${floorIndex}.rooms`}
                                    render={({ field }) => {
                                        return (
                                            <FormItem className='w-full mb-12'>
                                                <FormLabel className='flex items-start uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70 mb-4'>
                                                    What is the room count?
                                                </FormLabel>
                                                <FormControl>
                                                    <InputSlider
                                                        min={1}
                                                        max={50}
                                                        onChange={(value) => handleRoomCountChange(value, floorIndex)}
                                                        value={field.value.length.toString()}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />
                                {floorDetail.rooms.map((room, roomIndex) => {
                                    return (
                                        <Card key={room.id} className='mb-4 bg-gray-300'>
                                            <CardHeader>
                                                <CardTitle className='text-3xl'>Room {roomIndex + 1}</CardTitle>
                                            </CardHeader>
                                            <CardContent>
                                                <FormField
                                                    control={control}
                                                    name={`floorDetails.${floorIndex}.rooms.${roomIndex}.size`}
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem className='w-full mb-12'>
                                                                <FormLabel className='flex items-start uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70 mb-4'>
                                                                    What is the room size in square meters?
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <InputSlider
                                                                        min={50}
                                                                        max={300}
                                                                        onChange={field.onChange}
                                                                        value={field.value.toString()}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                                <div className='flex flex-col md:flex-row'>
                                                    <FormField
                                                        control={control}
                                                        name={`floorDetails.${floorIndex}.rooms.${roomIndex}.roomType`}
                                                        render={({ field }) => {
                                                            return (
                                                                <FormItem className='w-full mb-6'>
                                                                    <FormLabel className='flex items-start uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70'>
                                                                        What is the room Type?
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Select
                                                                            value={{
                                                                                value: field.value,
                                                                                label: field.value
                                                                            }}
                                                                            onChange={(option) => {
                                                                                setValue(
                                                                                    `floorDetails.${floorIndex}.rooms.${roomIndex}.additionalFurniture`,
                                                                                    ''
                                                                                );
                                                                                field.onChange(option?.label);
                                                                            }}
                                                                            className='w-[200px]'
                                                                            options={roomTypes}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            );
                                                        }}
                                                    />
                                                    <FormField
                                                        control={control}
                                                        name={`floorDetails.${floorIndex}.rooms.${roomIndex}.floorType`}
                                                        render={({ field }) => {
                                                            return (
                                                                <FormItem className='w-full mb-12'>
                                                                    <FormLabel className='flex items-start uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70'>
                                                                        What is the floor Type?
                                                                    </FormLabel>
                                                                    <FormControl>
                                                                        <Select
                                                                            value={{
                                                                                value: field.value,
                                                                                label: field.value
                                                                            }}
                                                                            onChange={(option) => {
                                                                                field.onChange(option?.label);
                                                                            }}
                                                                            className='w-[200px]'
                                                                            options={floorTypes}
                                                                        />
                                                                    </FormControl>
                                                                    <FormMessage />
                                                                </FormItem>
                                                            );
                                                        }}
                                                    />
                                                </div>

                                                <FormField
                                                    control={control}
                                                    name={`floorDetails.${floorIndex}.rooms.${roomIndex}.windows`}
                                                    render={({ field }) => {
                                                        return (
                                                            <FormItem className='w-full mb-12'>
                                                                <FormLabel className='flex items-start uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70 mb-4'>
                                                                    How many windows?
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <InputSlider
                                                                        min={1}
                                                                        max={15}
                                                                        onChange={(value) =>
                                                                            handleWindowCountChange(
                                                                                value,
                                                                                floorIndex,
                                                                                roomIndex
                                                                            )
                                                                        }
                                                                        value={field.value.length.toString()}
                                                                    />
                                                                </FormControl>
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                                {room.windows.map((window, windowIndex) => {
                                                    return (
                                                        <div key={room.id} className='flex flex-col md:flex-row'>
                                                            <FormField
                                                                control={control}
                                                                name={`floorDetails.${floorIndex}.rooms.${roomIndex}.windows.${windowIndex}.style`}
                                                                render={({ field }) => {
                                                                    return (
                                                                        <FormItem className='w-full mb-6 md:mb-12'>
                                                                            <FormLabel className='flex items-start uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70'>
                                                                                What is the Window style for window{' '}
                                                                                {windowIndex + 1}?
                                                                            </FormLabel>
                                                                            <FormControl>
                                                                                <CreatableSelect
                                                                                    className='w-[200px]'
                                                                                    value={{
                                                                                        value: field.value,
                                                                                        label: field.value
                                                                                    }}
                                                                                    onChange={(option) => {
                                                                                        field.onChange(option?.label);
                                                                                    }}
                                                                                    options={windowStyle}
                                                                                    isSearchable
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    );
                                                                }}
                                                            />
                                                            <FormField
                                                                control={control}
                                                                name={`floorDetails.${floorIndex}.rooms.${roomIndex}.windows.${windowIndex}.glassType`}
                                                                render={({ field }) => {
                                                                    return (
                                                                        <FormItem className='w-full mb-6 md:mb-12'>
                                                                            <FormLabel className='flex items-start uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70'>
                                                                                What is Glass type for window{' '}
                                                                                {windowIndex + 1}?
                                                                            </FormLabel>
                                                                            <FormControl>
                                                                                <CreatableSelect
                                                                                    className='w-[200px]'
                                                                                    value={{
                                                                                        value: field.value,
                                                                                        label: field.value
                                                                                    }}
                                                                                    onChange={(option) => {
                                                                                        field.onChange(option?.label);
                                                                                    }}
                                                                                    options={glassType}
                                                                                    isSearchable
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    );
                                                                }}
                                                            />
                                                        </div>
                                                    );
                                                })}
                                                <FormField
                                                    control={control}
                                                    name={`floorDetails.${floorIndex}.rooms.${roomIndex}.additionalFurniture`}
                                                    render={({ field }) => {
                                                        const roomType =
                                                            floorDetails[floorIndex].rooms[roomIndex].roomType;
                                                        return (
                                                            <FormItem className='w-full mb-10'>
                                                                <FormLabel className='flex items-start uppercase text-sm font-bold text-zinc-500 dark:text-secondary/70'>
                                                                    Additional furnitures for {roomType}
                                                                </FormLabel>
                                                                <FormControl>
                                                                    <Select
                                                                        value={{
                                                                            value: field.value,
                                                                            label: field.value
                                                                        }}
                                                                        onChange={(option) => {
                                                                            field.onChange(option?.label);
                                                                        }}
                                                                        className='w-[200px]'
                                                                        options={additionalFurniture[roomType].map(
                                                                            (data) => ({ label: data, value: data })
                                                                        )}
                                                                    />
                                                                </FormControl>
                                                                <FormMessage />
                                                            </FormItem>
                                                        );
                                                    }}
                                                />
                                            </CardContent>
                                        </Card>
                                    );
                                })}
                            </CardContent>
                        </Card>
                    );
                })}
                <Stepper backAction={prevFormStep} setFormStep={setFormStep} formStep={formStep} />
            </form>
        </div>
    );
};

export default Floor;
