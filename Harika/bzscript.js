var producten=[];
var category=[];
var broodsoort=[];
var broodtype=[];
var prodcat1;
var prodcat2;
var prodcat3;
var prodcat4;
var huidig_product;
//var count;

function admin_login()
{

var admin_email = document.getElementById("admin_email").value;
var admin_password = document.getElementById("admin_password").value;

$.ajax({
       
    url: "https://api.data-web.be/user/login?project=fjgub4eD3ddg",
   
    type: "POST",
    data: {
       
            "email": admin_email,
            "password": admin_password,
           
        },

})
    .done(function (response) {
        console.log(response);
        //var token_value = response.status.token
        //console.log(token_value)

        sessionStorage.setItem("token", response.status.token);
         console.log(sessionStorage);
         document.location = "bzstartpagina.html";
       
   
       
       
    })
    .fail(function (msg) {
        
        console.log("read fail:");
        console.log(msg);
        alert("ENTERED Email ID or PASSWORD IS WRONG. Please Re-Enter Values");
    });




}

function start()
{
    lees_data();
}


function lees_data() {
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
                url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=producten",
                headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
            })

                .done(function (response) {
                    console.log(response);
                    assets_path = response.data.assets_path;
                    producten = response.data.items
                    sessionStorage.setItem("token", response.status.token)
                    console.log(producten)
                    //maak_tabel()
                    filter_producten_category();

                    $.ajax({
                        method: 'GET',
                        url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=broodsoort",
                        headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
                    })
        
                        .done(function (response) {
                            console.log(response);
                            broodsoort = response.data.items
                            $.ajax({
                                method: 'GET',
                                url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=broodtype",
                                headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
                            })
                
                                .done(function (response) {
                                    console.log(response);
                                    broodtype = response.data.items
                                    assets_path = response.data.assets_path;
                                    sessionStorage.setItem("token", response.status.token)
                                    console.log(producten);
                                    maak_tabel(producten);
                                    //filter_producten_category();

                                })
        })
    })
}).fail(function (msg) {
        
            console.log("read fail:");
            console.log(msg);
            
        });
    

}

function maak_tabel(producten) {

   
    document.getElementById("productendata").innerHTML = "";
 
     for (var i = 0; i < producten.length; i++) 
     {
            var tabledata ="";
           // var catid= producten[i].catid;
        
             tabledata += "<tr>";
            
             tabledata += "<td>" + producten[i].pnaam + "</td>";
             tabledata += "<td>" + + "</td>";
             tabledata += "<td>" + + "</td>";
             /*
             DO NOT DELETE THIS COMMENT
             tabledata += "<td>" + '<img src="https:'+assets_path + "/" + producten[i].beeld.name+'" />' + "</td>";
             */
        
             tabledata += "<td>" + `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="${producten[i].datatarget}" onclick="product_gekozen(${producten[i].pid})">Kueze</button>` +
                         "</td>";
             tabledata += "</tr>";
 
             //document.getElementById("productendata_klassieke").innerHTML += tabledata;
             document.getElementById("productendata").innerHTML += tabledata;
         }
         
     }
 
     function ga_naar_category(catid, catnaam)
     {

         document.location=""+catnaam+".html?catid=" + catid;


     }


function toon_apart_data()
{
    const urlParams = new URLSearchParams(window.location.search);
    const catid = urlParams.get("catid");
    filter_producten_category(catid);
}



function filter_producten_category(catid)
{
  
         
   
            $.ajax({
            url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=producten",
            headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
            type: "GET",
            data: {

            "filter": ["catid", "=", catid]

            }
    })
        .done(function (json) {
            console.log("read done:");
            console.log(json);
            prodcat1 = json.data.items;
            console.log(prodcat1);
            if (prodcat1 == "") {

                document.getElementById("productendata").innerHTML = "<br>" + "<br>" + "<center>" + "<b>" + "Geen Records gevonden" + "</b>" + "</center>";

            }
            else {
                 
                maak_tabel(prodcat1);
                
            }

        })
        .fail(function (msg) {
            console.log("read fail:");
            console.log(msg);
        });


    }







