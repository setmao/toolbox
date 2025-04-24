import { BrowserRouter, Route, Routes } from 'react-router-dom';
import JSONFormatter from '@/pages/JSONFormatter';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<JSONFormatter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
