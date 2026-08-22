// utils/moneyHealthScore.util.js

function calculateMoneyHealthScore(data) {
    const {
        monthly_income = 0,
        monthly_expenses = 0,
        current_savings = 0,
        total_debt = 0,
        investments = 0
    } = data;

    const income = Number(monthly_income);
    const expenses = Number(monthly_expenses);
    const savings = Number(current_savings);
    const debt = Number(total_debt);
    const investmentValue = Number(investments);

    if (income <= 0) {
        throw new Error('Monthly income must be greater than 0.');
    }

    if (expenses < 0 || savings < 0 || debt < 0 || investmentValue < 0) {
        throw new Error('Financial values cannot be negative.');
    }

    // 1. Savings rate
    const monthlySavings = income - expenses;

    const savingsRate = Math.max(
        0,
        (monthlySavings / income) * 100
    );

    // 2. Emergency fund coverage
    const emergencyFundMonths =
        expenses > 0 ? savings / expenses : 0;

    // 3. Debt-to-income ratio
    const debtToIncomeRatio =
        income > 0 ? (debt / (income * 12)) * 100 : 0;

    // 4. Investment ratio
    const investmentRatio =
        income > 0 ? (investmentValue / (income * 12)) * 100 : 0;

    // -----------------------------
    // SCORE CALCULATION
    // -----------------------------

    // Savings score: 0 - 25
    let savingsScore = 0;

    if (savingsRate >= 30) {
        savingsScore = 25;
    } else if (savingsRate >= 20) {
        savingsScore = 20;
    } else if (savingsRate >= 10) {
        savingsScore = 15;
    } else if (savingsRate > 0) {
        savingsScore = 8;
    }

    // Emergency fund score: 0 - 25
    let emergencyScore = 0;

    if (emergencyFundMonths >= 6) {
        emergencyScore = 25;
    } else if (emergencyFundMonths >= 3) {
        emergencyScore = 20;
    } else if (emergencyFundMonths >= 1) {
        emergencyScore = 12;
    } else {
        emergencyScore = 5;
    }

    // Debt score: 0 - 25
    let debtScore = 0;

    if (debtToIncomeRatio <= 10) {
        debtScore = 25;
    } else if (debtToIncomeRatio <= 20) {
        debtScore = 20;
    } else if (debtToIncomeRatio <= 35) {
        debtScore = 15;
    } else if (debtToIncomeRatio <= 50) {
        debtScore = 8;
    } else {
        debtScore = 3;
    }

    // Investment score: 0 - 25
    let investmentScore = 0;

    if (investmentRatio >= 30) {
        investmentScore = 25;
    } else if (investmentRatio >= 20) {
        investmentScore = 20;
    } else if (investmentRatio >= 10) {
        investmentScore = 15;
    } else if (investmentRatio > 0) {
        investmentScore = 8;
    } else {
        investmentScore = 3;
    }

    const totalScore =
        savingsScore +
        emergencyScore +
        debtScore +
        investmentScore;

    // Health category
    let healthStatus;

    if (totalScore >= 80) {
        healthStatus = 'Excellent';
    } else if (totalScore >= 65) {
        healthStatus = 'Good';
    } else if (totalScore >= 50) {
        healthStatus = 'Moderate';
    } else if (totalScore >= 35) {
        healthStatus = 'Needs Improvement';
    } else {
        healthStatus = 'Critical';
    }

    // Recommendations
    const recommendations = [];

    if (savingsRate < 20) {
        recommendations.push(
            'Increase your monthly savings rate toward at least 20%.'
        );
    }

    if (emergencyFundMonths < 3) {
        recommendations.push(
            'Build an emergency fund covering at least 3 months of expenses.'
        );
    }

    if (debtToIncomeRatio > 35) {
        recommendations.push(
            'Focus on reducing high-interest debt and avoid taking unnecessary new debt.'
        );
    }

    if (investmentRatio < 10) {
        recommendations.push(
            'Consider increasing long-term investments according to your risk profile.'
        );
    }

    if (recommendations.length === 0) {
        recommendations.push(
            'Your financial indicators are healthy. Continue monitoring and maintaining your current strategy.'
        );
    }

    return {
        score: totalScore,
        health_status: healthStatus,

        metrics: {
            savings_rate_percent: Number(savingsRate.toFixed(2)),
            emergency_fund_months: Number(
                emergencyFundMonths.toFixed(2)
            ),
            debt_to_income_percent: Number(
                debtToIncomeRatio.toFixed(2)
            ),
            investment_ratio_percent: Number(
                investmentRatio.toFixed(2)
            )
        },

        score_breakdown: {
            savings_score: savingsScore,
            emergency_fund_score: emergencyScore,
            debt_score: debtScore,
            investment_score: investmentScore
        },

        recommendations
    };
}

module.exports = {
    calculateMoneyHealthScore
};