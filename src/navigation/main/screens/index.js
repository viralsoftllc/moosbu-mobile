import EditCampaign from '../../../screens/marketingSuite/Campaign/EditCampaign';
import NewCampaign from '../../../screens/marketingSuite/Campaign/NewCampaign';
import EditEmail from '../../../screens/marketingSuite/Email/EditEmail';
import NewEmail from '../../../screens/marketingSuite/Email/NewEmail';
import EditPhoneBook from '../../../screens/marketingSuite/PhoneBook/EditPhoneBook';
import NewPhoneBook from '../../../screens/marketingSuite/PhoneBook/NewPhoneBook';
import Category from '../../../screens/storeFront/Category';
import EditCategory from '../../../screens/storeFront/Category/EditCategory';
import NewCategory from '../../../screens/storeFront/Category/NewCategory';
import EditBuyxGety from '../../../screens/storeFront/Coupon/BuyxGety/EditBuyxGety';
import NewBuyxGety from '../../../screens/storeFront/Coupon/BuyxGety/NewBuyxGety';
import EditDiscount from '../../../screens/storeFront/Coupon/Discount/EditDiscount';
import NewDiscount from '../../../screens/storeFront/Coupon/Discount/NewDiscount';
import EditCoupon from '../../../screens/storeFront/Coupon/EditCoupon';
import NewCoupon from '../../../screens/storeFront/Coupon/NewCoupon';
import EditProduct from '../../../screens/storeFront/Products/EditProduct';
import NewProduct from '../../../screens/storeFront/Products/NewProduct';
import Tax from '../../../screens/storeFront/Tax';
import EditTax from '../../../screens/storeFront/Tax/EditTax';
import NewTax from '../../../screens/storeFront/Tax/NewTax';
import routes from '../../../shared/constants/routes';
import CouponTopTabNavigator from './CouponTopTabNavigator';
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

const menuStack = {
  [routes.ANALYTICS]: AnalyticTopTabNavigator,
};

const productScreen = {
  [routes.PRODUCTS_TAB]: ProductTopTabNavigator,
  [routes.NEW_PRODUCT]: NewProduct,
  [routes.EDIT_PRODUCT]: EditProduct,
  [routes.NEW_CATEGORY]: NewCategory,
  [routes.EDIT_CATEGORY]: EditCategory,
  // [routes.CATEGORY]: Category,
};

const taxScreen = {
  [routes.TAX]: Tax,
  [routes.NEW_TAX]: NewTax,
  [routes.EDIT_TAX]: EditTax,
};

const couponScreens = {
  [routes.COUPON]: CouponTopTabNavigator,
  [routes.NEW_COUPON]: NewCoupon,
  [routes.EDIT_COUPON]: EditCoupon,
  [routes.NEW_DISCOUNT]: NewDiscount,
  [routes.EDIT_DISCOUNT]: EditDiscount,
  [routes.NEW_BUYXGETY]: NewBuyxGety,
  [routes.EDIT_BUYXGETY]: EditBuyxGety,
};

const engagementScreen = {
  [routes.ENGAGEMNT]: EngagementTopTabNavigator,
  [routes.NEW_CAMPAIGN]: NewCampaign,
  [routes.EDIT_CAMPAIGN]: EditCampaign,
  [routes.NEW_PHONEBOOK]: NewPhoneBook,
  [routes.EDIT_PHONEBOOK]: EditPhoneBook,
  [routes.NEW_EMAIL]: NewEmail,
  [routes.EDIT_EMAIL]: EditEmail,
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
  couponScreens,
  taxScreen,
  productScreen,
};
