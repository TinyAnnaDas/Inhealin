
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home';
import HowItWorks from './Pages/HowItWorks';
import PricingAndPlans from './Pages/PricingAndPlans';
import OurTherapists from './Pages/OurTherapists';
import LoginPage from './Pages/LoginPage';
import SingupPage from './Pages/SingupPage';
import Dashboard from './Pages/Client/Dashboard';
import OrderSummary from './Pages/OrderSummary';
import AdminLogin from './Components/AdminLogin/AdminLogin';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import CreateClient from './Components/CreateClient/CreateClient';
import ClientManagement from './Pages/Admin/ClientManagement';
import SubscriptionsMangement from './Pages/Admin/SubscriptionsMangement';
import ClientProfile from './Pages/Client/ClientProfile';
import ClientSessions from './Pages/Client/ClientSessions';
import ClientChats from './Pages/Client/ClientChats';
import MoodJournal from './Pages/Client/MoodJournal';
import HelpDesk from './Pages/Client/HelpDesk';
import TherapistHome from './Pages/Therapist/TherapistHome';
import LoginPageTherapist from './Pages/LoginPageTherapist';
import TherapistDashboard from './Pages/Therapist/TherapistDashboard';
import PrivateRouteClient from './Utils/PrivateRoutesClient';
import PrivateRouteAdmin from './Utils/PrivateRoutesAdmin';
import PrivateRouteTherapist from './Utils/PrivateRoutesTherapists';
import TherapistSessions from './Pages/Therapist/TherapistSessions';
import TherapistChats from './Pages/Therapist/TherapistChats';
import TherapistManageCalendar from './Pages/Therapist/TherapistManageCalendar';
import TherapistHelpDesk from './Pages/Therapist/TherapistHelpDesk';
import TherapistProfile from './Pages/Therapist/ThreapistProfile';
import TherapistSignup from './Pages/Therapist/TherapistSignup';
import TherapistManagement from './Pages/Admin/TherapistManagement';
import ResumePdf from './Components/TherapistSignup/ResumePdf';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import BookASession from './Pages/BookASession';




function App() {
  const user = useSelector(state=>state.clientAuth.client)
  const therapist = useSelector(state=>state.therapistAuth.therapist)
  return (
    <BrowserRouter>
     <div >
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/how-it-works' element={<HowItWorks/>}/>
        <Route path='/pricing-and-plans' element={<PricingAndPlans/>}/>
        <Route path='/our-therapists' element={<OurTherapists/>}/>
        <Route path='/login' element= {user ? <Navigate to="/client/dashboard"/>: <LoginPage/>}/>
        <Route path='/signup' element={user ? <Navigate to="/client/dashboard"/>: <SingupPage/>}/>
        <Route path='/order-summary/:id' element={<OrderSummary/>}></Route>

        <Route path='/therapist-login' element={therapist? <Navigate to="/therapist/dashboard" /> : <LoginPageTherapist/>}></Route>
        <Route path='/therapist/get-onboard' element={<TherapistHome/>}></Route>
        <Route path='/therapist/get-onboard/questions' element={<TherapistSignup/>}></Route>
        <Route path='/therapist/get-onboard/questions/pdf-review' element={<ResumePdf/>}></Route>

        <Route element={<PrivateRouteTherapist/>}>
          <Route path='/therapist/dashboard' element={<TherapistDashboard/>}></Route>
          <Route path='/therapist/profile' element={<TherapistProfile/>}></Route>
          <Route path='/therapist/sessions' element={<TherapistSessions/>}></Route>
          <Route path='/therapist/my-chats' element={<TherapistChats/>}></Route>
          <Route path='/therapist/manage-calendar' element={<TherapistManageCalendar/>}></Route>
          <Route path='/therapist/help-desk' element={<TherapistHelpDesk/>}></Route>

        </Route>
        


        
        <Route element={<PrivateRouteClient/>}>
          <Route path='/client/dashboard' element={<Dashboard/>}/>
          <Route path='/client/profile' element={<ClientProfile/>}/>
          <Route path='/client/sessions' element={<ClientSessions/>}/>
          <Route path='/client/my-chats' element={<ClientChats/>}/>
          <Route path='/client/mood-journal' element={<MoodJournal/>}/>
          <Route path='/client/help-desk' element={<HelpDesk/>}/>
          <Route path='/our-therapists/book-a-session/:therapistId/:therapistName' element={<BookASession/>}/>
          <Route path='/our-therapists/change-therapist/:therapistId' element={<OurTherapists/>}/>
          

        </Route>
        


        <Route path='/admin' element={<AdminLogin/>}></Route>
        <Route path='' element={<PrivateRouteAdmin/>}>
          <Route path='/admin/dashboard' element={<AdminDashboard/>}></Route>
          <Route path='/admin/client-management' element={<ClientManagement/>}></Route>
          <Route path='/admin/subscription-management' element={<SubscriptionsMangement/>}></Route>
          <Route path='/admin/dashboard/create-client' element={<CreateClient/>}></Route>


          <Route path='/admin/therapist-management' element={<TherapistManagement/>}></Route>

        </Route>
      </Routes>
    </div>    
    </BrowserRouter>
   
  );
}

export default App;
