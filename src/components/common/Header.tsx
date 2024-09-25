import { LeftArrowIcon, ShareIcon } from 'public/assets/icons';
import styled from 'styled-components';
import useUserStore from '@/store/userStore';
import { useParams } from 'react-router-dom';
import ToolTip from '../meeting/select/HeaderToolTip';

interface Props {
  title: string;
  isShare?: boolean;
  toggle?: () => void;
  isVisible?: boolean;
}

interface HeaderProps {
  isShare?: boolean;
}

function Header({ title, isShare, isVisible, toggle }: Props) {
  const { user } = useUserStore();
  const { roomId, meetingId } = useParams();
  const handleUrlCopy = () => {
    const baseUrl = window.location.origin; // 도메인만 추출
    const path = `/meeting/${roomId}/select/${meetingId}`; // 경로 설정
    const isGuest = !user?.isMember; // 게스트 여부 확인

    const fullUrl = `${baseUrl}${path}?isGuest=${isGuest}`; // 전체 URL 조합

    navigator.clipboard
      .writeText(fullUrl)
      .then(() => {
        console.log('URL copied to clipboard:', fullUrl);
      })
      .catch((err) => {
        console.error('Failed to copy URL:', err);
      });
  };

  return (
    <HeaderContainer>
      <LeftArrowIcon className="back-button" />
      <HeadTitle>{title}</HeadTitle>
      {isShare && (
        <>
          <ShareIcon className="share-button" onClick={handleUrlCopy} />
          {isVisible && (
            <ToolTip
              content="팀원에게 공유해서 함께 일정을 조율해보세요!"
              toggle={toggle as () => void}
            />
          )}
        </>
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div<HeaderProps>`
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
  background: ${({ theme }) => theme.color.primary.white};
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.04);
  border-bottom: 1px solid ${({ theme }) => theme.color.primary.white};

  .back-button {
    position: absolute;
    left: 25px;
    top: 17.63px;
    cursor: pointer;
  }
  .share-button {
    position: absolute;
    right: 25px;
    top: 17.63px;
    cursor: pointer;
  }
`;

const HeadTitle = styled.h1`
  ${({ theme }) => theme.typo.body.semi_bold[16]};
`;

export default Header;
