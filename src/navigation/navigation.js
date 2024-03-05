import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import JoinUs from "../pages/JoinUs";
import OutletComponent from "./outlet";
import LoginScreen from "../pages/Login";
import EmailConfirmation from "../pages/EmailConfirmation";
import GroundWork from "../pages/GroundWork";
import GroundWorkCategory from "../pages/GroundWorkCategory";
import Tools from "../pages/Tools";
import ToolsCategory from "../pages/ToolsCategory";
import Guides from "../pages/Guides";
import ThankYou from "../pages/ThankYou/ThankYou";
import CommunityGarden from "../pages/CommunityGarden";
import AboutUs from "../pages/AboutUs";
import SearchPage from "../pages/SearchPage";
import TermsAndConditions from "../pages/TermsAndConditions";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import FreshBlooms from "../pages/FreshBlooms";
import AppDownload from "../pages/AppDownload";
import ResetPassword from "../pages/ResetPassword";
import UpdatePassword from "../pages/UpdatePassword";
import ProfileScreen from "../pages/ProfileScreen";
import Essentials from "../pages/Essentials";
import BuildingSlocks from "../pages/BuildingSlocks";
import DeeperCuts from "../pages/DeeperCuts";
import Play from "../pages/Play";
import IndividualGroundWork from "../pages/IndividualGroundWork";
import Teachers from "../pages/Teachers";
import Topic from "../pages/Topic";
import Schedule from "../pages/Schedule";
import Payment from "../pages/Payment/Payment";
import ToolsForConnecting from "../pages/ToolsForConnecting";
import ToolsForWorker from "../pages/ToolsForWorker";
import ToolsForConnection from "../pages/ToolsForConnection";
import Resonance from "../pages/Resonance";
import ResonanceFinder from "../pages/ResonanceFinder";
import SelectAvatar from "../pages/SelectAvatar";
import AvatarInfo from "../pages/AvatarInfo";
import SelectBloom from "../pages/SelectBloom";
import BloomInfo from "../pages/BloomInfo";
import BloomCheck from "../pages/BloomCheck";
import UpdateBloomCheck from "../pages/UpdateBloomCheck";
import BloomResult from "../pages/BloomResult";
import UpdatePayment from "../pages/UpdatePayment";
import CancelSubscription from "../pages/CancelSubscription";
import ToolsToTry from "../pages/ToolsToTry";
import RecentContent from "../pages/RecentContent";
import Favorites from "../pages/Favourites";
import TopTools from "../pages/TopTools";
import ResonanceResult from "../pages/ResonanceResult.js";
import PaymentSuccess from "../pages/PaymentSuccess/PaymentSuccess";
import PaymentFailure from "../pages/PaymentFailure/PaymentFailure";
import TagVideos from "../pages/TagVideos";
import IndividualTag from "../pages/IndividualTag/index.jsx";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<OutletComponent />} />
      <Route element={<Home />} index />
      <Route element={<Home />} path="/home" />
      <Route element={<JoinUs />} path="/join-us" />
      <Route element={<LoginScreen />} path="/login" />
      <Route element={<EmailConfirmation />} path="/email-confirmation" />
      <Route element={<GroundWork />} path="/groundwork" />
      <Route element={<GroundWorkCategory />} path="/groundworkcategory/:id" />
      <Route element={<IndividualGroundWork />} path="/groundwork/:name" />
      <Route element={<TagVideos />} path="/tag/:name" />
      <Route element={<IndividualTag />} path="/tag/:name/:id" />
      <Route element={<Tools />} path="/tools" />
      <Route element={<ToolsCategory />} path="/toolscategory/:id" />
      <Route element={<IndividualGroundWork />} path="/tools/:name" />
      <Route element={<Guides />} path="/guides" />
      <Route element={<CommunityGarden />} path="/community-garden" />
      <Route element={<AboutUs />} path="/about-us" />
      <Route element={<TermsAndConditions />} path="/termsandconditions" />
      <Route element={<PrivacyPolicy />} path="/privacypolicy" />
      <Route element={<FreshBlooms />} path="/freshblooms" />
      <Route element={<AppDownload />} path="/appdownload" />
      <Route element={<ResetPassword />} path="/resetpassword" />
      <Route element={<UpdatePassword />} path="/updatepassword" />
      <Route element={<ProfileScreen />} path="/profile" />
      <Route element={<Essentials />} path="/essentials" />
      <Route element={<BuildingSlocks />} path="/buildingslocks" />
      <Route element={<DeeperCuts />} path="/deepercuts" />
      <Route element={<Play />} path="/play" />
      <Route element={<ToolsForConnecting />} path="/toolsforconnecting" />
      <Route element={<ToolsForWorker />} path="/toolsforworker" />
      <Route element={<ToolsForConnection />} path="/toolsforconnection" />
      <Route element={<Teachers />} path="/teachers" />
      <Route element={<Topic />} path="/topic/:id" />
      <Route element={<Schedule />} path="/schedule/:id" />
      <Route element={<Payment />} path="/payment" />
      <Route element={<ThankYou />} path="/thankyou" />
      <Route element={<SearchPage />} path="/searchpage" />
      <Route element={<Resonance />} path="/resonance" />
      <Route element={<ResonanceFinder />} path="/resonancefinder" />
      <Route element={<ResonanceResult />} path="/resonanceresult" />
      <Route element={<SelectAvatar />} path="/selectavatar" />
      <Route element={<AvatarInfo />} path="/avatarinfo" />
      <Route element={<SelectBloom />} path="/selectbloom" />
      <Route element={<BloomInfo />} path="/bloominfo" />
      <Route element={<BloomInfo />} path="/bloominfo" />
      <Route element={<BloomCheck />} path="/bloomcheck" />
      <Route element={<UpdateBloomCheck />} path="/updatebloomcheck" />
      <Route element={<BloomResult />} path="/bloomresult" />
      <Route element={<UpdatePayment />} path="/updatepayment" />
      <Route element={<CancelSubscription />} path="/cancelsubscription" />
      <Route element={<ToolsToTry />} path="/toolstotry" />
      <Route element={<RecentContent />} path="/recentcontent" />
      <Route element={<Favorites />} path="/favorites" />
      <Route element={<TopTools />} path="/toptools" />
      <Route element={<Payment />} path="/payment" />
      <Route element={<PaymentSuccess />} path="/payment-success" />
      <Route element={<PaymentFailure />} path="/payment-failure" />
      <Route element={<h1>This page is not defined</h1>} path="*" />
    </Routes>
  );
};

export default Navigation;
