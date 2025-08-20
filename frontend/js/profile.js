
const token = localStorage.getItem("token");

if (!token) {
  window.location.href = "login.html"; 
}

document.addEventListener("DOMContentLoaded", async () => {
  const emailInput = document.getElementById("email");
  const usernameInput = document.getElementById("username");

  let originalEmail = "";
  let originalUsername = "";

  // Fetch current user
  try {
    const res = await axios.get("http://localhost:2005/api/v1/users/me", {
      headers: { Authorization: `Bearer ${token}` }
    });
   
    const user = res.data.user;
    emailInput.value = user.email;
    usernameInput.value = user.username;
    originalEmail = user.email;
    originalUsername = user.username;
  } catch (err) {
    console.error("Error fetching user:", err);
    alert("Failed to load user info");
  }

  // Fetch user's bookings
  try {
    const res = await axios.get("http://localhost:2005/api/v1/bookings/me", {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    
    const bookings = res.data.bookings;
    console.log(bookings);
    
    const today = new Date();

    const upcoming = bookings.filter(b => new Date(b.bookingDate) >= today);
    const past = bookings.filter(b => new Date(b.bookingDate) < today);

    renderTrips("upcoming-trips", upcoming, false);
    renderTrips("past-trips", past, true);
  } catch (error) {
     let msg = "Something went wrong!";

    // Check if server sent a response message
    if (error.response && error.response.data) {
      msg = error.response.data.message || error.response.data.error || msg;
    } else if (error.message) {
      msg = error.message;
    }

    // Show SweetAlert2
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: msg,
      confirmButtonText: "Okay",
      background: "#fff",
      confirmButtonColor: "#d33",
    });
  }

  // Account form submit
  document.getElementById("account-form").addEventListener("submit", async e => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const username = usernameInput.value.trim();

    if (email === originalEmail && username === originalUsername) {
     Swal.fire({
      icon: "warning",
      title: "Oops!",
      text: "you did not change any data",
      confirmButtonText: "Okay",
    });
      return;
    }


      await axios.put("http://localhost:2005/api/v1/users/me/update", { email, username }, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(
        res =>{
           console.log(res);
            originalEmail = email;
            originalUsername = username;
           return res.message
        }
      ).then(message=>{
          Swal.fire({
            icon: "success",
             title: "your Data changed successfully",
             confirmButtonText: "Okay",
       })
    } ).catch(error=>{
        let msg = "Something went wrong!";

    // Check if server sent a response message
    if (error.response && error.response.data) {
      msg = error.response.data.message || error.response.data.error || msg;
    } else if (error.message) {
      msg = error.message;
    }

    // Show SweetAlert2
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: msg,
      confirmButtonText: "Okay",
      background: "#fff",
      confirmButtonColor: "#d33",
    });
       })
  });

  // Password form submit
  document.getElementById("password-form").addEventListener("submit", async e => {
    e.preventDefault();
    const currentPassword = document.getElementById("current-password").value.trim();
    const newPassword = document.getElementById("new-password").value.trim();

    if (!currentPassword || !newPassword) {
      alert("Please fill in both fields");
      return;
    }

    try {
      await axios.patch(`http://localhost:2005/api/v1/users/me/changePassword`, { currentPassword, newPassword }, {
        headers: { Authorization: `Bearer ${token}` }
      });
       Swal.fire({
            icon: "success",
             title: "your Data changed successfully",
             confirmButtonText: "Okay",
       })
      document.getElementById("password-form").reset();
    } catch (error) {
      let msg = "Something went wrong!";

    // Check if server sent a response message
    if (error.response && error.response.data) {
      msg = error.response.data.message || error.response.data.error || msg;
    } else if (error.message) {
      msg = error.message;
    }

    // Show SweetAlert2
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: msg,
      confirmButtonText: "Okay",
      background: "#fff",
      confirmButtonColor: "#d33",
    });
    }
  });

  // Logout
  document.getElementById("logout-btn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
  });
});



// Renders trips and attaches review/cancel functionality
function renderTrips(containerId, trips, allowReview) {
  const container = document.getElementById(containerId);
  container.innerHTML = "";

  if (!trips.length) {
    container.innerHTML = "<p>No trips found</p>";
    return;
  }

  trips.forEach(trip => {
    const card = document.createElement("div");
    card.className = "trip-card";
    card.innerHTML = `
      <h3>${trip.destination?.title || "Trip"}</h3>
      <p><strong>Date:</strong> ${new Date(trip.bookingDate).toLocaleDateString()}</p>
    `;

    if (allowReview) {
      const reviewBox = document.createElement("div");
      reviewBox.className = "review-box";
      reviewBox.innerHTML = `
        <textarea placeholder="Write your review..."></textarea>
        <button class="btn">Submit Review</button>
      `;
      reviewBox.querySelector("button").addEventListener("click", async () => {
        const review = reviewBox.querySelector("textarea").value.trim();
        if (!review) {
        return Swal.fire({
         icon: "error",
          title: "Oops!",
          text: "review cannot be empty",
          confirmButtonColor: "#d33",
         });
        }
        try {
        const res =  await axios.put(`http://localhost:2005/api/v1/destinations/update/${trip.destination._id}`, { reviews:review }, {
            headers: { Authorization: `Bearer ${token}` }
          });
 Swal.fire({
      icon: "success",
      title: "Thanks for you review!",
      text: res.data.message,
      confirmButtonText: "Okay",
    });
   reviewBox.querySelector("textarea").value = "";
        } catch (error) {
          let msg = "Something went wrong!";
         console.log(error);

    // Check if server sent a response message
    if (error.response && error.response.data) {
      msg = error.response.data.message || error.response.data.error || msg;
    } else if (error.message) {
      msg = error.message;
    }

    // Show SweetAlert2
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: msg,
      confirmButtonText: "Okay",
      background: "#fff",
      confirmButtonColor: "#d33",
    });
        }
      });
      card.appendChild(reviewBox);
    } else {
      const cancelBtn = document.createElement("button");
      cancelBtn.className = "btn btn--danger";
      cancelBtn.textContent = "Cancel Booking";
      cancelBtn.addEventListener("click", async () => {
        if (!confirm("Are you sure you want to cancel this booking?")) return;
        try {
         const res = await axios.delete(`http://localhost:2005/api/v1/bookings/delete/${trip._id}`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          console.log(res);
          Swal.fire({
          icon: "success",
         title: "Canceled!",
          text: res.data.message,
          confirmButtonText: "Okay",
       });
          card.remove();
        } catch (error) {
          let msg = "Something went wrong!";
    // Check if server sent a response message
    if (error.response && error.response.data) {
      msg = error.response.data.message || error.response.data.error || msg;
    } else if (error.message) {
      msg = error.message;
    }

    // Show SweetAlert2
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: msg,
      confirmButtonText: "Okay",
      background: "#fff",
      confirmButtonColor: "#d33",
    });
        }
      });
      card.appendChild(cancelBtn);
    }
    container.appendChild(card);
  });
}