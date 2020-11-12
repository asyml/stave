import React, {useState} from 'react';
import {useDropzone, FileWithPath} from 'react-dropzone';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export interface DropUploadProp {
  fileLimit: number;
  mimeType: string;
  allowMultiple: boolean;
  fileActionButtonText?: string;
  // If this function is provided, the fileActionButtonFunc will be evoked when the button is clicked.
  fileActionButtonFunc?: Function;
  dropZoneText?: string;
  fileDropFunc?: Function;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getColor = (props: any) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isDragActive) {
    return '#2196f3';
  }
  return '#b3b3b3';
};

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border 0.24s ease-in-out;
`;

function DropUpload({
  fileLimit,
  mimeType,
  allowMultiple,
  fileActionButtonText,
  fileActionButtonFunc,
  dropZoneText,
  fileDropFunc,
}: DropUploadProp) {
  const [files, setFiles] = useState([] as FileWithPath[]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop: acceptedFiles => {
      if (fileDropFunc && typeof fileDropFunc === 'function') {
        fileDropFunc(acceptedFiles);
      }
      acceptedFiles.forEach(file => {
        console.log(file);
        setFiles(files => [...files, file]);
      });
    },
    accept: mimeType,
    maxSize: fileLimit,
    multiple: allowMultiple,
  });

  const file_info = files.map((file, index) => {
    const f = file as FileWithPath;
    return (
      <li key={'upload_file_' + index}>
        {f.path} - {Math.round(f.size / 1024)} KB
      </li>
    );
  });

  let action_button;
  if (fileActionButtonFunc && typeof fileActionButtonFunc === 'function') {
    action_button = (
      <Button
        onClick={() => {
          fileActionButtonFunc(files);
          setFiles([] as FileWithPath[]);
        }}
        color="primary"
        size="small"
        variant="contained"
        disableElevation
      >
        {fileActionButtonText}
      </Button>
    );
  }

  return (
    <section className="container">
      <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
        <input {...getInputProps()} />
        <p>
          {dropZoneText
            ? dropZoneText
            : "Drag 'n' drop your data here, or click to select it from a file browser."}
        </p>
      </Container>
      <aside>
        <h4>Documents to be added.</h4>
        <ul>{file_info}</ul>
      </aside>
      <div> {action_button} </div>
    </section>
  );
}

export default DropUpload;
