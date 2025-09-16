import React, {ComponentProps} from 'react';


export const CrmTable: React.FC<ComponentProps<'table'>> = (props) => {
  return <table {...props}>{props.children}</table>;
};
