import { 
    SET_SCREAMS, 
    LOADING_DATA, 
    LIKE_SCREAM, 
    UNLIKE_SCREAM, 
    DELETE_SCREAM, 
    POST_SCREAM, 
    LOADING_UI, 
    SET_ERRORS, 
    CLEAR_ERRORS, 
    STOP_LOADING_UI, 
    SET_SCREAM,
    SUBMIT_COMMENT
} from "../types";

import axios from "axios";

// Get all screams
export const getScreams = () => (dispatch) => {
    dispatch({type: LOADING_DATA});
    axios.get("/screams")
    .then((res) => {
        dispatch({
            type: SET_SCREAMS,
            payload: res.data
        });
    })
    .catch((err) => {
        console.log("ERROR", err);
        dispatch({
            type: SET_SCREAMS,
            payload: []
        });
    });
}

// Get one scream
export const getScream = (screamId) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.get(`/scream/${screamId}`)
    .then((res) => {
        dispatch({
            type: SET_SCREAM,
            payload: res.data
        });
        dispatch({type: STOP_LOADING_UI});
    })
    .catch((err) => {
        console.log(err);
    });
}

// Post a scream
export const postScream = (newScream) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post("/createScream", newScream)
    .then((res) => {
        dispatch({
            type: POST_SCREAM,
            payload: res.data
        });
        dispatch(clearErrors());
    })
    .catch((err) => {
        console.log("ERROR", err.response);
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    });
}

// like a scream
export const likeScream = (screamId) => (dispatch) => {
    axios.get(`/scream/${screamId}/like`)
    .then((res) => {
        dispatch({
            type: LIKE_SCREAM,
            payload: res.data
        });
    })
    .catch((err) => {
        console.log("ERROR", err);
    });
}

// Unlike a scream
export const unlikeScream = (screamId) => (dispatch) => {
    axios.get(`/scream/${screamId}/unlike`)
    .then((res) => {
        dispatch({
            type: UNLIKE_SCREAM,
            payload: res.data
        });
    })
    .catch((err) => {
        console.log("ERROR", err);
    });
}

// Submit a comment
export const postComment = (screamId, comment) => (dispatch) => {
    axios.post(`/scream/${screamId}/comment`, comment)
    .then((res) => {
        dispatch({
            type: SUBMIT_COMMENT,
            payload: res.data
        })
        dispatch(clearErrors());
    })
    .catch((err) => {
        console.log("ERROR", err.response.data);
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    })
}

export const deleteScream = (screamId) => (dispatch) => {
    axios.delete(`/scream/${screamId}`)
    .then(() => {
        dispatch({
            type: DELETE_SCREAM,
            payload: screamId
        })
    })
    .catch((err) => {
        console.log("ERROR", err);
    });
}

export const getUserData = (userHandle) => (dispatch) => {
    dispatch({type: LOADING_DATA});
    axios.get(`/user/${userHandle}`)
    .then((res) => {
        dispatch({
            type: SET_SCREAMS,
            payload: res.data.screams
        });
    })
    .catch((err) => {
        console.log("ERROR", err.response.data);
        dispatch({
            type: SET_SCREAMS,
            payload: null
        });
    });
}

export const clearErrors = () => (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
}