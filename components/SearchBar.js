"use client";
import {useEffect, useState} from "react";
import {searchStop} from "@/lib/api";

const stops = [
    { name: "Gare de Lyon", lines: ["RER A", "Ligne 14"] },
    { name: "Bastille", lines: ["Ligne 1", "Ligne 5", "Ligne 8"] },
    { name: "Châtelet", lines: ["RER A", "RER B", "RER D", "Ligne 1", "Ligne 4", "Ligne 7", "Ligne 11", "Ligne 14"] },
    { name: "Nation", lines: ["Ligne 1", "Ligne 2", "Ligne 6", "Ligne 9", "RER A"] },
];

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [filteredStops, setFilteredStops] = useState([]);

    async function search()
    {
        if(query.trim().length > 2)
        {
            const results = await searchStop(query.trim());
            setFilteredStops(results);
        }
    }

    return (
        <div className="relative">
            {/* Barre de recherche */}
            <input
                type="text"
                placeholder="Rechercher un arrêt, une ligne..."
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value)
                    search()
                }}
                className="w-full rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-3 top-3.5 h-5 w-5 text-zinc-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z"
                />
            </svg>

            {/* Résultats */}
            {filteredStops.length > 0 && (
                <div className="absolute mt-2 w-full max-h-60 overflow-y-auto rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-lg z-10">
                    {filteredStops.map((stop, idx) => (
                        <a href={`/stop/${stop.code}`}>
                            <div
                                key={idx}
                                className="p-3 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer border-b border-zinc-200 dark:border-zinc-700 last:border-none"
                            >
                                <div className="font-medium">{stop.name} <span className="text-zinc-500 dark:text-zinc-400">({stop.city})</span></div>
                                <div className="flex gap-2 flex-wrap mt-1 text-sm">

                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
