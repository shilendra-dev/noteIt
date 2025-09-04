import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';
export default function Layout() {
  return (
    <div className='h-screen w-screen'> 
      <Outlet />
      <Toaster position="bottom-right" reverseOrder={false}/>
    </div>
  );
}
