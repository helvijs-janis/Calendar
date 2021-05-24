import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/modal.scss';
import {
  ComposedModal, ModalHeader, ModalBody, TextInput, Button,
} from 'carbon-components-react';
import { Location24, Time24 } from '@carbon/icons-react';
import { formatDate, formatRoomInfo } from './utils';

const Modal = ({
  open, setOpen, navigateToCreate, dateInfo,
}) => (open ? ReactDOM.createPortal(
  <>
    <ComposedModal
      containerClassName="pievienot-modal"
      open={open}
      onClose={() => setOpen(false)}
      size="md"
    >
      <ModalHeader title="Pievienot jaunu notikumu" />
      <ModalBody>
        <div style={{ marginBottom: '1rem' }}>
          <TextInput
            data-modal-primary-focus
            className="nosaukums-input"
            id="text-input-2"
            labelText="Nosaukums"
            placeholder="Ievadiet nosaukumu"
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
          <TextInput
            className="atbildigais-input"
            id="text-input-3"
            labelText="Atbildīgais"
            placeholder="Izvēlieties"
          />
        </div>
        <div>
          <>
            <Button
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
      </ModalBody>
    </ComposedModal>
  </>, document.body,
) : null);

export default Modal;
