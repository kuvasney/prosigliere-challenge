export const formatDateOfBirth = (dateString: string): string => {
  if (!dateString) return '';
  
  const parts = dateString.split('-');
  if (parts.length !== 3) return dateString;
  
  const [day, month, year] = parts;
  return new Date(`${year}-${month}-${day}`).toLocaleDateString();
};
