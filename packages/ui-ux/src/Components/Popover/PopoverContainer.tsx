import React, { useCallback, useState } from 'react';
import { PopoverProps } from './types';
import Popover from './components/Popover';
import LazyPopover from './components/LazyPopover';
import { defaultProps } from './defaultProps';
import { noop, isUndefined } from './helpers';

function PopoverContainer(
  { initialIsOpen = false, isOpen: providedIsOpen, onChangeOpen = noop, lazy = true, ...props }: PopoverProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const [isOpen, setOpen] = useState(initialIsOpen);

  const isOpenControlled = !isUndefined(providedIsOpen);

  const handleChangeOpen = useCallback(
    (value: boolean) => {
      onChangeOpen(value);
      if (!isOpenControlled) {
        setOpen(value);
      }
    },
    [isOpenControlled, onChangeOpen],
  );

  const commonProps = {
    isOpen: isOpenControlled ? providedIsOpen : isOpen,
    onChangeOpen: handleChangeOpen,
  };

  if (lazy) {
    return <LazyPopover ref={ref} {...commonProps} {...props} />;
  }

  return <Popover ref={ref} {...commonProps} {...props} />;
}

const PopoverContainerWithRef = React.forwardRef(PopoverContainer);

PopoverContainerWithRef.defaultProps = defaultProps;

export default PopoverContainerWithRef;
