import { IPage } from '../../../shared';

export const getHighlightedTextParts = ({
  text,
  searchTerm,
}: {
  text: string;
  searchTerm: string;
}) => {
  if (!searchTerm) {
    return [{ text: text, highlight: false }];
  }

  const parts = text
    .split(new RegExp(`(${searchTerm})`, 'gi'))
    .filter((part) => part !== '');

  return parts.map((part) => ({
    text: part,
    highlight: part.toLowerCase() === searchTerm.toLowerCase(),
  }));
};

export const checkIsVisible = ({
  searchTerm,
  title,
  path,
  activePath,
  parentId,
}: {
  searchTerm: string;
  title: string;
  path: string[];
  activePath: string[];
  parentId: string | undefined;
}) => {
  const isSearchTermInTitle = searchTerm
    ? title.toLowerCase().includes(searchTerm.toLowerCase())
    : true;
  const isTopLevelItem = path.length === 0;
  const isParentItemActive = parentId ? activePath.includes(parentId) : false;

  return searchTerm
    ? isSearchTermInTitle
    : isTopLevelItem || isParentItemActive;
};

export const determineHighlightClasses = ({
  parentId,
  id,
  activePath,
  level,
  isOpen,
  searchTerm,
}: {
  parentId: string | undefined;
  id: string;
  activePath: string[];
  level: number;
  isOpen: boolean;
  searchTerm: string;
}) => {
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
    isSecondLevel: withHighlight && baseHighlightCondition,
    isFirstLevel: withHighlight && !baseHighlightCondition,
  };
};

export const findPathById = ({
  pages,
  targetId,
}: {
  pages: Record<string, IPage>;
  targetId: string;
}) => {
  const findParentId = (currentPageId: string, path: string[]): string[] => {
    const currentPage: IPage = pages[currentPageId];

    path.unshift(currentPageId);

    if (currentPage.level === 0) {
      return path;
    }

    if (!currentPage.parentId) {
      throw new Error('No parent id found for the given page');
    }

    return findParentId(currentPage.parentId, path);
  };

  return findParentId(targetId, []);
};
