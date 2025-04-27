// Infinite A-Z Grid Logic (Same as before)
// Opens popup when clicking "G"
document.querySelectorAll(".letter").forEach(letter => {
    if (letter.textContent === "G") {
        letter.addEventListener("click", () => {
            document.getElementById("popup").classList.add("active");
        });
    }
});
