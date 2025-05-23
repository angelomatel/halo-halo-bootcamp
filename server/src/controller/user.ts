import { Request, Response } from 'express';
import User, { IUser } from '../models/user';

import { getRiotPuuid, getTftAccount } from '../utils/riotApi';

const getUsers = async (): Promise<IUser[]> => {
    return new Promise(async (resolve, reject) => {
        const users = await User.find({});
        if (!users) {
            console.error('No users found');
            reject(new Error('No users found'));
        }
        if (users.length === 0) {
            console.error('No users found');
            reject([]);
        }

        console.log('Users found:', users);
        resolve(users);
    });
}

const addUser = async (username: string, avatarUrl: string, riotId: string, riotTag: string): Promise<IUser> => {
    return new Promise<IUser>(async (resolve, reject) => {
        try {
            const puuid = await getRiotPuuid(riotId, riotTag);
            const tftAccount = await getTftAccount(puuid);

            console.log('TFT Account:', tftAccount);
            console.log('Riot PUUID:', puuid);
            console.log(username, avatarUrl, riotId, riotTag);

            const user = new User({
                username,
                avatarUrl,
                riotId,
                riotTag,
                riotPuuid: puuid,
                tftTier: tftAccount.tier,
                tftRank: tftAccount.rank,
                tftLP: tftAccount.leaguePoints
            });

            await user.save();
            resolve(user);
        } catch (error) {
            console.error('Error adding user:', error);
            reject(error);
        }
    });
}

export { getUsers, addUser };