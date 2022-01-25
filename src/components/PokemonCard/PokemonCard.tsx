import * as React from 'react';
import { Pokemon } from '../../pages/Showcase/Showcase';
import { HeartIcon, ScaleIcon, ArrowUpIcon } from '@heroicons/react/solid';
import TypesDisplayRow from './TypesDisplayRow'
import StatRow from './StatRow'
import { TYPE_COLOR_MAPPING } from './TypeColorMapping';
import { useFavouritePokemon } from '../../context/FavouritePokemonProvider';
import { toast } from 'react-toastify';

interface PokemonCardProps extends Pokemon { };

// todo - this probably belongs in a "utils.ts" type file (SW)
const uppercase = (value: string) => `${value[0].toUpperCase()}${value.substring(1)}`;

const PokemonCard = (props: PokemonCardProps) => {
    const {
        name,
        height,
        img,
        moves,
        weight,
        types,
        stats,
        primaryColor
    } = props;

    const [showMoves, setShowMoves] = React.useState(false);
    
    const { favouritePokemon, setFavouritePokemon } = useFavouritePokemon();

    const onAddFavourite = () => {
        const alreadyFavourited = favouritePokemon.filter(pokemon => pokemon.name === name).length;

        if (alreadyFavourited) {
            toast(`${uppercase(name)} is already a favourite pokemon!`, { type: 'error' });
            return;
        }

        // this is currently just a duplicate of props, but it might not always be a 1:1 match
        // so I pulled it out to a variable
        const newFavourite = {
            name,
            height,
            img,
            moves,
            weight,
            types,
            stats,
            primaryColor
        };
        
        // todo - it's probably convenient if we expose a function that handles this merge logic
        // instead of making the developer do it every time (SW)
        setFavouritePokemon([...favouritePokemon, newFavourite]);
        toast(`${uppercase(name)} added to favourites`, { type: 'success' });
    }
    
    const fontColor = TYPE_COLOR_MAPPING[`${primaryColor}-text`];
    
    return (
        <div className="bg-white border-2 rounded-2xl shadow-lg h-132 xs:h-180 w-full xs:max-w-md sm: max-w-lg">
            <div className="flex flex-col h-full">
                <div className="h-1/2 w-ful flex justify-center p-2 relative">
                    <div className="absolute top-2 right-2 p-0.5 rounded-md cursor-pointer" title="Add to favourites">
                        <button 
                            title="Add to favourites"
                            className="focus:outline-none focus:ring-1 ring-red-500 rounded-md ring-offset-2 transition-transform transform active:scale-95"
                        >
                            <HeartIcon 
                                className="h-8 w-8 text-white bg-red-500 rounded-md"
                                onClick={onAddFavourite}
                            />
                        </button>
                    </div>
                    <img src={img} alt={`The pokemon ${name}`} className="h-full object-cover select-none" />
                </div>
                <div className={`flex flex-col flex-1 p-4 ${primaryColor} ${fontColor} relative overflow-y-auto overflow-x-hidden rounded-b-2xl`}>
                    {
                        showMoves ?
                            <>
                                <h1 className="text-4xl mb-2 font-md select-none">Moves</h1>
                                <div className="grid grid-cols-2">
                                    {moves.map(move => <div key={move.name}>{move.name}</div>)}
                                </div>
                            </>
                        :
                        <>
                            <div className="absolute top-3 right-3">
                                <TypesDisplayRow types={types} fontColor={fontColor}/>
                            </div>
                            <h1 className="text-7xl font-thin select-none">{`${uppercase(name)}`}</h1>
                            <div className="grid grid-cols-2 grid-rows-2 gap-2 pt-6 xs:pt-12 xs:gap-y-4">
                                {stats.map(stat => <StatRow key={stat.name} Icon={stat.icon} name={stat.name} value={stat.value} />)}
                                <StatRow Icon={ArrowUpIcon} name="height" value={height} />
                                <StatRow Icon={ScaleIcon} name="weight" value={weight} />
                            </div>
                        </>
                    }

                    <div className="flex-1 mt-2 flex items-end justify-end sticky bottom-0">
                        <button
                            type="button"
                            aria-pressed={showMoves}
                            onClick={() => setShowMoves(!showMoves)}
                            className={`px-2 py-1 rounded text-sm ${primaryColor} ${fontColor}
                             focus:outline-none underline underline-offset-4`}
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