// src/utils/auth.js

const STORAGE_KEY = "gellato:user";
const USERS_KEY = "gellato:registeredUsers"; // Chave para armazenar usuários cadastrados

// Função auxiliar para obter a lista de usuários cadastrados no localStorage
function getRegisteredUsers() {
    if (typeof window === "undefined") return [];
    try {
        const users = localStorage.getItem(USERS_KEY);
        return users ? JSON.parse(users) : [];
    } catch {
        return [];
    }
}

// Função auxiliar para salvar a lista de usuários cadastrados no localStorage
function saveRegisteredUsers(users) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch { }
}

// --- SUAS FUNÇÕES ORIGINAIS (SEM ALTERAÇÃO) ---

export function login(email, password) {
    if (!email || !password) {
        return { user: null, error: "Preencha todos os campos." };
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (normalizedEmail === "admin@gellato.com" && password === "123") {
        const user = { id: 1, name: "Admin Gellato", role: "admin", email: normalizedEmail };
        saveSession(user);
        return { user, error: null };
    }

    if (normalizedEmail === "gestor@gellato.com" && password === "123") {
        const user = { id: 2, name: "Gestor Loja", role: "gestor", email: normalizedEmail };
        saveSession(user);
        return { user, error: null };
    }

    if (normalizedEmail === "cliente@gellato.com" && password === "123") {
        const user = { id: 3, name: "Cliente Gellato", role: "cliente", email: normalizedEmail };
        saveSession(user);
        return { user, error: null };
    }

    // Adiciona verificação para usuários cadastrados via localStorage
    const registeredUsers = getRegisteredUsers();
    const registeredUser = registeredUsers.find(u => u.email === normalizedEmail && u.password === password);

    if (registeredUser) {
        // Remove a senha do objeto retornado por segurança
        const { password, ...userWithoutPassword } = registeredUser;
        saveSession(userWithoutPassword);
        return { user: userWithoutPassword, error: null };
    }

    return { user: null, error: "Credenciais inválidas." };
}

export function saveSession(user) {
    if (typeof window === "undefined") return;
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } catch { }
}

export function getSession() {
    if (typeof window === "undefined") return null;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export function logout() {
    if (typeof window === "undefined") return;
    try {
        localStorage.removeItem(STORAGE_KEY);
    } catch { }
}


// --- NOVAS FUNÇÕES ADICIONADAS (PARA CORRIGIR OS ERROS DE IMPORTAÇÃO) ---

/**
 * Verifica se um e-mail já existe na base de usuários cadastrados.
 */
export async function emailExists(email) {
    if (!email) return false;
    const normalizedEmail = email.toLowerCase().trim();
    const registeredUsers = getRegisteredUsers();
    return registeredUsers.some(user => user.email === normalizedEmail);
}

/**
 * Cria um novo usuário e o salva no localStorage.
 */
export async function createUser(userData) {
    const { name, email, password } = userData;

    if (!name || !email || !password) {
        return { user: null, error: "Nome, e-mail e senha são obrigatórios." };
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Verifica se o e-mail já está em uso
    if (await emailExists(normalizedEmail)) {
        return { user: null, error: "Este e-mail já está em uso." };
    }

    const newUser = {
        id: Date.now(), // ID único simples baseado no timestamp
        name,
        email: normalizedEmail,
        password, // Em um app real, a senha SEMPRE deveria ser hasheada!
        confirmed: false, // Para simular a confirmação por e-mail
        role: 'cliente' // Papel padrão para novos usuários
    };

    const users = getRegisteredUsers();
    users.push(newUser);
    saveRegisteredUsers(users);

    // Retorna o usuário sem a senha por segurança
    const { password: _, ...userWithoutPassword } = newUser;
    return { user: userWithoutPassword, error: null };
}

/**
 * Simula a confirmação de e-mail de um usuário.
 */
export async function confirmEmail(token) {
    // Simulação: como não temos um sistema de tokens real, vamos apenas retornar sucesso.
    console.log(`Simulação: E-mail confirmado com o token ${token}.`);
    return { success: true, message: "E-mail confirmado com sucesso!" };
}

/**
 * Simula o pedido de redefinição de senha.
 */
export async function requestPasswordReset(email) {
    const normalizedEmail = email.toLowerCase().trim();
    const users = getRegisteredUsers();
    const user = users.find(u => u.email === normalizedEmail);

    if (!user) {
        // Por segurança, não informamos se o e-mail existe ou não
        return { success: true, message: "Se o e-mail estiver cadastrado, você receberá um link de redefinição." };
    }

    // Simulação: aqui você geraria um token e enviaria por e-mail.
    console.log(`Simulação: Link de redefinição enviado para ${normalizedEmail}.`);
    return { success: true, message: "Se o e-mail estiver cadastrado, você receberá um link de redefinição." };
}

/**
 * Simula a redefinição de senha com um token.
 */
export async function resetPassword(token, newPassword) {
    // Simulação: como não temos um sistema de tokens real, vamos apenas retornar sucesso.
    console.log(`Simulação: Senha redefinida com o token ${token}.`);
    return { success: true, message: "Senha redefinida com sucesso!" };
}