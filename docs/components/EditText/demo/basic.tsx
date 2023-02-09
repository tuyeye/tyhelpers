import React, { FC, useState } from 'react';
import { EditText } from 'tyhelpers';

const Example: FC = () => {
  const [value, setValue] = useState<string>('cccc');

  return (
    <>
      <p>可编辑的文本：</p>
      <EditText value={value} onChange={setValue} />
    </>
  );
};

export default Example;
