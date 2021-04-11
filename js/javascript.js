$(function() {
	$('.dates #usr1').datepicker({
		'format': 'yyyy-mm-dd',
		'autoclose': true
	});
});

function setMonth(){
	var d = new Date();
    var a = d.getMonth();
	var year = d.getFullYear();
    var months = {0: "January", 1: "February", 2: "March", 3: "April", 4: "May", 5: "June", 6: "July", 7: "August", 8: "October", 9: "September", 10:"November", 11:"December"};
    month = months[a];
    document.getElementById('budget_month').innerHTML = month +" "+ year;
}


// local storage
var locincobj = [];
var locexpobj = [];
function setLocalIncomeObject(){
    addLocalStorage('localincomedata',locincobj);
  }
function setLocalExpObject(){
    addLocalStorage('localexpdata',locexpobj);
  }

  //Functions to store and retrieve objects from localstorage
  function addLocalStorage(name,obj){
    localStorage.setItem(name, JSON.stringify(obj));      
  };
  function readLocalStorage(name){
    return JSON.parse(localStorage.getItem(name));
  };

  //If our localstroage items are empty let's store the localobject
  if(readLocalStorage('localincomedata') == null){
    setLocalIncomeObject();
  }
  if(readLocalStorage('localexpdata') == null){
    setLocalExpObject();
  }
     $(document).ready(function() {
      var readlocalincome = readLocalStorage('localincomedata');
      var calincome = 0;var calexp = 0;
      // read data from local storage if avaiable
      for (var i in readlocalincome) {
        calincome = calincome +  readlocalincome[i].money;
        $('<tr><td id = "title">'+readlocalincome[i].title+'</td><td>'+readlocalincome[i].money+'</td><td>'+readlocalincome[i].paymentmode+'</td><td>'+readlocalincome[i].date+'</td></tr>').appendTo('.income_table_body');
      }
      // set total income value
      $("#incomevalue").text(" +"+calincome);
      // read data from local storage if available
      var readlocalexp = readLocalStorage('localexpdata');
      for (var i in readlocalexp) {
        calexp = calexp +  readlocalexp[i].money;
        $('<tr><td>'+readlocalexp[i].title+'</td><td>'+readlocalexp[i].money+'</td><td>'+readlocalexp[i].paymentmode+'</td><td>'+readlocalexp[i].date+'</td></tr>').appendTo('.expenses_table_body');
      }
      $("#expensesvalue").text(" -"+calexp);
      var total = calincome - calexp;
        if (total >= 0) {
          document.getElementById('totalbudget').innerHTML = '+ '+total;
        }
        else{
          document.getElementById('totalbudget').innerHTML = total; 
        }
    });


// 


// get data available in fields
function getFieldData() {
  return  {
    "type":document.getElementById('type').value,
    "title":document.getElementById('title').value,
    "paymentmethod":document.getElementById('paymethod').value,
    "value":parseFloat(document.getElementById('money').value),
    "date":document.getElementById('usr1').value
  }
}

// add dynamically row in tables
function addIncomeDataRow(title,amount,paymentmethod,date){
$('<tr><td id = "title">'+title+'</td><td>'+amount+'</td><td>'+paymentmethod+'</td><td>'+date+'</td></tr>').appendTo('.income_table_body');
}
function incomedeletecalclick(){
  $(document).ready(function(){
    alert(document.getElementById('lun').name);
  });
}
// add dynamically row in tables
function addExpensesDataRow(title,amount,paymentmethod,date){
$('<tr><td>'+title+'</td><td>'+amount+'</td><td>'+paymentmethod+'</td><td>'+date+'</td></tr>').appendTo('.expenses_table_body');
}


// add record in tables
function addRecord(){
  var data = getFieldData();
    if (data.type !== "Type" && data.title !== "" && data.paymentmethod !== "PayMethod" && data.value > 0 && data.date !== "") {
      if (data.type == "Income") {
        // dynamicaly add row
        addIncomeDataRow(data.title,data.value,data.paymentmethod,data.date);
        calculateIncomeTotal(data.value);
        var incrow = {
          title:data.title,
          money:data.value,
          paymentmode:data.paymentmethod,
          date:data.date
        };
        var jsonobj = readLocalStorage('localincomedata');
        arr = [];
        for (var i in jsonobj) {
          arr .push({
            title:jsonobj[i].title,
            money:jsonobj[i].money,
            paymentmode:jsonobj[i].paymentmode,
            date:jsonobj[i].date
          });
        }
        arr.push(incrow);
        addLocalStorage("localincomedata",arr);
      }
      // 
      else if(data.type == "Expenses") {
        // dynamicaly add row
      	addExpensesDataRow(data.title,data.value,data.paymentmethod,data.date);
        calculateExpensesTotal(data.value);
        //
        var exprow = {
          title:data.title,
          money:data.value,
          paymentmode:data.paymentmethod,
          date:data.date
        };
        var jsonobj = readLocalStorage('localexpdata');
        arr = [];
        for (var i in jsonobj) {
          arr .push({
            title:jsonobj[i].title,
            money:jsonobj[i].money,
            paymentmode:jsonobj[i].paymentmode,
            date:jsonobj[i].date
          });
        }
        arr.push(exprow);
        addLocalStorage("localexpdata",arr);
        // 
      }
  }
  else{
    alert("Please Select All Fields");
  }
}

// calculate income total
function calculateIncomeTotal(value) {
        var income = $("#incomevalue").text();
        income = income.substr(2);
        value = parseFloat(value);
        income = parseFloat(income);
        income = value + income;
        document.getElementById('incomevalue').innerHTML = '+ '+income;
        // total budget calculation
        var expnese = $("#expensesvalue").text();
        expnese = expnese.substr(2);
        expnese = parseFloat(expnese);
        var total = income - expnese;
        if (total >= 0) {
          $("#totalbudget").text(" +"+total);
        }
        else{
          $("#totalbudget").text(total);
        }
}

// calculateexpenses total
function calculateExpensesTotal(value) {
  var expnese = $("#expensesvalue").text();
        expnese = expnese.substr(2);
        value = parseFloat(value);
        expnese = parseFloat(expnese);
        expnese = value + expnese;
        document.getElementById('expensesvalue').innerHTML = '- '+expnese;
        // total budget calculation
        var income = $("#incomevalue").text();
        income = income.substr(2);
        income = parseFloat(income);
        var total = income - expnese;
        if (total >= 0) {
          $("#totalbudget").text(" +"+total);
        }
        else{
          $("#totalbudget").text(total);
        }
}
//

// 


function expensesdeletecalclick(){

  // alert("Hi you clicked on expn delete");
}
