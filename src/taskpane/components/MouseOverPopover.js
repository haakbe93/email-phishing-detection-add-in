import * as React from 'react';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import { isConstructorDeclaration } from 'typescript';

//CSS
const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: 'none',
    zIndex: -1,
  },
  paper: {
    padding: theme.spacing(1),
    zIndex: -1,
    maxWidth: '18em',
  },
}));

//Checks if mouse is hovering information bubble -> if so display textfield
export default function MouseOverPopover(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
        <HelpOutlineOutlinedIcon aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        color="primary"
        />
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
      <Typography>{props.tekst}</Typography>
      </Popover>
    </div>
  );
}