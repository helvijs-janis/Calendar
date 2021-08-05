import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TextInput, Dropdown, Button } from 'carbon-components-react'
import { Location24, Time24 } from '@carbon/icons-react'
import Loader from 'react-loader-spinner'
import {
  formatDate,
  formatRoomInfo,
  formatToDbDateString,
  formatDateAddingHourAndHalf,
} from './utils'
import { fetchPersons } from '../queries/RoomQueries'

const ModalCreateForm = ({
  onFormSubmit,
  dateInfo,
  navigateToCreate,
  isLoading,
  buildings,
}) => {
  const [responsible, setResponsible] = useState('')
  const persons = fetchPersons()

  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: '',
      start: formatToDbDateString(dateInfo),
      end: formatDateAddingHourAndHalf(dateInfo),
      responsiblePersonId: null,
      resourceId: dateInfo.resource.id,
    },
  })

  const onSubmit = handleSubmit((data) => {
    onFormSubmit(data)
  })

  return (
    !persons.isLoading && (
      <form onSubmit={onSubmit}>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <div style={{ marginBottom: '1rem' }}>
              <TextInput
                {...field}
                data-modal-primary-focus
                className="nosaukums-input"
                id="text-input-2"
                labelText="Nosaukums"
                placeholder="Ievadiet nosaukumu"
              />
            </div>
          )}
        />
        <div className="parent" style={{ marginBottom: '1rem' }}>
          <>
            <Time24 className="modal-icon" />
            <span style={{ marginLeft: '0.5rem' }}>{formatDate(dateInfo)}</span>
          </>
        </div>
        <div className="parent" style={{ marginBottom: '1rem' }}>
          <>
            <Location24 className="modal-icon" />
            <span style={{ marginLeft: '0.5rem' }}>
              {formatRoomInfo(dateInfo, buildings)}
            </span>
          </>
        </div>
        <Controller
          control={control}
          name="responsiblePersonId"
          render={({ field }) => (
            <div style={{ marginBottom: '1rem' }}>
              <Dropdown
                {...field}
                className="atbildigais-input"
                id="default"
                titleText="Atbildīgais"
                label="Izvēlieties"
                items={persons.data}
                itemToString={(item) => (item ? item.fullname : '')}
                onChange={({ selectedItem }) => {
                  setResponsible(selectedItem)
                }}
                selectedItem={responsible}
              />
            </div>
          )}
        />
        <div>
          <>
            <Button
              type="submit"
              size="sm"
              className="pievienot-button"
              iconDescription="Add"
            >
              {isLoading ? (
                <Loader type="ThreeDots" color="#fff" height={10} />
              ) : (
                'Pievienot'
              )}
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
    )
  )
}

export default ModalCreateForm
