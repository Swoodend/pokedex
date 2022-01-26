import * as React from 'react';

interface NotFoundProps {
    search: string | undefined;
}

const NotFound = ({ search }: NotFoundProps) => {
    return (
        <div className="flex flex-col items-centerw-full max-h-screen">
            <img className="max-h-80 object-contain" src="/missingno.png" alt="A depication of the popular 'Missing no.' glitch from pokemon red/blue" />
            <span className="text-center text-3xl">Unable to find pokemon "{search}". Refine your search and try again!</span>
        </div>
    )
}

export default NotFound;
