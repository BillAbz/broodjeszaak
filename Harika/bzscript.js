var producten=[];
var category=[];
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
                    maak_tabel()

                })
        }) .fail(function (msg) {
        
            console.log("read fail:");
            console.log(msg);
            
        });
    

}


function maak_tabel() {

   document.getElementById("drankjesdata").innerHTML = "";

    for (var i = 0; i < producten.length; i++) 
    {


        if (producten[i].pid !== null) 
        {

            var tabledata = "";
            var catid = producten[i].catid;

            if(catid==4)
            {
            
            
                tabledata += "<tr>";
           
                tabledata += "<td>" + producten[i].pnaam + "</td>";
                tabledata += "<td>" + + "</td>";
                tabledata += "<td>" + + "</td>";
                /*
                DO NOT DELETE THIS COMMENT
                tabledata += "<td>" + '<img src="https:'+assets_path + "/" + producten[i].beeld.name+'" />' + "</td>";
                */
           
                tabledata += "<td>" + `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#drankjes_details" onclick="product_gekozen(${producten[i].pid})">Kueze</button>` +
                            "</td>";
                tabledata += "</tr>";

                document.getElementById("drankjesdata").innerHTML += tabledata;
            }
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

                return;
            }
     }
}

function product_gekozen(pid)
{
    product_gevonden(pid);
   
    document.getElementById("pnaam").value = huidig_product.pnaam;


    /*var aantalstukjes = Number(document.getElementById("quantity").value);
    var prijs = aantalstukjes * huidig_product.prodprijs;
    console.log(prijs);
    console.log(huidig_product);
    document.getElementById("totaalprijsdrankjes").value = prijs;
    
    //document.getElementById("beeld").value = huidig_product.beeld;
    //json stringify

    //document.getElementById("beeldoriginal").value = JSON.stringify(huidig_product.beeld);

    //console.log(image);*/

   
}

