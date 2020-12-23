import { FormGroup, TextField } from "@material-ui/core";
import React from "react";
import { FunctionComponent } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FixedBottomProminentButton, FixedMiddleBodyWithVerticalScroll } from "../../layout-components";
import { Answer } from "../../reducers/types";


interface AnswerDetailProps extends RouteComponentProps<{ answerKey?: string }, any, { answerValue?: string }> {
  isEditMode: boolean;
  title: string;
  onBottomButtonClick: (answer: Answer) => void | Promise<void>;
}

const AnswerDetail: FunctionComponent<AnswerDetailProps> = (props) => {
  const { title, onBottomButtonClick, location, match } = props

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
        <form>
          <FormGroup>
            <TextField
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
export default withRouter(AnswerDetail)