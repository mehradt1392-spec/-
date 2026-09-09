// ===============================
// RENGO - Story Generator
// ===============================

// سطح انتخاب‌شده
let selectedLevel = null;

// دکمه‌های سطح زبان
const levelButtons = document.querySelectorAll(".level");

// انتخاب سطح زبان
levelButtons.forEach((button) => {
    button.addEventListener("click", () => {

        // حذف حالت انتخاب از همه دکمه‌ها
        levelButtons.forEach((btn) => {
            btn.classList.remove("selected");
        });

        // انتخاب دکمه فعلی
        button.classList.add("selected");

        // ذخیره سطح
        selectedLevel = button.dataset.level;
    });
});


// عناصر صفحه
const genre = document.getElementById("genre");
const topic = document.getElementById("topic");
const length = document.getElementById("length");

const generateButton = document.getElementById("generateButton");

const storyResult = document.getElementById("storyResult");
const storyText = document.getElementById("storyText");


// ساخت داستان
generateButton.addEventListener("click", () => {

    // بررسی انتخاب سطح
    if (!selectedLevel) {
        alert("لطفاً ابتدا سطح زبانت را انتخاب کن.");
        return;
    }

    // بررسی موضوع
    if (!topic.value.trim()) {
        alert("لطفاً موضوع داستانت را بنویس.");
        topic.focus();
        return;
    }


    // دریافت اطلاعات
    const selectedGenre = genre.value;
    const selectedTopic = topic.value.trim();
    const selectedLength = length.value;


    // نمایش نتیجه
    storyResult.classList.remove("hidden");


    storyText.innerHTML = `
        <div class="story-info">

            <p>
                <strong>سطح:</strong>
                ${selectedLevel}
            </p>

            <p>
                <strong>ژانر:</strong>
                ${selectedGenre}
            </p>

            <p>
                <strong>طول:</strong>
                ${selectedLength}
            </p>

        </div>

        <hr>

        <h3>✨ داستان در حال آماده‌سازی است...</h3>

        <p>
            موضوع انتخابی تو:
            <strong>${escapeHTML(selectedTopic)}</strong>
        </p>

        <p>
            در مرحله بعد، هوش مصنوعی رنگو به این بخش متصل می‌شود
            و یک داستان انگلیسی متناسب با سطح
            <strong>${selectedLevel}</strong>
            تو تولید می‌کند.
        </p>
    `;


    // رفتن به قسمت داستان
    storyResult.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});


// جلوگیری از ورود HTML خطرناک در موضوع کاربر
function escapeHTML(text) {

    const div = document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}
