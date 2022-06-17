import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteFile } from '../features/files/fileSlice'

function FileItem({ file }) {
  const dispatch = useDispatch()

  return (
    <div >
      <div>Created at :<div>{new Date(file.createdAt).toLocaleString('en-US')}</div></div>
      <h2 className='t2'>{file.title}</h2>
      <div>Updated at :<div>{new Date(file.updatedAt).toLocaleString('en-US')}</div></div>
      <button onClick={() => dispatch(deleteFile(file._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default FileItem
