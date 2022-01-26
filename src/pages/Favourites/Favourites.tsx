import * as React from 'react';
import { useFavouritePokemon } from '../../context/FavouritePokemonProvider';
import { Link } from 'react-router-dom';
import { uppercase } from '../../components/PokemonCard/PokemonCard';
import { XIcon } from '@heroicons/react/solid';
import { Pokemon } from '../Showcase/Showcase';
import { toast } from 'react-toastify';

const Favourites = () => {
    const { setFavouritePokemon, favouritePokemon } = useFavouritePokemon();


    const onRemovePokemon = (pokemon: Pokemon) => {
        setFavouritePokemon(favouritePokemon.filter(p => p.name !== pokemon.name));
        toast.success(`${pokemon.name} removed from favourites!`);
    };

    return (
        <div className="min-h-screen p-6">
            <h1 className="text-5xl font-semibold mb-4">Favourites</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {favouritePokemon.map(pokemon => {
                    const { name, img, primaryColor, fontColor, description } = pokemon;

                    return (
                        <div
                            key={name}
                            className={`flex max-h-52 md:max-h-32 rounded-xl ${fontColor} border relative shadow-md shadow-gray-400`}
                        >
                            <div className="flex items-center rounded-l-xl bg-white">
                                <img className="max-h-32 rounded-l-xl" src={img} alt={`An image of the pokemon ${name}`} />
                            </div>
                            <div className={`flex flex-col flex-1 h-full py-2 pl-4 rounded-r-xl ${primaryColor}`}>
                                <div className="flex text-lg font-medium">
                                    <div className="flex-shrink-0">{uppercase(name)}</div>
                                    <div className="flex items-center justify-end w-full mr-2">
                                        <Link 
                                            to={`/?search=${name}`}
                                            className="text-sm font-light px-2 hover:underline hover:underline-offset-2 cursor-pointer">
                                            Details
                                        </Link>
                                        <XIcon className={`h-5 w-5 ${fontColor} cursor-pointer`} onClick={() => onRemovePokemon(pokemon)} />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between flex-1">
                                    <p className={`${fontColor} italic pr-2`}>{description}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Favourites;
