const usuarioController = require('../../../src//modules/Usuarios/controllers/usuarioController.js');
const usuarioService = require('../../../src//modules/Usuarios/services/usuarioService.js');

// Mock do service
jest.mock('../../../src/modules/Usuarios/services/usuarioService.js'); 

describe('Usuario Controller - criarUsuario', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    // Configura objetos simulados (req, res)
    mockReq = {
      body: {
        nome: 'Teste',
        email: 'teste@example.com',
        senha: '123456'
      }
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it('deve retornar 201 e o usuário criado em caso de sucesso', async () => {
    // Configura o mock do service
    const mockUsuario = { id: 1, nome: 'Teste', email: 'teste@example.com' };
    usuarioService.cadastrarUsuario.mockResolvedValue(mockUsuario);

    // Executa a função do controller
    await usuarioController.criarUsuario(mockReq, mockRes);

    // Verificações
    expect(usuarioService.cadastrarUsuario).toHaveBeenCalledWith({
      nome: 'Teste',
      email: 'teste@example.com',
      senha: '123456'
    });
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith(mockUsuario);
  });

  it('deve retornar 400 em caso de erro no service', async () => {
    // Configura o mock para simular um erro
    usuarioService.cadastrarUsuario.mockRejectedValue(new Error('Email já existe'));

    // Executa
    await usuarioController.criarUsuario(mockReq, mockRes);

    // Verificações
    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Email já existe' });
  });
});

describe('Usuario Controller - atualizarSenha', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = {
      body: {
        email: 'teste@example.com',
        senhaAntiga: '123456',
        senhaNova: 'Teste@123'
      }
    };

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  it('deve retornar 200 e o usuário que teve a senha alterada em caso de sucesso', async () => {
    usuarioService.updatePassword.mockResolvedValue({ message: 'Senha alterada com sucesso' });

    await usuarioController.atualizarSenha(mockReq, mockRes);

    expect(usuarioService.updatePassword).toHaveBeenCalledWith({
      email: 'teste@example.com',
      senhaAntiga: '123456',
      senhaNova: 'Teste@123'
    });
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Senha alterada com sucesso',
      response: { message: 'Senha alterada com sucesso' }
    });
  });

 it('deve retornar 500 em caso de erro no service', async () => {
    usuarioService.updatePassword.mockRejectedValue(new Error('Senha antiga incorreta. Tente novamente.'));

    await usuarioController.atualizarSenha(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ erro: 'Ocorreu um erro: Error: Senha antiga incorreta. Tente novamente.' });
  });
});