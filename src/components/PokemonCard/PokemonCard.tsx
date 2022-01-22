import * as React from 'react';
import { Pokemon } from '../../pages/Showcase/Showcase';
import { HeartIcon } from '@heroicons/react/solid';
import TypesDisplayRow from './TypesDisplayRow'

interface PokemonCardProps extends Pokemon {};

// todo - this will become the main display component when we successfully fetch pokemon data (SW)
const PokemonCard = (props: PokemonCardProps) => {
    const {
        name,
        height,
        img,
        moves,
        weight,
        types
    } = props;

    return (
        <div className="bg-white border-2 rounded-2xl shadow-lg h-132 xs:h-180 w-full xs:max-w-md sm: max-w-lg">
            <div className="flex flex-col h-full">
                <div className="h-2/5 w-ful flex justify-center p-2 relative">
                    <div className="absolute top-2 right-2 p-0.5 bg-red-500 rounded-md cursor-pointer" title="Add to favourites">
                        <HeartIcon className="h-8 w-8 text-white"/>
                    </div>
                    <img src={img} alt={`The pokemon ${name}`} className="h-full object-cover"/>
                </div>
                <div className="flex-1 bg-blue-600 rounded-b-2xl text-white relative">
                    <div className="absolute top-2 right-2"> 
                        <TypesDisplayRow types={types} />
                    </div>
                    <h1 className="text-7xl font-thin pl-4 pt-4">{`${name[0].toUpperCase()}${name.substring(1)}`}</h1>
                </div>
            </div>
        </div>
    );
};

export default PokemonCard