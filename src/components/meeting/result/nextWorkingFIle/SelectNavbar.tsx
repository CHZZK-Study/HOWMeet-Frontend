import styled from 'styled-components';

export default function SelectNavbar({
  selectedOption,
  handleSelectOption,
}: {
  selectedOption: string;
  handleSelectOption: (option: string) => void;
}) {
  return (
    <SelectNavbarContainer>
      <SelectOption
        selected={selectedOption === '최적의 회의 시간'}
        onClick={() => handleSelectOption('최적의 회의 시간')}
      >
        최적의 회의 시간
      </SelectOption>
      <SelectOption
        selected={selectedOption === '전체 타임 스케줄'}
        onClick={() => handleSelectOption('전체 타임 스케줄')}
      >
        전체 타임 스케줄
      </SelectOption>
    </SelectNavbarContainer>
  );
}

const SelectNavbarContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const SelectOption = styled.div<{ selected: boolean }>`
  padding: 10px 20px;
  width: 100%;
  text-align: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  color: ${(props) => (props.selected ? '#4caf50' : 'rgba(208, 208, 208, 1)')};
  border-bottom: 2px solid
    ${(props) => (props.selected ? '#4caf50' : 'rgba(208, 208, 208, 1)')};
`;

// const SelectOption = styled.div`
//   padding: 10px 20px;
//   width: 100%;
//   text-align: center;
//   cursor: pointer;
//   font-size: 16px;
//   font-weight: 500;
//   border-bottom: 2px solid #4caf50;
// `;
