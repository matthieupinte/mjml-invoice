
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
    const { mjAttribute } = this.props

    const styles = _.merge({}, this.constructor.baseStyles, {
      td: {
        color: mjAttribute('color'),
        fontFamily: mjAttribute('font-family'),
        padding: mjAttribute('padding'),
        fontSize: mjAttribute('font-size'),
        fontWeight: 500,
        lineHeight: 1,
        textAlign: mjAttribute('text-align')
      },
      name: {
        wordBreak: 'break-all'
      },
      quantity: {
        textAlign: 'right'
      }
    })

    styles.name     = _.merge({}, styles.td, styles.name)
    styles.quantity = _.merge({}, styles.td, styles.quantity)

    return styles
  }

  render() {
    const styles = this.getStyles()
    const { mjAttribute } = this.props

    return (
      <tr>
        <td style={styles.name}>{mjAttribute('name')}</td>
        <td style={styles.td}>{mjAttribute('price')}</td>
        <td style={styles.quantity}>{mjAttribute('quantity')}</td>
      </tr>
    )
  }
}

registerElement('invoice-item', InvoiceItem, { endingTag: true })
export default InvoiceItem
