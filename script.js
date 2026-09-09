/* =========================================================
   RENGO — LOCAL STORY ENGINE
   No API • No Backend • No API Key
   ========================================================= */

(() => {
  "use strict";

  let selectedLevel = null;

  const levels = document.querySelectorAll(".level");
  const genreEl = document.getElementById("genre");
  const topicEl = document.getElementById("topic");
  const lengthEl = document.getElementById("length");
  const generateButton = document.getElementById("generateButton");
  const storyResult = document.getElementById("storyResult");
  const storyText = document.getElementById("storyText");

  /* =========================
     BASIC DATA
     ========================= */

  const names = [
    ["Mia", "she", "her"],
    ["Leo", "he", "his"],
    ["Zara", "she", "her"],
    ["Noah", "he", "his"],
    ["Ivy", "she", "her"],
    ["Kai", "he", "his"],
    ["Elena", "she", "her"],
    ["Owen", "he", "his"]
  ];

  const genres = {

    Fantasy: {
      places: [
        "an enchanted forest",
        "a floating castle",
        "a forgotten village",
        "a hidden valley"
      ],
      characters: [
        "a mysterious wizard",
        "an old guardian",
        "a talking fox",
        "a young magician"
      ],
      objects: [
        "an enchanted key",
        "a glowing crystal",
        "an ancient book",
        "a silver amulet"
      ],
      problems: [
        "a forgotten spell",
        "a broken magical seal",
        "a dangerous creature",
        "an ancient prophecy"
      ]
    },

    Mystery: {
      places: [
        "a quiet town",
        "an old library",
        "a foggy street",
        "a locked mansion"
      ],
      characters: [
        "a careful detective",
        "a nervous neighbor",
        "a retired officer",
        "a mysterious stranger"
      ],
      objects: [
        "a torn letter",
        "an old photograph",
        "a strange key",
        "a locked box"
      ],
      problems: [
        "a missing person",
        "an unexplained message",
        "a hidden secret",
        "a mysterious disappearance"
      ]
    },

    Adventure: {
      places: [
        "a dense jungle",
        "a wide desert",
        "a hidden island",
        "a dangerous mountain"
      ],
      characters: [
        "a brave explorer",
        "a local guide",
        "a skilled climber",
        "a curious traveler"
      ],
      objects: [
        "an old map",
        "a rusty compass",
        "a wooden chest",
        "a mysterious map"
      ],
      problems: [
        "a dangerous river",
        "a sudden storm",
        "a hidden trap",
        "a race against time"
      ]
    },

    Horror: {
      places: [
        "an abandoned house",
        "a dark forest",
        "an empty hotel",
        "a lonely cabin"
      ],
      characters: [
        "a worried caretaker",
        "a strange neighbor",
        "a silent visitor",
        "an old caretaker"
      ],
      objects: [
        "a broken mirror",
        "an old doll",
        "a flickering lamp",
        "a locked door"
      ],
      problems: [
        "a strange sound",
        "a moving shadow",
        "a warning no one believed",
        "a door that kept opening"
      ]
    },

    Crime: {
      places: [
        "a busy city",
        "a quiet office",
        "a small bank",
        "a police station"
      ],
      characters: [
        "a determined investigator",
        "a nervous witness",
        "a careful lawyer",
        "a suspicious clerk"
      ],
      objects: [
        "a security recording",
        "a stolen file",
        "an unmarked envelope",
        "a hidden photograph"
      ],
      problems: [
        "a robbery",
        "a missing amount of money",
        "a silent witness",
        "a case that was not what it seemed"
      ]
    },

    Drama: {
      places: [
        "a family home",
        "a quiet café",
        "a school hallway",
        "a hospital waiting room"
      ],
      characters: [
        "a childhood friend",
        "a worried parent",
        "a wise teacher",
        "a returning sibling"
      ],
      objects: [
        "an old letter",
        "a family photograph",
        "a worn journal",
        "a forgotten gift"
      ],
      problems: [
        "a difficult decision",
        "a painful misunderstanding",
        "a secret finally revealed",
        "a chance to make things right"
      ]
    },

    Comedy: {
      places: [
        "a chaotic kitchen",
        "a crowded bus stop",
        "a small classroom",
        "a messy office"
      ],
      characters: [
        "a clumsy neighbor",
        "an overexcited dog",
        "a forgetful teacher",
        "a talkative coworker"
      ],
      objects: [
        "a squeaky shoe",
        "a cake that would not bake",
        "a lost sock",
        "a phone that would not stop ringing"
      ],
      problems: [
        "a plan that went wrong",
        "a case of mistaken identity",
        "an embarrassing mix-up",
        "a ridiculous surprise"
      ]
    },

    Romance: {
      places: [
        "a small bookshop",
        "a sunny seaside town",
        "a cozy café",
        "a park in autumn"
      ],
      characters: [
        "a shy artist",
        "a cheerful barista",
        "a childhood friend",
        "a new neighbor"
      ],
      objects: [
        "a handwritten note",
        "a favorite book",
        "a small gift",
        "an old photograph"
      ],
      problems: [
        "a misunderstanding",
        "an unexpected meeting",
        "a difficult goodbye",
        "feelings neither person had expressed"
      ]
    },

    "Science Fiction": {
      places: [
        "a space station",
        "a city of the future",
        "a research base on Mars",
        "a laboratory full of machines"
      ],
      characters: [
        "a young engineer",
        "a curious robot",
        "a calm pilot",
        "a brilliant scientist"
      ],
      objects: [
        "a glowing device",
        "an unknown signal",
        "a strange machine",
        "a mysterious data chip"
      ],
      problems: [
        "a signal from deep space",
        "a machine that began to think",
        "a mission that failed",
        "a discovery that changed everything"
      ]
    },

    Historical: {
      places: [
        "a small village long ago",
        "an old trading port",
        "a castle during wartime",
        "a quiet town in another century"
      ],
      characters: [
        "a young apprentice",
        "a traveling merchant",
        "a village elder",
        "a soldier returning home"
      ],
      objects: [
        "an old coin",
        "a leather satchel",
        "a handwritten scroll",
        "a family heirloom"
      ],
      problems: [
        "a war approaching the village",
        "a failed harvest",
        "a dangerous journey",
        "a decision that would change the family"
      ]
    },

    Custom: {
      places: [
        "a quiet town",
        "a strange city",
        "a small village",
        "a place no one expected"
      ],
      characters: [
        "a curious stranger",
        "a close friend",
        "an ordinary person",
        "a mysterious traveler"
      ],
      objects: [
        "a strange object",
        "an old photograph",
        "a mysterious letter",
        "a small box"
      ],
      problems: [
        "an unexpected event",
        "a strange discovery",
        "a difficult decision",
        "a problem no one expected"
      ]
    }
  };

  /* =========================
     LEVEL STYLE
     ========================= */

  const style = {

    A1: {
      sentences: 2,
      connectors: ["and", "but", "so", "then"],
      endings: [
        "In the end, everything was okay.",
        "At last, the problem was over."
      ]
    },

    A2: {
      sentences: 3,
      connectors: ["and", "but", "because", "so", "then"],
      endings: [
        "In the end, the problem was solved.",
        "At last, everything became clear."
      ]
    },

    B1: {
      sentences: 3,
      connectors: ["however", "because", "although", "while"],
      endings: [
        "In the end, the experience changed the way the character saw the world.",
        "The answer was not simple, but it was finally clear."
      ]
    },

    B2: {
      sentences: 4,
      connectors: [
        "nevertheless",
        "although",
        "meanwhile",
        "as a result"
      ],
      endings: [
        "The experience left a lesson that could not easily be forgotten.",
        "What had seemed impossible became the most important truth of the journey."
      ]
    },

    C1: {
      sentences: 4,
      connectors: [
        "nevertheless",
        "consequently",
        "whereas",
        "meanwhile"
      ],
      endings: [
        "The experience ultimately became a turning point that could not be undone.",
        "The resolution offered no simple comfort, but it provided understanding."
      ]
    },

    C2: {
      sentences: 5,
      connectors: [
        "nevertheless",
        "consequently",
        "notwithstanding",
        "meanwhile",
        "despite this"
      ],
      endings: [
        "What began as an inexplicable event ultimately became the defining turning point of the protagonist's life.",
        "The resolution offered neither certainty nor perfect closure, but it revealed what had truly changed."
      ]
    }
  };

  /* =========================
     UTILITIES
     ========================= */

  function random(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  }

  function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function cleanTopic(text) {
    return text
      .trim()
      .replace(/\s+/g, " ")
      .replace(/[.!؟?]+$/g, "");
  }

  /* =========================
     TOPIC INTERPRETER
     ========================= */

  function analyzeTopic(topic) {

    const t = topic.toLowerCase();

    const profile = {
      special: false,
      subject: null,
      event: null,
      object: null
    };

    if (
      t.includes("خرس") ||
      t.includes("bear")
    ) {
      profile.special = true;
      profile.subject = t.includes("دختر") || t.includes("girl")
        ? "girl"
        : "boy";

      profile.object = "bear";

      profile.event =
        "woke up one morning and discovered that the body had changed into a bear";
    }

    else if (
      t.includes("گرگ") ||
      t.includes("wolf")
    ) {
      profile.special = true;
      profile.subject = "person";
      profile.object = "wolf";
      profile.event =
        "woke up and discovered that the body had changed into a wolf";
    }

    else if (
      t.includes("گربه") ||
      t.includes("cat")
    ) {
      profile.special = true;
      profile.subject = "person";
      profile.object = "cat";
      profile.event =
        "woke up and discovered that the body had changed into a cat";
    }

    else if (
      t.includes("سگ") ||
      t.includes("dog")
    ) {
      profile.special = true;
      profile.subject = "person";
      profile.object = "dog";
      profile.event =
        "woke up and discovered that the body had changed into a dog";
    }

    return profile;
  }

  /* =========================
     STORY GENERATOR
     ========================= */

  function generateStory(level, genre, topic, length) {

    const data = genres[genre] || genres.Custom;
    const levelStyle = style[level] || style.B1;

    const person = random(names);

    const ctx = {
      name: person[0],
      pronoun: person[1],
      possessive: person[2],

      place: random(data.places),
      helper: random(data.characters),
      object: random(data.objects),
      problem: random(data.problems)
    };

    const profile = analyzeTopic(topic);

    let paragraphs = [];

    /* ---------- OPENING ---------- */

    if (profile.special && profile.object === "bear") {

      if (level === "A1") {
        paragraphs.push(
          `${ctx.name} lived near ${ctx.place}. One morning, ${ctx.name} woke up and became a bear.`
        );
      }

      else if (level === "A2") {
        paragraphs.push(
          `${ctx.name} lived near ${ctx.place}. One morning, ${ctx.name} woke up and discovered something impossible: ${ctx.name} had become a bear.`
        );
      }

      else if (level === "B1") {
        paragraphs.push(
          `${ctx.name} had always lived an ordinary life near ${ctx.place}, until one morning when ${ctx.name} woke up and discovered that the body had mysteriously changed into a bear.`
        );
      }

      else if (level === "B2") {
        paragraphs.push(
          `${ctx.name} had never imagined that an ordinary morning could transform an entire life, yet that was exactly what happened when ${ctx.name} woke up and discovered that the body had mysteriously become a bear.`
        );
      }

      else {
        paragraphs.push(
          `${ctx.name} had spent years believing that life followed predictable rules, a conviction that collapsed completely on the morning when ${ctx.name} awakened to the inexplicable realization that the body had transformed into a bear.`
        );
      }

    } else {

      if (level === "A1") {
        paragraphs.push(
          `${ctx.name} lived near ${ctx.place}. One day, something strange happened.`
        );
      }

      else if (level === "A2") {
        paragraphs.push(
          `${ctx.name} lived near ${ctx.place}, where life was usually quiet. One day, something unexpected happened.`
        );
      }

      else if (level === "B1") {
        paragraphs.push(
          `${ctx.name} had always thought that life near ${ctx.place} was predictable, until one unusual day changed everything.`
        );
      }

      else if (level === "B2") {
        paragraphs.push(
          `${ctx.name} had spent years believing that ${ctx.place} held no secrets worth discovering, but that comfortable assumption was about to disappear.`
        );
      }

      else {
        paragraphs.push(
          `${ctx.name} had long regarded ${ctx.place} as a place governed by familiar routines, yet that assumption was about to be challenged by an extraordinary discovery.`
        );
      }
    }

    /* ---------- TOPIC ---------- */

    if (!profile.special) {

      if (level === "A1") {
        paragraphs.push(
          `The idea was simple: ${cleanTopic(topic)}.`
        );
      }

      else if (level === "A2") {
        paragraphs.push(
          `Everything changed when ${cleanTopic(topic)}.`
        );
      }

      else if (level === "B1") {
        paragraphs.push(
          `The real story began when ${cleanTopic(topic)}.`
        );
      }

      else if (level === "B2") {
        paragraphs.push(
          `The turning point came when ${cleanTopic(topic)}, creating a situation that nobody had expected.`
        );
      }

      else {
        paragraphs.push(
          `The decisive turning point arrived when ${cleanTopic(topic)}, an event whose consequences would gradually become impossible to ignore.`
        );
      }
    }

    /* ---------- DISCOVERY ---------- */

    if (profile.special) {

      if (level === "A1") {
        paragraphs.push(
          `${ctx.name} was afraid. ${capitalize(ctx.pronoun)} looked at ${ctx.possessive} hands and did not understand what had happened.`
        );
      }

      else if (level === "A2") {
        paragraphs.push(
          `${ctx.name} was scared and confused. ${capitalize(ctx.pronoun)} looked around the room and tried to understand what had happened.`
        );
      }

      else {
        paragraphs.push(
          `${ctx.name} was frightened, but fear was quickly replaced by curiosity. ${capitalize(ctx.pronoun)} examined the new body and tried to understand what had caused the impossible transformation.`
        );
      }

    } else {

      paragraphs.push(
        `${ctx.name} found ${ctx.object}. The object seemed ordinary at first, but something about it felt wrong.`
      );

      paragraphs.push(
        `${ctx.name} decided to investigate because ${ctx.problem}.`
      );
    }

    /* ---------- HELPER ---------- */

    paragraphs.push(
      `Soon, ${ctx.name} met ${ctx.helper}. The stranger seemed to know more than ${ctx.pronoun} wanted to say.`
    );

    /* ---------- CONFLICT ---------- */

    if (profile.special) {

      paragraphs.push(
        `${ctx.name} needed to find a way back to normal. The search led through ${ctx.place}, where every sound seemed important.`
      );

    } else {

      paragraphs.push(
        `The situation became more difficult because ${ctx.problem}. ${ctx.name} knew that simply walking away would not solve anything.`
      );
    }

    /* ---------- RISING ACTION ---------- */

    const connector = random(levelStyle.connectors);

    paragraphs.push(
      `${capitalize(connector)}, ${ctx.name} continued the search. Small details began to connect, and the truth slowly became clearer.`
    );

    if (length !== "short") {

      paragraphs.push(
        `${ctx.name} made a plan and followed it carefully. ${capitalize(ctx.pronoun)} knew that one wrong decision could make everything worse.`
      );

      paragraphs.push(
        `For a moment, ${ctx.name} wanted to give up. ${capitalize(ctx.pronoun)} was tired, confused, and unsure of what would happen next.`
      );
    }

    /* ---------- CLIMAX ---------- */

    if (level === "A1" || level === "A2") {

      paragraphs.push(
        `Then ${ctx.name} faced the problem. ${capitalize(ctx.pronoun)} took a deep breath and made a brave choice.`
      );

    } else if (level === "B1") {

      paragraphs.push(
        `Eventually, ${ctx.name} understood what had to be done. Although the choice was difficult, ${ctx.pronoun} decided not to run away from the problem.`
      );

    } else if (level === "B2") {

      paragraphs.push(
        `Eventually, ${ctx.name} understood that there was no perfect solution. Nevertheless, ${ctx.pronoun} chose the path that offered the best chance of changing the situation.`
      );

    } else {

      paragraphs.push(
        `Eventually, ${ctx.name} recognized that avoiding the problem would only postpone the inevitable. With remarkable determination, ${ctx.pronoun} confronted the situation directly.`
      );
    }

    /* ---------- RESOLUTION ---------- */

    if (profile.special) {

      if (level === "A1") {
        paragraphs.push(
          `${ctx.name} found the answer. The strange change finally ended, and ${ctx.name} returned home.`
        );
      }

      else if (level === "A2") {
        paragraphs.push(
          `${ctx.name} finally found the answer. The strange transformation ended, and ${ctx.name} returned home with a new understanding of life.`
        );
      }

      else {
        paragraphs.push(
          `${ctx.name} eventually discovered the truth behind the transformation. When the strange change finally ended, ${ctx.name} returned home knowing that ordinary life could never be taken for granted again.`
        );
      }

    } else {

      paragraphs.push(
        `${ctx.name} finally discovered the truth behind the mystery. The answer was not what ${ctx.name} had expected.`
      );
    }

    /* ---------- END ---------- */

    paragraphs.push(
      random(levelStyle.endings)
    );

    /* ---------- LENGTH ---------- */

    if (length === "short") {
      paragraphs = paragraphs.slice(0, 5);
    }

    if (length === "medium") {
      paragraphs = paragraphs.slice(0, 8);
    }

    /* long = everything */

    const title = makeTitle(topic, genre, profile);

    return {
      title,
      paragraphs
    };
  }

  /* =========================
     TITLE GENERATOR
     ========================= */

  function makeTitle(topic, genre, profile) {

    if (profile.special && profile.object === "bear") {

      const titles = [
        "The Morning I Became a Bear",
        "The Boy Who Became a Bear",
        "The Bear Inside",
        "A Very Strange Morning",
        "The Day Everything Changed"
      ];

      return random(titles);
    }

    const firstWords = cleanTopic(topic)
      .split(/\s+/)
      .slice(0, 6)
      .join(" ");

    const prefixes = {
      Fantasy: "The Secret of",
      Mystery: "The Mystery of",
      Adventure: "The Journey of",
      Horror: "The Shadow of",
      Crime: "The Case of",
      Drama: "The Story of",
      Comedy: "The Strange Story of",
      Romance: "The Day of",
      "Science Fiction": "The Signal from",
      Historical: "The Secret of",
      Custom: "The Story of"
    };

    return `${prefixes[genre] || "The Story of"} ${capitalize(firstWords)}`;
  }

  /* =========================
     UI
     ========================= */

  levels.forEach(button => {

    button.addEventListener("click", () => {

      levels.forEach(btn => {
        btn.classList.remove("selected");
        btn.setAttribute("aria-pressed", "false");
      });

      button.classList.add("selected");
      button.setAttribute("aria-pressed", "true");

      selectedLevel = button.dataset.level;
    });

  });

  generateButton.addEventListener("click", () => {

    if (!selectedLevel) {
      alert("لطفاً ابتدا سطح زبانت را انتخاب کن.");
      return;
    }

    const topic = topicEl.value.trim();

    if (!topic) {
      alert("لطفاً موضوع داستانت را بنویس.");
      topicEl.focus();
      return;
    }

    const genre = genreEl.value;
    const length = lengthEl.value;

    generateButton.disabled = true;
    generateButton.textContent = "✨ در حال ساخت داستان...";

    setTimeout(() => {

      const result = generateStory(
        selectedLevel,
        genre,
        topic,
        length
      );

      storyResult.classList.remove("hidden");

      storyText.innerHTML = `
        <div class="story-info">
          <span>Level: ${escapeHTML(selectedLevel)}</span>
          <span>Genre: ${escapeHTML(genre)}</span>
        </div>

        <h3 class="story-title">
          ${escapeHTML(result.title)}
        </h3>

        <div class="generated-story">
          ${result.paragraphs
            .map(paragraph => `<p>${escapeHTML(paragraph)}</p>`)
            .join("")}
        </div>
      `;

      generateButton.disabled = false;
      generateButton.textContent = "✨ ساخت داستان";

      storyResult.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }, 350);

  });

  /* =========================
     PUBLIC ENGINE API
     ========================= */

  window.RangoStoryEngine = {
    generate: generateStory
  };

})();
