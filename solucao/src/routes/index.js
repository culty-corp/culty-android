import { createDrawerNavigator, createAppContainer } from 'react-navigation';

import LoginScreen from '../views/login_screen';
import HomeScreen from '../views/home_screen';
import Timeline from '../components/home_screen/timeline';
import CreateNew from '../components/home_screen/createNew';
import MyPosts from '../components/home_screen/myPosts';
import Settings from '../components/home_screen/settings';

const AppNavigator = createDrawerNavigator(
  {
    Login: LoginScreen,
    Timeline: Timeline,
    CreateNew: CreateNew,
    MyPosts: MyPosts,
    Settings: Settings
  },
  {
    initialRouteName: 'Timeline'
  }
);
const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
