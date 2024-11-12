'use client';
import React, { useState } from 'react';
import CustomerContent from './_components/CustomerContent';
import useDeviceSize from '@/hooks/useDeviceSize';
import CustomerSidebar from './_components/CustomerSidebar';

const CustomerPage = () => {
  return (
    <div className="md:flex md:flex-row">
      <div className="md:hidden">
        <CustomerContent />
      </div>
    </div>
  );
};

export default CustomerPage;
