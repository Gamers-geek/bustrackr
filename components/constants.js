export const order = {
    bus: 1,
    metro: 2,
    rail: 3,
    tram:4,
    funicular: 5
}

export const modes = {
    bus: "Bus",
    metro: "Métro",
    rail: "Train",
    tram: "Tramway",
    funicular: "Funiculaire",
}

export const statusTexts = {
    onTime: `✅ À l'heure`,
    delayed: `⚠️ Retardé`,
    early: `⚠️ En avance`,
    cancelled: `❌ Annulé`,
    noReport: `❔ Théoriquement à l'heure`,
    missed: `❌ Arrêt manqué`,
    notExpected: `❕ Non planifié`,
    departed: `Départ`,
    arrived: `Arrivé`
}

export const statusClasses = {
    onTime: `bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200`,
    delayed: `bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-200`,
    early: `bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200`,
    cancelled: `bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200`,
    noReport: `bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200`,
    missed: `bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200`,
    notExpected: `bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200`,
    departed: `bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200`,
    arrived: `bg-green-100 text-green-100 dark:bg-green-100 dark:text-green-100`,
}