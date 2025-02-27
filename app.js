document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("giphy-form");
    const resultsDiv = document.getElementById("giphy-list");
    const removeBtn = document.querySelector("button[type='button']"); // Select the remove button
    const searchInput = document.getElementById("search"); // Define input field

    form.addEventListener("submit", async function (e) {
        e.preventDefault();
        const searchTerm = searchInput.value;
        const apiKey = "MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym";
        const url = `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=${apiKey}&limit=1`;

        try {
            const response = await axios.get(url);

            if (response.data.data.length > 0) {
                const gifUrl = response.data.data[0].images.fixed_height.url;
                const img = document.createElement("img");
                img.src = gifUrl;
                img.style.margin = "10px";
                resultsDiv.appendChild(img);
            }

        } catch (error) {
            console.error("Error fetching GIF:", error);
        }

        // **Clear input field after search**
        searchInput.value = "";
    });

    // **Move remove button event listener outside the submit event**
    removeBtn.addEventListener("click", function () {
        resultsDiv.innerHTML = ""; // Clears all GIFs from the page
    });
});
