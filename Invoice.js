
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

  /*
   * These are your default css attributes
   */
  attributes: {
    'color': '#747474',
    'font-family': 'Roboto, Ubuntu, Helvetica, Arial, sans-serif',
    'font-size': '13px',
    'line-height': '22px'
  }
})
class Invoice extends Component {

  constructor(props) {
    super(props)

    this.items = props.mjChildren().filter((child) => child.get('tagName') === 'mj-invoice-item')
  }

  /*
   * Build your styling here
   */
  getStyles() {
    const { mjAttribute } = this.props

    return _.merge({}, this.constructor.baseStyles, {
      table: {
        color: mjAttribute('color'),
        fontFamily: mjAttribute('font-family'),
        fontSize: mjAttribute('font-size'),
        lineHeight: mjAttribute('line-height')
      },
      head: {
        padding: '10px 20px',
        font: '14px Roboto, sans-serif',
        fontWeight: 700,
        lineHeight: 1,
        color: '#b9b9b9',
        textTransform: 'uppercase',
        textAlign: 'left'
      },
      total: {
        label: {
          padding: '10px 20px',
          font: '14px Roboto, sans-serif',
          fontWeight: 700,
          lineHeight: 1,
          color: '#b9b9b9',
          textTransform: 'uppercase',
          textAlign: 'left',
          borderTop: '1px solid #ecedee'
        },
        result: {
          padding: '10px 20px',
          font: '14px Roboto, sans-serif',
          fontWeight: 700,
          lineHeight: 1,
          color: '#747474',
          textTransform: 'uppercase',
          textAlign: 'right',
          borderTop: '1px solid #ecedee'
        }
      }
    })
  }

  getAttributes() {
    const { mjAttribute } = this.props

    return {
      table: {
        color: mjAttribute('color'),
        fontFamily: mjAttribute('font-family'),
        fontSize: mjAttribute('font-size'),
        lineHeight: mjAttribute('line-height')
      }
    }
  }

  total() {
    return this.items.reduce((prev, item) => {
      const unitPrice = parseFloat(item.getIn(['attributes', 'price']))
      const quantity  = parseInt(item.getIn(['attributes', 'quantity']))

      return prev + unitPrice * quantity
    }, 0)
  }

  render() {
    const attrs  = this.getAttributes()
    const styles = this.getStyles()
    const { renderChildren } = this.props

    return (
      <MjTable {...attrs.table}>
        <thead>
          <tr>
            <th style={styles.head}>Product</th>
            <th style={styles.head}>Price</th>
            <th style={styles.head}>Quantity</th>
          </tr>
        </thead>
        {renderChildren()}
        <tfoot>
          <tr>
            <th style={styles.total.label} colSpan="2">Total: </th>
            <td style={styles.total.result}>{this.total()}</td>
          </tr>
        </tfoot>
      </MjTable>
    )
  }
}

registerElement('invoice', Invoice)
export default Invoice
