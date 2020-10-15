var klanten=[];
var filters=[];
var sorteren=["user_id", "ASC"];
var num;
var huidige_pagina=1;
var aantal_paginas;

// client/read
function starten() {
    //console.log(sessionStorage.getItem("token"));        
    $.ajax
    ({
        url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=user",
        data: {
            "paging": {
                "page": huidige_pagina,
                "items_per_page": 10
            },
            "filter": filters,
            "sort": sorteren,
        }
    })
    .done(function(response) {
        console.log("read klanten done:");
        console.log(response);
        klanten = response.data.items;
        aantal_paginas = response.data.paging.page_count;
        toon_klanten_tabel();
    })
    .fail(function (msg) {
        console.log("read fail:");
        console.log(msg);
    });
}

// client/table
function toon_klanten_tabel() 
{
    document.getElementById('tabel').innerHTML = "";
    for (i=0; i<klanten.length; i++) 
    {
        if (klanten[i].suggesties==true){
            suggesties="Ja"
        }else{
            suggesties="Neen"
        }
        if (klanten[i].actief==true){
            actief="Ja"
        }else{
            actief="Neen"
        }
        document.getElementById("tabel").innerHTML += '<tr>'
        +'<td>'+klanten[i].user_id+'</td> <td>'+klanten[i].naam+'</td> <td>'+klanten[i].email+'</td> <td>'+klanten[i].telefoonnummer+'</td> <td>'+klanten[i].adres+'</td> <td>'+klanten[i].postcode+'</td> <td>'+suggesties+'</td> <td>'+actief+'</td>'
        +'<td> <span class="text-left"><a class="btn btn-blue btn-sm my-0" id="verwijderen'+i+'" onclick="verwijderen('+i+')" data-toggle="modal" data-target="#verwijderen">Verwijderen</a></span>'
        +'<span class="text-left"><a class="btn btn-blue btn-sm my-0" id="bewerken'+i+'" onclick="bewerken('+i+')" data-toggle="modal" data-target="#product">Bewerken</a></span>'
        +'</td> </tr>';
    }
}

// popup/create
function toevoegen() 
{
    legen();
    document.getElementById("modalHeader").innerHTML = '<h4 class="modal-title w-100 font-weight-bold">Klant toevoegen</h4>';
    document.getElementById("invoerWachtwoord").style.display = "block"; 
    document.getElementById("modalFooter").innerHTML = '<button class="btn btn-blue" onclick="bewaren_toevoegen()" data-dismiss="modal">BEWAREN</button> <button class="btn btn-blue" data-dismiss="modal">ANNULEREN</button>';
}

// client/create
function bewaren_toevoegen() 
{
    var formData = new FormData();
    var values = 
    {
        "naam": $("#naam").val(), 
        "email": $("#email").val(),
        "password" : $("#wachtwoord").val(),
        "telefoonnummer": $("#telefoonnummer").val(),
        "adres": $("#adres").val(), 
        "postcode": $("#postcode").val(),
        "suggesties": $("#suggesties").val(),
        "actief": $("#actief").val(),
        "rol" : "klant"
    };
    formData.set("values", JSON.stringify(values));         
    
    $.ajax
    ({
        url: "https://api.data-web.be/item/create?project=fjgub4eD3ddg&entity=user",
        type: "POST",
        //headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")},
        processData: false,
        contentType: false,
        data: formData
    })
    .done(function(response) {
        console.log("create done:");
        console.log(response);
        starten();
    })
    .fail(function (msg) {
        console.log("create fail:");
        console.log(msg);
    });
}

// popup/empty
function legen() 
{
    document.getElementById("naam").value = "";
    document.getElementById("email").value = "";
    document.getElementById("wachtwoord").value = "";
    document.getElementById("telefoonnummer").value = "";
    document.getElementById("adres").value = "";
    document.getElementById("postcode").value = "";
}

// popup/update
function bewerken(num) 
{
    document.getElementById("modalHeader").innerHTML = '<h4 class="modal-title w-100 font-weight-bold">Klant bijwerken</h4>';
    document.getElementById("invoerWachtwoord").style.display = "none";
    document.getElementById("modalFooter").innerHTML = '<button class="btn btn-blue" onclick="bewaren_bewerken('+num+')" data-dismiss="modal">BEWAREN</button> <button class="btn btn-blue" data-dismiss="modal">ANNULEREN</button>';
    document.getElementById("naam").value = klanten[num].naam;
    document.getElementById("email").value = klanten[num].email;
    document.getElementById("telefoonnummer").value = klanten[num].telefoonnummer;
    document.getElementById("adres").value = klanten[num].adres;
    document.getElementById("postcode").value = klanten[num].postcode;
    
    if(klanten[num].suggesties=="1")
    {
        document.getElementById("suggesties").checked=true;
    }
    else
    {
        document.getElementById("suggesties").checked=false;
    }
    if(klanten[num].actief=="1")
    {
        document.getElementById("actief").checked=true;
    }
    else
    {
        document.getElementById("actief").checked=false;
    }
}

// client/update
function bewaren_bewerken(num) 
{
    var formData = new FormData();
    var values = 
    {
        "naam": $("#naam").val(), 
        "email": $("#email").val(),
        "telefoonnummer": $("#telefoonnummer").val(),
        "adres": $("#adres").val(), 
        "postcode": $("#postcode").val(),
        "suggesties": $("#suggesties").val(),
        "actief": $("#actief").val(),
    };
    formData.set("values", JSON.stringify(values));         
    formData.set("filter", JSON.stringify([{"field": "user_id", "operator": "=", "value": klanten[num].user_id}]));

    $.ajax
    ({
        url: "https://api.data-web.be/item/update?project=fjgub4eD3ddg&entity=user",
        type: "PUT",
        //headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")},
        processData: false,
        contentType: false,
        data: formData
    })
    .done(function(response) {
        console.log("update done:");
        console.log(response);
        starten();
        
    })
    .fail(function (msg) {
        console.log("update fail:");
        console.log(msg);
    });
}

// popup/delete
function verwijderen(num) 
{
    document.getElementById("modalVerwijder").innerHTML = '<button class="btn btn-blue" onclick="verwijderen_ja('+num+')" data-dismiss="modal">JA</button> <button class="btn btn-blue" data-dismiss="modal">NEEN</button>';
}

// client/delete
function verwijderen_ja(num) 
{
    console.log(num);
    $.ajax
    ({
        url: "https://api.data-web.be/item/delete?project=fjgub4eD3ddg&entity=user",
        type: "DELETE",
        //headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")},
        data: {                
            "filter": [
                    {"field": "user_id", "operator": "=", "value": klanten[num].user_id}
            ]
        }
    })
    .done(function(response) {
        console.log("delete done:");
        console.log(response);
        starten();
    })
    .fail(function (msg) {
        console.log("delete fail:");
        console.log(msg);
    });
}

// pagination
function paginas(dir) 
{
    if (huidige_pagina>=1 && huidige_pagina<aantal_paginas && dir=="volgende") 
    {
        huidige_pagina++;
    } 
    else if (huidige_pagina>1 && huidige_pagina<=aantal_paginas && dir=="vorige")
    {
        huidige_pagina--;
    }
    starten();
}

// filtration
function filteren() {
    var filter = [];
    filter[0] = $("#filternaam").val();
    filter[1] = $("#filteremail").val();
    filter[2] = $("#filterpostcode").val();
    filter[3] = $("#filteractief").val();

    filters=[];
    if (filter[0]!="") 
    {
        filters.push(["naam", "=", filter[0]])
    };
    if (filter[1]!="")
    {
        filters.push(["email", "=", filter[1]])
    };
    if (filter[2]!="") 
    {
        filters.push(["postcode", "=", filter[2]])
    };
    if (filter[3]!="") 
    {   
        if (filter[3]=="ja" || filter[3]=="Ja" || filter[3]=="JA")
        {
            filter[3] = 1;
        } 
        filters.push(["actief", "=", filter[3]])
    };
    starten();
}

// sortation
function sortering() 
{
    sorteren[0] = $("#sorteer").val();
    starten();
}

// user/register
/*function registreren() 
{
    $.ajax
    ({
        url: "https://api.data-web.be/user/register?project=fjgub4eD3ddg",
        method: "POST",
        "data": 
        {
            "values":
            {
                'email': $('#loginFormEmail').val(),
                'password': $('#loginFormPassword').val(),
            }
        }
    })
    .done(function (response) {
        console.log("registiration done:");
        console.log(response);
    })
    .fail(function (msg) {
        console.log("registiration fail:");
        console.log(msg);
    });
}

// user/login
function inloggen() 
{
    document.getElementById('status').innerHTML = "Signing in...";
      
    $.ajax({
        url: "https://api.data-web.be/user/login?project=fjgub4eD3ddg",
        method: "POST",
        "data": 
        {
            'email': $('#loginFormEmail').val(),
            'password': $('#loginFormPassword').val(),
        }
    }).done(function (response) {
        console.log("login done:");
        console.log(response);
        sessionStorage.setItem("token", response.status.token);
        console.log(sessionStorage.getItem("token"));
        document.location = "producten.html";
        
    }).fail(function (msg) {
        console.log("login fail:");
        console.log(msg);
    });
}*/
