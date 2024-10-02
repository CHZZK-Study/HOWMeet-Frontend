import { PATH } from '@/constants/path';
import useMakeRoomStore from '@/store/makeroom/useMakeRoomStore';
import { CreateRoomPlusIcon } from 'public/assets/icons';
import { useNavigate } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';

interface Props {
  roomName: string;
  roomId: number;
}

function CreateNewMeeting({ roomName, roomId }: Props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const setRoomName = useMakeRoomStore((state) => state.setRoomName);

  const handleClickButton = () => {
    setRoomName(roomName);
    navigate(PATH.new_meeting, { state: { hasRoom: true, roomId } });
  };

  return (
    <ButtonContainer onClick={handleClickButton}>
      <PlusButton>
        <CreateRoomPlusIcon stroke={theme.color.point.purple} />
      </PlusButton>
      <ButtonTitle>새 일정 만들기</ButtonTitle>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.button`
  width: 92%;
  padding: 17px 17px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${({ theme }) => theme.color.point.purple};
  border-radius: 12px 12px 0px 0px;
  position: sticky;
  bottom: 0;
`;

const PlusButton = styled.div`
  border-radius: 100%;
  background: ${({ theme }) => theme.color.primary.white};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7px;

  svg {
    width: 12px;
    height: 12px;
  }
`;

const ButtonTitle = styled.h1`
  color: ${({ theme }) => theme.color.primary.white};
  ${({ theme }) => theme.typo.body.semi_bold[22]}
`;

export default CreateNewMeeting;
