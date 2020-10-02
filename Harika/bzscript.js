var producten;
var category;
var broodsoort =[];
var broodtype =[];
var promoties =[];
//var broodsoort;
//var broodtype;
//var prodcat1;
//var prodcat2;
//var prodcat3;
//var prodcat4;
var huidig_product;
var smos_prijs=0;
var bs_prijs=0;
var bt_prijs=0;
var aantalstukjes=0;
var broodsort_gekozen;
var broodtype_gekozen;
var date = new Date();
var day=date.getDay();
console.log(day);


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
        document.location = "index.html";  
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
        console.log(response);
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
                                
                    $.ajax({
                        method: 'GET',
                        url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=promoties",
                        //headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
                    })    
                    .done(function (response) {
                        console.log(response);
                        promoties = response.data.items
                        console.log(promoties)
                        assets_path = response.data.assets_path;
                        sessionStorage.setItem("token", response.status.token)
                        maak_tabel(producten);
                    })
                }) 
            })
        })
    })
    .fail(function (msg) {
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
        //var catid= producten[i].catid;
    
        tabledata += "<tr>";
            tabledata += "<td>" + producten[i].pnaam + "</td>";
            tabledata += "<td>" + + "</td>";
            tabledata += "<td>" + + "</td>";
            /*
            DO NOT DELETE THIS COMMENT
            tabledata += "<td>" + '<img src="https:'+assets_path + "/" + producten[i].beeld.name+'" />' + "</td>";
            */
            tabledata += "<td>" + `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="${producten[i].datatarget}" onclick="toon_prod_popup(${producten[i].pid})">Kueze</button>` + "</td>";
        tabledata += "</tr>";
        
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
    console.log(urlParams);
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


function toon_prod_popup(pid)
{
    product_gevonden(pid);
    console.log(huidig_product);
    
    if(huidig_product.catid==1)
    {
        var catid=huidig_product.catid;
        document.getElementById("knaam").value = huidig_product.pnaam;
        total_bereken(catid);
    }
    else if(huidig_product.catid==2)
    {
        var catid=huidig_product.catid;   
        document.getElementById("snaam").value = huidig_product.pnaam; 
        total_bereken(catid);
    }
    else if(huidig_product.catid==3)
    {
        document.getElementById("ksnaam").value = huidig_product.pnaam;
        total_bereken(catid);
        var aantalstukjes = Number(document.getElementById("ksquantity").value);
        var prijs = aantalstukjes * huidig_product.prodprijs;
        console.log(prijs);
        if(day===3)
        {
            document.getElementById("kspromotieid").value ="20% korting op alle Koude Schotels vandaag (Woensdag)";
            document.getElementById("kstotaalprijsspan").innerHTML="€"+ "&nbsp" + "Total Prijs before applying discount:"+ "&nbsp" +prijs;
            prijs= prijs - ((prijs*20)/100);
            prijs=prijs.toFixed(2);
            console.log("Total Prijs after discount", prijs);
        }
        else
        {
            document.getElementById("kspromotieid").value +="20% korting op alle Koude Schotels op elke Woensdag";
        }
        document.getElementById("kstotaalprijs").value = prijs;
    }
    else if(huidig_product.catid==4)
    {
        document.getElementById("dnaam").value = huidig_product.pnaam;
        total_bereken(catid);
        var aantalstukjes = Number(document.getElementById("dquantity").value);
        var prijs = aantalstukjes * huidig_product.prodprijs;
        console.log(prijs);
        document.getElementById("dtotaalprijs").value = prijs;
    }
    //document.getElementById("beeld").value = huidig_product.beeld;
    //json stringify
    //document.getElementById("beeldoriginal").value = JSON.stringify(huidig_product.beeld);
    //console.log(image);
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
   

function total_bereken(catid)
{
    if(catid==1)
    {
        var beleg_prijs=huidig_product.prodprijs;
        console.log("In total_bereken before calculation: sandwich price with just filling price is: ",beleg_prijs);
        aantalstukjes = Number(document.getElementById("kquantity").value);
        console.log("total pieces:", aantalstukjes);
        //var prijs= beleg_prijs + sandwich_prijs;
        var prijs= bt_prijs + bs_prijs + smos_prijs + beleg_prijs;
        console.log(prijs);
        var total_prijs=prijs*aantalstukjes;

        /* sunday=0, monday=1, tuesday=2, wednesday=3, thursday=4, friday=5, saturday=6 */
        if(day===4)
        {
            document.getElementById("kpromotieid").value="5% korting op alle Klassieke Broodjes vandaag (Donderdag)";
            document.getElementById("ktotaalprijsspan").value="€"+ "&nbsp" + "Total Prijs before applying discount:"+ "&nbsp" +total_prijs;
            total_prijs= total_prijs - ((total_prijs*5)/100);
            total_prijs=total_prijs.toFixed(2);
            console.log("total_prijs after discount", total_prijs);
        }
        else
        {
            document.getElementById("kpromotieid").value="5% korting op alle Klassieke Broodjes allen op elke Donderdag";
        }
        document.getElementById("ktotaalprijs").value = total_prijs;
    }
    else if(catid==2)
    {
        var beleg_prijs=huidig_product.prodprijs;
        console.log("In total_bereken before calculation: sandwich price with just filling price is: ",beleg_prijs);
        aantalstukjes = Number(document.getElementById("squantity").value);
        console.log("total pieces:", aantalstukjes);
        //var prijs= beleg_prijs + sandwich_prijs;
        var prijs= bt_prijs + bs_prijs + smos_prijs + beleg_prijs;
        console.log(prijs);

        if(day===2)
        {
            document.getElementById("spromotieid").value="10% korting op Speciale Broodjes vandaag(Dinsdag)";
            document.getElementById("stotaalprijsspan").value="€"+ "&nbsp" + "Total Prijs before applying discount:"+ "&nbsp" +total_prijs;
            total_prijs= total_prijs - ((total_prijs*10)/100);
            total_prijs=total_prijs.toFixed(2);
            console.log("total_prijs after discount", total_prijs);
        }
        else 
        {
            document.getElementById("spromotieid").value="10% korting op alle Speciale Broodjes allen op elke Dinsdag";
        }
        var total_prijs=prijs*aantalstukjes;

        document.getElementById("stotaalprijs").value = total_prijs;
    }
} 
  

function get_radio_button_value_broodsoort(catid)
{
    var broodsoort= document.getElementsByName("BroodSoort");

    if(broodsoort[0].checked)
    {
        bs_prijs=0.25;
        console.log("brood price after broodsoort selection:", bs_prijs);
        if(catid==1)
        {
            document.getElementById("kquantity").value=0;
            document.getElementById("ktotaalprijs").value="";
        }
        else if(catid==2)
        {
            document.getElementById("squantity").value=0;
            document.getElementById("stotaalprijs").value="";
        }
    }
    else if(broodsoort[1].checked)
    {
        bs_prijs= 0.50;    
        console.log("brood price after broodsoort selection:", bs_prijs);
        if(catid==1)
        {
            document.getElementById("kquantity").value=0;
            document.getElementById("ktotaalprijs").value="";
        }
        else if(catid==2)
        {
            document.getElementById("squantity").value=0;
            document.getElementById("stotaalprijs").value="";
        }
    }
}


function get_radio_button_value_broodtype(catid) 
{
    var broodtype=document.getElementsByName("BroodType");
   
    if(broodtype[0].checked)
    {
        bt_prijs= 0.50;
        console.log("brood price after broodtype selection:", bt_prijs);
        if(catid==1)
        {
            document.getElementById("kquantity").value=0;
            document.getElementById("ktotaalprijs").value="";
        }
        else if(catid==2)
        {
            document.getElementById("squantity").value=0;
            document.getElementById("stotaalprijs").value="";
        }
    }
    else if(broodtype[1].checked)
    {
        bt_prijs= 0.75;
        console.log("brood price after broodtype selection:", bt_prijs);
        if(catid==1)
        {
            document.getElementById("kquantity").value=1;
            document.getElementById("ktotaalprijs").value="";
        }
        else if(catid==2)
        {
            document.getElementById("squantity").value=1;
            document.getElementById("stotaalprijs").value="";
        }
    }
    else if(broodtype[2].checked)
    {
        bt_prijs = 1;
        console.log("brood price after broodtype selection:", bt_prijs);
        if(catid==1)
        {
            document.getElementById("kquantity").value=0;
            document.getElementById("ktotaalprijs").value="";
        }
        else if(catid==2)
        {
            document.getElementById("squantity").value=0;
            document.getElementById("stotaalprijs").value="";
        }
    }
}


function get_radio_button_value_smos(catid)
{
    var smos_gekozen = document.getElementsByName("smosselected");

    if(smos_gekozen[0].checked)
    {
        smos_prijs=0;
        console.log("Smos price after smos selection :",smos_prijs);
        if(catid==1)
        {
            document.getElementById("kquantity").value=0;
            document.getElementById("ktotaalprijs").value="";
        }
        else if(catid==2)
        {
            document.getElementById("squantity").value=0;
            document.getElementById("stotaalprijs").value="";
        }
    }
    else if(smos_gekozen[1].checked)
    {
        smos_prijs=0.70;
        console.log("Smos price after  smos selection :",smos_prijs);
        if(catid==1)
        {
            document.getElementById("kquantity").value=0;
            document.getElementById("ktotaalprijs").value="";
        }
        else if(catid==2)
        {
            document.getElementById("squantity").value=0;
            document.getElementById("stotaalprijs").value="";
        }
    }
}


function bevestig_bestelling(catid)
{
    leeg_modal(catid);
}


function leeg_modal(catid)
{
    if(catid==1) 
    {
        document.getElementById("kbsid1").checked=false;
        document.getElementById("kbsid2").checked=false;
        document.getElementById("kbtid1").checked=false;
        document.getElementById("kbtid2").checked=false;
        document.getElementById("kbtid3").checked=false;
        document.getElementById("ksmos1").checked=false;
        document.getElementById("ksmos2").checked=false;
        document.getElementById("kquantity").value="";
        document.getElementById("ktotaalprijs").value="";
    }
    else if(catid==2)
    {
        document.getElementById("sbsid1").checked=false;
        document.getElementById("sbsid2").checked=false;
        document.getElementById("sbtid1").checked=false;
        document.getElementById("sbtid2").checked=false;
        document.getElementById("sbtid3").checked=false;
        document.getElementById("ssmos1").checked=false;
        document.getElementById("ssmos2").checked=false;
        document.getElementById("squantity").value="";
        document.getElementById("stotaalprijs").value="";
    }
    else if(catid==3)
    {
        document.getElementById("ksquantity").value="";
        document.getElementById("kstotaalprijs").value="";
    }
    else if(catid==4)
    {
        document.getElementById("dquantity").value="";
        document.getElementById("dtotaalprijs").value="";
    }
}
 

function aantal_kiezen(pgnum) {

    if(pgnum==1)
    {
        var count = document.getElementById("kquantity").value
        huidige_prijs = count;
        prijs = huidige_prijs;
        toon_prod_popup();
    }
    else if(pgnum==2)
    {
        var count = document.getElementById("squantity").value
        huidige_prijs = count;
        prijs = huidige_prijs;
        toon_prod_popup();
    }
    else if(pgnum==3)
    {
        var count = document.getElementById("ksquantity").value
        huidige_prijs = count;
        prijs = huidige_prijs;
        toon_prod_popup();
    }
    else if(pgnum==4)
    {
        var count = document.getElementById("dquantity").value
        huidige_prijs = count;
        prijs = huidige_prijs;
        toon_prod_popup();
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

/*function haal_brood_soort(checked_broodsoort) 
{
    console.log(checked_broodsoort);
    for (var i = 0; i < broodsoort.length; i++)
    {
        if (broodsoort[i].bsid == checked_broodsoort)
         {
            console.log("enters into for lus broodsoort");
            console.log(broodsoort[i]);
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
            console.log("enters into for lus broodtype");
            console.log(broodtype[i]);
            //bt_prijs=broodtype[i].btprijs;
            return broodtype[i].btprijs;
            //console.log(bt_prijs);

        }

    }
 }*/