"use client";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {accessibilityState} from "@/components/constants";

export default function StopInfoPanel({show, onClose, stop}) {
    console.log(stop)
    return (
        <div
            className={`fixed inset-0 z-50 transition-transform ${
                show ? "translate-x-0" : "translate-x-full"
            }`}
        >
            {/* Overlay */}
            <div
                className={`absolute inset-0 bg-black/50 transition-opacity ${
                    show ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={onClose}
            />

            {/* Panneau */}
            <div
                className="absolute right-0 top-0 h-full w-96 max-w-full bg-white dark:bg-zinc-900 shadow-xl flex flex-col">
                {/* Header */}
                <div
                    className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-700">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                        Infos arrêt
                    </h2>
                    <button
                        className="text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 cursor-pointer"
                        onClick={onClose}
                    >
                        <FontAwesomeIcon icon={faXmark} size="lg"/>
                    </button>
                </div>

                {/* Contenu */}
                <div className="flex-1 overflow-y-auto p-4 space-y-6">
                    {/* Perturbations */}
                    <section>
                        <h3 className="text-md font-semibold text-red-600 dark:text-red-400 mb-2">
                            Perturbations
                        </h3>
                        <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
                            <li>⚠️ Travaux prévus jusqu’au 15 octobre</li>
                            <li>ℹ️ Arrêt déplacé côté rue de Rivoli</li>
                        </ul>
                    </section>

                    {/* Accessibilité */}
                    <section>
                        <h3 className="text-md font-semibold text-green-600 dark:text-green-400 mb-2">
                            Accessibilité
                        </h3>
                        <ul className="text-sm text-zinc-700 dark:text-zinc-300">
                            <li>♿ Accessible aux PMR
                                : {accessibilityState[stop.data.accessibilityData?.accessibility]}</li>
                            <li>🦻 Présence de signaux sonores
                                : {accessibilityState[stop.data.accessibilityData?.audiblesignals]}</li>
                            <li>🖥️ Présence de panneaux visuels
                                : {accessibilityState[stop.data.accessibilityData?.visualsigns]}</li>
                        </ul>
                    </section>

                    {/* Infos pratiques */}
                    <section>
                        <h3 className="text-md font-semibold text-blue-600 dark:text-blue-400 mb-2">
                            Infos pratiques
                        </h3>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300">
                            <strong>Zone tarifaire : </strong> {stop.data.price[0]}
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
