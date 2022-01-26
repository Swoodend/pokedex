import * as React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import useSearchNavigation from '../../hooks/useSearchNavigation';
import Spinner from '../../components/Spinner/Spinner';
import { Link } from 'react-router-dom';
import PokemonCard from '../../components/PokemonCard/PokemonCard';
import { PlusCircleIcon, SwitchHorizontalIcon, ShieldExclamationIcon, HandIcon } from '@heroicons/react/outline';
import UserMenu from '../../components/UserMenu/UserMenu';
import { TYPE_COLOR_MAPPING } from '../../components/PokemonCard/TypeColorMapping';
import NotFound from './NotFound';

interface ShowcaseProps {
    searchParam?: string;
};

interface MoveResponse {
    move: Move
};

interface Move {
    name: string;
    url: string;
};

interface TypeReponse {
    type: Type,
}

export interface Type {
    name: string;
    url: string;
};

interface StatResponse {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    }
}

interface Stat {
    name: string;
    value: number;
    icon: React.FunctionComponent<React.ComponentProps<'svg'>>;
}

export interface Pokemon {
    img: string;
    height: number;
    weight: number;
    moves: Move[];
    name: string;
    types: Type[];
    stats: Stat[];
    primaryColor: string;
    fontColor: string;
    description: string;
};

const POKEMON_STATS: Record<string, boolean> = { hp: true, defense: true, speed: true, attack: true };

const STAT_ICON_MAP: Record<string, React.FunctionComponent> = {
    hp: PlusCircleIcon,
    defense: ShieldExclamationIcon,
    speed: SwitchHorizontalIcon,
    attack: HandIcon
};

const formatStats = (stats: StatResponse[]): Stat[] => {
    return stats
        .filter(statObj => POKEMON_STATS[statObj.stat.name])
        .map(statObj => ({
            name: statObj.stat.name,
            value: statObj.base_stat,
            icon: STAT_ICON_MAP[statObj.stat.name]
        } as Stat));
};

const formatMoves = (moves: MoveResponse[]) => moves.map(move => ({ ...move.move }));
const formatTypes = (types: TypeReponse[]) => types.map(type => ({ ...type.type }));

// todo - handle missing values (SW)
const formatPokemon = (pokemon: Record<string, any>): Pokemon => {
    const {
        sprites: { other },
        height,
        weight,
        moves,
        name,
        types,
        stats,
        description
    } = pokemon;

    const formattedTypes = formatTypes(types);
    const primaryType = formattedTypes[0].name.toLowerCase();

    const primaryColor = TYPE_COLOR_MAPPING[primaryType];
    const fontColor = TYPE_COLOR_MAPPING[`${primaryType}-text`];

    return {
        img: other['official-artwork']['front_default'],
        height,
        weight,
        name,
        types: formattedTypes,
        moves: formatMoves(moves),
        stats: formatStats(stats),
        description,
        primaryColor,
        fontColor
    };
};

const fetchPokemonDescription = async (endpoint: string) => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = await fetch(endpoint, { signal });
        const speciesObject = await response.json();
        const description = speciesObject?.flavor_text_entries?.[0]?.flavor_text || 'No description found';

        // remove carraige returns/form feeds return by the API
        return description.replace(/\r?\n|\r|\f/g, ' ');
    } catch (error: any) {
        if (error.name !== 'AbortError') {
            // caught by the caller, fetchPokemon
            throw new Error('Could not fetch pokemon description');
        }
    }
}

/**
 * todo - the API has different endpoints like /type /moves /locations etc
 * these would all be fun extensions for the future (SW)
 */
const POKEMON_API_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon';

const Showcase = ({ searchParam }: ShowcaseProps) => {
    const [featuredPokemon, setFeaturedPokemon] = React.useState<Pokemon | null | undefined>();
    const [loading, setLoading] = React.useState(true);

    const { search, setSearch, onSearch } = useSearchNavigation('./', searchParam);


    // todo - performance upgrade for the future
    // when redirecting to this page from the Favourites page, pass the state of the pokemon along instead
    // of refetching again (SW)
    React.useEffect(() => {
        if (!searchParam) return;

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchPokemon = async () => {
            setFeaturedPokemon(undefined);
            setLoading(true);
            try {
                const response = await fetch(`${POKEMON_API_ENDPOINT}/${searchParam}`, { signal });

                if (response.status === 200) {
                    const pokemon = await response.json();
                    const description = await fetchPokemonDescription(pokemon.species.url);
                    setFeaturedPokemon(formatPokemon({ ...pokemon, description }) as Pokemon)
                }

                if (response.status === 404) {
                    // todo - handle this gracefully in the UI (SW)
                    setFeaturedPokemon(null);
                }

            } catch (error: any) {
                if (error.name !== 'AbortError') {
                    console.error('Encountered unexpected error while fetching pokemon. Please contact your administrator:', error.message);
                }
            } finally {
                // todo - create a loading component (SW)
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
                <div className="flex items-center flex-1 px-4 py-2 md:justify-between">
                    <div className="flex-1 px-4 py-2 md:max-w-sm lg:max-w-md" >
                        <SearchBar onSearch={onSearch} onChange={onChange} value={search} />
                    </div>
                    <div className="flex justify-center xs:justify-end flex-grow-0 flex-1 pr-6">
                        <UserMenu />
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center flex-1">
                {loading ?
                    <Spinner />
                    : null
                }

                {featuredPokemon ?
                    <PokemonCard
                        name={featuredPokemon.name}
                        img={featuredPokemon.img}
                        height={featuredPokemon.height}
                        weight={featuredPokemon.weight}
                        moves={featuredPokemon.moves}
                        types={featuredPokemon.types}
                        stats={featuredPokemon.stats}
                        primaryColor={featuredPokemon.primaryColor}
                        fontColor={featuredPokemon.fontColor}
                        description={featuredPokemon.description}
                    />
                    : null
                }

                {/* null represents a special case where we could not find the pokemon that the user searched for*/}
                {featuredPokemon === null ? <NotFound search={search} /> : null}
            </div>
        </div>
    );
};

export default Showcase;
