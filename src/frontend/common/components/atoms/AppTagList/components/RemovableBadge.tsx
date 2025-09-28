
import {ComponentProps, FC, MouseEventHandler} from 'react';
import {cn} from '../../../../utils/cn';
import {Badge} from '../../../shadcn/badge';
import {XIcon} from 'lucide-react';

interface RemovableBadgeProps extends ComponentProps<typeof Badge> {
  onRemove?: () => void
}

export const RemovableBadge: FC<RemovableBadgeProps> = (props) => {
  const {className, children, onRemove, ...rest} = props;
  const handleRemove: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    onRemove?.();
  };

  return (
    <Badge className={cn('flex items-center gap-2', className)} {...rest} variant={'destructive'}>
      {children}
      {onRemove && (
        // biome-ignore lint/a11y/noStaticElementInteractions: "This is a clickable badge"
        // biome-ignore lint/a11y/useKeyWithClickEvents: "This is a clickable badge"
        <div
          className="size-auto cursor-pointer hover:text-muted-foreground"
          onClick={handleRemove}
        >
          <XIcon size={12} />
        </div>
      )}
    </Badge>
  );
};
