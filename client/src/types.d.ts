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

interface TicketTableRowProps {
  ticket: Ticket;
  setModalTicket: React.Dispatch<React.SetStateAction<Ticket | undefined>>;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
};

interface StatusSelectProps {
  ticket: Ticket;
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