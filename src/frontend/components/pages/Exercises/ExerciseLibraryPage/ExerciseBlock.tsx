import {Link} from '@tanstack/react-router';
import {useState} from 'react';
import {Exercise} from 'src/frontend/openapi-client';

export function ExerciseBlock(props: {item: Exercise & {variations?: Exercise[]}}) {
  const item = props.item;
  const [showVariations, setShowVariations] = useState(false);
  const toggleVariationsDisplay = () => {
    setShowVariations(!showVariations);
  };
  const variationsButtonCaption = showVariations ? 'Hide Variations' : 'Show Variations';
  return (
  <div style={{border: '1px solid white', borderRadius: 5, padding: 20, marginBottom: 20}}>
    {item.images.map((x, i) => (
    <img key={i} src={x} style={{width: 100, height: 100, objectFit: 'cover', marginRight: 5}}/>
    ))}
    <div style={{marginBottom: 20}}>
    <Link to="/exercises/update/$exerciseId"
    params={{exerciseId: item.id.toString()}}
    key={item.id}
    style={{color: 'white', textDecoration: 'none', cursor: 'pointer'}}>
      {`${item.name} ${item.id}`}
    </Link>
    </div>
    {item.variations !== undefined && (
      <>
      <button onClick={toggleVariationsDisplay} style={{cursor: 'pointer'}}>{variationsButtonCaption}</button>
      {showVariations && item.variations.map((item) => <ExerciseBlock key={item.id} item={item}/>)}
      </>
    )}
  </div>
  );
}
