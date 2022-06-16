import React,{ useEffect ,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import GoalForm from '../components/GoalForm'
import GoalItem from '../components/GoalItem'
import Spinner from '../components/Spinner'
import { getGoals, reset } from '../features/goals/goalSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [thisId, setThisId] = useState(null)

  const { user } = useSelector((state) => state.auth)
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getGoals()) 
    if(!isError){ dispatch(reset()) }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <>
      <section className='heading'>
        <h1 className='t1'>Welcome {user && user.name}</h1>
        <p>Files Dashboard</p>
      </section>

      <GoalForm update={thisId} setUpdate={setThisId}/>

      <section className='content'>
        {goals.length > 0 ? (
          <div className='goals'>
            {goals.map((goal) => (
              <div key={goal._id} className='goal'>
                <GoalItem goal={goal} />
                <button onClick={() => setThisId(goal) } className='update'>M</button>
              </div>
            ))}
          </div>
        ) : (
          <h3 className='t3'>You have not set any goals</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard
