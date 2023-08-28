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
// import CashFlowTopTabNavigator from './CashFlowTopTabNavigator';
import HowCreditScoreWorks from '../../../screens/scaleByMoosbu/CashFlow/HowCreditScoreWorks';
import ShippingTopTabNavigator from './ShippingTopTabNavigator';
import NewShipping from '../../../screens/others/Shipping/NewShipping';
import EditShipping from '../../../screens/others/Shipping/EditShipping';
import NewLocation from '../../../screens/others/Location/NewLocation';
import EditLocation from '../../../screens/others/Location/EditLocation';
import More from '../../../screens/More';
import NewContact from '../../../screens/marketingSuite/Contacts/NewContact';
import EditContact from '../../../screens/marketingSuite/Contacts/EditContact';
import SettingsId from '../../../screens/marketingSuite/Settings/SettingsId';
import CashflowBreakdown from '../../../screens/scaleByMoosbu/CashFlow/CashflowBreakdown';
import BussinessRegistration from '../../../screens/scaleByMoosbu/BusinessRegistration';
import ProprietorForm from '../../../screens/scaleByMoosbu/BusinessRegistration/ProprietorForm';
import ProposedBusiness from '../../../screens/scaleByMoosbu/BusinessRegistration/ProposedBusiness';
import BvnVerification from '../../../screens/scaleByMoosbu/BusinessRegistration/BvnVerification';
import StoreSettings from '../../../screens/others/StoreSettings';
import GeneralSettings from '../../../screens/others/StoreSettings/GeneralSettings';
import CurrencySettings from '../../../screens/others/StoreSettings/CurrencySettings';
import Billing from '../../../screens/scaleByMoosbu/BusinessRegistration/Billing';
import CashflowReason from '../../../screens/scaleByMoosbu/CashFlow/CashflowReason';
import PersonalInformation from '../../../screens/scaleByMoosbu/CashFlow/PersonalInformation';
import Referee from '../../../screens/scaleByMoosbu/CashFlow/Referee';
import CashFlowComingSoon from '../../../screens/scaleByMoosbu/CashFlow';
import ResendCampaign from '../../../screens/marketingSuite/Campaign/ResendCampaign';
import CashFlowTopTabNavigator from './CashFlowTopTabNavigator';

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
  [routes.RESEND_CAMPAIGN]: ResendCampaign,
};

const cashFlowScreens = {
  // [routes.CASHFLOW_ADVANCE]: CashFlowComingSoon,
  [routes.CASHFLOW_ADVANCE]: CashFlowTopTabNavigator,
  [routes.HOW_CREDIT_SCORE_WORKS]: HowCreditScoreWorks,
  [routes.CASHFLOW_BREAKDOWN]: CashflowBreakdown,
  [routes.CASHFLOW_REASON]: CashflowReason,
  [routes.PERSONAL_INFORMATION]: PersonalInformation,
  [routes.REFEREE]: Referee,
};

const shippingScreens = {
  [routes.SHIPPING_LOCATION]: ShippingTopTabNavigator,
  [routes.NEW_SHIPPING]: NewShipping,
  [routes.EDIT_SHIPPING]: EditShipping,
  [routes.NEW_LOCATION]: NewLocation,
  [routes.EDIT_LOCATION]: EditLocation,
};

const businessRegistrationScreens = {
  [routes.BUSINESS_REGISTRATION]: BussinessRegistration,
  [routes.PROPRIETOR_INFO]: ProprietorForm,
  [routes.PROPOSED_BUSINESS]: ProposedBusiness,
  [routes.BVN_VERIFICATION]: BvnVerification,
  [routes.BILLING]: Billing,
};

const storeSettingsScreen = {
  [routes.STORE_SETTINGS]: StoreSettings,
  [routes.GENERAL_SETTINGS]: GeneralSettings,
  [routes.CURRENCY_SETTINGS]: CurrencySettings,
};

export {
  menuStack,
  shippingScreens,
  cashFlowScreens,
  engagementScreen,
  productScreen,
  moreScreens,
  businessRegistrationScreens,
  storeSettingsScreen,
};
