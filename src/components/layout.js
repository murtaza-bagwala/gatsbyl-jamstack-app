import React from 'react';
import { Grid, Flex } from '@chakra-ui/core';
import Header from './header';
import { minHeight } from 'styled-system';

const Layout = ({ children }) => {
	return (
		<Grid gridTemplateRows="64px auto" minHeight="100vh">
			<Header></Header>
			<Flex justify="center">{children}</Flex>
			<Flex as='footer' align="center" justify="center" color="gray.400">All Rights reserved</Flex>
		</Grid>
	);
};

export default Layout;
