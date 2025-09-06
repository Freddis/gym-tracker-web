'use client';

import {Check, ChevronsUpDown} from 'lucide-react';
import {Popover, PopoverContent, PopoverTrigger} from '../../shadcn/popover';
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from '../../shadcn/command';
import {cn} from '../../../utils/cn';
import {FC, useState} from 'react';
import {ScrollArea} from '../../shadcn/scroll-area';
import {AppComboboxProps} from './types/AppComboboxProps';

export const AppCombobox: FC<AppComboboxProps> = ({className, values, placeholder, notFound, defaultValue}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={cn('h-10 bg-cavity border-in-cavity border-1 cursor-pointer flex items-center gap-3 p-3 rounded-xs', className)}>
          <div className="capitalize text-base">{value ? values.find((val) => val.label === value)?.label : defaultValue}</div>
          <div className="grow flex flex-row-reverse">
            <div className="inline-block">
              <ChevronsUpDown className="opacity-50 " />
              </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 z-5">
        <Command>
          <CommandInput placeholder={placeholder} className="h-9 text-base" />
          <CommandList>
            <CommandEmpty>{notFound}</CommandEmpty>
            <ScrollArea className="max-h-100">
              <CommandGroup className="">
                {values.map((val) => (
                  <CommandItem className="capitalize cursor-pointer text-base transition-all"
                    key={val.label}
                    value={val.label}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? '' : currentValue);
                      setOpen(false);
                      val.onSelect(currentValue !== value);
                    }}
                  >
                    {val.label}
                    <Check
                      className={cn(
                        'ml-auto',
                        value === val.label ? 'opacity-100' : 'opacity-0'
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
