
import React, { Component } from 'react'
import _ from 'lodash'
import {
  MJMLElement,
  elements,
  registerElement,
} from '../mjml/lib'

/*
 * Wrap your dependencies here.
 */
const {
  text: MjText,
} = elements;

const NAME = 'invoice-item'

@MJMLElement({
  tagName: 'mj-invoice-item',
  content: ' ',

  attributes: {
    'name': '',
    'price': 0,
    'quantity': 0,

    'color': '#747474',
    'font-family': 'Roboto, Ubuntu, Helvetica, Arial, sans-serif',
    'padding': '10px 20px',
    'font-size': '14px',
    'text-align': 'left'
  }
})
class InvoiceItem extends Component {

  /*
   * Build your styling here
   */
  getStyles() {
    const { mjAttribute, color } = this.props

    return _.merge({}, this.constructor.baseStyles, {
      td: {
      /*
       * Get the color attribute
       * Example: <mj-invoiceitem color="blue">content</mj-invoiceitem>
       */
        color: mjAttribute('color'),
        fontFamily: mjAttribute('font-family'),
        padding: mjAttribute('padding'),
        fontSize: mjAttribute('font-size'),
        fontWeight: 500,
        lineHeight: 1,
        textAlign: mjAttribute('text-align')
      }
    })
  }

  render() {
    const css = this.getStyles()
    const { mjAttribute } = this.props

    const qtyCss = _.merge({}, css.td, { textAlign: 'right' })

    return (
      <tr>
        <td style={css.td}>{mjAttribute('name')}</td>
        <td style={css.td}>{mjAttribute('price')}</td>
        <td style={qtyCss}>{mjAttribute('quantity')}</td>
      </tr>
    )
  }
}

registerElement('invoice-item', InvoiceItem, { endingTag: true })
export default InvoiceItem
