// utils/coupleMoneyPlanner.util.js
// Calculates combined financial metrics for two partners.
//
// This is a planning engine and not regulated financial advice.

function calculatePartnerMetrics(partner) {
    const income = Number(partner.annual_income) || 0;
    const expenses = Number(partner.monthly_expenses) || 0;
    const savings = Number(partner.current_savings) || 0;
    const investments = Number(partner.investments) || 0;
    const debt = Number(partner.debt) || 0;

    const annualExpenses = expenses * 12;

    const annualSurplus = Math.max(
        0,
        income - annualExpenses
    );

    const savingsRate =
        income > 0
            ? (annualSurplus / income) * 100
            : 0;

    return {
        annual_income: Math.round(income),
        monthly_expenses: Math.round(expenses),
        current_savings: Math.round(savings),
        investments: Math.round(investments),
        debt: Math.round(debt),
        annual_expenses: Math.round(annualExpenses),
        annual_surplus: Math.round(annualSurplus),
        savings_rate_percent: Math.round(savingsRate)
    };
}

function calculateCoupleMoneyPlan({
    partner1,
    partner2,
    sharedExpenses = 0,
    sharedSavings = 0,
    sharedInvestments = 0,
    sharedDebt = 0,
    goals = []
}) {
    const p1 = calculatePartnerMetrics(partner1);
    const p2 = calculatePartnerMetrics(partner2);

    const combinedIncome =
        p1.annual_income + p2.annual_income;

    const individualMonthlyExpenses =
        p1.monthly_expenses + p2.monthly_expenses;

    const combinedMonthlyExpenses =
        individualMonthlyExpenses + sharedExpenses;

    const combinedAnnualExpenses =
        combinedMonthlyExpenses * 12;

    const combinedSavings =
        p1.current_savings +
        p2.current_savings +
        sharedSavings;

    const combinedInvestments =
        p1.investments +
        p2.investments +
        sharedInvestments;

    const combinedDebt =
        p1.debt +
        p2.debt +
        sharedDebt;

    const annualSurplus = Math.max(
        0,
        combinedIncome - combinedAnnualExpenses
    );

    const combinedSavingsRate =
        combinedIncome > 0
            ? (annualSurplus / combinedIncome) * 100
            : 0;

    // Recommended emergency fund = 6 months of combined expenses
    const emergencyFundTarget =
        combinedMonthlyExpenses * 6;

    const emergencyFundGap = Math.max(
        0,
        emergencyFundTarget - combinedSavings
    );

    let debtPriority = 'low';

    if (combinedDebt > 0 && combinedDebt >= combinedIncome * 0.5) {
        debtPriority = 'high';
    } else if (combinedDebt > 0) {
        debtPriority = 'medium';
    }

    let financialHealth = 'needs_attention';

    if (
        combinedSavingsRate >= 25 &&
        combinedDebt < combinedIncome * 0.3 &&
        combinedSavings >= emergencyFundTarget
    ) {
        financialHealth = 'strong';
    } else if (
        combinedSavingsRate >= 15 &&
        combinedDebt < combinedIncome * 0.5
    ) {
        financialHealth = 'moderate';
    }

    const recommendedMonthlyInvestment =
        Math.round(
            Math.max(
                0,
                (annualSurplus / 12) * 0.5
            )
        );

    const recommendations = [];

    if (emergencyFundGap > 0) {
        recommendations.push(
            'Prioritize building a combined emergency fund of approximately six months of household expenses.'
        );
    } else {
        recommendations.push(
            'Your combined savings currently cover the recommended emergency-fund target.'
        );
    }

    if (debtPriority === 'high') {
        recommendations.push(
            'Prioritize reducing high debt before significantly increasing long-term investments.'
        );
    } else if (debtPriority === 'medium') {
        recommendations.push(
            'Maintain a balance between debt repayment and long-term investing.'
        );
    } else {
        recommendations.push(
            'Your current debt level does not require a major reduction in investment capacity.'
        );
    }

    if (combinedSavingsRate < 15) {
        recommendations.push(
            'Try to increase the household savings rate toward at least 15 percent.'
        );
    } else if (combinedSavingsRate >= 25) {
        recommendations.push(
            'Your household savings rate is strong; continue directing surplus toward long-term goals.'
        );
    } else {
        recommendations.push(
            'Continue improving the household savings rate as income and expenses change.'
        );
    }

    if (goals.length > 0) {
        recommendations.push(
            'Keep separate target amounts and timelines for each shared financial goal.'
        );
    }

    return {
        partner_summary: {
            partner1: p1,
            partner2: p2
        },

        combined_financials: {
            annual_income: Math.round(combinedIncome),
            monthly_expenses: Math.round(combinedMonthlyExpenses),
            annual_expenses: Math.round(combinedAnnualExpenses),
            annual_surplus: Math.round(annualSurplus),
            savings_rate_percent: Math.round(combinedSavingsRate),
            current_savings: Math.round(combinedSavings),
            investments: Math.round(combinedInvestments),
            debt: Math.round(combinedDebt)
        },

        emergency_fund: {
            recommended_target: Math.round(emergencyFundTarget),
            current_available_savings: Math.round(combinedSavings),
            gap: Math.round(emergencyFundGap)
        },

        debt_assessment: {
            total_debt: Math.round(combinedDebt),
            priority: debtPriority
        },

        investment_plan: {
            suggested_monthly_investment:
                recommendedMonthlyInvestment
        },

        financial_health: financialHealth,

        shared_goals: goals,

        recommendations,

        disclaimer:
            'This output is general financial planning guidance and is not personalized investment, tax, legal or insurance advice.'
    };
}

module.exports = {
    calculateCoupleMoneyPlan
};