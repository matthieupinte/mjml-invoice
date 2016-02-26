
import React, { Component } from 'react'
import _ from 'lodash'
import {
  MJMLColumnElement,
  elements,
  registerElement,
} from '../mjml/lib'

/*
 * Wrap your dependencies here.
 */
const {
  text: MjText,
  table: MjTable
} = elements;

const NAME = 'invoice'

@MJMLColumnElement({
  tagName: 'mj-invoice',
  content: ' ',

  /*
   * These are your default css attributes
   */
  attributes: {
    'color': '#424242',
    'font-family': 'Helvetica',
    'margin-top': '10px'
  }
})
class Invoice extends Component {

  /*
   * Build your styling here
   */
  getStyles() {
    const { mjAttribute } = this.props

    return _.merge({}, this.constructor.baseStyles, {
      invoice: {
        color: mjAttribute('color')
      }
    })
  }

  render() {
    const css = this.getStyles()

    return (
      <MjTable>
        <thead><tr><td>Lol</td></tr></thead>
      </MjTable>
    )
  }
}

registerElement('invoice', Invoice, { endingTag: true })
export default Invoice
