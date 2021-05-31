/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-fragments */
/* eslint-disable no-console */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint linebreak-style: ["error","windows"] */
import {
  React,
  useState,
  useCallback,
} from 'react';
import {
  Button,
  Tab,
  Tabs,
  TextInput,
  Form,
  FormGroup,
  ButtonSet,
} from 'carbon-components-react';
import { useHistory } from 'react-router-dom';
import FormTop from '../components/IndividualReservation/FormTop';
import FormTime from '../components/IndividualReservation/FormTime';
import FormTelpa from '../components/IndividualReservation/FormTelpa';
import TabA from '../components/IndividualReservation/FormTabA';
import {
  httpPost2,
  getMeADate,
  handleSelectFakultate,
  handleSelectTelpa,
  inputCheck,
} from '../components/IndividualReservation/FormFunctions';

export default function Create() {
  let eka;
  let telpa;
  let fakultate;
  const [currentEka = {}, setCurrentEka] = useState('');
  const [currentTelpa, setCurrentTelpa] = useState('');
  const [currentFakultate = {}, setCurrentFakultate] = useState('');
  const [currentPrieksmets, setCurrentPrieksmets] = useState('');
  const [currentItem, setCurrentItem] = useState();
  const [inputText, setInputText] = useState('');
  const [historyList, setHistoryList] = useState([]);
  const history = useHistory();
  const navigateToMain = useCallback(() => history.push('/'), [history]);
  const handleSubmitPoga = (e) => {
    // e.preventDefault();
    const dati = {};
    dati.eka = currentEka.id;
    dati.telpa = currentTelpa.id;
    dati.fakultate = currentFakultate.id;
    dati.prieksmets = currentPrieksmets;
    console.log(dati);
    // httpPost2('https://tone.id.lv/api/reservations/', dati);
  };
  return (
    <div>
      <Form>
        <FormTop />
        {/* Sākās laika un datuma ievade control+k+c vai control+? */}
        <FormTime />
        {/* Beidzās laika un datuma ievade */}
        <FormTelpa setCurrentTelpa={setCurrentTelpa} setCurrentEka={setCurrentEka} />
        <Tabs scrollIntoView={false}>
          <Tab
            href="#"
            id="tab-1"
            label="Par notikumu"
          >
            <TabA
              setCurrentFakultate={setCurrentFakultate}
              setCurrentPrieksmets={setCurrentPrieksmets}
            />
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
            placeholder="nepieciešams papildus aprīkojums vai kādas instrukcijas? (nav obligāti)"
          />
        </FormGroup>
        <ButtonSet>
          <Button
            kind="primary"
            // type="submit"
            // onClick={inputCheck()}
            onClick={handleSubmitPoga}
            // {() => {
            //   let startTimeData = getMeADate(
            //     document.getElementById('sakumaDatums').value,
            //     document.getElementById('sakumaLaiks').value,
            //   );
            //   let endTimeData = getMeADate(
            //     document.getElementById('beiguDatums').value,
            //     document.getElementById('beiguLaiks').value,
            //   );
            //   startTimeData = startTimeData.replace('/', '-');
            //   endTimeData = endTimeData.replace('/', '-');
            //   const data = {};
            //   data.title = document.getElementById('NosaukumaIevade').value;
            //   data.resourceId = currentTelpa.id;// document.getElementById('TelpasIevade').value;
            //   data.start = startTimeData;
            //   data.end = endTimeData;
            //   data.studyProgramId = document.getElementById('atbildigaFakultate').value;
            //   data.type = 'lekcija';
            //   data.responsiblePerson = ['testaPasniedzejs'];
            //   console.log(data);
            //   // httpPost2('https://tone.id.lv/api/reservations/', data);
            // }}
          >
            Pievienot
          </Button>
          <Button
            kind="secondary"
            onClick={() => {
              navigateToMain();
            }}
          >
            Atcelt
          </Button>
        </ButtonSet>
      </Form>
    </div>
  );
}
