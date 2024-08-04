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

<<<<<<< HEAD
export const ButtonContainer = styled.div`
  width: 100%;
  height: 130px;
  position: sticky;
  bottom: 0;
  left: 0;
  z-index: 999;

  display: flex;
  align-items: end;
  padding: 24px;
  padding-top: 0px;

  background: linear-gradient(
    180deg,
    rgba(244, 245, 245, 0) 0%,
    #f4f5f5 18.82%,
    #f4f5f5 100%
  );
=======
export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px 24px;

  display: flex;
  flex-direction: column;
  gap: 25px;
  flex: 1;
>>>>>>> dev
`;
