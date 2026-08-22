// utils/xirr.util.js
// Calculates XIRR (Extended Internal Rate of Return) given a series of
// cash flows with dates. Uses the Newton-Raphson iterative method.
//
// cashFlows format: [{ amount: -10000, date: '2023-01-15' }, { amount: 12000, date: '2024-01-15' }]
// Negative amount = money invested (outflow), positive = money received (inflow/current value).

function daysBetween(date1, date2) {
    const oneDay = 24 * 60 * 60 * 1000;
    return (new Date(date2) - new Date(date1)) / oneDay;
}

function xnpv(rate, cashFlows) {
    const firstDate = cashFlows[0].date;
    return cashFlows.reduce((sum, cf) => {
        const days = daysBetween(firstDate, cf.date);
        return sum + cf.amount / Math.pow(1 + rate, days / 365);
    }, 0);
}

function xnpvDerivative(rate, cashFlows) {
    const firstDate = cashFlows[0].date;
    return cashFlows.reduce((sum, cf) => {
        const days = daysBetween(firstDate, cf.date);
        const t = days / 365;
        return sum - (t * cf.amount) / Math.pow(1 + rate, t + 1);
    }, 0);
}

function calculateXIRR(cashFlows, guess = 0.1) {
    if (!cashFlows || cashFlows.length < 2) {
        return null; // need at least an investment and a current value
    }

    let rate = guess;
    const maxIterations = 100;
    const tolerance = 1e-6;

    for (let i = 0; i < maxIterations; i++) {
        const npv = xnpv(rate, cashFlows);
        const derivative = xnpvDerivative(rate, cashFlows);

        if (Math.abs(derivative) < 1e-10) break; // avoid divide-by-zero

        const newRate = rate - npv / derivative;

        if (Math.abs(newRate - rate) < tolerance) {
            return parseFloat((newRate * 100).toFixed(2)); // return as %
        }
        rate = newRate;
    }

    return parseFloat((rate * 100).toFixed(2)); // best estimate after max iterations
}

module.exports = { calculateXIRR };
