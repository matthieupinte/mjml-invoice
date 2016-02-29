import fs from 'fs'
// import Invoice from './Invoice'
// import InvoiceItem from './InvoiceItem'
import mjml from '../mjml/lib'

/*
  Compile an mjml string
*/
const htmlOutput = mjml.mjml2html(`<mj-body>
  <mj-section>
    <mj-column width="100%">
      <mj-invoice format="0.00€" transl="name:Product Name">
        <mj-invoice-item name="TV" price="549€" quantity="1" color="blue" font-weight="bold" />
        <mj-invoice-item name="DVD - Iron Man II" price="22.99€" quantity="2" />
      </mj-invoice>
    </mj-column>
  </mj-section>
</mj-body>
`)

/*
  Print the responsive HTML generated
*/
fs.writeFile('output.html', htmlOutput);
