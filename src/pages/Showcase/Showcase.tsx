import * as React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import useSearchNavigation from '../../hooks/useSearchNavigation';
import { Link } from 'react-router-dom';

interface ShowcaseProps {
    searchParam?: string;
};

interface Move {
    name: string;
    url: string;
};

interface Pokemon {
    img: string;
    height: number;
    weight: number;
    moves: Move[];
    name: string;
};

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

const Showcase = ({ searchParam }: ShowcaseProps) => {
    const [featuredPokemon, setFeaturedPokemon] = React.useState<Pokemon | null | undefined>();

    const { search, setSearch, onSearch } = useSearchNavigation('./', searchParam);

    React.useEffect(() => {
        if (!searchParam) return;

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchPokemon = async () => {
            try {
                const response = await fetch(`${POKEMON_API_ENDPOINT}/${searchParam}`, { signal });

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

    }, [searchParam]);

    const onChange = (value: string) => {
        setSearch(value);
    };

    return (
        <div className="min-h-screen flex flex-col">
            <div className="h-26 xs:h-20 xs:flex xs:items-center">
                <Link to="/">
                    <div className="h-full xs:w-32 flex items-center bg-blue-600 xs:bg-gray-50">
                        <img
                            src="/pokedex_logo.png"
                            alt="Pokedex logo with a pokeball mid flight"
                            className="relative -top-1"
                        />
                    </div>
                </Link>
                <div className="flex-1 px-4 py-2 md:max-w-sm lg:max-w-md" >
                    <SearchBar onSearch={onSearch} onChange={onChange} value={search} />
                </div>
            </div>
            <div className="flex items-center justify-center flex-1 bg-teal-300">{featuredPokemon?.name}</div>
        </div>
    );
};

export default Showcase;