var list = [];

function getTotal(list)
{
    var total = 0;

    for(var key in list)
    {
        total += list[key].value * list[key].amount;
    }

    document.getElementById("totalValue").innerHTML = formatValue(total);
}

function setList(list)
{
    var table = '<thead><tr><td>Description</td><td>Amount</td><td>Value</td><td>Action</td></tr></thead><tbody>';

    for(var key in list)
    {
        table += '<tr><td>' + formatDesc( list[key].desc ) + '</td><td>' + formatAmount( list[key].amount ) + '</td><td>' + formatValue(list[key].value) + '</td><td><button class="btn btn-default" onclick="setUpdate(' + key + ');">Edit</button><button class="btn btn-default" onclick="deleteData(' + key + ');">Delete</button></buttton></td></tr>';
    }

    table += '</tbody>';

    document.getElementById("listTable").innerHTML = table;

    getTotal(list);
    saveListStorage(list);
}

function formatDesc(desc)
{
    //Transforma o texto para minusculo
    var str = desc.toLocaleLowerCase();
    //Pega o Primeiro caracter da string e deixa ela maiuscula
        str = str.charAt(0).toUpperCase() + str.slice(1);

    return str;
}

function formatAmount(amount)
{
    return parseInt(amount);
}

function formatValue(value)
{
    // colocando dois numeros depois do ponto
    var str = parseFloat(value).toFixed(2) + "";
        str = str.replace(".", ",");
        str = 'R$ ' + str;

    return str;
}

function addData()
{
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    if( validade() == 0){
        return false;
    }else{
        list.unshift({"desc" : desc, "amount" : amount, "value" : value});
        document.getElementById("desc").style.borderColor = "";
        document.getElementById("amount").style.borderColor = "";
        document.getElementById("value").style.borderColor = "";
    }

    setList(list);

    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
}

function setUpdate(id)
{
    var obj = list[id];

    document.getElementById("desc").value = obj.desc;
    document.getElementById("amount").value = obj.amount;
    document.getElementById("value").value = obj.value;
    document.getElementById("btnUpdate").style.display = "inline-block";
    document.getElementById("btnAdd").style.display = "none";
    document.getElementById("inputIdUpdate").innerHTML = '<input id="idUpdate" type="hidden" value="' + id + '">'
}

function resetForm()
{
    document.getElementById("desc").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("value").value = "";
    document.getElementById("btnAdd").style.display = "inline-block";
    document.getElementById("btnUpdate").style.display = "none";

    document.getElementById("idUpdate").innerHTML = "";
    document.getElementById("errors").style.display = "none";
}

function updateData()
{
    var id = document.getElementById("idUpdate").value;
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;

    if( validade() == 0){
        return false;
    }else{
        list[id] = {"desc" : desc, "amount" : amount, "value" : value};
        document.getElementById("desc").style.borderColor = "";
        document.getElementById("amount").style.borderColor = "";
        document.getElementById("value").style.borderColor = "";
    }

    resetForm();
    setList(list);
}

function deleteData(id)
{
    if(confirm("Delete this item?"))
    {
        if(id === list.length - 1)
        {
            list.pop();
        }else if(id === 0)
        {
            list.shift();
        }else{
            var arrayAuxIni = list.slice(0, id);
            var arrayAuxEnd = list.slice(id + 1);

            list = arrayAuxIni.concat(arrayAuxEnd);
        }

        setList(list);
    }
}

function validade()
{
    var desc = document.getElementById("desc").value;
    var amount = document.getElementById("amount").value;
    var value = document.getElementById("value").value;
    var errors = "";

    if (desc === ""){
        errors = true;
        document.getElementById("desc").style.borderColor = "red";

    }
    if (amount === "" || amount != parseInt(amount)){

        errors = true;
        document.getElementById("amount").style.borderColor = "red";

    }

    if( value === ""){

        errors = true;
        document.getElementById("value").style.borderColor = "red";

    }

    if (errors == true){
        document.getElementById("errors").style.display = "inline-block";
        document.getElementById("errors").style.backgroundColor = "rgba(85, 85, 85, 0.3)";
        document.getElementById("errors").style.color = "white";
        document.getElementById("errors").style.padding = "10px";
        document.getElementById("errors").style.margin = "10px";
        document.getElementById("errors").style.borderRadius = "13px";
        document.getElementById("errors").innerHTML = "<h3>Error:</h3>" + "Verifique os campos em vermelho";

        return 0;
    }else{
        return 1;
    }
}

function deleteList() {
    if(confirm("Delete this list?")){
        list = [];
        setList(list);
    }
}

function saveListStorage(list) {
    var jsonStr = JSON.stringify(list);

    localStorage.setItem("list", jsonStr);
}

function initListStorage(){
    var testList = localStorage.getItem("list");

    if(testList){
        list = JSON.parse(testList);
    }

    setList(list);
}

initListStorage();