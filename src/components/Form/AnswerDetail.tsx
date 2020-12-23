import { FormGroup, TextField } from "@material-ui/core";
import React from "react";
import { FunctionComponent } from "react";
import {  useLocation, useRouteMatch } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FixedBottomProminentButton, FixedMiddleBodyWithVerticalScroll } from "../../layout-components";
import { Answer } from "../../reducers/types";

export interface AnswerParams {
  answerKey?: string;
}

export interface AnswerLocationState {
  answerValue?: string
}
export interface AnswerDetailProps{
  isEditMode: boolean;
  title: string;
  onBottomButtonClick: (answer: Answer) => void | Promise<void>;
}

const AnswerDetail: FunctionComponent<AnswerDetailProps> = (props) => {
  const { title, onBottomButtonClick } = props
  const location = useLocation<AnswerLocationState>();
  const match = useRouteMatch<AnswerParams>();

  const formik = useFormik({
    initialValues: {
      key: (match.params && match.params.answerKey) ? match.params.answerKey : "",
      value: (location.state && location.state.answerValue) ? location.state.answerValue : "",
    },
    validationSchema: Yup.object({
      key: Yup.string()
        .max(10, 'Must be 10 characters or less')
        .required('Required'),
      value: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Required'),
    }),
    onSubmit: values => {
      onBottomButtonClick(values)
    },
  });

  return (
    <>
      <FixedMiddleBodyWithVerticalScroll top={140}>
        <form data-testid="answer-form">
          <FormGroup>
            <TextField
              inputProps={{
                "data-testid": "answer-input-key"
              }}
              name="key"
              label="Key"
              required={true}
              disabled={props.isEditMode}
              error={!!formik.errors.value && !!formik.touched.value}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.key}
              helperText={(formik.errors.key && formik.touched.key) && formik.errors.key}
              variant="outlined"
              margin="normal"
            />
            <TextField
              inputProps={{
                "data-testid": "answer-input-value"
              }}
              name="value"
              label="Value"
              required={true}
              error={!!formik.errors.value && !!formik.touched.value}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.value}
              helperText={(formik.errors.value && formik.touched.value) && formik.errors.value}
              variant="outlined"
              margin="normal" 
            />
          </FormGroup>
        </form>
      </FixedMiddleBodyWithVerticalScroll>
      <FixedBottomProminentButton
        title={title}
        onClick={formik.handleSubmit}
      />
    </>
  )
}
export default AnswerDetail