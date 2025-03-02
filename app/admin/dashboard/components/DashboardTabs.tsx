'use client';

import { useState } from 'react';
import { RSVPData, MessageData, GiftData } from '@/lib/supabase';
import RSVPTable from './RSVPTable';
import MessagesTable from './MessagesTable';
import GiftsTable from './GiftsTable';

type Tab = 'rsvp' | 'messages' | 'gifts';

interface DashboardTabsProps {
  rsvps: RSVPData[];
  messages: MessageData[];
  gifts: GiftData[];
}

export default function DashboardTabs({ rsvps, messages, gifts }: DashboardTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>('rsvp');

  return (
    <div>
      <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('rsvp')}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === 'rsvp'
                  ? 'text-primary border-b-2 border-primary'
                  : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              }`}
            >
              Confirmações de Presença
              <span className="ml-2 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                {rsvps.length}
              </span>
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('messages')}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === 'messages'
                  ? 'text-primary border-b-2 border-primary'
                  : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              }`}
            >
              Mensagens
              <span className="ml-2 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                {messages.length}
              </span>
            </button>
          </li>
          <li className="mr-2">
            <button
              onClick={() => setActiveTab('gifts')}
              className={`inline-block p-4 rounded-t-lg ${
                activeTab === 'gifts'
                  ? 'text-primary border-b-2 border-primary'
                  : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
              }`}
            >
              Presentes
              <span className="ml-2 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-300">
                {gifts.length}
              </span>
            </button>
          </li>
        </ul>
      </div>

      <div className="tab-content">
        {activeTab === 'rsvp' && <RSVPTable rsvps={rsvps} />}
        {activeTab === 'messages' && <MessagesTable messages={messages} />}
        {activeTab === 'gifts' && <GiftsTable gifts={gifts} />}
      </div>
    </div>
  );
}
