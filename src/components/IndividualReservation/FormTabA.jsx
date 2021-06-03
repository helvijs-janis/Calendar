/* eslint-disable react/prop-types */
import {
  React,
} from 'react';
import {
  Dropdown,
  TextInput,
  FormGroup,
  Form,
} from 'carbon-components-react';
import {
  httpGet,
} from './FormFunctions';

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

export default function FormTabA({ setCurrentFakultate, setCurrentPrieksmets }) {
  return (
    <Form>
      <FormGroup>
        <Dropdown
          id="atbildigaFakultate"
          titleText="Atbildīgā fakultāte"
          label="Dropdown menu options"
          items={httpGet('https://tone.id.lv/api/faculty')}
          itemToString={(item) => (item ? item.fullname : '')}
          onChange={({ selectedItem }) => setCurrentFakultate(selectedItem)}
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
          onChange={(event) => setCurrentPrieksmets(event.target.value)}
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
    </Form>
  );
}
