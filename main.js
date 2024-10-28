var onoff = false;
var sceneOptions = [];
var maxScobjLen = 8;
var wybrane=0;
var previewc = "";
var programc = "";
var globalBackground = "#000000";
var trescPliku = "";
var temptext = "";

function moveslide(directon) {
    if (directon == "up") {
        if (wybrane != 0) {
            wybrane--;
            moveTo(wybrane, 1);
        }
    } else if (directon == "down") {
        if (wybrane != (sceneOptions.length - 1)) {
            wybrane++;
            moveTo(wybrane, -1);
        }
    } else if (directon == "left") {
        // tu będzie kod dla przesunięcia wstecz
    } else if (directon == "right") {
        // tu będzie kod dla przesunięcia na następny slajd
    }
    console.log(directon);
}

function convertText(text) {
    return text.replace(/\n/g, '<br>');
}

function power() {
    if (onoff == false) {
        onoff = true;
        $(".btp").text("Wyłącz");
        // kod dla włączenia rzutnika
        $("#program").html(programc);
        $("#program").css({
            "background-color": globalBackground
        });
    } else if (onoff == true) {
        onoff = false;
        $(".btp").text("Włącz");
        // kod dla wyłączenia rzutnika
        $("#program").html("");
        $("#program").css({
            "background-color": "black"
        });
    }
    console.log("Power state:" + onoff);
}

function addToScene(slideToAdd, selected) {
    if (sceneOptions.length == maxScobjLen) {
        return false;
    } else {
        sceneOptions.push(slideToAdd)
        var styleclass = "scobj";
        if (selected) {
            styleclass = "scobj scselected";
        }
        var divLook = '<div class="'+styleclass+'" id="ObjN'+slideToAdd.id+'" onclick="moveTo(' + slideToAdd.id + ', 0);">' + slideToAdd.tytul + '</div>';
        $("#scene").append(divLook);
        if (selected) {
            moveTo(0, 0);
            $("#preview").html(convertText(slideToAdd.tresc));
        }
        return true;
    }
}

function addSlide() {
    var title = $("#tytul").val();
    var intxt = $("#tresc").val();
    if (title == "" || intxt == "") {
        alert("Pola NIE MOGĄ zostać puste!");
        return false;
    }
    for (var i = 0; i < sceneOptions.length; i++) {
        var zaznaczone = sceneOptions[i];
        if (title == zaznaczone.tytul) {
            var decyzja = confirm("Na liście znajduje się już element o takiej nazwie. Czy chcesz dodać drugi taki sam?");
            if (decyzja) {
                break;
            } else {
                return false;
            }
        }
    }
    $("#tytul").val('');
    $("#tresc").val('');
    var tempobj = {id: sceneOptions.length, tytul: title, tresc: intxt};
    var first = false;
    if (sceneOptions.length == 0) {
        first = true;
    }
    var tryToUpdate = addToScene(tempobj, first);
    if (tryToUpdate == false) {
        alert("Maksymalna liczba objektów na liście to " + maxScobjLen);
        console.log("Maksymalna liczba objektów na liście to " + maxScobjLen);
    } else {
        console.log(tempobj);
        console.log("Added succesfully");
    }
}

function moveTo(slideid, dirm) {
    var slideToAdd = sceneOptions[slideid];
    var oldWybrane = wybrane + dirm;
    wybrane=slideid;
    var oldSelect = document.getElementById("ObjN"+oldWybrane);
    var newSelect = document.getElementById("ObjN"+wybrane);
    oldSelect.setAttribute("style", "border: 1px solid magenta;");
    newSelect.setAttribute("style", "border: 1px solid turquoise;");
    previewc = convertText(slideToAdd.tresc);
    programc = previewc;
    console.log(slideToAdd);
    $("#preview").html(previewc);
    if (onoff == true) {
        $("#program").html(programc);
    }
}

function colorApply() {
    var bgcolor = $("#bgcolor").val();
    globalBackground = bgcolor;
    var txcolor = $("#txcolor").val();
    var txsize = $("#txsize").val();
    var justing = document.getElementById("justing");
    $(".disp").css({
        "color": txcolor,
        "font-size": txsize
    });
    $("#preview").css({
        "background-color": bgcolor
    })
    if (onoff == true) {
        $("#program").css({
            "background-color": bgcolor
        })
    }
    if (justing.checked) {
        $(".disp").css({
            "text-align": "justify"
        });
    } else {
        $(".disp").css({
            "text-align": "center"
        });
    }
    console.log("bg-color: "+bgcolor + " tx-color: "+txcolor + " tx-size: "+ txsize + " justify: " + justing.checked);
}

function loremIpsum() {
    var testSceneObject = {id: sceneOptions.length, tytul: "Testowa Scena", tresc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et bibendum mauris. Aliquam urna velit, aliquet finibus mollis sed, condimentum pharetra eros. Pellentesque id velit sagittis, consequat urna vitae, imperdiet nunc."};
    var tryToUpdate = addToScene(testSceneObject);
    if (tryToUpdate == false) {
        alert("Maksymalna liczba objektów na liście to " + maxScobjLen);
        console.log("Maksymalna liczba objektów na liście to " + maxScobjLen);
    } else {
        console.log(testSceneObject);
        console.log("Added succesfully");
        if (sceneOptions.length == 1) {
            moveTo(0, 0);
            $("#preview").html(convertText(testSceneObject.tresc));
        }
    }
}

function turnColors() {
    var bgcin = $("#bgcolor").val();
    var txcin = $("#txcolor").val();
    var oldbg = bgcin;
    $("#bgcolor").val(txcin);
    $("#txcolor").val(oldbg);
}

function clearlist() {
    var potwierdz = confirm("Czy na pewno chcesz trwale usunąć WSZYSTKIE sceny?");
    if (potwierdz) {
        wybrane = 0;
        sceneOptions = [];
        previewc = "";
        programc = "";
        $("#preview").html("");
        $("#scene").html("");
        $("#tytul").val('');
        $("#tresc").val('');
        if (onoff) {
            power();
        }
    }
}

function delitem() {
    var potwierdz = confirm("Czy na pewno chcesz trwale usunąć zaznaczony slajd?");
    if (potwierdz) {
        var ileCofnac = 0;
        var nowaLista = [];
        for (var i = 0; i < sceneOptions.length; i++) {
            if (sceneOptions[i].id == wybrane) {
                ileCofnac++;
            } else {
                var tempobj = {id: i-ileCofnac, tytul: sceneOptions[i].tytul, tresc: sceneOptions[i].tresc};
                nowaLista.push(tempobj);
            }
        }
        sceneOptions = nowaLista;
        $("#scene").html("");
        if (nowaLista.length != 0) {
            wybrane = 0;
            for (var i = 0; i < nowaLista.length; i++) {
                var styleclass = "scobj";
                if (i == wybrane){
                    styleclass = "scobj scselected";
                }
                var testElement = '<div class="'+styleclass+'" id="ObjN'+i+'" onclick="moveTo(' + i + ', 0);">' + nowaLista[i].tytul + '</div>';
                $("#scene").append(testElement);
            }
            $("#preview").html(nowaLista[wybrane].tresc);
            if (onoff) {
                $("#program").html(nowaLista[wybrane].tresc);
            }
        }
    }
}

function importFile() {
    if (sceneOptions.length == maxScobjLen) {
        alert("Nie można zaimportować, na liście jest więcej niż " + maxScobjLen + " elementów!");
        return;
    }
    var plikDoOtwarcia = $("#scheme")[0].files[0];
    if (plikDoOtwarcia) {
        var nazwaPliku = plikDoOtwarcia.name;
        var rozszerzenie = nazwaPliku.split('.').pop().toLowerCase();
        if (rozszerzenie != "slf") {
            alert("Plik musi mieć rozszerzenie .slf!");
            return;
        }

        var reader = new FileReader();
        reader.onload = function(e) {
            var tekst2 = e.target.result;
            final = tekst2.replace(/\r?\n/g, '<br>');
            var zamienNaListe = final.split("<br>");
            var uzyskanyTytul = zamienNaListe.shift();
            var uzyskanaTresc = zamienNaListe.join("<br>");
            console.log(uzyskanyTytul + "<->" + uzyskanaTresc);
            var aktualnaDlugosc = sceneOptions.length;
            var defaultSelect = false;
            var classToAdd = "scobj";
            var styleLook = "border: 1px solid magenta";
            if (aktualnaDlugosc == 0) {
                classToAdd = "scobj scselected";
                styleLook = "border: 1px solid turquoise";
                defaultSelect = true;
            }
            var divLook = "<div class='"+classToAdd+"' id='ObjN"+aktualnaDlugosc+"' onclick='moveTo("+aktualnaDlugosc+", 0);' style='"+styleLook+"'>"+uzyskanyTytul+"</div>";
            var objLook = {id: aktualnaDlugosc, tytul: uzyskanyTytul, tresc: uzyskanaTresc};
            sceneOptions.push(objLook);
            $("#scene").append(divLook);
            if (defaultSelect) {
                previewc = uzyskanaTresc;
                $("#preview").html(uzyskanaTresc);
                if (onoff) {
                    programc = uzyskanaTresc;
                    $("#program").html(uzyskanaTresc);
                }
            }
            console.log(divLook);
            console.log(objLook);
        };
        reader.readAsText(plikDoOtwarcia);
    } else {
        alert("Wybierz plik!");
    }
}

function downloadFile() {
    var fileObjToDownload = sceneOptions[wybrane];
    var fileName = fileObjToDownload.tytul.toLowerCase();
    fileName = fileName.replace(/\s+/g, '_').replace(/[^a-zA-Z0-9-_]/g, '') + '.slf';
    var fileContent = fileObjToDownload.tytul + "<br>" + fileObjToDownload.tresc;
    fileContent = fileContent.replace(/<br\s*\/?>/gi, '\n');
    console.log(fileName);
    console.log(fileContent);
    var blob = new Blob([fileContent], { type: 'text/plain' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}