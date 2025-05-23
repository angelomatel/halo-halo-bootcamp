// Do not use this, failed GraphQL implementation lol. Keeping this as I learned a lot
// from this.

import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';

import mongoDbClient from '../utils/mongodb';
import { getRiotPuuid, getTftAccount } from '../utils/riotApi';

const TUser = new GraphQLObjectType({
    name: 'User',
    fields: {
        username: { type: GraphQLString },
        avatarUrl: { type: GraphQLString },
        riotId: { type: GraphQLString },
        riotTag: { type: GraphQLString },
        riotPuuid: { type: GraphQLString },
        tftTier: { type: GraphQLString },
        tftRank: { type: GraphQLString },
        tftLP: { type: GraphQLString }
    }
})

export const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        fields: {
            getUsers: {
                type: TUser,
                resolve(parent, args) {
                    mongoDbClient.connect()
                        .then(async () => {
                            const db = mongoDbClient.db('bootcamp');
                            const collection = db.collection('users');
                            // Return all users
                            const array = await collection.find({}).toArray();
                            console.log('Users fetched from MongoDB:', array);
                            return array;
                        })
                        .then((users) => {
                            return users.map(user => ({
                                username: user.username,
                                avatarUrl: user.avatarUrl,
                                riotId: user.riotId,
                                riotTag: user.riotTag,
                                riotPuuid: user.riotPuuid,
                                tftTier: user.tftTier,
                                tftRank: user.tftRank,
                                tftLP: user.tftLP
                            }));
                        })
                        .catch(err => {
                            console.error('Error connecting to MongoDB:', err);
                            throw new Error('Failed to fetch users');
                        })
                        .finally(() => {
                            mongoDbClient.close();
                        });
                }
            },

            addUser: {
                type: TUser,
                args: {
                    username: { type: GraphQLString },
                    avatarUrl: { type: GraphQLString },
                    riotId: { type: GraphQLString },
                    riotTag: { type: GraphQLString },
                },
                async resolve(parent, args) {
                    const { username, avatarUrl, riotId, riotTag } = args;
                    const puuid = await getRiotPuuid(riotId, riotTag);
                    const account = await getTftAccount(puuid);

                    const newUser = {
                        username,
                        avatarUrl,
                        riotId,
                        riotTag,
                        riotPuuid: puuid,
                        tftTier: account.tier,
                        tftRank: account.rank,
                        tftLP: account.leaguePoints
                    };

                    try {
                        await mongoDbClient.connect();
                        const db = mongoDbClient.db('bootcamp');
                        const collection = db.collection('users');

                        // Check if user already exists
                        const existingUser = await collection.findOne({ riotId, riotTag });
                        if (existingUser) {
                            throw new Error('User already exists');
                        }

                        // Insert new user
                        await collection.insertOne(newUser);
                        return newUser;
                    } catch (err) {
                        console.error('Error adding user:', err);
                        throw new Error('Failed to add user');
                    } finally {
                        mongoDbClient.close();
                    }
                }
            }
        }
    })
});

export default schema;