import * as React from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import useSearchNavigation from '../../hooks/useSearchNavigation';

const Home = () => {
    const { search, setSearch, onSearch } = useSearchNavigation();

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
                            onChange={value => setSearch(value)}
                            value={search}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;