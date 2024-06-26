import React, {
  ForwardRefRenderFunction,
  ReactChild,
  RefCallback,
  SyntheticEvent,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import debounce from 'debounce';
import { isFunction, isNumber, isString, noop } from '../../../../helpers';
import { PopoverTriggerType } from '../../../../enums';
import { TriggerHandlers } from '../../../Popover/hooks/useTriggerHandlers';
import { PopoverTriggerProps } from './types';

const defaultChildrenProps = {
  close: noop,
  open: noop,
  toggle: noop,
  isOpen: false,
};

const LazyPopoverTrigger: ForwardRefRenderFunction<HTMLElement, PopoverTriggerProps> = (
  { triggerContainerTag, children, trigger, triggerContainerDisplay, initialize, mouseEnterDelay },
  ref: React.MutableRefObject<HTMLElement>,
) => {
  const triggerRef: RefCallback<HTMLElement> = useCallback(
    (node) => {
      if (node && node.children.length) {
        const child = node.children[0];
        if (triggerContainerDisplay) {
          node.style.display = triggerContainerDisplay;
        } else {
          const style = window.getComputedStyle(child);
          node.style.display = style.display;
        }
      }

      if (ref) {
        if (isFunction(ref)) {
          ref(node);
        } else {
          ref.current = node;
        }
      }
    },
    [triggerContainerDisplay, ref],
  );

  const TriggerContainer = triggerContainerTag;

  const initializeDebounced = useMemo(() => debounce(initialize, mouseEnterDelay), [initialize, mouseEnterDelay]);

  useEffect(() => {
    return () => {
      initializeDebounced.clear();
    };
  }, [initializeDebounced]);

  const getTriggerProps = () => {
    if (trigger === PopoverTriggerType.hover) {
      return {
        onMouseEnter: initializeDebounced,
        onMouseLeave: initializeDebounced.clear,
      };
    }

    const handler = (e: SyntheticEvent<HTMLElement, MouseEvent | FocusEvent>) => {
      e.preventDefault();
      initialize();
    };

    switch (trigger) {
      case PopoverTriggerType.click: {
        return {
          onMouseDown: handler,
        };
      }
      case PopoverTriggerType.contextMenu: {
        return {
          onContextMenu: handler,
        };
      }
      case PopoverTriggerType.focus: {
        return {
          onFocus: handler,
        };
      }
    }
  };

  const triggerProps: TriggerHandlers = getTriggerProps();

  if (trigger === PopoverTriggerType.focus) {
    let childElement: ReactChild = (isFunction(children) ? children(defaultChildrenProps) : children) as ReactChild;

    if (isString(childElement) || isNumber(childElement)) {
      childElement = <span>{childElement}</span>;
    }

    return React.cloneElement(childElement, {
      ...triggerProps,
      ref: triggerRef,
    });
  }

  return (
    <TriggerContainer {...triggerProps} ref={triggerRef}>
      {children}
    </TriggerContainer>
  );
};

export default React.forwardRef<HTMLElement, PopoverTriggerProps>(LazyPopoverTrigger);
