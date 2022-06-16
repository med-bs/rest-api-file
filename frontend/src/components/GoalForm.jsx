import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createGoal,updateGoal } from '../features/goals/goalSlice'

function GoalForm({update, setUpdate}) {
  const [text, setText] = useState("")

  const dispatch = useDispatch()

    const onReset = (e) => {
    e.preventDefault()

    setText('')
    setUpdate(null)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(update!==null){
      const id =update._id
      dispatch(updateGoal({id, text }))
    }else{
      dispatch(createGoal({ text }))
    }
    setText('')
    setUpdate(null)
  }
  return (
    <section className='form'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Goal : {update !== null ? `(Old : ${update.text})` :''}</label>
          <input
            type='text'
            name='text'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            { update !== null ? 'Update':'Add Goal' }
          </button>
          <button className='btn btn-block' onClick={onReset}>
            Reset
          </button>
        </div>
      </form>
    </section>
  )
}

export default GoalForm