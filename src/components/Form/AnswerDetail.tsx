import { FormControl, FormGroup, InputLabel, OutlinedInput } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import { FunctionComponent } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { FixedBottomProminentButton, FixedMiddleBodyWithVerticalScroll } from "../../layout-components";
import { Answer } from "../../reducers/types";


interface AnswerDetailProps extends RouteComponentProps<{}> {
  title: string;
  onBottomButtonClick: (answer: Answer) => void | Promise<void>;
}

const AnswerDetail: FunctionComponent<AnswerDetailProps> = (props) => {
  const { title, onBottomButtonClick } = props

  const [state, setState] = useState({
    key: "",
    value: "",
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleBottomButtonClick = () => {
    onBottomButtonClick(state)
  }

  return (
    <>
      <FixedMiddleBodyWithVerticalScroll top={140}>
        <FormGroup>
          <FormControl variant="outlined" margin="normal">
            <InputLabel htmlFor="key">Key</InputLabel>
            <OutlinedInput id="key" name="key" onChange={handleInputChange} label="Key" />
          </FormControl>
          <FormControl variant="outlined" margin="normal">
            <InputLabel htmlFor="value">Name</InputLabel>
            <OutlinedInput id="value" name="value" onChange={handleInputChange} label="Name" />
          </FormControl>
        </FormGroup>
      </FixedMiddleBodyWithVerticalScroll>
      <FixedBottomProminentButton
        title={title}
        onClick={handleBottomButtonClick}
      />
    </>
  )
}
export default withRouter(AnswerDetail)