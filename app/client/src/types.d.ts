interface Ticket {
  id: number;
  name: string;
  email: string;
  description: string;
  status: string;
  date_created: Date;
  date_updated: Date;
  [key: string]: any
};

interface StatusMap {
  'new': number;
  'in_progress': number;
  'resolved': number;
}

interface TicketTableRowProps {
  ticket: Ticket;
  setModalTicket: React.Dispatch<React.SetStateAction<Ticket | undefined>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
  sortStatusAfterUpdating: () => void;
};

interface StatusSelectProps {
  ticket: Ticket;
  sortStatusAfterUpdating: () => void;
};

interface Message {
  id: number,
  user_id: number
  author: string,
  content: string,
};

interface MessageModalProps {
  modalTicket: Ticket | undefined;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
};