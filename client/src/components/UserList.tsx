'use client';
import { Component } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query';

import User, { IUser } from './User';

// Data API URL = http://localhost:5000/get/all-users

const queryClient = new QueryClient();
const UserListQuery = () => {
    
    const { isPending, isLoading, error, data } = useQuery<IUser[], Error>({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await fetch('http://localhost:5000/get/all-users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            
            const users = await response.json();
            const duplicatedUsers = [];
            for (let i = 0; i < 5; i++) {
                duplicatedUsers.push(...users);
            }

            return duplicatedUsers;
            // return response.json();
        },
    });
    
    if (isPending) return <div>Loading...</div>;
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;
    
    return (
        <div className="row">
            {data?.map((user, index) => (
                <User
                    key={user.username}
                    index={index}
                    username={user.username}
                    avatarUrl={user.avatarUrl}
                    riotId={user.riotId}
                    riotTag={user.riotTag}
                    tftTier={user.tftTier}
                    tftRank={user.tftRank}
                    tftLP={user.tftLP}
                />
            ))}
        </div>
    );
}

class UserList extends Component {
    render() {
        return (
            <QueryClientProvider client={queryClient}>
                <UserListQuery />
            </QueryClientProvider>
        );
    }
}

export default UserList;