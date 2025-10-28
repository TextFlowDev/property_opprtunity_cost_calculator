/**
 * Validate monthly rent input
 * @param value - Input value
 * @returns Error message or null
 */
export const validateMonthlyRent = (value: string | number): string | null => {
  const num = Number(value);
  
  if (!value || value === '') {
    return 'Sila masukkan sewa bulanan anda';
  }
  
  if (isNaN(num)) {
    return 'Sila masukkan nombor yang sah';
  }
  
  if (num < 500) {
    return 'Sewa minimum RM500';
  }
  
  if (num > 10000) {
    return 'Sewa maximum RM10,000';
  }
  
  return null;
};

/**
 * Validate months renting input
 * @param value - Input value
 * @returns Error message or null
 */
export const validateMonthsRenting = (value: string | number): string | null => {
  const num = Number(value);
  
  if (!value || value === '') {
    return 'Sila masukkan berapa lama anda dah sewa';
  }
  
  if (isNaN(num)) {
    return 'Sila masukkan nombor yang sah';
  }
  
  if (num < 1) {
    return 'Minimum 1 bulan';
  }
  
  if (num > 120) {
    return 'Maximum 120 bulan (10 tahun)';
  }
  
  return null;
};

/**
 * Validate property price input
 * @param value - Input value
 * @returns Error message or null
 */
export const validatePropertyPrice = (value: string | number): string | null => {
  const num = Number(value);
  
  if (!value || value === '') {
    return 'Sila masukkan harga rumah tipikal';
  }
  
  if (isNaN(num)) {
    return 'Sila masukkan nombor yang sah';
  }
  
  if (num < 150000) {
    return 'Harga minimum RM150,000';
  }
  
  if (num > 1000000) {
    return 'Harga maximum RM1,000,000';
  }
  
  return null;
};

