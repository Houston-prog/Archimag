import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import SidebarCons from '@/Components/SidebarCons'
import SidebarHisto from '@/Components/SidebarHisto';
import SidebarPub from '@/Components/SidebarPub';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import React, { useMemo, useState } from 'react'
import DataTable from 'react-data-table-component';
import styled from 'styled-components';
import SidebarAdmin from './SidebarAdmin';
import BreadcrumbSec from './BreadcrumbSec';
import { AlertTriangleIcon, FileWarningIcon } from 'lucide-react';

export default function Security() {
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

    //const fakeUsers = createUsers(2000);

    const fakeUsers = [
        {
            id: 1,
            name: "Paul",
            email: "paulnodjom@yahoo.com",
            address: "8000 Rue 90",
            bio: "Developpeur web",
        },
        {
            id: 2,
            name: "John",
            email: "paulnodjom@yahoo.com",
            address: "8000 Rue 90",
            bio: "Developpeur web",
        },
        {
            id: 3,
            name: "Doe",
            email: "paulnodjom@yahoo.com",
            address: "8000 Rue 90",
            bio: "Developpeur web",
        },
        {
            id: 4,
            name: "Paul",
            email: "paulnodjom@yahoo.com",
            address: "8000 Rue 90",
            bio: "Developpeur web",
        },
        {
            id: 5,
            name: "Paul",
            email: "paulnodjom@yahoo.com",
            address: "8000 Rue 90",
            bio: "Developpeur web",
        },
        {
            id: 6,
            name: "Paul",
            email: "paulnodjom@yahoo.com",
            address: "8000 Rue 90",
            bio: "Developpeur web",
        },
        {
            id: 7,
            name: "Paul Nod",
            email: "paulnodjom@yahoo.com",
            address: "8000 Rue 90",
            bio: "Developpeur web",
        },
        {
            id: 8,
            name: "Nodjom",
            email: "paulnodjom@yahoo.com",
            address: "8000 Rue 90",
            bio: "Developpeur web",
        },
        {
            id: 9,
            name: "N P",
            email: "paulnodjom@yahoo.com",
            address: "8000 Rue 90",
            bio: "Developpeur web",
        },
        {
            id: 10,
            name: "Paul",
            email: "paulnodjom@yahoo.com",
            address: "8000 Rue 90",
            bio: "Developpeur web",
        },
        {
            id: 11,
            name: "Devnod",
            email: "paulnodjom@yahoo.com",
            address: "8000 Rue 90",
            bio: "Developpeur web",
        }
    ]

    const filteredItems = fakeUsers.filter(
        item => item.name && item.name.toLowerCase().includes(filterText.toLowerCase()),
    );

    const TextField = styled.input`
        height: 32px;
        width: 200px;
        border-radius: 3px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border: 1px solid #e5e5e5;
        padding: 0 32px 0 16px;

        &:hover {
            cursor: pointer;
        }
    `;

    const FilterComponent = ({ filterText, onFilter, onClear }) => (
        <div>
            <TextField
                id="search"
                type="text"
                placeholder="Filter By Name"
                aria-label="Search Input"
                value={filterText}
                onChange={onFilter}
            />
            <SecondaryButton type="button" onClick={onClear}>
                X
            </SecondaryButton>
        </div>
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return (
            <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        );
    }, [filterText, resetPaginationToggle]);

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Address',
            selector: row => row.address,
            sortable: true,
        },
        {
            name: 'Bio',
            selector: row => row.bio,
            sortable: true,
        }
    ];


  return (
    <AuthenticatedLayout hideHeader={true}>

        <div className="flex flex-row justify-between">

            <div className='basis-1/4'>
                <SidebarAdmin/>
            </div>

            <div className="basis-3/4 mr-24 lg:mr-24 md:mr-24 sm:mr-10 py-6">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-100">
                        <div className="p-6 border-sky-200 creation-title font-bold">
                            <BreadcrumbSec />

                            <div className='items-center justify-center'>
                                <span className='text-center w-50 h-50 text-yellow-300'>
                                    <AlertTriangleIcon />

                                    <p className='text-center text-red-700'>
                                        Application est en maintenance
                                    </p>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </AuthenticatedLayout>
  )
}
