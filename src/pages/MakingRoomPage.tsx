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

import { FormProvider, useForm } from 'react-hook-form';
import useMakeRoomStore from '@/store/makeroom/useMakeRoomStore';
import { useNavigate } from 'react-router-dom';

function MakingRoomPage() {
  const setRoomName = useMakeRoomStore((state) => state.setRoomName);
  const navigate = useNavigate();

  const methods = useForm({
    mode: 'onChange',
    defaultValues: { roomName: '' },
  });
  const {
    register,
    formState: { isValid },
    watch,
  } = methods;

  const handleClickButton = () => {
    const roomName = watch('roomName');
    setRoomName(roomName);
    navigate('/new-meeting');
  };

  return (
    <FlexColContainer>
      <Header title={HEAD_TITLE.makeRoom} />
      <ContentContainer>
        <PageTitle>{TITLE.makeRoom}</PageTitle>
        <FormProvider {...methods}>
          <RoomInput
            placeholder={INPUT.makeRoom.placeholder}
            label={INPUT.makeRoom.label}
            {...register('roomName', {
              required: true,
            })}
          />
        </FormProvider>
      </ContentContainer>
      <ButtonContainer>
        <Button $style="solid" $theme="primary-purple" disabled={!isValid}>
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
