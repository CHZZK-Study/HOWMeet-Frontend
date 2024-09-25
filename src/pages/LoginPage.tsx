import DefaultLogin from '@/components/login/DefaultLogin';
import TeammateLogin from '@/components/login/TeammateLogin';
import { useSocialLogin } from '@/hooks/useSocialLogin';
import { FlexColContainer } from '@/styles/components/container';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

function LoginPage() {
  useSocialLogin();
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('roomId');

  return (
    <FlexColContainer>
      <Content>{roomId ? <TeammateLogin /> : <DefaultLogin />}</Content>
    </FlexColContainer>
  );
}

export default LoginPage;

const Content = styled.div`
  width: 100%;
  flex: 1;
  height: fit-content;
`;
