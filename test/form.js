// scroll down for ES6 features. 

// using regular methods.
function prettyPrint() {
    var ugly = document.getElementById('myTextArea').value;
    var obj = JSON.parse(ugly);
    var pretty = JSON.stringify(obj, undefined, 4);
    document.getElementById('myTextArea').value = pretty;
}


function loadDoc() {
    var xhttp = new XMLHttpRequest();
    var result = "d";
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("demo").innerHTML = this.responseText;
            // console.log(this.responseText)
            // console.log(result)
            // callback(this.responseText)
            result = JSON.parse(this.responseText)

        }
    };
    xhttp.open("GET", "http://localhost:5000/api/v1/users", true);
    xhttp.send();
    console.log(result['data'])
    return result['data'];
}

function tableFromJson() {

    var myBook = [{
        'Book ID': '1',
        'Book Name': 'Challenging Times',
        'Category': 'Business',
        'Price': '125.60'
    }, {
        'Book ID': '2',
        'Book Name': 'Learning JavaScript',
        'Category': 'Programming',
        'Price': '56.00'
    }, {
        'Book ID': '3',
        'Book Name': 'Popular Science',
        'Category': 'Science',
        'Price': '210.40'
    }]

    var user = [{
        "_id": "5fdb7ea68891a03f48f7b856",
        "username": "vivek",
        "email": "vivek@gmail.com",
        "phone": 8428537144,
        "address": "3,karunanithi street,pammal,chennai-70",
        "createdAt": "2020-12-17T15:52:06.422Z",
        "updatedAt": "2020-12-17T15:52:06.422Z",
        "__v": 0
    }, {
        "_id": "5fdb7eca8891a03f48f7b858",
        "username": "jaga",
        "email": "jaga@gmail.com",
        "phone": 84285371441,
        "address": "3,karunanithi street,pammal,chennai-70",
        "createdAt": "2020-12-17T15:52:42.678Z",
        "updatedAt": "2020-12-17T15:52:42.678Z",
        "__v": 0
    }]

    var fields = [{
        "username": "input",
        "password": "input",
    }]
    var myBooks = fields;
    console.log(fields)
        // Extract value from table header. 
        // ('Book ID', 'Book Name', 'Category' and 'Price')
    var col = [];
    for (var i = 0; i < myBooks.length; i++) {
        for (var key in myBooks[i]) {
            console.log(myBooks)
            col.push(key);

        }
    }
    // console.log(col)
    // Create a table.
    var table = document.createElement("form");
    table.setAttribute("class", "from-control")

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement(col[i]); // table header.
        
        table.appendChild(th);
    }

    // add json data to the table as rows.
    for (var i = 0; i < myBooks.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myBooks[i][col[j]];
        }
    }

    // Now, add the newly created table with json data, to a container.
    var divShowData = document.getElementById('showData');
    divShowData.innerHTML = "";
    divShowData.appendChild(table);
    var field1 = document.getElementById("html_data");
    // var tojson = JSON.parse(field.value);
    field1.innerText = table.outerHTML;

    // document.getElementById('msg').innerHTML = '<br />You can later <a href="https://www.encodedna.com/javascript/dynamically-add-remove-rows-to-html-table-using-javascript-and-save-data.htm" target="_blank" style="color:#1464f4;text-decoration:none;">get all the data from table and save it in a database.</a>';
}