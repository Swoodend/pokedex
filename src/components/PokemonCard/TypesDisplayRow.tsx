import * as React from 'react';
import { Type } from '../../pages/Showcase/Showcase';

interface TypeDisplayRowProps {
    types: Type[];
}

const TypesDisplayRow = ({ types } : TypeDisplayRowProps) => {
    return (
        <div className="flex space-x-2">
            <div className="bg-pink-400 flex justify-center w-6">A</div>
            <div className="bg-pink-400 flex justify-center w-6">B</div>
            <div className="bg-pink-400 flex justify-center w-6">C</div>
        </div>
    )
};

export default TypesDisplayRow;
