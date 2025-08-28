declare global {
  interface Window {
    gapi: {
      load: (api: string, callback: () => void) => void;
      client: {
        init: (config: {
          apiKey: string;
          clientId: string;
          discoveryDocs: string[];
          scope: string;
        }) => Promise<void>;
        drive: {
          files: {
            list: (params: {
              pageSize: number;
              fields: string;
              q: string;
              orderBy: string;
            }) => Promise<{
              result: {
                files?: Array<{
                  id: string;
                  name: string;
                  mimeType: string;
                  modifiedTime: string;
                  size?: string;
                }>;
              };
            }>;
            export: (params: {
              fileId: string;
              mimeType: string;
            }) => Promise<{
              result: string;
            }>;
          };
        };
      };
      auth2: {
        getAuthInstance: () => {
          isSignedIn: {
            get: () => boolean;
          };
          signIn: () => Promise<void>;
          signOut: () => Promise<void>;
        };
      };
    };
  }
}

export {};
