const searchForm = document.querySelector("#home form");

if (searchForm) {

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const keyword = searchForm.querySelector("input[type='text']").value;
    const location = searchForm.querySelectorAll("input[type='text']")[1].value;

    if (keyword === "" && location === "") {
        alert("Please enter a job title or location.");
        return;
    }

    alert(
        "Searching for jobs..." +
        "\nKeyword: " + keyword +
        "\nLocation: " + location
    );
});



const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        const response = await fetch("http://localhost:3000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                message: message
            })
        });

        const data = await response.json();

        alert(data.message);
        contactForm.reset();

    } catch (error) {
        alert("Something went wrong. Please try again.");
        console.error(error);
    }
});
}