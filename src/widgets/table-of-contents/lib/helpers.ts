import { IPage } from '../../../shared';

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

const isAncestorActive = (
  currentId: string,
  pages: Record<string, IPage | undefined>,
  activePath: string[],
): boolean => {
  if (activePath.includes(currentId)) {
    return true;
  }

  const currentItem = pages[currentId];

  if (!currentItem?.parentId) {
    return false;
  }

  return isAncestorActive(currentItem.parentId, pages, activePath);
};

const isAncestorLastActive = (
  currentId: string,
  pages: Record<string, IPage | undefined>,
  activePath: string[],
): boolean => {
  if (activePath.at(-1) === currentId) {
    return true;
  }

  const currentItem = pages[currentId];

  if (!currentItem?.parentId) {
    return false;
  }

  return isAncestorLastActive(currentItem.parentId, pages, activePath);
};

export const determineBackgroundColor = (
  id: string,
  allPages: Record<string, IPage>,
  activePath: string[],
  searchTerm: string,
) => {
  const last = activePath.at(-1);

  if (searchTerm || !last) {
    return 'NONE';
  }

  const lastActiveLevel = allPages[last].level;

  if (isAncestorActive(id, allPages, activePath)) {
    if (lastActiveLevel > 0 && isAncestorLastActive(id, allPages, activePath)) {
      return 'SECOND_LEVEL';
    } else {
      return 'FIRST_LEVEL';
    }
  }

  return 'NONE';
};
