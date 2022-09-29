import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useParams } from "react-router-dom";
import { FaCompass, FaBriefcase, FaUsers, FaUserFriends, FaCode, FaUser } from "react-icons/fa";
import queryString from 'query-string';
import { battle } from "../utils/api";
import Card from "./Card";
import Loading from "./Loading";
import Tooltip from "./Tooltip";

function ProfileList({ profile }) {
    return (
        <ul className='card-list'>
            <li>
                <FaUser color='rgb(239, 115, 115)' size={22}/>
                {profile.name}
            </li>
            {profile.location && (
                <li>
                    <Tooltip text="User's location">
                        <FaCompass color='rgb(144, 115, 255)' size={22} />
                        {profile.location} 
                    </Tooltip>
                </li>
            )}
            {profile.company && (
                <li>
                    <Tooltip text="User's company">
                        <FaBriefcase color='#795548' size={22} />
                        {profile.company} 
                    </Tooltip>
                </li>
            )}
            <li>
                <FaUsers color='rgb(129, 195, 245)' size={22}/>
                {profile.followers.toLocaleString()} followers
            </li>
            <li>
                <FaUserFriends color='rgb(64, 183, 95)' size={22}/>
                {profile.following.toLocaleString()} following
            </li>
        </ul>
    );
}

ProfileList.propTypes = {
    profile: PropTypes.object.isRequired
};

export class Results extends React.Component {
    /*constructor(props) {
        super(props);

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        };
    }*/

    state = {
        winner: null,
        loser: null,
        error: null,
        loading: true
    };

    componentDidMount() {
        //const { playerOne, playerTwo,  } = this.props;
        const { playerOne, playerTwo } = queryString.parse(this.props.router.location.search);

        battle([playerOne, playerTwo])
            .then((players) => {
                this.setState({
                    winner: players[0],
                    loser: players[1],
                    error: null,
                    loading: false
                });
            })
            .catch(({ message }) => {
                this.setState({
                    error: message,
                    loading: false
                });
            });
    }

    render() {
        const { winner: winner, loser, error, loading } = this.state;

        if (loading) {
            return <Loading />;
        }

        if (error) {
            return (
                <p className='center-text error'>{error}</p>
            );
        }

        return (
            <React.Fragment>
                <div className='grid space-around container-sm'>
                    <Card
                        header={winner.score === loser.score ? 'Tie' : 'Winner'}
                        subheader={`Score: ${winner.score.toLocaleString()}`}
                        avatar={winner.profile.avatar_url}
                        href={winner.profile.html_url}
                        name={winner.profile.login}
                    >
                        <ProfileList profile={winner.profile} />
                    </Card>

                    <Card
                        header={ loser.score === winner.score ? 'Tie' : 'Loser' }
                        subheader={`Score: ${loser.score.toLocaleString()}`}
                        avatar={loser.profile.avatar_url}
                        name={loser.profile.login}
                        href={loser.profile.html_url}
                        >
                        <ProfileList profile={loser.profile} />
                    </Card>
                </div>
             {/*   <button 
                    className='btn btn-dark btn-space'
                    onClick={this.props.onReset}
                >
                    Reset
                </button> */}

                <Link
                    to='/battle'
                    className='btn btn-dark btn-space'
                >
                    Reset
                </Link>
            </React.Fragment>
        );
    }
}

function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let params = useParams();

        return (
            <Component
                {...props}
                router={{location, params}}
            />
        );
    }

    return ComponentWithRouterProp;
}

export default withRouter(Results);

/*Results.propTypes = {
    playerOne: PropTypes.string.isRequired,
    playerTwo: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired
};*/