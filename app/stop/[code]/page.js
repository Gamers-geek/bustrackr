'use client'

import {getNextDepartures, getStop} from "@/lib/api";
import {modes} from "@/components/constants";
import {use, useEffect, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRotate} from "@fortawesome/free-solid-svg-icons/faRotate";
import {faStar} from "@fortawesome/free-solid-svg-icons/faStar";
import useLocalStorage from "@/hooks/localStorageHook";
import RailJourney from "@/components/RailJourney";
import Journey from "@/components/Journey";

export default function StopPage({params}) {
    const unwrappedParams = use(params)
    const stopCode = unwrappedParams.code
    const [stop, setStop] = useState(null);
    const [nextDepartures, setNextDepartures] = useState(null);
    const [selectedMode, setSelectedMode] = useState(null);
    const [reloading, setReloading] = useState(false);
    const [isFavourite, setIsFavourite] = useState(false);

    const [favourites, setFavourites] = useLocalStorage("favourites", []);

    function toggleFavourite() {
        if (favourites.find(e => e.code === stopCode)) {
            setFavourites(favourites.filter(e => e.code !== stopCode));
            setIsFavourite(false);
        } else if (stop) {
            setFavourites([...favourites, {
                name: stop.name,
                city: stop.city,
                code: stopCode
            }]);
            setIsFavourite(true);
        }
    }

    async function fetchNextDepartures() {
        setReloading(true);
        const nextDep = await getNextDepartures(stopCode);
        setNextDepartures(nextDep);

        if (selectedMode === null || !Object.keys(nextDep).includes(selectedMode)) {
            setSelectedMode(Object.keys(nextDep)[0]);
        }

        setTimeout(() => setReloading(false), 1500);
    }

    function changeMode(mode) {
        setSelectedMode(mode);
    }

    useEffect(() => {
        async function fetchStopData() {
            const st = await getStop(stopCode);
            setStop(st);
        }

        fetchStopData();
        fetchNextDepartures();
    }, [stopCode]);

    useEffect(() => {
        setIsFavourite(favourites.some(e => e.code === stopCode));
    }, [favourites, stopCode]);

    if (!stop?.name) {
        return <div>Arrêt introuvable</div>;
    }

    return (
        <div className="p-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-2xl font-bold">
                    Arrêt : {stop.name} <span className="text-zinc-500">({stop.city})</span>
                </h1>
                <div className="flex gap-2">
                    <button
                        className={`${isFavourite ? "bg-red-500 hover:bg-red-600" : "bg-green-600 hover:bg-green-700"} text-white px-4 py-2 rounded-lg shadow cursor-pointer`}
                        onClick={toggleFavourite}
                    >
                        <FontAwesomeIcon icon={faStar}/> {isFavourite ? "Supprimer des favoris" : "Ajouter aux favoris"}
                    </button>
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow cursor-pointer"
                        onClick={fetchNextDepartures}
                    >
                        <FontAwesomeIcon icon={faRotate} className={reloading ? "rotating" : ""}/> Actualiser
                    </button>
                </div>
            </div>

            <div
                className={`flex gap-4 border-b border-zinc-200 dark:border-zinc-700 ${nextDepartures === null ? "hidden" : ""}`}>
                {nextDepartures &&
                    Object.keys(nextDepartures).map((mode, i) => (
                        <button
                            key={i}
                            className={`${selectedMode === mode ? "border-b-2 border-blue-600 font-semibold" : "text-zinc-500 hover:text-blue-600"} px-4 py-2 cursor-pointer`}
                            onClick={() => changeMode(mode)}
                        >
                            {modes[mode]}
                        </button>
                    ))}
            </div>

            <section className="space-y-4 pt-4">
                {nextDepartures === null ? (
                    <p>Chargement en cours</p>
                ) : (
                    nextDepartures[selectedMode]?.map((dep, i) => {
                        if(JSON.parse(dep.line.data).mode === "rail")
                            return (<RailJourney departure={dep} key={i}/>)
                        else
                            return (<Journey departure={dep} key={i}/>)
                    })
                )}
            </section>
        </div>
    );
}
