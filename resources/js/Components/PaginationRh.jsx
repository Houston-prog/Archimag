import React from 'react';
import { Link } from '@inertiajs/react';

export default function PaginationRh({ links }) {
    // Ne pas afficher la pagination s'il n'y a qu'une seule page
    if (links.length <= 3) return null;

    return (
        <div className="flex flex-wrap justify-center gap-1 mt-4">
            {links.map((link, key) => (
                link.url === null ? (
                    <div
                        key={key}
                        className="px-4 py-2 text-sm text-gray-400 bg-white border border-gray-200 rounded-lg cursor-not-allowed"
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ) : (
                    <Link
                        key={key}
                        href={link.url}
                        className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                            link.active
                                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                )
            ))}
        </div>
    );
}
