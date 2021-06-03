import React from 'react';

import {
  RadioButton,
  RadioButtonGroup,
  TextInput,
  FormGroup,
} from 'carbon-components-react';

export default function FormTop() {
  return (
    <div>
      <h1>Jauns notikums</h1>
      <FormGroup>
        <TextInput
          required
          id="NosaukumaIevade"
          labelText="Nosaukums"
          invalidText="Ievadiet nosaukumu!"
          placeholder="Rezervācijas nosaukums"
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
    </div>
  );
}
