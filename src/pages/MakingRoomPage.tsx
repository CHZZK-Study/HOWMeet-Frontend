import styled from 'styled-components';
import {
  ContentContainer,
  FlexColContainer,
} from '@/styles/components/container';
import Button from '@/components/common/Button';
import RoomInput from '@/components/room/RoomInput';
import Header from '@/components/common/Header';
import HEAD_TITLE from '@/constants/header';
import INPUT from '@/constants/input';
import { TITLE } from '@/constants/title';
import { PageTitle } from '@/styles/components/text';

import { useForm } from 'react-hook-form';

function MakingRoomPage() {
  const methods = useForm({ mode: 'onChange' });
  const {
    register,
    formState: { isValid },
  } = methods;

  return (
    <FlexColContainer>
      <Header title={HEAD_TITLE.makeRoom} />
      <ContentContainer>
        <PageTitle>{TITLE.makeRoom}</PageTitle>
        <RoomInput
          placeholder={INPUT.makeRoom.placeholder}
          label={INPUT.makeRoom.label}
          {...register('roomName', {
            required: true,
            minLength: 1,
          })}
        />
      </ContentContainer>
      <ButtonContainer>
        <Button $style="solid" disabled={!isValid}>
          다음
        </Button>
      </ButtonContainer>
    </FlexColContainer>
  );
}

const ButtonContainer = styled.div`
  position: sticky;
  bottom: 16px;

  width: 100%;

  padding: 0 24px;
`;

export default MakingRoomPage;
