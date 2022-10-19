import { useRef } from 'react'
import { useUser } from '../../context/Context'


const Login = () => {
    const inputUser = useRef()
    const [user, setUser] = useUser()
    const submit = (e) => {
        e.preventDefault()
        setUser(inputUser.current.value)
    }

    return (
        user ? ""
            :
            <div id="login">

                <h1>Welcome back! Please sign in with your username</h1>

                <form onSubmit={(e) => submit(e)}>
                    <div className="form-field">
                        <label htmlFor='username'>Your username</label>
                        <input type="text" name="username" id="username" ref={inputUser} />
                    </div>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            </div>
    )
}

export default Login