
var Destinations = [
    {
        id:1,
        title: "Cairo",
        pricePerNight: 50,
        desc:"",
        image: [""],
        tips: [""],
    },
    {
        id:2,
        title: "Cairo22",
        pricePerNight: 5022,
        desc:"",
        image: [""],
        tips: [""],
    }

];

var Bookings = [
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

var Users = [
    {
        userID: "U01",
        Name: "John Doe",
        Email:"john@example.com",
        Status: "Active",

    }
]

var Content = [
    {
        promotionID: "P01",
        title: "Summer Discount",
        Status: "Enabled",
    }
]



function displayItems(array, id){
    var htmlTableParent = document.getElementById(id);
    var tableRowItem;
    var tableRowInputHTML = "<td> <input type='text'> </td>"; 
    
    array.forEach(element => {
        const values = Object.values(element);
        tableRowItem = "<tr>";
        values.forEach(value => {
            tableRowItem += '<td> ' + value + '</td>';
        }
        );
         var Button = '<td><button onclick="OnEdit(this)">Edit</button> |  <button class="btn btn-danger" onclick = "OnDelete(this)">Delete</button> </td> ';
         tableRowItem += Button;
        tableRowItem += "</tr>";
        htmlTableParent.innerHTML += tableRowItem
    }); 
}

function displayDestinations(){
    var htmlTableParent = document.getElementById('destinationsTable');
    var htmlTableHeader = '<tr> <th>ID</th> <th>Destination</th> <th>Price</th> <th>Actions</th> <th> <Button> <a href="../pages/addDestination.html">Add new Destination</a> </Button> </th> </tr>';
    htmlTableParent.innerHTML = htmlTableHeader; 
    Destinations.forEach(destination => {
        var tableRowItem = '<tr>';
        tableRowItem += '<td>' + destination.id + '</td>';
        tableRowItem += '<td>' + destination.title + '</td>';
        tableRowItem += '<td>' + destination.pricePerNight + '</td>';
        tableRowItem += '<td><button onclick="onEditDestination(this)">Edit</button> | <button class="btn btn-danger" onclick="onDeleteDestination(this)">Delete</button></td>';
        tableRowItem += '</tr>';
        htmlTableParent.innerHTML += tableRowItem;
    });
}
function onAddDestination(){
    var object= {
        id: Destinations.length + 1,
        title: document.getElementById('destinationTitle').value,
        pricePerNight: document.getElementById('pricePerNight').value,
        desc: document.getElementById('description').value,
        image: [document.getElementById('image').value.join(', ')],
        tips: [document.getElementById('tips').value.join(', ')],
    }
    Destinations.push(object);

}
//change
function onDeleteDestination(element){
        var tableRow = element.parentNode.parentNode;
        var id = tableRow.getElementsByTagName("td")[0].innerText;
        Destinations.splice(Destinations.findIndex(dest => dest.id == id), 1);
        displayDestinations();
}


function displayBookings(){
    var htmlTableParent = document.getElementById('bookingsTable');
    var htmlTableHeader = '<tr> <th>Booking ID</th> <th>User</th> <th>Destination</th> <th>Status</th> <th>Actions</th> </tr>';
    htmlTableParent.innerHTML = htmlTableHeader; 
    Bookings.forEach(booking => {
        var tableRowItem = '<tr>';
        tableRowItem += '<td>' + booking.bookingID + '</td>';
        tableRowItem += '<td>' + booking.user.email + '</td>';
        tableRowItem += '<td>' + booking.destination + '</td>';
        tableRowItem += '<td>' + booking.status + '</td>';
        tableRowItem += '<td><button onclick="onBookingStatusChange(this)">Approve</button> | <button class="btn btn-danger" onclick="onBookingStatusChange(this)">Disapprove</button></td>';
        tableRowItem += '</tr>';
        htmlTableParent.innerHTML += tableRowItem;
    });
}
function onBookingStatusChange(element){
    var tableRow = element.parentNode.parentNode;
    var status = element.innerText;
    var bookingID = tableRow.getElementsByTagName("td")[0].innerText;
    var booking = Bookings.find(booking => booking.bookingID == bookingID);
    if (booking) {
        booking.status = status;
        displayBookings();
    }
}

function displayUsers(){
    var htmlTableParent = document.getElementById('usersTable');
    var htmlTableHeader = '<tr> <th>User ID</th> <th>Name</th> <th>Email</th> <th>Status</th> <th>Actions</th> </tr>';
    htmlTableParent.innerHTML = htmlTableHeader;
    Users.forEach(user => {
        var buttonText = user.Status == "Active" ? "Block" : "Activate";
        var tableRowItem = '<tr>';
        tableRowItem += '<td>' + user.userID + '</td>';
        tableRowItem += '<td>' + user.Name + '</td>';
        tableRowItem += '<td>' + user.Email + '</td>';
        tableRowItem += '<td>' + user.Status + '</td>';
        tableRowItem += '<td><button onclick="onUserStatusChange(this)">' + buttonText + '</button>';
        tableRowItem += '</tr>';
        htmlTableParent.innerHTML += tableRowItem;
    });
}
function onUserStatusChange(element){
    var tableRow = element.parentNode.parentNode;
    var status = element.innerText == "Block" ? "Blocked" : "Active";
    var userID = tableRow.getElementsByTagName("td")[0].innerText
    var user = Users.find(user => user.userID == userID);
    if(user){
        user.Status = status;
        displayUsers();
    }
}

function displayContent(){
    var htmlTableParent = document.getElementById('contentTable');
    var htmlTableHeader = '<tr> <th>Promotion ID</th> <th>Title</th> <th>Status</th> <th>Actions</th> <th> <button> <a href=../pages/addContent.html>Add New Content </a> </button> </th>  </tr>';
    htmlTableParent.innerHTML = htmlTableHeader; 
    Content.forEach(content => {
        var buttonText = content.Status == "Enabled" ? "Disable" : "Enable";
        var tableRowItem = '<tr>';
        tableRowItem += '<td>' + content.promotionID + '</td>';
        tableRowItem += '<td>' + content.title + '</td>';
        tableRowItem += '<td>' + content.Status + '</td>';
        tableRowItem += '<td><button onclick="onContentStatusChange(this)">' + buttonText +  '</button> | <button class="btn btn-danger" onclick="onDeleteContent(this)">Delete</button></td>';
        tableRowItem += '</tr>';
        htmlTableParent.innerHTML += tableRowItem;
    });
}
function onAddContent(){
    var object = {
        promotionID: getElementById('promotionID').value,
        title: document.getElementById('promotionTitle').value,
        Status: "Enabled",
    }
    Content.push(object);
}

function onContentStatusChange(element){
    var tableRow = element.parentNode.parentNode;
    var status = element.innerText == "Disable" ? "Disabled" : "Enabled";
    var promotionID = tableRow.getElementsByTagName("td")[0].innerText;
    var content = Content.find(content => content.promotionID == promotionID);
    if(content){
        content.Status = status;
        displayContent();
    }
}

function onDeleteContent(element){
    var tableRow = element.parentNode.parentNode;
    var promotionID = tableRow.getElementsByTagName("td")[0].innerText;
    Content.splice(Content.findIndex(content => content.promotionID == promotionID), 1);
    displayContent();
}



 function displayEverything(){
           displayDestinations();
            displayBookings();
            displayUsers();
            displayContent();
        }