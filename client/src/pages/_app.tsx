import { Outlet } from 'react-router';
export default function Layout() {
  return (
    <div className='h-screen w-screen'> 
      <Outlet />
    </div>
  );
}
