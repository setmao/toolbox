import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import JSONFormatter from '@/pages/JSONFormatter';
import DefaultLayout from '@/layouts/DefaultLayout';


const Router = () => {
  return (
    <BrowserRouter basename='/toolbox'>
      <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Navigate to="/json-formatter" replace />} />
            <Route path="/json-formatter" element={<JSONFormatter />} />
          </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
