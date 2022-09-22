import { FormEvent } from "react";

type TicketType = {
  // généré automatiquement si base de données
  id: number;
  date: Date;
  article: string;
  price: number;
};

type props = {
  ticket: TicketType | null;
  TicketsList: TicketType[];
  setTicketsList: (tickets: TicketType[]) => void;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  allTimeTotal: () => number;
  monthTotal: () => number;
};

const Modal = ({
  ticket,
  TicketsList,
  setTicketsList,
  setOpen,
  allTimeTotal,
  monthTotal,
}: props) => {
  const fetchTickets = async () => {
    let res = await fetch(process.env.REACT_APP_DBURL + "/tickets");
    let tickets = await res.json();
    setTicketsList(tickets);
  };

  const createTicket = async (ticket: TicketType) => {
    // la date doit être unique, on mettra une constraint unique sur la date dans la DB
    let notUniqueDate = TicketsList?.some(
      (t: TicketType) =>
        Date.parse(t.date.toString()) === Date.parse(ticket.date.toString())
    );

    if (notUniqueDate) {
      window.alert("date must be unique");
      console.log("date not unique");
      return;
    }

    await fetch(process.env.REACT_APP_DBURL + "/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ticket),
    })
      .then(() => {
        console.log("ticket created ✅");
        fetchTickets();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const create = (e: any) => {
    e.preventDefault();
    let ticket = e.target;

    // la date doit être unique, on mettra une constraint unique sur la date dans la DB
    let notUniqueDate = TicketsList?.some(
      (t: TicketType) =>
        Date.parse(t.date.toString()) === Date.parse(ticket.date.value)
    );

    if (notUniqueDate) {
      window.alert("date must be unique");
      console.log("date not unique");
      return;
    }

    let id = TicketsList.length + 1;

    let newticket: TicketType = {
      id: id,
      date: new Date(ticket.date.value),
      article: ticket.article.value,
      price: parseFloat(ticket.price.value),
    };
    TicketsList?.push(newticket);
    allTimeTotal();
    monthTotal();
    setOpen(false);
  };
  const updateTicket = (id: number, newticket: TicketType) => {
    // pour valider la date unique on doit exclure le ticket actuel de la verificatino si l'on souhaite laisser la même date
    let excludeOldTicketList = TicketsList?.filter(
      (t: TicketType) => t.id !== id
    );
    // validation de la contrainte d'unicité de la date
    let notUniqueDate = excludeOldTicketList?.some(
      (t: TicketType) =>
        Date.parse(t.date.toString()) === Date.parse(newticket.date.toString())
    );

    if (notUniqueDate) {
      window.alert("date must be unique");
      console.log("date not unique");
      return;
    }

    fetch(process.env.REACT_APP_DBURL + "/tickets/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newticket),
    })
      .then(() => {
        console.log("ticket updated ✅");
        fetchTickets();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const update = (id: number, e: any) => {
    e.preventDefault();
    let data = e.target;

    // pour valider la date unique on doit exclure le ticket actuel de la verificatino si l'on souhaite laisser la même date
    let excludeOldTicketList = TicketsList?.filter(
      (t: TicketType) => t.id !== id
    );
    // validation de la contrainte d'unicité de la date
    let notUniqueDate = excludeOldTicketList?.some(
      (t: TicketType) =>
        Date.parse(t.date.toString()) === Date.parse(data.date.value)
    );

    if (notUniqueDate) {
      window.alert("date must be unique");
      console.log("date not unique");
      return;
    }

    let oldticket = TicketsList?.findIndex((t: TicketType) => t.id === id);

    TicketsList[oldticket].date = new Date(data.date.value);
    TicketsList[oldticket].article = data.article.value;
    TicketsList[oldticket].price = parseFloat(data.price.value);

    allTimeTotal();
    monthTotal();
    setOpen(false);
  };

  const formatDate = (d: Date | string) => {
    let date = new Date(d);
    return date.toISOString().split("T")[0];
  };

  return (
    <div className="absolute top-1/3 right-0 left-0 z-50 w-3/4 m-auto h-modal">
      <div className="relative rounded-md shadow-lg bg-gray-100 py-5">
        <button
          className="absolute top-3 right-3 p-2 rounded-xl"
          onClick={() => setOpen(false)}
        >
          ❌
        </button>
        <h2 className="mb-5">{ticket ? "Update ticket" : "Create ticket"}</h2>
        <form
          onSubmit={(e) => (ticket ? update(ticket.id, e) : create(e))}
          className="flex flex-col w-3/4 mx-auto"
        >
          <label htmlFor="article">Article</label>
          <input
            type="text"
            name="article"
            id="article"
            defaultValue={ticket?.article}
          />
          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            id="date"
            defaultValue={ticket && formatDate(ticket.date)}
          />
          <label htmlFor="price">Price</label>
          <input
            type="number"
            name="price"
            id="price"
            defaultValue={ticket?.price}
          />
          <input
            type="submit"
            value="✅"
            className="p-2 rounded-xl bg-green-200 cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
