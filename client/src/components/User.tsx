import { Component } from 'react';

import './User.scss';

import unranked from '../images/0_unranked.png';
import iron from '../images/1_iron.png';
import bronze from '../images/2_bronze.png';
import silver from '../images/3_silver.png';
import gold from '../images/4_gold.png';
import platinum from '../images/5_platinum.png';
import emerald from '../images/6_emerald.png';
import diamond from '../images/7_diamond.png';
import master from '../images/8_master.png';
import grandmaster from '../images/9_grandmaster.png';
import challenger from '../images/10_challenger.png';

export interface IUser {
    index: number;
    username: string;
    avatarUrl: string;
    riotId: string;
    riotTag: string;
    tftTier: string;
    tftRank: string;
    tftLP: number;
}

const RANK_IMAGES: any = {
    UNRANKED: unranked,
    IRON: iron,
    BRONZE: bronze,
    SILVER: silver,
    GOLD: gold,
    PLATINUM: platinum,
    EMERALD: emerald,
    DIAMOND: diamond,
    MASTER: master,
    GRANDMASTER: grandmaster,
    CHALLENGER: challenger,
}

class User extends Component<IUser> {
    render() {
        const { index, username, avatarUrl, riotId, riotTag, tftTier, tftRank, tftLP } = this.props;

        return (
            <div className="row align-middle text-center py-3">
                <div className="col col-1 align-self-center">
                    {index + 1}
                </div>
                <div className="col d-flex flex-column">
                    <div className="row align-self-center">

                        <div className="col col-lg-auto align-self-center">
                            <img className="user-avatar" src={avatarUrl} alt={`${username}'s avatar`} />
                        </div>
                        <div className="d-flex col align-self-center">
                            <div className="row">
                                <div className="row fw-bold">
                                    {username}
                                </div>
                                <div className="row">
                                    {riotId}#{riotTag}
                                </div>
                                <div className="row fw-bold text-danger">
                                    This player has been eliminated!
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col col-3 fw-bold">
                    <div className="row align-self-center">
                        HEALTH
                        {/* Insert Health Stuff Here */}
                    </div>
                </div>
                <div className="col col-3">
                    <div className="row align-self-center">

                        <div className="col col-lg-auto align-self-center">
                            <img className="rank-image" src={`${RANK_IMAGES[tftTier]}`} alt={`${tftTier} ${tftRank}`} />
                        </div>
                        <div className="d-flex col align-self-center">
                            <div className="row">
                                <div className="col col-12 fw-bold">
                                    {tftTier} {tftRank}
                                </div>
                                <div className="col col-12">
                                    {tftLP} LP
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default User;