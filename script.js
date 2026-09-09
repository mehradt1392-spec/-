// ============================================================
// RENGO — STORY ENGINE v6.0
// Local Story Generator
// No API • No Backend • No Database
//
// Features:
// - Better topic understanding
// - Action / subject / object detection
// - "became a bear" != "bear ate him"
// - Genre-aware generation
// - A1 → C2 language control
// - Short / Medium / Long
// - Story structure with beginning, conflict, climax and ending
// - Topic-driven titles
// - Anti-repetition
// ============================================================

(() => {
    "use strict";

    let selectedLevel = null;

    const levelButtons = document.querySelectorAll(".level");
    const genreSelect = document.getElementById("genre");
    const topicInput = document.getElementById("topic");
    const lengthSelect = document.getElementById("length");
    const generateButton = document.getElementById("generateButton");
    const storyResult = document.getElementById("storyResult");
    const storyText = document.getElementById("storyText");

    // =========================================================
    // LEVEL SYSTEM
    // =========================================================

    const levels = {

        A1: {
            connectors: [
                "Then",
                "But",
                "So",
                "After that"
            ],

            vocabulary: "very simple",

            endings: [
                "In the end, he was safe.",
                "Finally, the problem was over.",
                "After that day, his life was different."
            ]
        },

        A2: {
            connectors: [
                "Then",
                "However",
                "After that",
                "Because of this"
            ],

            vocabulary: "simple",

            endings: [
                "In the end, he understood what had happened.",
                "Finally, the problem was solved.",
                "After that day, he never forgot what happened."
            ]
        },

        B1: {
            connectors: [
                "Meanwhile",
                "However",
                "A few minutes later",
                "Because of this"
            ],

            vocabulary: "intermediate",

            endings: [
                "In the end, he understood what the experience had taught him.",
                "After that day, he never saw the world in quite the same way.",
                "Eventually, everything returned to normal, but the memory stayed with him."
            ]
        },

        B2: {
            connectors: [
                "Meanwhile",
                "Nevertheless",
                "As a result",
                "A moment later",
                "Eventually"
            ],

            vocabulary: "upper-intermediate",

            endings: [
                "In the end, the experience changed the way he understood himself and the world around him.",
                "From that moment forward, he knew that some experiences could change a person's life forever.",
                "Eventually, the truth became impossible to ignore."
            ]
        },

        C1: {
            connectors: [
                "Meanwhile",
                "Nevertheless",
                "Consequently",
                "Without warning",
                "Eventually"
            ],

            vocabulary: "advanced",

            endings: [
                "In the end, the experience became a turning point that permanently changed his understanding of himself.",
                "From that moment onward, he understood that the strange event had transformed his view of courage and choice.",
                "Eventually, the truth emerged, leaving him with a deeper understanding of responsibility."
            ]
        },

        C2: {
            connectors: [
                "Meanwhile",
                "Nevertheless",
                "Consequently",
                "Unexpectedly",
                "Ultimately"
            ],

            vocabulary: "literary",

            endings: [
                "In the end, the experience became a defining moment that permanently altered his understanding of identity and freedom.",
                "From that moment onward, he no longer regarded the event as meaningless, but as an unexpected chapter in the story of his life.",
                "Ultimately, the truth revealed itself with consequences far greater than he had initially imagined."
            ]
        }
    };

    // =========================================================
    // BASIC DATA
    // =========================================================

    const names = [
        "Leo",
        "Noah",
        "Ethan",
        "Oliver",
        "Daniel",
        "Liam",
        "Mason",
        "Adam",
        "Lucas",
        "Ryan",
        "Emma",
        "Mia",
        "Sofia",
        "Zara",
        "Ivy"
    ];

    const places = [
        "a quiet village",
        "a small town",
        "a busy city",
        "an old neighborhood",
        "a remote forest",
        "a mountain village",
        "a coastal town"
    ];

    // =========================================================
    // GENRES
    // =========================================================

    const genreData = {

        Fantasy: {
            places: [
                "an ancient kingdom",
                "a mysterious forest",
                "a forgotten village",
                "a castle beside a silver lake",
                "a hidden valley"
            ],

            objects: [
                "an ancient stone",
                "a mysterious book",
                "a silver key",
                "a strange golden ring",
                "an old magical map"
            ]
        },

        Mystery: {
            places: [
                "a quiet town",
                "an old mansion",
                "a small hotel",
                "a forgotten neighborhood",
                "an abandoned station"
            ],

            objects: [
                "an old photograph",
                "a locked box",
                "a mysterious letter",
                "a broken watch",
                "a missing file"
            ]
        },

        Adventure: {
            places: [
                "a remote island",
                "a huge mountain",
                "a forgotten valley",
                "a dangerous forest",
                "an unexplored desert"
            ],

            objects: [
                "an old compass",
                "a mysterious map",
                "a golden coin",
                "an ancient diary",
                "a strange device"
            ]
        },

        Horror: {
            places: [
                "an abandoned house",
                "a silent forest",
                "an empty village",
                "an old hotel",
                "a forgotten hospital"
            ],

            objects: [
                "an old mirror",
                "a strange key",
                "a dusty photograph",
                "a locked wooden box",
                "an old diary"
            ]
        },

        Crime: {
            places: [
                "a busy city",
                "a quiet neighborhood",
                "an old warehouse",
                "a police station",
                "a narrow street"
            ],

            objects: [
                "a missing file",
                "a secret note",
                "an old photograph",
                "a broken watch",
                "a hidden document"
            ]
        },

        Drama: {
            places: [
                "a small town",
                "a family home",
                "a quiet village",
                "a busy city",
                "an old apartment"
            ],

            objects: [
                "an old photograph",
                "a family letter",
                "a small suitcase",
                "an old diary",
                "a forgotten gift"
            ]
        },

        Comedy: {
            places: [
                "a busy city",
                "a small apartment",
                "a strange village",
                "a crowded school",
                "a noisy neighborhood"
            ],

            objects: [
                "a broken phone",
                "a strange hat",
                "an old bicycle",
                "a giant sandwich",
                "a mysterious box"
            ]
        },

        Romance: {
            places: [
                "a quiet town",
                "a small café",
                "a beautiful village",
                "a city park",
                "a peaceful bookstore"
            ],

            objects: [
                "a handwritten letter",
                "a small gift",
                "an old photograph",
                "an old book",
                "a forgotten message"
            ]
        },

        "Science Fiction": {
            places: [
                "a space station",
                "a futuristic city",
                "a research laboratory",
                "a distant planet",
                "a secret underground facility"
            ],

            objects: [
                "a strange machine",
                "a small robot",
                "an unknown device",
                "a mysterious computer",
                "a strange signal"
            ]
        },

        Historical: {
            places: [
                "a royal palace",
                "a medieval city",
                "a small village",
                "an ancient kingdom",
                "a historic fortress"
            ],

            objects: [
                "a royal crown",
                "an ancient letter",
                "an old sword",
                "a sealed document",
                "a royal seal"
            ]
        },

        Custom: {
            places: [
                "a quiet town",
                "a small village",
                "a large city",
                "a distant place",
                "a peaceful neighborhood"
            ],

            objects: [
                "an old object",
                "a strange letter",
                "a mysterious box",
                "a forgotten photograph",
                "an unusual device"
            ]
        }
    };

    // =========================================================
    // UTILITIES
    // =========================================================

    function random(array) {
        return array[Math.floor(Math.random() * array.length)];
    }

    function normalize(text) {
        return String(text || "")
            .toLowerCase()
            .replace(/[ي]/g, "ی")
            .replace(/[ك]/g, "ک")
            .replace(/\u200c/g, " ")
            .replace(/\s+/g, " ")
            .trim();
    }

    function escapeHTML(text) {
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function connector(level) {
        return random(levels[level].connectors);
    }

    // =========================================================
    // LENGTH SYSTEM
    // =========================================================

    function getLength(length) {

        if (length === "short") {
            return {
                opening: 2,
                development: 3,
                complications: 1,
                climax: 2,
                ending: 2
            };
        }

        if (length === "medium") {
            return {
                opening: 3,
                development: 6,
                complications: 3,
                climax: 3,
                ending: 3
            };
        }

        return {
            opening: 5,
            development: 11,
            complications: 6,
            climax: 5,
            ending: 5
        };
    }

    // =========================================================
    // TOPIC PARSER
    // =========================================================

    function analyzeTopic(topic) {

        const t = normalize(topic);

        const info = {

            protagonist: "person",

            gender: "neutral",

            animal: null,

            transformation: false,

            eaten: false,

            attacked: false,

            found: false,

            lost: false,

            journey: false,

            marriage: false,

            inheritance: false,

            kingdom: false,

            mystery: false,

            crime: false,

            danger: false,

            death: false,

            future: false,

            past: false,

            magic: false,

            robot: false,

            monster: false,

            dragon: false,

            girl: false,

            boy: false,

            topicKnown: false,

            raw: topic
        };

        // -----------------------------------------------------
        // PEOPLE
        // -----------------------------------------------------

        if (
            t.includes("پسر") ||
            t.includes("جوان") ||
            t.includes("مرد")
        ) {
            info.protagonist = "young man";
            info.gender = "male";
            info.boy = true;
            info.topicKnown = true;
        }

        if (
            t.includes("دختر") ||
            t.includes("زن")
        ) {
            info.protagonist = "young woman";
            info.gender = "female";
            info.girl = true;
            info.topicKnown = true;
        }

        // -----------------------------------------------------
        // ANIMALS
        // -----------------------------------------------------

        if (
            t.includes("خرس") ||
            t.includes("bear")
        ) {
            info.animal = "bear";
            info.topicKnown = true;
        }

        if (
            t.includes("گرگ") ||
            t.includes("wolf")
        ) {
            info.animal = "wolf";
            info.topicKnown = true;
        }

        if (
            t.includes("شیر") ||
            t.includes("lion")
        ) {
            info.animal = "lion";
            info.topicKnown = true;
        }

        if (
            t.includes("ببر") ||
            t.includes("tiger")
        ) {
            info.animal = "tiger";
            info.topicKnown = true;
        }

        if (
            t.includes("سگ") ||
            t.includes("dog")
        ) {
            info.animal = "dog";
            info.topicKnown = true;
        }

        if (
            t.includes("گربه") ||
            t.includes("cat")
        ) {
            info.animal = "cat";
            info.topicKnown = true;
        }

        if (
            t.includes("اژدها") ||
            t.includes("dragon")
        ) {
            info.dragon = true;
            info.animal = "dragon";
            info.topicKnown = true;
        }

        // -----------------------------------------------------
        // CRITICAL DISTINCTION:
        // "became bear"
        // vs
        // "bear ate him"
        // -----------------------------------------------------

        const transformationWords = [
            "شد",
            "تبدیل شد",
            "تبدیل به",
            "بدل شد",
            "تبدیلش کرد",
            "become",
            "became",
            "turned into",
            "transform"
        ];

        const eatingWords = [
            "خورد",
            "او را خورد",
            "اونو خورد",
            "بلعید",
            "devoured",
            "ate him",
            "ate her",
            "ate the boy",
            "ate the girl"
        ];

        for (const word of transformationWords) {
            if (t.includes(word)) {
                info.transformation = true;
                break;
            }
        }

        for (const word of eatingWords) {
            if (t.includes(word)) {
                info.eaten = true;
                info.danger = true;
                break;
            }
        }

        // If animal exists and eating language exists,
        // NEVER interpret it as transformation.
        if (info.eaten) {
            info.transformation = false;
        }

        // -----------------------------------------------------
        // OTHER ACTIONS
        // -----------------------------------------------------

        if (
            t.includes("حمله") ||
            t.includes("حمله کرد") ||
            t.includes("مورد حمله") ||
            t.includes("attack")
        ) {
            info.attacked = true;
            info.danger = true;
        }

        if (
            t.includes("پیدا کرد") ||
            t.includes("پیدا می‌کند") ||
            t.includes("یافت") ||
            t.includes("پیدا کردن") ||
            t.includes("find")
        ) {
            info.found = true;
        }

        if (
            t.includes("گم شد") ||
            t.includes("گم شده") ||
            t.includes("گم می‌شود") ||
            t.includes("lost")
        ) {
            info.lost = true;
            info.danger = true;
        }

        if (
            t.includes("سفر") ||
            t.includes("رفت") ||
            t.includes("ماجراجویی") ||
            t.includes("جزیره") ||
            t.includes("کوه") ||
            t.includes("جنگل")
        ) {
            info.journey = true;
        }

        // -----------------------------------------------------
        // RELATIONSHIPS / ROYAL
        // -----------------------------------------------------

        if (
            t.includes("ازدواج") ||
            t.includes("عروسی") ||
            t.includes("ازدواج کرد")
        ) {
            info.marriage = true;
        }

        if (
            t.includes("وارث") ||
            t.includes("تاج و تخت") ||
            t.includes("پادشاه") ||
            t.includes("ملکه") ||
            t.includes("سلطنت")
        ) {
            info.inheritance = true;
            info.kingdom = true;
        }

        // -----------------------------------------------------
        // MYSTERY / CRIME
        // -----------------------------------------------------

        if (
            t.includes("راز") ||
            t.includes("معما") ||
            t.includes("نامه") ||
            t.includes("گمشده") ||
            t.includes("مفقود")
        ) {
            info.mystery = true;
        }

        if (
            t.includes("دزد") ||
            t.includes("قاتل") ||
            t.includes("قتل") ||
            t.includes("سرقت") ||
            t.includes("جرم")
        ) {
            info.crime = true;
            info.danger = true;
        }

        // -----------------------------------------------------
        // MAGIC
        // -----------------------------------------------------

        if (
            t.includes("جادو") ||
            t.includes("جادویی") ||
            t.includes("طلسم") ||
            t.includes("جادوگر")
        ) {
            info.magic = true;
        }

        // -----------------------------------------------------
        // SCI-FI
        // -----------------------------------------------------

        if (
            t.includes("ربات") ||
            t.includes("هوش مصنوعی")
        ) {
            info.robot = true;
        }

        if (
            t.includes("آینده") ||
            t.includes("زمان آینده")
        ) {
            info.future = true;
        }

        if (
            t.includes("گذشته") ||
            t.includes("زمان گذشته")
        ) {
            info.past = true;
        }

        if (
            t.includes("هیولا") ||
            t.includes("monster")
        ) {
            info.monster = true;
            info.danger = true;
        }

        return info;
    }

    // =========================================================
    // TITLE GENERATOR
    // =========================================================

    function createTitle(info, genre) {

        if (info.eaten && info.animal === "bear") {
            return "The Boy and the Bear";
        }

        if (info.transformation && info.animal === "bear") {
            return "The Boy Who Became a Bear";
        }

        if (info.transformation && info.animal) {
            return `The Boy Who Became a ${capitalize(info.animal)}`;
        }

        if (info.dragon) {
            return "The Boy and the Dragon";
        }

        if (info.robot) {
            return "The Human and the Machine";
        }

        if (info.marriage && info.inheritance) {
            return "The Unexpected Heirs";
        }

        if (info.crime) {
            return "The Secret Behind the Crime";
        }

        if (info.mystery) {
            return "The Mystery Behind the Secret";
        }

        const titles = {

            Fantasy: [
                "The Secret Beyond the Kingdom",
                "The Hidden Magic",
                "The Forgotten Kingdom"
            ],

            Mystery: [
                "The Hidden Secret",
                "The Missing Clue",
                "The Mystery in the Dark"
            ],

            Adventure: [
                "The Journey Beyond the Unknown",
                "The Last Expedition",
                "Beyond the Forgotten Valley"
            ],

            Horror: [
                "The Secret in the Darkness",
                "The House Nobody Entered",
                "The Whisper in the Forest"
            ],

            Crime: [
                "The Missing Evidence",
                "The Secret File",
                "The Last Clue"
            ],

            Drama: [
                "The Day Everything Changed",
                "The Forgotten Letter",
                "A Life Changed Forever"
            ],

            Comedy: [
                "The Most Unexpected Day",
                "Everything Went Wrong",
                "The Strangest Day Ever"
            ],

            Romance: [
                "A Story of Two Hearts",
                "The Letter on the Table",
                "The Unexpected Meeting"
            ],

            "Science Fiction": [
                "The Signal from Beyond",
                "The Machine from Tomorrow",
                "The Last Transmission"
            ],

            Historical: [
                "The Secret of the Kingdom",
                "The Forgotten Crown",
                "The Sealed Letter"
            ],

            Custom: [
                "The Unexpected Story",
                "The Day Everything Changed",
                "The Strange Journey"
            ]
        };

        return random(
            titles[genre] || titles.Custom
        );
    }

    function capitalize(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    // =========================================================
    // BEAR EATS BOY STORY
    // =========================================================

    function createAnimalAttackStory(levelName, length, info) {

        const level = levels[levelName];
        const count = getLength(length);

        const name = random(
            info.boy
                ? ["Leo", "Noah", "Ethan", "Oliver", "Liam"]
                : names
        );

        const animal = info.animal || "wild animal";

        const animalName = capitalize(animal);

        const story = [];

        // OPENING

        story.push(
            `${name} was a young man who lived near a quiet forest. He often walked along its edge, but he had never imagined that one ordinary day would change his life completely.`
        );

        story.push(
            `One afternoon, ${name} entered the forest alone. The trees were tall, the path was almost empty, and the sounds of the city slowly disappeared behind him.`
        );

        if (count.opening > 2) {
            story.push(
                `He had heard stories about wild animals living deep inside the forest, but he had always believed those stories were exaggerated.`
            );
        }

        if (count.opening > 3) {
            story.push(
                `${connector(levelName)}, he noticed fresh tracks on the ground. They were large enough to make him stop and look carefully.`
            );
        }

        if (count.opening > 4) {
            story.push(
                `For the first time that day, ${name} felt that he was no longer alone.`
            );
        }

        // DEVELOPMENT

        story.push(
            `A few moments later, ${name} heard a deep sound coming from between the trees.`
        );

        story.push(
            `He turned around and saw a large ${animal} standing on the path.`
        );

        story.push(
            `For a moment, neither of them moved. ${name} slowly stepped backward, hoping that the animal would leave him alone.`
        );

        if (count.development > 3) {
            story.push(
                `The ${animal} watched him carefully and moved closer. ${name} understood that running might make the situation worse.`
            );
        }

        if (count.development > 4) {
            story.push(
                `${connector(levelName)}, ${name} tried to move toward a group of trees where he might find a safe place.`
            );
        }

        if (count.development > 5) {
            story.push(
                `But the animal followed him. The peaceful forest suddenly felt completely different.`
            );
        }

        // COMPLICATIONS

        if (count.complications > 1) {
            story.push(
                `${name} looked around and saw an old wooden shelter nearby. He hurried toward it, but the door was locked.`
            );
        }

        if (count.complications > 2) {
            story.push(
                `He searched for another way inside while the animal continued to approach.`
            );
        }

        if (count.complications > 3) {
            story.push(
                `There was a narrow path behind the shelter, but it led deeper into the forest instead of back toward the village.`
            );
        }

        if (count.complications > 4) {
            story.push(
                `${name} had to make a choice: follow the dangerous path or remain where he was.`
            );
        }

        if (count.complications > 5) {
            story.push(
                `He chose the path, hoping that it would eventually lead him to a safer place.`
            );
        }

        // CLIMAX

        story.push(
            `Suddenly, the ${animal} rushed toward him. ${name} tried to escape, but there was nowhere safe to go.`
        );

        story.push(
            `${connector(levelName)}, the animal caught him, and the forest became silent.`
        );

        if (info.eaten) {

            story.push(
                `The encounter ended tragically. The ${animal} killed and ate ${name}, and his journey through the forest came to an end.`
            );

            if (count.climax > 2) {
                story.push(
                    `The following morning, the villagers found his belongings near the forest path and realized that something terrible had happened.`
                );
            }

            if (count.climax > 3) {
                story.push(
                    `From that day onward, the villagers warned every traveler never to enter that part of the forest alone.`
                );
            }

            if (count.climax > 4) {
                story.push(
                    `The forest remained where it had always been, quiet and beautiful from a distance, while the memory of the missing boy became a warning that people would not forget.`
                );
            }

        } else {

            story.push(
                `At the last possible moment, ${name} found a way to escape and reached the village before nightfall.`
            );

            if (count.climax > 2) {
                story.push(
                    `He was frightened and exhausted, but he was alive.`
                );
            }

            if (count.climax > 3) {
                story.push(
                    `After that day, ${name} never entered the forest without thinking carefully about the dangers hidden beyond the trees.`
                );
            }

            if (count.climax > 4) {
                story.push(
                    `He also understood that courage did not mean ignoring danger; sometimes, courage meant knowing when to turn back.`
                );
            }
        }

        // ENDING

        if (info.eaten) {

            story.push(
                `The story of ${name} became a quiet warning in the village, passed from one generation to the next.`
            );

            story.push(
                `And whenever someone asked why the old forest path was avoided, the villagers remembered the day when ${name} walked into the trees and never returned.`
            );

        } else {

            story.push(
                random(level.endings)
            );
        }

        return story;
    }

    // =========================================================
    // TRANSFORMATION STORY
    // =========================================================

    function createTransformationStory(levelName, length, info) {

        const level = levels[levelName];
        const count = getLength(length);

        const name = random(
            info.boy
                ? ["Leo", "Noah", "Ethan", "Oliver", "Liam"]
                : names
        );

        const animal = info.animal || "bear";

        const story = [];

        story.push(
            `${name} was an ordinary young man who lived near a quiet forest. His life was simple, and he never expected anything extraordinary to happen to him.`
        );

        story.push(
            `One morning, ${name} woke up and discovered something impossible: he had turned into a ${animal}.`
        );

        if (count.opening > 2) {
            story.push(
                `At first, he could not understand what had happened. He looked at his reflection and realized that his entire body had changed.`
            );
        }

        if (count.opening > 3) {
            story.push(
                `He tried to speak, but only the sound of an animal came from his mouth.`
            );
        }

        if (count.opening > 4) {
            story.push(
                `${connector(levelName)}, he left his home and entered the forest to search for an explanation.`
            );
        }

        story.push(
            `Deep among the trees, ${name} discovered an ancient stone covered with strange symbols.`
        );

        story.push(
            `The symbols seemed to describe an old spell that could transform a human into an animal.`
        );

        if (count.development > 3) {
            story.push(
                `An old traveler appeared and told ${name} that the transformation was connected to a forgotten secret.`
            );
        }

        if (count.development > 4) {
            story.push(
                `${connector(levelName)}, ${name} learned that he could return to normal only after completing a difficult task.`
            );
        }

        if (count.development > 5) {
            story.push(
                `The task forced him to enter the darkest part of the forest, where the original spell had been created many years earlier.`
            );
        }

        if (count.development > 6) {
            story.push(
                `${name} continued forward despite his fear. Every step brought him closer to the truth.`
            );
        }

        if (count.development > 7) {
            story.push(
                `Eventually, he reached a ruined tower hidden behind the trees.`
            );
        }

        if (count.development > 8) {
            story.push(
                `Inside the tower, he found the person who had created the spell.`
            );
        }

        if (count.development > 9) {
            story.push(
                `The truth was surprising: the transformation had not been created to punish him. It had been created to test whether he could remain brave when everything familiar had disappeared.`
            );
        }

        if (count.development > 10) {
            story.push(
                `${name} finally understood why the strange event had happened to him.`
            );
        }

        // CLIMAX

        story.push(
            `${connector(levelName)}, ${name} faced the final challenge and refused to run away.`
        );

        story.push(
            `The symbols on the ancient stone began to glow, and the spell slowly started to disappear.`
        );

        if (count.climax > 2) {
            story.push(
                `${name} felt his body changing again. The claws disappeared, his hands returned, and the strange animal form slowly vanished.`
            );
        }

        if (count.climax > 3) {
            story.push(
                `When the transformation was finally complete, he was human again.`
            );
        }

        if (count.climax > 4) {
            story.push(
                `He walked out of the forest at sunrise, carrying a lesson that he knew he would never forget.`
            );
        }

        // END

        story.push(
            `From that day on, ${name} understood that his life could change without warning, but he also knew that he was stronger than he had once believed.`
        );

        story.push(
            random(level.endings)
        );

        return story;
    }

    // =========================================================
    // ROYAL STORY
    // =========================================================

    function createRoyalStory(levelName, length) {

        const level = levels[levelName];
        const count = getLength(length);

        const story = [];

        story.push(
            `Leo was a young man who lived far from the royal palace. He had never imagined that one day he would become part of the history of a kingdom.`
        );

        story.push(
            `One day, he met Sophia, a kind and intelligent young woman. Their friendship grew stronger, and they began to imagine a future together.`
        );

        if (count.opening > 2) {
            story.push(
                `${connector(levelName)}, they decided to marry and build a peaceful life together.`
            );
        }

        story.push(
            `Their peaceful life changed when an old messenger arrived with a sealed royal letter.`
        );

        story.push(
            `The letter contained a secret that had been hidden for generations.`
        );

        if (count.development > 4) {
            story.push(
                `Both Leo and Sophia were connected to an ancient royal family.`
            );
        }

        if (count.development > 5) {
            story.push(
                `At first, they believed the letter was a mistake. They had never lived like royalty and had never expected to inherit a kingdom.`
            );
        }

        if (count.development > 6) {
            story.push(
                `${connector(levelName)}, they traveled to the royal capital to discover the truth.`
            );
        }

        if (count.development > 7) {
            story.push(
                `Inside the ancient palace, the council showed them old documents proving that they were the rightful heirs to the throne.`
            );
        }

        if (count.development > 8) {
            story.push(
                `The discovery created a difficult choice. They could return to their peaceful life, or accept the responsibility of becoming the new heirs of the kingdom.`
            );
        }

        if (count.development > 9) {
            story.push(
                `After a long discussion, they chose to accept the responsibility.`
            );
        }

        if (count.development > 10) {
            story.push(
                `They understood that wearing a crown was not about wealth or power, but about protecting the people who depended on them.`
            );
        }

        story.push(
            `${connector(levelName)}, they stood before the people of the kingdom and promised to rule with fairness and courage.`
        );

        if (count.climax > 2) {
            story.push(
                `The people welcomed them, and the kingdom finally had new heirs who cared about its future.`
            );
        }

        if (count.climax > 3) {
            story.push(
                `Years later, Leo and Sophia looked back on the day they had met and realized how unexpectedly their lives had changed.`
            );
        }

        if (count.climax > 4) {
            story.push(
                `They had begun as two ordinary people, but together they had become the hope of an entire kingdom.`
            );
        }

        story.push(
            random(level.endings)
        );

        return story;
    }

    // =========================================================
    // GENERAL TOPIC STORY
    // =========================================================

    function createGeneralStory(levelName, genre, length, info, topic) {

        const level = levels[levelName];
        const data = genreData[genre] || genreData.Custom;
        const count = getLength(length);

        const name = random(names);
        const place = random(data.places);
        const object = random(data.objects);

        const story = [];

        // -----------------------------------------------------
        // Opening
        // -----------------------------------------------------

        story.push(
            `${name} lived in ${place}, where life was usually calm and predictable.`
        );

        story.push(
            `Everything seemed normal until one day, an unexpected event changed the direction of ${name}'s life.`
        );

        if (count.opening > 2) {
            story.push(
                `At first, ${name} did not understand what was happening, but he quickly realized that ignoring the situation would only make things worse.`
            );
        }

        if (count.opening > 3) {
            story.push(
                `${connector(levelName)}, he decided to investigate instead of waiting for someone else to solve the problem.`
            );
        }

        if (count.opening > 4) {
            story.push(
                `He took ${object} with him because he believed it might become useful later.`
            );
        }

        // -----------------------------------------------------
        // Development
        // -----------------------------------------------------

        story.push(
            `The search led ${name} to a place he had never visited before.`
        );

        story.push(
            `There, he discovered a clue that made the situation even more mysterious.`
        );

        if (count.development > 3) {
            story.push(
                `${connector(levelName)}, ${name} realized that the strange event was connected to something much larger than he had expected.`
            );
        }

        if (count.development > 4) {
            story.push(
                `The closer ${name} came to the truth, the more difficult the situation became.`
            );
        }

        if (count.development > 5) {
            story.push(
                `Someone had clearly tried to hide the truth, and ${name} began to wonder why.`
            );
        }

        if (count.development > 6) {
            story.push(
                `For a moment, ${name} considered giving up, but curiosity pushed him forward.`
            );
        }

        if (count.development > 7) {
            story.push(
                `He followed another clue and discovered an unexpected connection between the past and the present.`
            );
        }

        if (count.development > 8) {
            story.push(
                `${connector(levelName)}, he finally understood that the first clue had only been the beginning.`
            );
        }

        if (count.development > 9) {
            story.push(
                `The real problem was much closer to him than he had imagined.`
            );
        }

        if (count.development > 10) {
            story.push(
                `With the final clue in his hands, ${name} prepared himself for the moment when he would have to make a difficult choice.`
            );
        }

        // -----------------------------------------------------
        // Complications
        // -----------------------------------------------------

        if (count.complications > 1) {
            story.push(
                `Before he could act, something unexpected happened and forced him to change his plan.`
            );
        }

        if (count.complications > 2) {
            story.push(
                `${name} suddenly realized that he could no longer trust everyone around him.`
            );
        }

        if (count.complications > 3) {
            story.push(
                `The pressure increased, but he refused to abandon what he had started.`
            );
        }

        if (count.complications > 4) {
            story.push(
                `${connector(levelName)}, ${name} found the courage to continue even though he was no longer certain how the story would end.`
            );
        }

        if (count.complications > 5) {
            story.push(
                `At last, he reached the place where the truth had been hidden.`
            );
        }

        // -----------------------------------------------------
        // Climax
        // -----------------------------------------------------

        story.push(
            `There, ${name} faced the main problem and finally understood what had really happened.`
        );

        story.push(
            `${connector(levelName)}, he made the difficult decision he had been avoiding since the beginning.`
        );

        if (count.climax > 2) {
            story.push(
                `His decision changed the situation completely and gave him a chance to solve the problem.`
            );
        }

        if (count.climax > 3) {
            story.push(
                `The danger slowly disappeared, and the truth was finally revealed.`
            );
        }

        if (count.climax > 4) {
            story.push(
                `When everything was finally over, ${name} understood why the strange journey had been necessary.`
            );
        }

        // -----------------------------------------------------
        // Ending
        // -----------------------------------------------------

        story.push(
            random(level.endings)
        );

        if (count.ending > 2) {
            story.push(
                `The experience remained an important memory for ${name}.`
            );
        }

        if (count.ending > 3) {
            story.push(
                `Whenever he remembered that day, he realized how close he had been to choosing a completely different path.`
            );
        }

        if (count.ending > 4) {
            story.push(
                `His life eventually became calm again, but he was no longer the same person who had begun that journey.`
            );
        }

        return story;
    }

    // =========================================================
    // GENERATOR
    // =========================================================

    function generateStory() {

        if (!selectedLevel) {
            alert("لطفاً ابتدا سطح زبانت را انتخاب کن.");
            return;
        }

        const topic = topicInput.value.trim();

        if (!topic) {
            alert("لطفاً موضوع داستان را بنویس.");
            topicInput.focus();
            return;
        }

        const genre = genreSelect.value;
        const length = lengthSelect.value;

        const info = analyzeTopic(topic);

        let paragraphs = [];

        // -----------------------------------------------------
        // STORY ROUTING
        // -----------------------------------------------------

        if (
            info.eaten &&
            info.animal
        ) {

            paragraphs = createAnimalAttackStory(
                selectedLevel,
                length,
                info
            );

        }

        else if (
            info.transformation &&
            info.animal
        ) {

            paragraphs = createTransformationStory(
                selectedLevel,
                length,
                info
            );

        }

        else if (
            info.marriage &&
            info.inheritance &&
            info.kingdom
        ) {

            paragraphs = createRoyalStory(
                selectedLevel,
                length
            );

        }

        else {

            paragraphs = createGeneralStory(
                selectedLevel,
                genre,
                length,
                info,
                topic
            );
        }

        // -----------------------------------------------------
        // REMOVE EXACT DUPLICATES
        // -----------------------------------------------------

        paragraphs = paragraphs.filter(
            (paragraph, index, array) =>
                array.indexOf(paragraph) === index
        );

        // -----------------------------------------------------
        // TITLE
        // -----------------------------------------------------

        const title = createTitle(
            info,
            genre
        );

        // -----------------------------------------------------
        // OUTPUT
        // -----------------------------------------------------

        storyText.innerHTML = `

            <div class="story-info">

                <p>
                    <strong>سطح:</strong>
                    ${escapeHTML(selectedLevel)}
                </p>

                <p>
                    <strong>ژانر:</strong>
                    ${escapeHTML(genre)}
                </p>

                <p>
                    <strong>طول:</strong>
                    ${escapeHTML(length)}
                </p>

            </div>

            <hr>

            <h3 class="story-title">
                ${escapeHTML(title)}
            </h3>

            <div class="english-story">

                ${paragraphs
                    .map(
                        paragraph =>
                            `<p>${escapeHTML(paragraph)}</p>`
                    )
                    .join("")}

            </div>

        `;

        storyResult.classList.remove("hidden");

        storyResult.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }

    // =========================================================
    // LEVEL BUTTONS
    // =========================================================

    levelButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                levelButtons.forEach(btn => {
                    btn.classList.remove("active");
                });

                button.classList.add("active");

                selectedLevel =
                    button.dataset.level;
            }
        );
    });

    // =========================================================
    // GENERATE BUTTON
    // =========================================================

    generateButton.addEventListener(
        "click",
        generateStory
    );

    // =========================================================
    // PUBLIC ENGINE
    // =========================================================

    window.RangoStoryEngine = {

        generate: generateStory,

        analyzeTopic,

        version: "6.0.0"

    };

})();
