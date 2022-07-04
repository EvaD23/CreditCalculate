import { calcPayment, calcOverPayment, calcFullCreditPrice, table as calcTable } from './calculating'


function linkInputRange(inputId, rangeId, minValue, maxValue) {
    const input = document.getElementById(inputId);
    const range = document.getElementById(rangeId);
    input.oninput = () => {
        if (input.value > maxValue) {
            input.value = maxValue;
        }
        else if (input.value < minValue) {
            input.value = minValue;
        }

        range.value = input.value;
        calculate();
    }

    range.oninput = () => {
        input.value = range.value;
        calculate();
    }

}

function calculate() {
    const sumCredit = parseInt(document.getElementById('sum-credit').value);
    const termMonth = document.getElementById('term-credit').value * 12;
    const rateCredit = document.getElementById('rate-credit').value;
    const payment = calcPayment(sumCredit, termMonth, rateCredit);
    const overpayment = calcOverPayment(termMonth, payment, sumCredit);
    const fullCreditPrice = calcFullCreditPrice(sumCredit, overpayment);

    document.getElementById('monthly-payment').innerText = payment.toFixed(2);
    document.getElementById('overpayment').innerText = overpayment.toFixed(2);
    document.getElementById('fullcredit').innerHTML = fullCreditPrice.toFixed(2);

    const table = calcTable(payment, termMonth, rateCredit, sumCredit);

    const newHtmlTable = createHtmlTable(table);

    const tableHtml = document.getElementById('shedule-payment');
    tableHtml.remove();
    const fieldset = document.querySelector(".shedule-table");
    fieldset.appendChild(newHtmlTable);

}

function addInTr(element, value, tr) {
    const elem = document.createElement(element);
    elem.innerText = value;
    tr.appendChild(elem);

}

function createHtmlTable(table) {
    const newHtmlTable = document.createElement('table');
    newHtmlTable.id = 'shedule-payment';
    const tr = document.createElement('tr');

    addInTr('th', "№", tr);
    addInTr('th', "Дата платежа", tr);
    addInTr('th', "Сумма платежа", tr);
    addInTr('th', 'Основной долг', tr);
    addInTr('th', 'Проценты', tr);
    addInTr('th', 'Остаток долга', tr)

    newHtmlTable.appendChild(tr);

    table.forEach((row) => {
        const tr = document.createElement('tr');

        addInTr('td', row.num, tr);
        addInTr('td', new Date(row.date).toDateString(), tr);
        addInTr('td', row.payment.toFixed(2), tr);
        addInTr('td', row.paymentForDebt.toFixed(2), tr);
        addInTr('td', row.percent.toFixed(2), tr);
        addInTr('td', row.restDebt.toFixed(2), tr);


        newHtmlTable.appendChild(tr);

    })
    return newHtmlTable;
}


linkInputRange('sum-credit', 'sum-range', 100000, 2000000);

linkInputRange('term-credit', 'term-range', 3, 30);

linkInputRange('rate-credit', 'rate-range', 3, 30);

calculate();
