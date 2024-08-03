import styled from 'styled-components';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  border-bottom: 1px solid #ccc;
`;
const CompletePeoplesContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #17b609;
  border-radius: 20px;
`;

function TimeSelectNavbar() {
  return (
    <NavbarContainer>
      <span>일정 조율 중</span>
      <span> | </span>
      <span>현재 참여 인원</span>
      <CompletePeoplesContainer>
        <span>Complete</span>
        <span>2/3</span>
      </CompletePeoplesContainer>
    </NavbarContainer>
  );
}

export default TimeSelectNavbar;
