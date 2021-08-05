/* eslint-disable func-style */
/* eslint-disable no-unused-vars */
import { React } from 'react'
import {
  Button,
  Tab,
  Tabs,
  TextInput,
  Form,
  FormGroup,
  ButtonSet,
} from 'carbon-components-react'
import { useHistory } from 'react-router-dom'
import FormTop from './FormTop'
import FormTime from './FormTime'

let fakultate
let telpa
let eka

export const handleSelectEka = (e) => {
  eka = e.selectedItem.id
}
export const handleSelectTelpa = (e) => {
  telpa = e.selectedItem.id
  document.getElementById('TelpasIevade').value = telpa
}
export const handleSelectFakultate = (e) => {
  fakultate = e.selectedItem.id
  document.getElementById('atbildigaFakultate').value = fakultate
}
export function getMeADate(dateStr, time) {
  let vartime = time
  if (time.length === 4) {
    vartime = `0${time}`
  }
  const aPrettyDate = `${dateStr}T${vartime}:00`
  return aPrettyDate
}
export function httpGet(theUrl) {
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open('GET', theUrl, false)
  xmlHttp.send()
  return JSON.parse(xmlHttp.responseText)
}
export function httpPost2(theUrl, data) {
  const xmlHttp = new XMLHttpRequest()
  xmlHttp.open('POST', theUrl, true)
  xmlHttp.send(JSON.stringify(data))
}
export function inputCheck() {
  let startTimeData = getMeADate(
    document.getElementById('sakumaDatums').value,
    document.getElementById('sakumaLaiks').value,
  )
  let endTimeData = getMeADate(
    document.getElementById('beiguDatums').value,
    document.getElementById('beiguLaiks').value,
  )
  startTimeData = startTimeData.replace('/', '-')
  endTimeData = endTimeData.replace('/', '-')
  const data = {}
  data.title = document.getElementById('NosaukumaIevade').value
  data.resourceId = document.getElementById('TelpasIevade').value
  data.start = startTimeData
  data.end = endTimeData
  data.studyProgramId = document.getElementById('atbildigaFakultate').value
  data.type = 'lekcija'
  data.responsiblePerson = ['testaPasniedzejs']
  console.log(data)
  // httpPost2('https://tone.id.lv/api/reservations/', data);
}
