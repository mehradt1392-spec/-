// ==========================================
// RENGO — STORY ENGINE v5
// Complete endings + level-aware stories
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
    // LEVELS
    // ==========================================

    const levelData = {

        A1: {
            connectors: ["Then", "But", "So", "After that"],
            style: "simple",
            endings: [
                "In the end, everything was safe.",
                "Finally, he was happy to be home.",
                "From that day on, his life was different."
            ]
        },

        A2: {
            connectors: ["Then", "However", "After that", "Because of this"],
            style: "simple",
            endings: [
                "In the end, he understood what had happened.",
                "Finally, the problem was solved.",
                "From that day on, he never forgot his strange adventure."
            ]
        },

        B1: {
            connectors: ["Meanwhile", "However", "A few minutes later", "Because of this"],
            style: "natural",
            endings: [
                "In the end, he understood the lesson behind his strange experience.",
                "After that day, he never looked at the forest in the same way.",
                "Eventually, everything returned to normal, but the memory stayed with him."
            ]
        },

        B2: {
            connectors: ["Meanwhile", "Nevertheless", "As a result", "A moment later"],
            style: "detailed",
            endings: [
                "In the end, the experience changed the way he understood himself and the world around him.",
                "From that moment forward, he knew that some experiences could change a person forever.",
                "Eventually, the truth became clear, and he finally understood why the transformation had happened."
            ]
        },

        C1: {
            connectors: ["Meanwhile", "Nevertheless", "Consequently", "Without warning"],
            style: "advanced",
            endings: [
                "In the end, the experience became a turning point that permanently changed his understanding of himself.",
                "From that moment onward, he understood that the strange event had been a lesson rather than a curse.",
                "Eventually, the truth emerged, leaving him with a new understanding of courage, identity, and choice."
            ]
        },

        C2: {
            connectors: ["Meanwhile", "Nevertheless", "Consequently", "Unexpectedly"],
            style: "literary",
            endings: [
                "In the end, the transformation became a defining moment that permanently altered his understanding of identity and freedom.",
                "From that moment onward, he no longer saw the experience as a curse, but as a strange chapter in the story of his life.",
                "Eventually, the truth revealed itself, carrying a meaning far deeper than he had initially imagined."
            ]
        }

    };


    // ==========================================
    // NAMES
    // ==========================================

    const names = [
        "Leo",
        "Noah",
        "Ethan",
        "Oliver",
        "Daniel",
        "Liam",
        "Mia",
        "Emma",
        "Zara",
        "Ivy"
    ];


    // ==========================================
    // GENRES
    // ==========================================

    const genreData = {

        Fantasy: {
            places: [
                "a quiet village beside a silver lake",
                "an ancient kingdom",
                "a mysterious forest",
                "a small village near an old castle"
            ],
            objects: [
                "an ancient stone",
                "a mysterious book",
                "a silver key",
                "a strange golden ring"
            ]
        },

        Mystery: {
            places: [
                "a quiet town",
                "an old mansion",
                "a small hotel",
                "a forgotten neighborhood"
            ],
            objects: [
                "an old photograph",
                "a locked box",
                "a mysterious letter",
                "a broken watch"
            ]
        },

        Adventure: {
            places: [
                "a remote island",
                "a huge mountain",
                "a forgotten valley",
                "a dangerous forest"
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
                "a locked wooden box"
            ]
        },

        Crime: {
            places: [
                "a busy city",
                "a quiet neighborhood",
                "an old warehouse",
                "a police station"
            ],
            objects: [
                "a missing file",
                "a secret note",
                "an old photograph",
                "a broken watch"
            ]
        },

        Drama: {
            places: [
                "a small town",
                "a family home",
                "a quiet village",
                "a busy city"
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
                "a strange hat",
                "an old bicycle",
                "a giant sandwich"
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
                "an ancient kingdom"
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
                "a small village",
                "a large city",
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
    // HELPERS
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
    // TOPIC ANALYSIS
    // ==========================================

    function analyzeTopic(topic) {

        const t = normalize(topic);

        const info = {

            protagonist: "a young person",

            companion: null,

            bear: false,

            marriage: false,

            inheritance: false,

            kingdom: false,

            mystery: false,

            journey: false,

            danger: false

        };


        if (
            t.includes("پسر") ||
            t.includes("جوان")
        ) {
            info.protagonist = "a young man";
        }


        if (
            t.includes("دختر") ||
            t.includes("زن")
        ) {
            info.companion = "a young woman";
        }


        if (
            t.includes("خرس") ||
            t.includes("bear")
        ) {
            info.bear = true;
        }


        if (
            t.includes("ازدواج") ||
            t.includes("ازدواج می") ||
            t.includes("ازدواج کرد") ||
            t.includes("عروسی")
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
            t.includes("سفر") ||
            t.includes("جنگل") ||
            t.includes("کوه") ||
            t.includes("جزیره") ||
            t.includes("ماجراجویی")
        ) {
            info.journey = true;
        }


        if (
            t.includes("خطر") ||
            t.includes("دشمن") ||
            t.includes("جنگ") ||
            t.includes("فرار")
        ) {
            info.danger = true;
        }


        return info;

    }


    // ==========================================
    // LENGTH
    // ==========================================

    function getLength(length) {

        if (length === "short") {
            return {
                opening: 1,
                development: 2,
                climax: 1,
                ending: 1
            };
        }

        if (length === "medium") {
            return {
                opening: 2,
                development: 4,
                climax: 2,
                ending: 2
            };
        }

        return {
            opening: 3,
            development: 7,
            climax: 3,
            ending: 2
        };

    }


    // ==========================================
    // BEAR STORY
    // ==========================================

    function createBearStory(level, length) {

        const name = random(names);
        const style = levelData[level];
        const count = getLength(length);

        const story = [];


        // OPENING

        story.push(
            `${name} was an ordinary young man who lived near a quiet forest. One morning, he woke up and discovered something impossible: he had turned into a bear.`
        );


        if (count.opening > 1) {

            story.push(
                `At first, ${name} could not understand what had happened. He looked at his reflection and realized that his entire body had changed.`
            );

        }


        // DEVELOPMENT

        story.push(
            `${random(style.connectors)}, ${name} left his home and entered the forest, hoping to find an explanation.`
        );


        if (count.development > 1) {

            story.push(
                `Deep among the trees, he discovered an ancient stone covered with strange symbols.`
            );

        }


        if (count.development > 2) {

            story.push(
                `The symbols seemed to tell the story of an old spell that could transform a person into an animal.`
            );

        }


        if (count.development > 3) {

            story.push(
                `${random(style.connectors)}, an old traveler appeared and told ${name} that the transformation had a purpose.`
            );

        }


        if (count.development > 4) {

            story.push(
                `According to the traveler, ${name} could return to normal only if he faced the fear that had been controlling his life.`
            );

        }


        if (count.development > 5) {

            story.push(
                `${name} realized that he had spent years avoiding difficult choices. For the first time, he decided to face his fears instead of running away.`
            );

        }


        if (count.development > 6) {

            story.push(
                `He touched the ancient stone and promised himself that he would no longer let fear decide his future.`
            );

        }


        // CLIMAX

        story.push(
            `${random(style.connectors)}, the strange symbols began to glow. The forest became completely silent, and the spell finally began to disappear.`
        );


        if (count.climax > 1) {

            story.push(
                `${name} slowly returned to his human form. He understood that the transformation had never been only about becoming a bear; it had forced him to become braver.`
            );

        }


        if (count.climax > 2) {

            story.push(
                `When the sun rose above the trees, ${name} walked home with a completely different view of his life.`
            );

        }


        // ENDING — ALWAYS INCLUDED

        story.push(
            random(style.endings)
        );


        return story;

    }


    // ==========================================
    // ROYAL LOVE STORY
    // ==========================================

    function createRoyalStory(level, length) {

        const style = levelData[level];
        const count = getLength(length);

        const story = [];


        // OPENING

        story.push(
            `Leo was a young man who lived far from the royal palace. He had never imagined that one day he would become part of the history of a kingdom.`
        );


        story.push(
            `One day, he met Sophia, a kind and intelligent young woman. Their friendship slowly became something deeper, and they began to imagine a future together.`
        );


        // DEVELOPMENT

        story.push(
            `${random(style.connectors)}, they decided to get married and build a quiet life together.`
        );


        story.push(
            `Their peaceful life changed when an old messenger arrived with a sealed royal letter.`
        );


        if (count.development > 2) {

            story.push(
                `The letter contained a secret that had been hidden for generations. Both Leo and Sophia were connected to an ancient royal family.`
            );

        }


        if (count.development > 3) {

            story.push(
                `At first, they believed the letter was a mistake. They had never lived like royalty and had never expected to inherit a kingdom.`
            );

        }


        if (count.development > 4) {

            story.push(
                `${random(style.connectors)}, they traveled to the royal capital to meet the council and discover the truth.`
            );

        }


        if (count.development > 5) {

            story.push(
                `Inside the ancient palace, the council showed them old documents proving that they were the rightful heirs to the throne.`
            );

        }


        if (count.development > 6) {

            story.push(
                `The discovery created a difficult choice. They could return to their peaceful life, or accept the responsibility of becoming the new heirs of the kingdom.`
            );

        }


        // CLIMAX

        story.push(
            `After a long discussion, they chose to accept the responsibility. They understood that wearing a crown was not about wealth or power, but about protecting the people who depended on them.`
        );


        if (count.climax > 1) {

            story.push(
                `${random(style.connectors)}, they stood before the people of the kingdom and promised to rule with fairness and courage.`
            );

        }


        if (count.climax > 2) {

            story.push(
                `The people welcomed them, and the ancient kingdom finally had new heirs who cared more about its future than their own comfort.`
            );

        }


        // ENDING

        story.push(
            `Years later, Leo and Sophia looked back on the day they had met and realized how unexpectedly their lives had changed. They had begun as two ordinary people, but together they had become the hope of an entire kingdom.`
        );


        story.push(
            random(style.endings)
        );


        return story;

    }


    // ==========================================
    // GENERAL STORY
    // ==========================================

    function createGeneralStory(level, genre, length) {

        const style = levelData[level];
        const data = genreData[genre] || genreData.Custom;
        const name = random(names);
        const place = random(data.places);
        const object = random(data.objects);
        const count = getLength(length);

        const story = [];


        story.push(
            `${name} lived in ${place}, where life was usually calm and predictable.`
        );


        if (count.opening > 1) {

            story.push(
                `One day, ${name} discovered ${object}, and immediately felt that something about it was unusual.`
            );

        }


        story.push(
            `${random(style.connectors)}, ${name} decided to find out where it had come from.`
        );


        if (count.development > 1) {

            story.push(
                `The search led ${name} to a place he had never visited before.`
            );

        }


        if (count.development > 2) {

            story.push(
                `There, he discovered a clue that made the situation even more mysterious.`
            );

        }


        if (count.development > 3) {

            story.push(
                `${random(style.connectors)}, ${name} realized that the strange discovery was connected to an old secret.`
            );

        }


        if (count.development > 4) {

            story.push(
                `The closer ${name} came to the truth, the more difficult the journey became.`
            );

        }


        if (count.development > 5) {

            story.push(
                `For a moment, ${name} considered giving up, but he decided to continue.`
            );

        }


        if (count.development > 6) {

            story.push(
                `Eventually, the final clue showed him what had really happened.`
            );

        }


        // CLIMAX

        story.push(
            `${random(style.connectors)}, ${name} faced the main problem and made a difficult decision.`
        );


        if (count.climax > 1) {

            story.push(
                `The decision changed the situation and finally gave ${name} a chance to solve the problem.`
            );

        }


        if (count.climax > 2) {

            story.push(
                `When everything was finally over, ${name} understood why the strange journey had been necessary.`
            );

        }


        // ENDING

        story.push(
            random(style.endings)
        );


        story.push(
            `The memory of that day remained with ${name}, reminding him that even an ordinary life could suddenly become an extraordinary story.`
        );


        return story;

    }


    // ==========================================
    // TITLE
    // ==========================================

    function createTitle(info, genre) {

        if (info.bear) {
            return "The Boy Who Became a Bear";
        }


        if (
            info.marriage &&
            info.inheritance
        ) {
            return "The Unexpected Heirs";
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
    // MAIN GENERATOR
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

        const info = analyzeTopic(topic);

        let paragraphs;


        if (
            info.bear
        ) {

            paragraphs = createBearStory(
                selectedLevel,
                length
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


    // ==========================================
    // LEVEL SELECTION
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
    // GENERATE BUTTON
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

        version: "5.0.0"

    };

})();
