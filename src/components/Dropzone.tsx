import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {Required} from '../shared/util';
import styled, {css} from 'styled-components';
import {themeElement} from '../shared/theme';

const dropStyles = css`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  border-radius: 1rem;
  font-family: 'DM Sans', sans-serif;
  border: none;
  transition: box-shadow 300ms ease, background-color 300ms ease,
    color 300ms ease;
  cursor: pointer;
  justify-content: center;
  border: solid 1px var(${themeElement('--snow', '--ikeaBlue')});

  &:hover {
    box-shadow: var(--hover);
  }
`;

const PrimaryDrop = styled.div`
  ${dropStyles}
  background-color: var(${themeElement('--snow', '--ikeaBlue')});
  color: var(${themeElement('--spaceGrey', '--coolWhite')});

  &:hover {
    background-color: var(${themeElement('--spaceDark', '--coolWhite')});
    color: var(${themeElement('--snow', '--spaceGrey')});
  }
`;

const SecondaryDrop = styled.div`
  ${dropStyles}
  background-color: var(${themeElement('--ikeaBlue', '--spaceGrey')});
  color: var(--coolWhite);

  &:hover {
    background-color: var(${themeElement('--spaceDark', '--coolWhite')});
    color: var(${themeElement('--snow', '--spaceGrey')});
  }
`;

const ResumeLabel = styled.label`
  color: var(${themeElement('--snow', '--ikeaBlue')});
  font-size: 12px;
`;

interface DropzoneProps {
  onUpload: Function;
  padded?: boolean;
  expanded?: boolean;
  secondary?: boolean;
  value: null | File;
  required?: boolean;
  name: string;
}

const DropzoneComponent = ({
  onUpload,
  padded,
  secondary,
  expanded,
  value,
  required,
  name,
}: DropzoneProps) => {
  const [dragText, setDragText] = useState('');
  const onDrop = useCallback(
    (acceptedFiles) => {
      onUpload(acceptedFiles[0]);
    },
    [onUpload]
  );
  const {getRootProps, getInputProps} = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 5000000,
    accept: '.pdf',
    onDragEnter: () => {
      setDragText('Drop your resume here');
    },
    onDragLeave: () => {
      setDragText('');
    },
  });

  const uploadInstructions = (
    <div style={{textAlign: 'center', pointerEvents: 'none'}}>
      <label>
        {dragText ? <b>{dragText}</b> : 'Select your resume (max. 5MB)'}
      </label>
    </div>
  );

  return (
    <div
      style={{
        position: 'relative',
        padding: `${padded ? '1rem' : 0}`,
        width: expanded ? '100%' : 'unset',
      }}
    >
      {required && <Required style={{opacity: value ? 0 : 1}}></Required>}
      <ResumeLabel htmlFor={name}>Resume</ResumeLabel>
      {secondary ? (
        <SecondaryDrop {...getRootProps()}>
          <input id={name} {...getInputProps()} />
          {value ? value.name : uploadInstructions}
        </SecondaryDrop>
      ) : (
        <PrimaryDrop {...getRootProps()}>
          <input id={name} {...getInputProps()} />
          {value ? value.name : uploadInstructions}
        </PrimaryDrop>
      )}
    </div>
  );
};

export default DropzoneComponent;
