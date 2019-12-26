import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';

function ButtonMenu(props) {
  const {onChange} = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = useCallback(event => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(
    e => {
      setAnchorEl(null);
      onChange(e.target.id);
    },
    [onChange]
  );

  return (
    <Box component={props.component}>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {props.label}
      </Button>
      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {props.items.map(i => (
          <MenuItem
            id={i.value}
            key={i.value}
            selected={i.value === props.selected}
            onClick={handleClose}
          >
            {i.display}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

ButtonMenu.propTypes = {
  onChange: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      display: PropTypes.string
    })
  ),
  selected: PropTypes.string,
  label: PropTypes.string,
  component: PropTypes.string
};

export default ButtonMenu;
