import {getNextDepartures, getStop} from "@/lib/api";

export default async function StopPage({ params }) {
    const { code } = await params;

    const stop = await getStop(code);

    const nextDepartures = await getNextDepartures(code)

    if (!stop) {
        return <div>Arrêt introuvable</div>;
    }

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">
                Arrêt : {stop.name}
            </h1>
            <p className="text-gray-600">Code : {code}</p>
            <h2 className="text-xl mt-4 mb-2">Prochains départs</h2>
            <ul className="list-disc pl-5">
                {nextDepartures.map((dep, i) => {
                    console.log(dep)
                    return (
                    <li key={i}>
                        {dep.line.name}
                    </li>
                )})}
            </ul>
        </div>
    );
}
