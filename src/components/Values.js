import React from 'react'

const Values = ({values, player}) => {
  return (
    <div>
        {values.length > 0 &&
        <table className='table'>
            <tbody>
                <tr>
                    <td style={{minWidth:"75px"}}>{player}</td>
                    {values.map((value, index) => (
                        <td key={index} className='values'>{value}</td>
                    ))}
                </tr>
            </tbody>
        </table>
    }
    </div>
  )
}

export default Values
