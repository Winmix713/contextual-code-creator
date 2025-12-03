import React from 'react';
import { AIChatInterface } from '@/components/ai-chat';
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

const AIChat: React.FC = () => {
  useDocumentTitle("AI Chat");

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex-1 overflow-hidden">
        <AIChatInterface />
      </div>
    </div>
  );
};

export default AIChat;
