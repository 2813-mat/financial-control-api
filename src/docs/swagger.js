/**
 * @swagger
 * tags:
 *   - name: Autenticação
 *     description: Endpoints de login e registro de usuários
 *   - name: Usuários
 *     description: Gerenciamento de usuários
 *   - name: Categorias
 *     description: Gerenciamento de categorias de transações
 *   - name: Transações
 *     description: Controle de transações financeiras
 *   - name: Grupos
 *     description: Gerenciamento de grupos e colaborações
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Autenticar usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Retorna token JWT
 *       401:
 *         description: Credenciais inválidas
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Cadastrar novo usuário
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       400:
 *         description: Dados inválidos
 * 
 *   get:
 *     summary: Listar todos os usuários
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /usuarios/email:
 *   get:
 *     summary: Buscar usuário por e-mail
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: email
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       404:
 *         description: Usuário não encontrado
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Apagar usuário (desativar)
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário desativado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *
 *   put:
 *     summary: Reativar usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuário reativado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *
 *   patch:
 *     summary: Atualizar tipo de usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AtualizarTipoUsuario'
 *     responses:
 *       200:
 *         description: Tipo de usuário atualizado com sucesso
 *       400:
 *         description: Tipo inválido
 *       404:
 *         description: Usuário não encontrado
 */

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Criar uma nova categoria
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoriaInput'
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *
 *   get:
 *     summary: Listar categorias do usuário autenticado
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /categorias/{id}:
 *   delete:
 *     summary: Apagar uma categoria
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria apagada com sucesso
 *       404:
 *         description: Categoria não encontrada
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /transacoes:
 *   post:
 *     summary: Criar uma nova transação
 *     tags: [Transações]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransacaoInput'
 *     responses:
 *       201:
 *         description: Transação criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transacao'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *
 *   get:
 *     summary: Listar transações do usuário autenticado
 *     tags: [Transações]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de transações
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transacao'
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * /grupos:
 *   post:
 *     summary: Criar um grupo
 *     tags: [Grupos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GrupoInput'
 *     responses:
 *       201:
 *         description: Grupo criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Grupo'
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 *
 *   get:
 *     summary: Listar grupos
 *     tags: [Grupos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de grupos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Grupo'
 *       401:
 *         description: Não autorizado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nome:
 *           type: string
 *         email:
 *           type: string
 *         tipo:
 *           type: string
 *           enum: [ADMIN, CONTROLADOR, COMUM]
 *         grupoId:
 *           type: integer
 *           nullable: true
 *         criadoEm:
 *           type: string
 *           format: date-time
 *         atualizadoEm:
 *           type: string
 *           format: date-time
 *         ativo:
 *           type: boolean
 *     UsuarioInput:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - senha
 *       properties:
 *         nome:
 *           type: string
 *         email:
 *           type: string
 *         senha:
 *           type: string
 *     AtualizarTipoUsuario:
 *       type: object
 *       required:
 *         - tipo
 *       properties:
 *         tipo:
 *           type: string
 *           enum: [ADMIN, CONTROLADOR, COMUM]
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CategoriaInput:
 *       type: object
 *       required:
 *         - nome
 *         - tipo
 *       properties:
 *         nome:
 *           type: string
 *           example: Alimentação
 *         tipo:
 *           type: string
 *           enum: [RECEITA, DESPESA]
 *           example: DESPESA
 *
 *     Categoria:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nome:
 *           type: string
 *         tipo:
 *           type: string
 *           enum: [RECEITA, DESPESA]
 *         usuarioId:
 *           type: integer
 *         transacoes:
 *           type: array
 *           items:
 *             type: object
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     TransacaoInput:
 *       type: object
 *       required:
 *         - valor
 *         - data
 *         - tipo
 *         - categoriaNome
 *       properties:
 *         valor:
 *           type: number
 *           example: 100.50
 *         data:
 *           type: string
 *           format: date
 *           example: '2025-06-10'
 *         descricao:
 *           type: string
 *           example: Compras no supermercado
 *         tipo:
 *           type: string
 *           enum: [RECEITA, DESPESA]
 *           example: DESPESA
 *         categoriaNome:
 *           type: string
 *           example: Alimentação
 * 
 *     Transacao:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         valor:
 *           type: number
 *         data:
 *           type: string
 *           format: date-time
 *         descricao:
 *           type: string
 *         tipo:
 *           type: string
 *           enum: [RECEITA, DESPESA]
 *         usuarioId:
 *           type: integer
 *         categoriaId:
 *           type: integer
 * 
 *     GrupoInput:
 *       type: object
 *       required:
 *         - nome
 *       properties:
 *         nome:
 *           type: string
 *           example: Time de Finanças
 * 
 *     Grupo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nome:
 *           type: string
 *         criadoEm:
 *           type: string
 *           format: date-time
 */
