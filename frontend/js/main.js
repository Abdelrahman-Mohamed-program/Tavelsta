

let destinations = [
  {
    id: 0,
    img: [
      "https://images.unsplash.com/photo-1543340713-1bf75c8a6851",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93"
    ],
    title: "Paris, France",
    desc: "The city of lights, romance, and culture — famous for the Eiffel Tower, art museums, and charming cafes.",
    pricePerNight: 1250,
    reviews: [
      "Absolutely magical experience!",
      "A must-visit city for art and culture lovers."
    ],
    type: "City",
    rating: 4.8,
    travlingTips: "Book Eiffel Tower tickets in advance and explore on foot to truly enjoy the city."
  },
  {
    id: 1,
    img: [
      "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    ],
    title: "Bali, Indonesia",
    desc: "A tropical paradise with stunning beaches, lush rice terraces, and vibrant cultural traditions.",
    pricePerNight: 980,
    reviews: [
      "The beaches are amazing and the locals are super friendly.",
      "Perfect place for a relaxing getaway."
    ],
    type: "Beach",
    rating: 4.7,
    travlingTips: "Visit temples respectfully and try the local street food."
  },
  {
    id: 2,
    img: [
      "https://images.unsplash.com/photo-1584270354949-1c9b9f4fdb04",
      "https://images.unsplash.com/photo-1535920527002-b35e96722b86"
    ],
    title: "Cairo, Egypt",
    desc: "A city rich in ancient history, home to the Great Pyramids, the Sphinx, and the Nile River.",
    pricePerNight: 850,
    reviews: [
      "The pyramids are breathtaking!",
      "Crowded but worth every moment."
    ],
    type: "Historical",
    rating: 4.6,
    travlingTips: "Hire a local guide for the best experience and visit early to avoid crowds."
  },
  {
    id: 3,
    img: [
      "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e",
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c"
    ],
    title: "Rome, Italy",
    desc: "The Eternal City, filled with ancient ruins, world-class art, and mouth-watering cuisine.",
    pricePerNight: 1100,
    reviews: [
      "Walking through history at every turn.",
      "Gelato is a must!"
    ],
    type: "City",
    rating: 4.9,
    travlingTips: "Get skip-the-line tickets for the Colosseum and Vatican."
  },
  {
    id: 4,
    img: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
    ],
    title: "Kyoto, Japan",
    desc: "A serene city famous for traditional temples, cherry blossoms, and historic tea houses.",
    pricePerNight: 1400,
    reviews: [
      "The cherry blossom season is magical.",
      "Such a peaceful and beautiful city."
    ],
    type: "Cultural",
    rating: 4.8,
    travlingTips: "Rent a kimono for a day and explore the historic streets."
  }
];

let bookings = [{id:0,destinationID:0,dateOfBooking:Date.now(),userDetails:[]}]

let user = [{username:"",userBookings:[{}],password:"",email:""}]

let users = [{}]
//axois

