import styled, { keyframes } from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const Form = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 414px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Input = styled.input`
  max-width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`;
const jump = keyframes`
  from{
    transform: translateY(0)
  }
  to{
    transform: translateY(-3px)
  }
`;

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Spinner = styled.span`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);

  border-top: 2px solid transparent;
  border-right: 2px solid transparent;
  border-bottom: 2px solid transparent;
  border-left: 4px solid white;
  background: transparent;
  width: 24px;
  height: 24px;
  display: inline-block;
  border-radius: 50%;
`;

export const Button = styled.button`
  max-width: 100%;
  padding: 11px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #f03d4e;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: rgb(200, 50, 70);
    animation: ${jump} 0.2s ease-out forwards;
  }
`;

export const FormButton = styled(Button)`
  opacity: ${(props) => (props.disabled ? '.5' : '1')};
  span {
    vertical-align: middle;
  }
  min-height: 46px;
`;

export const Container = styled.div`
  height: 100vh;
`;

export const Error = styled.div`
  color: red;
  text-align: center;
  padding: 1rem;
`;

export const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, auto);
  grid-row-gap: 10px;
  align-content: center;
  > div {
    text-align: center;
    padding: 9px 0;
  }
  .header {
    background-color: #ececb9;
  }
`;
