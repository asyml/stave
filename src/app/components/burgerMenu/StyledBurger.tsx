import styled from 'styled-components';

export const StyledBurger = styled.button<{ open: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 24px;
  justify-content: space-around;
  margin-right: 10px;
  position: relative;
  outline: none;
  padding: 0;
  width: 24px;
  z-index: 10;
  
  span {
    background-color: ${({ open }) => open ? 'white' : 'black'};
    border-radius: 10px;
    height: 2px;
    transition: all 0.3s linear;
    transform-origin: 1px;
    width: 24px;

    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
    }
    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`;
