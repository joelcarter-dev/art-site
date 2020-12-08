import React from 'react'
import S from './zoneInputs.module.sass'

export const postingZones = [
  {
    postingCost: 0,
    name: "New Zealand",
  },
  {
    postingCost: 10,
    name: "Australia",
  },
  {
    postingCost: 20,
    name: "South Pacific",
  },
  {
    postingCost: 30,
    name: "Asia",
  },
  {
    postingCost: 40,
    name: "Canada, UK, Europe or US",
  },
  {
    postingCost: 50,
    name: "The rest of the World",
  },
]

const Input = ({ type = 'radio', name, onChange, postingcost }) => (

  <label>
    <input
      className={S.zoneInput}
      name={'selectedZone'}
      value={name}
      id={name}
      type={type}
      postingcost={postingcost}
      onChange={onChange} 
    />{name}</label>
)

const ZoneInputs = (props) => {
  console.log(props)
  return (
    <div className={S.inputHolder}>
      {postingZones.map(i => (
        <Input 
        name={i.name} 
        checked={props.checked} 
        onChange={props.handleZoneChange}
        postingcost={i.postingCost}
        key={i.name}
        />
      ))}
      
    </div>
  )
}

export default ZoneInputs
