export const floorTypes = [
    {
        value: 'Wood',
        label: 'Wood'
    },
    {
        value: 'Carpet',
        label: 'Carpet'
    }
];

export const windowStyle = [
    {
        value: 'bay',
        label: 'Bay'
    },
    {
        value: 'flat',
        label: 'Flat'
    },
    {
        value: 'fullHeight',
        label: 'Full Height'
    }
];

export const glassType = [
    {
        value: 'tempered',
        label: 'Tempered'
    },
    {
        value: 'tripleGlazed',
        label: 'Triple Glazed'
    },
    {
        value: 'doubleGlazed',
        label: 'Double Glazed'
    }
];

export const roomTypes = [
    {
        value: 'Bedroom',
        label: 'Bedroom'
    },
    {
        value: 'Lounge',
        label: 'Lounge'
    },
    {
        value: 'Diner',
        label: 'Diner'
    },
    {
        value: 'Kitchen',
        label: 'Kitchen'
    },
    {
        value: 'Bathroom',
        label: 'Bathroom'
    },
    {
        value: 'Office',
        label: 'Office'
    }
];

type AdditionalFurniture = {
    [roomType: string]: string[];
};

export const additionalFurniture: AdditionalFurniture = {
    Bedroom: ['Lamp', 'Cabinet'],
    Lounge: ['Sofa', 'Television'],
    Diner: ['Table', 'Chairs'],
    Kitchen: ['Oven', 'Fridge'],
    Bathroom: ['Mirror', 'Cabinet'],
    Office: ['Desk', 'Office Chair']
};
