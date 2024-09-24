import { axiosInstance } from '@/apis/instance';
import Button from '@/components/common/Button';
import Header from '@/components/common/Header';
import SelectableTimeTable from '@/components/meeting/select/SelectableTimeTable';
import TimeSelectModalComp from '@/components/meeting/select/TimeSelectCompModal';
import TimeSelectTitle from '@/components/meeting/select/TimeSelectTitle';
import useModal from '@/hooks/useModal';
import useToolTip from '@/hooks/useToolTip';
import {
  // IsTimeTableServerInfoProps,
  TimeTableServerInfoProps,
} from '@/mocks/data/timeTableData';
import { useTimeStore } from '@/store/meeting/useTimeStore';
import useUserStore from '@/store/userStore';
import {
  ButtonContainer,
  FlexColContainer,
  NormalContainer,
} from '@/styles/components/container';
import { TimeTableData } from '@/types/timeTableTypes';
import {
  formatPostDateTime,
  formatServerToTimeTableData,
} from '@/utils/meeting/timetable/formatDateTime';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';
import Skeleton from 'react-loading-skeleton'; // 추가
import 'react-loading-skeleton/dist/skeleton.css';

function SelectPage() {
  const { meetingId, roomId } = useParams();

  const { selectedTimes } = useTimeStore();
  const { user } = useUserStore();
  const { closeModal, isOpen, openModal } = useModal();
  const { isToolTipOpen, closeToolTip } = useToolTip();
  const [isSelected, setIsSelected] = useState(false);
  const handleReWrite = () => {
    setIsSelected(false);
  };
  const isGuest = user?.isMember;
  const token = isGuest
    ? sessionStorage.getItem('@HOWMEET_ACCESS_TOKEN')
    : localStorage.getItem('@HOWMEET_ACCESS_TOKEN');

  console.log('user', user);

  const { isLoading, isError, data } = useQuery<TimeTableServerInfoProps>({
    queryKey: ['TimeTableServerInfo'],
    // queryFn: () =>
    //   fetch(
    //     `/${isGuest ? `guest-schedule/${meetingId}` : `room/${roomId}/${meetingId}`}`
    //   ).then((res) => res.json()),
    queryFn: async () => {
      const response = await axiosInstance.get(
        `/${isGuest ? `guest-schedule/${meetingId}` : `room/${roomId}/${meetingId}`}`
      );
      return response.data; // 데이터 반환
    },
  });

  useEffect(() => {
    console.log(data);
  }, [data]);

  // 로딩 상태 처리
  if (isLoading || !data) {
    return (
      <NormalContainer>
        <Header
          title="일정 조율"
          isShare
          toggle={closeToolTip}
          isVisible={isToolTipOpen}
        />
        <TimeSelectTitle
          Title={
            isSelected
              ? `00님이 제출한 시간을 확인해보세요`
              : `가능한 시간을 드래그 해주세요!`
          }
        />
        <FlexColContainer>
          <Skeleton height={600} width={400} count={1} />
        </FlexColContainer>

        {isOpen && <TimeSelectModalComp handleModalClose={closeModal} />}
      </NormalContainer>
    );
  }

  console.log(
    "localStorage.getItem('@HOWMEET_ACCESS_TOKEN')",
    localStorage.getItem('@HOWMEET_ACCESS_TOKEN')
  );
  // 오류 상태 처리
  if (isError) return <div>오류가 발생했습니다. 다시 시도해주세요.</div>;

  // data가 undefined가 아닌지 확인
  if (!data) return <div>데이터를 불러오지 못했습니다.</div>;

  const timeTableData: TimeTableData = formatServerToTimeTableData(data);

  const handleModalOpen = async () => {
    try {
      const formattedTimes = formatPostDateTime(selectedTimes);
      if (!token) {
        console.error('토큰이 없습니다.');
      } else {
        axiosInstance
          .post(
            `${isGuest ? 'gs-record' : 'ms-record'}`,
            {
              [isGuest ? 'gsId' : 'msId']: meetingId,
              selectTime: formattedTimes,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((response) => {
            console.log('전송 성공', response);
          })
          .catch((error) => {
            console.error('전송 실패', error);
          });
      }

      openModal();
      setIsSelected(true);
      toast.message('정보가 성공적으로 저장되었습니다!');
    } catch (error) {
      console.error('Error posting selected times:', error);
      toast.error('정보 저장 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <NormalContainer>
      <Header
        title="일정 조율"
        isShare
        toggle={closeToolTip}
        isVisible={isToolTipOpen}
      />
      <TimeSelectTitle
        Title={
          isSelected
            ? `00님이 제출한 시간을 확인해보세요`
            : `가능한 시간을 드래그 해주세요!`
        }
      />

      <SelectableTimeTable data={timeTableData} dragDisabled={isSelected} />
      <ButtonContainer center>
        <Button
          onClick={isSelected ? handleReWrite : handleModalOpen}
          $style="solid"
          $theme="primary-purple"
          disabled={selectedTimes.length === 0}
          style={{ width: '95%' }}
        >
          {isSelected ? '수정하기' : '시간 선택 완료'}
        </Button>
      </ButtonContainer>
      {isOpen && <TimeSelectModalComp handleModalClose={closeModal} />}
    </NormalContainer>
  );
}

export default SelectPage;
