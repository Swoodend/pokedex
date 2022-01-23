import * as React from 'react';

interface StatRowProps {
    Icon: React.JSXElementConstructor<React.ComponentProps<'svg'>>;
    name: string;
    value: number;
}

const StatRow = ({ Icon, name, value }: StatRowProps) => {
    return (
        <div className="w-full grid grid-cols-3">
            <span className="flex justify-center items-center">
                <Icon className="h-6 w-6 inline-block" />
            </span>
            <span className="flex justify-center items-center">{name}</span>
            <span className="flex justify-center items-center text-3xl font-thin">{value}</span>
        </div>
    );
}

export default StatRow;
