import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Users, X, Search, Plus } from 'lucide-react';
import { ChatList } from './ChatList';
import { ChatWindow } from './ChatWindow';
import { GroupChat } from './GroupChat';
import { CreateGroupDialog } from './CreateGroupDialog';

interface MessengerPanelProps {
  onClose: () => void;
  embedded?: boolean;
}

export const MessengerPanel: React.FC<MessengerPanelProps> = ({ onClose, embedded = false }) => {
  const [activeTab, setActiveTab] = useState('chats');
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [showCreateGroup, setShowCreateGroup] = useState(false);

  if (embedded) {
    return (
      <div className="flex flex-col h-full">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mx-4 mb-2">
            <TabsTrigger value="chats" className="text-xs">চ্যাট</TabsTrigger>
            <TabsTrigger value="community" className="text-xs">কমিউনিটি</TabsTrigger>
            <TabsTrigger value="groups" className="text-xs">গ্রুপ</TabsTrigger>
          </TabsList>

          <TabsContent value="chats" className="flex-1 mt-0">
            {!selectedChat ? (
              <ChatList 
                type="direct"
                onSelectChat={setSelectedChat}
              />
            ) : (
              <ChatWindow 
                chat={selectedChat}
                onBack={() => setSelectedChat(null)}
              />
            )}
          </TabsContent>

          <TabsContent value="community" className="flex-1 mt-0">
            {!selectedChat ? (
              <ChatList 
                type="community"
                onSelectChat={setSelectedChat}
              />
            ) : (
              <ChatWindow 
                chat={selectedChat}
                onBack={() => setSelectedChat(null)}
              />
            )}
          </TabsContent>

          <TabsContent value="groups" className="flex-1 mt-0">
            {!selectedChat ? (
              <GroupChat onSelectChat={setSelectedChat} />
            ) : (
              <ChatWindow 
                chat={selectedChat}
                onBack={() => setSelectedChat(null)}
              />
            )}
          </TabsContent>
        </Tabs>

        <CreateGroupDialog 
          open={showCreateGroup}
          onOpenChange={setShowCreateGroup}
        />
      </div>
    );
  }

  return (
    <Card className="w-full h-full md:w-96 md:h-[600px] shadow-xl border-l-4 border-primary bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <MessageSquare className="h-5 w-5 text-primary" />
          মেসেঞ্জার
          <div className="ml-auto flex items-center gap-1">
            <Button
              onClick={() => setShowCreateGroup(true)}
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0"
              title="গ্রুপ তৈরি করুন"
            >
              <Plus className="h-3 w-3" />
            </Button>
            <Button
              onClick={onClose}
              size="sm"
              variant="ghost"
              className="h-7 w-7 p-0"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0 flex flex-col h-[calc(100%-100px)] md:h-[500px]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mx-4 mb-2">
            <TabsTrigger value="chats" className="text-xs">চ্যাট</TabsTrigger>
            <TabsTrigger value="community" className="text-xs">কমিউনিটি</TabsTrigger>
            <TabsTrigger value="groups" className="text-xs">গ্রুপ</TabsTrigger>
          </TabsList>

          <TabsContent value="chats" className="flex-1 mt-0">
            {!selectedChat ? (
              <ChatList 
                type="direct"
                onSelectChat={setSelectedChat}
              />
            ) : (
              <ChatWindow 
                chat={selectedChat}
                onBack={() => setSelectedChat(null)}
              />
            )}
          </TabsContent>

          <TabsContent value="community" className="flex-1 mt-0">
            {!selectedChat ? (
              <ChatList 
                type="community"
                onSelectChat={setSelectedChat}
              />
            ) : (
              <ChatWindow 
                chat={selectedChat}
                onBack={() => setSelectedChat(null)}
              />
            )}
          </TabsContent>

          <TabsContent value="groups" className="flex-1 mt-0">
            {!selectedChat ? (
              <GroupChat onSelectChat={setSelectedChat} />
            ) : (
              <ChatWindow 
                chat={selectedChat}
                onBack={() => setSelectedChat(null)}
              />
            )}
          </TabsContent>
        </Tabs>

        <CreateGroupDialog 
          open={showCreateGroup}
          onOpenChange={setShowCreateGroup}
        />
      </CardContent>
    </Card>
  );
};