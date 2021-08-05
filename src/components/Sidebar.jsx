import React, { useState, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import { Add16 } from '@carbon/icons-react'
import {
  SideNav,
  SideNavItems,
} from 'carbon-components-react/lib/components/UIShell'
import {
  Dropdown,
  Button,
  Checkbox,
  NumberInput,
} from 'carbon-components-react'
import { useRoomsContext } from './RoomContext'
import { useBuildings } from '../queries/RoomQueries'

const Sidebar = () => {
  const {
    setSelectedBuildingOptions,
    setHideUnavailableRooms,
    setSelectedOccupancy,
    setHideRoomsWithoutChalkBlackboard,
    setHideRoomsWithoutTV,
    setHideRoomsWithoutAudio,
    setHideRoomsWithoutProjector,
    setHideRoomsWithoutLargeBlackboard,
    setHideRoomsWithoutPrinter,
  } = useRoomsContext()

  const buildings = useBuildings()

  const [currentItem, setCurrentItem] = useState()
  const [
    isCheckedHideUnavailableRooms,
    setIsCheckedHideUnavailableRooms,
  ] = useState(false)
  const [currentOccupancy, setCurrentOccupancy] = useState(50)

  const [isCheckedChalkBlackboard, setIsCheckedChalkBlackboard] = useState(
    false,
  )
  const [isCheckedTV, setIsCheckedTV] = useState(false)
  const [isCheckedAudio, setIsCheckedAudio] = useState(false)
  const [isCheckedProjector, setIsCheckedProjector] = useState(false)
  const [isCheckedLargeBlackboard, setIsCheckedLargeBlackboard] = useState(
    false,
  )
  const [isCheckedPrinter, setIsCheckedPrinter] = useState(false)

  const history = useHistory()
  const navigateToCreate = useCallback(() => history.push('/create'), [history])

  return buildings.isLoading ? (
    'Loading...'
  ) : (
    <SideNav aria-label="Side navigation">
      <SideNavItems>
        <div className="demo-app-sidebar-section">
          <Button
            className="izveidot-button"
            renderIcon={Add16}
            iconDescription="Add"
            onClick={navigateToCreate}
          >
            Izveidot
          </Button>
        </div>
        <div className="demo-app-sidebar-section">
          <h4 style={{ fontWeight: 'bold' }}>Telpu filtri</h4>
        </div>
        <div className="demo-app-sidebar-section">
          <div style={{ width: 200 }}>
            <Dropdown
              id="default"
              titleText="Ēka"
              label="Izvēlieties ēku"
              items={buildings.data}
              itemToString={(item) => (item ? item.title : '')}
              onChange={({ selectedItem }) => {
                setCurrentItem(selectedItem)
                setSelectedBuildingOptions(selectedItem.id)
              }}
              selectedItem={currentItem}
            />
            {/* {console.log('items :>> ', items)}
            <MultiSelect
              id="default"
              titleText="Ēka"
              label="Izvēlieties ēku"
              items={items.data}
              itemToString={(item) => (item ? item.title : '')}
              onChange={(e) => {
                console.log('selectedItem', e.selectedItems)
                // setCurrentItem(selectedItem)
                setSelectedBuildingOptions(e.selectedItems)
              }}
              selectedItem={currentItem}
            /> */}
          </div>
        </div>
        <div className="demo-app-sidebar-section">
          <Checkbox
            labelText="Nerādīt telpas, kas ir aizņemtas tuvāko 2 stundu laikā"
            id="checkbox-label-1"
            checked={isCheckedHideUnavailableRooms}
            onChange={() => {
              setIsCheckedHideUnavailableRooms(!isCheckedHideUnavailableRooms)
              setHideUnavailableRooms(!isCheckedHideUnavailableRooms)
            }}
          />
        </div>
        <div className="demo-app-sidebar-section">
          <NumberInput
            id="numberInput"
            min={0}
            max={500}
            value={currentOccupancy || 0}
            label="Ietilpība (studentu skaits)"
            invalidText="Number is not valid"
            step={10}
            onChange={(evt) => {
              const newValue = evt.imaginaryTarget.valueAsNumber
              setCurrentOccupancy(newValue)
              setSelectedOccupancy(newValue)
            }}
          />
        </div>
        <div className="demo-app-sidebar-section">
          <legend>Telpas parametri</legend>
          <Checkbox
            labelText="Krīta tāfele"
            id="checkbox-label-2"
            checked={isCheckedChalkBlackboard}
            onChange={() => {
              setIsCheckedChalkBlackboard(!isCheckedChalkBlackboard)
              setHideRoomsWithoutChalkBlackboard(!isCheckedChalkBlackboard)
            }}
          />
          <Checkbox
            labelText="Televizors"
            id="checkbox-label-3"
            checked={isCheckedTV}
            onChange={() => {
              setIsCheckedTV(!isCheckedTV)
              setHideRoomsWithoutTV(!isCheckedTV)
            }}
          />
          <Checkbox
            labelText="Audio aprīkojums"
            id="checkbox-label-4"
            checked={isCheckedAudio}
            onChange={() => {
              setIsCheckedAudio(!isCheckedAudio)
              setHideRoomsWithoutAudio(!isCheckedAudio)
            }}
          />
          <Checkbox
            labelText="Projektors"
            id="checkbox-label-5"
            checked={isCheckedProjector}
            onChange={() => {
              setIsCheckedProjector(!isCheckedProjector)
              setHideRoomsWithoutProjector(!isCheckedProjector)
            }}
          />
          <Checkbox
            labelText="XL tāfele"
            id="checkbox-label-6"
            checked={isCheckedLargeBlackboard}
            onChange={() => {
              setIsCheckedLargeBlackboard(!isCheckedLargeBlackboard)
              setHideRoomsWithoutLargeBlackboard(!isCheckedLargeBlackboard)
            }}
          />
          <Checkbox
            labelText="Printeris"
            id="checkbox-label-7"
            checked={isCheckedPrinter}
            onChange={() => {
              setIsCheckedPrinter(!isCheckedPrinter)
              setHideRoomsWithoutPrinter(!isCheckedPrinter)
            }}
          />
        </div>
      </SideNavItems>
    </SideNav>
  )
}

export default Sidebar
