import React from 'react';
import { Button } from '@chakra-ui/core';
import Layout from '../components/layout';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Playlists from '../components/playlists';

const GET_PLAYLISTS = gql`
	query MyQuery {
		playlist {
			description
			id
			url
			title
			user_id
		}
	}
`;

export default function Home() {
  const { data, loading, error } = useQuery(GET_PLAYLISTS);
  
  if (loading) {
    return (
			<div>
				loading.....
			</div>
		);
  }

  const playlists = data ?.playlist;
	return (
		<div>
			<Playlists playlists={playlists} />
		</div>
	);
}
