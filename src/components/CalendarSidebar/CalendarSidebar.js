import React from 'react';
import { Grid, Row, Column, Accordion, AccordionItem, Dropdown, TextInput, Button, Checkbox, NumberInput } from 'carbon-components-react';
import { Add16 } from '@carbon/icons-react';
import './CalendarSidebar.css'

const CalendarSidebar = () => {
    return (
        <div className='sidebar'>
            <div className='demo-app-sidebar-section'>
                <Button className="izveidot-button" renderIcon={Add16} iconDescription="Add">Izveidot</Button>
            </div>
            <div className='demo-app-sidebar-section'>
                <h4 style={{ fontWeight: 'bold' }} >Telpu filtri</h4>
            </div>
            <div className='demo-app-sidebar-section'>
                <Dropdown
                    id="default"
                    titleText="Ēka"
                    label="DAC"
                />
            </div>
            <div className='demo-app-sidebar-section'>
                <Checkbox labelText={`Nerādīt telpas, kas ir aizņemtas tuvāko 2 stundu laikā`} id="checkbox-label-1" />
            </div>
            <div className='demo-app-sidebar-section'>
                <NumberInput
                    min={0}
                    max={1000}
                    value={50}
                    label="Ietilpība (studentu skaits)"
                    invalidText="Number is not valid"
                />
            </div>
            <div className='demo-app-sidebar-section'>
                <legend >Telpas parametri</legend>
                <Checkbox labelText={`XL tāfele`} id="checkbox-label-2" />
                <Checkbox labelText={`Krīta tāfele`} id="checkbox-label-3" />
                <Checkbox labelText={`Datori`} id="checkbox-label-4" />
                <Checkbox labelText={`Projektors`} id="checkbox-label-5" />
            </div>
        </div>
    )
}

export default CalendarSidebar;