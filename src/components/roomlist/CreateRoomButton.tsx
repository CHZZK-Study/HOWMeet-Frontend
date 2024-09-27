import { PATH } from '@/constants/path';
import { CreateRoomPlusIcon } from 'public/assets/icons';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function CreateRoomButton() {
  const navigate = useNavigate();

  return (
    <StyledCreateRoomButton onClick={() => navigate(PATH.makeRoom)}>
      <CreateRoomPlusIcon />
    </StyledCreateRoomButton>
  );
}

const StyledCreateRoomButton = styled.button`
  position: sticky;
  left: 90%;
  bottom: 15%;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 52px;
  height: 52px;

  box-shadow: 0px 4px 12px 0px rgba(137, 137, 137, 0.25);
  border-radius: 100%;

  background: ${({ theme }) => theme.color.point.purple};
`;

export default CreateRoomButton;
