import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { IEntities, IPage } from '../../../../types/toc-data';
import { useActivePath } from '../active-path-provider/ActivePathProvider';
import { useTransition, animated } from 'react-spring';

import style from './index.module.css';

interface ITableOfContentsItem {
  pageData: IPage;
  entities: IEntities;
  path: string[];
}

export const TableOfContentsItem = ({
  pageData,
  entities,
  path,
}: ITableOfContentsItem) => {
  const { title, url, pages, id, parentId } = pageData;
  const { activePath, setActivePath } = useActivePath();
  const navigate = useNavigate();

  const isTopLevelItem = path.length === 0;
  const isParentItemActive = parentId && activePath.includes(parentId);

  const transitions = useTransition(isTopLevelItem || isParentItemActive, {
    from: {
      opacity: 0,
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    enter: {
      opacity: 1,
      height: 'auto',
      paddingTop: 8,
      paddingBottom: 8,
    },
    leave: {
      opacity: 0,
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
    },
    config: { tension: 1000, friction: 120, duration: 200 },
  });

  const newPath = [...path, id];
  const isActive = activePath.includes(id);
  const isLastActive = activePath.at(-1) === id;

  const handleClick = () => {
    if (url) {
      navigate(url);
    }

    setActivePath(newPath);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === 'Space') {
      handleClick();
    }
  };

  return (
    <>
      {transitions(
        (styles, item) =>
          item && (
            <animated.div
              role={url ? 'link' : 'button'}
              tabIndex={0}
              onClick={handleClick}
              style={{
                ...styles,
                paddingLeft: `${
                  pageData.level * 22 + 22 - (!pages ? -20 : 0)
                }px`,
              }}
              className={clsx(
                style.item,
                isActive && style.active,
                isLastActive && style.last,
                !pages && style.noPages,
              )}
              onKeyDown={handleKeyDown}
            >
              {title}
            </animated.div>
          ),
      )}
      {pages?.map((pageId) => (
        <TableOfContentsItem
          key={pageId}
          pageData={entities.pages[pageId]}
          entities={entities}
          path={newPath}
        />
      ))}
    </>
  );
};
