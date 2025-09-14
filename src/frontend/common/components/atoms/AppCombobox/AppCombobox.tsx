'use client';

import {Check, ChevronsUpDown, Command} from 'lucide-react';
import {cn} from '../../../utils/cn';
import {FC, useEffect, useState} from 'react';
import {AppComboboxProps} from './types/AppComboboxProps';
import {Popover, PopoverTrigger, PopoverContent} from '@radix-ui/react-popover';
import {ScrollArea} from '@radix-ui/react-scroll-area';
import {CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem} from 'cmdk';

export const AppCombobox: FC<AppComboboxProps> = ({className, values, selected, placeholder, notFound, defaultValue}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(selected ?? null);
  useEffect(() => {
    setValue(selected ?? null);
  }, [selected]);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className={cn('h-10 bg-cavity border-in-cavity border-1 cursor-pointer flex items-center gap-3 p-3 rounded-sm', className)}>
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
                      setValue(currentValue === value ? null : currentValue);
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
