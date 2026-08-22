// utils/fireCalculator.util.js
// Calculates FIRE (Financial Independence, Retire Early) projections:
// required retirement corpus, monthly SIP needed, and a year-by-year growth roadmap.

/**
 * @param {number} currentAge
 * @param {number} retirementAge
 * @param {number} monthlyExpenses - current monthly living expenses
 * @param {number} currentSavings - existing investments/savings corpus
 * @param {number} expectedReturnRate - annual return %, e.g. 12 for 12%
 * @param {number} inflationRate - annual inflation %, e.g. 6 for 6%
 * @param {number} withdrawalRate - safe withdrawal rate %, e.g. 4 for the "4% rule"
 */
function calculateFireProjection({
    currentAge,
    retirementAge,
    monthlyExpenses,
    currentSavings = 0,
    expectedReturnRate = 12,
    inflationRate = 6,
    withdrawalRate = 4
}) {
    const yearsToRetirement = retirementAge - currentAge;
    if (yearsToRetirement <= 0) {
        throw new Error('retirementAge must be greater than currentAge.');
    }

    const annualExpensesToday = monthlyExpenses * 12;

    // Future annual expenses at retirement, adjusted for inflation
    const futureAnnualExpenses = annualExpensesToday * Math.pow(1 + inflationRate / 100, yearsToRetirement);

    // Required corpus = future annual expenses / withdrawal rate
    const requiredCorpus = futureAnnualExpenses / (withdrawalRate / 100);

    // Future value of current savings by retirement
    const futureValueOfCurrentSavings = currentSavings * Math.pow(1 + expectedReturnRate / 100, yearsToRetirement);

    // Remaining corpus needed to be built via SIP
    const corpusGapToFill = Math.max(0, requiredCorpus - futureValueOfCurrentSavings);

    // Monthly SIP needed using future value of annuity formula
    const monthlyRate = expectedReturnRate / 100 / 12;
    const months = yearsToRetirement * 12;
    let requiredMonthlySIP = 0;

    if (corpusGapToFill > 0 && monthlyRate > 0) {
        requiredMonthlySIP = corpusGapToFill * monthlyRate / (Math.pow(1 + monthlyRate, months) - 1);
    }

    // Year-by-year roadmap (SIP + current savings growth)
    const roadmap = [];
    let runningCorpus = currentSavings;

    for (let year = 1; year <= yearsToRetirement; year++) {
        const annualSIP = requiredMonthlySIP * 12;
        runningCorpus = runningCorpus * (1 + expectedReturnRate / 100) + annualSIP;
        roadmap.push({
            year,
            age: currentAge + year,
            projected_corpus: Math.round(runningCorpus)
        });
    }

    return {
        years_to_retirement: yearsToRetirement,
        future_annual_expenses: Math.round(futureAnnualExpenses),
        required_corpus: Math.round(requiredCorpus),
        future_value_of_current_savings: Math.round(futureValueOfCurrentSavings),
        required_monthly_sip: Math.round(requiredMonthlySIP),
        roadmap
    };
}

module.exports = { calculateFireProjection };
