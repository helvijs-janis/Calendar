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

export default function FormTime() {
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
                  <TimePicker id="sakumaLaiks" labelText="" />
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
                  <TimePicker id="beiguLaiks" />
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
  );
}
