import * as React from 'react';
import { setConstantValue } from 'typescript';

interface SearchBarProps {
    placeholder?: string;
    value?: string;
    onSearch: (event: React.FormEvent, value: string) => void;
    onChange: (value: string) => void;
};

const SearchBar = (props: SearchBarProps) => {
    const {
        placeholder = '',
        value = '',
        onSearch,
        onChange,
    } = props;

    const onFormSubmit = (event: React.FormEvent) => {
        onSearch(event, value);
    }

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = event;
        onChange(value);
    }

    return (
        <form onSubmit={onFormSubmit}>
            <label htmlFor="search"></label>
            <input id="search" type="text" placeholder="Search for a pokemon by name" value={value} onChange={onInputChange}/>
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;
