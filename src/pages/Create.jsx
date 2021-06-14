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
  DatePickerInput,
} from 'carbon-components-react';
import { useHistory } from 'react-router-dom';
import { format, formatISO } from 'date-fns';
import FormTop from '../components/IndividualReservation/FormTop';
import FormTime from '../components/IndividualReservation/FormTime';
import FormTelpa from '../components/IndividualReservation/FormTelpa';
import TabA from '../components/IndividualReservation/FormTabA';
import {
  httpPost2,
} from '../components/IndividualReservation/FormFunctions';
import { formatToDbDateString } from '../components/utils';
import { createReservation } from '../queries/RoomQueries';

export default function Create() {
  let eka;
  let telpa;
  let fakultate;

  const [currentTitle, setCurrentTitle] = useState('');
  const [currentEka = {}, setCurrentEka] = useState('');
  const [currentTelpa, setCurrentTelpa] = useState('');

  const [sakumaLaiks, setSakumaLaiks] = useState('');
  const [sakumaDatums, setSakumaDatums] = useState('');
  const [beiguLaiks, setBeiguLaiks] = useState('');
  const [beiguDatums, setBeiguDatums] = useState('');

  const [currentFakultate = {}, setCurrentFakultate] = useState('');
  const [currentPrieksmets, setCurrentPrieksmets] = useState('');
  const [currentPerson = {}, setCurrentPerson] = useState('');

  const [currentItem, setCurrentItem] = useState();
  const [inputText, setInputText] = useState('');
  const [historyList, setHistoryList] = useState([]);
  const history = useHistory();
  const navigateToMain = useCallback(() => history.push('/'), [history]);
  const handleSubmitPoga = (e) => {
    const AsakumaDatums = sakumaDatums[0];
    const AbeiguDatums = beiguDatums[0];
    // const BsakumaDatums = formatToDbDateString(sakumaDatums);
    // const BbeiguDatums = formatToDbDateString(beiguDatums);
    console.log(sakumaDatums[0]);
    console.log(typeof sakumaDatums);
    let startMonth;
    let endMonth;
    let startDate;
    let endDate;
    console.log(AsakumaDatums);
    if (AsakumaDatums.getMonth() <= 8) {
      startMonth = `0${AsakumaDatums.getMonth() + 1}`;
    } else {
      startMonth = AsakumaDatums.getMonth() + 1;
    }
    if (AbeiguDatums.getMonth() <= 8) {
      endMonth = `0${AbeiguDatums.getMonth() + 1}`;
    } else {
      endMonth = AbeiguDatums.getMonth() + 1;
    }
    if (AsakumaDatums.getDate() <= 9) {
      startDate = `0${AsakumaDatums.getDate()}`;
    } else {
      startDate = AsakumaDatums.getDate();
    }
    if (AbeiguDatums.getDate() <= 9) {
      endDate = `0${AbeiguDatums.getDate()}`;
    } else {
      endDate = AbeiguDatums.getDate();
    }
    if (sakumaLaiks.length <= 4) {
      setSakumaLaiks(`0${sakumaLaiks}`);
    }
    if (beiguLaiks.length <= 4) {
      setBeiguLaiks(`0${beiguLaiks}`);
    }
    const start = `${AsakumaDatums.getUTCFullYear()}-${startMonth}-${startDate}T${sakumaLaiks}:00.000Z`;
    const end = `${AbeiguDatums.getUTCFullYear()}-${endMonth}-${endDate}T${beiguLaiks}:00.000Z`;
    e.preventDefault();
    const dati = {};
    const sakumaDatumsForm = sakumaDatums;
    const beiguDatumsForm = beiguDatums;
    dati.title = currentTitle;
    // dati.prieksmets = currentPrieksmets;
    dati.start = start;
    dati.end = end;
    dati.facultyId = currentFakultate.id;
    dati.responsiblePersonId = currentPerson.id;
    dati.resourceId = currentTelpa.id;
    console.log(dati);
    httpPost2('https://tone.id.lv/api2/reservations/', dati);
  };
  return (
    <div>
      <Form>
        <FormTop
          setCurrentTitle={setCurrentTitle}
        />
        {/* Sākās laika un datuma ievade control+k+c vai control+? */}
        <FormTime
          setSakumaLaiks={setSakumaLaiks}
          setSakumaDatums={setSakumaDatums}
          setBeiguLaiks={setBeiguLaiks}
          setBeiguDatums={setBeiguDatums}
        />
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
              setCurrentPerson={setCurrentPerson}
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
