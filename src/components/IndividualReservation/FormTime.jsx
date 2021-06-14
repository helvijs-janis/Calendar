/* eslint-disable react/prop-types */
import {
  React,
} from 'react';
import {
  DatePicker,
  DatePickerInput,
  TimePicker,
  Grid,
  Row,
  Column,
  FormGroup,
} from 'carbon-components-react';

export default function FormTime({
  setSakumaLaiks, setSakumaDatums, setBeiguLaiks, setBeiguDatums,
}) {
  return (
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
                  <DatePicker
                    datePickerType="single"
                    dateFormat="Y-m-d"
                    locale="lv"
                    labelText="label"
                    onChange={(event) => setSakumaDatums(event)}
                  >
                    <DatePickerInput
                      // required
                      placeholder="yyyy-mm-dd"
                      format="YYYY-MM-DD"
                      labelText=""
                      id="sakumaDatums"
                    />
                  </DatePicker>
                </FormGroup>
              </Column>
              <Column sm={1} md={2}>
                <FormGroup>
                  <TimePicker
                    id="sakumaLaiks"
                    labelText=""
                    onChange={(event) => setSakumaLaiks(event.target.value)}
                  />
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
                  <TimePicker
                    id="beiguLaiks"
                    format="hh:mm"
                    onChange={(event) => setBeiguLaiks(event.target.value)}
                  />
                </FormGroup>
              </Column>
              <Column sm={6} md={9}>
                <FormGroup>
                  <DatePicker
                    datePickerType="single"
                    dateFormat="Y-m-d"
                    locale="lv"
                    onChange={(event) => setBeiguDatums(event)}
                  >
                    <DatePickerInput
                      // required
                      placeholder="yyyy-mm-dd"
                      format="Y-m-d"
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
  );
}
