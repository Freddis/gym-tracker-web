'use client';
import {FC, useEffect, useRef, useState} from 'react';
import {cn} from '../../../utils/cn';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../../shadcn/command';
import {Popover, PopoverContent, PopoverTrigger} from '../../shadcn/popover';
import {Button} from '../../shadcn/button';
import {RemovableBadge} from './components/RemovableBadge';
import {AppTagListProps} from './types/AppTagListProps';

export const AppTagList: FC<AppTagListProps> = (props) => {
  const [selected, setSelected] = useState<string[]>(
    props.selected?.map((x) => x.id) ?? []
  );
  const [tags] = useState<{ id: string; label: string }[]>(props.values);
  const handleRemove = (value: string) => {
    if (!selected.includes(value)) {
      return;
    }
    const newValues = selected.filter((v) => v !== value);
    setSelected(newValues);
    props.onSelect(newValues);
  };
  const handleSelect = (value: string) => {
    if (selected.includes(value)) {
      handleRemove(value);
      return;
    }
    const newValues = [...selected, value];
    setSelected(newValues);
    props.onSelect(newValues);
  };

  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [width, setWidth] = useState<number>();
  const ref = useRef<HTMLDivElement>(null);

  const open = uncontrolledOpen;
  const onOpenChange = setUncontrolledOpen;

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0] === undefined) {
        return;
      }
      setWidth(entries[0].contentRect.width);
    });

    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  return (
      <Popover onOpenChange={onOpenChange} open={open}>
        <div className={cn('relative w-full', props.className)} ref={ref}>
          <PopoverTrigger asChild>
            <Button
              className={cn('h-auto w-full justify-between p-2')}
              // biome-ignore lint/a11y/useSemanticElements: "Required"
              role="combobox"
              variant="secondary"
            >
              <div className="flex flex-wrap items-center gap-1">
                {selected.map((tag) => (
                  <RemovableBadge key={tag} onRemove={() => handleRemove(tag)}>
                    {tags.find((t) => t.id === tag)?.label}
                  </RemovableBadge>
                ))}
                {selected.length === 0 && (
                  <span className="px-2 py-px text-muted-foreground">
                  {props.defaultValue}
                  </span>
                )}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className={cn('p-0')} style={{width}}>
            <Command>
              <CommandInput
                className={cn('h-9')}
                placeholder={props.placeholder}
              />
              <CommandList className={'max-h-[200px]'}>
                <CommandEmpty>{props.notFound}</CommandEmpty>
                <CommandGroup>
                  {tags
                    .filter((tag) => !selected.includes(tag.id))
                    .map((tag) => (
                      <CommandItem
                        key={tag.id}
                        onSelect={handleSelect}
                        value={tag.id}
                        className={
                          'cursor-pointer items-center justify-between'
                        }
                      >
                        {tag.label}
                      </CommandItem>
                    ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </div>
      </Popover>
  );
};
