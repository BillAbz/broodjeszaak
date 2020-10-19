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
    var rol = "klant";
    var suggesties= document.getElementById("suggesties");
    if(suggesties.checked)
    {
        suggesties="1"
    }
    else {
        suggesties="0";
    }

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
        var email_bestaat=msg.responseJSON.status.message;
        
        if (email_bestaat=="400: User with this email already exists.")
        {
            waarschuwing_modal("email");
        }
    });
}

function waarschuwing_modal(warning)
{   
    $("#waarschuwingModal").modal();
    var warning;

    if (warning=="password")
    {
        document.getElementById("waarschuwingModalLabel").innerHTML='<h3 class="modal-title" id="waarschuwingModalLabel">Wachtwoord of e-mail onjuist?</h3>';
        document.getElementById("waarschuwingModalBody").innerHTML= '<p>Het ngevoerd e-mailadres of wachtwoord is onjuist. Voer de waarden opnieuw in!</p>';
    } 
    else if (warning=="email")
    {
        document.getElementById("waarschuwingModalLabel").innerHTML='<h3 class="modal-title" id="waarschuwingModalLabel">E-mailadres bestaat al?</h3>';
        document.getElementById("waarschuwingModalBody").innerHTML= '<p>Het ingevoerde e-mailadres bestaat al. Voer een ander e-mailadres in!</p>';
    }
    else if (warning=="login")
    {
        document.getElementById("waarschuwingModalLabel").innerHTML='<h3 class="modal-title" id="waarschuwingModalLabel">Nog niet ingelogd?</h3>';
        document.getElementById("waarschuwingModalBody").innerHTML= '<p>Log in om verder te gaan, aub!</p>';
    }
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
    
    //const urlParams1 = new URLSearchParams(window.location.search);
    //const directed_from = urlParams1.get("directed_from");
    
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
        console.log(response);
        controleer_admin(email);
        
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

 function controleer_admin(useremail)
{
    
    //var useremail= sessionStorage.getItem("gebruiker");
    $.ajax
    ({
        method: 'GET',
        url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=user",
        //headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
        data:
        {
                "filter": ["email", "like", "%" + useremail + "%"]
        }
    })
    .done(function (response) {
        console.log(response);
        userdata=response.data.items;
        
                
        user_rol=response.data.items[0].rol;
        console.log(user_rol);
        
        if(user_rol=="admin")
        {
            console.log("log in done:");
            username=response.data.items[0].naam;
                user_id=response.data.items[0].user_id;
                //sessionStorage.setItem("token", response.status.token);
                console.log(sessionStorage.getItem("token"));
                sessionStorage.setItem("username",username);
                sessionStorage.setItem("user_id",user_id);
                sessionStorage.setItem("user_rol",user_rol);
        console.log(response);
        sessionStorage.setItem("token", response.status.token);
        sessionStorage.setItem("gebruiker", email);
       
        document.location = 'producten_overzicht.html'
        console.log(sessionStorage);
        
        }

    }).fail(function (msg) {
        console.log("read fail:");
        console.log(msg);
    });
}

function krijg_naam()
{
    return sessionStorage.getItem("token");

}

 function toon_gebruiker_naam()
{
    token_check = krijg_naam()
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


function sessionControl()
{
    var token=sessionStorage.getItem("token")  
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.data-web.be/user/validate_token?project=fjgub4eD3ddg",
        "method": "GET",
        "headers": {
             "Authorization": "Bearer " + token
        }
      }
      
      $.ajax(settings).done(function (response) {
        console.log(response);
        //document.location="producten_overzicht.html"

    }).fail(function (msg) {
        console.log("read fail:");
        console.log(msg);
       document.location="admin_aanmelden.html"
    });
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
        document.location = "admin_aanmelden.html";
    })
    .fail(function (msg) {
        console.log("read fail:");
        console.log(msg);
    });
}
