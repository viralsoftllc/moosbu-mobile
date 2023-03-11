import EditCampaign from '../../../screens/marketingSuite/Campaign/EditCampaign';
import NewCampaign from '../../../screens/marketingSuite/Campaign/NewCampaign';
import EditCategory from '../../../screens/storeFront/Category/EditCategory';
import NewCategory from '../../../screens/storeFront/Category/NewCategory';
import EditProduct from '../../../screens/storeFront/Products/EditProduct';
import NewProduct from '../../../screens/storeFront/Products/NewProduct';
import routes from '../../../shared/constants/routes';
import EngagementTopTabNavigator from './EngagementTopTabNavigator';
import ProductTopTabNavigator from './ProductTopTabNavigator';
import AnalyticTopTabNavigator from './AnalyticTopTabNavigator';
import CashFlowTopTabNavigator from './CashFlowTopTabNavigator';
import HowCreditScoreWorks from '../../../screens/scaleByMoosbu/CashFlow/HowCreditScoreWorks';
import ShippingTopTabNavigator from './ShippingTopTabNavigator';
import NewShipping from '../../../screens/others/Shipping/NewShipping';
import EditShipping from '../../../screens/others/Shipping/EditShipping';
import NewLocation from '../../../screens/others/Location/NewLocation';
import EditLocation from '../../../screens/others/Location/EditLocation';
import Customers from '../../../screens/others/Customers';
import CustomerOrders from '../../../screens/others/CustomerOrders';
import CustomerOrderDetails from '../../../screens/others/CustomerOrderDetails';
import Wallet from '../../../screens/Wallet';
import ChoosePaymentMethod from '../../../screens/Wallet/ChoosePaymentMethod';
import BankTransfer from '../../../screens/Wallet/BankTransfer';
import SendFunds from '../../../screens/Wallet/SendFunds';
import More from '../../../screens/More';
import NewContact from '../../../screens/marketingSuite/Contacts/NewContact';
import EditContact from '../../../screens/marketingSuite/Contacts/EditContact';
import SettingsId from '../../../screens/marketingSuite/Settings/SettingsId';

const menuStack = {
  [routes.ANALYTICS]: AnalyticTopTabNavigator,
};

const productScreen = {
  [routes.PRODUCTS_TAB]: ProductTopTabNavigator,
  [routes.NEW_PRODUCT]: NewProduct,
  [routes.EDIT_PRODUCT]: EditProduct,
  [routes.NEW_CATEGORY]: NewCategory,
  [routes.EDIT_CATEGORY]: EditCategory,
};

const walletScreens = {
  [routes.WALLET]: Wallet,
  [routes.CHOOSE_PAYMENT_METHOD]: ChoosePaymentMethod,
  [routes.BANK_TRANSFER]: BankTransfer,
  [routes.SEND_FUNDS]: SendFunds,
};

const moreScreens = {
  [routes.MORE]: More,
};

const engagementScreen = {
  [routes.ENGAGEMNT]: EngagementTopTabNavigator,
  [routes.NEW_CAMPAIGN]: NewCampaign,
  [routes.EDIT_CAMPAIGN]: EditCampaign,
  [routes.NEW_CONTACT]: NewContact,
  [routes.EDIT_CONTACT]: EditContact,
  [routes.SETTINGS_ID]: SettingsId,
};

const cashFlowScreens = {
  [routes.CASHFLOW_ADVANCE]: CashFlowTopTabNavigator,
  [routes.HOW_CREDIT_SCORE_WORKS]: HowCreditScoreWorks,
};

const shippingScreens = {
  [routes.SHIPPING_LOCATION]: ShippingTopTabNavigator,
  [routes.NEW_SHIPPING]: NewShipping,
  [routes.EDIT_SHIPPING]: EditShipping,
  [routes.NEW_LOCATION]: NewLocation,
  [routes.EDIT_LOCATION]: EditLocation,
};

const customerScreens = {
  [routes.CUSTOMERS]: Customers,
  [routes.CUSTOMER_ORDER]: CustomerOrders,
  [routes.CUSTOMER_ORDER_DETAILS]: CustomerOrderDetails,
};

export {
  menuStack,
  customerScreens,
  shippingScreens,
  cashFlowScreens,
  engagementScreen,
  productScreen,
  walletScreens,
  moreScreens,
};
