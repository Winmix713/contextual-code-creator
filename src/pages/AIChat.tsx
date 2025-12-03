import React from 'react';
import { AIChatInterface } from '@/components/ai-chat';

const AIChat: React.FC = () => {
  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="flex-1 overflow-hidden">
        <AIChatInterface />
      </div>
    </div>
  );
};

export default AIChat;
