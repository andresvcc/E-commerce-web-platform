import React, { useRef } from 'react';
import styled from 'styled-components';
import SVG from 'react-inlinesvg';
import { IconProps, SVGProps, SVGThemeProps } from './icons.types';

import { logoThymioByMobsya } from './assets/logoThymioByMobsya.icon';
import { thymio } from './assets/thymio.icon';
import { help } from './assets/help.icon';
import { alert } from './assets/alert.icon';
import { colors } from '../../Themes/MainTheme/theme.colors';
import { info } from './assets/info.icon';
import { close } from './assets/close.icon';
import { simulator } from './assets/simulator.icon';
import { wifi } from './assets/wifi.icon';
import { bluetooth } from './assets/bluetooth.icon';
import { usb } from './assets/usb.icon';
import { dongle } from './assets/dongle.icon';
import { search } from './assets/search.icon';
import { filter } from './assets/filter.icon';
import { play } from './assets/play.icon';
import { stop } from './assets/stop.icon';
import { add } from './assets/add.icon';
import { bell } from './assets/bell.icon';
import { arrow } from './assets/arrow.icon';
import { arrow2 } from './assets/arrow2.icon';
import { bug } from './assets/bug.icon';
import { cloud } from './assets/cloud.icon';
import { copy } from './assets/copy.icon';
import { cut } from './assets/cut.icon';
import { dashboard } from './assets/dashboard.icon';
import { menu } from './assets/menu.icon';
import { paste } from './assets/paste.icon';
import { save } from './assets/save.icon';
import { vpl } from './assets/vpl.icon';
import { python } from './assets/python.icon';
import { scratch } from './assets/scratch.icon';
import { advanced } from './assets/advanced.icon';
import { all } from './assets/all.icon';
import { undo } from './assets/undo.icon';
import { rendo } from './assets/rendo.icon';
import { print } from './assets/print.icon';
import { share } from './assets/share.icon';
import { favorite } from './assets/favorite.icon';
import { trash } from './assets/trash.icon';
import { mango } from './assets/mango.icon';
import { thymioLeftSide } from './assets/thymioLeftSide.icon';
import { showPassword } from './assets/showPassword.icon';
import { broadcast } from './assets/broadcast.icon';
import { wireless } from './assets/wireless.icon';
import { router } from './assets/router.icon';
import { internet } from './assets/internet.icon';
import { devices } from './assets/devices.icon';
import { thymioSide } from './assets/thymioSide.icon';

const IconSVG = styled(SVG)<SVGProps>`
  width: ${(props) => (typeof props.theme.sizeW === 'number' ? `${props.theme.sizeW}px` : props.theme.sizeW)};
  height: ${(props) => (typeof props.theme.sizeH === 'number' ? `${props.theme.sizeH}px` : props.theme.sizeH)};

  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* estándar */

  ${(props) =>
    props.theme?.palleteFill?.map(
      (fill: string, index: number) => `
        .st${index} { fill: ${fill}; }
        .str${index} { stroke: ${fill}; }
    `,
    )}

  :hover {
    ${(props) =>
      props.theme?.palleteFillHover?.map(
        (fill: string, index: number) => `
        .st${index} { fill: ${fill}; }
        .str${index} { stroke: ${fill}; }
        `,
      )}
  }
`;

IconSVG.defaultProps = {
  theme: {
    name: 'thymio',
    bgcolor: 'blue',
    palleteFill: [],
    sizeW: 100,
    sizeH: 100,
  },
};

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* estándar */
`;

IconContainer.defaultProps = {
  theme: {
    bgcolor: colors.default.light.main,
    sizeW: 100,
    sizeH: 100,
  },
};

const IconBox = styled.div`
  width: ${(props) => props.theme.sizeW * 1.2}px;
  height: ${(props) => props.theme.sizeH * 1.2}px;
  background: ${({ theme }) => theme.bgcolor};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  transform: rotate(${(props) => props.theme.rotate}deg);
`;

IconBox.defaultProps = {
  theme: {
    bgcolor: colors.primary.base.main,
    sizeW: 100,
    sizeH: 100,
  },
};

const IconBackground = styled.div`
  width: ${(props) => props.theme.sizeW * 1.2}px;
  height: ${(props) => props.theme.sizeH * 1.2}px;
  background: ${({ theme }) => theme.bgcolor};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => (props.theme.bgRound ? '100%' : '0')};
  transform: rotate(${(props) => props.theme.rotate}deg);

  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* IE 10+ */
  user-select: none; /* estándar */
`;

IconBackground.defaultProps = {
  theme: {
    bgcolor: colors.primary.base.main,
    sizeW: 100,
    sizeH: 100,
    bgRound: false,
  },
};

const icons: { [key: string]: (props: SVGThemeProps) => string } = {
  logoThymioByMobsya,
  thymio,
  help,
  all,
  alert,
  info,
  close,
  simulator,
  wifi,
  bluetooth,
  usb,
  dongle,
  search,
  filter,
  play,
  advanced,
  stop,
  add,
  bell,
  arrow,
  arrow2,
  bug,
  cloud,
  copy,
  cut,
  undo,
  rendo,
  dashboard,
  menu,
  paste,
  save,
  favorite,
  print,
  share,
  vpl,
  python,
  scratch,
  trash,
  mango,
  thymioLeftSide,
  showPassword,
  broadcast,
  wireless,
  router,
  internet,
  devices,
  thymioSide,
};

export const iconsList = Object.keys(icons);

export function Icon({
  ref,
  onClick,
  bgcolor,
  palleteFill,
  palleteFillHover,
  name,
  sizeW = 80,
  sizeH = 80,
  rotate = 0,
  bgRound = false,
  style,
  onMouseEnter,
  onMouseLeave,
}: IconProps) {
  if (!icons[name]) {
    return <div />;
  }

  const srcIcon = icons[name]({ theme: { palleteFill, palleteFillHover } });

  return (
    <IconContainer onClick={onClick} style={style} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <IconBackground theme={{ bgcolor, sizeW, sizeH, rotate, bgRound }}>
        <IconSVG ref={ref} theme={{ palleteFill, palleteFillHover, bgcolor, sizeW, sizeH }} src={srcIcon} />
      </IconBackground>
    </IconContainer>
  );
}
