const usuarioService = require('../../../src//modules/Usuarios/services/usuarioService.js');
const usuarioRepository = require('../../../src//modules/Usuarios/repositories/usuarioRepository.js');
const bcrypt = require('bcrypt');

jest.mock('../../../src/modules/Usuarios/repositories/usuarioRepository.js');
jest.mock('bcrypt');

describe('Usuario Service - cadastrarUsuario', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Reseta os mocks entre testes
  });

  it('deve chamar encontrarPorEmail com o e-mail correto', async () => {
    // Configura os mocks
    usuarioRepository.encontrarPorEmail.mockResolvedValue(null);
    bcrypt.hash.mockResolvedValue('hash_fake');

    // Chama a função do service (sem injeção de dependências)
    await usuarioService.cadastrarUsuario({
      nome: 'João',
      email: 'joao@test.com',
      senha: '123'
    });

    // Verifica se o repositório foi chamado
    expect(usuarioRepository.encontrarPorEmail).toHaveBeenCalledWith('joao@test.com');
  });
});


describe('Usuario Service - updatePassword', () => {
  beforeEach(() => {
    jest.clearAllMocks(); 
  });


  it('deve atualizar a senha com sucesso quando a senha antiga for válida', async () => {
    usuarioRepository.encontrarPorEmail.mockResolvedValue({ 
      id: 1, 
      email: 'teste@example.com', 
      senhaHash: 'hash_antigo' 
    });
    bcrypt.compare.mockResolvedValue(true);
    bcrypt.hash.mockResolvedValue('novo_hash');
    usuarioRepository.atualizaSenha.mockResolvedValue({ id: 1, email: 'teste@example.com', senhaHash: 'novo_hash' });

    const resultado = await usuarioService.updatePassword('senha_antiga', 'senha_nova', 'teste@example.com');

    expect(usuarioRepository.encontrarPorEmail).toHaveBeenCalledWith('teste@example.com');
    expect(bcrypt.compare).toHaveBeenCalledWith('senha_antiga', 'hash_antigo');
    expect(bcrypt.hash).toHaveBeenCalledWith('senha_nova', 10);
    expect(usuarioRepository.atualizaSenha).toHaveBeenCalledWith(1, 'novo_hash');
    expect(resultado).toEqual({ id: 1, email: 'teste@example.com', senhaHash: 'novo_hash' });
  });

  it('deve lançar um erro se a senha antiga for incorreta', async () => {
    usuarioRepository.encontrarPorEmail.mockResolvedValue({ 
      id: 1, 
      email: 'teste@example.com', 
      senhaHash: 'hash_antigo' 
    });
    bcrypt.compare.mockResolvedValue(false);

    try {
      await usuarioService.updatePassword('senha_antiga_errada', 'senha_nova', 'teste@example.com');
      fail('Deveria ter lançado um erro, mas não o fez.');
    } catch (error) {
      expect(error.message).toBe('Senha antiga incorreta. Tente novamente.');
      expect(usuarioRepository.atualizaSenha).not.toHaveBeenCalled();
    }
  });

  it('deve lançar um erro se o usuário não for encontrado', async () => {
    usuarioRepository.encontrarPorEmail.mockResolvedValue(null);

    try {
      await usuarioService.updatePassword('senha_antiga', 'senha_nova', 'nao_existe@example.com');
      fail('Deveria ter lançado um erro, mas não o fez.');
    } catch (error) {
      expect(error.message).toBe('Não existe usuário com este e-mail');
    }
  });
});