import { CancelIcon, LeftArrowIcon, ShareIcon } from 'public/assets/icons';
import styled, { useTheme } from 'styled-components';
import useUserStore from '@/store/userStore';
import { useParams } from 'react-router-dom';
import useCopyUrl from '@/hooks/useCopyUrl';
import ToolTip from '../meeting/select/HeaderToolTip';

interface Props {
  title: string;
  isShare?: boolean;
  isClose?: boolean;
  onIconClick?: () => void;
  isVisible?: boolean;
  toggle?: () => void;
  onLeftArrowIconClick: () => void;
}

function Header({
  title,
  isShare = false,
  isClose,
  onIconClick,
  isVisible,
  toggle,
  onLeftArrowIconClick,
}: Props) {
  const theme = useTheme();
  const { user } = useUserStore();
  const { roomId, meetingId } = useParams();
  const handleUrlCopy = useCopyUrl(roomId, meetingId, user?.isMember);

  return (
    <HeaderContainer>
      <LeftArrowIcon className="back-button" onClick={onLeftArrowIconClick} />
      <HeadTitle>{title}</HeadTitle>
      {isShare && (
        <>
          <ShareIcon className="icon-button" onClick={handleUrlCopy} />
          {isVisible && (
            <ToolTip
              content="팀원에게 공유해서 함께 일정을 조율해보세요!"
              toggle={toggle as () => void}
            />
          )}
        </>
      )}
      {isClose && (
        <CancelIcon
          className="icon-button"
          fill={theme.color.secondary.solid.bk[700]}
          onClick={onIconClick}
        />
      )}
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  height: 52px;
  position: relative;
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
  .icon-button {
    position: absolute;
    right: 25px;
    top: 17.63px;
    cursor: pointer;
  }
`;

const HeadTitle = styled.h1`
  ${({ theme }) => theme.typo.body.semi_bold[16]};
  margin: 0 auto;
  text-align: center;
`;

export default Header;
