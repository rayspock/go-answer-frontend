import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { TextField, Box, IconButton, InputAdornment, Grid, FormControl } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import {
  PageContainer,
  FixedTopBar,
  FixedMiddleBodyWithVerticalScroll,
  FixedActionBody,
  TopBarBackButton
} from "../layout-components";
import { Answer } from "../reducers/types";
import { AppState } from "../reducers";
import { getAnswers } from "../actions";
import Card from "./List/Card";
import EmptyState from "./List/EmptyState";
import { EditMenuProps } from "./List/EditMenu";

interface ConnectedAnswerState {
  title: string;
  search: string;
}

interface ConnectedAnswerProps extends RouteComponentProps<{}> {
  getAnswers: (key: string) => void | Promise<void>,
  answers: Array<Answer>
}

const mapStateToProps = (state: AppState) => {
  const { answer } = state;
  return {
    ...answer
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getAnswers: (key?: string) => { dispatch(getAnswers(key)) },
  }
}

class ConnectedAnswer extends Component<ConnectedAnswerProps, ConnectedAnswerState> {

  constructor(props: ConnectedAnswerProps) {
    super(props);
    this.state = {
      title: "Answer",
      search: ""
    };
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  componentDidMount() {
    this.props.getAnswers(this.state.search)
  }

  handleSearchTextChange(event: any) {
    const { value } = event.target;
    this.setState({
      search: value
    });
  }

  handleSearchClick() {
    const { search } = this.state;
    this.props.getAnswers(search)
  }

  render() {
    const { title } = this.state
    const { answers } = this.props
    let answerList;

    if (answers.length > 0) {
      answerList = <Grid container spacing={1}>
        {answers.map((item, i) => {
          const { key, value } = item
          const title = `Key: ${key}`
          const detail = `Value: ${value}`
          const menuButton: EditMenuProps = {
            id: key,
          }
          return (
            <Grid key={i} item xs={12} sm={6} lg={4}>
              <Card
                key={i}
                id={key}
                title={title}
                detail={detail}
                menuButton={menuButton}
              />
            </Grid>
          )
        }
        )}
      </Grid>;
    } else {
      answerList = <EmptyState title="answer" />
    }

    const topBarLeftButton: TopBarBackButton = {
      type: "back"
    };

    return (
      <PageContainer>
        <FixedTopBar
          appBar={true}
          title={title}
          leftButton={topBarLeftButton}
        />
        <FixedActionBody top={140}>
          <Box style={{ height: '100%' }} display="flex" alignItems="center" flexDirection="row">
            <Box flexGrow={1}>
              <FormControl fullWidth>
                <TextField
                  id="outlined-search"
                  label="Answer key"
                  type="search"
                  variant="outlined"
                  onChange={this.handleSearchTextChange}
                  InputProps={{
                    endAdornment: <InputAdornment position="end">
                      <IconButton onClick={this.handleSearchClick}><SearchIcon /></IconButton>
                    </InputAdornment>,
                  }}
                />
              </FormControl>
            </Box>
          </Box>
        </FixedActionBody>
        <FixedMiddleBodyWithVerticalScroll top={210}>
          {answerList}
        </FixedMiddleBodyWithVerticalScroll>
      </PageContainer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedAnswer);