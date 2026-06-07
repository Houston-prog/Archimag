import SecondaryButton from '@/Components/SecondaryButton';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { useMemo, useState } from 'react'
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import SidebarAdmin from './SidebarAdmin';
import BreadcrumbSec from './BreadcrumbSec';
import axios from 'axios';

export default function Backup() {
    const handleBackup = (type) => {
        const url = type === 'app' ? '/backup/app' : '/backup/db';

        axios.post(url)
            .then(res => alert(res.data.message))
            .catch(err => console.error(err))
    };

  return (
    <AuthenticatedLayout>

        <div className="flex flex-row justify-between">

            <div className='basis-1/4'>
                <SidebarAdmin/>
            </div>

            <div className="basis-3/4 mr-24 lg:mr-24 md:mr-24 sm:mr-10 py-6">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-100">
                        <div className="p-6 border-sky-200 creation-title font-bold">
                            <h2>
                                Sauvegardes
                            </h2>

                            <div className='flex gap-4'>
                                <button onClick={() => handleBackup('app')}>
                                    Savegarder l'application
                                </button>

                                <button onClick={() => handleBackup('db')}>
                                    Savegarder l'application
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>
  )
}
