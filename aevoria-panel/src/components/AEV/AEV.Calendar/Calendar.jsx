import React, { useState } from "react";
import { Calendar as BigCalendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Calendar.scss";

import Modal from "../AEV.Modal/Modal";
import TextInput from "../AEV.TextInput/TextInput";
import Button from "../AEV.Button/Button"; // Corrige le chemin si nécessaire

const localizer = momentLocalizer(moment);

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [view, setView] = useState(Views.WEEK);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
  });

  const handleSelectSlot = (slotInfo) => {
    const now = new Date();
    if (slotInfo.start < now) return;

    setSelectedSlot({
      start: slotInfo.start,
      end: slotInfo.end || moment(slotInfo.start).add(1, "hour").toDate(),
    });

    setModalOpen(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setDeleteModal(true);
  };

  const handleCreateEvent = () => {
    const newEvent = {
      title: formData.title,
      start: selectedSlot.start,
      end: selectedSlot.end,
      location: formData.location,
      description: formData.description,
    };

    setEvents([...events, newEvent]);
    setFormData({ title: "", location: "", description: "" });
    setModalOpen(false);
  };

  const handleDeleteEvent = () => {
    setEvents(events.filter((e) => e !== selectedEvent));
    setDeleteModal(false);
  };

  return (
    <div className="aev-calendar-container">
      <h2>Calendrier des Rendez-vous</h2>

      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable={true}
        popup
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        style={{ height: "calc(100vh - 140px)" }}
        views={["month", "week", "day"]}
        view={view}
        onView={(newView) => setView(newView)}
        step={30}
        timeslots={2}
        messages={{
          today: "Aujourd'hui",
          next: "Suivant",
          previous: "Retour",
          month: "Mois",
          week: "Semaine",
          day: "Jour",
        }}
      />

      {modalOpen && (
        <Modal title="Ajouter un rendez-vous" onClose={() => setModalOpen(false)}>
          <TextInput
            label="Nom du rendez-vous"
            placeholder="Entrez un titre"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
          <TextInput
            label="Lieu"
            placeholder="Entrez le lieu"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
          <TextInput
            label="Description"
            placeholder="Entrez une description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
          <div className="calendar-modal-footer">
            <Button text="Annuler" variant="transparent" onClick={() => setModalOpen(false)} />
            <Button text="Enregistrer" variant="primary" onClick={handleCreateEvent} />
          </div>
        </Modal>
      )}

      {deleteModal && (
        <Modal title="Supprimer ce rendez-vous ?" onClose={() => setDeleteModal(false)}>
          <p>Voulez-vous vraiment supprimer ce rendez-vous ?</p>
          <div className="calendar-modal-footer">
            <Button text="Annuler" variant="transparent" onClick={() => setDeleteModal(false)} />
            <Button text="Supprimer" variant="danger" onClick={handleDeleteEvent} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Calendar;
