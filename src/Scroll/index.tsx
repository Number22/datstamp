import React, {
  useState,
  FC,
  ReactNode,
  RefObject,
  createRef,
} from 'react';
import SimpleBar from 'simplebar-react';
import cn from 'classnames';
import { VariableSizeList as List } from 'react-window';

import styles from './styles.css';
const cx = cn.bind(styles);

enum ScrollState {
  START = 'start',
  END = 'end',
  ACTIVE = 'active',
  NONE = 'none',
}

export type ScrollEvent = {
  size?: number,
  fullSize?: number,
  offset?: number,
  scrollState?: ScrollState,
};

type ScrollProps = {
  maskSize?: number,
  children?: ReactNode,
  className?: string,
  scrollMaxHeight?: number,
  marginRight?: number,
  onLoad?: () => void,
  onScroll?: (event: ScrollEvent) => void,
  scroll?: RefObject<HTMLDivElement>,
  isNoFading?: boolean
};

const INFINITE_SCROLL_OFFSET = 150;
export const DEFAULT_SCROLL_MASK_SIZE = 32;
const DEFAULT_RIGHT_MARGIN = 8;

const Scroll: FC<ScrollProps> = ({
  // children,
  className,
  onLoad,
  // scroll = createRef(),
  scrollMaxHeight,
  marginRight = DEFAULT_RIGHT_MARGIN,
  onScroll = () => {},
  isNoFading = false,
}) => {
  const [scrollState, changeScrollState] = useState<ScrollState>(ScrollState.START);
  const ref = createRef<SimpleBar>();

  const spotScrollState = ():void => {
    if (!ref.current) {
      return;
    }

    const {
      offsetHeight,
      scrollTop,
      scrollHeight,
      // @ts-ignore
    } = ref.current.contentWrapperEl;
    let currentScrollState: ScrollState = ScrollState.END;
    const size = offsetHeight;
    const fullSize = scrollHeight;
    const offset = scrollTop;

    if (size === fullSize || isNoFading) {
      currentScrollState = ScrollState.NONE;
    } else if (offset <= 0) {
      currentScrollState = ScrollState.START;
    } else if (size + offset >= fullSize) {
      currentScrollState = ScrollState.END;
    } else {
      currentScrollState = ScrollState.ACTIVE;
    }

    console.log(size, offset, fullSize);

    changeScrollState(currentScrollState);

    onScroll({
      size, fullSize, offset, scrollState: currentScrollState,
    });

    if (size + offset + INFINITE_SCROLL_OFFSET >= fullSize && onLoad && fullSize) {
      onLoad();
    }
  };

  const rowHeights = new Array(1000)
    .fill(true)
    .map(() => 25 + Math.round(Math.random() * 50));
 
  const getItemSize = (index: number) => rowHeights[index];

  const Row = ({ index, style }: { index: number, style: {}}) => (
    <div style={style}>Row {index}</div>
  );

  return (
    <div className={cx({
      scrollWrapper: true,
      scrollWrapper_active: scrollState === ScrollState.ACTIVE,
      scrollWrapper_start: scrollState === ScrollState.START,
      scrollWrapper_end: scrollState === ScrollState.END,
    })}>
      <SimpleBar
        ref={ref}
        onScroll={spotScrollState}
        style={{
          maxHeight: scrollMaxHeight,
          marginRight,
        }}
        className={className}
      >
        {({ scrollableNodeRef, contentNodeRef }: {scrollableNodeRef: RefObject<HTMLDivElement>, contentNodeRef: RefObject<HTMLDivElement>}) => (
          <List
            height={300}
            width="auto"
            itemCount={1000}
            itemSize={getItemSize}
            outerRef={scrollableNodeRef}
            innerRef={contentNodeRef}
          >
              {Row}
          </List>
        )}
      </SimpleBar>
    </div>
  );
};

export default Scroll;