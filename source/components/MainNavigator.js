import NavigatorBar from './NavigatorBar';
import NavigatorStack from './NavigatorStack';

const isLoggedIn = false

const MainNavigator = () => {
  return isLoggedIn ? <NavigatorBar /> : <NavigatorStack />;
};
export default MainNavigator;