import React, { Component } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Grid, Typography } from "@material-ui/core";
import AppIcon from "../images/logo.png";
import axios from "axios";
import { Link } from "react-router-dom";

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import CircularProgress from "@material-ui/core/CircularProgress"

const styles = (theme) => ({
    ...theme.toSpread
})

class signup extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            handle: "",
            loading: false,
            errors: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
            loading: true
        });
        
        const newUserCredentials = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }

        axios.post("/signup", newUserCredentials)
        .then((res) => {
            console.log(res.data);
            localStorage.setItem("FBIdToken", `Bearer ${res.data.token}`);
            this.setState({
                loading: false
            });
            this.props.history.push("/");
        })
        .catch((err) => {
            this.setState({
                errors: err.response.data,
                loading: false
            });
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        console.log(errors)
        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img src={AppIcon} alt="logo" className={classes.image} />
                    <Typography variant="h2" className={classes.pageTitle}>Sign up</Typography>
                    <form noValidate onSubmit={this.handleSubmit}>
                        <div>
                            <TextField id="email" name="email" type="email" label="Email" className={classes.textField} 
                                value={this.state.email} onChange={this.handleChange} helperText={errors.email} 
                                error = {errors.email ? true : false} fullwidth="true"/>
                        </div>
                        <div>
                            <TextField id="password" name="password" type="password" label="Password" 
                                className={classes.textField} value={this.state.password} onChange={this.handleChange} 
                                helperText={errors.password} error = {errors.password ? true : false} fullwidth="true" />
                        </div>
                        <div>
                            <TextField id="confirmPassword" name="confirmPassword" type="password" label="Confirm Password" 
                                className={classes.textField} value={this.state.confirmPassword} onChange={this.handleChange} 
                                helperText={errors.confirmPassword} error = {errors.confirmPassword ? true : false} 
                                fullwidth="true" />
                        </div>
                        <div>
                            <TextField id="handle" name="handle" type="text" label="Handle" 
                                className={classes.textField} value={this.state.handle} onChange={this.handleChange} 
                                helperText={errors.handle} error = {errors.handle ? true : false} fullwidth="true" />
                        </div>
                        {errors.error && (
                            <Typography variant="body2" className={classes.customError}>
                                {errors.error}
                            </Typography>
                        )}
                        <Button type="submit" variant="contained" color="primary" disabled={loading} className={classes.button}>
                            Signup
                            {loading && (
                                <CircularProgress size={30} className={classes.progress}/>
                            )}
                        </Button>
                        <div>
                            <small>Already have an account?<Link to="/login">Login here.</Link></small>
                        </div>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        )
    }
}

signup.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(signup);