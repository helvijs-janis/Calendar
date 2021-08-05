import React from 'react'
import ReactDOM from 'react-dom'
import '../styles/modal.scss'
import { ComposedModal, ModalHeader, ModalBody } from 'carbon-components-react'
import { useMutation, useQueryClient } from 'react-query'
import { createReservation } from '../queries/RoomQueries'
import ModalCreateForm from './ModalCreateForm'

const ModalReservation = ({
  open,
  setOpen,
  navigateToCreate,
  dateInfo,
  buildings,
}) => {
  const queryClient = useQueryClient()

  const { mutateAsync, isLoading } = useMutation(createReservation)

  const onFormSubmit = async (data) => {
    await mutateAsync({ ...data })
    queryClient.invalidateQueries('reservations')
    setOpen(false)
  }

  if (open) {
    return (
      Object.keys(dateInfo).length > 0 &&
      ReactDOM.createPortal(
        <>
          <ComposedModal
            containerClassName="pievienot-modal"
            open={open}
            onClose={() => setOpen(false)}
            size="md"
          >
            <ModalHeader title="Pievienot jaunu notikumu" />
            <ModalBody>
              <ModalCreateForm
                navigateToCreate={navigateToCreate}
                dateInfo={dateInfo}
                onFormSubmit={onFormSubmit}
                isLoading={isLoading}
                buildings={buildings}
              />
            </ModalBody>
          </ComposedModal>
        </>,
        document.body,
      )
    )
  }
  return null
}

export default ModalReservation
