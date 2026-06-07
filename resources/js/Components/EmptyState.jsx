import { ShieldCheck } from 'lucide-react'
import React from 'react'

export default function EmptyState({ message, submessage, icon }) {
  return (
    <div className="h-full flex flex-col items-center justify-center text-gray-400 py-10 text-center">
        {icon || <ShieldCheck size={48} className="text-green-200 mb-3" />}
        <p className="font-medium text-gray-500">
            {message}
        </p>

        {submessage &&
            <p className="text-sm">
                {submessage}
            </p>
        }
    </div>

  )
}
