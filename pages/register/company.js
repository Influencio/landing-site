import React from 'react'
import Steps from 'components/atomic/step';
import {BiSelectMultiple, BiDollarCircle} from 'react-icons/bi'
import {AiOutlineUser, AiOutlineSmile} from 'react-icons/ai'

const Company = () => {

  const steps = [
    {
      content: <div>pis</div>,
      title: 'test',
      icon: <BiSelectMultiple />
    },
    {
      content: <div>test</div>,
      title: 'testtesttest',
      icon: <AiOutlineUser />
    },
    {
      content: <div>test</div>,
      title: 'testtesttest',
      icon: <BiDollarCircle />
    },
    {
      content: <div>test</div>,
      title: 'testtesttest',
      icon: <AiOutlineSmile />
    }
  ]

  return (
    <div>
      <Steps steps={steps} />
    </div>
  )
}

export default Company
