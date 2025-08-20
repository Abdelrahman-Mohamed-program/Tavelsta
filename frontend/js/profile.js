document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("account-form").addEventListener("submit", e => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const username = document.getElementById("username").value;
        const currentPassword = document.getElementById("current-password").value;
        const newPassword = document.getElementById("current-password").value;


        if(!email || !name || (!currentPassword && !newPassword)) return;
        alert(`Saved:\nEmail: ${email}\nUsername: ${username}`);
        
    });

    const upcomingTrips = [
        { title: "Paris Getaway", date: "2025-09-10", details: "5 days, 4 nights" },
        { title: "Safari in Kenya", date: "2025-11-01", details: "7 days adventure" }
    ];

    const pastTrips = [
        { title: "Rome City Tour", date: "2024-12-15", details: "3 days trip" },
        { title: "Bali Vacation", date: "2025-02-20", details: "6 days beach holiday" }
    ];

    renderTrips("upcoming-trips", upcomingTrips, false);
    renderTrips("past-trips", pastTrips, true);

    document.getElementById("logout-btn").addEventListener("click", () => {
        alert("Logged out!");
        localStorage.removeItem('token');
        window.location.href = "login and signup.html";
    });
});

function renderTrips(containerId, trips, allowReview) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    trips.forEach(trip => {
        const card = document.createElement("div");
        card.className = "trip-card";
        card.innerHTML = `
      <h3>${trip.title}</h3>
      <p><strong>Date:</strong> ${trip.date}</p>
      <p>${trip.details}</p>
    `;

        if (allowReview) {
            const reviewBox = document.createElement("div");
            reviewBox.className = "review-box";
            reviewBox.innerHTML = `
        <textarea placeholder="Write your review..."></textarea>
        <button class="btn">Submit Review</button>
      `;
            reviewBox.querySelector("button").addEventListener("click", () => {
                const review = reviewBox.querySelector("textarea").value;
                alert(`Review submitted for ${trip.title}: ${review}`);
            });
            card.appendChild(reviewBox);
        }

        container.appendChild(card);
    });
}
