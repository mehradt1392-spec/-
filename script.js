// ==========================================
// RENGO — LOCAL STORY ENGINE v3
// No API • No Backend • No API Key
// ==========================================

(() => {

    "use strict";

    // ------------------------------------------
    // STATE
    // ------------------------------------------

    let selectedLevel = null;


    // ------------------------------------------
    // DOM
    // ------------------------------------------

    const levelButtons = document.querySelectorAll(".level");
    const genreSelect = document.getElementById("genre");
    const topicInput = document.getElementById("topic");
    const lengthSelect = document.getElementById("length");
    const generateButton = document.getElementById("generateButton");
    const storyResult = document.getElementById("storyResult");
    const storyText = document.getElementById("storyText");


    // ------------------------------------------
    // DATA
    // ------------------------------------------

    const names = [
        "Mia",
        "Leo",
        "Noah",
        "Emma",
        "Liam",
        "Zara",
        "Ethan",
        "Ivy",
        "Owen",
        "Lina"
    ];


    const genreData = {

        Fantasy: {
            places: [
                "an ancient kingdom",
                "a forgotten castle",
                "a magical forest",
                "a village beside a silver lake"
            ],

            objects: [
                "an old golden key",
                "a mysterious map",
                "a strange blue stone",
                "an ancient book"
            ],

            problems: [
                "an old secret was waking up",
                "someone had disappeared",
                "a dangerous force was growing",
                "the kingdom was in serious danger"
            ]
        },


        Mystery: {
            places: [
                "a quiet town",
                "an old house",
                "a small hotel",
                "a dark street"
            ],

            objects: [
                "a locked box",
                "an old photograph",
                "a mysterious letter",
                "a broken watch"
            ],

            problems: [
                "someone had left without a trace",
                "a strange message had appeared",
                "an important object had disappeared",
                "nobody could explain what had happened"
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
                "a small backpack",
                "a golden coin"
            ],

            problems: [
                "the path ahead was unknown",
                "a storm was coming",
                "they had lost their way",
                "someone needed their help"
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
            ],

            problems: [
                "something strange was moving in the darkness",
                "someone was watching from the shadows",
                "the house seemed to hide a secret",
                "nobody could explain the strange sounds"
            ]
        },


        Crime: {
            places: [
                "a busy city",
                "a quiet neighborhood",
                "an old warehouse",
                "a small police station"
            ],

            objects: [
                "a missing file",
                "an old photograph",
                "a strange note",
                "a broken watch"
            ],

            problems: [
                "an important person had disappeared",
                "a valuable object had been stolen",
                "the evidence did not make sense",
                "someone was hiding the truth"
            ]
        },


        Drama: {
            places: [
                "a small town",
                "a family home",
                "a busy city",
                "a quiet seaside village"
            ],

            objects: [
                "an old photograph",
                "a family letter",
                "a small suitcase",
                "an old diary"
            ],

            problems: [
                "the family had to make a difficult choice",
                "someone was hiding an important truth",
                "the past had returned",
                "their lives were about to change"
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
            ],

            problems: [
                "everything went wrong",
                "nobody understood what was happening",
                "a simple plan became a disaster",
                "someone had made a very funny mistake"
            ]
        },


        Romance: {
            places: [
                "a quiet town",
                "a small café",
                "a beautiful seaside village",
                "a busy city park"
            ],

            objects: [
                "an old photograph",
                "a handwritten letter",
                "a small gift",
                "an old book"
            ],

            problems: [
                "two people had to understand their feelings",
                "the past was making things difficult",
                "someone was afraid to tell the truth",
                "an important decision had to be made"
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
            ],

            problems: [
                "the machine had stopped working",
                "the system had detected something unknown",
                "someone had disappeared",
                "an unexpected signal had arrived"
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
                "an ancient letter",
                "a royal crown",
                "an old sword",
                "a sealed document"
            ],

            problems: [
                "the kingdom was facing a difficult time",
                "someone wanted to take the throne",
                "an important secret had been discovered",
                "the future of the kingdom was uncertain"
            ]
        },


        Custom: {
            places: [
                "a quiet town",
                "a large city",
                "a small village",
                "a place nobody knew well"
            ],

            objects: [
                "an old object",
                "a strange letter",
                "a mysterious box",
                "a forgotten photograph"
            ],

            problems: [
                "something unexpected happened",
                "someone discovered a strange secret",
                "everything suddenly changed",
                "nobody knew what would happen next"
            ]
        }

    };


    // ------------------------------------------
    // LEVEL SETTINGS
    // ------------------------------------------

    const levelData = {

        A1: {
            sentence: "short and simple",
            connectors: ["Then", "But", "So", "After that"],
            endings: [
                "In the end, everything was okay.",
                "At the end of the day, they were happy.",
                "From that day on, life was different."
            ]
        },


        A2: {
            sentence: "simple and clear",
            connectors: ["Then", "However", "After that", "Because of this"],
            endings: [
                "In the end, they understood what had happened.",
                "From that day on, they never forgot the experience.",
                "Finally, everything became clear."
            ]
        },


        B1: {
            sentence: "natural and moderately detailed",
            connectors: ["Meanwhile", "However", "A few minutes later", "Because of this"],
            endings: [
                "In the end, the experience changed the way they saw the world.",
                "After that day, nothing felt quite the same.",
                "Eventually, they understood the real meaning of what had happened."
            ]
        },


        B2: {
            sentence: "detailed and varied",
            connectors: ["Meanwhile", "Nevertheless", "As a result", "A moment later"],
            endings: [
                "In the end, the experience left a lasting impression on everyone involved.",
                "From that moment forward, they knew that their lives had changed.",
                "Eventually, the truth became impossible to ignore."
            ]
        },


        C1: {
            sentence: "rich, precise and sophisticated",
            connectors: ["Meanwhile", "Nevertheless", "Consequently", "Without warning"],
            endings: [
                "In the end, the experience revealed something none of them had expected.",
                "From that moment onward, they understood that the past could never simply be forgotten.",
                "Eventually, the truth emerged, although it was far more complicated than anyone had imagined."
            ]
        },


        C2: {
            sentence: "highly developed and literary",
            connectors: ["Meanwhile", "Nevertheless", "Consequently", "Unexpectedly"],
            endings: [
                "In the end, the experience became a turning point that permanently altered their understanding of the world.",
                "From that moment onward, nothing could return to the way it had been before.",
                "Eventually, the truth surfaced, carrying consequences far beyond anything they had originally anticipated."
            ]
        }

    };


    // ------------------------------------------
    // UTILITIES
    // ------------------------------------------

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


    function cleanTopic(text) {

        return String(text || "")
            .trim()
            .replace(/\s+/g, " ");

    }


    function capitalize(text) {

        if (!text) return "";

        return text.charAt(0).toUpperCase() + text.slice(1);

    }


    // ------------------------------------------
    // TOPIC ANALYSIS
    // ------------------------------------------

    function analyzeTopic(topic) {

        const t = topic.toLowerCase();


        if (
            t.includes("خرس") ||
            t.includes("bear")
        ) {
            return {
                type: "bear",
                character: "a boy",
                event: "turned into a bear"
            };
        }


        if (
            t.includes("گرگ") ||
            t.includes("wolf")
        ) {
            return {
                type: "wolf",
                character: "a young person",
                event: "met a mysterious wolf"
            };
        }


        if (
            t.includes("گربه") ||
            t.includes("cat")
        ) {
            return {
                type: "cat",
                character: "a young person",
                event: "discovered a mysterious cat"
            };
        }


        if (
            t.includes("سگ") ||
            t.includes("dog")
        ) {
            return {
                type: "dog",
                character: "a young person",
                event: "found a mysterious dog"
            };
        }


        return {
            type: "general",
            character: "a young person",
            event: "experienced something unexpected"
        };

    }


    // ------------------------------------------
    // TOPIC → ENGLISH IDEA
    // ------------------------------------------

    function topicToEnglish(topic, analysis) {

        if (analysis.type === "bear") {

            return "A boy who suddenly turned into a bear";

        }


        if (analysis.type === "wolf") {

            return "A young person who met a mysterious wolf";

        }


        if (analysis.type === "cat") {

            return "A young person who discovered a mysterious cat";

        }


        if (analysis.type === "dog") {

            return "A young person who found a mysterious dog";

        }


        /*
         * For completely free topics, we do not pretend
         * that the browser can translate Persian perfectly.
         *
         * Instead, we safely use the user's topic as the
         * story concept and build an English narrative around it.
         */

        return "A story inspired by this idea: " + topic;

    }


    // ------------------------------------------
    // STORY BUILDERS
    // ------------------------------------------

    function buildBearStory(level, length, genre) {

        const name = random(names);

        const place = random(
            genreData[genre]?.places || genreData.Custom.places
        );

        const paragraphs = [];


        paragraphs.push(
            `${name} lived near ${place}. One morning, something completely unexpected happened. ${name} woke up and discovered that he had turned into a bear.`
        );


        paragraphs.push(
            `${random(levelData[level].connectors)}, ${name} looked around the room in confusion. His hands were gone, and his body had changed. He was frightened, but he tried to stay calm.`
        );


        paragraphs.push(
            `At first, ${name} did not know what to do. He slowly left the house and walked toward the edge of the forest.`
        );


        paragraphs.push(
            `There, ${name} discovered that being a bear had changed the way he experienced the world. He could hear distant sounds and notice things he had never noticed before.`
        );


        paragraphs.push(
            `${random(levelData[level].connectors)}, ${name} met an old traveler who seemed to understand what had happened. The traveler told him that the transformation was connected to an old secret.`
        );


        paragraphs.push(
            `The secret was not simple. ${name} had to make a difficult choice before he could return to his normal life.`
        );


        paragraphs.push(
            `After thinking carefully, ${name} decided to face the problem instead of running away.`
        );


        paragraphs.push(
            `${random(levelData[level].connectors)}, the strange transformation began to disappear. ${name} slowly became human again, but the experience had changed him forever.`
        );


        paragraphs.push(
            random(levelData[level].endings)
        );


        return paragraphs;

    }


    function buildGeneralStory(level, genre, topic) {

        const data = genreData[genre] || genreData.Custom;

        const name = random(names);
        const place = random(data.places);
        const object = random(data.objects);
        const problem = random(data.problems);

        const idea = topicToEnglish(
            topic,
            analyzeTopic(topic)
        );


        const paragraphs = [];


        paragraphs.push(
            `${name} lived in ${place}. One ordinary day, an unusual idea changed everything. ${idea}.`
        );


        paragraphs.push(
            `${random(levelData[level].connectors)}, ${name} decided to find out what was really happening. The first thing ${name} noticed was ${object}.`
        );


        paragraphs.push(
            `${name} picked it up and looked at it carefully. Something about it seemed important, although ${name} could not explain why.`
        );


        paragraphs.push(
            `${random(levelData[level].connectors)}, ${name} discovered that ${problem}. This was the moment when the ordinary day became something completely different.`
        );


        paragraphs.push(
            `${name} knew that ignoring the situation would not solve anything. So ${name} began looking for answers.`
        );


        paragraphs.push(
            `The search was not easy. Every answer seemed to create another question, and the truth remained just out of reach.`
        );


        paragraphs.push(
            `${random(levelData[level].connectors)}, ${name} finally discovered an important clue connected to ${object}.`
        );


        paragraphs.push(
            `For the first time, the situation began to make sense. ${name} understood that the strange event had not happened by accident.`
        );


        paragraphs.push(
            `After considering the possibilities, ${name} made a decision and faced the problem directly.`
        );


        paragraphs.push(
            `${random(levelData[level].connectors)}, everything changed. The mystery, challenge, or conflict finally began to move toward a solution.`
        );


        paragraphs.push(
            random(levelData[level].endings)
        );


        return paragraphs;

    }


    // ------------------------------------------
    // TITLE
    // ------------------------------------------

    function makeTitle(topic, genre, analysis) {

        if (analysis.type === "bear") {

            return "The Boy Who Became a Bear";

        }


        if (analysis.type === "wolf") {

            return "The Mystery of the Wolf";

        }


        if (analysis.type === "cat") {

            return "The Mysterious Cat";

        }


        if (analysis.type === "dog") {

            return "The Mysterious Dog";

        }


        const titles = {

            Fantasy: "The Secret Beyond the Kingdom",
            Mystery: "The Mystery of the Hidden Clue",
            Adventure: "The Journey Beyond the Unknown",
            Horror: "The Secret in the Darkness",
            Crime: "The Missing Evidence",
            Drama: "The Day Everything Changed",
            Comedy: "The Most Unexpected Day",
            Romance: "A Story That Changed Everything",
            "Science Fiction": "The Signal from Beyond",
            Historical: "The Secret of the Kingdom",
            Custom: "The Unexpected Story"

        };


        return titles[genre] || "The Unexpected Story";

    }


    // ------------------------------------------
    // MAIN GENERATOR
    // ------------------------------------------

    function generateStory() {

        if (!selectedLevel) {

            alert("لطفاً ابتدا سطح زبانت را انتخاب کن.");

            return;

        }


        const genre = genreSelect.value;
        const topic = cleanTopic(topicInput.value);
        const length = lengthSelect.value;


        if (!topic) {

            alert("لطفاً موضوع داستان را بنویس.");

            topicInput.focus();

            return;

        }


        const analysis = analyzeTopic(topic);


        let paragraphs;


        if (analysis.type !== "general") {

            paragraphs = buildBearStory(
                selectedLevel,
                length,
                genre
            );

        } else {

            paragraphs = buildGeneralStory(
                selectedLevel,
                genre,
                topic
            );

        }


        let count;


        if (length === "short") {

            count = 5;

        } else if (length === "medium") {

            count = 8;

        } else {

            count = paragraphs.length;

        }


        paragraphs = paragraphs.slice(0, count);


        const title = makeTitle(
            topic,
            genre,
            analysis
        );


        const html = `

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


        storyText.innerHTML = html;

        storyResult.classList.remove("hidden");

        storyResult.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }


    // ------------------------------------------
    // LEVEL BUTTONS
    // ------------------------------------------

    levelButtons.forEach(button => {

        button.addEventListener("click", () => {

            levelButtons.forEach(btn => {

                btn.classList.remove("active");

            });


            button.classList.add("active");

            selectedLevel = button.dataset.level;

        });

    });


    // ------------------------------------------
    // GENERATE BUTTON
    // ------------------------------------------

    generateButton.addEventListener(
        "click",
        generateStory
    );


    // ------------------------------------------
    // ENTER SHORTCUT
    // ------------------------------------------

    topicInput.addEventListener(
        "keydown",
        event => {

            if (
                (event.ctrlKey || event.metaKey) &&
                event.key === "Enter"
            ) {

                generateStory();

            }

        }
    );


    // ------------------------------------------
    // PUBLIC API
    // ------------------------------------------

    window.RangoStoryEngine = {

        generate: generateStory,

        version: "3.0.0"

    };


})();
