
var Destinations = [
    {
        id:1,
        destinationName: "Cairo",
        Price: 50
    },
    {
        id: 2,
        destinationName: "Alexandria",
        Price: 40
    },
];

var Bookings = [
    {
        bookingID: "B101",
        user: "John Doe",
        destination: "Cairo",
        Status: "Pending",
    },
    {
        bookingID: "B102",
        user: "Jane Smith",
        destination: "Alexandria",
        Status: "Approved",
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
        Status: "Active",
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

function OnEdit(element){

    var tableRow = element.parentNode.parentNode;
    var cells = tableRow.getElementsByTagName("td");
    //This function is to be implemented later.
}

function OnDelete(element){
    var tableRow = element.parentNode.parentNode;
    var table = tableRow.parentNode;
    table.removeChild(tableRow);
    //This function is to be implemented later.
}



 function displayEverything(){
            displayItems(Destinations, 'destinationsTable');
            displayItems(Bookings, 'bookingsTable')
            displayItems(Users, 'usersTable');
            displayItems(Content, 'contentTable');
        }


function OnAdd(element){
    var tableRow = element.parentNode.parentNode;
    var cells = tableRow.getElementsByTagName("td");
    var table = tableRow.parentNode;
    
    var newTableRow = '<tr>';
    for (var i = 0; i < cells.length - 1; i++) { 
        newTableRow += '<td>' + cells[i].getElementsByTagName("input")[0].value + '</td>';
    }
    newTableRow += '<td><button onclick="OnEdit(this)">Edit</button> | <button class="btn btn-danger" onclick="OnDelete(this)">Delete</button></td>';
    newTableRow += '</tr>';
    table.insertAdjacentHTML('beforeend', newTableRow);
   
    for (var i = 0; i < cells.length - 1; i++) {
        cells[i].getElementsByTagName("input")[0].value = '';
    }
}