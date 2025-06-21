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
