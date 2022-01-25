import * as React from 'react';

interface StatRowProps {
    Icon: React.JSXElementConstructor<React.ComponentProps<'svg'>>;
    name: string;
    value: number;
    compact?: boolean;
}

type StatName = 'attack' | 'defense' | 'hp';

const COMPACT_NAME_MAP: Record<StatName, string> = {
    attack: 'ATK',
    defense: 'DEF',
    hp: 'HP'
}

const StatRow = ({ Icon, name, value, compact = false }: StatRowProps) => {

    if (compact) {
        return (
            <div>
                <div><Icon className="h-6 w-6 inline-block" /></div>
                <div>{COMPACT_NAME_MAP[name as StatName]}</div>
                <div>{value}</div>
            </div> 
        )
    }

    return (
        <div className="w-full grid grid-cols-3">
            <span className="flex justify-center items-center">
                <Icon className="h-6 w-6 inline-block" />
            </span>
            <span className="flex justify-center items-center">{name}</span>
            <span className="flex justify-center items-center text-xl font-thin">{value}</span>
        </div>
    );
}

export default StatRow;
