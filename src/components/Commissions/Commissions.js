import React, { Component } from 'react'
import Link from 'gatsby-link'
import S from './commissions.module.sass'
import { useCommissionStatus } from '../../hooks/commissionStatus.js'

const Commissions = (props) => {
	const {commissionsOpen} = useCommissionStatus()

	return (
		<div id={S.Commissions}>
			<div className={S.holderOpen}>
				<div className={S.leftRightHolder}>

				<div className={S.left}>
					<h1 
						style={{
							color: props.dark ? "#00030D" : "#F0E3DE",
						}}
					>{commissionsOpen ? 'Commissions are Open' : 'Commissions are Closed'}</h1>
				</div>

				<div className={S.right}>
					<Link to="/commission-form">
						<button
						  id={S.Button}
							style={{
								color:  props.dark ? "#00030D" : "#F0E3DE",
								border: props.dark ? "2px solid #00030D" : "2px solid #F0E3DE",
							}}
						>
							{commissionsOpen ? 'Place an Order' : 'Request an Order'}
						</button>
					</Link>
				</div>
					{/* 
						// * does not render ItemList if there are no items for it,
						// * alowing Button for form to be in the center using flexbox
					*/}
					{props.children &&
						<div className={S.right}>{props.children}</div>
					} 
				</div>
			</div>
		</div>
	)
}

export default Commissions
