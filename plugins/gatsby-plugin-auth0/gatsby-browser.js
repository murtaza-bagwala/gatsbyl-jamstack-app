import React from 'react';
import { navigate } from 'gatsby';
import { Auth0Provider } from '@auth0/auth0-react';

const onRedirectCallback = appState =>
	appState && appState.targetUrl && navigate(appState.targetUrl);

export const wrapRootElement = ({ element }, pluginOptions) => {
  return (
		<Auth0Provider
			domain={pluginOptions.domain}
			clientId={pluginOptions.clientId}
			redirectUri={window.location.origin}
			onRedirectCallback={onRedirectCallback}
		>
			{element}
		</Auth0Provider>
	);
};
