interface Position {
    position: string;
    longPosition: string;
}

const returnPosition = (ultraPosition: number): Position | null => {
    const positions: { [key: number]: Position } = {
        10: {
            position: "G",
            longPosition: "Gardien",
        },
        20: {
            position: "D",
            longPosition: "Defenseur",
        },
        21: {
            position: "L",
            longPosition: "Lateral",
        },
        30: {
            position: "MO",
            longPosition: "Milieu défensif",
        },
        31: {
            position: "MO",
            longPosition: "Milieu offensif",
        },
        40: {
            position: "A",
            longPosition: "Attaquant",
        },
    };

    return positions[ultraPosition] || null;
};



export default returnPosition