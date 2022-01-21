import * as React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useNavigate, useSearchParams } from 'react-router-dom';

/**
 * todo - the API has different endpoints like /type /moves /locations etc
 * these would all be fun extensions for the future (SW)
 */
const POKEMON_API_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon';

const Home = () => {
    const [searchValue, setSearchValue] = React.useState('');
    const navigate = useNavigate();
    const [searchParams,] = useSearchParams();

    React.useEffect(() => {
        const search = searchParams.get('search');
        if (!search) return;

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchPokemon = async () => {
            try {
                const response = await fetch(`${POKEMON_API_ENDPOINT}/${searchValue}`, { signal });

                if (response.status === 200) {
                    const pokemon = await response.json();
                    // todo - draw something interesting with this data (SW)
                    console.log(pokemon);
                }

                if (response.status === 404) {
                    // todo - handle this gracefully in the UI (SW)
                    alert('we could not find this pokemon');
                }

            } catch(error: any) {
                if (error.name !== 'AbortError') {
                    console.error('Encountered unexpected error whhile fetching pokemon. Please contact your administrator.');
                }
            }
        }

        fetchPokemon();

        return () => controller.abort();

    }, [searchParams]);

    const onSearch = (event: React.FormEvent, searchValue: string) => {
        event.preventDefault();

        // redirect back to the home page with a search parameter set, this will trigger a useEffect to initiate the search
        // this will be nice for adding a bookmark to your favourite pokemon, sharing a link with your friend, etc.
        navigate(`./?search=${searchValue.toLowerCase()}`);
    }

    // todo - make this look not-hideous (SW)
    return (
        <div className="md:max-w-xl lg:max-w-2xl xl:max-w-5xl 2xl:max-w-2/3 mx-auto flex justify-center bg-blue-300 h-48">
            <SearchBar
                onSearch={onSearch}
                onChange={value => setSearchValue(value)}
                value={searchValue}
            />
        </div>
    );
};

export default Home;