'use client';

import { useState } from 'react';
import { RSVPData, MessageData, GiftData } from '@/lib/supabase';
import RSVPTable from './RSVPTable';
import MessagesTable from './MessagesTable';
import GiftsTable from './GiftsTable';
import { Button } from "@/components/ui/button"

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
      <div className="border-b border-gray-200 mb-6">
        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
          <li className="mr-2">
            <Button
              onClick={() => setActiveTab('rsvp')}
              className={`${
                activeTab === 'rsvp'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-foreground'
              } px-4 py-2 rounded-md`}
            >
              Confirmações de Presença
              <span className="ml-2 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {rsvps.length}
              </span>
            </Button>
          </li>
          <li className="mr-2">
            <Button
              onClick={() => setActiveTab('messages')}
              className={`${
                activeTab === 'messages'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-foreground'
              } px-4 py-2 rounded-md`}
            >
              Mensagens
              <span className="ml-2 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {messages.length}
              </span>
            </Button>
          </li>
          <li className="mr-2">
            <Button
              onClick={() => setActiveTab('gifts')}
              className={`${
                activeTab === 'gifts'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-transparent text-foreground'
              } px-4 py-2 rounded-md`}
            >
              Presentes
              <span className="ml-2 bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded">
                {gifts.length}
              </span>
            </Button>
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
