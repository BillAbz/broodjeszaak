var producten;
var category;
var broodsoort =[];
var broodtype =[];
//var broodsoort;
//var broodtype;
var prodcat1;
var prodcat2;
var prodcat3;
var prodcat4;
var huidig_product;
/*var checked_broodsoort;
var checked_broodtype;
var checked_smos;
//var count;
var klassieke_brood_soort_selected;
var klassieke_brood_type_selected;
var speciale_brood_soort_selected;
var speciale_brood_type_selected;*/
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
  
function get_radio_button_value_broodsoort()
{
    
    var broodsoort= document.getElementsByName("BroodSoort");
    if(broodsoort[0].checked)
    {
             brood_soort_selected_value = broodsoort[0].value;
             console.log(brood_soort_selected_value);

    }
    else if(broodsoort[1].checked)
    {
            brood_soort_selected_value = broodsoort[1].value;
            console.log(brood_soort_selected_value);
     }
     bs_prijs= haal_brood_soort(brood_soort_selected_value);



}



function get_radio_button_value_broodtype() 
{
        
    var broodtype=document.getElementsByName("BroodType");
    if(broodtype[0].checked)
    {
        brood_type_selected_value = broodtype[0].value;
        console.log(brood_type_selected_value);

    }
    else if(broodtype[1].checked)
    {
        brood_type_selected_value = broodtype[1].value;
        console.log(brood_type_selected_value);
    }
    else if(broodtype[2].checked)
    {
        brood_type_selected_value = broodtype[2].value;
        console.log(brood_type_selected_value);
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

function haal_brood_soort(checked_broodsoort) 
{
    console.log(checked_broodsoort);
    for (var i = 0; i < broodsoort.length; i++)
    {
        if (broodsoort[i].bsid == checked_broodsoort)
         {
            console.log("works");
           // bs_prijs=broodsoort[i].bsprijs;
            return broodsoort[i].bsprijs;
            console.log(bs_prijs);

        }

    }

}

function haal_brood_type(checked_broodtype)
 {
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
        document.getElementById("ktotaalprijs").value = huidig_product.prodprijs;
        var beleg_prijs= huidig_product.prodprijs;
        var sandwich_prijs = bs_prijs + bt_prijs + beleg_prijs + smos_prijs;
        var aantalstukjes = Number(document.getElementById("kquantity").value);
        var prijs = aantalstukjes * sandwich_prijs;
        document.getElementById("ktotaalprijs").value = prijs;

        /*var bs_prijs= haal_brood_soort(klassieke_brood_soort_selected);
        console.log(bs_prijs);
        var bt_prijs= haal_brood_type(checked_broodtype);
        var beleg_prijs= huidig_product.prodprijs;
        if(checked_smos==1)
        {
        var sandwich_prijs = bs_prijs + bt_prijs + beleg_prijs;
        }
        else if(checked_smos==2)
        {
            var sandwich_prijs = bs_prijs + bt_prijs + beleg_prijs + 0.70; 
        }*/
       }

       else if(huidig_product.catid==2)
       {
            document.getElementById("snaam").value = huidig_product.pnaam; 
            document.getElementById("stotaalprijs").value = huidig_product.prodprijs;
            var beleg_prijs= huidig_product.prodprijs;
            var sandwich_prijs = bs_prijs + bt_prijs + beleg_prijs + smos_prijs;
            var aantalstukjes = Number(document.getElementById("squantity").value);
            var prijs = aantalstukjes * sandwich_prijs;
            document.getElementById("stotaalprijs").value = prijs;


            /*var bs_prijs= haal_brood_soort(checked_broodsoort);
            var bt_prijs= haal_brood_type(checked_broodtype);
            var beleg_prijs= huidig_product.prodprijs;
            if(checked_smos==1)
            {
              var sandwich_prijs = bs_prijs + bt_prijs + beleg_prijs;
            }
            else if(checked_smos==2)
            {
               var sandwich_prijs = bs_prijs + bt_prijs + beleg_prijs + 0.70; 
            }
            
           
            */

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


/*function radio_waard_teruggeven(divID)
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
            else if(divID=='ssmos')
            {
                checked_smos = document.getElementById(divID+i).value;
            }
        }
    }        
   
    for (let i = 1; i <=  radio_form.children.length; i++)
     {
        if(document.getElementById(divID+i).checked)
        {
            if(divID=='kbsid')
            {
                checked_broodsoort = document.getElementById(divID+i).value;
            } 
            else if(divID=='kbtid')
            {
                checked_broodtype = document.getElementById(divID+i).value;
            } 
            else if(divID=='ksmos')
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


    /*}      
    */


    /*
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

  }*/

