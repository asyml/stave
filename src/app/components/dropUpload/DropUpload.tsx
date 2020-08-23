import React from 'react';
import {useDropzone, FileWithPath} from 'react-dropzone';
import styled from 'styled-components';

export interface DropUploadProp {
  fileLimit: number,  
  filesAddedFunc: Function,
}

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
}

const Container = styled.div`
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
  transition: border .24s ease-in-out;
`;


function DropUpload({
  fileLimit,
  filesAddedFunc,
}: DropUploadProp) {
  const {
    acceptedFiles, 
    getRootProps, 
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone(
    {
      onDrop: acceptedFiles => {
        filesAddedFunc(acceptedFiles);
      },
      accept: 'application/json',
      maxSize: fileLimit,
    }
  );
  
  const files = acceptedFiles.map(file => {
    const f = file as FileWithPath
    return (
      <li key={f.path}>
        {f.path} - {Math.round(f.size / 1024)} KB
      </li>
    )}
  );

  return (
    <section className="container">
      <Container {...getRootProps({isDragActive, isDragAccept, isDragReject})}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop your ontology spec here, or click to select it.</p>
      </Container>
      <aside>
        <h4>Selected Ontology File</h4>
        <ul>{files}</ul>
      </aside>
    </section>
  );
}

export default DropUpload;
