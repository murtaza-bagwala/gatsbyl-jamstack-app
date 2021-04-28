import React from 'react';
import { Stack, StatNumber, StatArrow, Button } from '@chakra-ui/core';
import { useAuth0 } from '@auth0/auth0-react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import graphql from 'gatsby';
import gql from 'graphql-tag';

const GET_UPVOTES = gql`
	query UpvoteQuery($playlistId: Int!, $userId: String) {
		hasUpvoted: upvote(
			where: { playlist_id: { _eq: $playlistId }, user_id: { _eq: $userId } }
		) {
			id
			user_id
			upvoted_at
		}
		upvotes: upvote(where: { playlist_id: { _eq: $playlistId } }) {
			id
		}
	}
`;

const UPSERT_UPVOTE = gql`
	mutation($playlistId: Int!, $userId: String!, $upvotedAt: timestamptz) {
		insert_upvote(
			objects: {
				playlist_id: $playlistId
				user_id: $userId
				upvoted_at: $upvotedAt
			}
		) {
			affected_rows
			returning {
				id
				playlist_id
				upvoted_at
				user_id
			}
		}
	}
`;

const UpvoteButton = ({ playlist, ...props }) => {
	const { loginWithRedirect, isAuthenticated, user } = useAuth0();
	const { data, loading, error } = useQuery(GET_UPVOTES, {
		variables: {
			userId: user?.sub,
			playlistId: playlist.id
		}
  });

  debugger
  
	const [upsertUpvote] = useMutation(UPSERT_UPVOTE);

	const upvoted = isAuthenticated && !!data?.hasUpvoted?.[0]?.upvoted_at;

	return (
		<Button
			height='100%'
			variant={upvoted ? 'outline' : 'solid'}
			variantColor='blue'
			onClick={() => {
				if (isAuthenticated) {
					if (upvoted) {
						console.log(`remove upvote`);
						upsertUpvote({
							variables: {
								playlistId: playlist.id,
								userId: user.sub,
								upvotedAt: null
							},
							refetchQueries: [`UpvoteQuery`]
						}).catch(res => {
							debugger;
						});
					} else {
						console.log(`perform upvote`);
						upsertUpvote({
							variables: {
								playlistId: playlist.id,
								userId: user.sub,
								upvotedAt: new Date().toISOString()
							},
							refetchQueries: [`UpvoteQuery`]
						}).catch(res => {
							debugger
						});
					}
				} else {
					loginWithRedirect();
				}
			}}
			{...props}
		>
			<Stack color={upvoted ? 'blue.600' : 'white'} align='center'>
				<StatArrow
					color={upvoted ? 'blue.600' : 'white'}
					type='increase'
					m={0}
        ></StatArrow>
				<StatNumber fontSize='lg'>
					{(loading || error) && null}
					{data && data?.upvotes.length}
				</StatNumber>
			</Stack>
		</Button>
	);
};

export default UpvoteButton;
