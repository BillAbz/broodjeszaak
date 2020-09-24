var producten=[];
var category=[];


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

function lees_data() {
    $.ajax({
        method: 'GET',
        url: "https://api.data-web.be/item/read?project=fjgub4eD3ddg&entity=category",
        headers: { "Authorization": "Bearer " + sessionStorage.getItem("token") },

    })
        .done(function (response) {

            category = response.data.items
            console.log(producten)

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
        })

}


function maak_tabel() {

    document.getElementById("productendata").innerHTML = "";

    for (var i = 0; i < producten.length; i++) {


        if (producten[i].id !== null) {

            var catnaam = haalcatnaam(producten[i].cid);
            //console.log(catnaam);
            var tabledata = "";
            tabledata += "<tr>";
           
            tabledata += "<td>" + producten[i].naam + "</td>";
            tabledata += "<td>" + producten[i].omschrijving + "</td>";
            tabledata += "<td>" + '<img src="https:'+assets_path + "/" + producten[i].beeld.name+'" />' + "</td>";

            //tabledata += "<td>" + +"</td>";
           
            tabledata += "<td>" + `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#drankjes_details" onclick="">Kueze</button>` +
            "</td>";
            tabledata += "</tr>";

            document.getElementById("drankjesdata").innerHTML += tabledata;
        }
    }


}


function haalcatnaam(catid) {

    for (var i = 0; i < producten_category.length; i++) {
        if (producten_category[i].cid == catid) {
            return producten_category[i].cnaam;

        }

    }

}
