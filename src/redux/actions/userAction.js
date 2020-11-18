import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED, LOADING_USER } from "../types";
import axios from "axios";

export const loginUser = (userCredentials, history) => (dispatch) => {
    dispatch({type:LOADING_UI});
    axios.post("/login", userCredentials)
    .then((res) => {
        setAuthorizationToken(res.data.token);
        dispatch(getUserData());
        dispatch({type: CLEAR_ERRORS})
        history.push("/");
    })
    .catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    });
}

export const signupUser = (newUserCredentials, history) => (dispatch) => {
    dispatch({type: LOADING_UI});
    axios.post("/signup", newUserCredentials)
    .then((res) => {
        setAuthorizationToken(res.data.token);
        dispatch(getUserData());
        dispatch({type: CLEAR_ERRORS});
        history.push("/");
    })
    .catch((err) => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        });
    });
}

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("FBIdToken");
    delete axios.defaults.headers.common["Authorization"];
    dispatch({type: SET_UNAUTHENTICATED})
}

export const uploadImage = (formData) => (dispatch) => {
    dispatch({type:LOADING_USER})
    axios.post("/user/image", formData)
    .then(() => {
        dispatch(getUserData());
    })
    .catch(err => console.log(err));
}

export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({type: LOADING_USER});
    axios.post("/user", userDetails)
    .then(() => {
        dispatch(getUserData());
    })
    .catch((err) => {
        console.log(err);
    })
}

export const getUserData = () => (dispatch) => {
    dispatch({type:LOADING_USER})
    axios.get("/user")
    .then((res) => {
        dispatch({
            type: SET_USER,
            payload: res.data
        })
    })
    .catch((err) => console.log(err));
}

const setAuthorizationToken = (token) => {
    const FBIdToken = `Bearer ${token}`;

    localStorage.setItem("FBIdToken", FBIdToken);
    axios.defaults.headers.common["Authorization"] = FBIdToken;
}