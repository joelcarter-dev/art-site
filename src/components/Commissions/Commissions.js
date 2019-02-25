import React, { Component } from 'react'
import CommissionForm from './CommissionForm'
import S from './commissions.module.sass'

const Button = ({ msg, toggleForm }) => (
	<button onClick={toggleForm} id={S.Button}>
		{msg}
	</button>
)

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
			<>
				<CommissionForm  
					formOpen={this.state.formOpen}
					commissionsOpen={this.props.open} 
					toggleForm={this.toggleForm} 
				/>
				<div id={S.Commissions}>
					<div className={S.holderOpen}>
						<h1>{this.props.open ? 'Commissions are Open' : 'Commissions are Closed'}</h1>
						<div className={S.left}>
							<Button
								msg={this.props.open ? 'Place an Order' : 'Request an Order'}
								toggleForm={this.toggleForm}
							/>
						</div>
						<div className={S.right}>{this.props.children}</div>
					</div>
				</div>
			</>
		)
	}
}


// NOTE CAHNGE FOR COMMISION OPEN / CLOSED
Commissions.defaultProps = {
	open: true
}

export default Commissions
