/**
 * Calculate opportunity cost from renting vs buying
 * @param monthlyRent - Monthly rent in RM
 * @param monthsRenting - Number of months renting
 * @param propertyPrice - Property price in RM
 * @returns Calculation results
 */
export interface CalculationResults {
  totalRentPaid: number;
  downPaymentAmount: number;
  currentPropertyValue: number;
  equityBuilt: number;
  opportunityCost: number;
  monthlyOpportunityCost: number;
  futureMonthlyLoss: number;
  inputs: {
    monthlyRent: number;
    monthsRenting: number;
    propertyPrice: number;
  };
}

export const calculateOpportunityCost = (
  monthlyRent: number,
  monthsRenting: number,
  propertyPrice: number
): CalculationResults => {
  // Total rent paid
  const totalRentPaid = monthlyRent * monthsRenting;

  // Down payment (10% of property price)
  const downPaymentAmount = propertyPrice * 0.10;

  // Years elapsed
  const yearsElapsed = monthsRenting / 12;

  // Property appreciation (10% per year)
  const appreciationRate = 0.10;
  const currentPropertyValue = propertyPrice * Math.pow(1 + appreciationRate, yearsElapsed);

  // Equity built (assuming 90% loan)
  const loanAmount = propertyPrice * 0.90;
  const equityBuilt = currentPropertyValue - loanAmount;

  // Opportunity cost
  const opportunityCost = equityBuilt - totalRentPaid;

  // Monthly opportunity cost
  const monthlyOpportunityCost = opportunityCost / monthsRenting;

  // Future projection (next 30 days)
  const futureMonthlyLoss = monthlyRent + monthlyOpportunityCost;

  return {
    totalRentPaid,
    downPaymentAmount,
    currentPropertyValue,
    equityBuilt,
    opportunityCost,
    monthlyOpportunityCost,
    futureMonthlyLoss,
    inputs: {
      monthlyRent,
      monthsRenting,
      propertyPrice
    }
  };
};

