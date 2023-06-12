type TypeChunks = {
    type: string;
    value: string;
}

export const usdFormatted = (value: bigint | number, fraction: number = 0) : string => {
    // formatting currency in dollars and cents without rounding
    const trauncateFractionAndFormat = (chunks: TypeChunks[], digits: any) => {
        return chunks.map(({ type, value }: TypeChunks) => {
            if (type !== 'fraction' || value.length < digits) return value;
            
            let fraction = "";
            for (let i=0, counter=0; i < value.length && counter < digits; i++) {
                if (value[i] !== '0') counter++;
                fraction += value[i];
            }

            return fraction;
        }).join('');
    };
    
    const formattedValue =  trauncateFractionAndFormat(Intl.NumberFormat('en-US', {
        maximumSignificantDigits: 20,
        style: 'currency',
        currency: 'USD'
    }).formatToParts(typeof value === 'number' ? value : Number(value) / 1e18), fraction);

    return typeof value === 'number' ? formattedValue.slice(0, -1) : formattedValue
}

export const percentFormatted = (value: bigint) : string => {
    return ((Number(value) / 1e18) * 100).toString() + '%'
}