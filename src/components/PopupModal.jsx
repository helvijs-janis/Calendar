/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-fragments */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint linebreak-style: ["error","windows"] */
import {
  React,
  Component,
  useState,
  action,
  selectProps,
  reactHooks,
  Autocomplete,
  TextField,
} from 'react';
import ReactDOM from 'react-dom';
import {
  Button,
  Modal,
  ComposedModal,
  ModalHeader,
  DatePicker,
  DatePickerInput,
  Tab,
  Tabs,
  Dropdown,
  RadioButton,
  RadioButtonGroup,
  ModalFooter,
  ModalBody,
  TextInput,
  TimePicker,
  TimePickerSelect,
  SelectItem,
  Grid,
  Row,
  Column,
  Form,
  FormGroup,
  MultiSelect,
  Checkbox,
  ToolbarItem,
} from 'carbon-components-react';
import {
  withKnobs,
  boolean,
  number,
  select,
  text,
  object,
} from '@storybook/addon-knobs';

const directions = {
  'Bottom (default)': 'bottom',
  'Top ': 'top',
};

const sizes = {
  'Extra large size (xl)': 'xl',
  'Default size': undefined,
  'Small size (sm)': 'sm',
};

const defaultLabel = 'MultiSelect Label';
const defaultPlaceholder = 'Filter';

const types = {
  'Default (default)': 'default',
  'Inline (inline)': 'inline',
};
function getMeADate(dateStr, time) {
  // YYYY-MM-DDTHH:mm:ss
  const date = new Date(dateStr);
  let vartime = time;
  if (time.length === 4) {
    vartime = `0${time}`;
  }
  console.log(`${date} ${dateStr}`);
  const aPrettyDate = `${dateStr}T${time}:00`;// date.year + "-" + date.month + "-" + date.day + "T" + time + ":00";
  return aPrettyDate;
}
function httpGet(theUrl) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open('GET', theUrl, false);
  xmlHttp.send();
  return JSON.parse(xmlHttp.responseText);
}
function httpPost2(theUrl, data) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open('POST', theUrl, true);
  xmlHttp.send(JSON.stringify(data));
}
const props = {
  timepicker: () => ({
    pattern: text(
      '(1[012]|[1-9]):[0-5][0-9](\\s)?',
    ),
    placeholder: text(
      'Placeholder text (placeholder in <TimePicker>)',
      'hh:mm',
    ),
    disabled: boolean('Disabled (disabled in <TimePicker>)', false),
    light: boolean('Light variant (light in <TimePicker>)', false),
    labelText: text('Label text (labelText in <TimePicker>)', ''),
    invalid: boolean(
      'Show form validation UI (invalid in <TimePicker>)',
      false,
    ),
    invalidText: text(
      'Form validation UI content (invalidText in <TimePicker>)',
      'A valid value is required',
    ),
    maxLength: number('Maximum length (maxLength in <TimePicker>)', 5),
    size: select('Field size (size)', sizes, undefined) || undefined,
  }),
  select: () => ({
    disabled: boolean('Disabled (disabled in <TimePickerSelect>)', false),
    labelText: text(
      'Label text (labelText in <TimePickerSelect>)',
      'Please select',
    ),
    iconDescription: text(
      'Trigger icon description (iconDescription in <TimePickerSelect>)',
      'open list of options',
    ),
  }),
};

const items = [
  {
    id: 'option-0',
    text:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vitae, aliquam. Blanditiis quia nemo enim voluptatibus quos ducimus porro molestiae nesciunt error cumque quaerat, tempore vero unde eum aperiam eligendi repellendus.',
  },
  {
    id: 'option-1',
    text: 'Option 1',
  },
  {
    id: 'option-2',
    text: 'Option 2',
  },
  {
    id: 'option-3',
    text: 'Option 3',
  },
  {
    id: 'option-4',
    text: 'Option 4',
  },
  {
    id: 'option-5',
    text: 'Option 5',
  },
];
const profesori = [
  {
    id: 0,
    text: 'Imants Gorbāns',
  },
  {
    id: 1,
    text: 'Imants Gorbāns',
  },
  {
    id: 2,
    text: 'Imants Gorbāns',
  },
  {
    id: 3,
    text: 'Imants Gorbāns',
  },
  {
    id: 4,
    text: 'Imants Gorbāns',
  },
  {
    id: 5,
    text: 'Imants Gorbāns',
  },
];
export default function PopupModal() {
  let eka;
  let telpa;
  let fakultate;
  let atbildigais;
  const [open, setOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState();
  const [inputText, setInputText] = useState('');
  const [historyList, setHistoryList] = useState([]);
  const handleSelectEka = (e) => {
    eka = e.selectedItem.id;
    // console.log(e.selectedItem.id);
    // console.log(eka)
  };
  const handleSelectTelpa = (e) => {
    // console.log(e);
    telpa = e.selectedItem.id;
    // console.log(e.selectedItem.id);
    // console.log(telpa)
  };
  const handleSelectFakultate = (e) => {
    // console.log(e);
    fakultate = e.selectedItem.id;
    // console.log(e.selectedItem.id);
    // console.log(fakultate)
  };

  return (
    <>
      {typeof document === 'undefined'
        ? null
        : ReactDOM.createPortal(
          <ComposedModal
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
            open={open}
            onClose={() => setOpen(false)}
            size="lg"
          >
            <ModalHeader />
            <ModalBody hasScrollingContent hasForm>
              <Form>
                <h1>Jauns notikums</h1>
                <FormGroup>
                  <TextInput
                    required
                    id="NosaukumaIevade"
                    labelText="Nosaukums"
                  />
                </FormGroup>
                <br />
                <br />
                <h7>Atkārtošanās</h7>
                <FormGroup>
                  <RadioButtonGroup
                    legendText="Radio button heading"
                    name="radio-button-group"
                    defaultSelected="radio-1"
                  >
                    <RadioButton labelText="Nav" value="radio-1" id="navAtkartosanas" />
                    <RadioButton labelText="Ir" value="radio-2" id="irAtkartosanas" />
                  </RadioButtonGroup>
                </FormGroup>
                <br />
                {/* Sākās laika un datuma ievade control+k+c vai control+? */}
                <Grid narrow>
                  <Row>
                    <Column>
                      <Grid>
                        <Row>
                          <Column>
                            <h7>No</h7>
                          </Column>
                        </Row>
                        <Row>
                          <Column sm={6} md={9}>
                            <FormGroup>
                              <DatePicker datePickerType="single" dateFormat="Y-m-d" locale="lv" labelText="label">
                                <DatePickerInput
                                  required
                                  placeholder="yyyy-mm-dd"
                                  labelText=""
                                  id="sakumaDatums"
                                />
                              </DatePicker>
                            </FormGroup>
                          </Column>
                          <Column sm={1} md={2}>
                            <FormGroup>
                              <TimePicker id="sakumaLaiks" labelText="label" {...props.timepicker()} />
                            </FormGroup>
                          </Column>
                        </Row>
                      </Grid>
                    </Column>
                    <Column>
                      <Grid>
                        <Row>
                          <Column>
                            <h7>Līdz</h7>
                          </Column>
                        </Row>
                        <Row>
                          <Column sm={1} md={2}>
                            <FormGroup>
                              <TimePicker id="beiguLaiks" {...props.timepicker()} />
                            </FormGroup>
                          </Column>
                          <Column sm={6} md={9}>
                            <FormGroup>
                              <DatePicker datePickerType="single" dateFormat="Y-m-d" locale="lv">
                                <DatePickerInput
                                  required
                                  placeholder="yyyy-mm-dd"
                                  labelText=""
                                  id="beiguDatums"
                                />
                              </DatePicker>
                            </FormGroup>
                          </Column>
                        </Row>
                      </Grid>
                    </Column>
                  </Row>
                </Grid>
                {/* Beidzās laika un datuma ievade */}
                <div>
                  <Grid>
                    <Row>
                      <Column size={4}>
                        <FormGroup>
                          <Dropdown
                            required
                            id="default"
                            titleText="Ēka"
                            label="Dropdown menu options"
                            items={httpGet('https://tone.id.lv/api/buildings')}
                            itemToString={(item) => (item ? item.title : '')}
                            onChange={handleSelectEka}
                          />
                        </FormGroup>
                        <p>{setCurrentItem.value}</p>
                        <div>{}</div>
                      </Column>
                      <Column size={1} />
                      <Column size={4}>
                        <FormGroup>
                          <Dropdown
                            id="TelpasIevade"
                            required
                            titleText="Telpa"
                            label="Dropdown menu options"
                            items={httpGet('https://tone.id.lv/api/rooms')}
                            itemToString={(item) => (item ? item.title : '')}
                            onChange={handleSelectTelpa}
                          />
                        </FormGroup>
                      </Column>
                      <Column size={1} />
                    </Row>
                  </Grid>
                </div>
                <Tabs scrollIntoView={false}>
                  <Tab
                    href="#"
                    id="tab-1"
                    label="Par notikumu"
                  >
                    <FormGroup>
                      <Dropdown
                        id="atbildigaFakultate"
                        titleText="Atbildīgā fakultāte"
                        label="Dropdown menu options"
                        items={httpGet('https://tone.id.lv/api/faculty')}
                        itemToString={(item) => (item ? item.fullname : '')}
                        onChange={handleSelectFakultate}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Dropdown
                        id="default"
                        titleText="Studiju programma"
                        label="Dropdown menu options"
                        items={items}
                        itemToString={(item) => (item ? item.text : '')}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Dropdown
                        id="default"
                        titleText="Kurss"
                        label="Dropdown menu options"
                        items={items}
                        itemToString={(item) => (item ? item.text : '')}
                      />
                    </FormGroup>
                    <FormGroup>
                      <TextInput
                        labelText="Priekšmets"
                      />
                    </FormGroup>
                    <FormGroup>
                      <Dropdown
                          /*
                          <Autocomplete
                            id="combo-box-demo"
                            options={profesori}
                            getOptionLabel={(option) => option.text}
                            style={{ width: 300 }}
                            renderInput={(params) =>
                            <TextField {...params} label="Combo box" variant="outlined" />}

                            jāņem MultiSelect filterable

                          />
                          */
                        id="default"
                        titleText="Atbildīgais"
                        label="Dropdown menu options"
                        items={items}
                        itemToString={(item) => (item ? item.text : '')}
                      />
                    </FormGroup>
                  </Tab>
                  <Tab
                    href="#"
                    id="tab-2"
                    label="Atrast telpu"
                  >
                    <div className="some-content">
                      Content for second tab goes here.
                    </div>
                  </Tab>
                </Tabs>
                <FormGroup>
                  <TextInput
                    labelText="Piezīmes"
                  />
                </FormGroup>
              </Form>
            </ModalBody>
            <ModalFooter secondaryButtonText="Atcelt">
              <Button
                type="submit"
                onClick={() => {
                  let startTimeData = getMeADate(
                    document.getElementById('sakumaDatums').value,
                    document.getElementById('sakumaLaiks').value,
                  );
                  let endTimeData = getMeADate(
                    document.getElementById('beiguDatums').value,
                    document.getElementById('beiguLaiks').value,
                  );
                  startTimeData = startTimeData.replace('/', '-');
                  endTimeData = endTimeData.replace('/', '-');
                  const data = {};
                  const previousData = httpGet('https://tone.id.lv/api/reservations/');// lai saprastu, kads ir nakamais id
                  data.id = previousData[previousData.length - 1].id + 1;
                  //  paņem pēdējā elementa id un +1
                  data.title = document.getElementById('NosaukumaIevade').value;
                  const testVertiba = document.getElementById('TelpasIevade').value;
                  console.log(testVertiba);
                  data.resourceId = document.getElementById('TelpasIevade').value;
                  data.start = startTimeData;
                  data.end = endTimeData;
                  //  httpPost2("https://tone.id.lv/api/reservations/", data);
                  data.studyProgramId = fakultate;
                  data.resourceId = telpa;
                  data.type = 'lekcija';
                  data.responsiblePerson = ['testaPasniedzejs'];
                  console.log(data);
                  httpPost2('https://tone.id.lv/api/reservations/', data);
                  setOpen(false);
                }}
              >
                Pievienot
              </Button>
            </ModalFooter>
          </ComposedModal>,
          document.body,
        )}
      <Button kind="primary" onClick={() => setOpen(true)}>
        Individuālā pasākuma rezervācija
      </Button>
    </>
  );
}
