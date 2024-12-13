import { PublicClientApplication } from "@azure/msal-browser"; 
 
 const config = {
    auth: {
      clientId: 'fe83a4cc-f142-4276-af88-eb422a3f8449', // App ID
      authority: 'https://login.microsoftonline.com/97d58c70-a9f4-4aa8-b28f-f833520dc90c',
      // redirectUri: 'https://oneview-rho.vercel.app'
      redirectUri: 'https://onehum.acuitas360.com/'
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: false,
    }
  };

  const configdev = {
    auth: {
      clientId: 'fe83a4cc-f142-4276-af88-eb422a3f8449', // App ID
      authority: 'https://login.microsoftonline.com/97d58c70-a9f4-4aa8-b28f-f833520dc90c',
      redirectUri: 'http://localhost:3000'
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: false,
    }
  };

  const isProduction = process.env.NODE_ENV === "production";

  export const msalInstance = isProduction
    ? new PublicClientApplication(config)
    : new PublicClientApplication(configdev);


