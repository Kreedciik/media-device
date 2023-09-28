import { FC } from "react";
export const PhotoFrame: FC<{ photo: string }> = ({ photo }) => {
  return (
    <div className='output'>
      <img src={photo} alt='The screen capture will appear in this box.' />
    </div>
  );
};
