import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from './pages/loginPage';
import { DashboardPage } from './pages/dashboardPage';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
        <Route path="*" element={<a/>}/>
      </Routes>
    </BrowserRouter>
  );
}