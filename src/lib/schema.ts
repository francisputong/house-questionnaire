import * as z from 'zod';

const windowSchema = z.object({
    id: z.string(),
    style: z.string().min(1, 'Please choose a glass style'),
    glassType: z.string().min(1, 'Please choose a glass type')
});

const roomSchema = z.object({
    id: z.string(),
    size: z.number().min(1),
    roomType: z.string().min(1, 'Please choose a room type'),
    floorType: z.string().min(1, 'Please choose a floor type'),
    additionalFurniture: z.string(),
    windows: z.array(windowSchema)
});

const floorDetailSchema = z.object({
    id: z.string(),
    rooms: z.array(roomSchema)
});

export const formSchemaValidate = z.object({
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
