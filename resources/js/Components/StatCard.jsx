import React from 'react'
import {
    AlertCircle,
    AlertTriangle,
    ArrowLeft,
    ArrowRight,
    ArrowUpDown,
    Bell,
    CheckCircle2,
    Clock,
    Download,
    Edit,
    ExternalLink,
    Eye,
    FileArchive,
    FileArchiveIcon,
    FileIcon,
    FolderMinus,
    FolderOpen,
    List,
    PieChart,
    Plus,
    ShieldCheck,
    Users
} from "lucide-react"

const ICON_STYLES = {
    'Users': {
        bg: 'bg-white',
        text: 'text-blue-500'
    },
    'PieChart': {
        bg: 'bg-white',
        text: 'text-purple-800'
    },
    'AlertTriangle': {
        bg: 'bg-white',
        text: 'text-red-800'
    },
    'ShieldCheck': {
        bg: 'bg-white',
        text: 'text-green-500'
    },
}

export default function StatCard({ icon: Icon, label, value, sub }) {
    const iconName = Icon?.displayName || Icon?.name;

    const style = ICON_STYLES[iconName] || { bg: 'bg-white', text: 'text-gray-300'};
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
        <div className='w-14 h-14 rounded-xl flex items-center justify-center'>
            { Icon && <Icon size={28} className={`${style.bg} ${style.text}`} />}
        </div>
        <div>
            <p className="text-sm font-semibold text-gray-500 uppercase">{label}</p>
            <p className="text-3xl font-black text-gray-800">{value}</p>
            {sub && <p className="text-xs text-gray-400">{sub}</p>}
        </div>
    </div>
  )
}
