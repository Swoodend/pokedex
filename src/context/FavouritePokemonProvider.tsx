import * as React from 'react';
import { Pokemon } from '../pages/Showcase/Showcase';

interface FavouritePokemonContext {
    favouritePokemon: Pokemon[],
    setFavouritePokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>
};

interface FavouritePokemonProviderProps {
    children: React.ReactChild;
}

const FavPokemonContext = React.createContext<FavouritePokemonContext | undefined>(undefined);

const FavouritePokemonProvider = ({ children }: FavouritePokemonProviderProps) => {
    const [favouritePokemon, setFavouritePokemon] = React.useState<Pokemon[]>([]);

    const ctx: FavouritePokemonContext = { favouritePokemon, setFavouritePokemon };

    return (
        <FavPokemonContext.Provider value={ctx}>
            {children}
        </FavPokemonContext.Provider>
    );
};

const useFavouritePokemon = () => {
    const favPokemonContext = React.useContext(FavPokemonContext);

    if (favPokemonContext === undefined) {
        throw new Error('useFavouritePokemon must be wrapped in a FavouritePokemonProvider component');
    }

    return favPokemonContext;
};

export { useFavouritePokemon };
export default FavouritePokemonProvider;
