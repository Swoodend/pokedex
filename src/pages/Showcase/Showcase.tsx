import * as React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';

interface ShowcaseProps {
    search: string | null;
};

interface Move {
    name: string;
    url: string;
}

interface Pokemon {
    img: string;
    height: number;
    weight: number;
    moves: Move[];
    name: string;
}

// todo - handle missing values (SW)
const formatPokemon = (pokemon: Record<string, any>): Pokemon => {
    const {
        sprites: { other },
        height,
        weight,
        moves,
        name
    } = pokemon;

    return {
        img: other['official-artwork']['front-default'],
        height,
        weight,
        moves,
        name
    };
};

/**
 * todo - the API has different endpoints like /type /moves /locations etc
 * these would all be fun extensions for the future (SW)
 */
const POKEMON_API_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon';

const Showcase = ({ search }: ShowcaseProps) => {
    const [featuredPokemon, setFeaturedPokemon] = React.useState<Pokemon | null | undefined>();
    const [searchValue, setSearchValue] = React.useState(search ? search : undefined);
    
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!search) return;

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchPokemon = async () => {
            try {
                const response = await fetch(`${POKEMON_API_ENDPOINT}/${search}`, { signal });

                if (response.status === 200) {
                    const pokemon = await response.json();
                    // todo - draw something interesting with this data (SW)
                    setFeaturedPokemon(formatPokemon(pokemon) as Pokemon)
                }

                if (response.status === 404) {
                    // todo - handle this gracefully in the UI (SW)
                    alert('we could not find this pokemon');
                }

            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    console.error('Encountered unexpected error whhile fetching pokemon. Please contact your administrator.');
                }
            }
        }

        fetchPokemon();

        return () => controller.abort();

    }, [search]);

    const onChange = (value: string) => {
        setSearchValue(value);
    };

    const onSearch = (event: React.FormEvent, searchValue: string) => {
        event.preventDefault();
        navigate(`./?search=${searchValue.toLowerCase()}`);
    };

    return (
        <div className="h-26 xs:h-20 xs:flex xs:items-center bg-red-300">
            <div className="h-full xs:w-32 flex items-center bg-blue-600">
                <img 
                    src="/pokedex_logo.png"
                    alt="Pokedex logo with a pokeball mid flight"
                    className="relative -top-1"
                />
            </div>
            <div className="flex-1 px-4 py-2 md:max-w-sm lg:max-w-md" >
                <SearchBar onSearch={onSearch} onChange={onChange}  value={searchValue}/>
            </div>
            <h1>{featuredPokemon?.name}</h1>
        </div>
    )
}

export default Showcase;