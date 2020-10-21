var username;
var user_id;
var user_rol;
var contactformulier =[];
var huidig_product;
var besid;
var user_email;
var user_naam;

/* function inloggen() {
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
        document.location = "contact_overzicht.html";
    })
    .fail(function (msg) {
        console.log("log in fail:");
        console.log(msg);
        $("#verkeerdeWachtwoordModal").modal();
    });
}  */
function start() {

    
       read_items();
   

}
function read_items() {
    $.ajax({
        method: 'GET',
        url: "https://api.data-web.be/item/read",
        //headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
        data: {
        "project":"fjgub4eD3ddg",
        "entity":"contactformulier",
            "relation": 
            [{"pri_entity":"contactformulier","pri_key":"besid","sec_entity":"bestelling", "sec_key":"besid"}]
        }

    })
        .done(function (response) {
            console.log(response);
            contactformulier = response.data.items;
            console.log(contactformulier);
            vernieuw_contact_tabel();
        }).fail(function (msg) {
            console.log("update fail:");
            console.log(msg);
        });

}
function vernieuw_contact_tabel() {

    document.getElementById("contactformulierdata").innerHTML = "";

    for (var i = 0; i < contactformulier.length; i++) {


        if (contactformulier[i].cfid !== null) {

            
            var tabledata = "";
            tabledata += "<tr>";
            tabledata += "<td>" + contactformulier[i].naam + "</td>";
            tabledata += "<td>" + contactformulier[i].email + "</td>";
            tabledata += "<td>" + contactformulier[i].telefoonnummer + "</td>";
            tabledata += "<td>" + contactformulier[i].besid+ "</td>";
            tabledata += "<td>" + contactformulier[i].omschrijving + "</td>";
            tabledata += "<td>" + contactformulier[i].datum_cf + "</td>";
            tabledata += "<td>" + contactformulier[i].opgelost + "</td>";
            
            
            //if(bestellingen[i].betaald=="0")
            //{

            tabledata += "<td>" + `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal_verwijderen" onclick="find_contact_data(${contactformulier[i].cfid})">Verwijderen</button>` +
                `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal_details" onclick="get_contact_data(${contactformulier[i].cfid})">Bijwerken</button>` +
                "</td>";
           // }
            tabledata += "</tr>";

            document.getElementById("contactformulierdata").innerHTML += tabledata;
        }
    }


}



function get_contact_data(cfid) 
{

    find_contact_data(cfid);
    console.log("line 300 huidig_product",huidig_product);
    document.getElementById("naam").value = huidig_product.naam;
    document.getElementById("email").value = huidig_product.email;
    document.getElementById("telefoonnummer").value = huidig_product.telefoonnummer;
    document.getElementById("besid").value = huidig_product.besid;
    document.getElementById("omschrijving").value = huidig_product.omschrijving;
    document.getElementById("datum_cf").value = huidig_product.datum_cf;
    document.getElementById("opgelost").value = huidig_product.opgelost;

    if(huidig_product.opgelost=="1")
    {
        document.getElementById("opgelost").checked=true;
    }
    else
    {
        document.getElementById("opgelost").checked=false;
    }



    document.getElementById("opgelost").value = huidig_product.opgelost;
    
    console.log("line 304 huidig_product",huidig_product);
}

function find_contact_data(cfid) 
{
    for (i = 0; i < contactformulier.length; i++) {
        if (cfid == contactformulier[i].cfid) {

            huidig_product = contactformulier[i];
            console.log("in find_contact_data function, consoling huidig_product",huidig_product);
            //return;
        }
    }

}
function bijwerken_contacten() {

    huidig_product.naam = document.getElementById("naam").value;
    huidig_product.email = document.getElementById("email").value;
    huidig_product.telefoonnummer = document.getElementById("telefoonnummer").value;
    huidig_product.besid = document.getElementById("besid").value;
    huidig_product.omschrijving = document.getElementById("omschrijving").value;
    huidig_product.datum_cf = document.getElementById("datum_cf").value;
    huidig_product.opgelost=  document.getElementById("opgelost").value;

    vernieuw_contact_tabel();
    console.log(huidig_product);
    console.log(producten);


}


 function set_opgelost_value()
 {
     var opgelost= document.getElementById("opgelost");
     if(opgelost.checked)
     {
        document.getElementById("opgelost").value="1";
     }  
     else if(!opgelost.checked){
        document.getElementById("opgelost").value="0";
       
     }
 }


function contacten_opvolgen() {

   console.log("reaches contacten_opvolegen function");

    var formData = new FormData();
    //var id = document.getElementById("cfid").value;
    //console.log(id);

    if (huidig_product.besid !== "") {

        console.log("reached after id not empty condition");

        huidig_product.naam = document.getElementById("naam").value;
        huidig_product.email = document.getElementById("email").value;
        huidig_product.telefoonnummer = document.getElementById("telefoonnummer").value;
        huidig_product.besid = document.getElementById("besid").value;
        huidig_product.omschrijving = document.getElementById("omschrijving").value;
        huidig_product.datum_cf = document.getElementById("datum_cf").value;
        huidig_product.opgelost=  document.getElementById("opgelost").value;
        
        
        console.log(huidig_product);
        

        var values = {
            "naam": huidig_product.naam,
            "email": huidig_product.email,
            "telefoonnummer": huidig_product.telefoonnummer,
            "besid": huidig_product.besid,
            "omschrijving":  huidig_product.omschrijving,
            "datum_cf": huidig_product.datum_cf,
            "opgelost": huidig_product.opgelost

        };
        console.log("new values after changing in bewerken",values)
        formData.set("values", JSON.stringify(values));
        formData.set("filter", JSON.stringify(["cfid", "=", huidig_product.cfid]));

        //formData.set("beeld", $("#beeld")[0].files[0]);
        console.log(formData);
        $.ajax({
            url: "https://api.data-web.be/item/update?project=fjgub4eD3ddg&entity=contactformulier",
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

   
    vernieuw_contact_tabel();

    }

    function bevestig_verwijderen() {


        $.ajax({
            url: "https://api.data-web.be/item/delete?project=fjgub4eD3ddg&entity=contactformulier",
            headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
            type: "DELETE",
            data: {
                "filter": [
                    ["cfid", "=", huidig_product.cfid]
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
        vernieuw_contact_tabel();
    }




    function OnclickofBestellingenOpvolgen()
    {
        document.getElementById("naam").value = "";
        document.getElementById("email").value = "" ;
        document.getElementById("telefoonnummer").value = "" ;
        document.getElementById("besid").value = "";
        document.getElementById("omschrijving").value = "" ;
        document.getElementById("datum_cf").value = "" ;
        document.getElementById("opgelost").value = "";
        
    }