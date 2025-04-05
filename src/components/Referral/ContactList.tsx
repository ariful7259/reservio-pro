
import React from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Send, Mail, Phone } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: string;
}

interface ContactListProps {
  contacts: Contact[];
  onInvite: (id: string) => void;
  onDelete: (id: string) => void;
  isSubmitting: boolean;
  getStatusBadge: (status: string) => React.ReactNode;
}

const ContactList: React.FC<ContactListProps> = ({ 
  contacts, 
  onInvite, 
  onDelete, 
  isSubmitting, 
  getStatusBadge 
}) => {
  if (contacts.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        কোনো কন্টাক্ট নেই
      </div>
    );
  }
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-secondary/20">
          <tr>
            <th className="text-left p-3 text-sm font-medium">নাম</th>
            <th className="text-left p-3 text-sm font-medium">ইমেইল</th>
            <th className="text-left p-3 text-sm font-medium">ফোন</th>
            <th className="text-left p-3 text-sm font-medium">স্ট্যাটাস</th>
            <th className="text-left p-3 text-sm font-medium">অ্যাকশন</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {contacts.map((contact) => (
            <tr key={contact.id} className="hover:bg-secondary/5">
              <td className="p-3">{contact.name}</td>
              <td className="p-3 flex items-center gap-1">
                <Mail className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm">{contact.email}</span>
              </td>
              <td className="p-3 flex items-center gap-1">
                <Phone className="h-3 w-3 text-muted-foreground" />
                <span className="text-sm">{contact.phone}</span>
              </td>
              <td className="p-3">{getStatusBadge(contact.status)}</td>
              <td className="p-3">
                <div className="flex items-center gap-2">
                  {contact.status === 'pending' && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 gap-1"
                      disabled={isSubmitting}
                      onClick={() => onInvite(contact.id)}
                    >
                      <Send className="h-3 w-3" />
                      <span className="text-xs">ইনভাইট</span>
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="h-8 gap-1 text-red-600 hover:text-red-700 hover:bg-red-50"
                    disabled={isSubmitting}
                    onClick={() => onDelete(contact.id)}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
