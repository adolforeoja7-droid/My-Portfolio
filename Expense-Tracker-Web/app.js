let expenses = JSON.parse(
localStorage.getItem("expenses")
) || [];



function addExpense(){


let name =
document.getElementById("expenseName").value;


let amount =
Number(
document.getElementById("expenseAmount").value
);



if(name==="" || amount<=0){

alert("Enter valid expense");

return;

}



expenses.push({

name:name,

amount:amount

});



localStorage.setItem(
"expenses",
JSON.stringify(expenses)
);



document.getElementById("expenseName").value="";

document.getElementById("expenseAmount").value="";


displayExpenses();


}




function displayExpenses(){


let list =
document.getElementById("expenseList");


list.innerHTML="";


let total=0;



expenses.forEach((expense,index)=>{


total += expense.amount;


let li =
document.createElement("li");


li.innerHTML = `

${expense.name}
-
₱${expense.amount}

<button onclick="deleteExpense(${index})">
Delete
</button>

`;



list.appendChild(li);



});



document.getElementById("total")
.innerHTML = total;



}



function deleteExpense(index){


expenses.splice(index,1);



localStorage.setItem(

"expenses",

JSON.stringify(expenses)

);



displayExpenses();


}



displayExpenses();