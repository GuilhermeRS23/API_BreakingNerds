import bcrypt from 'bcrypt';
import { generateToken, loginService } from '../services/auth.service.js';


export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await loginService(email).select('+password');
        if (!user) {
            return res.status(404)
                .send({ message: "Usuário ou Senha inválido" });
        }

        const passwordValid = bcrypt.compareSync(password, user.password);
        if (!passwordValid) {
            return res.status(404)
                .send({ message: "Usuário ou Senha inválido" });
        }

        const token = generateToken(user.id);
        res.send({ token });

    } catch (error) {
        res.status(500).send(error.message);
    }
}
