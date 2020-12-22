import React from 'react';
import { Menu, MenuItem, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export interface EditMenuProps {
  id: string;
  onEditClick?: () => void | Promise<void>;
  onRemoveClick?: (key:string) => void | Promise<void>;
}

const EditMenu: React.FunctionComponent<EditMenuProps> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleEditClick = () => {
    if (props.onEditClick) {
      props.onEditClick();
    }
    setAnchorEl(null);
  }

  const handleRemoveClick = () => {
    if (props.onRemoveClick) {
      props.onRemoveClick(props.id);
    }
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <div>
      <IconButton
        aria-controls="simple-menu" aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEditClick}>Edit</MenuItem>
        <MenuItem onClick={handleRemoveClick}>Remove</MenuItem>
      </Menu>
    </div>
  );
}

export default EditMenu