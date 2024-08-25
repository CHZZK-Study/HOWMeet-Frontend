import styled from 'styled-components';
import RoomItem from './RoomItem';

interface Props {
  mock: {
    title: string;
    date: string;
    member: string;
  }[];
}

function RoomList({ mock }: Props) {
  return (
    <RoomListContainer>
      {mock.map((item) => (
        <RoomItem {...item} />
      ))}
    </RoomListContainer>
  );
}

const RoomListContainer = styled.ul`
  overflow-y: scroll;
  height: 80%;

  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export default RoomList;
