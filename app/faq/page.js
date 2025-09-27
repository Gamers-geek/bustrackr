import Accordion from "@/components/Accordion";

export default function FAQPage()
{
    const categories = [
        {
            title: "Questions générales",
            faqs: [
                {
                    q: "Comment ajouter un arrêt en favori ?",
                    a: "Pour ajouter un arrêt en favori, cliquez sur le bouton \"Ajouter aux favoris\" situé en haut de la page de l'arrêt."
                }
            ]
        },
        {
            title: "Page d'accueil",
            faqs: [
                {
                    q: "Pourquoi le site me demande-t-il ma position ?",
                    a: "Le site vous demande votre position pour vous proposer les arrêts les plus proches de vous. Toutefois, si vous le désirez, vous pouvez refuser de partager votre position et rechercher un arrêt manuellement."
                },
                {
                    q: "Ma géolocalisation est-elle enregistrée ?",
                    a: "Non, nous n'enregistrons pas votre géolocalisation. Cependant, pour des raisons de performance, votre géolocalisation est enregistrée dans votre navigateur pour une durée de 15 minutes pour ne pas avoir à la redemander à chaque rafraîchissement de la page."
                },
                {
                    q: "J'ai changé d'avis, comment puis-je autoriser ou refuser la géolocalisation ?",
                    a: "Consulter les guides propres à chaque navigateur pour autoriser ou refuser la géolocalisation : <a href=\"https://support.google.com/chrome/answer/142065?co=GENIE.Platform%3DDesktop&hl=fr\" class='hover:text-blue-500 underline'>Google Chrome</a>, <a href='https://support.mozilla.org/fr/kb/firefox-partage-t-il-ma-position-avec-sites-web#w_navigation-avec-geolocalisation-integree' class='hover:text-blue-500 underline'>Firefox</a>, <a href='https://support.microsoft.com/fr-fr/microsoft-edge/localisation-et-confidentialit%C3%A9-dans-microsoft-edge-31b5d154-0b1b-90ef-e389-7c7d4ffe7b04#:~:text=des%20sites%20web%20%3A-,Dans%20Microsoft%20Edge%2C%20s%C3%A9lectionnez%20l%20Param%C3%A8tres%20%3E%20cookies%20et%20l%27,acc%C3%A9der%20%C3%A0%20votre%20emplacement%20pr%C3%A9cis.' class='hover:text-blue-500 underline'>Microsoft Edge</a>, <a href='https://help.opera.com/fr/latest/security-and-privacy/' class='hover:text-blue-500 underline'>Opera</a>"
                },
                {
                    q: "Le site n'indique pas les arrêts les plus proches de moi, pourquoi ?",
                    a: "<strong>Cas 1 : vous avez refusé d'être géolocalisé\n" +
                        "Solution :</strong> autoriser la géolocalisation dans les paramètres de votre navigateur (voir question précédente).\n" +
                        "\n" +
                        "<strong>Cas 2 : vous avez autorisé la géolocalisation\n" +
                        "Solution : </strong>Pour des raisons de performances, votre géolocalisation est enregistrée dans votre navigateur pour une durée de 15 minutes. Si vous avez changé de position dans les 15 dernières minutes, cliquez simplement sur le bouton \"Actualiser\", juste en dessous du texte \"Arrêts aux alentours\"."
                },
            ]
        },
        {
            title: "Pages d'arrêts",
            faqs: [
                {
                    q: "La page affiche des données erronées, comment puis-je les actualiser ?",
                    a: "Pour actualiser les données d'un arrêt, cliquez sur le bouton \"Actualiser les données\" situé en haut de la page. Si vous avez des problèmes avec la mise à jour des données, vous pouvez également vider le cache de votre navigateur.",
                },
                {
                    q: "Comment savoir quelles lignes desservent un arrêt ?",
                    a: "Vous pouvez obtenir de multiples informations dont les lignes desservant un arrêt en cliquant sur le bouton \"En savoir plus sur l'arrêt\" situé en haut de la page.",
                },
                {
                    q: "Comment interpréter les statuts des lignes ?",
                    a: "Pour chaque trajet, vous pouvez voir un statut qui vous indique si le bus est à l'heure ou non. Il existe 7 statuts différents :\n" +
                        "\n" +
                        "<strong>À l'heure :</strong> le bus est à l'heure\n" +
                        "<strong>En avance :</strong> le bus est en avance\n" +
                        "<strong>Retardé :</strong> le bus est retardé\n" +
                        "<strong>Non desservi :</strong> le bus ne desservira pas cet arrêt (motif exceptionnel)\n" +
                        "<strong>Pas de rapport :</strong> le bus ne transmet pas de donnée en temps réel. Il est théoriquement à l'heure.\n" +
                        "<strong>Supprimé :</strong> le bus ne passera pas.\n" +
                        "<strong>Non attendu :</strong> l'arrêt du bus à cet arrêt n'était pas prévu.",
                },
                {
                    q: "Comment en savoir plus sur les conditions d'accessibilité d'un trajet ?",
                    a: "Pour en savoir plus sur les conditions d'accessibilité d'un trajet, cliquez sur l'icône  située en haut à droite de chaque trajet.",
                },
            ]
        }
    ]


    return (
        <div className={"max-w-3xl mx-auto p-6 space-y-8"}>
            <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                Foire aux Questions (FAQ)
            </h1>
            {categories.map((cat, idx) => (
                <section key={idx} className="space-y-4">
                    <h2 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                        {cat.title}
                    </h2>
                    <div className="bg-white dark:bg-zinc-900 rounded-xl shadow divide-y divide-zinc-200 dark:divide-zinc-700">
                        {cat.faqs.map((faq, i) => (
                            <Accordion key={i} question={faq.q} answer={faq.a} />
                        ))}
                    </div>
                </section>
            ))}
        </div>
    )
}