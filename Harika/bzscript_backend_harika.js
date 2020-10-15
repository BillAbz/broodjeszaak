var username;
var user_id;
var user_rol;
var bestellingen =[];
var huidig_product;
var besid;
var user_email;
var user_naam;
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
        document.location = "bestellingen_backend1.html";
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
        document.location = "adminaanmelden_bestellingen.html";
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
        url: "https://api.data-web.be/item/read",
        //headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
        data: {
        "project":"fjgub4eD3ddg",
        "entity":"bestelling",
            "relation": 
            [{"pri_entity":"bestelling","pri_key":"user_id","sec_entity":"user", "sec_key":"user_id"}]
        }

    })
        .done(function (response) {
            console.log(response);
            bestellingen = response.data.items;
            console.log(bestellingen);
            vernieuw_bestelling_tabel();
        }).fail(function (msg) {
            console.log("update fail:");
            console.log(msg);
        });

}
function vernieuw_bestelling_tabel() {

    document.getElementById("bestellingdata").innerHTML = "";

    for (var i = 0; i < bestellingen.length; i++) {


        if (bestellingen[i].besid !== null) {

            
           
            console.log(user_naam);
            console.log(user_email);
            var tabledata = "";
            tabledata += "<tr>";
            tabledata += "<td>" + bestellingen[i].user_id + "</td>";
            tabledata += "<td>" + bestellingen[i].user[0].naam + "</td>";
            tabledata += "<td>" + bestellingen[i].user[0].email + "</td>";
            tabledata += "<td>" + bestellingen[i].datum + "</td>";
            tabledata += "<td>" + bestellingen[i].totaal_stuks + "</td>";
            tabledata += "<td>" +"€ " +bestellingen[i].totaal_bedrag+ "</td>";
            tabledata += "<td>" + bestellingen[i].betaald + "</td>";
            tabledata += "<td>" + bestellingen[i].afgehaald + "</td>";
            
            //if(bestellingen[i].betaald=="0")
            //{

            tabledata += "<td>" + 
                `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal_details" onclick="get_bestelling_data(${bestellingen[i].besid},${user_naam},${user_email})">Bijwerken</button>` +
                "</td>";
           // }
            tabledata += "</tr>";

            document.getElementById("bestellingdata").innerHTML += tabledata;
        }
    }


}



function get_bestelling_data(besid,user_naam,user_email) 
{

    find_bestelling_data(besid);
    console.log("line 304 huidig_product",huidig_product);
    document.getElementById("user_id").value = huidig_product.user_id;
    document.getElementById("datum").value = huidig_product.datum;
    document.getElementById("totaal_stuks").value = huidig_product.totaal_stuks;
    document.getElementById("totaal_bedrag").value = huidig_product.totaal_bedrag;
    document.getElementById("betaald").value = huidig_product.betaald;
    if(huidig_product.betaald=="1")
    {
        document.getElementById("betaald").checked=true;
    }
    else
    {
        document.getElementById("betaald").checked=false;
    }



    document.getElementById("afgehaald").value = huidig_product.afgehaald;
    
    console.log("line 304 huidig_product",huidig_product);
}

function find_bestelling_data(besid) 
{
    for (i = 0; i < bestellingen.length; i++) {
        if (besid == bestellingen[i].besid) {

            huidig_product = bestellingen[i];
            console.log("in find_bestelling_data function, consoling huidig_product",huidig_product);
            //return;
        }
    }

}
function bijwerken_bestellingen() {

    huidig_product.user_id = document.getElementById("user_id").value;
    huidig_product.datum = document.getElementById("datum").value;
    huidig_product.totaal_stuks = document.getElementById("totaal_stuks").value;
    huidig_product.totaal_bedrag = document.getElementById("totaal_bedrag").value;
    huidig_product.betaald = document.getElementById("betaald").value;
    huidig_product.afgehaald = document.getElementById("afgehaald").value;
    

    vernieuw_bestelling_tabel();
    console.log(huidig_product);
    console.log(producten);


}


 function set_betaald_value()
 {
     var betaald= document.getElementById("betaald");
     if(betaald.checked)
     {
        document.getElementById("betaald").value="1"
        document.getElementById("afgehaald").value="1";
     }
     else if(!betaald.checked){
        document.getElementById("betaald").value="0"
        document.getElementById("afgehaald").value="0";
     }
 }


function BestellingenRaadplegen() {

   console.log("reaches bestellingenraadplegen function");

    var formData = new FormData();
    var id = document.getElementById("id").value;
    console.log(id);

    if (huidig_product.besid !== "") {

        console.log("reached after id not empty condition");

        huidig_product.user_id = document.getElementById("user_id").value;
        huidig_product.datum = document.getElementById("datum").value;
        huidig_product.totaal_stuks = document.getElementById("totaal_stuks").value;
        huidig_product.totaal_bedrag = document.getElementById("totaal_bedrag").value;
        huidig_product.betaald = document.getElementById("betaald").value;
        huidig_product.afgehaald=document.getElementById("afgehaald").value;
        
        
        console.log(huidig_product);
        

        var values = {
            "user_id": huidig_product.user_id,
            "datum": huidig_product.datum,
            "totaal_stuks": huidig_product.totaal_stuks,
            "totaal_bedrag": huidig_product.totaal_bedrag,
            "betaald": huidig_product.betaald,
            "afgehaald": huidig_product.afgehaald,

        };
        console.log("new values after changing in bewerken",values)
        formData.set("values", JSON.stringify(values));
        formData.set("filter", JSON.stringify(["besid", "=", huidig_product.besid]));

        //formData.set("beeld", $("#beeld")[0].files[0]);
        console.log(formData);
        $.ajax({
            url: "https://api.data-web.be/item/update?project=fjgub4eD3ddg&entity=bestelling",
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

   
        read_items();

    }

    function OnclickofBestellingenOpvolgen()
    {
        document.getElementById("user_id").value="";
        document.getElementById("datum").value="";
        document.getElementById("totaal_stuks").value="";
        document.getElementById("totaal_bedrag").value="";
        document.getElementById("betaald").value="";
        document.getElementById("geleverd").value="";
        
    }