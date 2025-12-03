import os
import json
import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from openai import OpenAI
from models import ChatRequest, ChatResponse, SourceReference, SourceType

# --- Setup ---
app = FastAPI(title="Quran & Hadith RAG Backend")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = OpenAI() # Uses OPENAI_API_KEY environment variable

# Placeholder for Hadith API Key (User must replace this)
HADITH_API_KEY = os.environ.get("HADITH_API_KEY", "YOUR_HADITH_API_KEY_HERE")

# --- RAG Helper Functions ---

def is_greeting(query: str) -> bool:
    """Check if the query is a greeting."""
    greetings = ["hey", "hallo", "hi", "assalamu", "assalam", "moin", "yo", "heyy"]
    return any(greeting in query.lower() for greeting in greetings)

def is_dua_request(query: str) -> bool:
    """Check if the query is asking for a Dua."""
    dua_keywords = ["dua", "bittgebet", "gebet", "beten", "anrufung", "invocation"]
    return any(keyword in query.lower() for keyword in dua_keywords)

def retrieve_dua_data(query: str) -> tuple[List[SourceReference], str]:
    """
    Retrieves relevant Duas based on query keywords.
    Returns both the Dua text and related Quranic verses.
    """
    print(f"Retrieving Dua data for query: {query}")
    query_lower = query.lower()
    
    # Comprehensive keywords mapping for Duas
    dua_keyword_mapping = {
        "geld": "geld",
        "geldverdienen": "geld",
        "verdienst": "geld",
        "reichtum": "geld",
        "wohlstand": "geld",
        "finanz": "geld",
        "gesundheit": "gesundheit",
        "krankheit": "gesundheit",
        "heilung": "gesundheit",
        "wohlbefinden": "gesundheit",
        "vergebung": "vergebung",
        "verzeihen": "vergebung",
        "sünde": "vergebung",
        "reue": "vergebung",
        "geduld": "geduld",
        "geduldig": "geduld",
        "ausdauer": "geduld",
        "prüfung": "geduld",
        "hoffnung": "hoffnung",
        "hoffnungsvoll": "hoffnung",
        "zuversicht": "hoffnung",
        "schutz": "schutz",
        "schützen": "schutz",
        "sicherheit": "schutz",
        "böse": "schutz",
        "wissen": "wissen",
        "lernen": "wissen",
        "studium": "wissen",
        "verstand": "wissen",
        "familie": "familie",
        "kinder": "familie",
        "eltern": "familie",
        "ehepartner": "familie",
        "verwandte": "familie",
    }
    
    # Check for Dua keywords in the query
    for keyword, category in dua_keyword_mapping.items():
        if keyword in query_lower:
            # Found a Dua category, retrieve it
            break
    else:
        # No Dua keyword found
        return [], ""
    
    # Comprehensive Dua database with related Quranic verses
    dua_database = {
        "geld": {
            "dua": "Allahumma inni as'aluka rizqan tayyiba wa 'ilman nafi'a wa 'amalan mutaqabbala.\n\nÜbersetzung: O Allah, ich bitte Dich um guten Rizq (Versorgung), nützliches Wissen und akzeptierte Taten.\n\nAlternative Dua: Ya Razzaq, ya Qawi, ya Ghani - Ya Razaaq (O Versorger), ya Qawi (O Starker), ya Ghani (O Unabhängiger).",
            "source": "Überliefert von Ibn Majah",
            "related_verses": [
                SourceReference(
                    type=SourceType.quran,
                    reference="Sure 65: Vers 3",
                    text="Und wer auf Allah vertraut, für den ist Er ausreichend. Gewiß, Allah wird Seine Angelegenheit vollbringen."
                ),
                SourceReference(
                    type=SourceType.quran,
                    reference="Sure 11: Vers 6",
                    text="Und es gibt kein Getier auf Erden, dessen Versorgung nicht Allah obliegt. Und Er kennt seinen Aufenthaltsort und seinen Aufbewahrungsort."
                )
            ]
        },
        "gesundheit": {
            "dua": "Allahumma inni as'aluka 'afiyata fi dunyai wa 'akhirati.\n\nÜbersetzung: O Allah, ich bitte Dich um Wohlbefinden in dieser Welt und im Jenseits.\n\nAlternative Dua: Allahumma 'afini fi badani, allahumma 'afini fi sam'i, allahumma 'afini fi basari - O Allah, gewähre mir Wohlbefinden in meinem Körper, O Allah, gewähre mir Wohlbefinden in meinem Gehör, O Allah, gewähre mir Wohlbefinden in meinem Sehvermögen.",
            "source": "Überliefert von Muslim",
            "related_verses": [
                SourceReference(
                    type=SourceType.quran,
                    reference="Sure 26: Vers 80",
                    text="Und wenn ich erkranke, so heilt Er mich."
                ),
                SourceReference(
                    type=SourceType.quran,
                    reference="Sure 9: Vers 28",
                    text="O ihr, die ihr glaubt, gewiß, die Götzendiener sind unrein."
                )
            ]
        },
        "vergebung": {
            "dua": "Allahumma ighfir li dhunubi kullahu, dhiruhu wa 'alaniytahu, awwalu wa akhirahu, wa 'alaniytahu wa sirrahu.\n\nÜbersetzung: O Allah, vergib mir all meine Sünden - die frühen und die späten, die offenen und die verborgenen.\n\nAlternative Dua: Astaghfirullaha wa atubu ilayh - Ich bitte Allah um Vergebung und bereue mich zu Ihm.",
            "source": "Überliefert von Muslim",
            "related_verses": [
                SourceReference(
                    type=SourceType.quran,
                    reference="Sure 39: Vers 53",
                    text="Sprich: 'O Meine Diener, die ihr gegen euch selbst frevelnd gewesen seid, verzweifelt nicht an Allahs Barmherzigkeit. Gewiß, Allah vergibt alle Sünden.'"
                ),
                SourceReference(
                    type=SourceType.quran,
                    reference="Sure 4: Vers 110",
                    text="Und wer eine böse Tat begeht oder sich selbst Unrecht zufügt, dann Allah um Vergebung bittet, wird Allah vergebend und barmherzig finden."
                )
            ]
        },
        "geduld": {
            "dua": "Allahumma inni as'aluka sabran jamilan wa 'afiyatan 'inda al-bala.\n\nÜbersetzung: O Allah, ich bitte Dich um schöne Geduld und Wohlbefinden in der Prüfung.\n\nAlternative Dua: Inna lillahi wa inna ilayhi raji'un - Gewiß, wir gehören Allah und zu Ihm kehren wir zurück.",
            "source": "Überliefert von Ahmad",
            "related_verses": [
                SourceReference(
                    type=SourceType.quran,
                    reference="Sure 2: Vers 153",
                    text="O ihr, die ihr glaubt, sucht Hilfe in Geduld und Gebet. Gewiß, Allah ist mit den Geduldigen."
                ),
                SourceReference(
                    type=SourceType.quran,
                    reference="Sure 103: Vers 1-3",
                    text="Bei der Zeit! Der Mensch befindet sich wahrlich in einem Zustand des Verlusts, außer denjenigen, die glauben und gute Werke tun und sich gegenseitig zur Wahrheit ermahnen und sich gegenseitig zur Geduld ermahnen."
                )
            ]
        },
        "hoffnung": {
            "dua": "Allahumma inni as'aluka husna al-khatimah wa tawbatan nasuha.\n\nÜbersetzung: O Allah, ich bitte Dich um ein gutes Ende und eine aufrichtige Reue.\n\nAlternative Dua: La hawla wa la quwwata illa billah - Es gibt keine Kraft und keine Macht außer bei Allah.",
            "source": "Überliefert von Tirmidhi",
            "related_verses": [
                SourceReference(
                    type=SourceType.quran,
                    reference="Sure 12: Vers 87",
                    text="O meine Söhne, geht hin und forscht nach Yusuf und seinem Bruder und verzweifelt nicht an Allahs Barmherzigkeit."
                ),
                SourceReference(
                    type=SourceType.quran,
                    reference="Sure 7: Vers 156",
                    text="Meine Barmherzigkeit umfaßt alle Dinge."
                )
            ]
        },
        "schutz": {
            "dua": "A'udhu billahi min ash-shaytani ar-rajim.\n\nÜbersetzung: Ich suche Zuflucht bei Allah vor dem verfluchten Teufel.\n\nAlternative Dua: Allahumma inni a'udhu bika min sharri nafsee wa min sharri kulli dabbatin anta akhdhu bi nasiyatiha - O Allah, ich suche Zuflucht bei Dir vor dem Bösen meiner Seele und vor dem Bösen jedes Tieres, dessen Kontrolle Du hast.",
            "source": "Quran - Sure 16: Vers 98",
            "related_verses": [
                SourceReference(
                    type=SourceType.quran,
                    reference="Sure 7: Vers 200-201",
                    text="Und wenn dich eine Versuchung vom Teufel versucht, so suche Zuflucht bei Allah. Gewiß, Er ist der Allhörende, der Allwissende."
                ),
                SourceReference(
                    type=SourceType.quran,
                    reference="Sure 113-114: Al-Falaq und An-Nas",
                    text="Sagen Sie: 'Ich suche Zuflucht bei dem Herrn der Morgenröte' und 'Ich suche Zuflucht bei dem Herrn der Menschen'"
                )
            ]
        },
        "wissen": {
            "dua": "Allahumma inni as'aluka 'ilman nafi'a wa rizqan tayyiba wa 'amalan mutaqabbala.\n\nÜbersetzung: O Allah, ich bitte Dich um nützliches Wissen, gute Versorgung und akzeptierte Taten.\n\nAlternative Dua: Rabbee zidni 'ilma wa zidni 'aqlaa - Mein Herr, mehre mir an Wissen und Verstand.",
            "source": "Überliefert von Ibn Majah",
            "related_verses": [
                SourceReference(
                    type=SourceType.quran,
                    reference="Sure 20: Vers 114",
                    text="Und sprich: 'Mein Herr, mehre mir an Wissen.'"
                ),
                SourceReference(
                    type=SourceType.quran,
                    reference="Sure 2: Vers 269",
                    text="Allah gewährt die Weisheit, wem Er will. Und wem die Weisheit gewährt wird, dem ist wahrlich viel Gutes gewährt worden."
                )
            ]
        },
        "familie": {
            "dua": "Allahumma ahsin ahlaqi wa ahsin akhlaq ahli wa waladi.\n\nÜbersetzung: O Allah, verbessere meinen Charakter und den Charakter meiner Familie und meiner Kinder.\n\nAlternative Dua: Rabbana hab lana min azwajina wa dhurriyyatina qurrata a'yunin wa j'alna lilmuttaqina imama - Unser Herr, schenke uns an unseren Gattinnen und Nachkommen Freude und mache uns zu Führern der Gottesfürchtigen.",
            "source": "Überliefert von Ahmad",
            "related_verses": [
                SourceReference(
                    type=SourceType.quran,
                    reference="Sure 4: Vers 36",
                    text="Und zu den Eltern sei gütig; und zu den Verwandten, den Waisen, den Bedürftigen, dem nahen Nachbarn, dem fernen Nachbarn, dem Gefährten zur Seite, dem Wanderer und denen, die eure rechte Hand besitzt."
                ),
                SourceReference(
                    type=SourceType.quran,
                    reference="Sure 25: Vers 74",
                    text="Und die sagen: 'Unser Herr, schenke uns an unseren Gattinnen und Nachkommen Freude und mache uns zu Führern der Gottesfürchtigen.'"
                )
            ]
        }
    }
    
    # Search for matching keywords using the mapping
    for keyword, category in dua_keyword_mapping.items():
        if keyword in query_lower:
            if category in dua_database:
                dua_data = dua_database[category]
                return dua_data["related_verses"], dua_data["dua"]
    
    return [], ""

def retrieve_quran_data(query: str) -> List[SourceReference]:
    """
    Retrieves relevant Quran verses based on query keywords.
    Handles both Islamic topics and everyday life problems.
    """
    print(f"Retrieving Quran data for query: {query}")
    query_lower = query.lower()
    
    # Comprehensive database of Islamic topics and everyday problems with relevant verses
    quran_database = {
        # Islamic Pillars
        "prayer": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 2: Vers 43",
                text="Und verrichtet das Gebet und entrichtet die Zakah und verneigt euch mit den sich Verneigenden."
            ),
            SourceReference(
                type=SourceType.quran,
                reference="Sure 29: Vers 45",
                text="Verlies, was dir vom Buch offenbart worden ist, und verrichte das Gebet. Gewiß, das Gebet hält davon ab, das Schändliche und Verwerfliche (zu tun)."
            )
        ],
        "ikhlas": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 112: Al-Ikhlas",
                text="Sprich: Er ist Allah, ein Einziger. Allah, der Unabhängige. Er zeugt nicht und wird nicht gezeugt. Und es gibt ihm keinen Ebenbürtigen."
            )
        ],
        "zakat": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 2: Vers 277",
                text="Diejenigen, die glauben und gute Werke tun und das Gebet verrichten und die Zakat entrichten, werden ihren Lohn bei ihrem Herrn erhalten."
            )
        ],
        "fasting": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 2: Vers 183",
                text="O ihr, die ihr glaubt, das Fasten ist euch zur Pflicht gemacht worden, wie es denen vor euch zur Pflicht gemacht wurde."
            )
        ],
        "hajj": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 3: Vers 97",
                text="Und (es ist) die Pilgerfahrt zum Hause (Allahs) eine Pflicht gegen Allah für die Menschen, wer die Mittel dazu hat."
            )
        ],
        # Everyday Problems - Doubt
        "doubt": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 27: Vers 10",
                text="Aber als er die Feuer sah, wurde ihm befohlen: 'Nimm ihn auf und fürchte dich nicht. Wir werden ihn in seinen ursprünglichen Zustand zurückbringen.'"
            ),
            SourceReference(
                type=SourceType.quran,
                reference="Sure 2: Vers 26",
                text="Gewiß, Allah schämt sich nicht, ein Gleichnis zu prägen, sei es von einer Mücke oder von etwas Geringerem. Diejenigen, die glauben, wissen, daß es die Wahrheit von ihrem Herrn ist."
            )
        ],
        # Everyday Problems - Fear and Anxiety
        "fear": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 94: Vers 5-6",
                text="Gewiß, mit der Beschwerde kommt Erleichterung. Ja, mit der Beschwerde kommt Erleichterung."
            ),
            SourceReference(
                type=SourceType.quran,
                reference="Sure 41: Vers 30",
                text="Diejenigen, die sagen: 'Unser Herr ist Allah', und dann standhaft bleiben, zu ihnen kommen die Engel hinab: 'Fürchtet euch nicht und betrübt euch nicht, sondern freut euch über das Paradies, das euch versprochen wurde.'"
            )
        ],
        # Everyday Problems - Sadness and Grief
        "sadness": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 3: Vers 139",
                text="Werdet nicht mutlos und trauert nicht, denn ihr werdet die Oberhand haben, wenn ihr gläubig seid."
            ),
            SourceReference(
                type=SourceType.quran,
                reference="Sure 2: Vers 155-157",
                text="Und Wir werden euch gewiß mit etwas Furcht und Hunger und Mangel an Vermögen, Leben und Früchten prüfen. Doch gib frohe Botschaft denen, die geduldig sind, die, wenn sie ein Unglück trifft, sagen: 'Wir gehören Allah und zu Ihm kehren wir zurück.'"
            )
        ],
        # Everyday Problems - Forgiveness
        "forgiveness": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 39: Vers 53",
                text="Sprich: 'O Meine Diener, die ihr gegen euch selbst frevelnd gewesen seid, verzweifelt nicht an Allahs Barmherzigkeit. Gewiß, Allah vergibt alle Sünden. Er ist der Vergebende, der Barmherzige.'"
            ),
            SourceReference(
                type=SourceType.quran,
                reference="Sure 4: Vers 110",
                text="Und wer eine böse Tat begeht oder sich selbst Unrecht zufügt, dann Allah um Vergebung bittet, wird Allah vergebend und barmherzig finden."
            )
        ],
        # Everyday Problems - Mercy and Compassion
        "mercy": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 7: Vers 156",
                text="Meine Barmherzigkeit umfaßt alle Dinge."
            ),
            SourceReference(
                type=SourceType.quran,
                reference="Sure 21: Vers 107",
                text="Und Wir haben dich nicht anders als als eine Barmherzigkeit für die Welten gesandt."
            )
        ],
        # Everyday Problems - Patience
        "patience": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 2: Vers 153",
                text="O ihr, die ihr glaubt, sucht Hilfe in Geduld und Gebet. Gewiß, Allah ist mit den Geduldigen."
            ),
            SourceReference(
                type=SourceType.quran,
                reference="Sure 103: Vers 1-3",
                text="Bei der Zeit! Der Mensch befindet sich wahrlich in einem Zustand des Verlusts, außer denjenigen, die glauben und gute Werke tun und sich gegenseitig zur Wahrheit ermahnen und sich gegenseitig zur Geduld ermahnen."
            )
        ],
        # Everyday Problems - Struggle and Hardship
        "hardship": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 94: Vers 1-6",
                text="Haben Wir dir nicht deine Brust geöffnet? Und Wir haben dir die Last abgenommen, die dir auf deinem Rücken lag. Und Wir haben dir deinen Ruf erhöht. Gewiß, mit der Beschwerde kommt Erleichterung. Ja, mit der Beschwerde kommt Erleichterung."
            )
        ],
        # Everyday Problems - Hope and Trust
        "hope": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 12: Vers 87",
                text="O meine Söhne, geht hin und forscht nach Yusuf und seinem Bruder und verzweifelt nicht an Allahs Barmherzigkeit. Gewiß, an Allahs Barmherzigkeit verzweifeln nur die Ungläubigen."
            )
        ],
        # Everyday Problems - Loneliness
        "loneliness": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 29: Vers 5",
                text="Diejenigen, die hoffen, Allah zu treffen, wissen, daß die Frist Allahs gewiß kommt."
            ),
            SourceReference(
                type=SourceType.quran,
                reference="Sure 50: Vers 16",
                text="Und Wir haben den Menschen erschaffen und Wir wissen, was sein Seele ihm einflüstert. Und Wir sind ihm näher als seine Halsschlagader."
            )
        ],
        # Everyday Problems - Temptation and Sin
        "temptation": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 7: Vers 200-201",
                text="Und wenn dich eine Versuchung vom Teufel versucht, so suche Zuflucht bei Allah. Gewiß, Er ist der Allhörende, der Allwissende. Diejenigen, die gottesfürchtig sind, wenn sie von einer Versuchung vom Teufel befallen werden, gedenken sie und siehe, sie sehen klar."
            )
        ],
        # Everyday Problems - Work and Provision
        "provision": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 65: Vers 3",
                text="Und wer auf Allah vertraut, für den ist Er ausreichend. Gewiß, Allah wird Seine Angelegenheit vollbringen. Allah hat für jedes Ding ein Maß bestimmt."
            ),
            SourceReference(
                type=SourceType.quran,
                reference="Sure 11: Vers 6",
                text="Und es gibt kein Getier auf Erden, dessen Versorgung nicht Allah obliegt. Und Er kennt seinen Aufenthaltsort und seinen Aufbewahrungsort. Alles ist in einem klaren Buch verzeichnet."
            )
        ],
        # Everyday Problems - Family and Relationships
        "family": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 4: Vers 36",
                text="Und diene Allah und geselle Ihm nichts bei. Und zu den Eltern sei gütig; und zu den Verwandten, den Waisen, den Bedürftigen, dem nahen Nachbarn, dem fernen Nachbarn, dem Gefährten zur Seite, dem Wanderer und denen, die eure rechte Hand besitzt."
            )
        ],
        # Everyday Problems - Health and Illness
        "health": [
            SourceReference(
                type=SourceType.quran,
                reference="Sure 26: Vers 80",
                text="Und wenn ich erkranke, so heilt Er mich."
            ),
            SourceReference(
                type=SourceType.quran,
                reference="Sure 9: Vers 28",
                text="O ihr, die ihr glaubt, gewiß, die Götzendiener sind unrein, darum laßt sie nicht zur Heiligen Moschee nahen."
            )
        ],
    }
    
    # Comprehensive keywords mapping
    keyword_mapping = {
        # Islamic Pillars
        "gebet": "prayer",
        "salah": "prayer",
        "beten": "prayer",
        "ikhlas": "ikhlas",
        "aufrichtigkeit": "ikhlas",
        "zakat": "zakat",
        "almosensteuer": "zakat",
        "spende": "zakat",
        "fasten": "fasting",
        "ramadan": "fasting",
        "sawm": "fasting",
        "hajj": "hajj",
        "pilgerfahrt": "hajj",
        "pilger": "hajj",
        # Everyday Problems
        "zweifel": "doubt",
        "unsicher": "doubt",
        "glaube": "doubt",
        "furcht": "fear",
        "angst": "fear",
        "angststörung": "fear",
        "panik": "fear",
        "trauer": "sadness",
        "traurig": "sadness",
        "depression": "sadness",
        "vergebung": "forgiveness",
        "verzeihen": "forgiveness",
        "sünde": "forgiveness",
        "barmherzigkeit": "mercy",
        "gnade": "mercy",
        "mitgefühl": "mercy",
        "geduld": "patience",
        "geduldig": "patience",
        "ausdauer": "patience",
        "schwierigkeit": "hardship",
        "problem": "hardship",
        "herausforderung": "hardship",
        "hoffnung": "hope",
        "zuversicht": "hope",
        "vertrauen": "hope",
        "einsamkeit": "loneliness",
        "einsam": "loneliness",
        "verlassen": "loneliness",
        "versuchung": "temptation",
        "arbeit": "provision",
        "job": "provision",
        "geld": "provision",
        "verdienst": "provision",
        "familie": "family",
        "eltern": "family",
        "kinder": "family",
        "ehepartner": "family",
        "gesundheit": "health",
        "krankheit": "health",
        "krank": "health",
        "heilung": "health",
    }
    
    # Search for matching keywords
    for keyword, category in keyword_mapping.items():
        if keyword in query_lower:
            return quran_database.get(category, [])
    
    # Default response if no specific match found
    return [
        SourceReference(
            type=SourceType.quran,
            reference="Sure 2: Vers 2-3",
            text="Dies ist das Buch, in dem es keinen Zweifel gibt, eine Rechtleitung fuer die Gottesfruechtigen, die an das Unsichtbare glauben und das Gebet verrichten."
        )
    ]

def retrieve_hadith_data(query: str) -> List[SourceReference]:
    """
    Retrieves relevant Hadiths based on query keywords.
    """
    print(f"Retrieving Hadith data for query: {query}")
    query_lower = query.lower()
    
    if HADITH_API_KEY == "YOUR_HADITH_API_KEY_HERE":
        print("WARNING: Hadith API Key is a placeholder. Using simulated data.")
        
    # Simulation of relevant data based on keywords
    if "gebet" in query_lower or "salah" in query_lower:
        return [
            SourceReference(
                type=SourceType.hadith,
                reference="Sahih Bukhari, Hadith 8",
                text="Der Gesandte Allahs (Friede sei mit ihm) sagte: Der Islam ist auf fuenf Saeulen aufgebaut: dem Zeugnis, dass es keinen Gott ausser Allah gibt und Muhammad der Gesandte Allahs ist, dem Verrichten des Gebets, dem Entrichten der Zakah, der Pilgerfahrt (Hajj) und dem Fasten im Ramadan."
            )
        ]
    return []

def generate_ai_response(query: str, context: List[SourceReference], is_greeting_query: bool = False, dua_text: str = "", is_free_form: bool = False) -> str:
    """
    Generates the final AI response using the LLM based on the retrieved context.
    Supports both Islamic-specific responses and free-form ChatGPT-like conversations.
    """
    if is_greeting_query:
        # Special handling for greetings
        system_prompt = (
            "Sie sind ein freundlicher islamischer KI-Assistent. Antworten Sie auf die Begruessungen des Benutzers "
            "mit einer warmen islamischen Begruessungsantwort und fragen Sie, wie Sie mit islamischen Fragen helfen koennen."
        )
        user_prompt = f"Der Benutzer sagt: {query}\n\nAntworten Sie auf Deutsch mit einer freundlichen islamischen Begruessungsantwort."
    elif is_free_form:
        # Free-form ChatGPT-like conversation with Islamic compliance
        system_prompt = (
            "Sie sind ein hilfreicher, freundlicher und intelligenter KI-Assistent. Sie koennen ueber verschiedenste Themen sprechen. "
            "Allerdings sind Sie auch ein islamischer Assistent, daher sollten Ihre Antworten immer halal und islam-konform sein. "
            "Vermeiden Sie Inhalte, die dem Islam widersprechen (z.B. Alkohol, Gluecksspiel, Unmoralisches). "
            "Antworten Sie auf Deutsch mit Freundlichkeit und Verstaendnis. Sie koennen auch islamische Perspektiven einbringen, wenn relevant."
        )
        user_prompt = f"{query}"
    elif dua_text:
        # Special handling for Dua requests
        system_prompt = (
            "Sie sind ein islamischer Gelehrter und KI-Assistent. Der Benutzer fragt nach einer Dua (Bittgebet). "
            "Praesentieren Sie die Dua auf eine respektvolle und hilfreiche Weise. Erklaeren Sie die Bedeutung und wie man sie verwenden kann."
        )
        context_text = "\n\n".join([f"[{src.type.value} - {src.reference}]: {src.text}" for src in context])
        user_prompt = (
            f"Benutzerfrage: {query}\n\n"
            f"Dua:\n{dua_text}\n\n"
            f"Verwandte Koran-Verse und Hadithe:\n{context_text}\n\n"
            "Erklaeren Sie die Dua und ihre Bedeutung auf Deutsch."
        )
    else:
        context_text = "\n\n".join([f"[{src.type.value} - {src.reference}]: {src.text}" for src in context])
        
        system_prompt = (
            "Sie sind ein islamischer Gelehrter und KI-Assistent. Ihre Aufgabe ist es, alltaegliche Probleme und Fragen "
            "des Benutzers mit Mitgefuehl und Verstaendnis zu beantworten. Verwenden Sie die bereitgestellten Koran- und Hadith-Zitate "
            "als Grundlage fuer Ihre Antwort. Geben Sie praktische, trostliche und ermutigende Antworten, die dem Benutzer helfen, "
            "seine Probleme aus einer islamischen Perspektive zu verstehen. Zitieren Sie die Quellen explizit."
        )
        
        user_prompt = (
            f"Benutzerfrage: {query}\n\n"
            f"Verfuegbarer Kontext:\n{context_text}\n\n"
            "Antworten Sie auf Deutsch mit Mitgefuehl und verwenden Sie die bereitgestellten Zitate als Grundlage."
        )
    
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt}
            ],
            temperature=0.2 if (not is_greeting_query and not is_free_form) else 0.7
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"OpenAI API Error: {e}")
        # Return a graceful error message instead of generic error
        return f"Ich entschuldige mich, aber ich konnte Ihre Frage gerade nicht verarbeiten. Bitte versuchen Sie es erneut oder stellen Sie eine andere Frage."

# --- FastAPI Endpoint ---

@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """
    Der Haupt-Endpunkt fuer die KI-Chat-Funktionalitaet.
    Fuehrt die RAG-Schritte (Retrieval, Augmentation, Generation) aus.
    """
    
    # Check if it's a greeting
    greeting_query = is_greeting(request.userQuery)
    
    if greeting_query:
        # For greetings, generate a friendly response without needing sources
        generated_answer = generate_ai_response(request.userQuery, [], is_greeting_query=True)
        return ChatResponse(
            generatedAnswer=generated_answer,
            sources=[]
        )
    
    # Check if it's a Dua request
    dua_query = is_dua_request(request.userQuery)
    
    if dua_query:
        # 1. Retrieval for Dua
        dua_verses, dua_text = retrieve_dua_data(request.userQuery)
        
        if dua_text:
            # Generate response with Dua
            generated_answer = generate_ai_response(request.userQuery, dua_verses, dua_text=dua_text)
            return ChatResponse(
                generatedAnswer=generated_answer,
                sources=dua_verses
            )
        # If no specific Dua found but user asked for one, try regular retrieval with Dua context
        else:
            quran_sources = retrieve_quran_data(request.userQuery)
            if quran_sources:
                generated_answer = generate_ai_response(request.userQuery, quran_sources)
                return ChatResponse(
                    generatedAnswer=generated_answer,
                    sources=quran_sources
                )
    
    # 1. Retrieval (Abruf) for regular questions
    quran_sources = retrieve_quran_data(request.userQuery)
    hadith_sources = retrieve_hadith_data(request.userQuery)
    
    all_sources = quran_sources + hadith_sources
    
    if not all_sources:
        # If no specific Islamic sources found, allow free-form conversation
        # This enables ChatGPT-like interaction while maintaining Islamic compliance
        generated_answer = generate_ai_response(request.userQuery, [], is_free_form=True)
        return ChatResponse(
            generatedAnswer=generated_answer,
            sources=[]
        )
    
    # 2. Augmentation & Generation (Erweiterung & Generierung)
    generated_answer = generate_ai_response(request.userQuery, all_sources)
    
    # 3. Response
    return ChatResponse(
        generatedAnswer=generated_answer,
        sources=all_sources
    )

# --- Server Start (for local testing) ---
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
