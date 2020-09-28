//var producten=[];
var producten;
var category;
var broodsoort;
var broodtype;
var prodcat1;
var prodcat2;
var prodcat3;
var prodcat4;
var huidig_product;
var total_selected_products_amount=0;

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
         document.location = "bzstartpagina1.html";
       
   
       
       
    })
    .fail(function (msg) {
        
        console.log("read fail:");
        console.log(msg);
        alert("ENTERED Email ID or PASSWORD IS WRONG. Please Re-Enter Values");
    });




}



function start()
{   
    const urlParams = new URLSearchParams(window.location.search);
    const catid = urlParams.get("catid");

    if(catid!="")
    {
        filter_producten_category(catid); 
    }
    
    filter_producten_category(catid);
   
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
                                    

                                })
        })
    })
}).fail(function (msg) {
        
            console.log("read fail:");
            console.log(msg);
            
        });
    

}

function maak_tabel(producten) {

   console.log(producten);
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

         document.location="producten1.html?catid=" + catid;


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

            //"filter": ["catid", "=", catid]
            "filter": ["catid", "like", "%" + catid + "%"]

            }
    })
        .done(function (json) {
            console.log("read done:");
            console.log(json);
            //prodcat1 = json.data.items;
            producten=json.data.items;
           
            
           //console.log(prodcat1);
           console.log(producten);
           //if (prodcat1 == "") 
           if(producten=="")
            {

                document.getElementById("productendata").innerHTML = "<br>" + "<br>" + "<center>" + "<b>" + "Geen Records gevonden" + "</b>" + "</center>";

            }
            else {
                 
                maak_tabel(producten);
               //maak_tabel(prodcat1);
               //maak_tabel_paginas(prodcat1);

                
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
    
                    //return;
                }
         }
    }
    
    
    
    function product_gekozen(pid)
    {
        product_gevonden(pid);
        console.log(huidig_product);

        
        document.getElementById("knaam").value = huidig_product.pnaam;
      
      
        document.getElementById("snaam").value = huidig_product.pnaam; 
      
      
        document.getElementById("ksnaam").value = huidig_product.pnaam;
        var aantalstukjes = Number(document.getElementById("ksquantity").value);
        var prijs = aantalstukjes * huidig_product.prodprijs;
        console.log(prijs);
        //console.log(huidig_product);
        document.getElementById("kstotaalprijs").value = prijs;
      
        document.getElementById("dnaam").value = huidig_product.pnaam;
        var aantalstukjes = Number(document.getElementById("dquantity").value);
        var prijs = aantalstukjes * huidig_product.prodprijs;
        console.log(prijs);
        //console.log(huidig_product);
        document.getElementById("dtotaalprijs").value = prijs;
    
    
        
        
        //document.getElementById("beeld").value = huidig_product.beeld;
        //json stringify
    
        //document.getElementById("beeldoriginal").value = JSON.stringify(huidig_product.beeld);
    
        //console.log(image);
    
       
    }




    function aantal_kiezen(pgnum) {


       if(pgnum==3)
       {
        var count = document.getElementById("ksquantity").value
        huidige_prijs = count;
        prijs = huidige_prijs;
        product_gekozen();
       }


        else if(pgnum==4)
        {

        var count = document.getElementById("dquantity").value
        huidige_prijs = count;
        prijs = huidige_prijs;
        product_gekozen();
    
       }


}

/*THE BELOW FUNCTION WILL INCREMENT THE ORDER NUMBER NEXT TO WINKEL WAGENTJE*/
function toevoeg_winkel_waagentje()
{
    var gekozen_dnaam=document.getElementById("dnaam").value;
    var gekozen_dquantity=document.getElementById("dquantity").value;
    var gekozen_dtotaalprijs=document.getElementById("dtotaalprijs").value;
    total_selected_products_amount++;
    document.getElementById("antaal_producten").innerHTML=total_selected_products_amount; 
} 


/*var gekozen_product_array = [{gekozen_dnaam:"blabla",gekozen_dquantity:'3',gekozen_dtotaalprijs:'30'},]

function toevoeg_winkel_waagentje()
{
    var gekozen_dnaam=document.getElementById("dnaam").value;
    var gekozen_dquantity=document.getElementById("dquantity").value;
    var gekozen_dtotaalprijs=document.getElementById("dtotaalprijs").value;
    total_selected_products_amount++;
    document.getElementById("antaal_producten").innerHTML=total_selected_products_amount; 
}*/








/*function product_gekozen(pid)
    {
        product_gevonden(pid);
        console.log(huidig_product);

        if(huidig_product.catid==1)
       {
        document.getElementById("knaam").value = huidig_product.pnaam;
       }
       else if(huidig_product.catid==2)
       {
        document.getElementById("snaam").value = huidig_product.pnaam; 
       }
       else if(huidig_product.catid==3)
       {
        document.getElementById("ksnaam").value = huidig_product.pnaam;
        var aantalstukjes = Number(document.getElementById("ksquantity").value);
        var prijs = aantalstukjes * huidig_product.prodprijs;
        console.log(prijs);
        //console.log(huidig_product);
        document.getElementById("kstotaalprijs").value = prijs;
       }
       else if(huidig_product.catid==4)
       {
        document.getElementById("dnaam").value = huidig_product.pnaam;
        var aantalstukjes = Number(document.getElementById("dquantity").value);
        var prijs = aantalstukjes * huidig_product.prodprijs;
        console.log(prijs);
        //console.log(huidig_product);
        document.getElementById("dtotaalprijs").value = prijs;
       }
    
        
        
        //document.getElementById("beeld").value = huidig_product.beeld;
        //json stringify
    
        //document.getElementById("beeldoriginal").value = JSON.stringify(huidig_product.beeld);
    
        //console.log(image);
    
       
    }*/