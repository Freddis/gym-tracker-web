import {FC, useState, useRef, ChangeEvent} from 'react';
import {AppImage} from '../AppImage/AppImage';
import {FaUpload} from 'react-icons/fa6';
import {cn} from '../../../utils/cn';

interface AppImageInputProps {
  url?: string,
  onUpdate: (data: string)=> void
  className?: string
}

export const AppImageInput: FC<AppImageInputProps> = (props) => {
  const [image, setImage] = useState<string | null>(null);
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
  const opaqueIfNoImage = !image && !props.url ? 'opacity-100' : '';
  return (
  <div className={'relative inline-block cursor-pointer rounded-md'} onClick={onImageClick}>
     <div
        className={cn(`hover:opacity-100 opacity-0 transition-all rounded-md
        absolute top-0 left-0 w-full h-full bg-black/80 flex items-center justify-center`, opaqueIfNoImage)}
      >
      <FaUpload className="text-xl fill-white"/>
     </div>
    <AppImage src={image ?? props.url} className={props.className} />
    <input type="file" accept="image/*" ref={fileInputRef} onChange={onFileChanged} className="hidden"/>
  </div>
  );
};
