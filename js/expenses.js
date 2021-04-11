function readLocalStorage(name){
    return JSON.parse(localStorage.getItem(name));
  };

  //If our localstroage items are empty let's store the localobject
  if(readLocalStorage('localexpdata') == null){
    alert("Not Data Avaiable");
  }
var readlocalexp = readLocalStorage('localexpdata');
  // read data from local storage if avaiable
$(document).ready(function(){
  for (var i in readlocalexp) {
    $('<tr><td>'+readlocalexp[i].title+'</td><td>'+readlocalexp[i].money+'</td><td>'+readlocalexp[i].paymentmode+'</td><td>'+readlocalexp[i].date+'</td></tr>').appendTo('.expenses_table_body');
  }
});