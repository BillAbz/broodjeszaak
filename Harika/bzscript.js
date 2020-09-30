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
var checked_broodsoort;
var checked_broodtype;
var checked_smos;
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
                    //var producten = response.data.items;
                    sessionStorage.setItem("token", response.status.token)
                    console.log(producten)
                    //maak_tabel()
                    //filter_producten_category();

                    $.ajax({
                        method: 'GET',
                        url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=broodsoort",
                        //headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
                    })
        
                        .done(function (response) {
                            console.log(response);
                            broodsoort = response.data.items
                            console.log(broodsoort)
                            $.ajax({
                                method: 'GET',
                                url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=broodtype",
                                //headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
                            })
                
                                .done(function (response) {
                                    console.log(response);
                                    broodtype = response.data.items
                                    console.log(broodtype)
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

   console.log(producten);
    document.getElementById("productendata").innerHTML = "";
  //array prodcat1
  //array producten
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

         //document.location="producten.html?catid=" + catid;
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
            //headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
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

    /*
    var checked_broodsoort;
var checked_broodtype;
var checked_smos;
    */
  function haal_broodjes_prijs(arr,id,waarde,prijs)
  {
      console.log(arr,id,waarde,prijs);
    id;
    prijs;
    for (var i = 0; i < arr.length; i++) 
    {
        if (arr[i].id === waarde)
         {
             console.log('works')
            console.log(arr[i].prijs);
            return arr[i].prijs;

        }

    }

  }

  function radio_waard_teruggeven(divID)
  {        
    let radio_form= document.getElementById(divID);

    for (let i = 1; i <=  radio_form.children.length; i++)
     {
        if(document.getElementById(divID+i).checked)
        {
            if(divID=='sbsid')
            {
                checked_broodsoort = document.getElementById(divID+i).value;
            } 
            else if(divID=='sbtid')
            {
                checked_broodtype = document.getElementById(divID+i).value;
            } 
            else if(divID=='smos')
            {
                checked_smos = document.getElementById(divID+i).value;
            }
        }
    }        
    /*console.log(checked_broodsoort);
    console.log(checked_broodtype);
    console.log(checked_smos);

            var brood_type_prijs = haal_broodjes_prijs(broodtype,'btid',checked_broodtype,'btprijs');
            var brood_type_soort = haal_broodjes_prijs(broodsoort,'bsid',checked_broodsoort, 'bsprijs');
            var total_prijs = Number(brood_type_prijs) + Number(brood_type_soort);
            console.log(total_prijs);*/
}
 

function haal_brood_soort(checked_broodsoort) 
{

    for (var i = 0; i < broodsoort.length; i++)
    {
        if (broodsoort[i].bsid == checked_broodsoort)
         {
            return broodsoort[i].bsprijs;

        }

    }

}

function haal_brood_type(checked_broodtype)
 {

    for (var i = 0; i < broodtype.length; i++)
     {
        if (broodtype[i].btid == checked_broodtype)
         {
            return broodtype[i].btprijs;

        }

    }
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

        if(huidig_product.catid==1)
       {
        document.getElementById("knaam").value = huidig_product.pnaam;
        var bs_prijs= haal_brood_soort(checked_broodsoort);
        var bt_prijs= haal_brood_type(checked_broodtype);
        var beleg_prijs= huidig_product.prodprijs;
        var sandwich_prijs = bs_prijs + bt_prijs + beleg_prijs;
        var aantalstukjes = Number(document.getElementById("kquantity").value);
        var prijs = aantalstukjes * sandwich_prijs;
        document.getElementById("ktotaalprijs").value = prijs;
       }

       else if(huidig_product.catid==2)
       {
            document.getElementById("snaam").value = huidig_product.pnaam; 
            var bs_prijs= haal_brood_soort(checked_broodsoort);
            var bt_prijs= haal_brood_type(checked_broodtype);
            var beleg_prijs= huidig_product.prodprijs;
            var sandwich_prijs = bs_prijs + bt_prijs + beleg_prijs;
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
















  /* function haal_brood_soort() {

        for (var i = 0; i < broodsoort.length; i++) {
            if (broodsoort[i].bsid == checked_broodsoort) {
                return broodsoort[i].bsprijs;
    
            }
    
        }
    
    }
    function haal_brood_type() {

        for (var i = 0; i < broodtype.length; i++) {
            if (broodtype[i].btid == checked_broodtype) {
                return broodtype[i].btprijs;
    
            }
    
        }
    
    }*/








/*function radio_waard_teruggeven(id)
{
    document.getElementById(id).checked=true;
}



function radio_waard_teruggeven(radio_check)
{
    for(var i=1;i<4;i++)
    
    if(document.getElementById(radio_check + i )!=null)
    {
        document.getElementById(radio_check + i )==checked;
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
    
       
    }*/

    //$('input[name="SpecialeBroodType"]:checked').val();
            //var sbtidval =  $('input[name="SpecialeBroodType"]:checked').val();
            /*if(document.getElementById("sbtid1").checked == true)
            {
                var sbtidval = document.getElementById("sbtid1").value;
            }

            else if(document.getElementById("sbtid2").checked == true)
            {
                var sbtidval = document.getElementById("sbtid2").value;
            }
            else if(document.getElementById("sbtid3").checked == true)
            {
                var sbtidval = document.getElementById("sbtid3").value;
            }
            console.log(sbtid_prijs);
            var sbtid_prijs= haal_brood_type(sbtidval);*/
           

           // var sbsidval = $('input[name="SpecialeBroodSoort"]:checked').val();
            //var sbsid_prijs= haal_brood_soort(sbsidval);
            //console.log(sbsid_prijs);


            /*function start()
{   
    const urlParams = new URLSearchParams(window.location.search);
    const catid = urlParams.get("catid");

    if(catid!="")
    {
        filter_producten_category(catid); 
    }
    
    filter_producten_category(catid);
    //lees_data();
    
}*/