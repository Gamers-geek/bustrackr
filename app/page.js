'use client'
import {useEffect, useState} from "react";
import {getStopsAround} from "@/lib/api";
import useLocalStorage from "@/hooks/localStorageHook";
import SearchBar from "@/components/SearchBar";

export default function Home() {
    const [aroundStops, setAroundStops] = useState([]);

    const [favourites, setFavourites] = useLocalStorage("favourites", []);

    useEffect(() => {
        async function getStops(lat, lng) {
            const stops = await getStopsAround(lat, lng);
            console.log(stops)
            setAroundStops(stops);
        }

        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(({coords}) => {
                const {latitude, longitude} = coords;
                console.log(latitude, longitude);
                getStops(latitude, longitude);
            })
        }
    }, []);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 space-y-8">
            <SearchBar />
            <section>
                <h2 className="text-lg font-semibold mb-3">⭐ Favoris</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                    { favourites.length > 0 ?
                    favourites.map((favourite, i) => (
                        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow pb-4.5 pt-4 px-4 space-y-4" key={i}>
                            <div className="flex items-center justify-between mb-2">
                                <p className="font-semibold">{ favourite.name } <span className="text-sm text-zinc-500 dark:text-zinc-400">({favourite.city})</span></p>
                            </div>
                            <a href={`/stop/${favourite.code}`}
                                className="w-full mt-2 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                                Voir les horaires
                            </a>
                        </div>
                    ))
                    : <p className={"text-zinc-500 dark:text-zinc-400"}>Aucun arrêt favori</p> }
                </div>
            </section>

            <section>
                <h2 className="text-lg font-semibold mb-3">📍 À proximité</h2>
                <div className="grid gap-4 sm:grid-cols-3">
                    {aroundStops.length > 0 ?
                        aroundStops.map((stop, index) => (
                        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow p-4 space-y-2" key={index}>
                            <a href={`/stop/${stop.code}`} className="font-semibold hover:underline">{stop.name}</a>
                            <p className="text-sm text-zinc-500">{stop.city} - À {stop.distance} m</p>
                        </div>
                    ))
                    : <p className={"text-zinc-500 dark:text-zinc-400"}>Aucun arrêt à proximité</p> }
                </div>
            </section>
        </div>
    );
}
