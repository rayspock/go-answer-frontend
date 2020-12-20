import { Box, Button } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import {
    PageContainer,
    FixedTopBar,
    FixedMiddleBodyWithVerticalScroll,
} from "../layout-components";

const buttonSpace = {
    height: 50, width: "100%", marginBottom: 10
}

const Home = () => {
    let history = useHistory();

    function handleAnswerClick() {
        history.push("/answer");
    }

    function handleHistoryClick() {
        history.push("/history");
    }
    return (
        <PageContainer>
            <FixedTopBar title="What would you like you do today?" />
            <FixedMiddleBodyWithVerticalScroll>
                <Box
                    style={{
                        marginBottom: 100
                    }}
                >
                    Welcome to Bequest. Let's start with the task you want to accomplish today.</Box>
                <Button
                    style={buttonSpace}
                    variant="outlined"
                    color="primary"
                    onClick={handleAnswerClick}
                >
                    Answer
                </Button>
                <Button
                    style={buttonSpace}
                    variant="outlined"
                    color="primary"
                    onClick={handleHistoryClick}
                >
                    Lookup history
                </Button>
            </FixedMiddleBodyWithVerticalScroll>
        </PageContainer>
    )
}

export default Home;