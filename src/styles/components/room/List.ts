import styled from 'styled-components';

export const List = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 9px;
  width: 100%;
  padding: 17px;
  border-radius: 14px;
  background: ${({ theme }) => theme.color.primary.white};
  box-shadow: 0px 3.805px 10.559px 0px rgba(90, 90, 90, 0.1);

  .title {
    color: ${({ theme }) => theme.color.secondary.solid.bk[900]};
    ${({ theme }) => theme.typo.body.semi_bold[20]}
  }
`;

export const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  .date {
    color: ${({ theme }) => theme.color.secondary.solid.bk[700]};
    ${({ theme }) => theme.typo.body.medium[14]}
  }
`;

export const NoticeDot = styled.div`
  position: absolute;
  top: 17px;
  right: 17px;

  width: 8px;
  height: 8px;
  border-radius: 100%;
  background: ${({ theme }) => theme.color.secondary.solid.red.red};
`;
