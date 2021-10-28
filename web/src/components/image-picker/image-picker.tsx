import imageCompression from 'browser-image-compression';
import React, { useRef } from 'react';

import { Icon } from '@components/icon';

import { imageError } from '@constants/pop-up-messages';

import { IImagePickerProps } from './image-picker.typings';

import { ImagePickerStyles } from './image-picker.styles';

const compressOptions = {
  maxSizeMB: 5,
  maxWidthOrHeight: 200,
};

const IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/svg', 'image/jpg'];

export const ImagePicker: React.FC<IImagePickerProps> = ({ setValue }) => {
  const imagePickerRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => imagePickerRef.current?.click();

  const imageChange = async (e: React.SyntheticEvent<EventTarget>) => {
    const file = (e.target as HTMLInputElement).files![0];

    const reader = new FileReader();

    if (!IMAGE_TYPES.includes(file.type)) {
      return imageError().fire();
    }

    const compressedFile = await imageCompression(file, compressOptions);

    reader.readAsDataURL(compressedFile);

    const handleChange = function () {
      setValue(reader.result?.toString() || '');
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
        accept="image/*"
      />
      <ImagePickerStyles.Button onClick={handleClick}>
        <Icon type="imagesPicker" />
      </ImagePickerStyles.Button>
    </ImagePickerStyles.Wrapper>
  );
};
