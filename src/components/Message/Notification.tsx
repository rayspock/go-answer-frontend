import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { HIDE_LOG } from "../../constants/action-types";
import { LogLevel } from "../../constants/enum";
import { AppState } from "../../reducers";

const Notification: React.FunctionComponent = () => {
  const isOpen = useSelector((state: AppState) => state.log.isOpen);
  const text = useSelector((state: AppState) => state.log.text);
  const level = useSelector((state: AppState) => state.log.level);

  const dispatch = useDispatch();

  function handleClose() {
    dispatch({ type: HIDE_LOG });
  }
  return (
    <>
      {isOpen && text && (
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          open={true}
          autoHideDuration={6000}
          onClose={handleClose}>
          <Alert severity={level || LogLevel.Default} onClose={handleClose}>{text}</Alert>
        </Snackbar>
      )}
    </>
  )
}

export default Notification;