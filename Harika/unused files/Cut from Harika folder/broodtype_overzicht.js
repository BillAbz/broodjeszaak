var broodtype=[];
var num;
var huidige_pagina=1;
var aantal_paginas;

// client/read
function starten() {
    //console.log(sessionStorage.getItem("token"));        
    $.ajax
    ({
        url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=broodtype",
        data: {
            "paging": {
                "page": huidige_pagina,
                "items_per_page": 10
            },
        }
    })
    .done(function(response) {
        console.log("read broodtype done:");
        console.log(response);
        broodtype = response.data.items;
        aantal_paginas = response.data.paging.page_count;
        toon_broodtype_tabel();
    })
    .fail(function (msg) {
        console.log("read fail:");
        console.log(msg);
    });
}

// client/table
function toon_broodtype_tabel() 
{
    document.getElementById('tabel').innerHTML = "";
    for (i=0; i<broodtype.length; i++) 
    {   
        if(broodtype[i].btbeeld!=null) {
            var beeld_url= '<img class="img-fluid" style="max-height:150px" alt="Responsive image" src ="'+broodtype[i].btbeeld+'">';
        console.log(beeld_url);
        } else beeld_url="";
        document.getElementById("tabel").innerHTML += '<tr>'
        +'<td>'+broodtype[i].btid+'</td> <td>'+broodtype[i].btnaam+'</td> <td>'+broodtype[i].btprijs+'</td> <td>'+beeld_url+'</td>'
        +'<td> <span class="text-left"><a class="btn btn-blue btn-sm my-0" id="verwijderen'+i+'" onclick="verwijderen('+i+')" data-toggle="modal" data-target="#verwijderen">Verwijderen</a></span>'
        +'<span class="text-left"><a class="btn btn-blue btn-sm my-0" id="bewerken'+i+'" onclick="bewerken('+i+')" data-toggle="modal" data-target="#product">Bewerken</a></span>'
        +'</td> </tr>';
    }
}

// popup/create
function toevoegen() 
{
    legen();
    document.getElementById("modalHeader").innerHTML = '<h4 class="modal-title w-100 font-weight-bold">Broodsoort toevoegen</h4>';
    document.getElementById("modalFooter").innerHTML = '<button class="btn btn-blue" onclick="bewaren_toevoegen()" data-dismiss="modal">BEWAREN</button> <button class="btn btn-blue" data-dismiss="modal">ANNULEREN</button>';
}

// client/create
function bewaren_toevoegen() 
{
    var formData = new FormData();
    var values = 
    {
        "btnaam": $("#btnaam").val(),
        "btprijs": $("#btprijs").val(),
        "btbeeld": $("#beeld_origineel").val(),
    };
    formData.set("values", JSON.stringify(values));       
    formData.set("btbeeld", $("#btbeeld")[0].files[0]);       
    
    $.ajax
    ({
        url: "https://api.data-web.be/item/create?project=fjgub4eD3ddg&entity=broodtype",
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
    document.getElementById("btnaam").value = "";
    document.getElementById("btprijs").value = "";
    document.getElementById("btbeeld").value = "";
}

// popup/update
function bewerken(num) {
    document.getElementById("modalHeader").innerHTML = '<h4 class="modal-title w-100 font-weight-bold">Broodsoort bijwerken</h4>';
    document.getElementById("modalFooter").innerHTML = '<button class="btn btn-blue" onclick="bewarenBewerken('+num+')" data-dismiss="modal">BEWAREN</button> <button class="btn btn-blue" data-dismiss="modal">ANNULEREN</button>';
    document.getElementById("btnaam").value = broodtype[num].btnaam;
    document.getElementById("btprijs").value = broodtype[num].btprijs;
    document.getElementById("beeld_origineel").value = JSON.stringify(broodtype[num].btbeeld);
}

// item/update
function bewarenBewerken(num) {
    var formData = new FormData();
    var values = {
        "btnaam": $("#btnaam").val(), 
        "btprijs": $("#btprijs").val(),
        "btbeeld": $("#beeld_origineel").val()
    };
    formData.set("values", JSON.stringify(values));         
    formData.set("filter", JSON.stringify([{"field": "btid", "operator": "=", "value": broodtype[num].btid}]));
    formData.set("btbeeld", $("#btbeeld")[0].files[0]);

    $.ajax
    ({
        url: "https://api.data-web.be/item/update?project=fjgub4eD3ddg&entity=broodtype",
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
    $.ajax
    ({
        url: "https://api.data-web.be/item/delete?project=fjgub4eD3ddg&entity=broodtype",
        type: "DELETE",
        //headers: {"Authorization": "Bearer " + sessionStorage.getItem("token")},
        data: {                
            "filter": [
                    {"field": "btid", "operator": "=", "value": broodtype[num].btid}
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
