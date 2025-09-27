'use client'

import {accessibilityState, statusClasses, statusTexts} from "@/components/constants";
import {useState} from "react";

export default function RailJourney({departure}) {
    const [open, setOpen] = useState(false);
    return (
        <div className="bg-zinc-100 dark:bg-zinc-800 p-4 rounded-2xl shadow space-y-3">
            <div className="flex items-center justify-between">
                <div>
                    <p className="font-semibold mb-1">
                                        <span
                                            style={{
                                                color: `#${departure.line.textColor}`,
                                                backgroundColor: `#${departure.line.backgroundColor}`,
                                            }}
                                            className="px-1.5 py-0.5 mr-1 rounded"
                                        >
                                            {departure.line.shortName}
                                        </span>{" "}
                        <span
                            className={(departure.status === "cancelled" || departure.status === "missed") ? "line-through" : ""}>
                                            {departure.destinationName}
                                        </span>
                    </p>

                    {departure.status === "onTime" ? (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Prochain passage : {departure.expectedTime}
                        </p>
                    ) : departure.status === "delayed" || departure.status === "early" ? (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Théorique : <span className="font-medium">{departure.aimedTime}</span> ·
                            Réel : <span className="font-medium">{departure.expectedTime}</span>
                        </p>
                    ) : departure.status === "cancelled" || departure.status === "missed" ? (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 line-through">
                            Prochain passage : {departure.aimedTime}
                        </p>
                    ) : (
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Prochain passage : {departure.aimedTime}
                        </p>
                    )}
                </div>
                <span className={`px-3 py-1 text-sm rounded-full ${statusClasses[departure.status]}`}>
                                    {statusTexts[departure.status]}{" "}
                    {departure.status === "early" || departure.status === "delayed" ? `(${Math.abs(departure.delay)} min)` : ""}
                                </span>
            </div>

            {departure.railData ?
                (<div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-zinc-100 dark:bg-zinc-700 p-3 rounded-xl">
                        <p className="text-zinc-500 dark:text-zinc-300">Quai</p>
                        <p className="font-semibold text-xl">{departure.railData.quay !== "unknown" ? departure.railData.quay : "Inconnu"}</p>
                    </div>
                    <div className="bg-zinc-100 dark:bg-zinc-700 p-3 rounded-xl">
                        <p className="text-zinc-500 dark:text-zinc-300">Mission</p>
                        <p className="font-semibold text-lg">{departure.railData.missionCode}</p>
                        <p className="text-xs text-zinc-500">({departure.railData.trainSize})</p>
                    </div>
                </div>) : (
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="bg-zinc-100 dark:bg-zinc-700 p-3 rounded-xl">
                            <p className="text-zinc-500 dark:text-zinc-300">Quai</p>
                            <p className="font-semibold text-xl">Inconnu</p>
                        </div>
                        <div className="bg-zinc-100 dark:bg-zinc-700 p-3 rounded-xl">
                            <p className="text-zinc-500 dark:text-zinc-300">Code mission</p>
                            <p className="font-semibold text-lg">Inconnu</p>
                        </div>
                    </div>
                )}

            <div className="text-right">
                <button
                    className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer"
                    onClick={() => setOpen(!open)}>
                    ℹ️ Infos
                </button>
            </div>
            {open ?
                (<div className={`space-y-3`}>
                    <div className="bg-zinc-100 dark:bg-zinc-700 p-3 rounded-xl">
                        <h3 className="font-semibold mb-1">Accessibilité</h3>
                        <ul className="text-sm text-zinc-600 dark:text-zinc-200">
                            <li>♿ Accessible aux PMR : {accessibilityState[departure.line.data.accessibility]}</li>
                            <li>🦻 Présence de signaux sonores
                                : {accessibilityState[departure.line.data.audiblesigns]}</li>
                        </ul>
                    </div>
                </div>)
                : ""
            }
        </div>
    )
}