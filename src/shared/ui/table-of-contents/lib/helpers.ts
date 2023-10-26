export const getHighlightedTextParts = (
  text: string,
  searchTerm: string,
): { text: string; highlight: boolean }[] => {
  const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));

  return parts.map((part) => ({
    text: part,
    highlight: part.toLowerCase() === searchTerm.toLowerCase(),
  }));
};
