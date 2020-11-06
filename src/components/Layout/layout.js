import React, { useContext } from 'react';
import {
  CogIcon,
  Menu,
  Position,
  Popover,
  CircleArrowLeftIcon,
  PeopleIcon,
  Button,
} from 'evergreen-ui';
import AuthContext from 'context/AuthContext';
import styles from './layout.module.scss';
const PrivateLayout = ({ children }) => {
  const { setLogout } = useContext(AuthContext);
  return (
    <div className={styles.Private}>
      <div className={styles.PrivateSide}>
        <div className={styles.PrivateSideLogo}>
          <Popover
            position={Position.BOTTOM_LEFT}
            content={
              <Menu>
                <Menu.Group>
                  <Menu.Item icon={PeopleIcon}>Hello</Menu.Item>
                </Menu.Group>
                <Menu.Divider />
                <Menu.Group>
                  <Menu.Item
                    icon={CircleArrowLeftIcon}
                    onClick={() => setLogout()}
                    intent="danger"
                  >
                    logout
                  </Menu.Item>
                </Menu.Group>
              </Menu>
            }
          >
            <Button appearance="minimal">
              <CogIcon />
            </Button>
          </Popover>
        </div>
        <div />
        <div className={styles.PrivateSideFooter}>{/* <CogIcon /> */}</div>
      </div>
      <div className={styles.PrivateMain}>{children}</div>
    </div>
  );
};

export default PrivateLayout;
