import React, { Component } from 'react'
import Link from 'gatsby-link'
import S from './commissions.module.sass'
class Commissions extends Component {
	constructor(props) {
		super(props)
		this.state = { formOpen: false }
	}

	toggleForm = () => {
		this.setState({ formOpen: !this.state.formOpen })
	}

	render() {
		return (
				<div id={S.Commissions}>
					<div className={S.holderOpen}>
						<div className={S.leftRightHolder}>

						<div className={S.left}>
							<h1 
								style={{
									color: this.props.dark ? "#00030D" : "#F0E3DE",
								}}
							>{this.props.open ? 'Commissions are Open' : 'Commissions are Closed'}</h1>
						</div>

						<div className={S.right}>
							<Link to="/commission-form">
								<button
									onClick={this.toggleForm} id={S.Button}
									style={{
										color: this.props.dark ? "#00030D" : "#F0E3DE",
										border: this.props.dark ? "1px solid #00030D" : "1px solid #F0E3DE",
									}}
								>
									{this.props.open ? 'Place an Order' : 'Request an Order'}
								</button>
							</Link>
						</div>
						{/* 
							// * does not render ItemList if there are no items for it,
							// * alowing Button for form to be in the center using flexbox
						*/}
						{this.props.children &&
							<div className={S.right}>{this.props.children}</div>
						} 
					</div>
				</div>
			</div>
		)
	}
}

export default Commissions
