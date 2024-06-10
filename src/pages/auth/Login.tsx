import { useDispatch } from 'react-redux';
import { login } from '../../redux/slices/authSlice';
import { Role } from '../../types/auth.types';
import { useState } from 'react';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Add form submission logic here
        console.log(formData);
    };
    const dispatch = useDispatch();

    const handleLogin = (role: Role) => {
        dispatch(login({ role }));
    };

    const Adminrole = {
        id: 'admin',
        Permissions: []
    }

    const Researcherrole = {
        id: 'researcher',
        Permissions: []
    }

    const Freelancerrole = {
        id: 'freelancer',
        Permissions: []
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <button type="submit">Login</button>
            </form>
            <button onClick={() => handleLogin(Adminrole)}>Login as Admin</button>
            <button onClick={() => handleLogin(Researcherrole)}>Login as Researcher</button>
            <button onClick={() => handleLogin(Freelancerrole)}>Login as Freelancer</button>
        </div>
    );
};

export default Login;
