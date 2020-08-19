var Startpagina_webpagina_array=[
    {"id": 10, "naam": "klassieke", "link":"klassieke.html"},
    {"id": 20, "naam": "speciale", "link":"speciale.html"},
    {"id": 30, "naam": "koude", "link":"koude.html"},
    {"id": 40, "naam": "draankjes", "link":"draankjes.html"},
    {"id": 50, "naam": "aanmelden", "link":"aanmelden.html"},
    {"id": 60, "naam": "contact", "link":"contact.html"},
    {"id": 70, "naam": "Promoties", "link":"Promoties.html"},
    {"id": 80, "naam": "wagentje", "link":"wagentje.html"},
    {"id": 90, "naam": "startpagina", "link":"startpagina.html"}
];

var koudeschotel_webpagina_array=[
    {"id": 301, "naam": "Natuur", "prijs": 3, "afbeelding":"natuur.jfif"},
    {"id": 302, "naam": "Hesp", "prijs": 4.50, "afbeelding":"hesp.jfif"},
    {"id": 303, "naam": "Kaas", "prijs": 3.50, "afbeelding":"kaas.jfif"},
    {"id": 304, "naam": "Kip", "prijs": 4, "afbeelding":"kip.jfif"},
    {"id": 305, "naam": "Preparé", "prijs": 5, "afbeelding":"prepare.jfif"},
    {"id": 306, "naam": "Gerookte Zalm", "prijs": 5.50, "afbeelding":"gerookte_zalm.jfif"},
    {"id": 307, "naam": "Rosbief", "prijs": 6, "afbeelding":"rosbief.jfif"}
];


function create_Radio_voor_koudeschotel_pagina()
{
    
    for(i=0; i<koudeschotel_webpagina_array.length;i++)
    {
        var rb = document.createElement("INPUT");
        rb.setAttribute('type', "radio");
        rb.setAttribute('value',koudeschotel_webpagina_array[i].naam);
        rb.setAttribute('name',"radiobutton"); //name for the radiobutton should always be the same for only to be checked
        rb.setAttribute('id', koudeschotel_webpagina_array[i].id );
        rb.setAttribute("onclick",toon_gekozen_waarden);
        var ltag = document.createElement("label");
        ltag.appendChild(rb);
        ltag.innerHTML += "<span> " + koudeschotel_webpagina_array[i].naam + "</span><br>";
        RadioButtonVoorKoudeSchotel.appendChild(ltag); // document.innerHTML("RadioButtonVoorKoudeSchotel")+= rb;
        document.getElementById("RadioButtonVoorKoudeSchotel").innerHTML+= "<br>";
    } 
    //toon_gekozen_waarden();

}

function toon_gekozen_waarden()
{
    var rb_gekozen= document.getElementById("RadioButtonVoorKoudeSchotel");
    console.log(rb_gekozen);
    for(i=0;i<rb_gekozen.length;i++)
    {
        if(rb_gekozen[i].checked)
        {
            document.getElementById("afbeeldingenkoudeschotel").innerHTML=koudeschotel_webpagina_array[i].afbeelding;
            document.getElementById("gekozenkoudeschotelnaam").innerHTML=koudeschotel_webpagina_array[i].naam;
            document.getElementById("gekozenkoudeschotelprijs").innerHTML=koudeschotel_webpagina_array[i].prijs;
        }
    }
}

 //var x = document.getElementById("myRadio").checked;
 // document.getElementById("demo").innerHTML = x;





/*var koudeschotel_opties_array=[
        {id: 301, name: "Natuur", Prijs:3 }, {id: 302, name: "Hesp", Prijs:4.50 },
        {id: 303, name: "Kaas", Prijs: 3.50},{id: 304, name: "Kip", Prijs: 4},
        {id: 305, name: "Preparé", Prijs: 5},{id: 306, name: "Gerookte Zalm", Prijs: 5.50},{id: 307, name: "Rosbief", Prijs: 6},
]

function create_Radio_voor_koudeschotel_pagina()
{
    
    for(i=0; i<koudeschotel_opties_array.length;i++)
    {
        var rb = document.createElement("INPUT");
        rb.setAttribute("type", "radio");
        rb.setAttribute('value',koudeschotel_opties_array[i].name);
        rb.setAttribute('name',"radiobutton");
        rb.setAttribute('id', koudeschotel_opties_array[i].id );
        var ltag = document.createElement("label");
        ltag.appendChild(rb);
        ltag.innerHTML += "<span> " + koudeschotel_opties_array[i].name + "</span><br>";
        RadioButtonVoorKoudeSchotel.appendChild(ltag); // document.innerHTML("RadioButtonVoorKoudeSchotel")+= rb;
        document.getElementById("RadioButtonVoorKoudeSchotel").innerHTML+= "<br>";
    } 
}*/