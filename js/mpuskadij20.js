window.addEventListener("load", Dogadaji);

function Dogadaji() {

    let naslovTrenutneStranice = document.title;

    if (naslovTrenutneStranice != "Prijava") {

        ProvjeraKolacica();

        let prijava = document.getElementById("prijava");

        //na temelju teksta poveznice za prijavu, mijenjaju se radnje
        prijava.addEventListener("click", function(e) {
            if (prijava.innerText == "Odjava")
            {
                //zaustavi učitavanje prijave ako smo trenutno prijavljeni
                e.preventDefault();

                //brisanje kolačića tako da stavim datum na 1.1.1970.
                document.cookie = "korisnicko_ime=;expires=Thu, 01 Jan 1970 00:00:01 GMT;secure=true";
                document.cookie = "lozinka=;expires=Thu, 01 Jan 1970 00:00:01 GMT;secure=true";

                ProvjeraKolacica();

            }
        })


        var navigacija = document.getElementsByTagName("nav");
        console.log(navigacija);
        var linkoviNavigacije = navigacija.children;

        console.log(linkoviNavigacije);

        for (link of navigacija[0].children) {
            link.addEventListener("click", function (e) {
                if (window.confirm("Želite li napustiti stranicu?") === true) {
                    document.location.pathname = link.href.value;
                }
                else {
                    alert("Ostajemo na stranici: " + document.title);
                    e.preventDefault();
                }
            })
        }
        //Zadaća 3. 1.b
        let logo = document.getElementsByClassName("logo");
        logo = logo[0].children[0];
        logo.addEventListener("mouseover", animacija);
        



        //Zadaća 3 1.a
        let podnozje = document.getElementsByTagName("footer");
        console.log(podnozje);
        let licenca = podnozje[0].children[0];
        

        licenca.addEventListener("mouseover", povecanjeSadrzaja);
    }


    switch (naslovTrenutneStranice) {
        case 'Početna stranica':

            break;
        case 'Obrazac': {
            var tematika = document.getElementsByTagName("fieldset");
            tematika[1].style = "display:none;";

            let ime = document.getElementById("naziv_spidermana");
            ime.value = "FOI-man";

            let tekst = document.getElementById("opis_spidermana");
            tekst.value = "bla bla bla";

            var inputi = document.getElementsByTagName("input");
            console.log(inputi);

            for (input of inputi) {
                if (input.type == "radio") input.checked = false;
            }

            console.log(inputi);

            let gumbZaSlanje = inputi[inputi.length - 2];
            console.log(gumbZaSlanje);
            gumbZaSlanje.addEventListener("click", ProvjerObrasca);

            break;
        }
        case "Prijava":
            {
                let gumbLogin;
                let inputiPrijave = document.getElementsByTagName("input");

                //Promađi submit gumb i pohrani u gumbLogin
                for (input of inputiPrijave) {
                    if (input.type == "submit") {
                        gumbLogin = input;
                        break;
                    }
                }

                gumbLogin.addEventListener("click", stvoriKolacic);
                

                break;
            }
    }


}

function ProvjerObrasca(dogadaj) {
    var inputi = document.getElementsByTagName("input");
    dogadaj.preventDefault();

    let dalje = true;

    let label = document.getElementsByTagName("label");

    let visestruki = document.getElementById("sposobnosti");

    let brojOpcija = visestruki.selectedOptions;
    if (brojOpcija.length < 2) {
        dalje = false;
        for (i of label) {
            if (i.innerHTML == "Sposobnosti:") {
                i.innerHTML = "Sposobnosti: *";
                visestruki.style = "border-color:gold;";
            }
        }
    }

    for (input of inputi) {
        switch (input.type) {
            case 'number':
                if (input.value < 0 || input.value > 100) {
                    dalje = false;
                    console.log(label);
                    for (i of label) {
                        if (i.innerHTML == "Godine:") {
                            i.innerHTML = "Godine: *";
                            input.style = "border-color:gold;";
                        }
                    }
                }
                break;
            /*  case 'radio':
              
                  let i = 1;
                  let odabiri = document.getElementsByName("osoba_ispod");
                  console.log(odabiri);
                  let odabran = Array.prototype.slice.call(odabiri).some(x => x.checked);
  
                  if (!odabran) {
                      for (i of label) {
                          if (i.innerHTML == "Osoba ispod maske:") {
                              i.innerHTML += "Osoba ispod maske: *";
                          }
                      }
                  }
  
  
                  break;
                  */

        }

    }
    let odabiri = document.getElementsByName("osoba_ispod");
    console.log(odabiri);
    let radioOdabran = Array.prototype.slice.call(odabiri).some(x => x.checked);

    if (!radioOdabran) {
        dalje = false;
        for (i of label) {
            if (i.innerHTML == "Osoba ispod maske:") {
                i.innerHTML += " *";
                i.style = "background-color:gold;";
            }
        }
    }

    if (dalje) {
        let url = document.getElementById("wiki");
        url.value = "https://hr.wikipedia.org/wiki/Spider-Man";

        var tematika = document.getElementsByTagName("fieldset");
        tematika[0].style = "display:none;";
        tematika[1].style = "display:inline";


        let gumbZaSlanje = inputi[inputi.length - 2];
        gumbZaSlanje.addEventListener("click", function (e) {
            console.log("radi");

            var checkboxi = document.querySelectorAll('input[type="checkbox"]');
            odabran = Array.prototype.slice.call(checkboxi).some(x => x.checked);
            brojOpcija = 0;
            for (jedanCheckbox of checkboxi) {
                if (jedanCheckbox.checked) brojOpcija++;
            }
            if (brojOpcija < 2) {
                dalje = false;
                for (i of label) {
                    if (i.innerHTML == "Neprijatelji njegovog svemira:") {
                        i.innerHTML += " *";
                        i.style = "background-color:gold;";
                    }
                }
            }

            if (dalje) document.getElementById('forma').submit();




        })



    }


}
function povecanjeSadrzaja()
{
    let id = null;
    let podnozje = document.getElementsByTagName("footer");
    let licenca = podnozje[0].children[0].firstElementChild;
    let trenutnaSirina = 0;
    clearInterval(id);
    id = setInterval(uvecaj, 10);

    function uvecaj()
    {
        if (trenutnaSirina == 200)
        {
            clearInterval(id);
        }
        else
        {
            trenutnaSirina++;
            licenca.style.left = trenutnaSirina + "px";
        }
        
    }
}

function animacija() {
    let id = null;
    let logoLink = document.getElementsByClassName("logo");
    let slika = logoLink[0].children[0];
    let trenutniStupanj = 0;
    clearInterval(id);
    id = setInterval(frame, 10);

    function frame()
    {
        if (trenutniStupanj == 360)
        {
            clearInterval(id);
        }
        else
        {
            trenutniStupanj++;
            slika.style.transform = "rotate(" + trenutniStupanj + "deg)";
        }
        
    }

}


//stvaranje kolačića na temelju ispunjenih podataka za login
function stvoriKolacic() {
    let korisnickoIme = document.getElementById("korisnicko_ime");
    let lozinka = document.getElementById("lozinka");
    let trenutnoVrijeme = new Date();
    trenutnoVrijeme.setTime(trenutnoVrijeme.getTime() + 60000);
    document.cookie = "korisnicko_ime=" + korisnickoIme.value + ";expires=" + trenutnoVrijeme + ";secure=true";
    document.cookie = "lozinka=" + lozinka.value + ";expires=" + trenutnoVrijeme + ";secure=true";

    //vrati se na prethodnu stranicu
    window.history.back();
}


//utvrdi postoji li kolačić ili ne;
function ProvjeraKolacica()
{
    if (document.cookie.split(";").some((imeKolacica) => imeKolacica.trim().startsWith("korisnicko_ime=")))
    {
        zamjenaTeksta("Odjava");
        
        
    }
    else
    {
       zamjenaTeksta("Prijava");
    }

}

//funkcija zamjenjuje tekst "Prijava" i "Odjava"
function zamjenaTeksta(tekstLinka)
{
    let linkPrijave = document.getElementById("prijava");
    linkPrijave.innerText = tekstLinka;
}

