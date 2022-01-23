import * as React from 'react';
import { Pokemon } from '../../pages/Showcase/Showcase';
import { HeartIcon, ScaleIcon, ArrowUpIcon } from '@heroicons/react/solid';
import TypesDisplayRow from './TypesDisplayRow'
import StatRow from './StatRow'
import { TYPE_COLOR_MAPPING } from './TypeColorMapping';

interface PokemonCardProps extends Pokemon { };

// todo - this will become the main display component when we successfully fetch pokemon data (SW)
const PokemonCard = (props: PokemonCardProps) => {
    const {
        name,
        height,
        img,
        moves,
        weight,
        types,
        stats
    } = props;

    const [showMoves, setShowMoves] = React.useState(false);
    
    const primaryType = types[0].name.toLowerCase();

    const backgroundColor = TYPE_COLOR_MAPPING[primaryType];
    const fontColor = TYPE_COLOR_MAPPING[`${primaryType}-text`];

    return (
        <div className="bg-white border-2 rounded-2xl shadow-lg h-132 xs:h-180 w-full xs:max-w-md sm: max-w-lg">
            <div className="flex flex-col h-full">
                <div className="h-2/5 w-ful flex justify-center p-2 relative">
                    <div className="absolute top-2 right-2 p-0.5 bg-red-500 rounded-md cursor-pointer" title="Add to favourites">
                        <HeartIcon className="h-8 w-8 text-white" />
                    </div>
                    <img src={img} alt={`The pokemon ${name}`} className="h-full object-cover" />
                </div>
                <div className={`flex flex-col flex-1 p-4 ${backgroundColor} ${fontColor} relative overflow-y-auto rounded-b-2xl`}>
                    {
                        showMoves ?
                        <div>
                            {moves.map(move => <div key={move.name} className="text-white">{move.name}</div>)}
                        </div>
                        :
                        <>
                            <div className="absolute top-2 right-2">
                                <TypesDisplayRow types={types} />
                            </div>
                            <h1 className="text-7xl font-thin">{`${name[0].toUpperCase()}${name.substring(1)}`}</h1>
                            <div className="grid grid-cols-2 grid-rows-2 gap-2 pt-6">
                                {stats.map(stat => <StatRow key={stat.name} Icon={stat.icon} name={stat.name} value={stat.value} />)}
                                <StatRow Icon={ArrowUpIcon} name="height" value={height} />
                                <StatRow Icon={ScaleIcon} name="weight" value={weight} />
                            </div>
                        </>
                    }

                    <div className="flex-1 mt-2 flex items-end justify-end sticky bottom-0">
                        <button
                            role="button"
                            aria-pressed={showMoves}
                            onClick={() => setShowMoves(!showMoves)}
                            className={`border-2 px-2 py-1 rounded text-sm ${backgroundColor} ${fontColor} border-${fontColor.split('-')[1]}
                             focus:outline-none focus:ring-1 focus:ring-blue-200 transition translate active:scale-95`}
                        >
                            View {showMoves ? 'stats' : 'moves'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PokemonCard