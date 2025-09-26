import {statusClasses, statusTexts} from "@/components/constants";

export default function Journey({departure}) {
    return (
        <div className="bg-white dark:bg-zinc-800 p-4 rounded-2xl shadow">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
                <div className="space-y-1">
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

                    {/* Affichage selon le status */}
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
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                    <span
                        className={`px-3 py-1 text-sm rounded-full ${statusClasses[departure.status]}`}>
                      {statusTexts[departure.status]}{" "}
                        {departure.status === "early" || departure.status === "delayed" ? `(${Math.abs(departure.delay)} min)` : ""}
                    </span>
                    <button
                        className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer">
                        ℹ️ <span className="sm:hidden md:inline-block">Infos</span>
                    </button>
                </div>
            </div>
        </div>
    )
}