var promotie_cat;
var producten1;
var category;
var broodsoort=[];
var broodtype=[];
var huidig_product;
var verwijder_huidig_product;
var date = new Date();
var day=date.getDay();
console.log(day);
var broodsoort_gekozen ;
var broodtype_gekozen ;
var broodsoort_gekozen_id;
var broodtype_gekozen_id;
var broodsoort_gekozen_naam;
var broodtype_gekozen_naam;
var broodsoort_gekozen_prijs;
var broodtype_gekozen_prijs;
var smos_gekozen=0;
var smos_gekozen_id;
var smos_gekozen_naam;
var smos_gekozen_prijs;
var aantaal_bestellingen=0;
var total_prijs;
var voor_korting_prijs;
var rowid=1;
var final_bedrag=0.0;


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
         //console.log(sessionStorage);
         document.location = "bzstartpagina1.html";
       
   
       
       
    })
    .fail(function (msg) {
        
        //console.log("read fail:");
        //console.log(msg);
        alert("ENTERED Email ID or PASSWORD IS WRONG. Please Re-Enter Values");
    });




}

function start()
{   
    const urlParams = new URLSearchParams(window.location.search);
    //const catid = urlParams.get("catid");  //"" or 1 or 2 or 3 or 4
    const promid = urlParams.get("promid");
    console.log(promid);
    //If catid!="" go to either of klassieke or speciale or koudeschotels or drankjes
    if(promid!="")
    {
        /*filter_producten_category(catid); */
        promotie_categorie();
    }
    
    /*filter_producten_category(catid); //else got to alle producten
    haalWinkelwagentjeOp();*/
    promotie_categorie();

    /*aantaal_bestellingen=window.localStorage.getItem('aantaal_bestellingen');
    document.getElementById("antaal_producten").innerHTML=aantaal_bestellingen;
    winkel_wagentje=JSON.parse(localStorage.getItem('winkel_wagentje'));


    console.log(winkel_wagentje);*/
   
}

function ga_naar_category(catid)
{

    document.location="producten1.html?catid=" + catid;

}

function filter_producten_category(catid)
{
  
        
        $.ajax({
            url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=producten1",
            //headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },
            type: "GET",
            data: {

            //"filter": ["catid", "=", catid]
            "filter": ["catid", "like", "%" + catid + "%"]
            }
        }).done(function (json) {
            console.log("read done:");
            console.log(json);
           
            producten1=json.data.items;
           
           
           if(producten1=="")
            {

                document.getElementById("productendata").innerHTML = "<br>" + "<br>" + "<center>" + "<b>" + "Geen Records gevonden" + "</b>" + "</center>";

            }
            else 
            {
                 
                maak_tabel(producten1);
               
               
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
                                    //update_broodjes_modal(broodsoort, broodtype);
                                    //create_modal(broodsoort, broodtype, catid);

                            }).fail(function (msg) {
        
                                console.log("read fail:");
                                console.log(msg);
                                
                            });
                        })
                
            }                
    })


                            
}


function maak_tabel(producten1) {
    
    document.getElementById("productendata").innerHTML = "";
  
     for (var i = 0; i < producten1.length; i++) 
     {
            var tabledata ="";
           // var catid= producten[i].catid;
        
             tabledata += "<tr>";
            
             tabledata += "<td>" + producten1[i].pnaam + "</td>";
             tabledata += "<td>" + + "</td>";
             tabledata += "<td>" +`<img src="${producten1[i].beeld}" class="figure-img img-fluid z-depth-1" style="max-width: 100px" alt="Responsive image">` + "</td>";
             /*
             DO NOT DELETE THIS COMMENT
             tabledata += "<td>" + '<img src="https:'+assets_path + "/" + producten[i].beeld.name+'" />' + "</td>";
             */
        
             tabledata += "<td>" + `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#broodjesZaak_details" onclick="toon_producten_popup('${producten1[i].pid}','${producten1[i].catid}')">Kueze</button>` +
                         "</td>";
             tabledata += "</tr>";
             
 
            
             document.getElementById("productendata").innerHTML += tabledata;
         }
         
     }

     function toon_producten_popup(pid,catid)
     {
         product_gevonden(pid);
         create_modal(catid,pid);
         
        
         //console.log(huidig_product);
 
         if(huidig_product.catid==1 || huidig_product.catid==2)
         {
                 document.getElementById("naam").value = huidig_product.pnaam;
                 broodsoort_gekozen = broodsoort[0].bsprijs;
                 broodtype_gekozen  = broodtype[0].btprijs;
                 voorberekening(catid);
                
                 
         }
         
         else if(huidig_product.catid==3 || huidig_product.catid==4)
         {
       
                 document.getElementById("naam").value = huidig_product.pnaam;
                 voorberekening(catid);
                
         }
     
        }     
         
         
         //document.getElementById("beeld").value = huidig_product.beeld;
         //json stringify
     
         //document.getElementById("beeldoriginal").value = JSON.stringify(huidig_product.beeld);
     
         //console.log(image);
     
        
   
                   
 function product_gevonden(pid)
 {
        
         for (i = 0; i < producten1.length; i++) 
         {
                 if (pid == producten1[i].pid) 
                 {
         
                     huidig_product = producten1[i];
                     
                 }
          }
 }    
 
function create_modal(catid,pid)
{
   
  if(catid==1 || catid==2)
  {
      console.log(broodsoort)

   document.getElementById("modal_data").innerHTML=
    ` 
    <div class="modal fade" id="broodjesZaak_details" tabindex="-1" role="dialog" aria-labelledby="modalform" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalform">Broodjes Selectie <br> 
                            (U kunt het aantal stuks wijzigen en op de knop Bestelling bevestigen klikken)</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                        </div>
                        <div class="modal-body">
                            <!-- CREATION OF FORM ELEMENT WHEN KEUZE BUTTON IS CLICKED-->
                            <form>
                                <div class="form-group">
                                    <label for="naam">Het Beleg Gekozen</label>
                                    <input type="text" class="form-control" id="naam" placeholder="" disabled>
                                </div>

                                
                                <div class="form-group">
                                    <label> Kies Brood Soort </label><br>
                                    <img src="${broodsoort[0].bsbeeld}" class="figure-img img-fluid z-depth-1" style="max-width: 100px" alt="Responsive image">
                                    <input type="radio" id="${broodsoort[0].bsid}" name="BroodSoort" value="${broodsoort[0].bsprijs}"  onclick="get_radio_button_value('${broodsoort[0].bsprijs}','broodsoort','${catid}','${broodsoort[0].bsid}','${broodsoort[0].bsnaam}')" checked>Piccolo => 0.25 cents extra <br>
                                    <img src="${broodsoort[1].bsbeeld}" class="figure-img img-fluid z-depth-1" style="max-width: 100px" alt="Responsive image">
                                    <input type="radio" id="${broodsoort[1].bsid}" name="BroodSoort" value="${broodsoort[1].bsprijs}" onclick="get_radio_button_value('${broodsoort[1].bsprijs}','broodsoort','${catid}','${broodsoort[1].bsid}','${broodsoort[1].bsnaam}')">Halve Baugette => 0.50 cents extra
                                    
                                  
                                </div>

                               
                                <div class="form-group" >
                                    <label>Kies Brood Type</label><br>
                                    <img src="${broodtype[0].btbeeld}" class="figure-img img-fluid z-depth-1" style="max-width: 100px" alt="Responsive image">
                                    <input type="radio" id="${broodtype[0].btid}" name="BroodType" value="${broodtype[0].btprijs}" onclick="get_radio_button_value('${broodtype[0].btprijs}','broodtype','${catid}','${broodtype[0].btid}','${broodtype[0].btnaam}')" checked>Wit => 0.50 cents extra <br>
                                    <img src="${broodtype[1].btbeeld}" class="figure-img img-fluid z-depth-1" style="max-width: 100px" alt="Responsive image">
                                    <input type="radio" id="${broodtype[1].btid}" name="BroodType" value="${broodtype[1].btprijs}" onclick="get_radio_button_value('${broodtype[1].btprijs}','broodtype','${catid}','${broodtype[1].btid}','${broodtype[1].btnaam}')">Bruin => 0.75 cents extra <br>
                                    <img src="${broodtype[2].btbeeld}" class="figure-img img-fluid z-depth-1" style="max-width: 100px" alt="Responsive image">
                                    <input type="radio" id="${broodtype[2].btid}" name="BroodType" value="${broodtype[2].btprijs}" onclick="get_radio_button_value('${broodtype[2].btprijs}','broodtype','${catid}','${broodtype[2].btid}','${broodtype[2].btnaam}')">Meergranen => 1 euro extra 

                                   
                                </div>

                               
                                <div class="form-group">
                                    <label>Wil Je graag Smos?</label><br>
                                    <input type="radio" id="1" name="smosselected" value="0" onclick="get_radio_button_value('0','smos','${catid}','1','Geen Smos')" checked>Neen <br>
                                    <input type="radio" id="2" name="smosselected" value="0.70" onclick="get_radio_button_value('0.70','smos','${catid}','2','+smos')">Ja => Extra 0.70 Cent betalen
                                </div>  

                                 <div class="form-group">
                                    <label for="promotieid">Promotie</label>
                                    <input type="textbox" class="form-control" id="promotieid"  disabled>
                                </div>

                                <div class="form-group">
                                    <label for="quantity">Aantal Stuks</label>
                                    <input type="number" min="1" value =1 class="form-control" id="quantity" placeholder="" onchange="aantal_kiezen(${pid},'${catid}');">
                                </div>

                                <span id="totaalprijsspan"></span><br>
                                <label for="prijs">Totaal Prijs</label><br>
                               
                                <div class="input-group mb-3">
                                    <span class="input-group-text">€</span>
                                    <input type="text" class="form-control" id="prijs"  aria-label="Prijs in Euro" disabled/>
                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" id="confirm" onclick="bevestig_bestelling(${pid},'${catid}');">Bevestig Bestelling</button>
                                    <button type="button" class="btn btn-primary" data-dismiss="modal" id="Annuleren" onclick="">Annuleren</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `
  }
  else if(catid==3 || catid==4)
  {
    document.getElementById("modal_data").innerHTML=
    `
    <div class="modal fade" id="broodjesZaak_details" tabindex="-1" role="dialog" aria-labelledby="modalform" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalform">Koude Schotel / Drankjes Selectie <br> 
                (U kunt het aantal stuks wijzigen en op de knop Bestelling bevestigen klikken)</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            </div>
            <div class="modal-body">
                <!-- CREATION OF FORM ELEMENT WHEN KEUZE BUTTON IS CLICKED-->
                <form>
                    <div class="form-group">
                        <label for="naam">Het Beleg Gekozen</label>
                        <input type="text" class="form-control" id="naam" placeholder="" disabled>
                    </div>

                     <div class="form-group">
                        <label for="promotieid">Promotie</label>
                        <input type="textbox" class="form-control" id="promotieid"  disabled>
                    </div>

                    <div class="form-group">
                        <label for="quantity">Aantal Stuks</label>
                        <input type="number" min="1" value =1 class="form-control" id="quantity" placeholder="" onchange="aantal_kiezen(${pid},'${catid}');">
                    </div>

                    <span id="totaalprijsspan"></span><br>
                    <label for="prijs">Totaal Prijs</label><br>
                   
                    <div class="input-group mb-3">
                        <span class="input-group-text">€</span>
                        <input type="text" class="form-control" id="prijs"  aria-label="Prijs in Euro" disabled/>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" id="confirm" onclick="bevestig_bestelling(${pid},'${catid}');">Bevestig Bestelling</button>
                        <button type="button" class="btn btn-primary" data-dismiss="modal" id="Annuleren" onclick="">Annuleren</button>
                    </div>
                </form>
              </div>
           </div>
        </div>
      </div>
     `;

   }

 }

 function voorberekening(catid)
{   
    
    
    broodsoort_gekozen_id=broodsoort[0].bsid;
    broodtype_gekozen_id=broodtype[0].btid;
    smos_gekozen_id=smos_gekozen;
    broodsoort_gekozen_naam=broodsoort[0].bsnaam;
    broodtype_gekozen_naam=broodtype[0].btnaam;
    smos_gekozen_naam="Geen Smos";
    
        berekening(catid);
        console.log("catid in voorberekening", catid);
        update_modal(catid);
    
      
} 

function berekening(catid)
{
         
        if(catid==1 || catid==2)
        {   
           
            total_prijs= Number(broodsoort_gekozen) + Number(broodtype_gekozen) + Number(smos_gekozen)+Number(huidig_product.prodprijs);
            
                 
            var aantalstukjes = Number(document.getElementById("quantity").value);
           
            total_prijs = aantalstukjes * total_prijs;
            voor_korting_prijs=total_prijs;
    
            /* sunday=0, monday=1, tuesday=2, wednesday=3, thursday=4, friday=5, saturday=6 */
            if(catid==1 && day===5)
            {
                total_prijs=total_prijs - ((total_prijs*5)/100);
                total_prijs=total_prijs.toFixed(2);
                
            }
            else if(catid==2 && day===2)
            {
                total_prijs=total_prijs - ((total_prijs*10)/100);
                total_prijs=total_prijs.toFixed(2);
            }
            
            
            
        }
      
        else if(catid==3 || catid==4)
        {

            var aantalstukjes = Number(document.getElementById("quantity").value);
            total_prijs = aantalstukjes * huidig_product.prodprijs;
            voor_korting_prijs=total_prijs;

            if(catid==3 && day==3)
            {
                     total_prijs=total_prijs - ((total_prijs*20)/100);
                     total_prijs=total_prijs.toFixed(2);
            }

        }
       
    
}

function update_modal(catid)
{
    if(catid==1 || catid==2)
    {   
       
     /* sunday=0, monday=1, tuesday=2, wednesday=3, thursday=4, friday=5, saturday=6 */
        if(day===5 && catid==1)
        {
            document.getElementById("promotieid").value="5% korting op alle Klassieke Broodjes vandaag (vrijdag)";
            document.getElementById("totaalprijsspan").innerHTML= "&nbsp" + "<b>"+"Total Prijs voor Korting:"+ "&nbsp" +"€"+ voor_korting_prijs+ "</b>";

            console.log("total_prijs after discount", total_prijs);
        }
        else if(catid==1 && day!=5)
        {
            document.getElementById("promotieid").value="5% korting op alle Klassieke Broodjes op elke vrijdag";
        }
        else if(day===2 && catid==2)
        {
            document.getElementById("promotieid").value="10% korting op alle Speciale Broodjes vandaag (Dinsdag)";
            document.getElementById("totaalprijsspan").innerHTML= "&nbsp" + "<b>"+"Total Prijs voor Korting:"+ "&nbsp" +"€"+ voor_korting_prijs+ "</b>";
       
            console.log("total_prijs after discount", total_prijs);
        }
        else if(day!=2 && catid==2)
        {
            document.getElementById("promotieid").value="10% korting op alle Speciale Broodjes op elke Dinsdag";
        }
        document.getElementById("prijs").value = total_prijs;
    }
    else if(catid==3 || catid==4)
    {
        if(catid==3 && day==3)
        {
            document.getElementById("promotieid").value="20% korting op alle koude schotels vandaag (Woensdag)";
            document.getElementById("totaalprijsspan").innerHTML= "&nbsp" + "<b>"+"Total Prijs voor Korting:"+ "&nbsp" +"€"+ voor_korting_prijs+ "</b>";
       
            console.log("total_prijs after discount", total_prijs);
        }
        else if(catid==3 && day!=3)
        {
            document.getElementById("promotieid").value="20% korting op alle Speciale Broodjes op elke Woensdag";
        }
        else if(catid==4)
        {
            document.getElementById("promotieid").value="Geen korting op drankjes";
        }
       document.getElementById("prijs").value = total_prijs;
    }
   
}

function aantal_kiezen(pid, catid) 
{
    if(catid==1 || catid==2)
    {
    berekening(catid);
    update_modal(catid);
    }
    else
    {
      berekening(catid);
      update_modal(catid);
    }
}               
          
function get_radio_button_value(price, bst, catid, id, naam)
{

        if(bst=="broodsoort")
        {

            broodsoort_gekozen=price;
            broodsoort_gekozen_id=id;

            broodsoort_gekozen_naam=naam;

            console.log("broodsoort_gekozen_id via radio button:",broodsoort_gekozen_id);
            console.log("broodsoort_gekozen_naam via radio button:",broodsoort_gekozen_naam);


        }
        else if(bst=="broodtype")
        {
            broodtype_gekozen=price;
            broodtype_gekozen_id=id;
            broodtype_gekozen_naam=naam;
            console.log("broodtype_gekozen_id via radio button:",broodtype_gekozen_id);
            console.log("broodtype_gekozen_naam via radio button:",broodtype_gekozen_naam);

        }
        else if(bst=="smos")
        {
            smos_gekozen=price;
            smos_gekozen_id=id;
            smos_gekozen_naam=naam;
            console.log(smos_gekozen_naam);
            console.log("smos_gekozen_id via radio button:",smos_gekozen_id);
        }

        berekening(catid);
        update_modal(catid);
}

function haalWinkelwagentjeOp() {    
        
        toon_aantal_bestellingen();            
        
        var winkelwagentje = JSON.parse(sessionStorage.getItem("winkelwagentje"));    
       

        if (winkelwagentje == null) {
            winkelwagentje =[];
        }
        console.log(winkelwagentje);
        
        return winkelwagentje;
    } 

function toon_aantal_bestellingen()
{
        rowid=sessionStorage.getItem('rowid');
        aantaal_bestellingen=sessionStorage.getItem('aantaal_bestellingen');
        document.getElementById("antaal_producten").innerHTML=aantaal_bestellingen;
}

function bevestig_bestelling(pid,catid)
{ 
        
        var winkelwagentje=haalWinkelwagentjeOp();

        console.log(catid);
        var product_id=pid;
        var product_naam=huidig_product.pnaam;
        var product_gekozen_prijs=huidig_product.prodprijs;
        console.log("product_id:",product_id);
        var aantal_quantity=document.getElementById("quantity").value;
        var bedrag=document.getElementById("prijs").value;
        var cid=huidig_product.catid;
        var korting_day=day;

        console.log("rowid:", rowid);
        console.log("product id:", product_id);
        console.log("category id:", cid);
        console.log("product_naam:",product_naam);
        console.log("product_gekozen_prijs:",product_gekozen_prijs);
        console.log("brood sort id:", broodsoort_gekozen_id);
        console.log("brood soort naam:", broodsoort_gekozen_naam);
        console.log("brood sort price:", broodsoort_gekozen);
        console.log("brood type id:", broodtype_gekozen_id);
        console.log("brood type naam:", broodtype_gekozen_naam);
        console.log("brood type price:", broodtype_gekozen);
        console.log("smos gekozen id:", smos_gekozen_id);
        console.log("smos_name", smos_gekozen_naam);
        console.log("smos price:", smos_gekozen);
        console.log("vandaag:", korting_day);
        console.log("aantal stuks:", aantal_quantity);
        console.log("total price:", bedrag);
         
       if(catid==1 || catid==2)
       {

        var winkel_data={
            "rowid": rowid,
            "pid" : product_id, 
            "catid": cid,
            "pnaam": product_naam,
            "pprijs":product_gekozen_prijs,
            "bsid": broodsoort_gekozen_id, 
            "bsnaam": broodsoort_gekozen_naam,
            "bsprijs": broodsoort_gekozen,
            "btid": broodtype_gekozen_id, 
            "btnaam": broodtype_gekozen_naam,
            "btprijs": broodtype_gekozen,
            "snaam": smos_gekozen_naam,
            "smprice": smos_gekozen,
            "dag": korting_day,
            "totaal_stuks": aantal_quantity, 
            "totaal_bedrag":  bedrag 
        };
        console.log(winkel_data);
    }
    else 
    {
        var winkel_data={
            "rowid": rowid,
            "pid" : product_id, 
            "catid": cid,
            "pnaam": product_naam,
            "pprijs":product_gekozen_prijs,
            "bsid": null, 
            "bsnaam": null,
            "bsprijs": null,
            "btid": null, 
            "btnaam": null,
            "btprijs": null,
            "snaam": null,
            "smprice": null,
            "dag": korting_day,
            "totaal_stuks": aantal_quantity, 
            "totaal_bedrag":  bedrag  
        };
        console.log(winkel_data);

    }
        
   
        winkelwagentje.push(winkel_data);
        
        console.log(winkelwagentje);

        rowid++;

        aantaal_bestellingen++;
       
        
   
        sessionStorage.setItem('rowid', JSON.stringify(rowid));
        sessionStorage.setItem('aantaal_bestellingen', JSON.stringify(aantaal_bestellingen));
        sessionStorage.setItem('winkelwagentje', JSON.stringify(winkelwagentje));
        toon_aantal_bestellingen();
        $('#broodjesZaak_details').modal('hide');

}

function toon_winkel_wagentje()
{
    var winkelwagentje=haalWinkelwagentjeOp();
    
    final_bedrag=0.0;

    document.getElementById("winkeltablebody").innerHTML="";
    

    for(var i=0; i<winkelwagentje.length; i++)
    
    {
        var tabledata ="";
        var tabledata1=""
        tabledata += "<tr>";

        if(winkelwagentje[i].snaam!=null)
        {
               
            tabledata += "<td>" + winkelwagentje[i].pnaam + "<br>"+ winkelwagentje[i].snaam + "</td>";
        }
        else
        {
            tabledata += "<td>" + winkelwagentje[i].pnaam + "</td>";
        }
       
        if(winkelwagentje[i].bsnaam!=null)
        {
           tabledata += "<td>" + winkelwagentje[i].bsnaam + "</td>";
        }
        else
        {
            tabledata += "<td>" + "---" + "</td>";
        }

        if(winkelwagentje[i].btnaam!=null)
        {
            tabledata += "<td>" + winkelwagentje[i].btnaam + "</td>";
        }
        else
        {
            tabledata += "<td>"+ "---" + "</td>";
        }

        //tabledata += "<td>" + winkelwagentje[i].totaal_stuks + "</td>";

        tabledata += `<td>
                     <input type="number" id= "wquantity${winkelwagentje[i].rowid}" min="1" value= ${winkelwagentje[i].totaal_stuks} aria-label="Search" class="form-control" style="width: 100px" onchange="aantal_prijs_wijzigen(${winkelwagentje[i].rowid});">
                     </td>`;



        tabledata += "<td>" + winkelwagentje[i].totaal_bedrag + "</td>";
        //tabledata += "<td>" + `<button type="button" class="btn btn-sm btn-cyan" data-toggle="tooltip" data-placement="top" title="Verwijder item" onclick="aantal_veranderen(${})">Verwijder</button>`
        tabledata += "<td>" + `<button type="button" class="btn btn-sm btn-cyan" data-toggle="tooltip" data-placement="top" title="Verwijder item" onclick="verwijder_bestelling(${winkelwagentje[i].rowid})">Verwijder</button>`
        "</td>";
        tabledata += "</tr>";
       
        document.getElementById("winkeltablebody").innerHTML += tabledata;

        final_bedrag = Number(final_bedrag) + Number(winkelwagentje[i].totaal_bedrag);
        final_bedrag = final_bedrag.toFixed(2);

        //console.log("final bedrag in toon_winkel_wagentje function:",final_bedrag);
        // document.getElementById("final_bedrag") = final_bedrag;

}
   
   
   tabledata1 += ` <tr>
   <td> </td>
   <td> </td>
  
   <td>
       <h5 class="mt-2"><strong>Totaal</strong></h5>
   </td>
   <td class="text-right" colspan="2">
       <h5 class="mt-2" id="final_bedrag"><strong> ${final_bedrag} </strong></h5>
   </td>

   <td class="text-right">
       <a type="button" href="#tabCheckoutPayment" data-toggle="tab" class="btn btn-cyan">Ga naar betaling<i class="fas fa-angle-right right"></i></a>
   </td>
   </tr>`;
   document.getElementById("winkeltablebody").innerHTML += tabledata1;
}

/*
            "rowid": rowid,
            "pid" : product_id, 
            "catid": cid,
            "pnaam": product_naam,
            "pprijs":product_gekozen_prijs,
            "bsid": broodsoort_gekozen_id, 
            "bsnaam": broodsoort_gekozen_naam,
            "bsprijs": broodsoort_gekozen,
            "btid": broodtype_gekozen_id, 
            "btnaam": broodtype_gekozen_naam,
            "btprijs": broodtype_gekozen,
            "snaam": smos_gekozen_naam,
            "smprice": smos_gekozen,
            "dag": korting_day,
            "totaal_stuks": aantal_quantity, 
            "totaal_bedrag":  bedrag 

*/

function aantal_prijs_wijzigen(rowid)
{
    var winkelwagentje=haalWinkelwagentjeOp();
    var totaal_bedrag=0;
   
    for(var i=0; i<winkelwagentje.length; i++)
    {
        if(winkelwagentje[i].rowid==rowid)
        {
           var count=document.getElementById("wquantity"+winkelwagentje[i].rowid).value;
           
            console.log(count);
            winkelwagentje[i].totaal_stuks=count;
            totaal_bedrag = (Number(winkelwagentje[i].pprijs) + Number(winkelwagentje[i].bsprijs) + Number(winkelwagentje[i].btprijs) + Number(winkelwagentje[i].smprice))  * count;
            
            if(winkelwagentje[i].catid==1 && winkelwagentje[i].dag==5 )
            {
                totaal_bedrag = totaal_bedrag - ((totaal_bedrag * 5)/100);
                totaal_bedrag = totaal_bedrag.toFixed(2);
            }
            else if(winkelwagentje[i].catid==2 && winkelwagentje[i].dag==2)
            {
                totaal_bedrag = totaal_bedrag - ((totaal_bedrag * 10)/100);
                totaal_bedrag = totaal_bedrag.toFixed(2);
            }
            else if(winkelwagentje[i].catid==3 && winkelwagentje[i].dag==3)
            {
                totaal_bedrag = totaal_bedrag - ((totaal_bedrag * 20)/100);
                totaal_bedrag = totaal_bedrag.toFixed(2);
            }

            winkelwagentje[i].totaal_bedrag =totaal_bedrag;
            console.log(winkelwagentje[i].totaal_bedrag);
            console.log(winkelwagentje[i].totaal_stuks);
            
        }
    }

    sessionStorage.setItem('winkelwagentje', JSON.stringify(winkelwagentje));
    toon_winkel_wagentje();



}



function verwijder_bestelling(rowid)
{
    
    var winkelwagentje=haalWinkelwagentjeOp();
    console.log(winkelwagentje);
    
    for(var i=0; i<winkelwagentje.length; i++)
    {
        if(winkelwagentje[i].rowid==rowid)
        {
            final_bedrag=Number(final_bedrag)-Number(winkelwagentje[i].totaal_bedrag);

            winkelwagentje.splice(i,1);
            
        }
    }
    console.log("final bedrag in verwijderen:", final_bedrag);
    console.log(winkelwagentje);
    aantaal_bestellingen--;
    sessionStorage.setItem('aantaal_bestellingen', JSON.stringify(aantaal_bestellingen));
    sessionStorage.setItem('winkelwagentje', JSON.stringify(winkelwagentje));
    toon_winkel_wagentje();
}



   
function promotie_categorie() {
    $.ajax({
        url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=promoties",
        type: "GET"

    }).done(function (json) {
        console.log("read done:");
        console.log(json);
        promotie_cat = json.data.items;
        //console.log(promotie_cat);
       if(promotie_cat=="")
            {

                document.getElementById("promotie_categorie").innerHTML = "<br>" + "<br>" + "<center>" + "<b>" + "Geen Records gevonden" + "</b>" + "</center>";

            }
            else 
            {
                promoties_tonen_cupons(promotie_cat);
                }
    }).fail(function (msg) {
        
        console.log("read fail:");
        console.log(msg);
        
    });
}


function promoties_tonen_cupons(promotie_cat) {
    document.getElementById("promotie_categorie").innerHTML="";
    for (var i = 0; i < promotie_cat.length; i++){
        var prom_cat=""
        prom_cat+= 
                    '<div class="coupon" class="img-fluid z-depth-1 rounded">' +
                        '<div class="container3 text-center">' +
                            '<h3 class:"text-center">'+promotie_cat[i].dag + '</h3>' +
                        '</div>' +
                        '<img src="promotie foto/korting-supermarkt.jpg" alt="Avatar" style="width:100%;">' +
                        '<div class="container3 p-2" style="background-color:white">' +
                        '<h2><b>' + promotie_cat[i].dagen + '</b></h2> ' +
                        '</div>' +
                                    '<div class="container3 text-center">' +
                                    '<p>' +
                                        '<a href="javascript:" type="button" class="btn btn-white btn-outline-default waves-effect btn-lg z-depth-5" onclick="ga_naar_category('+promotie_cat[i].catid+')">'+promotie_cat[i].catnaam+'</a>'+
                                    '</p>' +
                                    '<p class="expire text-center">Expires:' + promotie_cat[i].dag + '</p>' +
                                    '</div>' +
                    '</div>';
                    
        console.log(promotie_cat);
        document.getElementById("promotie_categorie").innerHTML += prom_cat;
    }
    /*if(promid == 1){
        document.getElementById("promotie_categorie").innerHTML=
        `
        <div class="coupon" class="img-fluid z-depth-1 rounded">
            <div class="container3">
                 <h3>Klassieke Broodjes</h3>
            </div>
             <img src="klassieke.jpg" alt="Avatar" style="width:100%;">
            <div class="container3" style="background-color:white">
            <h2><b>20% OFF YOUR PURCHASE</b></h2> 
              <p>Lorem ipsum dolor sit amet, et nam pertinax gloriatur. Sea te minim soleat senserit, ex quo luptatum tacimates voluptatum, salutandi delicatissimi eam ea. In sed nullam laboramus appellantur, mei ei omnis dolorem mnesarchum.</p>
            </div>
                        <div class="container3">
                          <p>
                            <a href="javascript:" type="button" id="klassieke" class="btn btn-white btn-outline-default waves-effect btn-lg z-depth-5" onclick="ga_naar_category('1','klassieke')"><i class="fas fa-bread-slice fa-sm pr-2"aria-hidden="true"></i>KLASSIEKE BROODJES</a>
                          </p>
                          <p class="expire">Expires: Donderdag</p>
                        </div>
        </div>
        `
    }
    if(promid == 2){
        document.getElementById("promotie_categorie").innerHTML=
        `
        <div class="mb-1 pics animation all 2" data-toggle="modal" data-target="#basicExampleModal">
            <div class="mb-3 pics all 1 animation" data-toggle="modal" data-target="#basicExampleModal">
                <div class="coupon" class="img-fluid z-depth-1 rounded">
                    <div class="container3">
                    <h3>Speciale Broodjes</h3>
                    </div>
                    <img src="speciale.jpg" alt="Avatar" style="width:100%;">
                    <div class="container3" style="background-color:white">
                    <h2><b>20% OFF YOUR PURCHASE</b></h2> 
                    <p>Lorem ipsum dolor sit amet, et nam pertinax gloriatur. Sea te minim soleat senserit, ex quo luptatum tacimates voluptatum, salutandi delicatissimi eam ea. In sed nullam laboramus appellantur, mei ei omnis dolorem mnesarchum.</p>
                    </div>
                    <div class="container3">
                    <p>
                        <a href="javascript:" type="button" id="speciale" class="btn btn-white btn-outline-default waves-effect btn-lg z-depth-5" onclick="ga_naar_category('2','speciale')"><i class="fas fa-hamburger fa-sm pr-2"aria-hidden="true"></i>SPECIALE BROODJES</a>
                    </p>
                    <p class="expire">Expires: Dinsdag</p>
                    </div>
                </div>
            </div>  
        </div>          
        `
    }
    if(promid == 3){
        document.getElementById("promotie_categorie").innerHTML=

        `
        <div class="mb-2 pics all 2 animation" data-toggle="modal" data-target="#basicExampleModal">
            <div class="coupon" class="img-fluid z-depth-1 rounded">
            <div class="container3">
                <h3>Koude Schotels</h3>
            </div>
            <img src="koudeschotel.jpg" alt="Avatar" style="width:100%;">
            <div class="container3" style="background-color:white">
                <h2><b>20% OFF YOUR PURCHASE</b></h2> 
                <p>Lorem ipsum dolor sit amet, et nam pertinax gloriatur. Sea te minim soleat senserit, ex quo luptatum tacimates voluptatum, salutandi delicatissimi eam ea. In sed nullam laboramus appellantur, mei ei omnis dolorem mnesarchum.</p>
            </div>
            <div class="container3">
                <p>
                <a href="javascript:" type="button" id="schotel" class="btn btn-white btn-outline-default waves-effect btn-lg z-depth-5" onclick="ga_naar_category('3','koudeschotel')"><i class="fas fa-utensils fa-sm pr-2"aria-hidden="true"></i>KOUDE SCHOTELS</a>
                </p>
                <p class="expire">Expires: Woensdag</p>
            </div>
            </div>
        </div>
        `
    }*/
}