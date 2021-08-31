import React, { Component } from "react"
import S from "./order.module.sass"

import { useZoneAndBufferData } from "../../hooks/zoneAndBufferData.js"
import PayPalCheckout from "./PaypalButton.js"
import OrderForm from "./OrderForm.js"
import Link from "gatsby-link"

class Overview extends Component {
	render() {
		return (
			<section id={S.Overview}>
				<h3>Overview</h3>
				<div className={S.amounts}>
					<span>Items: {this.props.itemInfo.length}</span>
					{this.props.itemInfo.map((i) => (
						<span key={i.frontmatter.title}>{i.frontmatter.title} </span>
					))}
				</div>

				{/* {this.props.totalPrice != null && 
          <p>Please select posting zone. Posting costs will apply</p>
        } */}

				{this.props.totalPrice != null && (
					<>
						{/* <ul className={S.titemDetails}>
            {
              this.props.itemInfo.map(i => (
                <li key={i.frontmatter.title}>
                  <span>{i.frontmatter.title}</span>
                </li>
              ))
            }
          </ul> */}

						<p>
							${this.props.postingZone.postingCost} for tracked courier posting
							to {this.props.postingZone.name}
						</p>

						<span>Total: ${this.props.totalPrice} NZD</span>
					</>
				)}

				<div className={S.myInfo}>
					<Link to="/support-form" state={{ itemInfo: this.props.itemInfo }}>
						<button
							id={S.Button}
							style={{
								color: this.props.dark ? "#00030D" : "#F0E3DE",
								border: this.props.dark
									? "1px solid #00030D"
									: "1px solid #F0E3DE",
							}}
						>
							Contact Support
						</button>
					</Link>
				</div>
			</section>
		)
	}
}

export default function GetZoneAndBufferData(props) {
	const zoneAndBufferData = useZoneAndBufferData()
	return (
		<Order
			zoneAndBufferData={zoneAndBufferData}
			orderData={props.orderData}
			hidden={props.hidden}
			toggleForm={props.toggleForm}
		/>
	)
}

class Order extends Component {
	constructor(props) {
		super(props)
		this.state = {
			msg: "",
			formData: null,
			postingZone: {
				name: null,
				postingCost: null,
			},
			totalPrice: null,
			showPayPal: false,
		}
	}

	sendData = (data) => {
		this.setState({ formData: data }, this.cheekFormsAndSelectFields)
	}

	sendPostZone = (data) => {
		this.setState({ postingZone: data }, this.calcTotalPrice)
	}

	sendDiscountCode = (data) => {
		console.log("test")
		if (data === this.props.zoneAndBufferData.discountCodes) {
			this.setState({ discountCode: data }, this.calcTotalPrice)
		}
	}

	calcTotalPrice = () => {
		// NOTE this price is a buffer to cover shipping costs to make the price of shiping to other zones less jaring. Can also say free shipping to nz as this pays for it. Needs to cover packaging, post accross nz, and make shipping overseas not so bad
		const postBuffer = this.props.zoneAndBufferData.globalItemBuffer
		const postZoneCost = this.state.postingZone.postingCost

		let basePrice
		this.props.orderData.map((i) => {
			console.log(typeof i.frontmatter.price)
			basePrice = Number(i.frontmatter.price.replace(/[^0-9.-]+/g, ""))
		})

		let priceWithBuffer = basePrice + postBuffer
		let priceWithPostingCost = priceWithBuffer + postZoneCost
		//priceWithPostingCost.reduce((a, b) => a + b, 0)
		console.log(" =========== ")
		console.log(" Price Breakdown ")

		console.log("base price " + basePrice)
		console.log("buffer " + postBuffer)
		console.log("post cost for zone " + postZoneCost)

		console.log(
			"total price with posting cost and buffer " + priceWithPostingCost
		)

		this.setState({ totalPrice: priceWithPostingCost })
		return null
	}

	cheekFormsAndSelectFields = () => {
		//! Both contry and posting zone must be filled,
		//! as well as all form fields for showPayPal state to be true, rendering the paypal buttons

		if (
			this.state.postingZone.name != null &&
			this.state.formData.country != null
		) {
			this.setState({ showPayPal: true })
		} else {
			console.log("something is null so not showing paypal buttons")
		}
	}

	render() {
		//let totalPrice = []
		let itemInfo = []
		this.props.orderData.map((i) => {
			itemInfo.push({ title: i.frontmatter.title, price: i.frontmatter.price })
		})

		const onSuccess = (payment) => {
			console.log("Successful payment", payment)
			this.setState({
				msg: "Payment Successful. Your item(s) are on there way",
			})
		}
		const onError = (error) => {
			this.setState({
				msg: "Payment Error. Please try again or contact for support.",
			})
			console.log("Erroneous payment OR failed to load script", error)
		}
		const onCancel = (data) => {
			this.setState({ msg: "Payment Cancelled" })
			console.log("Cancelled payment", data)
		}

		const CLIENT = {
			//sandbox: 'AXKvD9ZhyEGv_CUtXqJef6uRPEC4Ms818BUoxVkkZG5284CBBahiFM2OzrCRwGnR8CFAUvfP9RZE31h_',
			production:
				"AR5tSrE0hmKNkHCiyaPTItKLXGei9Ocdql56CkC9eRmJ7vhizeoFYvt4u0_qpri9PJX5NQwOAwQHbXgv",
		}

		// const ENV = process.env.NODE_ENV === 'production'
		//   ? 'production'
		//   : 'sandbox'

		//will throw error as there is no sandbox key. But I don't want any orders right now
		const ENV = "production"

		return (
			<section id={this.props.hidden ? S.OrderHidden : S.OrderDisplay}>
				<div className={S.orderHolder}>
					<div className={S.left}>
						<Overview
							postingZone={this.state.postingZone}
							totalPrice={this.state.totalPrice}
							itemInfo={this.props.orderData}
						/>
					</div>
					<div className={S.right}>
						<button onClick={this.props.toggleForm} id={S.close}>
							Close
						</button>

						<OrderForm
							orderData={this.props.orderData}
							sendData={this.sendData}
							sendPostZone={this.sendPostZone}
							postingZones={this.props.zoneAndBufferData.postingZones}
							sendDiscountCode={this.sendDiscountCode}
							totalPrice={this.state.totalPrice}
							postingZone={this.state.postingZone}
						/>

						<div id={S.paypalHolder}>
							{this.state.showPayPal && (
								<PayPalCheckout
									client={CLIENT}
									env={ENV}
									commit={true}
									currency={"NZD"}
									total={this.state.totalPrice}
									onSuccess={onSuccess}
									onError={onError}
									onCancel={onCancel}
									//order data comes from the form object to get all data at once
									orderData={this.props.orderData}
									formData={this.state.formData}
								/>
							)}
						</div>
					</div>
				</div>
				<div className={S.overlay}></div>
			</section>
		)
	}
}
