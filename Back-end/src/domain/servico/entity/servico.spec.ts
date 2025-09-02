import { Servico, ServicoProps } from './servico';

describe('Servico', () => {
  const baseProps: Omit<ServicoProps, 'id'> = {
    nome: 'Corte de Cabelo',
    preco: 50,
    descricao: 'Corte moderno e estiloso.',
    destaque: true,
    duracaoEmMinutos: 60,
  };

  describe('Constructor', () => {
    it('should create an instance with valid properties', () => {
      const servico = Servico.with({ ...baseProps, id: 'valid-id' });
      expect(servico).toBeInstanceOf(Servico);
      expect(servico.prop.id).toBe('valid-id');
    });

    it('should throw an error if nome is empty', () => {
      expect(() => Servico.with({ ...baseProps, id: '123', nome: '' })).toThrow('Nome do serviço é obrigatório.');
    });

    it('should throw an error if preco is zero or negative', () => {
      expect(() => Servico.with({ ...baseProps, id: '123', preco: 0 })).toThrow('Preço do serviço deve ser positivo.');
      expect(() => Servico.with({ ...baseProps, id: '123', preco: -10 })).toThrow('Preço do serviço deve ser positivo.');
    });

    it('should throw an error if duracaoEmMinutos is zero or negative', () => {
      expect(() => Servico.with({ ...baseProps, id: '123', duracaoEmMinutos: 0 })).toThrow('Duração do serviço deve ser um número positivo.');
      expect(() => Servico.with({ ...baseProps, id: '123', duracaoEmMinutos: -10 })).toThrow('Duração do serviço deve ser um número positivo.');
    });
  });

  describe('Static create method', () => {
    it('should create a new service instance with a valid UUID', () => {
      const servico = Servico.create(
        baseProps.nome,
        baseProps.preco,
        baseProps.descricao,
        baseProps.destaque,
        baseProps.duracaoEmMinutos
      );
      expect(servico).toBeInstanceOf(Servico);
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
      expect(servico.id).toMatch(uuidRegex);
    });

    it('should throw an error on empty nome', () => {
      expect(() => Servico.create('', 50, null, false, 60)).toThrow('Nome do serviço não pode ser vazio.');
    });

    it('should throw an error on invalid preco', () => {
      expect(() => Servico.create('Serviço', 0, null, false, 60)).toThrow('Preço do serviço deve ser positivo.');
    });
  });


  describe('Update method', () => {
    let servico: Servico;

    beforeEach(() => {
      servico = Servico.with({ ...baseProps, id: '123' });
    });

    it('should update nome, preco, descricao and destaque', () => {
      servico.update('Novo Nome', 100, 'Nova Descrição', false);
      expect(servico.nome).toBe('Novo Nome');
      expect(servico.preco).toBe(100);
      expect(servico.descricao).toBe('Nova Descrição');
      expect(servico.destaque).toBe(false);
    });

    it('should update duracaoEmMinutos with a positive value', () => {
      servico.update(undefined, undefined, undefined, undefined, 90);
      expect(servico.duracaoEmMinutos).toBe(90);
    });

    it('should set duracaoEmMinutos to 30 when null is provided', () => {
      servico.update(undefined, undefined, undefined, undefined, null);
      expect(servico.duracaoEmMinutos).toBe(30);
    });

    it('should throw an error if duracaoEmMinutos is negative', () => {
      expect(() => servico.update(undefined, undefined, undefined, undefined, -10)).toThrow('Horas de servico não podem ser negativos');
    });

    it('should not update properties if undefined is passed', () => {
      const originalNome = servico.nome;
      const originalPreco = servico.preco;
      servico.update(undefined, undefined, undefined, undefined, undefined);
      expect(servico.nome).toBe(originalNome);
      expect(servico.preco).toBe(originalPreco);
    });
  });
});
