//var producten=[];
var producten;
var category;
//var broodsoort;
//var broodtype;
var broodsoort=[];
var broodtype=[];
var prodcat1;
var prodcat2;
var prodcat3;
var prodcat4;
var huidig_product;
var total_selected_products_amount=0;
var brood_type_selected_value;
var brood_soort_selected_value;
var smos_prijs;
var bs_prijs;
var bt_prijs;

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
/* 

function lees_data() {
    $.ajax({
        method: 'GET',
        url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=category",
        //headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },

    })
        .done(function (response) {

            category = response.data.items
            console.log(category)

            $.ajax({
                method: 'GET',
                url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=producten",
                //headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
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
                        //headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
                    })
        
                        .done(function (response) {
                            console.log(response);
                            broodsoort = response.data.items
                            $.ajax({
                                method: 'GET',
                                url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=broodtype",
                                //headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
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
 */
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


    
 
     function ga_naar_category(catid)
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
            //headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
            type: "GET",
            data: {

            //"filter": ["catid", "=", catid]
            "filter": ["catid", "like", "%" + catid + "%"]
            }
        }).done(function (json) {
            console.log("read done:");
            console.log(json);
            //prodcat1 = json.data.items;
            producten=json.data.items;
           //console.log(producten);
           
           if(producten=="")
            {

                document.getElementById("productendata").innerHTML = "<br>" + "<br>" + "<center>" + "<b>" + "Geen Records gevonden" + "</b>" + "</center>";

            }
            else 
            {
                 
                maak_tabel(producten);
               
                if(catid == "" || catid =="1" || catid =="2")
                {
                    $.ajax({
                        method: 'GET',
                        url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=broodsoort",
                        //headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
                    })
        
                        .done(function (response) {
                            console.log(response);
                            broodsoort = response.data.items
                            $.ajax({
                                method: 'GET',
                                url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=broodtype",
                                //headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
                            }).done(function (response) {
                                    console.log(response);
                                    broodtype = response.data.items
                                    //assets_path = response.data.assets_path;
                                    //sessionStorage.setItem("token", response.status.token)
                                    update_broodjes_modal(broodsoort, broodtype);
                            }).fail(function (msg) {
        
                                console.log("read fail:");
                                console.log(msg);
                                
                            });
                        })
                }
            }                
    })


                            //update_broodjes_modal();
        }
               //maak_tabel(prodcat1);
               //maak_tabel_paginas(prodcat1);

                
          
function update_broodjes_modal(bsoort, btype)
{   
    document.getElementById('bsid').innerHTML="";
    document.getElementById('btid').innerHTML="";
    document.getElementById('sbsid').innerHTML="";
    document.getElementById('sbtid').innerHTML="";

    for (let i = 0; i < bsoort.length; i++) {

        document.getElementById('bsid').innerHTML +=`
        
        <img src="${bsoort[i].bsbeeld}" class="figure-img img-fluid z-depth-1" style="max-width: 100px" alt="Responsive image">
        <input type="radio" id="${bsoort[i].bsid}" name="BroodSoort" value="${bsoort[i].bsprijs}" onclick="get_radio_button_value_broodsoort()">${bsoort[i].bsnaam} <br>
                `
    }

    for (let i = 0; i < btype.length; i++)
    {
        document.getElementById('btid').innerHTML +=`
        
        <img src="${btype[i].btbeeld}" class="figure-img img-fluid z-depth-1" style="max-width: 100px" alt="Responsive image">
        <input type="radio" id="${btype[i].btid}" name="BroodType" value="${btype[i].btprijs}" onclick="get_radio_button_value_broodtype()">${btype[i].btnaam} <br>
                                    `
    }
    for (let i = 0; i < bsoort.length; i++) {

        document.getElementById('sbsid').innerHTML +=`
       
        <img src="${bsoort[i].bsbeeld}" class="figure-img img-fluid z-depth-1" style="max-width: 100px" alt="Responsive image">
        <input type="radio" id="${bsoort[i].bsid}" name="BroodSoort" value="${bsoort[i].bsprijs}" onclick="get_radio_button_value_broodsoort()">${bsoort[i].bsnaam} <br>
                `
    }
    for (let i = 0; i < btype.length; i++)
    {
        document.getElementById('sbtid').innerHTML +=`
        
        <img src="${btype[i].btbeeld}" class="figure-img img-fluid z-depth-1" style="max-width: 100px" alt="Responsive image">
        <input type="radio" id="${btype[i].btid}" name="BroodType" value="${btype[i].btprijs}" onclick="get_radio_button_value_broodtype()">${btype[i].btnaam} <br>
                                    `
    }


}
  

    

    function get_radio_button_value_broodsoort()
{
    
    var brood_soort= document.getElementsByName("BroodSoort");

    for (let index = 0; index < brood_soort.length; index++) {

        if(brood_soort[index].checked)
    {
             brood_soort_selected_value = brood_soort[index].value;
             console.log(brood_soort_selected_value);

    }
}  
     console.log(brood_soort_selected_value);    
     bs_prijs= haal_brood_soort(brood_soort_selected_value);
     console.log(bs_prijs);



}



function get_radio_button_value_broodtype() 
{
     
    var brood_type=document.getElementsByName("BroodType");

    for (let j = 0; j < brood_type.length; j++) {
        if(brood_type[j].checked)
        {
            brood_type_selected_value = brood_type[j].value;
            console.log(brood_type_selected_value);
    
        }
        
    }

    bt_prijs=haal_brood_type(brood_type_selected_value); 
    

}
  
 function get_radio_button_value_smos()
 {
   
       var smos_gekozen = document.getElementsByName("smosselected");
       if(smos_gekozen[0].checked)
       {
           smos_prijs=0;
       }
       else if(smos_gekozen[1].checked)
       {
           smos_prijs=0.70;
       }
 
   }

/*function haal_brood_soort(checked_broodsoort) 
{
    checked_broodsoort;
    for (var i = 0; i < broodsoort.length; i++)
    {
        if (broodsoort[i].bsid == checked_broodsoort)
         {
            console.log("works");
           // bs_prijs=broodsoort[i].bsprijs;
            return broodsoort[i].bsprijs;
            //console.log(bs_prijs);

        }

    }

}
function haal_brood_type(checked_broodtype)
 {  
    checked_broodtype;
    console.log(checked_broodtype);
    for (var i = 0; i < broodtype.length; i++)
     {
        if (broodtype[i].btid == checked_broodtype)
         {
            console.log("works");
            //bt_prijs=broodtype[i].btprijs;
            return broodtype[i].btprijs;
            //console.log(bt_prijs);

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
    
                    //return;
                }
         }
    }
    
    
    
    function product_gekozen(pid)
    {
        product_gevonden(pid);
        console.log(huidig_product);

        if(huidig_product.catid==1)
        {
                document.getElementById("knaam").value = huidig_product.pnaam;
                document.getElementById("ktotaalprijs").value = huidig_product.prodprijs;
                var beleg_prijs= huidig_product.prodprijs;
                var sandwich_prijs = bs_prijs + bt_prijs + beleg_prijs + smos_prijs;
                var aantalstukjes = Number(document.getElementById("kquantity").value);
                var prijs = aantalstukjes * sandwich_prijs;
                document.getElementById("ktotaalprijs").value = prijs;
        }
        else if(huidig_product.catid==1)
        { 
                document.getElementById("snaam").value = huidig_product.pnaam; 
                document.getElementById("snaam").value = huidig_product.pnaam; 
                 document.getElementById("stotaalprijs").value = huidig_product.prodprijs;
                var beleg_prijs= huidig_product.prodprijs;
                var sandwich_prijs = bs_prijs + bt_prijs + beleg_prijs + smos_prijs;
                var aantalstukjes = Number(document.getElementById("squantity").value);
                var prijs = aantalstukjes * sandwich_prijs;
             document.getElementById("stotaalprijs").value = prijs;

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
    
       
    }




    function aantal_kiezen(pgnum) {

        if(pgnum==1)
       {
        var count = document.getElementById("kquantity").value
        huidige_prijs = count;
        prijs = huidige_prijs;
        product_gekozen();
       }


        else if(pgnum==2)
        {
         var count = document.getElementById("squantity").value
         huidige_prijs = count;
         prijs = huidige_prijs;
         product_gekozen();
        }



       else if(pgnum==3)
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