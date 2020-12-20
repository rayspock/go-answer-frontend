import { Box, Typography } from "@material-ui/core";
import React from "react";
import EditMenu, { EditMenuProps } from "./EditMenu";

interface CardProps {
  id: string;
  title: string;
  name?: string;
  detail?: string;
  menuButton?: EditMenuProps;
}

const Card: React.FunctionComponent<CardProps> = (props) => {
  const { menuButton, title, name, detail } = props;
  return (
    <Box display="flex" flexDirection="column" bgcolor="secondary.main" color="primary.contrastText" p={2}>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Box flexGrow={1}>
          <Typography
            variant="h6"
            noWrap={true}
            component="p"
            color="textPrimary"
            gutterBottom
          >{title}</Typography>
        </Box>
        {menuButton ? (
          <Box>
            <EditMenu {...menuButton} />
          </Box>
        ) : undefined}
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography noWrap={true} color="textSecondary">
          {name}
        </Typography>
      </Box>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Typography component="p" color="textSecondary">{detail}</Typography>
      </Box>
    </Box>
  );
}

export default Card