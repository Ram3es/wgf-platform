import React, { FC } from 'react';
import Dropzone from 'react-dropzone';

import { Icon } from '@components/icon';
import { Loader } from '@components/loader';

import { StyledDropBox as Styled } from './drop-box.styles';

interface IDropBoxProps {
  acceptFiles?: string;
  isFileLoading: boolean;
  onHandleFile: (files: File[]) => void;
}

export const DropBox: FC<IDropBoxProps> = ({
  acceptFiles,
  isFileLoading,
  onHandleFile,
}) => (
  <Dropzone accept={acceptFiles} onDrop={onHandleFile} multiple={false}>
    {({
      getRootProps,
      getInputProps,
      isDragActive,
      isDragAccept,
      isDragReject,
    }) => (
      <Styled.Wrapper
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        {isFileLoading ? (
          <>
            <Loader isWithoutArea />
            <Styled.ProcessingText>Processing</Styled.ProcessingText>
          </>
        ) : (
          <>
            <input {...getInputProps()} />
            <Icon type="dropBox" />
            <Styled.Text>
              <span>Drag and drop file</span>
              <span>or</span>
              <strong>browse</strong>
            </Styled.Text>
          </>
        )}
      </Styled.Wrapper>
    )}
  </Dropzone>
);
