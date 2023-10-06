import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useStore from '@store/store';

import DownChevronArrow from '@icon/DownChevronArrow';
import { ChatInterface, Role, roles } from '@type/chat';

import useHideOnOutsideClick from '@hooks/useHideOnOutsideClick';
const display_isenable = (enable:boolean) => {
  if(enable){
    return "send";
  }else{
    return "no send"
  }
}
const enables:boolean[] = [true,false];
const EnableSelector = React.memo(
  ({
    is_enable,
    messageIndex,
    sticky,
  }: {
    is_enable:boolean;
    messageIndex: number;
    sticky?: boolean;
  }) => {
    const { t } = useTranslation();
    const setEnable=useStore((state)=>state.setEnable);
    const setInputRole = useStore((state) => state.setInputRole);
    const setChats = useStore((state) => state.setChats);
    const currentChatIndex = useStore((state) => state.currentChatIndex);

    const [dropDown, setDropDown, dropDownRef] = useHideOnOutsideClick();

    return (
      <div className='prose dark:prose-invert relative'>
        <button
          className='btn btn-neutral btn-small flex gap-1'
          aria-label={display_isenable(is_enable)}
          type='button'
          onClick={() => setDropDown((prev) => !prev)}
        >
          {display_isenable(is_enable)}
          <DownChevronArrow />
        </button>
        <div
          ref={dropDownRef}
          id='dropdown'
          className={`${
            dropDown ? '' : 'hidden'
          } absolute top-100 bottom-100 z-10 bg-white rounded-lg shadow-xl border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group dark:bg-gray-800 opacity-90`}
        >
          <ul
            className='text-sm text-gray-700 dark:text-gray-200 p-0 m-0'
            aria-labelledby='dropdownDefaultButton'
          >
            {enables.map((r) => (
              <li
                className='px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer'
                onClick={() => {
                  is_enable = r;
                  console.log("CLICKED");
                  console.log(display_isenable(is_enable));
                  if (!sticky) {
                    const updatedChats: ChatInterface[] = JSON.parse(
                      JSON.stringify(useStore.getState().chats)
                    );
                    updatedChats[currentChatIndex].messages[messageIndex].is_enable = r;
                    setChats(updatedChats);
                  } else {
                    setEnable(r);
                  }
                  setDropDown(false);
                }}
                key={display_isenable(r)}
              >
                {display_isenable(r)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
);
export default EnableSelector;
