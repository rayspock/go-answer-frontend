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
import { History } from "../reducers/types";
import { AppState } from "../reducers";
import { getHistories } from "../actions";
import Card from "./List/Card";
import EmptyState from "./List/EmptyState";

interface ConnectedHistoryState {
  title: string;
  search: string;
}

interface ConnectedHistoryProps extends RouteComponentProps<{}> {
  getHistories: (key: string) => void | Promise<void>,
  histories: Array<History>
}

const mapStateToProps = (state: AppState) => {
  const { history } = state;
  return {
    ...history
  };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getHistories: (key: string) => { dispatch(getHistories(key)) },
  }
}

class ConnectedHistory extends Component<ConnectedHistoryProps, ConnectedHistoryState> {

  constructor(props: ConnectedHistoryProps) {
    super(props);
    this.state = {
      title: "History of changes",
      search: ""
    };
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  handleSearchTextChange(event: any) {
    const { value } = event.target;
    this.setState({
      search: value
    });
  }

  handleSearchClick() {
    const { search } = this.state;
    this.props.getHistories(search)
  }

  render() {
    const { title } = this.state
    const { histories } = this.props
    let historyList;

    if (histories.length > 0) {
      historyList = <Grid container spacing={1}>
        {histories.map((item, i) => {
          const { event, data } = item
          const name = `Key: ${data.key}`
          const detail = `Value: ${data.value}`
          return (
            <Grid key={i} item xs={12} sm={6} lg={4}>
              <Card
                key={i}
                id={data.key + i}
                title={event}
                name={name}
                detail={detail}
              />
            </Grid>
          )
        }
        )}
      </Grid>;
    } else {
      historyList = <EmptyState title="history" />
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
          {historyList}
        </FixedMiddleBodyWithVerticalScroll>
      </PageContainer>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ConnectedHistory);