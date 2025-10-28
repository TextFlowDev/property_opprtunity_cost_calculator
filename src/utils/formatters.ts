/**
 * Format number with thousand separators
 * @param num - Number to format
 * @returns Formatted number
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-MY').format(Math.round(num));
};

/**
 * Format currency (RM)
 * @param num - Amount
 * @returns Formatted currency
 */
export const formatCurrency = (num: number): string => {
  return `RM ${formatNumber(num)}`;
};

/**
 * Parse formatted number back to integer
 * @param str - Formatted number string
 * @returns Parsed number
 */
export const parseFormattedNumber = (str: string): number => {
  return parseInt(str.replace(/,/g, ''), 10);
};

