import jwtDecode from "https://cdn.jsdelivr.net/npm/jwt-decode/build/jwt-decode.esm.js";

const logout = document.getElementById("logout")
logout.addEventListener("click",()=>{
    localStorage.removeItem("token")
    window.location.href = 'home.html';
})
const token = localStorage.getItem("token")
let decoded;
  if (token) {
    decoded = jwtDecode(token);
    console.log(decoded); 
  }

  if (!decoded?.isAdmin) {
    Swal.fire({
      icon: "error",
      title: "Oops!",
      text: "This page is only accessable by admins",
      confirmButtonText: "Okay",
      background: "#fff",
      confirmButtonColor: "#d33",
    });
    setTimeout(() => {
         window.location.href = 'home.html';
    }, 1000);
  }
let Destinations;


let Bookings = [
    {
        bookingID: "B101",
        user: {email: "JohnDoe@Kys.com"},
        destination: "Cairo",
        status: "Pending",
    },
    {
        bookingID: "B102",
        user: {email:"JanethSmithesth@real.com"},
        destination: "Alexandria",
        status: "Pending",
    }
]

let Users = [
    {
        userID: "U01",
        Name: "John Doe",
        Email:"john@example.com",
        Status: "Active",

    }
]

async function getData(){
    try{
    let res = await axios.get("http://localhost:2005/api/v1/destinations",{ headers: { Authorization: `Bearer ${token}` }})
    console.log(res);
    Destinations = res.data.destinations

    res = await axios.get("http://localhost:2005/api/v1/bookings",{ headers: { Authorization: `Bearer ${token}` }})
        console.log(res);
        
    Bookings = res.data.bookings
    console.log(Bookings);
     calc();
    res = await axios.get("http://localhost:2005/api/v1/users",{ headers: { Authorization: `Bearer ${token}` }});
        console.log(res);
        
    Users = res.data.users    

    displayEverything();    
    
    }catch(error){
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
}

getData();

function calc(){
const totalSales = Bookings.reduce((sum, booking) => sum + booking.details.totalPrice, 0);
document.getElementById("total-money").innerText = `$${totalSales.toLocaleString()}`;
//change
// Total Bookings
document.getElementById("total-bookings").innerText = Bookings.length.toLocaleString();

// Top Destination
const destinationCount = {};
Bookings.forEach(booking => {
    if (booking.destination && booking.destination.title) {
        const title = booking.destination.title;
        destinationCount[title] = (destinationCount[title] || 0) + 1;
    }
});

// Find the destination with the maximum count
let topDestination = "N/A"; // default if no destination exists
let maxCount = 0;
for (const [title, count] of Object.entries(destinationCount)) {
    if (count > maxCount) {
        maxCount = count;
        topDestination = title;
    }
}
document.getElementById("most-visted").innerText = topDestination;

}


function displayDestinations(){
    var htmlTableParent = document.getElementById('destinationsTable');
    var htmlTableHeader = '<tr> <th>ID</th> <th>Destination</th> <th>Price</th> <th>Actions</th> <th> <Button> <a href="../pages/addDestination.html">Add new Destination</a> </Button> </th> </tr>';
    htmlTableParent.innerHTML = htmlTableHeader; 
    Destinations.forEach(destination => {
        var tableRowItem = '<tr>';
        tableRowItem += '<td>' + destination._id + '</td>';
        tableRowItem += '<td>' + destination.title + '</td>';
        tableRowItem += '<td>' + destination.pricePerNight + '</td>';
        tableRowItem += `<td> <button class="btn btn-danger" onclick="onDeleteDestination(this)">Delete</button></td>`;
        tableRowItem += '</tr>';
        htmlTableParent.innerHTML += tableRowItem;
    });
}


 window.onDeleteDestination = async (element)=>{
        var tableRow = element.parentNode.parentNode;
        var id = tableRow.getElementsByTagName("td")[0].innerText;
        console.log(id);
        try {
             const {data} = await axios.delete(`http://localhost:2005/api/v1/destinations/${id}`,{ headers: { Authorization: `Bearer ${token}` }})
                console.log(data);
                 Destinations = Destinations.filter(dest => dest._id != id);
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
      

    
       
        displayDestinations();
}


function displayBookings(){
    var htmlTableParent = document.getElementById('bookingsTable');
    var htmlTableHeader = '<tr> <th>Booking ID</th> <th>User</th> <th>Destination</th> <th>Status</th> <th>Actions</th> </tr>';
    htmlTableParent.innerHTML = htmlTableHeader; 
    Bookings.forEach(booking => {
        var tableRowItem = '<tr>';
        tableRowItem += '<td>' + booking._id + '</td>';
        tableRowItem += '<td>' + booking.user.email + '</td>';
        tableRowItem += '<td>' + booking.destination?.title + '</td>';
        tableRowItem += '</tr>';
        htmlTableParent.innerHTML += tableRowItem;
    });
}

function displayUsers(){
    var htmlTableParent = document.getElementById('usersTable');
    var htmlTableHeader = '<tr> <th>User ID</th> <th>Name</th> <th>Email</th> <th>Status</th> <th>Actions</th> </tr>';
    htmlTableParent.innerHTML = htmlTableHeader;
   
    Users.forEach(user => {
         const status =user.blocked?"blocked":"active"
        var buttonText = status == "blocked" ? "Activate" : "block";
        var tableRowItem = '<tr>';
        tableRowItem += '<td>' + user._id + '</td>';
        tableRowItem += '<td>' + user.username + '</td>';
        tableRowItem += '<td>' + user.email + '</td>';
        tableRowItem += '<td id="status">' + status  + '</td>';
        tableRowItem += '<td><button onclick="onUserStatusChange(this)">' + buttonText + '</button>';
        tableRowItem += '</tr>';
        htmlTableParent.innerHTML += tableRowItem;
    });
}

window.onUserStatusChange  = async (element)=>{
  var tableRow = element.parentNode.parentNode;
    let status = tableRow.querySelector("#status");
    var userID = tableRow.getElementsByTagName("td")[0].innerText
    let url;
    if (status.innerText == "active") {
        url = "block"
    }else {
        url = "unblock"
    }
      try {
         await axios.patch(`http://localhost:2005/api/v1/users/${url}/${userID}`,{},{ headers: { Authorization: `Bearer ${token}` }})
            window.location.reload(); 
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
    }
     
    // var status = element.innerText == "Block" ? "Blocked" : "Active";



// function displayContent(){
//     var htmlTableParent = document.getElementById('contentTable');
//     var htmlTableHeader = '<tr> <th>Promotion ID</th> <th>Title</th> <th>Status</th> <th>Actions</th> <th> <button> <a href=../pages/addContent.html>Add New Content </a> </button> </th>  </tr>';
//     htmlTableParent.innerHTML = htmlTableHeader; 
//     Content.forEach(content => {
//         var buttonText = content.Status == "Enabled" ? "Disable" : "Enable";
//         var tableRowItem = '<tr>';
//         tableRowItem += '<td>' + content.promotionID + '</td>';
//         tableRowItem += '<td>' + content.title + '</td>';
//         tableRowItem += '<td>' + content.Status + '</td>';
//         tableRowItem += '<td><button onclick="onContentStatusChange(this)">' + buttonText +  '</button> | <button class="btn btn-danger" onclick="onDeleteContent(this)">Delete</button></td>';
//         tableRowItem += '</tr>';
//         htmlTableParent.innerHTML += tableRowItem;
//     });
// }
// function onAddContent(){
//     var object = {
//         promotionID: getElementById('promotionID').value,
//         title: document.getElementById('promotionTitle').value,
//         Status: "Enabled",
//     }
//     Content.push(object);
// }

// function onContentStatusChange(element){
//     var tableRow = element.parentNode.parentNode;
//     var status = element.innerText == "Disable" ? "Disabled" : "Enabled";
//     var promotionID = tableRow.getElementsByTagName("td")[0].innerText;
//     var content = Content.find(content => content.promotionID == promotionID);
//     if(content){
//         content.Status = status;
//         displayContent();
//     }
// }

// function onDeleteContent(element){
//     var tableRow = element.parentNode.parentNode;
//     var promotionID = tableRow.getElementsByTagName("td")[0].innerText;
//     Content.splice(Content.findIndex(content => content.promotionID == promotionID), 1);
//     displayContent();
// }



 function displayEverything(){
           displayDestinations();
            displayBookings();
            displayUsers();
            // displayContent();
        }

