import {
  AppBar,
  Box,
  IconButton,
  makeStyles,
  SvgIcon,
  Toolbar,
  Typography,
} from "@material-ui/core";
import ArrowBack from "@material-ui/icons/ArrowBack";
import React from "react";
import { useHistory } from "react-router-dom";

export interface TopBarBackButton {
  type: "back";
  onClick?: () => void | Promise<void>;
}

interface TopBarProps {
  leftButton?: TopBarBackButton;
  appBar?: boolean;
  title: string;
}

interface FixedSectionProps {
  top?: number
}

export const FixedTopBar: React.FunctionComponent<TopBarProps> = (props) => {
  let history = useHistory();
  if (props.leftButton && !props.leftButton.onClick) {
    // Set the default behaviour when leftButton is clicked
    props.leftButton.onClick = () => {
      history.goBack();
    }
  }
  return (
    <Box
      style={{
        top: 0,
        right: 0,
        bottom: "auto",
        left: 0,
        position: "fixed",
        height: 60
      }}
    >
      {props.appBar ? (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center">
          <ButtonAppBar />
        </Box>
      ) : undefined}
      <Box
        style={{
          paddingLeft: 15,
          paddingRight: 15,
          top: 0,
          right: 0,
          bottom: "auto",
          left: 0,
          height: 60
        }}
        pt={1}
        display="flex"
        flexDirection="row"
        alignItems="center">
        {props.leftButton ? (
          <IconButton
            edge="start"
            color="secondary"
            aria-label="menu"
            onClick={props.leftButton.onClick}
          >
            <ArrowBack />
          </IconButton>
        ) : undefined}

        <Typography variant="h2">{props.title}</Typography>
      </Box>
    </Box>
  );
};

export const FixedMiddleBodyWithVerticalScroll: React.FunctionComponent<FixedSectionProps> = (
  props
) => {
  return (
    <Box
      style={{
        paddingLeft: 15,
        paddingRight: 15,
        top: (props.top) ? props.top : 70,
        right: 0,
        bottom: 65,
        left: 0,
        position: "fixed",
        overflowY: "scroll"
      }}
      display="flex"
      flexDirection="column"
    >
      {props.children}
    </Box>
  );
};

export const FixedActionBody: React.FunctionComponent<FixedSectionProps> = (
  props
) => {
  return (
    <Box
      style={{
        paddingLeft: 15,
        paddingRight: 15,
        top: (props.top) ? props.top : 70,
        right: 0,
        bottom: 65,
        left: 0,
        position: "fixed",
        height: 60,
      }}
    >
      {props.children}
    </Box>
  );
}

export const PageContainer: React.FunctionComponent<{}> = (props) => {
  return (
    <Box display="flex" flexDirection="column">
      {props.children}
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  "& > svg": {
    margin: theme.spacing(2)
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  button: {
    margin: theme.spacing(1)
  }
}));

const HomeIcon: React.FunctionComponent<{}> = (props) => {
  return (
    <SvgIcon {...props}>
      <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </SvgIcon>
  );
}

export const ButtonAppBar: React.FunctionComponent<{}> = () => {
  const classes = useStyles();

  let history = useHistory();

  function handleClick() {
    history.push("/");
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="home"
            onClick={handleClick}
          >
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}></Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}