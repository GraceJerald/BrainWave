const generateSensorStyles = () => {
  let styles = {};
  for (let index = 1; index <= 21; index++) {
    if (index <= 2) {
      styles[`&:nth-of-type(${index})`] = {
        left: `calc(100% * (${index} - 1) - 24px)`,
      };
      continue;
    }
    if (index <= 12) {
      const rad = (360 / 10 * (index - 3)) * (Math.PI / 180);
      const cos = -1 * Math.cos(rad);
      const sin = Math.sin(rad);
      styles[`&:nth-of-type(${index})`] = {
        left: `calc(50% + 40% * ${cos} - 24px)`,
        top: `calc(50% + 40% * ${sin} - 24px)`,
      };
      continue;
    }
    if (index <= 16) {
      const rad = (360 / 4 * (index - 12) + 45) * (Math.PI / 180);
      const cos = -1 * Math.cos(rad);
      const sin = Math.sin(rad);
      styles[`&:nth-of-type(${index})`] = {
        left: `calc(50% + 25% * ${cos} - 24px)`,
        top: `calc(50% + 25% * ${sin} - 24px)`,
      };
      continue;
    }
    if (index <= 20) {
      const rad = (360 / 4 * (index - 16)) * (Math.PI / 180);
      const cos = -1 * Math.cos(rad);
      const sin = Math.sin(rad);
      styles[`&:nth-of-type(${index})`] = {
        left: `calc(50% + 20% * ${cos} - 24px)`,
        top: `calc(50% + 20% * ${sin} - 24px)`,
      };
      continue;
    }
  }

  return styles;
};

const styles = theme => ({
  root: {
    height: 300,
    width: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    '&:before': {
      content: '""',
      width: '100%',
      height: '100%',
      position: 'absolute',
      display: 'block',
      border: `1px ${theme.palette.secondary.light} solid`,
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: -1,
    },
    '&:after': {
      content: '""',
      width: '80%',
      height: '80%',
      position: 'absolute',
      display: 'block',
      border: `1px ${theme.palette.secondary.light} dashed`,
      borderRadius: '50%',
      pointerEvents: 'none',
      zIndex: -1,
    },
  },
  sensor : {
    position: 'absolute',
    ...generateSensorStyles(),
  },
  cross: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    '&:before': {
      borderLeft: `1px ${theme.palette.secondary.light} dashed`,
      content: '""',
      height: '100%',
      width: 1,
      left: '50%',
      position: 'absolute',
    },
    '&:after': {
      borderTop: `1px ${theme.palette.secondary.light} dashed`,
      content: '""',
      height: 1,
      left: 0,
      position: 'absolute',
      top: '50%',
      width: '100%',
    },
  },
});

export default styles;
