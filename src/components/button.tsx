import React from 'react'
import styled from 'styled-components'

const DisabledButton = styled.div`
  background: grey;
`

interface ButtonProps {
  disabled?: boolean
}

const Button = (props: ButtonProps) => {
  if (props.disabled) {
    return <DisabledButton>Button</DisabledButton>
  } else {
      return <div>Button</div>
  }
}

export default Button