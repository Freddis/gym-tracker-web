import {FC, useState, CSSProperties, HTMLAttributes} from 'react';
import {Exercise} from 'src/frontend/openapi-client';

export const ExerciseRow: FC<{item: Exercise, onSelect?: (item: Exercise)=> void}> = (props) => {
  const item = props.item;
  const [mouseOver, setMouseOver] = useState(false);
  const style: CSSProperties = {
    marginBottom: 10,
    display: 'flex',
    backgroundColor: mouseOver ? '#333' : 'transparent',
    cursor: 'pointer',
    padding: 5,
    flexDirection: 'row',
  };
  const imageStyle: CSSProperties = {
    width: 50,
    height: 50,
    border: '2px solid black',
    borderRadius: 10,
    objectFit: 'cover',
  };
  const labelStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  };
  const containerProps: HTMLAttributes<HTMLDivElement> = {
    style,
    onMouseOver: () => setMouseOver(true),
    onMouseOut: () => setMouseOver(false),
    onClick: () => {
      if (props.onSelect) {
        props.onSelect(item);
      }
    },
  };
  return (
    <div key={item.id} {...containerProps}>
          <img style={imageStyle} src={item.images[0]} />
          <label style={labelStyle}>{item.name}</label>
        </div>
  );
};
