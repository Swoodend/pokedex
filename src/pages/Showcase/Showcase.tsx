import * as React from 'react';

interface ShowcaseProps {
    search: string | null;
}

/**
 * todo - the API has different endpoints like /type /moves /locations etc
 * these would all be fun extensions for the future (SW)
 */
const POKEMON_API_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon';

const Showcase = ({ search }: ShowcaseProps) => {

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

    }, [search]);

    return (
        <div>I am the showcase! Search is {search}</div>
    )
}

export default Showcase;