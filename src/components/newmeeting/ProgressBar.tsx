import styled from 'styled-components';

interface Props {
  currentStep: 'making' | 'confirm' | 'login';
}

function ProgressBar({ currentStep }: Props) {
  let step = 0;

  if (currentStep === 'making') step = 1;
  else if (currentStep === 'confirm') step = 2;
  else if (currentStep === 'login') step = 3;

  return (
    <ProgressBarContainer>
      <ProgressWrapper>
        <ProgressTitle $active={step !== 0}>일정 조율</ProgressTitle>
        <ProgressTitle $active={step !== 0 && step !== 1}>
          확인 및 생성
        </ProgressTitle>
        <ProgressTitle $active={step !== 1 && step !== 2}>
          정보 입력
        </ProgressTitle>
      </ProgressWrapper>
      <ProgressBarWrapper>
        <ProgressBarBackground />
        <ProgressValueBar $currentStep={currentStep} />
        <DotWrapper>
          <StepDot $active={step !== 0} />
          <StepDot $active={step !== 0 && step !== 1} />
          <StepDot $active={step !== 1 && step !== 2} />
        </DotWrapper>
      </ProgressBarWrapper>
    </ProgressBarContainer>
  );
}

const ProgressBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 12px 10px;
  box-shadow: 0px 4px 10px 0px rgba(90, 90, 90, 0.1);
  border-radius: 12px;
`;

const ProgressWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ProgressTitle = styled.h3<{ $active: boolean }>`
  color: ${({ theme, $active }) =>
    $active ? theme.color.point.green : theme.color.secondary.solid.bk[400]};
  ${({ theme }) => theme.typo.body.medium[14]}
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  height: 6px;
  position: relative;
`;

const ProgressBarBackground = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: rgba(31, 31, 60, 0.12);
  border-radius: 16px;
`;

const ProgressValueBar = styled.div<{ $currentStep: string }>`
  width: ${({ $currentStep }) => {
    if ($currentStep === 'making') return '26px';
    if ($currentStep === 'confirm') return '50%';
    if ($currentStep === 'login') return '100%';
  }};
  height: 100%;
  position: absolute;
  background: linear-gradient(90deg, #afe5aa 0%, #17b609 100%);
  border-radius: 16px;
`;

const DotWrapper = styled.div`
  width: 100%;
  height: 6px;
  padding: 0 23px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
`;

const StepDot = styled.div<{ $active: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 100%;
  background: ${({ theme, $active }) =>
    $active ? '#307f29' : theme.color.secondary.solid.bk[400]};
  z-index: 99;
`;

export default ProgressBar;
