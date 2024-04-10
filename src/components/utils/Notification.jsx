import React, { useState } from 'react'
import { Alert, Progress } from "@material-tailwind/react"
import { useSelector } from "react-redux"

const Notification = ({ errorsState, progress, initFn }) => {

  const alerts = useSelector(state => state.alerts)

  // Alert
  const [visible, setVisible] = useState(true)
  const onDismiss = () => setVisible(false)

  return (
    <div className='my-2'>
      {/* Error frontend*/}
      {
        errorsState && errorsState.length > 0 ?
          errorsState.map(err =>
            <Alert color="red" isOpen={visible} toggle={onDismiss} key={Math.floor(Math.random() * 1000)} className='border border-yellow text-center py-2 m-0'>
              {err}
            </Alert>) :
          null
      }

      {/* Error backend */}
      {
        alerts && alerts.id === initFn && initFn !== 'replyContact' ?
          <Alert isOpen={visible} toggle={onDismiss} color={alerts.type === 'success' ? 'green' : 'red'}
          className='border border-yellow text-center py-2 m-0'>
            <small>
              {alerts.msg && alerts.msg.msg ? alerts.msg.msg : alerts.msg}
            </small>
          </Alert> : null
      }

      {progress &&
        <div className={`text-center text-red fw-bolder`}>
          {progress - 1}%
          <Progress animated color="blue" value={progress - 1} className='mb-2' />
        </div>}
    </div>
  )
}

export default Notification