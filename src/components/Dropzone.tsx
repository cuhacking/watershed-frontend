import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import styled, { css } from "styled-components";
import { colors, shadows } from "../shared/constants";
import { themeElement } from "../shared/theme";

const dropStyles = css`
  display: flex;
  align-items: center;
  padding: 1rem 2rem;
  border-radius: 1rem;
  font-family: "DM Sans", sans-serif;
  border: none;
  transition: box-shadow 300ms ease, background-color 300ms ease,
    color 300ms ease;
  cursor: pointer;
  justify-content: center;
  border: solid 1px ${themeElement(colors.snow, colors.ikeaBlue)};
  box-sizing: border-box;

  &:hover {
    box-shadow: ${shadows.hover};
  }
`;

const PrimaryDrop = styled.div`
  ${dropStyles}
  background-color: ${themeElement(colors.snow, colors.ikeaBlue)};
  color: ${themeElement(colors.spaceGrey, colors.white)};

  &:hover {
    background-color: ${themeElement(colors.spaceDark, colors.white)};
    color: ${themeElement(colors.snow, colors.spaceGrey)};
  }
`;

const SecondaryDrop = styled.div`
  ${dropStyles}
  background-color: ${themeElement(colors.ikeaBlue, colors.spaceGrey)};
  color: ${colors.white};

  &:hover {
    background-color: ${themeElement(colors.spaceDark, colors.white)};
    color: ${themeElement(colors.snow, colors.spaceGrey)};
  }
`;

interface DropzoneProps {
  onUpload: Function;
  padded?: boolean;
  expanded?: boolean;
  secondary?: boolean;
  value: null | File;
}

const DropzoneComponent = ({
  onUpload,
  padded,
  secondary,
  expanded,
  value,
}: DropzoneProps) => {
  const [dragText, setDragText] = useState("");
  const onDrop = useCallback(
    (acceptedFiles) => {
      onUpload(acceptedFiles[0]);
    },
    [onUpload]
  );
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 5000000,
    accept: ".pdf",
    onDragEnter: () => {
      setDragText("Drop your files here");
    },
    onDragLeave: () => {
      setDragText("");
    },
  });

  const uploadInstructions = (
    <div style={{ textAlign: "center", pointerEvents: "none" }}>
      <label>
        {dragText ? (
          <b>{dragText}</b>
        ) : (
          "drop your resume here or click to select a file"
        )}
      </label>
      <br />
      <label>only PDF files under 5MB</label>
    </div>
  );

  return (
    <div
      style={{
        padding: `${padded ? "1.5rem" : 0}`,
        width: expanded ? "100%" : "unset",
      }}
    >
      {secondary ? (
        <SecondaryDrop {...getRootProps()}>
          <input {...getInputProps()} />
          {value ? value.name : uploadInstructions}
        </SecondaryDrop>
      ) : (
        <PrimaryDrop {...getRootProps()}>
          <input {...getInputProps()} />
          {value ? value.name : uploadInstructions}
        </PrimaryDrop>
      )}
    </div>
  );
};

export default DropzoneComponent;
