import styled from 'styled-components';

export const StyledMenu = styled.div<{open: boolean}>`
  background-color: black;
  display: flex;
  flex-direction: column;
  height: 100vh;
  left: 0;
  padding: 60px;
  position: absolute;
  top: 0;
  z-index: 20;
  transform: ${({open}) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  transition: transform 0.3s ease-in-out;

  a {
    color: white;
    cursor: pointer;
    font-size: 20px;
    margin: 15px 0;
    text-decoration: none;
  }
`;
