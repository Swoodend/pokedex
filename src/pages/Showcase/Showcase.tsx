import * as React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import useSearchNavigation from '../../hooks/useSearchNavigation';
import { Link } from 'react-router-dom';
import PokemonCard from '../../components/PokemonCard/PokemonCard';

interface ShowcaseProps {
    searchParam?: string;
};

interface Move {
    name: string;
    url: string;
};

export interface Type {
    name: string;
    url: string;
};

export interface Pokemon {
    img: string;
    height: number;
    weight: number;
    moves: Move[];
    name: string;
    types: Type[]
};

// todo - handle missing values (SW)
const formatPokemon = (pokemon: Record<string, any>): Pokemon => {
    const {
        sprites: { other },
        height,
        weight,
        moves,
        name,
        types,
    } = pokemon;

    return {
        img: other['official-artwork']['front_default'],
        height,
        weight,
        moves,
        name,
        types
    };
};

/**
 * todo - the API has different endpoints like /type /moves /locations etc
 * these would all be fun extensions for the future (SW)
 */
const POKEMON_API_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon';

const Showcase = ({ searchParam }: ShowcaseProps) => {
    const [featuredPokemon, setFeaturedPokemon] = React.useState<Pokemon | null | undefined>();
    const [loading, setLoading] = React.useState(true);

    const { search, setSearch, onSearch } = useSearchNavigation('./', searchParam);

    React.useEffect(() => {
        if (!searchParam) return;

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchPokemon = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${POKEMON_API_ENDPOINT}/${searchParam}`, { signal });

                if (response.status === 200) {
                    const pokemon = await response.json();
                    // todo - draw something interesting with this data (SW)
                    setFeaturedPokemon(formatPokemon(pokemon) as Pokemon)
                }

                if (response.status === 404) {
                    // todo - handle this gracefully in the UI (SW)
                    setFeaturedPokemon(null);
                }

            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    console.error('Encountered unexpected error whhile fetching pokemon. Please contact your administrator.');
                }
            } finally {
                setLoading(false);
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
            <div className="h-26 xs:h-20 xs:flex xs:items-center border-b">
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
            <div className="flex items-center justify-center flex-1">
                { loading ? <p>spinner</p> : null }

                {featuredPokemon ?
                    <PokemonCard 
                        name={featuredPokemon.name}
                        img={featuredPokemon.img}
                        height={featuredPokemon.height}
                        weight={featuredPokemon.weight}
                        moves={featuredPokemon.moves}
                        types={featuredPokemon.types}
                    />
                    : null
                }

                {/* null represents a special case where we could not find the pokemon that the user searched for*/}
                { featuredPokemon === null ? <p>show "not found" card</p> : null }
            </div>
        </div>
    );
};

export default Showcase;
