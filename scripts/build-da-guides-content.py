#!/usr/bin/env python3
"""Build messages/da/guides-content.json from embedded Danish translations."""
import json
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "messages" / "da" / "guides-content.json"

guides = {}

guides["date-night-ideas-at-home"] = {
    "cluster": "date-nights",
    "cardTitle": "Date night-idéer derhjemme",
    "cardDescription": "16 hjemmedates, der føles som en rigtig aften ude — uden babysitter, uden reservation.",
    "title": "16 date night-idéer derhjemme, der ikke føles som en tirsdag",
    "metaTitle": "16 date night-idéer derhjemme (der faktisk føles særlige)",
    "metaDescription": "Hyggelige, legesyge og romantiske date night-idéer derhjemme — fra teltbio til spørgsmålsaftener. Ingen babysitter eller reservation nødvendig.",
    "eyebrow": "Date nights",
    "intro": [
        "De fleste aftener derhjemme følger samme manuskript: middag, opvask, en serie I halvt ser på, telefonerne fremme inden episode to. Det er behageligt — men det er ikke en date. Og når hver aften ser ens ud, kan der gå uger uden et eneste øjeblik, hvor I faktisk vender jer mod hinanden.",
        "Den gode nyhed er, at en god date night næsten intet har med at forlade huset at gøre. Det handler om intention: at beslutte, at i aften er anderledes, give aftenen en form og beskytte den mod vasketøjet og gruppechatten. Her er 16 måder at gøre netop det på — sorteret efter det humør, I er i.",
    ],
    "image": {
        "src": "/images/guides/at-home-date.webp",
        "alt": "Par der griner sammen under en hyggelig film-aften derhjemme med lyskæder og tæpper",
    },
    "readingTime": "8 min læsning",
    "datePublished": "2026-07-07",
    "dateModified": "2026-07-07",
    "sections": [
        {
            "id": "make-it-different",
            "heading": "Først: gør det anderledes end en almindelig aften",
            "paragraphs": [
                "Før I vælger en idé, sæt scenen. Det, der adskiller en date night fra en almindelig aften, er ikke aktiviteten — det er rammen omkring den. Tre små regler ændrer alt:"
            ],
            "ideas": [
                {"title": "Telefonerne i et andet rum", "description": "Ikke med skærmen nedad på bordet — faktisk uden for rækkevidde. Halv opmærksomhed er den hurtigste måde at få din partner til at føle sig valgfri."},
                {"title": "Skift én fysisk ting", "description": "Tænd stearinlys, tag rigtigt tøj på, flyt møblerne, spis et andet sted end de sædvanlige. Én visuel cue fortæller hjernen, at det her er en særlig anledning."},
                {"title": "Giv aftenen en start og en slut", "description": "«Daten starter kl. 20, når køkkenet er lukket» fungerer langt bedre end at drive ind i aftenen. En defineret start betyder, at I begge møder op."},
            ],
            "tip": "Beslut daten på forhånd — selv bare samme morgen. Forventning er halvdelen af det sjove, og det stopper forhandlingen kl. 21 om, hvad I skal lave.",
        },
        {
            "id": "cozy",
            "heading": "Hyggelige og nemme idéer",
            "paragraphs": ["Til de aftener, hvor I er trætte, men stadig vil føle jer som et par — ikke bare medforvaltere af et hjem."],
            "ideas": [
                {"title": "Teltbio", "description": "Byg et rigtigt telt — lagner, lyskæder, alle de puder, I ejer. Vælg et tema: filmen fra jeres første date, en film fra året I mødtes, eller en I begge elskede som 15-årige."},
                {"title": "Madlavnings-aften", "description": "Vælg et køkken, ingen af jer kender, og følg en videoopskrift sammen. Kaosset er pointen; måltidet er en bonus."},
                {"title": "Indendørs picnic", "description": "Tæppe på stuegulvet, fingermad, en playliste fra en sommer I begge husker. Om vinteren rammer det her overraskende hårdt."},
                {"title": "Takeaway, opgraderet", "description": "Bestil det sædvanlige, men anret det ordentligt, dæmp lyset, åbn den gode vin, og klæd jer på, som om der var booket bord. Indsats dér, hvor det tæller — nul madlavning."},
                {"title": "Spa-aften for to", "description": "Varme håndklæder, håndmassage, ansigtsmasker, ingen snak om logistik tilladt. Skift på, hvem der leder hver runde."},
                {"title": "Morgenmad til aftensmad", "description": "Pandekager kl. 21 føles mildt oprørsk, og mildt oprørsk er en rigtig god stemning til en date."},
            ],
        },
        {
            "id": "playful",
            "heading": "Legesyge og konkurrenceprægede idéer",
            "paragraphs": ["Lidt venlig konkurrence vækker en aften — og I lærer meget om hinanden, når der er point."],
            "ideas": [
                {"title": "To-spiller turnering", "description": "Bedst af fem på tværs af forskellige spil: ét kortspil, ét brætspil, ét videospil, én fysisk udfordring, én quizrunde. Taberen planlægger næste date."},
                {"title": "Cocktail- (eller mocktail-) opfindelseskonkurrence", "description": "Hver af jer opfinder en drink opkaldt efter den anden. Blind smagning. Bonuspoint for en oprindelseshistorie."},
                {"title": "«Hvor godt kender du mig?»-quiz", "description": "Skriv ti spørgsmål om jer selv, byt, og giv hinanden point. Første sang du elskede? Mest irrationelle frygt? Det bliver sjovt — og af og til afslørende — hurtigt."},
                {"title": "Puslespil og en podcast", "description": "Et 500-delt puslespil plus en true crime- eller komediepodcast er en chokerende god lavpres-date. Hænderne optaget, samtalen flyder."},
                {"title": "Hjemmebage-konkurrence", "description": "Samme opskrift, hver sit skål, 45 minutter. Bedøm på smag, udseende og «kunstnerisk fortolkning»."},
            ],
        },
        {
            "id": "deeper",
            "heading": "Dybere og tættere idéer",
            "paragraphs": ["Nogle aftener handler ikke om underholdning — de handler om at huske, hvorfor I valgte hinanden. Disse dates skaber de samtaler, hverdagen presser ud."],
            "ideas": [
                {"title": "En rigtig spørgsmålsaften", "description": "Skiftes til at stille spørgsmål, I ikke kender svaret på. Start let, gå dybere, efterhånden som aftenen skrider frem. Har I brug for forslag, har vores [guide til spørgsmål til par](/ideas/questions-for-couples) 40 af dem."},
                {"title": "Memory lane-slideshow", "description": "Scroll jeres kameraruller fra året I mødtes og fortæl historien. «Vent, hvorfor var vi der?» er starten på enhver god genfortælling."},
                {"title": "Breve til senere", "description": "Skriv hinanden et brev, der skal åbnes om et år. Forsegle dem. Sæt en dato i kalenderen. Fremtidige jer bliver meget glade."},
                {"title": "Drømmeårsplanlægning", "description": "Hvis intet var uden for rækkevidde, hvordan ville næste år se ud? Store ture, små ritualer, ting I skal stoppe med. Skriv listen et sted, I begge ser den igen — det er præcis det, en [fælles bucket list](/ideas/couples-bucket-list-ideas) er til."},
                {"title": "Massage-aften med en regel", "description": "Reglen: modtageren siger intet andet end, hvad der føles godt. At lære at modtage opmærksomhed uden at aflede den er sin egen form for intimitet."},
            ],
        },
        {
            "id": "habit",
            "heading": "Sådan gør I hjemmedates til en vane",
            "paragraphs": [
                "Én god aften er nem. Par, der føler sig konsekvent tætte, er dem, der gentager det — og gentagelse kræver mindre inspiration og mere struktur.",
                "Vælg en rytme, I faktisk kan holde: hver anden fredag slår «når tingene falder til ro», for det gør de aldrig. Skift på, hvem der planlægger, så det aldrig er én persons job at holde romantikken i live. Og hold en løbende liste over idéer, I begge tilføjer, når inspirationen rammer — midt i scrolling, på vej til arbejde — så planlægningen er halvt gjort, når aftenen kommer.",
            ],
            "tip": "Sænk bevidst barren. En 45-minutters date, der sker, slår en fireretters aften, der forbliver hypotetisk. Konsistens er den romantiske del.",
        },
    ],
    "faqs": [
        {"question": "Hvor ofte bør par have date nights?", "answer": "Forskning på par peger konsekvent på regelmæssig tid alene — ugentligt eller hver anden uge — som en af de stærkeste forudsætninger for tilfredshed i forholdet. Den præcise frekvens betyder mindre end pålideligheden: en rytme I holder slår en ambition I ikke følger op."},
        {"question": "Hvad hvis vi begge er udmattede om aftenen?", "answer": "Vælg fra den hyggelige liste og skrum omfanget: 45 minutter, én aktivitet, telefoner væk. Træthed dræber store planer, ikke nærhed. Nogle af de bedste hjemmedates er de mindste."},
        {"question": "Virker hjemmedates, når børnene er i huset?", "answer": "Ja — efter sengetid er det klassiske vindue. Behandl starttidspunktet som en rigtig reservation, del sengetidsrutinen, så ingen af jer ankommer udmattet, og hold de første 10 minutter logistikfrie. Vores [dateidéer til forældre](/ideas/date-ideas-for-parents) går dybere ind i det."},
        {"question": "Hvad hvis min partner synes, planlagte dates føles tvungne?", "answer": "Planlagt betyder ikke manuskript — det betyder beskyttet. Book tiden sammen, hold aktiviteten løs. De fleste «det føles tvunget»-indvendinger handler egentlig om ikke at ville have lektier; et telt og en film er ikke lektier."},
    ],
    "appHook": {
        "heading": "Gem idéerne, hvor I begge ser dem",
        "text": "Parfect giver jer en fælles dateplanlægger og bucket list — gem idéerne fra denne liste, planlæg næste sammen, og lad appen minde jer, når det har været for længe siden.",
        "href": "/features/date-planner",
        "linkLabel": "Se dateplanlæggeren",
    },
    "related": ["date-ideas-for-parents", "questions-for-couples", "couples-bucket-list-ideas"],
}

# Additional guides imported at runtime from companion modules
if __name__ == "__main__":
    from da_guides_part2 import guides_part2
    from da_guides_part3 import guides_part3
    from da_guides_part4 import guides_part4

    guides.update(guides_part2)
    guides.update(guides_part3)
    guides.update(guides_part4)

    out = {"guides": guides}
    OUT.parent.mkdir(parents=True, exist_ok=True)
    with open(OUT, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent="\t")
        f.write("\n")

    with open(OUT) as f:
        json.load(f)

    print(f"Wrote {OUT}")
    print(f"Guides: {len(guides)}")
    print(f"Lines: {sum(1 for _ in open(OUT))}")
