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

export const checkIsVisible = (
  searchTerm: string,
  title: string,
  path: string[],
  activePath: string[],
  parentId: string | undefined,
): boolean => {
  const isSearchTermInTitle = searchTerm
    ? title.toLowerCase().includes(searchTerm.toLowerCase())
    : true;
  const isTopLevelItem = path.length === 0;
  const isParentItemActive = parentId ? activePath.includes(parentId) : false;

  return searchTerm
    ? isSearchTermInTitle
    : isTopLevelItem || isParentItemActive;
};

export const determineHighlightClasses = (
  parentId: string | undefined,
  id: string,
  activePath: string[],
  level: number,
  isOpen: boolean,
  searchTerm: string,
) => {
  const isParentInPath = parentId ? activePath.includes(parentId) : false;
  const isCurrentInPath = activePath.includes(id);
  const withHighlight = !searchTerm && (isParentInPath || isCurrentInPath);
  const isParentLastInPath = parentId ? activePath.at(-1) === parentId : false;
  const isCurrentLastInPath = activePath.at(-1) === id;

  const baseHighlightCondition =
    (isParentLastInPath || isCurrentLastInPath) &&
    level !== 0 &&
    (level !== 1 || isOpen);

  return {
    isFirstLevel: withHighlight && baseHighlightCondition,
    isSecondLevel: withHighlight && !baseHighlightCondition,
  };
};
