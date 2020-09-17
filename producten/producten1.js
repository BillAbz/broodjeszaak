var producten = [{ id: 1, naam: "aaaa", omschrijving: "pro 1", category: "Product Categorie 1", prijs: 100, beeld: "" }, { id: 2, naam: "aaaa1", omschrijving: "pro 2", category: "Product Categorie 2", prijs: 200, beeld: "" }];
var producten_category = [];
var producten_category = [{ cat_naam: "Product Categorie 1", id: 100 }, { cat_naam: "Product Categorie 2", id: 200 },
    { cat_naam: "Product Categorie 1", id: 300 }, { cat_naam: "Product Categorie 4", id: 400 }, { cat_naam: "Product Categorie 5", id: 500 }
];

var poging = 3;
var huidig_product;

function start() {
    vernieuw_producten_tabel();
}



function bewarenproducten() {

    get_form_data();

}

function OnclickofProductToevoegen() {
    document.getElementById("id").value = "";
    document.getElementById("naam").value = "";
    document.getElementById("omschrijving").value = "";
    document.getElementById("prijs").value = "";
    document.getElementById("category").value = "";
    document.getElementById("beeld").value = "";
}

function get_form_data() {
    var id = document.getElementById("id").value;
    var naam = document.getElementById("naam").value;
    var omschrijving = document.getElementById("omschrijving").value;
    var category = document.getElementById("categorie").value;
    var prijs = document.getElementById("prijs").value;
    var beeld = "";
    if (id) {
        var objIndex = producten.findIndex(x => x.id === parseInt(id));
        if (objIndex) {
            //Log object to Console.
            console.log("Before update: ", producten[objIndex])

            //Update object's name property.
            producten[objIndex].id = document.getElementById("id").value;
            producten[objIndex].naam = document.getElementById("naam").value;
            producten[objIndex].omschrijving = document.getElementById("omschrijving").value;
            producten[objIndex].category = document.getElementById("categorie").value;
            producten[objIndex].prijs = document.getElementById("prijs").value;
            //Log object to console again.
            console.log("After update: ", producten[objIndex])
            vernieuw_producten_tabel();
        }
    } else {
        producten.push({
            "id": poging,
            "naam": naam,
            "omschrijving": omschrijving,
            "category": category,
            "prijs": prijs,
            "beeld": beeld
        })
        poging++;



        vernieuw_producten_tabel();
    }

}

function vernieuw_producten_tabel() {
    document.getElementById("productendata").innerHTML = "";

    for (i = 0; i < producten.length; i++) {

        if (producten[i].id !== null) {

            var tabledata = "";
            tabledata += "<tr>";
            tabledata += "<td>" + producten[i].id + "</td>";
            tabledata += "<td>" + producten[i].naam + "</td>";
            tabledata += "<td>" + producten[i].omschrijving + "</td>";
            tabledata += "<td>" + producten[i].category + "</td>";
            tabledata += "<td>" + producten[i].prijs + "</td>";
            tabledata += "<td>" + producten[i].beeld + "</td>";
            tabledata += "<td>" + +"</td>";
            tabledata += "<td>" + `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal_verwijderen" onclick="find_product(${producten[i].id})">Verwijderen</button>` +
                `<button type="button" class="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal_details" onclick="toon_product(${producten[i].id})">Bijwerken</button>` +
                "</td>";
            tabledata += "</tr>";

            document.getElementById("productendata").innerHTML += tabledata;
        }
    }
}


function find_product(prod_id) {
    for (i = 0; i < producten.length; i++) {
        if (prod_id == producten[i].id) {

            huidig_product = producten[i];
            return;
        }
    }
    //gezocht_product= i;
    //return producten[i];
    //console.log(gezocht_product);
    //return gezocht_product;
}

function bevestig_verwijderen() {
    console.log(producten);
    huidig_product.id = null;
    console.log(producten);
    vernieuw_producten_tabel();

    //var product = find_product(verwijder_product_id);
    //huidig_product.id = null;
    //product.naam = "test";
    //delete producten[gezocht_product];
}


function toon_product(prod_id) {
    debugger
    find_product(prod_id);
    document.getElementById("id").value = huidig_product.id;
    document.getElementById("naam").value = huidig_product.naam;
    document.getElementById("omschrijving").value = huidig_product.omschrijving;
    document.getElementById("prijs").value = huidig_product.prijs;
    document.getElementById("category").value = huidig_product.category;
    document.getElementById("beeld").value = huidig_product.beeld;
    console.log(huidig_product);
    bijwerken_producten();


}

function bijwerken_producten() {
    //huidig_product.id = document.getElementById("id").value;
    huidig_product.naam = document.getElementById("naam").value;
    huidig_product.omschrijving = document.getElementById("omschrijving").value
    huidig_product.prijs = document.getElementById("prijs").value
    huidig_product.category = document.getElementById("category").value
    huidig_product.beeld = document.getElementById("beeld").value

    vernieuw_producten_tabel();
    console.log(gezocht_product);

    console.log(huidig_product);
    console.log(producten);


}