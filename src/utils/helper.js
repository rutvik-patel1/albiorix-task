export const formatDate = (date) => {
  if (!date) return "";
  const datestr = new Date(date);
  return datestr.toLocaleDateString();
};
