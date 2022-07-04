
export function calcPayment(sumCredit, termMonth, rateCredit) {
    const rateMonth = rateCredit / 12 / 100;
    const k = calcKoef(rateMonth, termMonth);
    return sumCredit * k;
}

function calcKoef(monthRate, termMonth) {
    const denom = (1 + monthRate) ** termMonth - 1;
    const numer = monthRate * (1 + monthRate) ** termMonth;
    return numer / denom;
}

export function calcOverPayment(termMonth, payment, sumCredit) {
    return termMonth * payment - sumCredit;
}
export function calcFullCreditPrice(sumCredit, overpayment) {
    return sumCredit + overpayment;
}

export function table(payment, termMonth, rateCredit, sumCredit) {
    const currentDate = new Date();
    const arr = [];
    const rate = rateCredit / 100;
    let restDebt = sumCredit;
    for (let i = 1; i <= termMonth; i++) {
        const percent = calcPercent(restDebt, rate);
        const paymentForDebt = payment - percent;
        restDebt = restDebt - paymentForDebt;
        const row = {
            'num': i,
            'date': increaseMonth(currentDate, i),
            'payment': payment,
            'paymentForDebt': paymentForDebt,
            'percent': percent,
            'restDebt': restDebt
        };
        arr.push(row);
    }
    return arr;
}

function increaseMonth(date, month) {
    const newDate = new Date(date);
    return newDate.setMonth(newDate.getMonth() + month);
}

function calcPercent(rest, rate) {
    return rest * rate / 12;

}

