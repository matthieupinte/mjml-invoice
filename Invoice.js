
import React, { Component } from 'react'
import _ from 'lodash'
import numeral from 'numeral'
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
  table: MjTable,
  button: MjButton
} = elements;

const NAME = 'invoice'

@MJMLColumnElement({
  tagName: 'mj-invoice',

  /*
   * These are your default css attributes
   */
  attributes: {
    'color': '#b9b9b9',
    'font-family': 'Roboto, Ubuntu, Helvetica, Arial, sans-serif',
    'font-size': '13px',
    'line-height': '22px',
    'border': '1px solid #ecedee',

    'transl': 'name:Name;price:Price;quantity:Quantity'
  }
})
class Invoice extends Component {

  static transl = {
    name: 'Name',
    price: 'Price',
    quantity: 'Quantity',
    total: 'Total:'
  }

  constructor(props) {
    super(props)

    const format     = this.props.mjAttribute('format')
    const currencies = format.match(/([^-\d.,])/g)

    this.items    = props.mjChildren().filter((child) => child.get('tagName') === 'mj-invoice-item')
    this.format   = format.replace(/([^-\d.,])/g, '$')
    this.currency = (currencies) ? currencies[0] : null
  }

  /*
   * Build your styling here
   */
  getStyles() {
    const { mjAttribute } = this.props

    const styles = _.merge({}, this.constructor.baseStyles, {
      table: {
        color: mjAttribute('color'),
        fontFamily: mjAttribute('font-family'),
        fontSize: mjAttribute('font-size'),
        lineHeight: mjAttribute('line-height')
      },
      th: {
        padding: '10px 20px',
        font: `${mjAttribute('font-size')} ${mjAttribute('font-family')}`,
        fontWeight: 700,
        lineHeight: mjAttribute('line-height'),
        textTransform: 'uppercase',
        textAlign: 'left'
      },
      thead: {
        borderBottom: mjAttribute('border')
      },
      tfoot: {
        borderTop: mjAttribute('border')
      },
      total: {
        padding: '10px 20px',
        font: `${mjAttribute('font-size')} ${mjAttribute('font-family')}`,
        fontWeight: 700,
        lineHeight: mjAttribute('line-height'),
        textTransform: 'uppercase',
        textAlign: 'right'
      }
    })

    styles.thQuantity = _.merge({}, styles.th, { textAlign: 'right' })

    return styles
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

  getTranslations() {
    const transl = _.cloneDeep(this.constructor.transl)
    const { mjAttribute } = this.props

    mjAttribute('transl').split(';').forEach((t) => {
      if (t && t.indexOf(':') != -1) {
        t = t.split(':')
        transl[t[0].trim()] = t[1].trim()
      }
    })
    return transl
  }

  total() {
    const format   = this.format
    const currency = this.currency
    const total    = this.items.reduce((prev, item) => {
      const unitPrice = parseFloat(numeral().unformat(item.getIn(['attributes', 'price'])))
      const quantity  = parseInt(item.getIn(['attributes', 'quantity']))

      return prev + unitPrice * quantity
    }, 0)

    return numeral(total).format(format).replace(/([^-\d.,])/g, currency)
  }

  render() {
    const trls   = this.getTranslations()
    const attrs  = this.getAttributes()
    const styles = this.getStyles()
    const { renderChildren, mjAttribute } = this.props

    return (
      <div>
        <MjTable {...attrs.table}>
          <thead>
            <tr style={styles.thead}>
              <th style={styles.th}>{trls['name']}</th>
              <th style={styles.th}>{trls['price']}</th>
              <th style={styles.thQuantity}>{trls['quantity']}</th>
            </tr>
          </thead>
          {renderChildren()}
          <tfoot>
            <tr style={styles.tfoot}>
              <th style={styles.th} colSpan="2">{trls['total']}</th>
              <td style={styles.total}>{this.total()}</td>
            </tr>
          </tfoot>
        </MjTable>
        <MjButton></MjButton>
      </div>
    )
  }
}

registerElement('invoice', Invoice)
export default Invoice
