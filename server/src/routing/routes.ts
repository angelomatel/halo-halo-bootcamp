import express from 'express';

import { addUser, getUsers } from '../controller/user';

export const configureRoutes = (app: express.Application) => {
    app.route('/add/user')
        .post((req, res) => {
            const { username, avatarUrl, riotId, riotTag } = req.body;
            
            console.log('Received data:', req.body);
            addUser(username, avatarUrl, riotId, riotTag)
                .then(user => res.status(201).json(user))
                .catch(err => res.status(500).json({ error: err.message }));
        });
    
    app.route('/get/all-users')
        .get((req, res) => {
            
            getUsers()
                .then(users => res.status(200).json(users))
                .catch(err => res.status(500).json({ error: err.message }));
        })
}