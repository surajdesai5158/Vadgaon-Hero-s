import React from 'react';
import AdminHeader from './AdminHeader';
import { Outlet } from 'react-router-dom';
import AdminFooter from './AdminFooter';

const AdminLayout = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Fixed Header */}
            <div style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100 }}>
                <AdminHeader />
            </div>
            {/* Main Content (Outlet) */}
            <div style={{ flex: 1, paddingTop: '75px', paddingBottom: '40px' }}>
                <Outlet />
            </div>
            {/* Fixed Footer */}
            <div style={{
                position: 'float',
                bottom: 0,
                width: '100%',
                zIndex: 100,
                backgroundColor: 'black',
                color: 'white'
            }}>
                <AdminFooter />
            </div>
        </div>
    );
};

export default AdminLayout;