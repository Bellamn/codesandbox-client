import React from 'react';
import { withTheme } from 'styled-components';

import { useOvermind } from 'app/overmind';
import { COMMENTS } from '@codesandbox/common/lib/utils/feature-flags';
import { ThemeProvider } from '@codesandbox/components';

import { Chat } from './Chat';
import { Container } from './elements';

import { ProjectInfo } from './screens/ProjectInfo';
import { NotOwnedSandboxInfo } from './screens/NotOwnedSandboxInfo';
import { GitHub } from './screens/GitHub';
import { Explorer } from './screens/Explorer';
import { Deployment } from './screens/Deployment/index';
import { ConfigurationFiles } from './screens/ConfigurationFiles';
import { Live } from './screens/Live';
import { Server } from './screens/Server';
import { Comments } from './screens/Comments';
import { More } from './items/More';

const workspaceTabs = {
  project: ProjectInfo,
  'project-summary': NotOwnedSandboxInfo,
  github: GitHub,
  files: Explorer,
  deploy: Deployment,
  config: ConfigurationFiles,
  live: Live,
  server: Server,
  more: More,
};

if (COMMENTS) {
  // @ts-ignore
  workspaceTabs.comments = Comments;
}

export const WorkspaceComponent = ({ theme }) => {
  const { state } = useOvermind();
  const {
    live: { isLive, roomInfo },
    workspace: { openedWorkspaceItem: activeTab },
  } = state;

  if (!activeTab) {
    return null;
  }

  const Component = workspaceTabs[activeTab];

  return (
    <Container>
      <ThemeProvider theme={theme.vscodeTheme}>
        <>
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              fontFamily: 'Inter, Roboto, sans-serif',
            }}
          >
            <Component />
          </div>

          {isLive && roomInfo.chatEnabled && <Chat />}
        </>
      </ThemeProvider>
    </Container>
  );
};

export const Workspace = withTheme(WorkspaceComponent);
