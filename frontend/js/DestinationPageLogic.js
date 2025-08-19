   const destinationData = {
      id: 2,
      img: [
        "happy-couple-taking-selfie-pic-260nw-2390447961.webp",
        "nepal-everest-base-camp-everest-travel-photo-20190128094442660-main-image.jpg"
      ],
      title: "Cairo, Egypt",
      desc: "A city rich in ancient history, home to the Great Pyramids, the Sphinx, and the Nile River. Experience the magic of ancient civilizations while enjoying modern comforts and hospitality.",
      pricePerNight: 850,
      reviews: [
        "The pyramids are absolutely breathtaking! An experience of a lifetime.",
        "Crowded but worth every moment. The history here is incredible.",
        "Amazing guide service and the sunset view from the pyramids is magical."
      ],
      type: "Historical",
      rating: 4.6,
      travlingTips: "Hire a local guide for the best experience and visit early to avoid crowds. Bring plenty of water and wear comfortable shoes for walking on uneven surfaces."
    };

    function renderDestination(data) {
      document.getElementById("destinationTitle").innerText = data.title;

      const mainImage = document.getElementById("mainImage");
      const thumbnailsContainer = document.getElementById("thumbnails");
      thumbnailsContainer.innerHTML = "";
      mainImage.src = data.img[0];

      data.img.forEach((src, index) => {
        const img = document.createElement("img");
        img.src = src;
        img.classList.add("thumbnail");
        if (index === 0) img.classList.add("active");

        img.onclick = () => {
          mainImage.src = src;
          document.querySelectorAll(".thumbnail").forEach(t => t.classList.remove("active"));
          img.classList.add("active");
        };

        thumbnailsContainer.appendChild(img);
      });

      document.getElementById("rating").innerHTML =
        "★".repeat(Math.floor(data.rating)) + " " + data.rating;

      document.getElementById("type").innerText = data.type;

      document.getElementById("price").innerText = `$${data.pricePerNight}`;

      document.getElementById("desc").innerText = data.desc;

      document.getElementById("tips").innerText = data.travlingTips;

      const reviewsContainer = document.getElementById("reviews");
      reviewsContainer.innerHTML = "";
      data.reviews.forEach(review => {
        const div = document.createElement("div");
        div.classList.add("review-item");
        div.innerHTML = `<p>${review}</p>`;
        reviewsContainer.appendChild(div);
      });
    }

    renderDestination(destinationData);

    document.addEventListener("DOMContentLoaded", () => {
      const bookNowBtn = document.getElementById("bookNowBtn");

      if (bookNowBtn) {
        bookNowBtn.addEventListener("click", () => {
          bookNowBtn.innerHTML = '<span class="loading"></span> Booking...';
          
          setTimeout(() => {
            bookNowBtn.innerHTML = 'Book Now';
            alert("Booking initiated! Redirecting to payment...");
          }, 2000);
        });
      }
    });

    // API call 
    /*
    fetch("http://localhost:2005/api/v1/destinations/68a2e5f26c6c18a8a1668992")
      .then(res => res.json())
      .then(data => {
        console.log(data);
        enderDestination(data);
      })
      .catch(err => console.error(err));
    */

    document.documentElement.style.scrollBehavior = 'smooth';
