import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
    // Charger depuis localStorage au montage
    const [storedValue, setStoredValue] = useState(() => {
        if (typeof window === "undefined") return initialValue;

        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Erreur useLocalStorage get:", error);
            return initialValue;
        }
    });

    // Sauvegarder quand la valeur change
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(storedValue));
        } catch (error) {
            console.error("Erreur useLocalStorage set:", error);
        }
    }, [key, storedValue]);

    return [storedValue, setStoredValue];
}
