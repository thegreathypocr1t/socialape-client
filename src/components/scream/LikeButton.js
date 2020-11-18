import React, { Component } from 'react'
import MyButton from "../../util/MyButton";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";

//Redux
import { connect } from "react-redux";
import { likeScream, unlikeScream } from "../../redux/actions/dataActions";

class LikeButton extends Component {
    isScreamLiked = () => {
        if(this.props.user.likes && this.props.user.likes.find(like => like.screamId === this.props.screamId))
            return true;
        else
            return false;
    };

    likeScream = () => {
        this.props.likeScream(this.props.screamId);  
    }

    unlikeScream = () => {
        this.props.unlikeScream(this.props.screamId);  
    }

    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated ? (
            <Link to="/login">
                <MyButton tip="like">
                    <FavoriteBorderIcon color="primary" />
                </MyButton>
            </Link>
        ) : (this.isScreamLiked() ? (
                <MyButton tip="Unlike" onClick={this.unlikeScream}>
                    <FavoriteIcon color="primary"/>
                </MyButton>
            ) : (
                <MyButton tip="Like" onClick={this.likeScream}>
                    <FavoriteBorderIcon color="primary"/>
                </MyButton>
        ));

        return likeButton
    }
}

LikeButton.propTypes = {
    likeScream: PropTypes.func.isRequired,
    unlikeScream: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    screamId: PropTypes.string.isRequired
}

const mapStateToProps = (state) => ({
    user: state.user
})

const mapActionsToProps = {
    likeScream,
    unlikeScream
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);
