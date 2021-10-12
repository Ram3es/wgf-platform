import React, { useRef } from 'react';

import { Icon } from '@components/icon';

import { IImagePickerProps } from './image-picker.typings';

import { ImagePickerStyles } from './image-picker.styles';

export const ImagePicker: React.FC<IImagePickerProps> = ({ setValue }) => {
  const imagePickerRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => imagePickerRef.current?.click();

  const imageChange = (e: React.SyntheticEvent<EventTarget>) => {
    const file = (e.target as HTMLInputElement).files![0];

    const reader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
    }

    const handleChange = function () {
      setValue(reader.result!.toString());
    };

    reader.addEventListener('load', handleChange, false);

    reader.removeEventListener('click', handleChange, false);
  };

  return (
    <ImagePickerStyles.Wrapper>
      <input
        ref={imagePickerRef}
        type="file"
        name="image"
        onChange={imageChange}
      />
      <ImagePickerStyles.Button onClick={handleClick}>
        <Icon type="imagesPicker" />
      </ImagePickerStyles.Button>
    </ImagePickerStyles.Wrapper>
  );
};
