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
        // document.location = "homepage.html";
         document.location ="bzstartpagina.html";
       
   
       
       
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
                    producten = response.data.items

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
                                    maak_tabel();
                                    //filter_producten_category();

                                })
        })
    })
}).fail(function (msg) {
        
            console.log("read fail:");
            console.log(msg);
            
        });
    

}

function  maak_tabel()
{
    document.getElementById("productendata").innerHTML="";
    for(var i=0; i<producten.length;i++)
    {
        var tabledata ="";
                
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


function filter_producten_category(num)
{
    $.ajax({
        url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=producten",
        headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
        type: "GET",
        data: {

            "filter": ["catid", "=", num],

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
                
                //const urlParams = new URLSearchParams(window.location.search);
                //const catid = urlParams.get(‘catid’);
                for(var i=0; i<prodcat1.length;i++)
            {
                       var tabledata ="";
                
                       tabledata += "<tr>";
           
                     tabledata += "<td>" + prodcat1[i].pnaam + "</td>";
                        tabledata += "<td>" + + "</td>";
                        tabledata += "<td>" + + "</td>";
            /*
            DO NOT DELETE THIS COMMENT
            tabledata += "<td>" + '<img src="https:'+assets_path + "/" + producten[i].beeld.name+'" />' + "</td>";
            */
       
            tabledata += "<td>" + `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="${prodcat1[i].datatarget}" onclick="product_gekozen(${prodcat1[i].pid})">Kueze</button>` +
                        "</td>";
            tabledata += "</tr>";

            //document.getElementById("productendata_klassieke").innerHTML += tabledata;
            document.getElementById("productendata").innerHTML += tabledata;
    }



                
            }

        })
        .fail(function (msg) {
            console.log("read fail:");
            console.log(msg);
        });

   



}




function product_gevonden(pid)
{
   
    for (i = 0; i < producten.length; i++) 
    {
            if (pid == producten[i].pid) 
            {
    
                huidig_product = producten[i];
                console.log(huidig_product);

                return;
            }
     }
}

function product_gekozen(pid)
{
    product_gevonden(pid);
   
    document.getElementById("pnaam").value = huidig_product.pnaam;


    var aantalstukjes = Number(document.getElementById("quantity").value);
    var prijs = aantalstukjes * huidig_product.prodprijs;
    console.log(prijs);
    console.log(huidig_product);
    if(huidig_product.catid==1)
    {
        
        document.getElementById("totaalprijsklassieke").value = prijs;
    }
    else if(huidig_product.catid==2)
    {

        document.getElementById("totaalprijsspeciale").value = prijs;
    }
    else if(huidig_product.catid==3)
    {
        var prijs = aantalstukjes * huidig_product.prodprijs;
        document.getElementById("totaalprijsschotel").value = prijs;
    }
    else if(huidig_product.catid==4)
    {
        var prijs = aantalstukjes * huidig_product.prodprijs;
        document.getElementById("totaalprijsdrankjes").value = prijs;
    }
    //document.getElementById("beeld").value = huidig_product.beeld;
    //json stringify

    //document.getElementById("beeldoriginal").value = JSON.stringify(huidig_product.beeld);

    //console.log(image);*/

   
}

function aantal_kiezen() {
    var count = document.getElementById("quantity").value;
    huidige_prijs = count;
    prijs = huidige_prijs;
    product_gekozen();

}

