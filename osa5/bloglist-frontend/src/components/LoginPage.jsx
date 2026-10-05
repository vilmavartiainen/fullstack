
const LoginPage = ({loginForm, user}) => {
    return (
     <div>
        {!user && (
     <div>
        <h1>login</h1>
        {loginForm()}
        </div>
            )}
    </div>
    )
}

export default LoginPage