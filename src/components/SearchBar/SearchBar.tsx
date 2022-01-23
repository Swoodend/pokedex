import * as React from 'react';
import { SearchIcon } from '@heroicons/react/solid';

interface SearchBarProps {
    placeholder?: string;
    value?: string;
    onSearch: (event: React.FormEvent, value: string) => void;
    onChange: (value: string) => void;
};

const SearchBar = (props: SearchBarProps) => {
    const {
        placeholder = 'Charizard, Zapdos, etc...',
        value = '',
        onSearch,
        onChange,
    } = props;

    const onFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSearch(event, value);
    };

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = event;
        onChange(value);
    };

    return (
        <form className="w-full relative" onSubmit={onFormSubmit} role="search">
            <input
                id="search"
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onInputChange}
                className="w-full pl-6 h-12 outline-none rounded-full text-lg font-md border border-gray-400
                        placeholder-gray-600 placeholder-opacity-60 focus:border-blue-600"
            />
            <button
                type="submit"
                className="h-8 w-8 absolute top-2 right-4 rounded-full ring-offset-2 focus:outline-none focus:ring-1 focus:ring-blue-600 transition-transform transform active:scale-95"
            >
                <SearchIcon className="h-8 w-8 rounded-l-none text-gray-600 rounded-full" />
            </button>
        </form>
    );
};

export default SearchBar;
