import * as React from 'react';
import { useFavouritePokemon } from '../../context/FavouritePokemonProvider';
import  { Link } from 'react-router-dom';
import StatRow from '../../components/PokemonCard/StatRow';

const Favourites = () => {
    const { favouritePokemon } = useFavouritePokemon();

    return (
        <div className="grid gap-y-6 gap-x-4 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {favouritePokemon.map(pokemon => {
                const { name, img, stats } = pokemon;
                return (
                    <Link to={`/?search=${name}`}>
                        <div className="flex h-24 rounded-md shadow-md">
                            <img className="h-full object-cover border-r" src={img} alt="foobar" />
                            <div className="flex flex-wrap flex-1 items-center justify-around px-6">
                                {stats.filter(stat => stat.name !== 'speed').map(stat => <StatRow Icon={stat.icon} compact {...stat} />)}
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default Favourites;
