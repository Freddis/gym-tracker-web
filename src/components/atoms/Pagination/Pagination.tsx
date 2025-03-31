import {CSSProperties, JSX} from 'react';

interface PaginationProps {
  info: {
    pageSize: number,
    count: number,
    page: number
  },
  onPageChanged: (page: number) => void,
}
export function Pagination(props: PaginationProps) {
  const style: CSSProperties = {

  };
  const maxPages = Math.ceil(props.info.count / props.info.pageSize);
  const buttons: JSX.Element[] = [];

  const pageClicked = (page: number) => {
    props.onPageChanged(page);
  };

  const createButton = (page: number, label?: string, ignoreActive?: boolean): JSX.Element => {
    const aStyle: CSSProperties = {
      cursor: 'pointer',
      marginRight: 10,
      fontWeight: 'bold',
      width: 35,
    };
    if (!ignoreActive && props.info.page === page) {
      aStyle.color = 'red';
    }
    const newLabel = label ?? page.toString();
    const button = <button key={newLabel} onClick={() => pageClicked(page)} style={aStyle}>{newLabel}</button>;
    return button;
  };

  buttons.push(createButton(1, '<<', true));
  const extraPagesPerSide = 3;
  let from = 1;
  let to = maxPages;
  if (maxPages > extraPagesPerSide * 2 + 1) {
    from = props.info.page - extraPagesPerSide;
    to = props.info.page + extraPagesPerSide;
    if (from < 1) {
      from = 1;
      to = extraPagesPerSide * 2 + 1;
    }
    if (to > maxPages) {
      to = maxPages;
      from = maxPages - extraPagesPerSide * 2;
    }
  }
  for (let i = from; i <= to; i++) {
    buttons.push(createButton(i));
  }
  buttons.push(createButton(maxPages, '>>', true));
  return <div style={style}>{buttons}</div>;
}
