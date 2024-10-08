import styled from 'styled-components';

function ResultNavbar() {
  return <Navbar>일정 조율 결과</Navbar>;
}

export default ResultNavbar;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  background-color: transparent;
  font-size: 20px;
  font-weight: 500;
  padding: 0 30px;
  margin-top: 20px;
`;
