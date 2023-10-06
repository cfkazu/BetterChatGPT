import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useStore from '@store/store';

import { ChatInterface } from '@type/chat';

import TickIcon from '@icon/TickIcon';

const AllEnable = React.memo(() => {
  const { t } = useTranslation();

  const setChats = useStore((state) => state.setChats);
  const setCurrentChatIndex = useStore((state) => state.setCurrentChatIndex);
  const currentChatIndex = useStore((state) => state.currentChatIndex);
  const [cloned, setCloned] = useState<boolean>(false);
  const enable_chat = () => {
    const updatedChats: ChatInterface[] = JSON.parse(
      JSON.stringify(useStore.getState().chats)
    );
    for(let i = 0;i<updatedChats[currentChatIndex].messages.length;i++){
      updatedChats[currentChatIndex].messages[i].is_enable = true;
    }
    setChats(updatedChats);
  }


  return (
    <button
      className='btn btn-neutral flex gap-1'
      aria-label={"ALL ENABLE"}
      onClick={enable_chat}
    >
      {cloned ? (
        <>
          <TickIcon /> {"ALL ENABLE"}
        </>
      ) : (
        <>{"ALL ENABLE"}</>
      )}
    </button>
  );
});

export default AllEnable;
