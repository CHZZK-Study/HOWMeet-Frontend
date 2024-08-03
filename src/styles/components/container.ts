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

export const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 0px 24px;

  display: flex;
  flex-direction: column;
  gap: 25px;
  flex: 1;
`;
