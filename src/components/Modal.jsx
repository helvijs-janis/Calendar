import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import '../styles/modal.scss';
import {
  ComposedModal, ModalHeader, ModalBody, TextInput, Button, Dropdown,
} from 'carbon-components-react';
import { Location24, Time24 } from '@carbon/icons-react';
import {
  formatDate, formatRoomInfo, formatToDbDateString, formatDateAddingHourAndHalf,
} from './utils';
import { fetchPersons } from '../queries/RoomQueries';

const Modal = ({
  open, setOpen, navigateToCreate, dateInfo,
}) => {
  const [title, setTitle] = useState('');
  const [responsible, setResponsible] = useState('');
  const persons = fetchPersons();

  const handleSubmit = (e) => {
    e.preventDefault();
    const resourceId = dateInfo.resource.id;
    const start = formatToDbDateString(dateInfo);
    const end = formatDateAddingHourAndHalf(dateInfo);
    const responsiblePersonId = responsible.id;
    const reservation = {
      title, resourceId, start, end, responsiblePersonId,
    };
    console.log(reservation);
  };

  if (open) {
    return ReactDOM.createPortal(
      <>
        <ComposedModal
          containerClassName="pievienot-modal"
          open={open}
          onClose={() => setOpen(false)}
          size="md"
        >
          <ModalHeader title="Pievienot jaunu notikumu" />
          <ModalBody>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <TextInput
                  data-modal-primary-focus
                  className="nosaukums-input"
                  id="text-input-2"
                  labelText="Nosaukums"
                  placeholder="Ievadiet nosaukumu"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="parent" style={{ marginBottom: '1rem' }}>
                <>
                  <Time24 className="modal-icon" />
                  {/* Checks whether the dateInfo object is not empty */}
                  <span style={{ marginLeft: '0.5rem' }}>{Object.keys(dateInfo).length > 0 && formatDate(dateInfo)}</span>
                </>
              </div>
              <div className="parent" style={{ marginBottom: '1rem' }}>
                <>
                  <Location24 className="modal-icon" />
                  <span style={{ marginLeft: '0.5rem' }}>{Object.keys(dateInfo).length > 0 && formatRoomInfo(dateInfo)}</span>
                </>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                {/* <TextInput
                  className="atbildigais-input"
                  id="text-input-3"
                  labelText="Atbildīgais"
                  placeholder="Izvēlieties"
                  value={responsible}
                  onChange={(e) => setResponsible(e.target.value)}
                /> */}
                <Dropdown
                  className="atbildigais-input"
                  id="default"
                  titleText="Atbildīgais"
                  label="Izvēlieties"
                  items={persons.data}
                  itemToString={(item) => (item ? item.fullname : '')}
                  onChange={({ selectedItem }) => {
                    setResponsible(selectedItem);
                  }}
                  selectedItem={responsible}
                />
              </div>
              <div>
                <>
                  <Button
                    type="submit"
                    size="sm"
                    className="pievienot-button"
                    iconDescription="Add"
                  >
                    Pievienot
                  </Button>
                  <Button
                    kind="ghost"
                    size="sm"
                    className="info-button"
                    iconDescription="Info"
                    onClick={navigateToCreate}
                  >
                    Vairāk info
                  </Button>
                </>
              </div>
            </form>
          </ModalBody>
        </ComposedModal>
      </>, document.body,
    );
  } return null;
};

export default Modal;
