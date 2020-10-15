var producten1;
var category;
var broodsoort=[];
var broodtype=[];
var huidig_product;
var verwijder_huidig_product;
var date = new Date();
var date1 = date.getDate();
var month1 = date.getMonth() + 1; // Since getMonth() returns month from 0-11 not 1-12
var year1 = date.getFullYear();
var huidig_date=year1 + "/" + month1 + "/" + date1;
console.log(day);
var broodsoort_gekozen ;
var broodtype_gekozen ;
var broodsoort_gekozen_id;
var broodtype_gekozen_id;
var broodsoort_gekozen_naam;
var broodtype_gekozen_naam;
var broodsoort_gekozen_prijs;
var broodtype_gekozen_prijs;
var smos_gekozen=0;
var smos_gekozen_id;
var smos_gekozen_naam;
var smos_gekozen_prijs;
var aantaal_bestellingen=0;
var total_prijs;
var voor_korting_prijs;
var rowid=1;
var browid=1;
var final_bedrag=0.0;
var userdata;
var username;
var user_id;
var user_telefoonnummer;
var total_no_of_products;

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
    var rol = "klant";

    console.log(suggesties);

    $.ajax({
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
    }).done(function (response) {
        console.log("registiration done:");
        console.log(response);
        
    }).fail(function (msg) {
        console.log("registiration fail:");
        console.log(msg);
    });
}



function inloggen() {
    var email = document.getElementById("login_email").value;
    var password = document.getElementById("login_wachtwoord").value;
    var errormessage = document.getElementById("error_message");
    var error_text;
    //alert(email);

    //errormessage.style.padding="10px";

    if(email=="" && password=="")
    {
        error_text="vul het e-mailadres en wachtwoord in alstublieft";
        errormessage.innerHTML=error_text;
       
    }
    else if(email=="")
    {
        error_text="vul het e-mailadres in alstublieft";
        errormessage.innerHTML=error_text;
        
    }
    else if(password=="")
    {
        error_text="Voer wachtwoord in alstublieft";
        errormessage.innerHTML=error_text;
       
    }
    else
    {
    const urlParams1 = new URLSearchParams(window.location.search);
    const directed_from = urlParams1.get("directed_from");
    //const urlParams2 = new URLSearchParams(window.location.search);
    //const came_from = urlParams2.get("came_from");
  
    
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
        if(directed_from=="wagentje1")
        {
            document.location = "wagentje1.html";
        }
        else if(directed_from=="contact1")
        {
            document.location = "contact1.html";
        }
        else
        {
            document.location= "producten1.html?catid=";
        }
        
        //document.location = "producten1.html?catid=";
        
    })
    .fail(function (msg) {
        console.log("registiration fail:");
        console.log(msg);
        error_text="Ingevoerd e-mailadres of wachtwoord is onjuist. Voer de waarden opnieuw in!";
        errormessage.innerHTML=error_text;
    });
    
}
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
               sessionStorage.setItem("userdata", JSON.stringify( response.data.items[0]));
               userdata=JSON.parse(sessionStorage.getItem("userdata"));

            
        toon_gebruiker_naam(); 

    }).fail(function (msg) {
        console.log("read fail:");
        console.log(msg);
    });
}
function haalWinkelwagentjeOp() {    
        
    toon_aantal_bestellingen();            
    
    var winkelwagentje = JSON.parse(sessionStorage.getItem("winkelwagentje"));    
    
   

    if (winkelwagentje == null) {
        winkelwagentje =[];
    }
    console.log(winkelwagentje);
    
    return winkelwagentje;
} 


function toon_gebruiker_naam()
{
    var token_check= sessionStorage.getItem("token");
    //console.log(username);
    console.log(sessionStorage);
    if(token_check!=null)
    {
        document.getElementById("gebruikersnaam").style.display = "block";
        document.getElementById("gebruikersnaam").innerHTML= `<a class="nav-link dropdown-toggle" href="#" role="button" value= ""  data-toggle="dropdown">${userdata.naam}<br>(Klant nummer: ${userdata.user_id})</a>
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
    var winkelwagentje = haalWinkelwagentjeOp();
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
        document.location = "aanmelden1.html";
    })
    .fail(function (msg) {
        console.log("read fail:");
        console.log(msg);
    });
}


function start()
{   
    const urlParams = new URLSearchParams(window.location.search);
    const catid = urlParams.get("catid");  //"" or 1 or 2 or 3 or 4

    //If catid!="" go to either of klassieke or speciale or koudeschotels or drankjes
    var token_check= sessionStorage.getItem("token");
    console.log(username);
    console.log(sessionStorage);
    
        if(catid!="")
       {
        fill_contact_formulier(); 
       }
    
       fill_contact_formulier(); //else got to alle producten
   
 
}
function contactformulier_validatie()
{
    document.getElementById("formulier_warning_0").innerHTML= "";
    document.getElementById("formulier_warning_1").innerHTML= "";
    document.getElementById("formulier_warning_2").innerHTML= "";
    //document.getElementById("formulier_warning_3").innerHTML= "";
    //document.getElementById("formulier_warning_4").innerHTML= "";
    document.getElementById("formulier_warning_3").innerHTML= "";
    var validate= true;
    var form = $("#formulierform");
    $('input', form).each(function(index) {
        if ($(this)[0].checkValidity() == false) 
        {
        document.getElementById("formulier_warning_"+index).innerHTML= '<small class="form-text text-muted mb-4">Gelieve hier geldig in te vullen!</small>'
        validate= false; 
        }
    })
    if (validate==true)
    {
        contactformulier()
    }
}

function contactformulier() {
    var contactuserid = "";
    var contactbestellingid = "";
    var datum_bestelling = "";
    if(document.getElementById("klantnummer") !== null){
        var contactuserid = document.getElementById("klantnummer").value;
        var contactbestellingid = document.getElementById("ordernummer").value;
        var datum_bestelling = document.getElementById("bestellingdatum").value;
    }

            
            var contactnaam = document.getElementById("defaultContactFormName").value;
            var contactemail = document.getElementById("defaultContactFormEmail").value;
            var contacttelefoon = document.getElementById("defaultContactFormTel").value;
            var contactomschrijving = document.getElementById("vraag").value;
            var datum = new Date();
            
            
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.data-web.be/item/create?project=fjgub4eD3ddg&entity=contactformulier&token_required=false",
        "method": "POST",
        "headers": {},
        "data": {
            "values": `{\"naam\" : \"${contactnaam}\", \"email\" : \"${contactemail}\", \"telefoonnummer\" : \"${contacttelefoon}\", 
            \"omschrijving\" : \"${contactomschrijving}\", \"user_id\" : \"${contactuserid}\", \"besid\" : \"${contactbestellingid}\",
            \"datum_bestelling\" : \"${datum_bestelling}\", \"datum_cf\" : \"${huidig_date}\"}`        
        }
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        var cfid = response.data.cfid;
        console.log(cfid);
      })

            .fail(function (msg) 
            {
                    console.log("read fail:");
                    console.log(msg);
            });





    }

    






function get_vraag_selectie_value()
{
    var c_option =document.getElementById("defaultContactFormInfo").value;
    if (c_option==2 || c_option == 3)
        {
            document.getElementById("bestellingnummer").innerHTML = `
            
            <label for="ordernummer"> Voer uw bestelnummer in </label> <input type="text" id="ordernummer" name="ordernummer"></input>    
            <br> 
            <div id="formulier_warning_3"></div>  
            <br>
            <label for="klantnummer"> Voer uw klant nummer in </label>  <input type="text" id="klantnummer" name="klantnummer"></input>
            <br>
            <div id="formulier_warning_4"></div>
            <br>
            <label for="bestellingdatum"> Voer uw datum van bestelling in (yyyy/mm/dd) </label>  <input type="text" id="bestellingdatum" name="bestellingdatum"></input>
               
            
            `;
           
          
        }
    else{
        document.getElementById("bestellingnummer").innerHTML = "";
    }
}

