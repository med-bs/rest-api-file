import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createFile,updateFile } from '../features/files/fileSlice'

function FileForm({update, setUpdate}) {
  const [text, setText] = useState("")
  const [data, setData] = useState("")

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
      dispatch(updateFile({id, text }))
    }else{
      const formData = new FormData();
      formData.append("file", data);
      formData.append("title", text);
      dispatch(createFile(formData))
    }
    setText('')
    setUpdate(null)
  }
  return (
    <section className='form'>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <div className='form-group'>
          <label htmlFor='text'>File : {update !== null ? `(Old title : ${update.title})` :''}</label>
          <input
            type='text'
            name='text'
            placeholder='Title'
            id='text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          { update !== null ? '':(
          <input
            type='file'
            name='file'
            id='file'
            onChange={(e) => setData(e.target.files[0])}
          />
          ) }
        </div>
        <div className='form-group'>
          <button className='btn btn-block' type='submit'>
            { update !== null ? 'Update file title':'Add file' }
          </button>
          <button className='btn btn-block' onClick={onReset}>
            Reset
          </button>
        </div>
      </form>
    </section>
  )
}

export default FileForm