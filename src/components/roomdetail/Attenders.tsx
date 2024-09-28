import styled from 'styled-components';

interface Props {
  member: {
    id: string;
    memberId: string;
    nickname: string;
    isLeader: boolean;
  }[];
}

function Attenders({ member }: Props) {
  return (
    <StyledAttenders>
      {member.map((memberItem) => `${memberItem.nickname}, `)}
    </StyledAttenders>
  );
}

const StyledAttenders = styled.div`
  padding: 17px;
  border-radius: 14px;
  background: ${({ theme }) => theme.color.primary.white};
  box-shadow: 0px 3.805px 10.559px 0px rgba(90, 90, 90, 0.1);
  color: ${({ theme }) => theme.color.secondary.solid.bk[700]};
  ${({ theme }) => theme.typo.body.regular[16]}
`;

export default Attenders;
