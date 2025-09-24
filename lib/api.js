const baseUrl = "https://api.bustrackr.clement-logan.fr";

export async function getStop(code) {
    try {
        const res = await fetch(`${baseUrl}/informations/stop/${code}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`Erreur API: ${res.status}`);
        }

        const data = await res.json();
        console.log("data:", data);
        return data;
    } catch (err) {
        console.error("Erreur dans getStop:", err);
        throw err;
    }
}
