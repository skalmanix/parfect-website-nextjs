#!/usr/bin/env python3
"""Build messages/es/guides-content.json from embedded Spanish translations."""
import json
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "messages" / "es" / "guides-content.json"

guides = {}

guides["date-night-ideas-at-home"] = {
    "cluster": "date-nights",
    "cardTitle": "Ideas de citas en casa",
    "cardDescription": "16 citas en casa que se sienten como una noche de verdad fuera — sin canguro, sin reserva.",
    "title": "16 ideas de citas en casa que no parecen un martes cualquiera",
    "metaTitle": "16 ideas de citas en casa (que de verdad se sienten especiales)",
    "metaDescription": "Ideas de citas en casa acogedoras, divertidas y románticas — desde cines bajo mantas hasta noches de preguntas. Sin canguro ni reserva.",
    "eyebrow": "Citas",
    "intro": [
        "La mayoría de las noches en casa siguen el mismo guion: cena, platos, una serie que veis a medias, móviles en la mano antes del segundo capítulo. Es cómodo — pero no es una cita. Y cuando cada noche se parece a la anterior, pueden pasar semanas sin un solo momento en el que os volváis de verdad el uno hacia el otro.",
        "La buena noticia es que una gran noche de cita casi no tiene que ver con salir de casa. Tiene que ver con intención: decidir que esta noche es distinta, darle forma y protegerla de la colada y del grupo de WhatsApp. Aquí tenéis 16 formas de hacer exactamente eso — ordenadas según el ánimo que tengáis.",
    ],
    "image": {
        "src": "/images/guides/at-home-date.webp",
        "alt": "Pareja riendo juntos durante una acogedora noche de cine en casa con luces de hadas y mantas",
    },
    "readingTime": "8 min de lectura",
    "datePublished": "2026-07-07",
    "dateModified": "2026-07-07",
    "sections": [
        {
            "id": "make-it-different",
            "heading": "Primero: que se sienta distinto a una noche normal",
            "paragraphs": [
                "Antes de elegir una idea, preparad el escenario. Lo que separa una cita de una noche normal no es la actividad — es el marco que la rodea. Tres reglas sencillas lo cambian todo:"
            ],
            "ideas": [
                {"title": "Los móviles a otra habitación", "description": "No boca abajo sobre la mesa — fuera de alcance de verdad. La media atención es la forma más rápida de hacer que tu pareja se sienta prescindible."},
                {"title": "Cambiad una cosa física", "description": "Encended velas, poneos ropa de verdad, movéis los muebles, coméis en otro sitio distinto a los de siempre. Una señal visual le dice al cerebro: «esto es una ocasión»."},
                {"title": "Dadle un inicio y un final", "description": "«La cita empieza a las 20, cuando la cocina cierra» funciona mucho mejor que ir a la deriva por la noche. Un inicio definido significa que los dos aparecéis."},
            ],
            "tip": "Decid la cita con antelación — aunque sea esa misma mañana. La anticipación es la mitad de la diversión, y evita la negociación de las 21:00 sobre qué hacer.",
        },
        {
            "id": "cozy",
            "heading": "Ideas acogedoras y sin complicaciones",
            "paragraphs": ["Para las noches en las que estáis cansados pero aún queréis sentiros pareja, no solo cogestores de un hogar."],
            "ideas": [
                {"title": "Cine bajo mantas", "description": "Construid un refugio de verdad — sábanas, luces de hadas, todos los cojines que tengáis. Elegid un tema: la peli de vuestra primera cita, una del año en que os conocisteis, o una que os encantaba a los quince."},
                {"title": "Noche de cocina juntos", "description": "Elegid una cocina que ninguno de los dos conozca y seguid una receta en vídeo juntos. El caos es el objetivo; la comida es un extra."},
                {"title": "Picnic en casa", "description": "Manta en el suelo del salón, comida para picar, una playlist de un verano que recordéis los dos. En invierno, esto sorprende más de lo que parece."},
                {"title": "Comida a domicilio, a otro nivel", "description": "Pedid lo de siempre, pero emplatadlo bien, bajad la luz, abrid el buen vino y vestíos como si hubierais reservado mesa. Esfuerzo donde importa, cero cocina."},
                {"title": "Noche spa para dos", "description": "Toallas calientes, masajes de manos, mascarillas faciales, prohibido hablar de logística. Turnaos para liderar cada ronda."},
                {"title": "Desayuno para cenar", "description": "Tortitas a las 21:00 se siente ligeramente rebelde, y ligeramente rebelde es un muy buen ánimo para una cita."},
            ],
        },
        {
            "id": "playful",
            "heading": "Ideas divertidas y competitivas",
            "paragraphs": ["Un poco de competición amistosa despierta la noche — y aprendéis mucho el uno del otro cuando hay marcador."],
            "ideas": [
                {"title": "Torneo a dos jugadores", "description": "Al mejor de cinco con juegos distintos: un juego de cartas, uno de mesa, un videojuego, un reto físico, una ronda de trivia. El perdedor planifica la próxima cita."},
                {"title": "Concurso de inventar cócteles (o mocktails)", "description": "Cada uno inventa una bebida con el nombre del otro. Cata a ciegas. Puntos extra por una historia de origen."},
                {"title": "El quiz «¿cuánto me conoces?»", "description": "Escribid diez preguntas sobre vosotros mismos, intercambiadlas y puntuad. ¿La primera canción que amasteis? ¿El miedo más irracional? Se pone divertido — y a veces revelador — enseguida."},
                {"title": "Puzzle y un podcast", "description": "Un puzzle de 500 piezas más un podcast de crímenes reales o comedia es una cita sorprendentemente buena y sin presión. Manos ocupadas, conversación fluida."},
                {"title": "Bake-off en casa", "description": "La misma receta, cuencos separados, 45 minutos. Valorad sabor, aspecto e «interpretación artística»."},
            ],
        },
        {
            "id": "deeper",
            "heading": "Ideas más profundas y cercanas",
            "paragraphs": ["Algunas noches no van de entretenimiento — van de recordar por qué os elegisteis. Estas citas crean las conversaciones que el día a día echa fuera."],
            "ideas": [
                {"title": "Una noche de preguntas de verdad", "description": "Turnaos para hacer preguntas cuyas respuestas no conocéis. Empezad a lo ligero, id profundizando con la noche. Si necesitáis ideas, nuestra [guía de preguntas para parejas](/ideas/questions-for-couples) tiene 40."},
                {"title": "Slideshow del pasado", "description": "Recorred vuestros carretes de fotos del año en que os conocisteis y narrad. «Espera, ¿por qué estábamos ahí?» es el inicio de toda buena historia."},
                {"title": "Cartas para abrir más tarde", "description": "Escribíos una carta para abrir dentro de un año. Selladlas. Marcad la fecha en el calendario. Vuestro yo del futuro os lo agradecerá mucho."},
                {"title": "Planificar el año soñado", "description": "Si nada estuviera fuera de alcance, ¿cómo sería el próximo año? Grandes viajes, pequeños rituales, cosas que dejar de hacer. Escribid la lista donde la veáis los dos — para eso sirve exactamente una [bucket list compartida](/ideas/couples-bucket-list-ideas)."},
                {"title": "Noche de masajes con una regla", "description": "La regla: quien recibe solo dice lo que se siente bien. Aprender a recibir atención sin desviarla es su propia forma de intimidad."},
            ],
        },
        {
            "id": "habit",
            "heading": "Cómo convertir las citas en casa en un hábito",
            "paragraphs": [
                "Una gran noche es fácil. Las parejas que se sienten cercanas de forma constante son las que lo repiten — y la repetición necesita menos inspiración y más estructura.",
                "Elegid un ritmo que podáis mantener de verdad: un viernes sí y otro no gana a «cuando las cosas se calmen», porque nunca se calman. Turnaos para planificar, para que no sea siempre el trabajo de una persona mantener viva la romance. Y guardad una lista en marcha de ideas que los dos vayáis añadiendo cuando os venga la inspiración — a mitad del scroll, en el metro — para que la planificación esté a medias hecha cuando llegue la noche.",
            ],
            "tip": "Bajad la barra a propósito. Una cita de 45 minutos que ocurre gana a una velada de cuatro platos que se queda en hipotética. La constancia es la parte romántica.",
        },
    ],
    "faqs": [
        {"question": "¿Con qué frecuencia deberían tener citas las parejas?", "answer": "La investigación sobre parejas apunta de forma constante a tiempo regular a solas — semanal o quincenal — como uno de los mejores predictores de satisfacción en la relación. La frecuencia exacta importa menos que la fiabilidad: un ritmo que mantenéis gana a una ambición que no cumplís."},
        {"question": "¿Y si los dos estamos agotados por la noche?", "answer": "Elegid de la lista acogedora y reducid el alcance: 45 minutos, una actividad, móviles fuera. El cansancio mata los planes elaborados, no la conexión. Algunas de las mejores citas en casa son las más pequeñas."},
        {"question": "¿Funcionan las citas en casa con niños en casa?", "answer": "Sí — después de la hora de dormir es la ventana clásica. Tratad la hora de inicio como una reserva de verdad, repartid la rutina de dormir para que ninguno llegue vacío, y mantened los primeros 10 minutos libres de logística. Nuestra guía de [ideas de citas para padres](/ideas/date-ideas-for-parents) profundiza en esto."},
        {"question": "¿Y si mi pareja cree que las citas planificadas se sienten forzadas?", "answer": "Planificada no significa guionizada — significa protegida. Reservad el tiempo juntos, mantened la actividad flexible. La mayoría de las objeciones de «se siente forzado» en realidad son no querer deberes; un refugio y una peli no son deberes."},
    ],
    "appHook": {
        "heading": "Guardad las ideas donde las veáis los dos",
        "text": "Parfect os da un planificador de citas y una bucket list compartidos — guardad las ideas de esta lista, planificad la próxima juntos y dejad que la app os recuerde cuando hace demasiado.",
        "href": "/features/date-planner",
        "linkLabel": "Ver el planificador de citas",
    },
    "related": ["date-ideas-for-parents", "questions-for-couples", "couples-bucket-list-ideas"],
}

if __name__ == "__main__":
    from es_guides_part2 import guides_part2
    from es_guides_part3 import guides_part3
    from es_guides_part4 import guides_part4

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
