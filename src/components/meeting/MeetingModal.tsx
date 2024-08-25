// import styled from 'styled-components';
// import Button from '@/components/common/Button';
// import theme from '@/styles/theme';
// import { CheckIcon, CloseIcon, UrlIcon } from 'public/assets/icons';
// import { GrayColLine } from './result/AttendStatusHeader';

// // 공통 스타일 컴포넌트
// const ModalOverlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 100;
//   background-color: rgba(0, 0, 0, 0.5);
// `;

// const ModalContainer = styled.div`
//   background-color: #fff;
//   border-radius: 10px;
//   padding: 20px;
//   width: 90%;
//   max-width: 400px;
//   height: auto;
//   min-height: 300px;
//   max-height: 80vh;
//   display: flex;
//   flex-direction: column;
//   box-sizing: border-box;

//   @media (min-width: 768px) {
//     width: 50%;
//   }

//   @media (min-width: 1024px) {
//     width: 30%;
//   }
// `;

// const ModalHeader = styled.div`
//   display: flex;
//   justify-content: flex-end;
//   align-items: center;
//   margin-bottom: 20px;
// `;

// const CloseButton = styled.button`
//   background: none;
//   border: none;
//   cursor: pointer;
//   padding: 0;

//   img {
//     width: 20px;
//     height: 20px;
//   }
// `;

// const ModalContent = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   text-align: center;
// `;

// const ModalTitle = styled.h1`
//   font-size: 20px;
//   font-weight: 500;
//   margin-bottom: 10px;
// `;

// const ModalText = styled.p`
//   font-size: 16px;
//   margin-bottom: 20px;
// `;

// const ButtonContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   gap: 10px;
//   margin-top: 20px;
// `;

// // UrlShareModal 컴포넌트
// function UrlShareModal({ onClose }) {
//   return (
//     <ModalOverlay>
//       <ModalContainer>
//         <ModalHeader>
//           <CloseButton onClick={onClose}>
//             <CloseIcon />
//           </CloseButton>
//         </ModalHeader>
//         <ModalContent>
//           <ModalTitle>확정된 일정 공유하기</ModalTitle>
//           <UrlIcon />
//           <ModalTitle>URL 복사하기</ModalTitle>
//         </ModalContent>
//         <ButtonContainer>
//           <Button $style="solid" onClick={onClose}>
//             취소
//           </Button>
//         </ButtonContainer>
//       </ModalContainer>
//     </ModalOverlay>
//   );
// }

// // ResultTimeSelectModal 컴포넌트
// function ResultTimeSelectModal({ onClose, decidedTime }) {
//   const { date, startHour, startMinute, endHour, endMinute } = decidedTime;

//   return (
//     <ModalOverlay>
//       <ModalContainer>
//         <ModalHeader>
//           <CloseButton onClick={onClose}>
//             <CloseIcon />
//           </CloseButton>
//         </ModalHeader>
//         <ModalContent>
//           <ModalTitle>일정을 확정하시겠습니까?</ModalTitle>
//           <ModalText>일정 확정 후 시간 변경은 어려워요!</ModalText>
//           <ModalText>
//             하우밋 방
//             <GrayColLine />
//             개발자 전체 회의 일정
//           </ModalText>
//           <ModalText
//             style={{ color: theme.color.point.green, fontSize: '24px' }}
//           >
//             {date} {startHour}:{startMinute} ~ {endHour}:{endMinute}
//           </ModalText>
//         </ModalContent>
//         <ButtonContainer>
//           <Button $style="outlined" onClick={onClose}>
//             취소
//           </Button>
//           <Button $style="solid" onClick={onClose}>
//             확인
//           </Button>
//         </ButtonContainer>
//       </ModalContainer>
//     </ModalOverlay>
//   );
// }

// // TimeSelectModalComp 컴포넌트
// function TimeSelectModalComp({ onClose }) {
//   return (
//     <ModalOverlay>
//       <ModalContainer>
//         <ModalHeader>
//           <CloseButton onClick={onClose}>
//             <CloseIcon />
//           </CloseButton>
//         </ModalHeader>
//         <ModalContent>
//           <CheckIcon />
//           <ModalTitle>일정이 제출되었어요!</ModalTitle>
//           <ModalText>
//             일정이 확정되면
//             <br />
//             알림으로 빠르게 알려드릴게요!
//             <br />
//             잠시만 기다려주세요 :)
//           </ModalText>
//         </ModalContent>
//         <ButtonContainer>
//           <Button $style="solid" onClick={onClose}>
//             확인
//           </Button>
//         </ButtonContainer>
//       </ModalContainer>
//     </ModalOverlay>
//   );
// }

// export { UrlShareModal, ResultTimeSelectModal, TimeSelectModalComp };
