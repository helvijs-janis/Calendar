import React from 'react';
import { Grid, Row, Column, Accordion, AccordionItem, Dropdown, TextInput } from 'carbon-components-react';
import './TopFilter.css';

const TopFilter = () => {
    return (
        <Accordion >
            <AccordionItem title="Pasākuma filtri">
                <Grid>
                    <Row>
                        <Column lg={4}>
                            <div>
                                <Dropdown
                                    id="default"
                                    titleText="Studiju programma"
                                    label="Ģeogrāfija"
                                // items={items}
                                // itemToString={(item) => (item ? item.text : '')}
                                // onChange={action('onChange')}
                                />
                            </div>
                        </Column>
                        <Column lg={4}>
                            <div>
                                <Dropdown
                                    id="default"
                                    titleText="Kurss"
                                    label="1."
                                // items={items}
                                // itemToString={(item) => (item ? item.text : '')}
                                // onChange={action('onChange')}
                                />
                            </div>
                        </Column>
                        <Column lg={4}>
                            <div>
                                <TextInput
                                    id="text-input-1"
                                    labelText="Priekšmets"
                                    placeholder="Praktiskā ekoloģija"
                                />
                            </div>
                        </Column>
                    </Row>
                </Grid>
            </AccordionItem>
        </Accordion>
    )
}

export default TopFilter;