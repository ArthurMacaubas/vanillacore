"use client";

import { useState, useEffect } from 'react';
import styles from './gestaoUsuario.module.css';

export default function UserManagement() {
  // Estado para armazenar a lista de usuários
  const [users, setUsers] = useState([
    { id: 1, name: 'João Silva', email: 'joao@exemplo.com', role: 'Administrador' },
    { id: 2, name: 'Maria Santos', email: 'maria@exemplo.com', role: 'Usuário' },
    { id: 3, name: 'Carlos Oliveira', email: 'carlos@exemplo.com', role: 'Moderador' }
  ]);
  
  // Estado para controlar o formulário
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    email: '',
    role: 'Usuário'
  });
  
  // Estado para controlar se o formulário está visível
  const [showForm, setShowForm] = useState(false);
  
  // Estado para controlar a busca
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para mensagens de feedback
  const [message, setMessage] = useState('');
  
  // Filtrar usuários com base no termo de busca
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Função para lidar com a mudança nos campos do formulário
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Função para adicionar ou editar um usuário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (formData.id) {
      // Editar usuário existente
      setUsers(users.map(user => 
        user.id === formData.id ? formData : user
      ));
      setMessage('Usuário atualizado com sucesso!');
    } else {
      // Adicionar novo usuário
      const newUser = {
        ...formData,
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
      };
      setUsers([...users, newUser]);
      setMessage('Usuário adicionado com sucesso!');
    }
    
    // Resetar formulário
    setFormData({
      id: null,
      name: '',
      email: '',
      role: 'Usuário'
    });
    setShowForm(false);
    
    // Limpar mensagem após 3 segundos
    setTimeout(() => setMessage(''), 3000);
  };
  
  // Função para editar um usuário
  const handleEdit = (user) => {
    setFormData(user);
    setShowForm(true);
  };
  
  // Função para excluir um usuário
  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsers(users.filter(user => user.id !== id));
      setMessage('Usuário excluído com sucesso!');
      setTimeout(() => setMessage(''), 3000);
    }
  };
  
  // Função para cancelar o formulário
  const handleCancel = () => {
    setFormData({
      id: null,
      name: '',
      email: '',
      role: 'Usuário'
    });
    setShowForm(false);
  };
  
  return (
    <main className={styles.main}>
      {/* Seção Hero com título da página */}
      <section className={styles.heroSection}>
        <div className={styles.overlay}></div>
        <div className={styles.heroContent}>
          <h2>Sistema de Gerenciamento de Usuários</h2>
          <p>Administre usuários e permissões do sistema</p>
        </div>
      </section>
      
      {/* Seção de gerenciamento de usuários */}
      <section className={styles.produtosSection}>
        <h1 className={styles.title}>Gerenciamento de Usuários</h1>
        <p className={styles.subtitle}>Controle total sobre os usuários do sistema</p>
        
        {/* Mensagem de feedback */}
        {message && (
          <div className={styles.message}>
            {message}
          </div>
        )}
        
        {/* Barra de busca e botão de adicionar */}
        <div className={styles.toolbar}>
          <input
            type="text"
            placeholder="Buscar usuários..."
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className={styles.addButton}
            onClick={() => setShowForm(true)}
          >
            Adicionar Usuário
          </button>
        </div>
        
        {/* Formulário de adicionar/editar usuário */}
        {showForm && (
          <div className={styles.formContainer}>
            <div className={styles.formCard}>
              <h3>{formData.id ? 'Editar Usuário' : 'Adicionar Novo Usuário'}</h3>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Nome:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="role">Função:</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleInputChange}
                  >
                    <option value="Usuário">Usuário</option>
                    <option value="Moderador">Moderador</option>
                    <option value="Administrador">Administrador</option>
                  </select>
                </div>
                <div className={styles.formButtons}>
                  <button type="submit" className={styles.saveButton}>
                    {formData.id ? 'Atualizar' : 'Salvar'}
                  </button>
                  <button type="button" className={styles.cancelButton} onClick={handleCancel}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        
        {/* Tabela de usuários */}
        <div className={styles.tableContainer}>
          <table className={styles.userTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Função</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`${styles.roleBadge} ${styles[user.role.toLowerCase().replace(' ', '')]}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      <button 
                        className={styles.editButton}
                        onClick={() => handleEdit(user)}
                      >
                        Editar
                      </button>
                      <button 
                        className={styles.deleteButton}
                        onClick={() => handleDelete(user.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className={styles.noResults}>
                    Nenhum usuário encontrado. {searchTerm && 'Tente uma busca diferente.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Cards alternativos para visualização (estilo glassmorphism) */}
        <div className={styles.container}>
          {filteredUsers.map(user => (
            <div key={user.id} className={`${styles.glass} ${styles[`glass${(user.id % 3) + 1}`]}`}>
              <div className={styles.userInfo}>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <span className={`${styles.roleBadge} ${styles[user.role.toLowerCase().replace(' ', '')]}`}>
                  {user.role}
                </span>
              </div>
              <div className={styles.cardActions}>
                <button 
                  className={styles.cardEditButton}
                  onClick={() => handleEdit(user)}
                >
                  Editar
                </button>
                <button 
                  className={styles.cardDeleteButton}
                  onClick={() => handleDelete(user.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
