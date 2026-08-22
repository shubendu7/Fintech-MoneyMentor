// utils/taxCalculator.util.js
// Calculates estimated income tax under India's Old and New tax regimes.
// Slabs used are illustrative (FY 2024-25 style) — update here if slabs change.

function calculateOldRegimeTax(taxableIncome) {
    let tax = 0;
    const slabs = [
        { upto: 250000, rate: 0 },
        { upto: 500000, rate: 0.05 },
        { upto: 1000000, rate: 0.20 },
        { upto: Infinity, rate: 0.30 }
    ];

    let remaining = taxableIncome;
    let lastLimit = 0;

    for (const slab of slabs) {
        if (remaining <= 0) break;
        const slabAmount = Math.min(remaining, slab.upto - lastLimit);
        tax += slabAmount * slab.rate;
        remaining -= slabAmount;
        lastLimit = slab.upto;
    }

    // Section 87A rebate: full rebate if taxable income <= 5,00,000 (old regime)
    if (taxableIncome <= 500000) tax = 0;

    return Math.round(tax);
}

function calculateNewRegimeTax(grossIncome) {
    let tax = 0;
    const slabs = [
        { upto: 300000, rate: 0 },
        { upto: 600000, rate: 0.05 },
        { upto: 900000, rate: 0.10 },
        { upto: 1200000, rate: 0.15 },
        { upto: 1500000, rate: 0.20 },
        { upto: Infinity, rate: 0.30 }
    ];

    let remaining = grossIncome;
    let lastLimit = 0;

    for (const slab of slabs) {
        if (remaining <= 0) break;
        const slabAmount = Math.min(remaining, slab.upto - lastLimit);
        tax += slabAmount * slab.rate;
        remaining -= slabAmount;
        lastLimit = slab.upto;
    }

    // Section 87A rebate: full rebate if income <= 7,00,000 (new regime)
    if (grossIncome <= 700000) tax = 0;

    return Math.round(tax);
}

/**
 * Compares Old vs New regime and recommends the better one.
 * @param {number} annualIncome - gross annual income
 * @param {object} deductions - { deductions_80c, deductions_80d, hra_claimed, other_deductions }
 */
function compareTaxRegimes(annualIncome, deductions = {}) {
    const {
        deductions_80c = 0,
        deductions_80d = 0,
        hra_claimed = 0,
        other_deductions = 0
    } = deductions;

    // Old regime: deductions reduce taxable income (capped at reasonable statutory limits)
    const cappedD80C = Math.min(deductions_80c, 150000);
    const cappedD80D = Math.min(deductions_80d, 100000);
    const standardDeduction = 50000; // applies to both regimes for salaried individuals

    const totalOldDeductions = cappedD80C + cappedD80D + hra_claimed + other_deductions + standardDeduction;
    const oldTaxableIncome = Math.max(0, annualIncome - totalOldDeductions);
    const oldRegimeTax = calculateOldRegimeTax(oldTaxableIncome);

    // New regime: only standard deduction allowed, no 80C/80D/HRA
    const newTaxableIncome = Math.max(0, annualIncome - standardDeduction);
    const newRegimeTax = calculateNewRegimeTax(newTaxableIncome);

    const recommended = oldRegimeTax <= newRegimeTax ? 'old' : 'new';
    const savings = Math.abs(oldRegimeTax - newRegimeTax);

    return {
        old_regime: { taxable_income: oldTaxableIncome, estimated_tax: oldRegimeTax },
        new_regime: { taxable_income: newTaxableIncome, estimated_tax: newRegimeTax },
        recommended_regime: recommended,
        potential_savings: savings
    };
}

module.exports = { compareTaxRegimes, calculateOldRegimeTax, calculateNewRegimeTax };
