import * as React from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import {cn} from '../../utils/cn';
import {ThemeContext} from '../layout/ThemeProvider/context/ThemeContext';
import {ThemeProvider} from '../layout/ThemeProvider/ThemeProvider';

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  // this is storybook fix with theme provider
  // normally <body> element contans the theme classes and this can't be changed without disadvantages such as wrong color on sling scroll
  // in storybook it's not <body> but deeper components
  // the content is portalled to <body> by default and therfore it breaks in storybook side-by-side display
  // adding extra themeprovider with enforced theme fixes it
  // it works because in shadow DOM we still inherit proper context even in storybook and
  // by adding extra themeprovider we set proper CSS classes into real DOM
  const theme = React.useContext(ThemeContext);
  return (
    <PopoverPrimitive.Portal>
      <ThemeProvider theme={theme}>
        <PopoverPrimitive.Content
          data-slot="popover-content"
          align={align}
          sideOffset={sideOffset}
          className={cn(
            `bg-popover text-popover-foreground data-[state=open]:animate-in
            data-[state=closed]:animate-out data-[state=closed]:fade-out-0 
            data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 
            data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 
            data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 
            data-[side=top]:slide-in-from-bottom-2 
            z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden`,
            className
          )}
          {...props}
        />
      </ThemeProvider>
    </PopoverPrimitive.Portal>
  );
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />;
}

export {Popover, PopoverTrigger, PopoverContent, PopoverAnchor};
