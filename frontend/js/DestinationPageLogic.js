// Dummy data for testing
// Get the query parameters from the URL
const params = new URLSearchParams(window.location.search);

// Retrieve the 'id'
const id = params.get('id');

console.log('Received ID:', id);
let destinationData = {}


document.addEventListener("DOMContentLoaded", () => {
  // Your existing code here
axios.get(`http://localhost:2005/api/v1/destinations/${id}`)
.then(res=>
  res.data
).then(data=>{
  console.log(data );
 destinationData = data.destination 
 renderDestination(destinationData);
}).catch(err=>{
  console.log(err);
  
})
});


const bookNowBtn = document.getElementById("bookNowBtn");
  if (bookNowBtn) {
    bookNowBtn.addEventListener("click", () => {
     window.location.href = `booking.html?id=${encodeURIComponent(id)}`;
    });
  }


function renderDestination(data) {

  document.getElementById("destinationTitle").innerText = data.title;

  const mainImage = document.getElementById("mainImage");
  const thumbnailsContainer = document.getElementById("thumbnails");
  thumbnailsContainer.innerHTML = "";

  
  mainImage.src = data.imgs[0];

  data.imgs.forEach((src, index) => {
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

  document.getElementById("type").innerText = `Type: ${data.type}`;

  document.getElementById("price").innerText = `$${data.pricePerNight}`;

  document.getElementById("desc").innerText = data.desc;

  document.getElementById("tips").innerText = data.travlingTips;

  const tipsContainer = document.getElementById("tips");
    data.travlingTips.forEach(review => {
    const div = document.createElement("div");
    div.classList.add("review-item");
    div.innerHTML = `<p>"${review}"</p>`;
    tipsContainer.appendChild(div);
  });
  const reviewsContainer = document.getElementById("reviews");
  reviewsContainer.innerHTML = "";
  data.reviews.forEach(review => {
    const div = document.createElement("div");
    div.classList.add("review-item");
    div.innerHTML = `<p>"${review}"</p>`;
    reviewsContainer.appendChild(div);
  });
}




// fetch("http://localhost:2005/api/v1/destenations/68a2e5f26c6c18a8a1668993")
//   .then(res => res.json())
//   .then(data => {
//     console.log(data); // test
//     // render to page
//   })
//   .catch(err => console.error(err));
