var huidige_pagina=1;
var aantal_paginas;

var filter = [];
//var property = [{"entity": "product", "field": "*"}];
var property = [];
var sorteren=["user_id", "ASC"];
var sort = [{"field": $("#sort_select").val(), "direction": "ASC"}];
var relation = [];
var producten = [];
var paging = {"page": 2, "items_per_page": 10};
//var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE1OTk3NTY0NzYsImlzcyI6IkxsdUczZ3daS1B6QyIsImlhdCI6MTU5OTcyMDQ3Nn0.tBVfPYWrvbCOQLgfSijiiflci8YwDY1Ol3TjWQigkVM";

function start() {

    toonProducten();
 
}

function bewarenproducten(){
    var productnaam = document.getElementById("pnaam").value;
    var productprijs = document.getElementById("prodprijs").value;
    var productbeeld = document.getElementById("beeld").value;
    var productomschrijving = document.getElementById("pomschrijving").value;
    var productcategorie = document.getElementById("catid").value;
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.data-web.be/item/create?project=fjgub4eD3ddg&entity=producten&token_required=false",
        "method": "POST",
        "headers": {},
        "data": {
          "values": `{\"pnaam\" : \"${productnaam}\", \"prodprijs\" : \"${productprijs}\", \"beeld\" : \"${productbeeld}\", \"pomschrijving\" : \"${productomschrijving}\", \"catid\" : \"${productcategorie}\"}`
        }
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        var pid = response.data.pid;
        console.log(pid);
      })

            .fail(function (msg) 
            {
                    console.log("read fail:");
                    console.log(msg);
            });
}

function toonProducten() {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=producten&token_required=false",
        "method": "GET",
        "headers": {},
        "data": {}
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        producten = response.data.items;
        console.log(producten);
        $("#producten_table tbody").html("");
        producten.forEach(function(product) {
            var beeld = "";
            if (product.beeld != null) {
                beeld = '<img src="' + product.beeld + '" class="figure-img img-fluid z-depth-1" style="max-width: 100px" alt="Responsive image"/>';
            }
            var row = "<tr>" +
                "<td>" + product.pid + "</td>" +
                "<td>" + product.pnaam + "</td>" +
                "<td>&euro; " + product.prodprijs + "</td>" +
                "<td>" + beeld + "</td>" +
                "<td>" + product.pomschrijving + "</td>" +
                "<td>" + product.catid + "</td>" +

                "<td>" +
                "<button class=\"btn btn-sm btn-primary\" onclick=\"$('#delete_id').val(" + product.pid + ");\"  data-toggle=\"modal\" data-target=\"#delete_modal\">verwijderen</button>" +
               // "<button class=\"btn btn-sm btn-primary\" onclick=\"bewerken(" + product.pid + ")\" data-toggle=\"modal\" data-target=\"#product_modal\">bewerken</button>" +

                "<button class=\"btn btn-sm btn-primary\" onclick=\"toonProductPopup('update', '" + product.pid + "')\" data-toggle=\"modal\" data-target=\"#product_modal\">bewerken</button>" +
                "</td>" +
                "</tr>";

            $("#producten_table").append(row);
        });

      })

            .fail(function (msg) 
            {
                    console.log("read fail:");
                    console.log(msg);
            });

}
function OnclickvanProductToevoegen(num) {
    var formData = new FormData();
    var values = 
    {
        "pid": $("#naam").val(), 
        "pnaam": $("#pnaam").val(),
        "prodprijs": $("#prodprijs").val(),
        "beeld": $("#beeld").val(), 
        "pomschrijving": $("#pomschrijving").val(),
        "catid": $("#catid").val(),
    };
    formData.set("values", JSON.stringify(values));         
    formData.set("filter", JSON.stringify([{"field": "pid", "operator": "=", "value": product[num].pid}]));

    $.ajax
    ({
        url: "https://api.data-web.be/item/update?project=fjgub4eD3ddg&entity=producten",
        type: "PUT",
        //headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")},
        processData: false,
        contentType: false,
        data: formData
    })
    .done(function(response) {
        console.log("update done:");
        console.log(response);
        toonProducten();
        
    })
    .fail(function (msg) {
        console.log("update fail:");
        console.log(msg);
    });
}
function doDelete() {
    var pid = $('#delete_id').val();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.data-web.be/item/delete?project=fjgub4eD3ddg&entity=producten&token_required=false",
        "method": "DELETE",
        "headers": {},
        "data": {
          "filter": {"field": "pid", "operator": "=", "value":pid}
        }
      }
      
     
      $.ajax(settings).done(function (response) {
        toonProducten();
        $('#delete_modal').modal('hide');
        console.log(response);
      }).fail(function (msg) 
      {
              console.log("read fail:");
              console.log(msg);
      });
}
function bewerken(num) {

    console.log("update");
    document.getElementById("modalform").innerHTML = '<h4 class="modal-title w-100 font-weight-bold">Product bijwerken</h4>';
    document.getElementById("modalFooter").innerHTML = '<button class="btn btn-blue" onclick="bewaren_bewerken('+num+')" data-dismiss="modal">BEWAREN</button> <button class="btn btn-blue" data-dismiss="modal">ANNULEREN</button>';
    document.getElementById("pnaam").value = producten[num].pnaam;
    document.getElementById("pomschrijving").value = producten[num].pomschrijving;
    document.getElementById("prodprijs").value = producten[num].prodprijs;
    document.getElementById("beeld").value = producten[num].beeld;


  
}
function toonProductPopup(actie, pid) {
    $("#product_actie").val(actie);

    if (actie == "insert") {
        $("#modalform").html("Product toeveogen");
        $('#pid').val("");
        $('#pnaam').val("");
        $('#pomschrijving').val("");
        $('#prodprijs').val("");
        $('#beeld').val("");
    }

    if (actie == "update") {
        $("#modalform").html("Product wijzigen");
        var formData = new FormData();
        var values = 
            {
                "pid": $("#pid").val(), 
                "pnaam": $("#pnaam").val(),
                "prodprijs": $("#prodprijs").val(),
                "beeld": $("#beeld").val(), 
                "pomschrijving": $("#pomschrijving").val(),
                "catid": $("#catid").val(),
              
            }
        formData.set("values", JSON.stringify(values));         


            $.ajax
            ({
                url: "https://api.data-web.be/item/single_read?project=fjgub4eD3ddg&entity=producten&pid="+ pid +'&token_required=false',
                type: "GET",
                //headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")},
                processData: false,
                contentType: false,
                data: formData
            })
            .done(function(response) {
                console.log("create done:");
                console.log(response);
                $('#product_id').val(response.data.item.pid);
                $('#product_naam').val(response.data.item.pnaam);
                $('#product_omschrijving').val(response.data.item.pomschrijving);
                $('#prodprijs').val(response.data.item.prodprijs);
                $('#product_beeld_origineel').val(JSON.stringify(response.data.item.beeld));
                $('#beeld').val("");
                $('#product_beeld_label').html("Kies (nieuw) beeld");
                toonProducten();
            })
            .fail(function (msg) {
                console.log("create fail:");
                console.log(msg);
            });

        
    }
}





function doSort() {
    sort = [{"field": $("#sort_select").val(), "direction": "ASC"}];
    toonProducten();
}

function doFilter() {
    filter = [];
    if ($("#filter_naam").val() != "") {
        filter.push({"field":"naam","operator":"LIKE", "value": "%" + $("#filter_naam").val() + "%"});
    }

    if ($("#filter_omschrijving").val() != "") {
        filter.push({"field":"omschrijving","operator":"LIKE", "value": "%" + $("#filter_omschrijving").val() + "%"});
    }

    if ($("#filter_prijs").val() != "") {
        filter.push({"field":"prijs","operator":">=", "value": $("#filter_prijs").val()});
    }

    toonProducten();
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
    toonProducten();
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
        document.location = "bestellingen_overzicht.html";
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
        //document.location = "aanmelden1.html";
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
        document.location = "aadmin_aanmelden.html";
    })
    .fail(function (msg) {
        console.log("read fail:");
        console.log(msg);
    });
}

function start() {
    
       read_items();
   


function read_items() {
    $.ajax({
        method: 'GET',
        url: "https://api.data-web.be/item/read?project=yHdCirs044LG&entity=producten_category",
        headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },

    })
        .done(function (response) {

            producten_category = response.data.items
            console.log(producten_category)

            $.ajax({
                method: 'GET',
                url: "https://api.data-web.be/item/read?project=yHdCirs044LG&entity=producten",
                headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
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


        if (producten[i].id !== null) {

            var catnaam = haalcatnaam(producten[i].cid);
            //console.log(catnaam);
            var tabledata = "";
            tabledata += "<tr>";
            tabledata += "<td>" + producten[i].id + "</td>";
            tabledata += "<td>" + producten[i].naam + "</td>";
            tabledata += "<td>" + producten[i].omschrijving + "</td>";

            tabledata += "<td>" + catnaam + "</td>";


            tabledata += "<td>" + producten[i].prijs + "</td>";
          
           tabledata += "<td>" + '<img src="https:'+assets_path + "/" + producten[i].beeld.name+'" />' + "</td>";

            //tabledata += "<td>" + +"</td>";
            tabledata += "<td>" + `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal_verwijderen" onclick="find_product(${producten[i].id})">Verwijderen</button>` +
                `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal_details" onclick="toon_product(${producten[i].id})">Bijwerken</button>` +
                "</td>";
            tabledata += "</tr>";

            document.getElementById("productendata").innerHTML += tabledata;
        }
    }


}


function haalcatnaam(catid) {

    for (var i = 0; i < producten_category.length; i++) {
        if (producten_category[i].cid == catid) {
            return producten_category[i].cnaam;

        }

    }

}


function toon_product(prod_id) {

    find_product(prod_id);
    document.getElementById("id").value = huidig_product.id;
    document.getElementById("naam").value = huidig_product.naam;
    document.getElementById("omschrijving").value = huidig_product.omschrijving;
    document.getElementById("prijs").value = huidig_product.prijs;
    document.getElementById("categorie").value = huidig_product.cid;
    //document.getElementById("beeld").value = huidig_product.beeld;
    //json stringify

    document.getElementById("beeldoriginal").value = JSON.stringify(huidig_product.beeld);

    //console.log(image);
    console.log(huidig_product);


}



function bijwerken_producten() {

    huidig_product.naam = document.getElementById("naam").value;
    huidig_product.omschrijving = document.getElementById("omschrijving").value;
    huidig_product.prijs = document.getElementById("prijs").value;
    huidig_product.cid = document.getElementById("categorie").value;
    huidig_product.beeld = document.getElementById("beeld").value;
    

    vernieuw_producten_tabel();
    console.log(huidig_product);
    console.log(producten);


}



function bewarenproducten() {

    var formData = new FormData();
    var id = document.getElementById("id").value;

    if (id !== "") {

        huidig_product.naam = document.getElementById("naam").value;
        huidig_product.omschrijving = document.getElementById("omschrijving").value;
        huidig_product.cid = document.getElementById("categorie").value;
        huidig_product.prijs = document.getElementById("prijs").value;
        //huidig_product.beeld = document.getElementById("beeld").value;
        huidig_product.beeldoriginal = document.getElementById("beeld").value;

        console.log(huidig_product.beeld);
        console.log(huidig_product);

        var values = {
            "naam": huidig_product.naam,
            "omschrijving": huidig_product.omschrijving,
            "cid": huidig_product.cid,
            "prijs": huidig_product.prijs,
            "beeld": huidig_product.beeldoriginal,
            //"beeld": huidig_product.beeld,

        };
        formData.set("values", JSON.stringify(values));
        formData.set("filter", JSON.stringify(["id", "=", huidig_product.id]));

        formData.set("beeld", $("#beeld")[0].files[0]);

        $.ajax({
            url: "https://api.data-web.be/item/update?project=yHdCirs044LG&entity=producten",
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
            }
            else {
                console.log("not updated");
            }
        }).fail(function (msg) {
            console.log("update fail:");
            console.log(msg);
        });
    }

    else {


        var values = {
            "naam": $("#naam").val(),
            "omschrijving": $("#omschrijving").val(),
            "cid": $("#categorie").val(),
            "prijs": $("#prijs").val(),
            "beeld": $("#beeld").val(),

        };
        formData.set("values", JSON.stringify(values));
       // formData.set("filter", JSON.stringify(["id", "=", huidig_product.id]));
        formData.set("beeld", $("#beeld")[0].files[0]);

        $.ajax({
            url: "https://api.data-web.be/item/create?project=yHdCirs044LG&entity=producten",
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
                var id = response.data.id;
                console.log(id);
            }
            else {
                console.log("not created");
            }
        }).fail(function (msg) {
            console.log("create fail:");
            console.log(msg);
        });
    }
        read_items();

    }


      
   



function OnclickofProductToevoegen() {
    document.getElementById("id").value = "";
    document.getElementById("naam").value = "";
    document.getElementById("omschrijving").value = "";
    document.getElementById("prijs").value = "";
    document.getElementById("categorie").value = "";
    document.getElementById("beeld").value = "";
    //document.getElementById("beeldoriginal").value = "";
}




function find_product(prod_id) {
    for (i = 0; i < producten.length; i++) {
        if (prod_id == producten[i].id) {

            huidig_product = producten[i];
            
            return;
        }
    }

}



function bevestig_verwijderen() {


    $.ajax({
        url: "https://api.data-web.be/item/delete?project=yHdCirs044LG&entity=producten",
        headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
        type: "DELETE",
        data: {
            "filter": [
                ["id", "=", huidig_product.id]
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
        var catnaam = haalcatnaam(items[i].cid);
        console.log(catnaam);
        var tabledata = "";
        tabledata += "<tr>";
        tabledata += "<td>" + items[i].id + "</td>";
        tabledata += "<td>" + items[i].naam + "</td>";
        tabledata += "<td>" + items[i].omschrijving + "</td>";

        tabledata += "<td>" + catnaam + "</td>";


        tabledata += "<td>" + items[i].prijs + "</td>";
        tabledata += "<td>" + items[i].beeld + "</td>";

        tabledata += "<td>" + +"</td>";

        tabledata += "</tr>";

        document.getElementById("productendata").innerHTML += tabledata;

    }
}



function filter_producten() {
    items = "";
    var fnaam = document.getElementById("fnaam").value;
    var fomschrijving = document.getElementById("fomschrijving").value;
    var fprijs = document.getElementById("fprijs").value;

    if (fnaam != null || fomschrijving != null || fprijs != null) {
        $.ajax({
            url: "https://api.data-web.be/item/read?project=yHdCirs044LG&entity=producten",
            headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
            type: "GET",
            data: {

                "filter": [["naam", "LIKE", fnaam + "%"], ["omschrijving", "LIKE", "%" + fomschrijving + "%"], ["prijs", ">=", fprijs]],

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
    if (sorteer == "snaam") {
        $.ajax({
            url: "https://api.data-web.be/item/read?project=yHdCirs044LG&entity=producten",
            headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
            type: "GET",
            data: {

                "sort": [["naam", "ASC"]],

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
            url: "https://api.data-web.be/item/read?project=yHdCirs044LG&entity=producten",
            headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
            type: "GET",
            data: {

                "sort": [["omschrijving", "ASC"]],

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
            url: "https://api.data-web.be/item/read?project=yHdCirs044LG&entity=producten",
            headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
            type: "GET",
            data: {

                "sort": [["prijs", "ASC"]],

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