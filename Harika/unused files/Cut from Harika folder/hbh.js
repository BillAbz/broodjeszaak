var producten;
var category;
var broodsoort =[];
var broodtype =[];
var promoties =[];
var radio_buttons=[];
var winkel_wagentje =[];
var winkel_table=[];
//var broodsoort;
//var broodtype;
//var prodcat1;
//var prodcat2;
//var prodcat3;
//var prodcat4;
var huidig_product;
var aantalstukjes=0;
var broodsort_gekozen;
var broodtype_gekozen;
var broodsort_gekozen_naam;
var broodtype_gekozen_naam;
var smos_gekozen;
var order=0;
var date = new Date();
var day=date.getDay();
console.log(day);
var sandwich_prijs;
var total_default_value_klassieke=0;
var total_default_value_special=0;

/* var localstorage_array={
    product: ,
    brood_soort: ,
    brood_type:,
    aantal_stuks:,
    bedrag:
}
window.localStorage.setItem('winkelwagentje', JSON.stringify(person));*/

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
    order=window.localStorage.getItem('order');
    document.getElementById("order").innerHTML=order;
    winkel_wagentje=JSON.parse(localStorage.getItem('winkel_wagentje'));
  //winkelwagantje_producten = JSON.parse(sessionStorage.getItem('winkelwagantje'))

    console.log(winkel_wagentje);
   
}
function toon_apart_data()
{
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams);
    const catid = urlParams.get("catid");
    filter_producten_category(catid);

    order=window.localStorage.getItem('order');
    document.getElementById("order").innerHTML=order;
    winkel_wagentje=JSON.parse(localStorage.getItem('winkel_wagentje'));
    console.log(winkel_wagentje);
   
}

function bevestig_bestelling(catid)
{
   
    if(catid==1)
    {

                //assigning the values
        var product_id=huidig_product.pid;
        var product_naam=huidig_product.pnaam;
        var broodsoort_id=broodsort_gekozen;
        var broodsoort_naam=broodsort_gekozen_naam;           
        var broodtype_id=broodtype_gekozen;
        var broodtype_naam=broodtype_gekozen_naam;
        var smos_selected=smos_gekozen;
        var aantal_quantity=document.getElementById("kquantity").value;
        var bedrag=document.getElementById("ktprijs").value;

        var winkel_data= {"pid" : product_id, "pnaam": product_naam,
                               "bsid": broodsoort_id, "bsnaam": broodsoort_naam,
                               "btid": broodtype_id, "btnaam" :  broodtype_naam,
                                "smos_selected": smos_selected,  "totaal_stuks": aantal_quantity, 
                                "totaal_bedrag":  bedrag};
        winkel_wagentje.push(winkel_data);

        console.log(winkel_wagentje);
        order++;
        document.getElementById("order").innerHTML=order;
        localStorage.setItem('order', JSON.stringify(order));
       

      }
    else if(catid==2)
    {
        var product_id=huidig_product.pid;
        var product_naam=huidig_product.pnaam;
        var broodsoort_id=broodsort_gekozen;
        var broodsoort_naam=broodsort_gekozen_naam;           
        var broodtype_id=broodtype_gekozen;
        var broodtype_naam=broodtype_gekozen_naam;
        var smos_selected=smos_gekozen;
        var aantal_quantity=document.getElementById("squantity").value;
        var bedrag=document.getElementById("stprijs").value;

        var winkel_data= {"pid" : product_id, "pnaam": product_naam,
                               "bsid": broodsoort_id, "bsnaam": broodsoort_naam,
                               "btid": broodtype_id, "btnaam" :  broodtype_naam,
                                "smos_selected": smos_selected,  "totaal_stuks": aantal_quantity, 
                                "totaal_bedrag":  bedrag};
                                console.log(winkel_wagentje);
       winkel_wagentje.push(winkel_data);
        console.log(winkel_wagentje);
        order++;
        document.getElementById("order").innerHTML=order;
       
    }
    else if(catid==3)
    {
        var product_id=huidig_product.pid;
        var product_naam=huidig_product.pnaam;
        var aantal_quantity=document.getElementById("ksquantity").value;
        var bedrag=document.getElementById("kstotaalprijs").value;
        var winkel_data={"pid" : product_id, "pnaam": product_naam,
                        "bsid": null, "bsnaam": null, "btid": null, "btnaam" : null,"smos_selected": null,
                        "totaal_stuks": aantal_quantity, "totaal_bedrag":  bedrag};
        /*var winkel_data={"pid" : product_id, "pnaam": product_naam,
                          "totaal_stuks": aantal_quantity, "totaal_bedrag":  bedrag};*/
    
         winkel_wagentje.push(winkel_data);
        console.log(winkel_wagentje);
        order++;
        document.getElementById("order").innerHTML=order;
       
        
    }
    else if(catid==4)
    {
        var product_id=huidig_product.pid;
        var product_naam=huidig_product.pnaam;
        var aantal_quantity=document.getElementById("dquantity").value;
        var bedrag=document.getElementById("dtotaalprijs").value;
         //var winkel_data={"pid" : product_id, "pnaam": product_naam,
                        //"bsid": "", "bsnaam": "", "btid": "", "btnaam" : "","smos_selected": "",
                        //"totaal_stuks": aantal_quantity, "totaal_bedrag":  bedrag};
        var winkel_data={"pid" : product_id, "pnaam": product_naam,
                        "totaal_stuks": aantal_quantity, "totaal_bedrag":  bedrag};
  
                         
        winkel_wagentje.push(winkel_data);
        console.log(winkel_wagentje);
        order++;
        document.getElementById("order").innerHTML=order;
        
    }
  
    //localStorage.setItem("order", order);
    localStorage.setItem('order', JSON.stringify(order));
    //localStorage.setItem("winkel_wagentje", winkel_wagentje);
    localStorage.setItem('winkel_wagentje', JSON.stringify(winkel_wagentje));
    leeg_modal(catid);
    $(huidig_product.datatarget).modal('hide');
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
            tabledata += "<td>" + `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="${producten[i].datatarget}" onclick="toon_prod_popup(${producten[i].pid})">Keuze</button>` + "</td>";
        tabledata += "</tr>";
        
        document.getElementById("productendata").innerHTML += tabledata;
    }
}


function ga_naar_category(catid, catnaam)
{
    document.location=""+catnaam+".html?catid=" + catid;
}





function filter_producten_category(catid)
{
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
            
            producten=json.data.items;
            
            console.log(producten);
        
            if(producten=="")
            {
                document.getElementById("productendata").innerHTML = "<br>" + "<br>" + "<center>" + "<b>" + "Geen Records gevonden" + "</b>" + "</center>";
            }
            else 
            {
                maak_tabel(producten);
                //order=window.localStorage.getItem('order');
                
                

                
                //maak_tabel(prodcat1);
                //maak_tabel_paginas(prodcat1);
            }
            })
        })
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
        
        console.log("catid in toon_prod_prop klassieke", catid);
        document.getElementById("knaam").value = huidig_product.pnaam;
        voorberekening(catid);
    }
    else if(huidig_product.catid==2)
    {
        var catid=huidig_product.catid;   
      
        console.log("catid in toon_prod_prop speciale", catid);
        document.getElementById("snaam").value = huidig_product.pnaam; 
        voorberekening(catid);
    }
    else if(huidig_product.catid==3)
    {
        var catid=huidig_product.catid;  
        
        console.log("catid in toon_prod_prop koudeschotel", catid);
        document.getElementById("ksnaam").value = huidig_product.pnaam;
        var aantalstukjes = Number(document.getElementById("ksquantity").value);
        var prijs = aantalstukjes * huidig_product.prodprijs;
        console.log(prijs);
        if(day===3)
        {
            document.getElementById("kspromotieid").value ="20% korting op alle Koude Schotels vandaag (Woensdag)";
            document.getElementById("kstotaalprijsspan").innerHTML="&nbsp" + "<b>"+"Total Prijs voor Korting:"+ "&nbsp"+"€"+ prijs+ "</b>";
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
        var catid=huidig_product.catid;   
       
        console.log("catid in toon_prod_prop drankjes", catid);
        document.getElementById("dnaam").value = huidig_product.pnaam;
        var aantalstukjes = Number(document.getElementById("dquantity").value);
        var prijs = aantalstukjes * huidig_product.prodprijs;
        console.log(prijs);
        document.getElementById("dtotaalprijs").value = prijs;
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
   

function voorberekening(catid)
{
    console.log("catid in voorberekening", catid);
    if(catid==1)
    {   
        
        var total_prijs= broodsoort[0].bsprijs + broodtype[0].btprijs + huidig_product.prodprijs;
        broodsort_gekozen=broodsoort[0].bsid;
        broodsort_gekozen_naam=broodsoort[0].bsnaam;
        broodtype_gekozen=broodtype[0].btid;
        broodtype_gekozen_naam=broodtype[0].btnaam;
        smos_gekozen=0;
        console.log("when clicked the modal button for first time the total prijs that must be shown:",total_prijs);

        var aantalstukjes = Number(document.getElementById("kquantity").value);
       
        var total_prijs = aantalstukjes * total_prijs;

        /* sunday=0, monday=1, tuesday=2, wednesday=3, thursday=4, friday=5, saturday=6 */
        if(day===1)
        {
            document.getElementById("kpromotieid").value="5% korting op alle Klassieke Broodjes vandaag (Donderdag)";
            document.getElementById("ktotaalprijsspan").innerHTML= "&nbsp" + "<b>"+"Total Prijs voor Korting:"+ "&nbsp" +"€"+ total_prijs+ "</b>";
            total_prijs=total_prijs - ((total_prijs*5)/100);
            total_prijs=total_prijs.toFixed(2);
            console.log("total_prijs after discount", total_prijs);
        }
        else
        {
            document.getElementById("kpromotieid").value="5% korting op alle Klassieke Broodjes op elke Donderdag";
        }
        //var aantalstukjes = Number(document.getElementById("kquantity").value);
       
        //var total_prijs = aantalstukjes * total_prijs;
        document.getElementById("ktprijs").value = total_prijs;
    }
    else if(catid==2)
    {
        var total_prijs= broodsoort[0].bsprijs + broodtype[0].btprijs + huidig_product.prodprijs;
        console.log("when clicked the modal button for the first time the total prijs that must be shown:", total_prijs);
        var aantalstukjes = Number(document.getElementById("squantity").value);
       
        var total_prijs = aantalstukjes * total_prijs;
        
        if(day===2)
        {
            document.getElementById("spromotieid").value="10% korting op alle Speciale Broodjes vandaag (Dinsdag)";
            document.getElementById("stotaalprijsspan").innerHTML= "&nbsp" + "<b>"+"Total Prijs voor Korting:"+ "&nbsp" +"€"+ total_prijs+ "</b>";
            total_prijs=total_prijs - ((total_prijs*10)/100);
            total_prijs=total_prijs.toFixed(2);
            console.log("total_prijs after discount", total_prijs);
        }
        else 
        {
            document.getElementById("spromotieid").value="10% korting op alle Speciale Broodjes op elke Dinsdag";
        }
        //var aantalstukjes = Number(document.getElementById("squantity").value);
       
        //var total_prijs = aantalstukjes * total_prijs;
        document.getElementById("stprijs").value = total_prijs;
    }
} 


function naberekening(catid) {

    console.log("catid in naberekening", catid);
    console.log(radio_buttons);

    if(catid==1){
        var total_prijs= radio_buttons[0] + radio_buttons[1] + radio_buttons[2] + huidig_product.prodprijs;
        console.log("total prijs in naberkening of klassieke:", total_prijs);
        var aantalstukjes = Number(document.getElementById("kquantity").value);
        var total_prijs = aantalstukjes * total_prijs;

        if(day===4)
        {
            document.getElementById("kpromotieid").value="5% korting op alle Klassieke Broodjes vandaag (Donderdag)";
            document.getElementById("ktotaalprijsspan").innerHTML="&nbsp" + "<b>"+"Total Prijs voor Korting:"+ "&nbsp" +"€"+ total_prijs+ "</b>";
            total_prijs=total_prijs - ((total_prijs*5)/100);
            total_prijs=total_prijs.toFixed(2);
            console.log("total_prijs after discount", total_prijs);
        }
        else
        {
            document.getElementById("kpromotieid").value= "10% korting op alle Klassieke Broodjes op elke Donderdag";
        }
        
        document.getElementById("ktprijs").value = total_prijs;
    }
    if(catid==2){
        var total_prijs= radio_buttons[0] + radio_buttons[1] + radio_buttons[2] + huidig_product.prodprijs;
        console.log("total prijs in naberkening of speciale:", total_prijs);
        
        var aantalstukjes = Number(document.getElementById("squantity").value);
        var total_prijs = aantalstukjes * total_prijs;

        if(day===2)
        {
            document.getElementById("spromotieid").value="10% korting op Speciale Broodjes vandaag(Dinsdag)";
            document.getElementById("stotaalprijsspan").value="&nbsp" + "<b>"+"Total Prijs voor Korting:"+ "&nbsp" +"€"+ total_prijs+ "</b>";
            total_prijs=total_prijs - ((total_prijs*10)/100);
            total_prijs=total_prijs.toFixed(2);
            console.log("total_prijs after discount", total_prijs);
        }
        else 
        {
            document.getElementById("spromotieid").value="10% korting op alle Speciale Broodjes op elke Dinsdag";
        }
        //var aantalstukjes = Number(document.getElementById("squantity").value);
        //var total_prijs = aantalstukjes * total_prijs;
        document.getElementById("stprijs").value = total_prijs;
    }
}


function get_radio_button_value(catid){

    console.log("catid in get_radio_button_value", catid);
    radio_buttons[0]=broodsoort[0].bsprijs;
    radio_buttons[1]=broodtype[0].btprijs;
    radio_buttons[2]=0;

  if(catid==1)
  {

    var brood_soort= document.getElementsByName("BroodSoort");
    if (brood_soort[0].checked)
    {
        radio_buttons[0]=broodsoort[0].bsprijs;
        broodsort_gekozen=broodsoort[0].bsid; //assigning the value of id and name of broodsoort to global variable 
        //koude_saus_gekozen=document.getElementByID("koudesaus").value; // mAYONAISE, koude_saus_gekozen=4
        broodsort_gekozen_naam=broodsoort[0].bsnaam;
    }
    else if(brood_soort[1].checked)
    {
        radio_buttons[0]=broodsoort[1].bsprijs;
        broodsort_gekozen=broodsoort[1].bsid;
        //koude_saus_gekozen=document.getElementByID("koudesaus").value;
        broodsort_gekozen_naam=broodsoort[1].bsnaam;
    }

    var brood_type=document.getElementsByName("BroodType");
    if(brood_type[0].checked)
    {
        radio_buttons[1]=broodtype[0].btprijs;
        broodtype_gekozen=broodtype[0].btid;
        broodtype_gekozen_naam=broodtype[0].btnaam;
    }
    else if(brood_type[1].checked)
    {
        radio_buttons[1]=broodtype[1].btprijs;
        broodtype_gekozen=broodtype[1].btid;
        broodtype_gekozen_naam=broodtype[1].btnaam;
    }
    else if(brood_type[2].checked)
    {
        radio_buttons[1]=broodtype[2].btprijs;
        broodtype_gekozen=broodtype[2].btid;
        broodtype_gekozen_naam=broodtype[2].btnaam;
    }

    var smos_gekozen = document.getElementsByName("smosselected");
    if(smos_gekozen[0].checked)
    {
        radio_buttons[2]=0;
        smos_gekozen=0;
    }
    else if(smos_gekozen[1].checked)
    {
        radio_buttons[2]=0.70;
        console.log(radio_buttons[2]);
        smos_gekozen=0.70;
    }
}

else if(catid==2)
{
    var sbrood_soort= document.getElementsByName("SBroodSoort");
    if (sbrood_soort[0].checked)
    {
        radio_buttons[0]=broodsoort[0].bsprijs;
        broodsort_gekozen=broodsoort[0].bsid; //assigning the value of id and name of broodsoort to global variable 
        broodsort_gekozen_naam=broodsoort[0].bsnaam;
    }
    else if(sbrood_soort[1].checked)
    {
        radio_buttons[0]=broodsoort[1].bsprijs;
        broodsort_gekozen=broodsoort[1].bsid;
        broodsort_gekozen_naam=broodsoort[1].bsnaam;
    }

    var sbrood_type=document.getElementsByName("SBroodType");
    if(sbrood_type[0].checked)
    {
        radio_buttons[1]=broodtype[0].btprijs;
        broodtype_gekozen=broodtype[0].btid;
        broodtype_gekozen_naam=broodtype[0].btnaam;
    }
    else if(sbrood_type[1].checked)
    {
        radio_buttons[1]=broodtype[1].btprijs;
        broodtype_gekozen=broodtype[1].btid;
        broodtype_gekozen_naam=broodtype[1].btnaam;
    }
    else if(sbrood_type[2].checked)
    {
        radio_buttons[1]=broodtype[2].btprijs;
        broodtype_gekozen=broodtype[2].btid;
        broodtype_gekozen_naam=broodtype[2].btnaam;
    }

    var ssmos_gekozen = document.getElementsByName("Ssmosselected");
    if(ssmos_gekozen[0].checked)
    {
        radio_buttons[2]=0;
        smos_gekozen=0;
    }
    else if(ssmos_gekozen[1].checked)
    {
        radio_buttons[2]=0.70;
        console.log(radio_buttons[2]);
        smos_gekozen=1;
    }
}





    naberekening(catid);
}


    
function annuleeren_bestelling(catid) 
{
    leeg_modal(catid);
   
}


function leeg_modal(catid)
{
    if(catid==1) 
    {
        document.getElementById("kbsid1").checked=true;
        document.getElementById("kbsid2").checked=false;
        document.getElementById("kbtid1").checked=true;
        document.getElementById("kbtid2").checked=false;
        document.getElementById("kbtid3").checked=false;
        document.getElementById("ksmos1").checked=true;
        document.getElementById("ksmos2").checked=false;
        document.getElementById("kquantity").value=1;
        document.getElementById("ktprijs").value=broodsoort[0].bsprijs+broodtype[0].btprijs+huidig_product.prodprijs;
    }
    else if(catid==2)
    {
        document.getElementById("sbsid1").checked=true;
        document.getElementById("sbsid2").checked=false;
        document.getElementById("sbtid1").checked=true;
        document.getElementById("sbtid2").checked=false;
        document.getElementById("sbtid3").checked=false;
        document.getElementById("ssmos1").checked=true;
        document.getElementById("ssmos2").checked=false;
        document.getElementById("squantity").value=1;
        document.getElementById("stprijs").value=broodsoort[0].bsprijs+broodtype[0].btprijs+huidig_product.prodprijs;
    }
    else if(catid==3)
    {
        document.getElementById("ksquantity").value=1;
        document.getElementById("kstotaalprijs").value=huidig_product.prodprijs;
    }
    else if(catid==4)
    {
        document.getElementById("dquantity").value=1;
        document.getElementById("dtotaalprijs").value=huidig_product.prodprijs;
    }
}
 

function aantal_kiezen(pgnum) {

    if(pgnum==1)
    {
        var count = document.getElementById("kquantity").value

       var bsradio2 = document.getElementsByName("BroodSoort");
       var btradio2= document.getElementsByName("BroodType");
       var smradio2= document.getElementsByName("smosselected");

       if(bsradio2[1].checked || btradio2[1].checked || btradio2[1].checked || smradio2[1].checked)
       {
            naberekening(1);
       }
       else
       {
            toon_prod_popup();
       }




        toon_prod_popup();
        //naberekening(1);
    }
    else if(pgnum==2)
    {
        var count = document.getElementById("squantity").value
        var bsradio2 = document.getElementsByName("SBroodSoort");
       var btradio2= document.getElementsByName("SBroodType");
       var smradio2= document.getElementsByName("Ssmosselected");

       if(bsradio2[1].checked || btradio2[1].checked || btradio2[1].checked || smradio2[1].checked)
       {
            naberekening(2);
       }
       else
       {
            toon_prod_popup();
       }
    }
    else if(pgnum==3)
    {
        var count = document.getElementById("ksquantity").value
        toon_prod_popup();
    }
    else if(pgnum==4)
    {
        var count = document.getElementById("dquantity").value
        toon_prod_popup();
    }
}


/*
var tabledata ="";
        //var catid= producten[i].catid;
    
        tabledata += "<tr>";
            tabledata += "<td>" + producten[i].pnaam + "</td>";
            tabledata += "<td>" + + "</td>";
            tabledata += "<td>" + + "</td>";
        
           // DO NOT DELETE THIS COMMENT
            //tabledata += "<td>" + '<img src="https:'+assets_path + "/" + producten[i].beeld.name+'" />' + "</td>";
            
           //tabledata += "<td>" + `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="${producten[i].datatarget}" onclick="toon_prod_popup(${producten[i].pid})">Keuze</button>` + "</td>";
           //tabledata += "</tr>";
           
           //document.getElementById("productendata").innerHTML += tabledata;
      // }

*/




function winkelwagentje()
{
    order=window.localStorage.getItem('order');
    document.getElementById("order").innerHTML=order;
    winkel_toevoegen=window.localStorage.getItem('winkel_toevoegen');

    for(var i=0; i<winkel_toevoegen.length; i++)
    
    {
        var tabledata ="";
        tabledata += "<tr>";
        tabledata += "<td>" + winkel_toevoegen[i].pnaam + "</td>";
        tabledata += "<td>" + winkel_toevoegen[i].bsnaam + "</td>";
        tabledata += "<td>" + winkel_toevoegen[i].btnaam + "</td>";
        tabledata += "<td>" + winkel_toevoegen[i].totaal_stuks + "</td>";
        tabledata += "<td>" + winkel_toevoegen[i].totaal_bedrag + "</td>";
        tabledata += "<td>" + `<button type="button" class="btn btn-sm btn-cyan" data-toggle="tooltip" data-placement="top" title="Verwijder item">Verwijder</button>`
        "</td>";
        document.getElementById("winkeltablebody").innerHTML += tabledata;
    }



}
