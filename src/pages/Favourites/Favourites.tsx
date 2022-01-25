import * as React from 'react';
import { useFavouritePokemon } from '../../context/FavouritePokemonProvider';

const Favourites = () => {
    const { favouritePokemon } = useFavouritePokemon();

    return (
        <div>
            {favouritePokemon.map(pokemon => {
                return <div>{pokemon.name}</div>
            })}
        </div>
    );
};

export default Favourites;
