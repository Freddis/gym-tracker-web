import {FC, useState, useRef, ChangeEvent, MouseEvent} from 'react';
import {AppImage} from '../AppImage/AppImage';
import {FaTrash, FaUpload} from 'react-icons/fa6';
import {cn} from '../../../utils/cn';

interface AppImageInputProps {
  url?: string,
  onUpdate: (data: string)=> void
  className?: string
  onRemove?: () => void
}
const TRANSPARENT_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAAAAAA6fptVAAAACklEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

export const AppImageInput: FC<AppImageInputProps> = (props) => {
  const [image, setImage] = useState<string | null | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const onImageClick = () => {
    fileInputRef.current?.click();
  };
  const onFileChanged = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const data = reader.result as string;
      setImage(data);
      props.onUpdate(data);
    };
    reader.readAsDataURL(file);
  };
  const onDeleteClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setImage(null);
    props.onRemove?.();
  };
  const imageSrc = image !== undefined ? (image ?? undefined) : props.url;
  const opaqueIfNoImage = !imageSrc ? 'opacity-100' : '';
  return (
  <div className={'relative inline-block cursor-pointer rounded-md'} onClick={onImageClick}>
     <div
        className={cn(`hover:opacity-100 opacity-0 transition-all rounded-md
        absolute top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center`, opaqueIfNoImage)}
      >
        {props.onRemove && imageSrc && (
          <div className="absolute top-1 right-1 cursor-pointer" onClick={onDeleteClick}>
            <FaTrash className="text-sm fill-white hover:fill-accent"/>
          </div>
        )}
      <FaUpload className="text-xl fill-white"/>
     </div>
    <AppImage src={imageSrc ?? TRANSPARENT_PIXEL} className={props.className} />
    <input type="file" accept="image/*" ref={fileInputRef} onChange={onFileChanged} className="hidden"/>
  </div>
  );
};
