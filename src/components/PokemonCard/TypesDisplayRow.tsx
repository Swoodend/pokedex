import * as React from 'react';
import { Type } from '../../pages/Showcase/Showcase';

interface TypeDisplayRowProps {
    types: Type[];
    fontColor: string;
}

const TypesDisplayRow = ({ types, fontColor }: TypeDisplayRowProps) => {
    return (
        <div className="flex space-x-3">
            {types.map(type =>
                <div key={type.name} className="flex justify-center h-6 w-6 relative">
                    <object data={`/typeicons/${type.name}.svg`} type="image/svg+xml" />
                </div>
            )}
        </div>
    )
};

export default TypesDisplayRow;
