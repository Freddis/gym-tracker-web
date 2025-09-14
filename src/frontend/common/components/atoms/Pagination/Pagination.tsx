import {FC} from 'react';
import {PaginationProps} from './types/PaginationProps';
import {cn} from '../../../utils/cn';

export const Pagination: FC<PaginationProps> = (props) => {
  const className = props.className;
  const maxPages = Math.ceil(props.info.count / props.info.pageSize);
  type Button = {label: string, selected: boolean, page: number, click: () => void};
  const buttons: Button[] = [];

  const createButton = (page: number, label?: string, ignoreActive?: boolean): Button => {
    const newLabel = label ?? page.toString();
    return {
      label: newLabel,
      selected: !ignoreActive && props.info.page === page,
      page,
      click: () => pageClicked(page),
    };
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

  const pageClicked = (page: number) => {
    props.onPageChanged(page);
  };

  return (
  <div className="flex justify-center gap-3">
      {buttons.map((b) => (
        <button key={b.label} className={cn('min-w-5 cursor-pointer', b.selected ? 'text-accent' : '', className)} onClick={b.click}>
          {b.label}
        </button>
      ))}
    </div>
  );
};
