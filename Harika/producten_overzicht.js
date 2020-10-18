var username;
var user_id;
var user_rol;
var bestellingen =[];
var huidig_product;
var besid;
var user_email;
var user_naam;
var category = [];
var producten = [];
var huidige_pagina=1;
var aantal_paginas;
var pid;

function register_validatie()
{
    for (var i=0; i<7; i++)
    {
        document.getElementById("register_warning_"+i).innerHTML= "";
    }
    var validate= true;
    var form = $("#registerform");
    $('input', form).each(function(index) {
        if ($(this)[0].checkValidity() == false) 
        {
        document.getElementById("register_warning_"+index).innerHTML= '<small class="form-text text-muted mb-4">Gelieve hier geldig in te vullen!</small>'
        validate= false; 
        }
    })
    if (validate==true)
    {
        registreren()
    }
}


function registreren() {
    var voornaam = document.getElementById("voornaam").value;
    var achternaam = document.getElementById("achternaam").value;
    var gebruikersnaam = voornaam +" "+ achternaam;
    var email = document.getElementById("email").value;
    var password = document.getElementById("wachtwoord").value;
    var telefoonnummer = document.getElementById("telefoonnummer").value;
    var adres  = document.getElementById("adres").value;
    var postcode =  document.getElementById("postcode").value;
    var suggesties = document.getElementById("suggesties").value;
    var rol = "admin";

    console.log(suggesties);

    $.ajax
    ({
        url: "https://api.data-web.be/user/register?project=fjgub4eD3ddg", 
        method: "POST",
        data: {
            "values":{
                "naam" : gebruikersnaam,
                "email": email,
                "password": password,
                "telefoonnummer" : telefoonnummer,
                "adres" : adres,
                "postcode" : postcode,
                "suggesties" : suggesties,
                "rol" : rol,
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


function login_validatie()
{
    document.getElementById("login_warning_0").innerHTML= "";
    document.getElementById("login_warning_1").innerHTML= "";
    var validate= true;
    var form = $("#loginform");
    $('input', form).each(function(index) {
        if ($(this)[0].checkValidity() == false) 
        {
        document.getElementById("login_warning_"+index).innerHTML= '<small class="form-text text-muted mb-4">Gelieve hier geldig in te vullen!</small>'
        validate= false; 
        }
    })
    if (validate==true)
    {
        inloggen()
    }
}


function inloggen() {
    var email = document.getElementById("login_email").value;
    var password = document.getElementById("login_wachtwoord").value;
    
    const urlParams1 = new URLSearchParams(window.location.search);
    const directed_from = urlParams1.get("directed_from");
    
    $.ajax
    ({
        url: "https://api.data-web.be/user/login?project=fjgub4eD3ddg", 
        method: "POST",
        data: {
            "email": email,
            "password": password,
        }
    })
    .done(function (response) {
        console.log("log in done:");
        console.log(response);
        sessionStorage.setItem("token", response.status.token);
        sessionStorage.setItem("gebruiker", email);
        console.log(sessionStorage);
        document.location = "producten_overzicht.html";
    })
    .fail(function (msg) {
        console.log("log in fail:");
        console.log(msg);
        $("#verkeerdeWachtwoordModal").modal();
    });
}

function vergetenWachtwoord()
{
    Email.send({
        Host: "smtp.gmail.com",
        Username : "vsa.ned.haluk@gmail.com",
        Password : "Dorado.2678",
        To : "ha_look@yahoo.com",
        From : "vsa.ned.haluk@gmail.com",
        Subject : "Wachtwoord vergeten",
        Body : "Je wachtwoord:",
    }).then(
        alert("E-mail succesvol verzonden")
    );
}

function krijg_naam()
{
    
    var useremail= sessionStorage.getItem("gebruiker");
    $.ajax
    ({
        method: 'GET',
        url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=user",
        headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
        data:
        {
                "filter": ["email", "like", "%" + useremail + "%"]
        }
    })
    .done(function (response) {
        console.log(response);
        userdata=response.data.items;
        
                username=response.data.items[0].naam;
                user_id=response.data.items[0].user_id;
                user_rol=response.data.items[0].rol;
                sessionStorage.setItem("username",username);
                sessionStorage.setItem("user_id",user_id);
                sessionStorage.setItem("user_rol",user_rol);
          
        toon_gebruiker_naam(); 

    }).fail(function (msg) {
        console.log("read fail:");
        console.log(msg);
    });
}


function toon_gebruiker_naam()
{
    var token_check= sessionStorage.getItem("token");
    console.log(username);
    console.log(sessionStorage);
    if(token_check!=null)
    {
        document.getElementById("gebruikersnaam").style.display = "block";
        document.getElementById("gebruikersnaam").innerHTML= `<a class="nav-link dropdown-toggle" href="#" role="button" value= ""  data-toggle="dropdown">${username}<br>(Klant nummer: ${user_id})</a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
        <button class="btn btn-link" id="logout" onclick="afmelden()" style="color: black;">Log Out</button>
        </div>`;
    }
    else
    {
        document.getElementById("gebruikernaam").innerHTML="";
        document.location = "producten_admin_aanmelden.html";
    }
}


function afmelden() 
{
    //var winkelwagentje = haalWinkelwagentjeOp();
    var token_check=sessionStorage.getItem("token");
    console.log(token_check);

    $.ajax
    ({
        url: "https://api.data-web.be/user/logout?project=fjgub4eD3ddg",
        headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
        type: "Get",
    })
    .done(function (response) {
        console.log(response);
        if (token_check = null) {
        sessionStorage.setItem("gebruikernaam", "");    
        gebruikernaam = "";    
        document.getElementById("gebruikernaam").innerHTML="";
        sessionStorage.clear();
        }
        document.location = "producten_admin_aanmelden.html";
    })
    .fail(function (msg) {
        console.log("read fail:");
        console.log(msg);
    });
}
function start() {
    read_items();
}

function read_items() {
    $.ajax({
        method: 'GET',
        url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=category",
        headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },

    })
        .done(function (response) {

            category = response.data.items
            console.log(category)

            $.ajax({
                method: 'GET',
                url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=producten1",
                headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
               /* data: {
                    "paging": {
                        "page": huidige_pagina,
                        "items_per_page": 10,
                    }
                   
                }*/
            })

                .done(function (response) {
                    console.log(response);
                    assets_path = response.data.assets_path;
                    producten = response.data.items
                    sessionStorage.setItem("token", response.status.token)
                    console.log(producten)
                    vernieuw_producten_tabel()

                })
        })

}


function vernieuw_producten_tabel() {

    document.getElementById("productendata").innerHTML = "";

    for (var i = 0; i < producten.length; i++) {


        if (producten[i].pid !== null) {
            console.log(producten.beeld)
            var catnaam = haalcatnaam(producten[i].catid);
            //console.log(catnaam);
            var tabledata = "";
            tabledata += "<tr>";
            tabledata += "<td>" + producten[i].pid + "</td>";
            tabledata += "<td>" + producten[i].pnaam + "</td>";
            tabledata += "<td>" + producten[i].pomschrijving + "</td>";

            tabledata += "<td>" + catnaam + "</td>";


            tabledata += "<td>" + producten[i].prodprijs + "</td>";
          
           tabledata += "<td>" + '<img src="https:'+assets_path + "/" + producten[i].beeld.name+'" class="figure-img img-fluid z-depth-1" style="max-width: 100px" alt="Responsive image"/>' + "</td>";

            //tabledata += "<td>" + +"</td>";
            tabledata += "<td>" + `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal_verwijderen" onclick="find_product(${producten[i].pid})">Verwijderen</button>` +
                `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal_details" onclick="toon_product('update', ${producten[i].pid})">Bijwerken</button>` +
                "</td>";
            tabledata += "</tr>";

            document.getElementById("productendata").innerHTML += tabledata;
        }
    }


}


function haalcatnaam(catid) {

    for (var i = 0; i < category.length; i++) {
        if (category[i].catid == catid) {
            return category[i].catnaam;

        }

    }

}





function bijwerken_producten() {

    huidig_product.pnaam = document.getElementById("pnaam").value;
    huidig_product.pomschrijving = document.getElementById("pomschrijving").value;
    huidig_product.prodprijs = document.getElementById("prodprijs").value;
    huidig_product.catid = document.getElementById("catid").value;
    huidig_product.beeld = document.getElementById("beeldoriginal").value;
    

    vernieuw_producten_tabel();
    console.log(huidig_product);
    console.log(producten);


}



function bewarenproducten() {
    var product_actie = $("#product_actie").val();
    console.log(product_actie)

    if (product_actie == "update") {

        var formData = new FormData();
        var pid = huidig_product.pid;
        huidig_product.pnaam = document.getElementById("pnaam").value;
        huidig_product.pomschrijving = document.getElementById("pomschrijving").value;
        huidig_product.catid = document.getElementById("catid").value;
        huidig_product.prodprijs = document.getElementById("prodprijs").value;
        //huidig_product.beeld = document.getElementById("beeld").value;
        huidig_product.beeldoriginal = document.getElementById("beeldoriginal").value;

        console.log(huidig_product.beeld);
        console.log(huidig_product);

        var values = {
            "pnaam": huidig_product.pnaam,
            "pomschrijving": huidig_product.pomschrijving,
            "catid": huidig_product.catid,
            "prodprijs": huidig_product.prodprijs,
            "beeld": huidig_product.beeldoriginal,
            //"beeld": huidig_product.beeld,

        };
        formData.set("values", JSON.stringify(values));
        formData.set("filter", JSON.stringify(["pid", "=", huidig_product.pid]));

        formData.set("beeld", $("#beeld")[0].files[0]);

        $.ajax({
            url: "https://api.data-web.be/item/update?project=fjgub4eD3ddg&entity=producten1"  ,
            headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
            type: "PUT",
            processData: false,
            contentType: false,
            data: formData
        }).done(function (response) {
            console.log("update done:");
            console.log(response);
            if (response.status.success == true) {
                console.log("updated");
                $('#modal_details').modal('hide');
            }
            else {
                console.log("not updated");
                $('#modal_details').modal('hide');
            }
        }).fail(function (msg) {
            console.log("update fail:");
            console.log(msg);
        });
    
    }


    if(product_actie == "insert") {

        var formData = new FormData();
        var values = {
            "pnaam": $("#pnaam").val(),
            "pomschrijving": $("#pomschrijving").val(),
            "catid": $("#catid").val(),
            "prodprijs": $("#prodprijs").val(),
            "beeld": $("#beeld").val(),

        };
        formData.set("values", JSON.stringify(values));
       // formData.set("filter", JSON.stringify(["id", "=", huidig_product.id]));
        formData.set("beeld", $("#beeld")[0].files[0]);

        $.ajax({
            url: "https://api.data-web.be/item/create?project=fjgub4eD3ddg&entity=producten1",
            headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
            type: "POST",
            processData: false,
            contentType: false,
            data: formData
        }).done(function (response) {
            console.log("create done:");
            console.log(response);
            if (response.status.success == true) {
                console.log("created");
                var pid = response.data.pid;
                console.log(pid);
                $('#modal_details').modal('hide');
            }
            else {
                console.log("not created");
                $('#modal_details').modal('hide');
            }
        }).fail(function (msg) {
            console.log("create fail:");
            console.log(msg);
        });
    }
    
    read_items();
    $('#modal_details').modal('hide');
        

}
   
function toon_product(actie, prod_id) {
    $("#product_actie").val(actie);
    console.log(actie, $("#product_actie").val())
    if(actie == "insert"){
        document.getElementById("pnaam").value = "";
        document.getElementById("pomschrijving").value = "";
        document.getElementById("prodprijs").value = "";
        document.getElementById("catid").value = "";
        //document.getElementById("beeld").value = huidig_product.beeld;
        //json stringify
    
        document.getElementById("beeldoriginal").value = "";
    }

    if(actie == "update"){
        find_product(prod_id);
        console.log(prod_id);
        //document.getElementById("pid").value = huidig_product.pid;
        document.getElementById("pnaam").value = huidig_product.pnaam;
        document.getElementById("pomschrijving").value = huidig_product.pomschrijving;
        document.getElementById("prodprijs").value = huidig_product.prodprijs;
        document.getElementById("catid").value = huidig_product.catid;
        //document.getElementById("beeld").value = huidig_product.beeld;
        //json stringify

        document.getElementById("beeldoriginal").value = JSON.stringify(huidig_product.beeld);

        //console.log(image);
        console.log(huidig_product);
    }
    

}



function OnclickofProductToevoegen() {
    document.getElementById("pid").value = "";
    document.getElementById("pnaam").value = "";
    document.getElementById("pomschrijving").value = "";
    document.getElementById("prodprijs").value = "";
    document.getElementById("catid").value = "";
    document.getElementById("beeld").value = "";
    //document.getElementById("beeldoriginal").value = "";
}




function find_product(prod_id) {
    for (i = 0; i < producten.length; i++) {
        if (prod_id == producten[i].pid) {

            huidig_product = producten[i];
            console.log(huidig_product);
        }
    }

}



function bevestig_verwijderen() {


    $.ajax({
        url: "https://api.data-web.be/item/delete?project=fjgub4eD3ddg&entity=producten1",
        headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
        type: "DELETE",
        data: {
            "filter": [
                ["pid", "=", huidig_product.pid]
            ]
        }
    }).done(function (response) {
        console.log("delete done:");
        console.log(response);
        if (response.status.success == true) {
            console.log("deleted");

        }
        else {
            console.log("not deleted");

        }
    }).fail(function (msg) {
        console.log("delete fail:");
        console.log(msg);
    });
    read_items();
}







function filter_sort_display() {

    document.getElementById("productendata").innerHTML = "";

    for (i = 0; i < items.length; i++) {
        var catnaam = haalcatnaam(items[i].catid);
        console.log(catnaam);
        var tabledata = "";
        tabledata += "<tr>";
        tabledata += "<td>" + items[i].pid + "</td>";
        tabledata += "<td>" + items[i].pnaam + "</td>";
        tabledata += "<td>" + items[i].pomschrijving + "</td>";

        tabledata += "<td>" + catnaam + "</td>";


        tabledata += "<td>" + items[i].prodprijs + "</td>";
        tabledata += "<td>" + '<img src="https:'+assets_path + "/" + items[i].beeld.name+'" class="figure-img img-fluid z-depth-1" style="max-width: 100px" alt="Responsive image"/>' + "</td>";

        tabledata += "<td>" + `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal_verwijderen" onclick="find_product(${producten[i].pid})">Verwijderen</button>` +
        `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal_details" onclick="toon_product(${producten[i].pid})">Bijwerken</button>` +
       "</td>";

        tabledata += "</tr>";

        document.getElementById("productendata").innerHTML += tabledata;

    }
}



function filter_producten() {
    items = "";
    var fnaam = document.getElementById("filter_naam").value;
    var fomschrijving = document.getElementById("filter_omschrijving").value;
    var fprijs = document.getElementById("filter_prijs").value;

    if (fnaam != null || fomschrijving != null || fprijs != null) {
        $.ajax({
            url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=producten1",
            //headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
            type: "GET",
            data: {

                "filter": [["pnaam", "LIKE", fnaam + "%"], ["pomschrijving", "LIKE", "%" + fomschrijving + "%"], ["prodprijs", ">=", fprijs]],

            }
        })
            .done(function (json) {
                console.log("read done:");
                console.log(json);
                items = json.data.items;
                console.log(items);
                if (items == "") {

                    document.getElementById("productendata").innerHTML = "<br>" + "<br>" + "<center>" + "<b>" + "Geen Records gevonden" + "</b>" + "</center>";

                }
                else {
                    filter_sort_display();
                }

            })
            .fail(function (msg) {
                console.log("read fail:");
                console.log(msg);
            });

    }


}

function sorteer_producten() {
    items = "";
    var sorteer = document.getElementById("sorteer").value;
    console.log(sorteer);
    if (sorteer == "spid") {
        $.ajax({
            url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=producten1",
            //headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
            type: "GET",
            data: {

                "sort": [["pid", "ASC"]],

            }
        })
            .done(function (json) {
                console.log("read done:");
                console.log(json);
                items = json.data.items;
                console.log(items);

                filter_sort_display();

            })
            .fail(function (msg) {
                console.log("read fail:");
                console.log(msg);
            });


    }
    if (sorteer == "snaam") {
        $.ajax({
            url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=producten1",
            //headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
            type: "GET",
            data: {

                "sort": [["pnaam", "ASC"]],

            }
        })
            .done(function (json) {
                console.log("read done:");
                console.log(json);
                items = json.data.items;
                console.log(items);

                filter_sort_display();

            })
            .fail(function (msg) {
                console.log("read fail:");
                console.log(msg);
            });


    }
    else if (sorteer == "somschrijving") {
        $.ajax({
            url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=producten1",
            //headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
            type: "GET",
            data: {

                "sort": [["pomschrijving", "ASC"]],

            }
        })
            .done(function (json) {
                console.log("read done:");
                console.log(json);
                items = json.data.items;
                console.log(items);

                filter_sort_display();

            })
            .fail(function (msg) {
                console.log("read fail:");
                console.log(msg);
            });
    }
    else if (sorteer == "sprijs") {
        $.ajax({
            url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=producten1",
            //headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
            type: "GET",
            data: {

                "sort": [["prodprijs", "ASC"]],

            }
        })
            .done(function (json) {
                console.log("read done:");
                console.log(json);
                items = json.data.items;
                console.log(items);

                filter_sort_display();

            })
            .fail(function (msg) {
                console.log("read fail:");
                console.log(msg);
            });
    }

    else {
        alert("Kies een optie");
    }
}


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
    
    read_items();
}

