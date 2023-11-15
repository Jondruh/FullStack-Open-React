export const Notification = ( { notification } ) => {
  const errorStyle = {
    color: 'red',
    fontStyle: 'italic',
    fontSize: '20px',
    border: '1px red solid',
    borderRadius: '1em',
    margin: '1em',
    padding: '1em',
    backgroundColor: ' #ffb3b3'
  }

  const style = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: '20px',
    border: '1px green solid',
    borderRadius: '1em',
    margin: '1em',
    padding: '1em',
    backgroundColor: '#ccff99'
  }

  if (notification === null) {
    return null;
  }

  const message = notification.message;

  return (
    <div style={notification.error ? errorStyle : style} className='error'>
      {message}
    </div>
  )
}
