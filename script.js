// ==========================================
// RENGO — STORY INTELLIGENCE ENGINE v4
// Local • No API • No Backend
// ==========================================

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


    // ==========================================
    // NAMES
    // ==========================================

    const names = [
        "Leo", "Mia", "Noah", "Emma",
        "Liam", "Zara", "Ethan", "Ivy",
        "Oliver", "Lina", "Daniel", "Sophia"
    ];


    // ==========================================
    // LEVEL SYSTEM
    // ==========================================

    const levels = {

        A1: {
            connectors: ["Then", "But", "So", "After that"],
            endings: [
                "In the end, they were happy.",
                "At the end, everything was safe.",
                "From that day on, their lives were different."
            ]
        },

        A2: {
            connectors: ["Then", "However", "After that", "Because of this"],
            endings: [
                "In the end, they understood the truth.",
                "Finally, everything became clear.",
                "From that day on, they never forgot what happened."
            ]
        },

        B1: {
            connectors: [
                "Meanwhile",
                "However",
                "A few minutes later",
                "Because of this"
            ],
            endings: [
                "In the end, the experience changed their lives.",
                "After that day, nothing felt quite the same.",
                "Eventually, they understood what had really happened."
            ]
        },

        B2: {
            connectors: [
                "Meanwhile",
                "Nevertheless",
                "As a result",
                "A moment later"
            ],
            endings: [
                "In the end, the experience changed their understanding of the world.",
                "From that moment forward, they knew that their lives had changed.",
                "Eventually, the truth became impossible to ignore."
            ]
        },

        C1: {
            connectors: [
                "Meanwhile",
                "Nevertheless",
                "Consequently",
                "Without warning"
            ],
            endings: [
                "In the end, the experience revealed something none of them had expected.",
                "From that moment onward, they understood that the past could never simply be forgotten.",
                "Eventually, the truth emerged, although it was far more complicated than anyone had imagined."
            ]
        },

        C2: {
            connectors: [
                "Meanwhile",
                "Nevertheless",
                "Consequently",
                "Unexpectedly"
            ],
            endings: [
                "In the end, the experience became a turning point that permanently altered their understanding of the world.",
                "From that moment onward, nothing could return to the way it had been before.",
                "Eventually, the truth surfaced, carrying consequences far beyond anything they had originally anticipated."
            ]
        }

    };


    // ==========================================
    // GENRES
    // ==========================================

    const genres = {

        Fantasy: {
            places: [
                "an ancient kingdom",
                "a forgotten castle",
                "a village beside a silver lake",
                "a mysterious royal city"
            ],
            objects: [
                "an ancient crown",
                "a magical ring",
                "a forgotten royal letter",
                "an old golden key"
            ]
        },

        Mystery: {
            places: [
                "a quiet town",
                "an old mansion",
                "a small hotel",
                "a silent neighborhood"
            ],
            objects: [
                "a mysterious letter",
                "an old photograph",
                "a locked box",
                "a broken watch"
            ]
        },

        Adventure: {
            places: [
                "a remote island",
                "a huge mountain",
                "a forgotten valley",
                "a dangerous jungle"
            ],
            objects: [
                "an old compass",
                "a mysterious map",
                "a golden coin",
                "an ancient diary"
            ]
        },

        Horror: {
            places: [
                "an abandoned house",
                "a silent forest",
                "an empty village",
                "an old hotel"
            ],
            objects: [
                "an old mirror",
                "a strange key",
                "a dusty photograph",
                "a locked box"
            ]
        },

        Crime: {
            places: [
                "a large city",
                "a quiet neighborhood",
                "an old warehouse",
                "a police station"
            ],
            objects: [
                "a missing file",
                "an old photograph",
                "a secret note",
                "a broken watch"
            ]
        },

        Drama: {
            places: [
                "a small town",
                "a family home",
                "a busy city",
                "a quiet village"
            ],
            objects: [
                "an old photograph",
                "a family letter",
                "a small suitcase",
                "an old diary"
            ]
        },

        Comedy: {
            places: [
                "a busy city",
                "a small apartment",
                "a strange village",
                "a crowded school"
            ],
            objects: [
                "a broken phone",
                "a giant sandwich",
                "a strange hat",
                "an old bicycle"
            ]
        },

        Romance: {
            places: [
                "a quiet town",
                "a small café",
                "a beautiful village",
                "a city park"
            ],
            objects: [
                "a handwritten letter",
                "a small gift",
                "an old photograph",
                "an old book"
            ]
        },

        "Science Fiction": {
            places: [
                "a space station",
                "a futuristic city",
                "a research laboratory",
                "a distant planet"
            ],
            objects: [
                "a strange machine",
                "a small robot",
                "an unknown device",
                "a mysterious computer"
            ]
        },

        Historical: {
            places: [
                "a royal palace",
                "a medieval city",
                "a small village",
                "an old European kingdom"
            ],
            objects: [
                "a royal crown",
                "an ancient letter",
                "an old sword",
                "a sealed document"
            ]
        },

        Custom: {
            places: [
                "a quiet town",
                "a large city",
                "a small village",
                "a distant place"
            ],
            objects: [
                "an old object",
                "a strange letter",
                "a mysterious box",
                "a forgotten photograph"
            ]
        }

    };


    // ==========================================
    // UTILITIES
    // ==========================================

    function random(array) {
        return array[Math.floor(Math.random() * array.length)];
    }


    function escapeHTML(text) {
        return String(text)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    function normalize(text) {
        return String(text || "")
            .toLowerCase()
            .replace(/[ي]/g, "ی")
            .replace(/[ك]/g, "ک")
            .replace(/\s+/g, " ")
            .trim();
    }


    // ==========================================
    // TOPIC INTELLIGENCE
    // ==========================================

    function understandTopic(topic) {

        const t = normalize(topic);

        const result = {
            type: "general",
            protagonist: "a young person",
            companion: null,
            transformation: null,
            kingdom: false,
            marriage: false,
            love: false,
            inheritance: false,
            animal: null,
            mystery: false,
            journey: false,
            danger: false,
            customIdea: topic
        };


        // --------------------------------------
        // MARRIAGE / LOVE
        // --------------------------------------

        if (
            t.includes("ازدواج") ||
            t.includes("ازدواج می") ||
            t.includes("ازدواج میکن") ||
            t.includes("ازدواج می‌کن") ||
            t.includes("ازدواج کردند") ||
            t.includes("عاشق")
        ) {
            result.marriage = true;
            result.love = true;
            result.type = "romance";
        }


        // --------------------------------------
        // INHERITANCE / THRONE
        // --------------------------------------

        if (
            t.includes("وارث") ||
            t.includes("تاج و تخت") ||
            t.includes("پادشاه") ||
            t.includes("ملکه") ||
            t.includes("سلطنت") ||
            t.includes("تخت")
        ) {
            result.inheritance = true;
            result.kingdom = true;
        }


        // --------------------------------------
        // BEAUTIFUL GIRL
        // --------------------------------------

        if (
            t.includes("دختر") ||
            t.includes("زن")
        ) {
            result.companion = "a kind young woman";
        }


        // --------------------------------------
        // BOY
        // --------------------------------------

        if (
            t.includes("پسر") ||
            t.includes("جوان")
        ) {
            result.protagonist = "a young man";
        }


        // --------------------------------------
        // ANIMALS
        // --------------------------------------

        if (t.includes("خرس") || t.includes("bear")) {

            result.type = "bear";
            result.animal = "bear";
            result.transformation = true;

        }

        else if (t.includes("گرگ") || t.includes("wolf")) {

            result.type = "wolf";
            result.animal = "wolf";

        }

        else if (t.includes("گربه") || t.includes("cat")) {

            result.type = "cat";
            result.animal = "cat";

        }

        else if (t.includes("سگ") || t.includes("dog")) {

            result.type = "dog";
            result.animal = "dog";

        }


        // --------------------------------------
        // MYSTERY
        // --------------------------------------

        if (
            t.includes("معما") ||
            t.includes("راز") ||
            t.includes("نامه") ||
            t.includes("مفقود") ||
            t.includes("گمشده")
        ) {
            result.mystery = true;
        }


        // --------------------------------------
        // ADVENTURE
        // --------------------------------------

        if (
            t.includes("سفر") ||
            t.includes("ماجراجویی") ||
            t.includes("جنگل") ||
            t.includes("کوه") ||
            t.includes("جزیره")
        ) {
            result.journey = true;
        }


        // --------------------------------------
        // DANGER
        // --------------------------------------

        if (
            t.includes("خطر") ||
            t.includes("دشمن") ||
            t.includes("جنگ") ||
            t.includes("فرار")
        ) {
            result.danger = true;
        }


        return result;

    }


    // ==========================================
    // STORY ARCHETYPES
    // ==========================================

    function royalStory(info, level, length) {

        const hero = info.protagonist === "a young man"
            ? "a young man named Leo"
            : "a young person named Leo";

        const heroine = info.companion || "a kind young woman named Sophia";

        const paragraphs = [

            `${hero} lived a quiet life far from the royal palace. He had never imagined that his future would be connected to a kingdom.`,

            `One spring morning, he met ${heroine}. She was intelligent, kind, and different from anyone he had ever known. Their first meeting seemed ordinary, but it would change both of their lives.`,

            `As the years passed, they became close. They trusted each other and discovered that they shared the same dreams about the future.`,

            `Eventually, they decided to get married. Their wedding was simple, but it became the beginning of a much greater story.`,

            `${random(levels[level].connectors)}, an old messenger arrived at their home carrying a sealed royal letter.`,

            `The letter revealed a secret that had been hidden for generations. They were connected to an ancient royal family, and the kingdom had no clear heirs.`,

            `At first, they could hardly believe what they had read. They had never wanted power, wealth, or a royal title.`,

            `However, the kingdom was facing a difficult moment. The people needed someone they could trust, and the old royal family had disappeared from public life.`,

            `The couple traveled to the capital and entered the ancient palace together. The great hall was silent as the royal council examined the evidence.`,

            `${random(levels[level].connectors)}, the council discovered that the old documents were genuine. The couple were the rightful heirs to the throne.`,

            `They were given a choice. They could leave the kingdom behind and continue their quiet life, or they could accept the responsibility that had unexpectedly become theirs.`,

            `They chose to stay. They understood that being an heir was not simply about wearing a crown. It meant protecting people, making difficult decisions, and accepting responsibility for the future.`,

            `${random(levels[level].connectors)}, the kingdom began to change. The people slowly accepted their new rulers, not because of their titles, but because of the way they treated others.`,

            random(levels[level].endings)

        ];

        return paragraphs.slice(0, lengthCount(length));

    }


    // ==========================================
    // BEAR STORY
    // ==========================================

    function bearStory(level, length) {

        const name = random(names);

        const paragraphs = [

            `${name} was an ordinary young person living near a quiet forest.`,

            `One morning, ${name} woke up and discovered something impossible. His body had changed, and he had become a bear.`,

            `${random(levels[level].connectors)}, ${name} looked into a mirror and could hardly believe what he saw.`,

            `He left the house and entered the forest, hoping to find an answer.`,

            `Deep among the trees, ${name} discovered an old stone covered with strange symbols.`,

            `${random(levels[level].connectors)}, a mysterious traveler appeared and explained that the transformation was connected to an ancient secret.`,

            `${name} realized that returning to normal would require courage and patience.`,

            `After following the clues, ${name} discovered the truth and finally found a way to break the strange spell.`,

            random(levels[level].endings)

        ];

        return paragraphs.slice(0, lengthCount(length));

    }


    // ==========================================
    // GENERAL STORY
    // ==========================================

    function generalStory(info, genre, level, length) {

        const data = genres[genre] || genres.Custom;

        const name = random(names);
        const place = random(data.places);
        const object = random(data.objects);

        const paragraphs = [

            `${name} lived in ${place}, where life was usually calm and predictable.`,

            `One day, something unexpected happened and changed the direction of ${name}'s life.`,

            `${random(levels[level].connectors)}, ${name} discovered ${object}. At first, it seemed completely ordinary.`,

            `However, there was something unusual about it. The more ${name} examined it, the more questions appeared.`,

            `${random(levels[level].connectors)}, ${name} decided to search for answers instead of ignoring the strange discovery.`,

            `The journey was more difficult than expected. Every new clue revealed another part of the story.`,

            `Eventually, ${name} realized that the event was connected to a much larger secret.`,

            `${random(levels[level].connectors)}, ${name} finally decided to face the situation directly.`,

            `The final answer was not exactly what ${name} had expected, but it changed everything.`,

            random(levels[level].endings)

        ];

        return paragraphs.slice(0, lengthCount(length));

    }


    // ==========================================
    // LENGTH
    // ==========================================

    function lengthCount(length) {

        if (length === "short") return 5;

        if (length === "medium") return 8;

        return 14;

    }


    // ==========================================
    // TITLE
    // ==========================================

    function createTitle(info, genre) {

        if (info.inheritance && info.marriage) {
            return "The Unexpected Heirs";
        }

        if (info.type === "bear") {
            return "The Boy Who Became a Bear";
        }

        if (info.type === "wolf") {
            return "The Wolf in the Forest";
        }

        if (info.type === "cat") {
            return "The Mysterious Cat";
        }

        if (info.type === "dog") {
            return "The Mysterious Dog";
        }

        const titles = {

            Fantasy: "The Secret Beyond the Kingdom",
            Mystery: "The Hidden Secret",
            Adventure: "The Journey Beyond the Unknown",
            Horror: "The Secret in the Darkness",
            Crime: "The Missing Evidence",
            Drama: "The Day Everything Changed",
            Comedy: "The Most Unexpected Day",
            Romance: "A Story of Two Hearts",
            "Science Fiction": "The Signal from Beyond",
            Historical: "The Secret of the Kingdom",
            Custom: "The Unexpected Story"

        };

        return titles[genre] || "The Unexpected Story";

    }


    // ==========================================
    // GENERATOR
    // ==========================================

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

        const info = understandTopic(topic);

        let paragraphs;


        // --------------------------------------
        // SPECIAL STORY: ROYAL + MARRIAGE
        // --------------------------------------

        if (
            info.marriage &&
            info.inheritance &&
            info.kingdom
        ) {

            paragraphs = royalStory(
                info,
                selectedLevel,
                length
            );

        }


        // --------------------------------------
        // SPECIAL STORY: BEAR
        // --------------------------------------

        else if (info.type === "bear") {

            paragraphs = bearStory(
                selectedLevel,
                length
            );

        }


        // --------------------------------------
        // GENERAL
        // --------------------------------------

        else {

            paragraphs = generalStory(
                info,
                genre,
                selectedLevel,
                length
            );

        }


        const title = createTitle(
            info,
            genre
        );


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
                        p => `<p>${escapeHTML(p)}</p>`
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


    // ==========================================
    // LEVEL BUTTONS
    // ==========================================

    levelButtons.forEach(button => {

        button.addEventListener("click", () => {

            levelButtons.forEach(btn => {
                btn.classList.remove("active");
            });

            button.classList.add("active");

            selectedLevel = button.dataset.level;

        });

    });


    // ==========================================
    // GENERATE
    // ==========================================

    generateButton.addEventListener(
        "click",
        generateStory
    );


    // ==========================================
    // PUBLIC API
    // ==========================================

    window.RangoStoryEngine = {

        generate: generateStory,

        version: "4.0.0"

    };

})();
