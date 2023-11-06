import { type IPage } from '../../src/shared';
import {
  checkIsVisible,
  determineHighlightClasses,
  findPathById,
  getHighlightedTextParts,
} from '../../src/widgets/table-of-contents/lib/helpers';

describe('table-of-contents helpers', () => {
  describe('getHighlightedTextParts', () => {
    it('should return an array with highlighted parts', () => {
      const input = { text: 'Hello world! Hello again!', searchTerm: 'Hello' };

      const result = getHighlightedTextParts(input);

      expect(result).toEqual([
        { text: 'Hello', highlight: true },
        { text: ' world! ', highlight: false },
        { text: 'Hello', highlight: true },
        { text: ' again!', highlight: false },
      ]);
    });

    it('should handle case insensitivity', () => {
      const input = { text: 'Hello world! hello again!', searchTerm: 'hello' };

      const result = getHighlightedTextParts(input);

      expect(result).toEqual([
        { text: 'Hello', highlight: true },
        { text: ' world! ', highlight: false },
        { text: 'hello', highlight: true },
        { text: ' again!', highlight: false },
      ]);
    });

    it('should return an array without highlights if searchTerm is not found', () => {
      const input = { text: 'Hello world!', searchTerm: 'Bye' };

      const result = getHighlightedTextParts(input);

      expect(result).toEqual([{ text: 'Hello world!', highlight: false }]);
    });

    it('should handle empty searchTerm', () => {
      const input = { text: 'Hello world!', searchTerm: '' };

      const result = getHighlightedTextParts(input);

      expect(result).toEqual([{ text: 'Hello world!', highlight: false }]);
    });
  });

  describe('checkIsVisible', () => {
    it('should return true if searchTerm is in title', () => {
      const input = {
        searchTerm: 'test',
        title: 'This is a test title',
        path: [],
        activePath: [],
        parentId: undefined,
      };

      expect(checkIsVisible(input)).toBe(true);
    });

    it('should return false if searchTerm is not in title', () => {
      const input = {
        searchTerm: 'notfound',
        title: 'This is a test title',
        path: [],
        activePath: [],
        parentId: undefined,
      };

      expect(checkIsVisible(input)).toBe(false);
    });

    it('should return true for top-level items when no searchTerm is provided', () => {
      const input = {
        searchTerm: '',
        title: 'Title',
        path: [],
        activePath: [],
        parentId: undefined,
      };

      expect(checkIsVisible(input)).toBe(true);
    });

    it('should return true if parent item is active and no searchTerm is provided', () => {
      const input = {
        searchTerm: '',
        title: 'Title',
        path: ['1', '2'],
        activePath: ['1', '2', '3'],
        parentId: '1',
      };

      expect(checkIsVisible(input)).toBe(true);
    });

    it('should return false if neither top-level nor parent item is active, and no searchTerm is provided', () => {
      const input = {
        searchTerm: '',
        title: 'Title',
        path: ['1', '2'],
        activePath: ['3', '4'],
        parentId: '5',
      };

      expect(checkIsVisible(input)).toBe(false);
    });
  });

  describe('determineHighlightClasses', () => {
    it('should return isSecondLevel as true when level is 1 and is open', () => {
      const input = {
        parentId: '1',
        id: '2',
        activePath: ['1', '2'],
        level: 1,
        isOpen: true,
        searchTerm: '',
      };

      const result = determineHighlightClasses(input);

      expect(result).toEqual({
        isFirstLevel: false,
        isSecondLevel: true,
      });
    });

    it('should return isFirstLevel as true when level is 1 and is not open', () => {
      const input = {
        parentId: '1',
        id: '2',
        activePath: ['1', '2'],
        level: 1,
        isOpen: false,
        searchTerm: '',
      };

      const result = determineHighlightClasses(input);

      expect(result).toEqual({
        isFirstLevel: true,
        isSecondLevel: false,
      });
    });

    it('should return both isFirstLevel and isSecondLevel as false for closed parent', () => {
      const input = {
        parentId: '1',
        id: '2',
        activePath: [],
        level: 0,
        isOpen: false,
        searchTerm: '',
      };

      const result = determineHighlightClasses(input);

      expect(result).toEqual({
        isFirstLevel: false,
        isSecondLevel: false,
      });
    });

    it('should return both isFirstLevel and isSecondLevel as false when searchTerm is provided', () => {
      const input = {
        parentId: '1',
        id: '2',
        activePath: ['1', '2'],
        level: 2,
        isOpen: true,
        searchTerm: 'search',
      };

      const result = determineHighlightClasses(input);

      expect(result).toEqual({
        isFirstLevel: false,
        isSecondLevel: false,
      });
    });

    it('should return both isFirstLevel and isSecondLevel as false when parent not in active path and current id not in path', () => {
      const input = {
        parentId: '1',
        id: '2',
        activePath: ['3', '4'],
        level: 2,
        isOpen: false,
        searchTerm: '',
      };

      const result = determineHighlightClasses(input);

      expect(result).toEqual({
        isFirstLevel: false,
        isSecondLevel: false,
      });
    });
  });

  describe('findPathById', () => {
    const mockPages: Record<string, IPage> = {
      root: {
        id: 'root',
        title: 'My super root title',
        parentId: 'randomParent',
        level: 0,
        tabIndex: 0,
      },
      section1: {
        id: 'section1',
        title: 'Section 1',
        parentId: 'root',
        level: 1,
        tabIndex: 1,
      },
      subsection1: {
        id: 'subsection1',
        title: 'Subsection 1',
        parentId: 'section1',
        level: 2,
        tabIndex: 2,
      },
      subsubsection1: {
        id: 'subsubsection1',
        title: 'Subsubsection 1',
        parentId: 'subsection1',
        level: 3,
        tabIndex: 3,
      },
    };

    it('should return the correct path for a nested page', () => {
      const path = findPathById({
        pages: mockPages,
        targetId: 'subsubsection1',
      });

      expect(path).toEqual([
        'root',
        'section1',
        'subsection1',
        'subsubsection1',
      ]);
    });

    it('should return the correct path for a root page', () => {
      const path = findPathById({ pages: mockPages, targetId: 'root' });

      expect(path).toEqual(['root']);
    });

    it('should throw an error if the page does not have a parentId and is not root', () => {
      const orphanPageId = 'orphanPage';

      mockPages[orphanPageId] = {
        id: orphanPageId,
        title: 'New Page',
        level: 1,
        tabIndex: 4,
      };

      expect(() => {
        findPathById({ pages: mockPages, targetId: orphanPageId });
      }).toThrow('No parent id found for the given page');
    });

    it('should throw an error if the page does not exist', () => {
      expect(() => {
        findPathById({ pages: mockPages, targetId: 'nonExistent' });
      }).toThrow('No page found for the given id');
    });
  });
});
