import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const useSearchNavigation = (page = './', initialSearchValue = '') => {
    const [search, setSearch] = React.useState(initialSearchValue);
    
    const navigate = useNavigate();

    const onSearch = (event: React.FormEvent, searchValue: string) => {
        event.preventDefault();

        // redirect back to <page> with a search parameter set
        navigate(`${page}?search=${searchValue.toLowerCase()}`);
    };

    return { onSearch, search, setSearch };
};

export default useSearchNavigation;