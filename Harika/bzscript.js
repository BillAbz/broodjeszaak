var producten=[];
var category=[];
<<<<<<< HEAD
var broodsoort=[];
var broodtype=[];
var prodcat1;
var prodcat2;
var prodcat3;
var prodcat4;
=======
var prodcat1=[];
var prodcat2=[];
var prodcat3=[];
var prodcat4=[];
>>>>>>> fa9d8416933acd98fb2ba244b07fe305494c6a2b
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

<<<<<<< HEAD
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
=======
                })
        }) .fail(function (msg) {
>>>>>>> fa9d8416933acd98fb2ba244b07fe305494c6a2b
        
            console.log("read fail:");
            console.log(msg);
            
        });
    

}

function filter_producten_category()
{
  
         
   
            $.ajax({
            url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=producten",
            headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
            type: "GET",
            data: {

            "filter": [["catid", "=", "1"]],

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
                 
                
                var datatarget="#klassieke_details";
                maak_tabel(prodcat1,datatarget);
            }

        })
        .fail(function (msg) {
            console.log("read fail:");
            console.log(msg);
        });

<<<<<<< HEAD

function filter_producten_category(num)
{
    $.ajax({
        url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=producten",
        headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
        type: "GET",
        data: {

            "filter": ["catid", "=", num],

        }
=======
        $.ajax({
            url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=producten",
            headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
            type: "GET",
            data: {

            "filter": [["catid", "=", "2"]],

            }
>>>>>>> fa9d8416933acd98fb2ba244b07fe305494c6a2b
    })
        .done(function (json) {
            console.log("read done:");
            console.log(json);
<<<<<<< HEAD
            prodcat1 = json.data.items;
            console.log(prodcat1);
            if (prodcat1 == "") {
=======
            prodcat2 = json.data.items;
            console.log(prodcat2);
            if (prodcat2 == "") {
>>>>>>> fa9d8416933acd98fb2ba244b07fe305494c6a2b

                document.getElementById("productendata").innerHTML = "<br>" + "<br>" + "<center>" + "<b>" + "Geen Records gevonden" + "</b>" + "</center>";

            }
            else {
                
<<<<<<< HEAD
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

=======
                var datatarget="#speciale_details";
                maak_tabel(prodcat2,datatarget);
            }

>>>>>>> fa9d8416933acd98fb2ba244b07fe305494c6a2b
        })
        .fail(function (msg) {
            console.log("read fail:");
            console.log(msg);
        });
<<<<<<< HEAD

   



}
=======
>>>>>>> fa9d8416933acd98fb2ba244b07fe305494c6a2b

        $.ajax({
            url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=producten",
            headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
            type: "GET",
            data: {

            "filter": [["catid", "=", "3"]],

<<<<<<< HEAD

function product_gevonden(pid)
{
   
    for (i = 0; i < producten.length; i++) 
    {
            if (pid == producten[i].pid) 
            {
    
                huidig_product = producten[i];
                console.log(huidig_product);
=======
            }
    })
        .done(function (json) {
            console.log("read done:");
            console.log(json);
            prodcat3 = json.data.items;
            console.log(prodcat3);
            if (prodcat3 == "") {

                document.getElementById("productendata").innerHTML = "<br>" + "<br>" + "<center>" + "<b>" + "Geen Records gevonden" + "</b>" + "</center>";
>>>>>>> fa9d8416933acd98fb2ba244b07fe305494c6a2b

            }
            else {
                
                var datatarget="#koudeschotel_details";
                
                maak_tabel(prodcat3,datatarget);
            }

        })
        .fail(function (msg) {
            console.log("read fail:");
            console.log(msg);
        });

        $.ajax({
            url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=producten",
            headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
            type: "GET",
            data: {

            "filter": [["catid", "=", "4"]],

            }
    })
        .done(function (json) {
            console.log("read done:");
            console.log(json);
            prodcat4 = json.data.items;
            console.log(prodcat4);
            if (prodcat4 == "") {

                document.getElementById("productendata").innerHTML = "<br>" + "<br>" + "<center>" + "<b>" + "Geen Records gevonden" + "</b>" + "</center>";

            }
            else {
             
                var datatarget="#drankjes_details";
                maak_tabel(prodcat4,datatarget);
            }

        })
        .fail(function (msg) {
            console.log("read fail:");
            console.log(msg);
        });

}


function maak_tabel(prodcat,datatarget)
{
    
    document.getElementById("productendata").innerHTML = "";

    for(i=0;i<prodcat.length;i++)
    {
        if (producten[i].pid !== null) 
        {

            var tabledata = "";
     
           tabledata += "<tr>";
           
        tabledata += "<td>" + prodcat[i].pnaam + "</td>";
        tabledata += "<td>" + + "</td>";
        tabledata += "<td>" + + "</td>";
        
        //DO NOT DELETE THIS COMMENT
        //tabledata += "<td>" + '<img src="https:'+assets_path + "/" + producten[i].beeld.name+'" />' + "</td>";
        
   
        tabledata += "<td>" + `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target= ${datatarget} onclick="product_gekozen(${prodcat[i].pid})">Kueze</button>` +"</td>";
        
        tabledata += "</tr>";

        document.getElementById("productendata").innerHTML += tabledata;



    }

    }



}



<<<<<<< HEAD
=======
/*function maak_tabel() {

   document.getElementById("productendata").innerHTML = "";

    for (var i = 0; i < producten.length; i++) 
    {


        if (producten[i].pid !== null) 
        {

            var tabledata = "";
            var catid = producten[i].catid;

            if(catid==3)
            {

                tabledata += "<tr>";
           
                tabledata += "<td>" + producten[i].pnaam + "</td>";
                tabledata += "<td>" + + "</td>";
                tabledata += "<td>" + + "</td>";
                
                //DO NOT DELETE THIS COMMENT
                //tabledata += "<td>" + '<img src="https:'+assets_path + "/" + producten[i].beeld.name+'" />' + "</td>";
                
           
                tabledata += "<td>" + `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#koudeschotel_details" onclick="product_gekozen(${producten[i].pid})">Kueze</button>` +
                            "</td>";
                tabledata += "</tr>";

                document.getElementById("productendata").innerHTML += tabledata;
            
            }

            else if(catid==4)
            {
            
            
                tabledata += "<tr>";
           
                tabledata += "<td>" + producten[i].pnaam + "</td>";
                tabledata += "<td>" + + "</td>";
                tabledata += "<td>" + + "</td>";
                
                //DO NOT DELETE THIS COMMENT
                //tabledata += "<td>" + '<img src="https:'+assets_path + "/" + producten[i].beeld.name+'" />' + "</td>";
                
           
                tabledata += "<td>" + `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#drankjes_details" onclick="product_gekozen(${producten[i].pid})">Kueze</button>` +
                            "</td>";
                tabledata += "</tr>";

                document.getElementById("productendata").innerHTML += tabledata;
            }
        }
    }


}*/

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
    document.getElementById("totaalprijsdrankjes").value = prijs;
    
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

$(function () {
    var selectedClass = "";
    $(".filter").click(function () {
      selectedClass = $(this).attr("data-rel");
      $("#gallery").fadeTo(100, 0.1);
      $("#gallery div").not("." + selectedClass).fadeOut().removeClass('animation');
      setTimeout(function () {
        $("." + selectedClass).fadeIn().addClass('animation');
        $("#gallery").fadeTo(300, 1);
      }, 300);
    });
  });
>>>>>>> fa9d8416933acd98fb2ba244b07fe305494c6a2b
