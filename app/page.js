'use client'
import {useEffect, useState} from "react";
import {getStopsAround} from "@/lib/api";

export default function Home() {
    const [aroundStops, setAroundStops] = useState([]);
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
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
            <main className="p-4 space-y-8">
                <section>
                    <h2 className="text-lg font-semibold mb-3">⭐ Favoris</h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow p-4 space-y-2">
                            <div className="flex items-center justify-between">
                                <p className="font-semibold">Gare de Lyon</p>
                                <button className="text-sm text-zinc-500 hover:text-red-500">❌</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
            <span
                className="px-2 py-1 text-sm rounded-lg bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200">
              🚆 RER A
            </span>
                                <span
                                    className="px-2 py-1 text-sm rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
              🚇 Ligne 14
            </span>
                            </div>
                            <button
                                className="w-full mt-2 px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                                Voir les horaires
                            </button>
                        </div>
                    </div>
                </section>

                <section>
                    <h2 className="text-lg font-semibold mb-3">📍 À proximité</h2>
                    <div className="space-y-3">
                        {aroundStops.map((stop, index) => (
                            <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow p-4 space-y-2" key={index}>
                                <p className="font-semibold">{stop.name}</p>
                                <div className="flex flex-wrap gap-2">
            <span
                className="px-2 py-1 text-sm rounded-lg bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200">
              🚇 Ligne 1
            </span>
                                    <span
                                        className="px-2 py-1 text-sm rounded-lg bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
              🚇 Ligne 5
            </span>
                                    <span
                                        className="px-2 py-1 text-sm rounded-lg bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200">
              🚇 Ligne 8
            </span>
                                </div>
                                <p className="text-sm text-zinc-500">{stop.city} - À {stop.distance} m</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}
