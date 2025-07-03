import { RouteObject } from 'react-router-dom';
import Appointments from '@/pages/Appointments';
import AppointmentBooking from '@/pages/AppointmentBooking';
import GroupBooking from '@/pages/GroupBooking';
import EventCalendar from '@/pages/EventCalendar';
import ChatPage from '@/pages/ChatPage';
import DisputeCenter from '@/pages/DisputeCenter';
import EscrowStatus from '@/pages/EscrowStatus';
import AutomaticRefund from '@/pages/AutomaticRefund';
import InvoiceGenerator from '@/pages/InvoiceGenerator';
import CommissionCalculator from '@/pages/CommissionCalculator';
import ContactOwner from '@/pages/ContactOwner';
import Wish2Earn from '@/pages/Wish2Earn';

export const specialRoutes: RouteObject[] = [
  {
    path: "appointments",
    element: <Appointments />,
  },
  {
    path: "appointment-booking",
    element: <AppointmentBooking />,
  },
  {
    path: "group-booking",
    element: <GroupBooking />,
  },
  {
    path: "event-calendar",
    element: <EventCalendar />,
  },
  {
    path: "chat/:userId",
    element: <ChatPage />,
  },
  {
    path: "dispute-center",
    element: <DisputeCenter />,
  },
  {
    path: "escrow-status",
    element: <EscrowStatus />,
  },
  {
    path: "automatic-refund",
    element: <AutomaticRefund />,
  },
  {
    path: "invoice-generator",
    element: <InvoiceGenerator />,
  },
  {
    path: "commission-calculator",
    element: <CommissionCalculator />,
  },
  {
    path: "contact-owner",
    element: <ContactOwner />,
  },
  {
    path: "wish2earn",
    element: <Wish2Earn />,
  },
];