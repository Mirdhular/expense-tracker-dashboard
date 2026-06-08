// Student project - Expense Tracker Dashboard

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const transactionList = document.getElementById("transactionList");

let chart;

function addTransaction(){

    const description =
        document.getElementById("description").value;

    const amount =
        Number(document.getElementById("amount").value);

    if(description === "" || amount === 0){
        alert("Please fill all fields");
        return;
    }

    const transaction = {
        description,
        amount
    };

    transactions.push(transaction);

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";

    updateUI();
}

function updateUI(){

    transactionList.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach((transaction)=>{

        const li = document.createElement("li");

        li.innerHTML = `
            <span>${transaction.description}</span>
            <span>₹${transaction.amount}</span>
        `;

        transactionList.appendChild(li);

        if(transaction.amount > 0){
            income += transaction.amount;
        }else{
            expense += Math.abs(transaction.amount);
        }

    });

    balanceEl.textContent = `₹${income-expense}`;
    incomeEl.textContent = `₹${income}`;
    expenseEl.textContent = `₹${expense}`;

    createChart(income,expense);
}

function createChart(income,expense){

    const ctx =
        document.getElementById("expenseChart");

    if(chart){
        chart.destroy();
    }

    chart = new Chart(ctx,{
        type:"doughnut",
        data:{
            labels:["Income","Expense"],
            datasets:[{
                data:[income,expense]
            }]
        }
    });
}

updateUI();