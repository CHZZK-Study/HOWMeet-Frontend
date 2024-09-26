import { useCallback, useState } from 'react';

const useToolTip = () => {
  const [isToolTipOpen, setIsToolTipOpen] = useState(true);

  const openToolTip = useCallback(() => {
    setIsToolTipOpen(true);
  }, []);

  const closeToolTip = useCallback(() => {
    setIsToolTipOpen(false);
    console.log('closeToolTip');
  }, []);

  return {
    isToolTipOpen,
    openToolTip,
    closeToolTip,
  };
};

export default useToolTip;
