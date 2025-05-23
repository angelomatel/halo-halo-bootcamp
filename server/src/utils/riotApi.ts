import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

const RIOT_API_KEY = process.env.RIOT_API_KEY;

interface IRiotAccount {
    puuid: string;
    gameName: string;
    tagLine: string;
}

const getRiotPuuid = async (riotId: string, riotTag: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        fetch(`https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${riotId}/${riotTag}?api_key=${RIOT_API_KEY}`)
            .then((res) => {
                if (!res.ok) {
                    reject(new Error('Failed to fetch Riot account'));
                }

                return res.json() as Promise<IRiotAccount>;
            })
            .then((data: IRiotAccount) => {
                resolve(data.puuid);
            })
            .catch((err) => {
                console.error('Error fetching Riot account:', err);
                reject(err);
            })
    })
}

interface ITftAccount {
    puuid: string;
    leagueId: string;
    queueType: string;
    tier: string;
    rank: string;
    summonerId: string;
    leaguePoints: number;
    wins: number;
    losses: number;
    veteran: boolean;
    inactive: boolean;
    freshBlood: boolean;
    hotStreak: boolean;
}

const getTftAccount = async (puuid: string): Promise<ITftAccount> => {
    return new Promise((resolve, reject) => {
        fetch(`https://sg2.api.riotgames.com/tft/league/v1/by-puuid/${puuid}?api_key=${RIOT_API_KEY}`)
            .then((res) => {
                if (!res.ok) {
                    reject(new Error('Failed to fetch TFT account'));
                }

                return res.json() as Promise<ITftAccount[]>;
            })
            .then((data: ITftAccount[]) => {
                const account = data.filter((account: ITftAccount) => account.queueType === 'RANKED_TFT')[0];
                resolve(account);
            })
            .catch((err) => {
                console.error('Error fetching TFT account:', err);
                reject(err);
            })
    })
}

export { getRiotPuuid, getTftAccount };