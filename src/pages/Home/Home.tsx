import * as React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [searchValue, setSearchValue] = React.useState('');
    const navigate = useNavigate();

    const onSearch = (event: React.FormEvent, searchValue: string) => {
        event.preventDefault();

        // redirect back to the home page with a search parameter set, this will trigger a useEffect to initiate the search
        // this will be nice for adding a bookmark to your favourite pokemon, sharing a link with your friend, etc.
        navigate(`./?search=${searchValue.toLowerCase()}`);
    }

    return (
        <div className="md:max-w-xl lg:max-w-2xl xl:max-w-5xl 2xl:max-w-2/3 mx-auto flex flex-col justify-center items-center min-h-screen">
            <div className="h-48 w-full md:w-10/12 lg:w-2/3 flex items-center justify-center relative">
                <img
                    src="/pokedex_logo.png"
                    alt="Pokedex logo with a pokeball mid flight"
                    className="absolute -top-24 xxs:-top-32 md:-top-40 transform -rotate-3"
                />
                <div className="w-full flex justify-center">
                    <div className="h-full w-full flex px-2 xl:justify-center xl:w-2/3 relative">
                        <SearchBar
                            onSearch={onSearch}
                            onChange={value => setSearchValue(value)}
                            value={searchValue}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;