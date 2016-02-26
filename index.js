import fs from 'fs'
import Invoice from './Invoice'
import mjml from '../mjml/lib'

/*
  Compile an mjml string
*/
const htmlOutput = mjml.mjml2html(`<mj-body>
  <mj-section>
    <mj-column width="25%">
      <mj-invoice>
      </mj-invoice>
    </mj-column>
  </mj-section>
</mj-body>
`)

/*
  Print the responsive HTML generated
*/
fs.writeFile('output.mjml', htmlOutput);
