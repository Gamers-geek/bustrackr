const baseUrl = "https://api.bustrackr.clement-logan.fr";

export async function getStop(code) {
    try {
        const res = await fetch(`${baseUrl}/informations/stop/${code}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        console.log("data:", data);
        return data;
    } catch (err) {
        console.error("Erreur dans getStop:", err);
        throw err;
    }
}

export async function getNextDepartures(code) {
    try {
        const res = await fetch(`${baseUrl}/departures/${code}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })

        return await res.json()
    } catch (err) {
        console.error("Erreur dans getDeparture:", err);
        throw err;
    }
}

export async function getStopsAround(lat, lng) {
    try {
        const res = await fetch(`${baseUrl}/around/${lat}/${lng}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        return await res.json()
    } catch (err) {
        console.error("Erreur dans getStopsAround:", err);
        throw err;
    }
}