import styled from 'styled-components';

export const FlexColContainer = styled.main`
  width: 100%;
  min-height: 100dvh;
  height: 100%;
  background: rgb(244, 245, 245);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ButtonContainer = styled.div<{ center?: boolean }>`
  width: 100%;
  height: 130px;
  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 999;

  display: flex;
  align-items: ${({ center }) => (center ? 'center' : 'end')};
  justify-content: ${({ center }) => (center ? 'center' : 'unset')};
  padding: 24px 0;
  padding-top: 0px;

  background: linear-gradient(
    180deg,
    rgba(244, 245, 245, 0) 0%,
    #f4f5f5 18.82%,
    #f4f5f5 100%
  );
`;

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px 24px;

  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: unset;
  gap: 25px;
  flex: 1;
`;

export const NormalContainer = styled.div`
  width: 100%;
  min-height: 100dvh;
  height: 100%;
  background: rgb(244, 245, 245);
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const HeaderContainer = styled.div`
  display: flex;
  height: 50px;
  padding: 0 20px;
  box-sizing: border-box;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 25px;
  font-weight: bold;
`;
