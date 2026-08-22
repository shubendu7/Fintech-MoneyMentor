// utils/lifeEventAdvisor.util.js
// Rule-based financial guidance for major life events.
// Supported events: bonus, inheritance, marriage, new_baby.
//
// This is an advisory engine, not regulated financial/tax advice.

function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}

function buildBasePlan({
    eventAmount,
    monthlyExpenses,
    currentSavings,
    portfolioValue,
    riskProfile
}) {
    const emergencyTarget = monthlyExpenses > 0 ? monthlyExpenses * 6 : 0;
    const currentLiquidGap = Math.max(0, emergencyTarget - currentSavings);

    let emergencyAllocation = 0;

    if (eventAmount > 0 && currentLiquidGap > 0) {
        emergencyAllocation = Math.min(eventAmount, currentLiquidGap);
    }

    const remaining = Math.max(0, eventAmount - emergencyAllocation);

    const risk = String(riskProfile).toLowerCase();
    let investmentAllocationRate = 0.60;

    if (risk === 'conservative') investmentAllocationRate = 0.40;
    if (risk === 'aggressive') investmentAllocationRate = 0.75;

    const investmentAllocation = Math.round(
        remaining * investmentAllocationRate
    );

    const flexibleAmount = Math.max(
        0,
        remaining - investmentAllocation
    );

    return {
        emergency_fund_target: Math.round(emergencyTarget),
        emergency_fund_gap: Math.round(currentLiquidGap),
        suggested_emergency_allocation: Math.round(emergencyAllocation),
        suggested_investment_allocation: investmentAllocation,
        suggested_flexible_allocation: Math.round(flexibleAmount),
        existing_portfolio_value: Math.round(portfolioValue)
    };
}

function getEventSpecificAdvice(eventType, eventAmount) {
    const amount = Math.round(eventAmount);

    const advice = {
        immediate_actions: [],
        tax_considerations: [],
        portfolio_actions: [],
        goal_actions: []
    };

    switch (eventType) {
        case 'bonus':
            advice.immediate_actions = [
                'Keep the bonus separate from regular monthly spending.',
                'Set aside any applicable tax liability before investing the remainder.',
                'Use part of the bonus to strengthen the emergency fund if needed.'
            ];

            advice.tax_considerations = [
                'Check whether the bonus is already included in taxable salary income.',
                'Confirm the final tax treatment with current-year rules before filing.'
            ];

            advice.portfolio_actions = [
                'Invest the surplus according to the existing risk profile.',
                'Avoid changing the entire portfolio allocation because of a one-time bonus.'
            ];

            advice.goal_actions = [
                'Prioritize high-value financial goals that are close to their target date.'
            ];

            break;

        case 'inheritance':
            advice.immediate_actions = [
                'Avoid making major irreversible purchases immediately after receiving the inheritance.',
                'Keep the inherited amount safely parked while reviewing the plan.',
                'Review nominations, beneficiaries, insurance and estate documents.'
            ];

            advice.tax_considerations = [
                'Check the source and nature of inherited assets.',
                'Consider tax implications when inherited investments or property are later sold.'
            ];

            advice.portfolio_actions = [
                'Diversify a concentrated inherited portfolio before taking large risks.',
                'Align the allocation with the stated risk profile and time horizon.'
            ];

            advice.goal_actions = [
                'Use the inheritance to accelerate long-term goals rather than increasing recurring lifestyle costs.'
            ];

            break;

        case 'marriage':
            advice.immediate_actions = [
                'Create a combined household budget and emergency-fund target.',
                'List existing loans, investments, insurance policies and financial obligations.',
                'Agree on shared and individual financial goals.'
            ];

            advice.tax_considerations = [
                'Review tax implications of jointly planned investments and asset transfers.',
                'Update financial records and nominations where appropriate.'
            ];

            advice.portfolio_actions = [
                'Review both partners portfolios for overlap and concentration.',
                'Rebalance only after defining the combined risk profile and goals.'
            ];

            advice.goal_actions = [
                'Create separate targets for near-term marriage expenses and long-term wealth creation.'
            ];

            break;

        case 'new_baby':
            advice.immediate_actions = [
                'Increase the emergency-fund target to account for the growing household.',
                'Review health, life and family insurance coverage.',
                'Create a dedicated education and child-related goal.'
            ];

            advice.tax_considerations = [
                'Review eligible deductions and benefits under the current financial year rules.',
                'Keep documentation for eligible medical, insurance and education-related expenses.'
            ];

            advice.portfolio_actions = [
                'Use a goal-based investment horizon for education planning.',
                'Avoid taking excessive portfolio risk simply to chase a larger education corpus.'
            ];

            advice.goal_actions = [
                'Estimate future education costs and start a long-term contribution plan.',
                'Revisit the financial plan periodically as household expenses change.'
            ];

            break;
    }

    if (amount <= 0) {
        advice.immediate_actions.unshift(
            'Enter the approximate financial value associated with this event for a more precise allocation.'
        );
    }

    return advice;
}

function generateLifeEventAdvice({
    eventType,
    eventAmount = 0,
    annualIncome = 0,
    monthlyExpenses = 0,
    currentSavings = 0,
    portfolioValue = 0,
    riskProfile = 'moderate',
    goals = [],
    age = 0,
    dependents = 0
}) {
    const normalizedRisk = [
        'conservative',
        'moderate',
        'aggressive'
    ].includes(String(riskProfile).toLowerCase())
        ? String(riskProfile).toLowerCase()
        : 'moderate';

    const basePlan = buildBasePlan({
        eventAmount,
        monthlyExpenses,
        currentSavings,
        portfolioValue,
        riskProfile: normalizedRisk
    });

    const eventAdvice = getEventSpecificAdvice(
        eventType,
        eventAmount
    );

    const annualExpenseEstimate = monthlyExpenses * 12;

    const savingsRate =
        annualIncome > 0
            ? clamp(
                ((annualIncome - annualExpenseEstimate) / annualIncome) * 100,
                0,
                100
            )
            : 0;

    return {
        profile_summary: {
            age,
            dependents,
            risk_profile: normalizedRisk,
            annual_income: Math.round(annualIncome),
            monthly_expenses: Math.round(monthlyExpenses),
            current_savings: Math.round(currentSavings),
            portfolio_value: Math.round(portfolioValue),
            estimated_savings_rate_percent: Math.round(savingsRate)
        },

        event: {
            type: eventType,
            amount: Math.round(eventAmount)
        },

        allocation_plan: basePlan,

        personalized_advice: eventAdvice,

        goals: goals,

        disclaimer:
            'This output is general financial guidance for planning purposes and is not personalized investment, tax, legal or insurance advice.'
    };
}

module.exports = { generateLifeEventAdvice };