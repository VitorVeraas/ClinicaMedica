class Paciente {
    constructor(id,nome,cpf,dataNascimento){ //Função construtora
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
    }
    getId(){
        return `Id: ${this.id}`;
    }
    setId(id){
        this.id = id;
    }
    getNome(){
        return `Nome: ${this.nome}`;
    }
    setNome(nome){
        this.nome = nome;
    }
    getCpf(){
        return this.cpf;
    }
    setCpf(cpf){
        this.cpf = cpf;
    }
    getData(){
        return `Data: ${this.dataNascimento}`;
    }
    setData(dataNascimento){
        this.dataNascimento = dataNascimento;
    }
    getPaciente(){
        return `Id: ${this.id}, Nome: ${this.nome}, Cpf: ${this.cpf}, Data de Nascimento: ${this.dataNascimento}`;
    }
    setPaciente(nome,cpf,dataNascimento){
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
    }
}
function adicionarPaciente(){ //Adicionar um Paciente
    const id = readline.question("Digite o Id do Paciente: ");
    const nome = readline.question("Digite o Nome todo do Paciente: ");
    const cpf = readline.question("Digite o Cpf todo do Paciente: ");
    const dataNascimento = readline.question("Digite a Data de Nascimento do Paciente:(DD-MM-AAAA) ");
    return new Paciente(id,nome,cpf,dataNascimento);
}
function validarCpf(cpf, pacientes) { //Validar Cpf
    return pacientes.find(paciente => paciente.getCpf() === cpf);
}
function exibirTodosPacientes(pacientes){
    console.log("Esse sao todos os Pacientes Cadastrados:");
    pacientes.forEach((paciente, index) => {
        console.log(`${index + 1}. ${paciente.getPaciente()}`);
    });
}
function menuExibirPaciente(pacientes){ //Para Listar Paciente
    if (!Array.isArray(pacientes)) {
        throw new TypeError('Pacientes deve ser um array.');
    }
    opcao1 = true;
    console.log('Chegamos ao Menu de Listar Paciente!!!');
    while(opcao1 == true){
        console.log('=== 1 - Listar um Paciente ');
        console.log('=== 2 - Listar Todos os Paciente ');
        console.log('=== 3 - Voltar ');
        let escolha = parseInt(readline.question('Qual a sua escolha: '));
        switch (escolha) {
            case 1: //Listar um Paciente
            const cpfBusca = readline.question('Digite o CPF do Paciente: ');
            const pacienteEncontrado = validarCpf(cpfBusca, pacientes);

            if (pacienteEncontrado) {
                console.log('Paciente encontrado com Sucesso!!!');
                console.log(pacienteEncontrado.getPaciente());
            } else {
                console.log('Paciente não encontrado, tente novamente.');
            }
              break;
            case 2: //Listar Todos os Paciente
              exibirTodosPacientes(pacientes);
              break;
            case 3: //Voltar
              opcao1 = false;
              break;
            default: //Se escolher Invalido
              console.log('Essa escolha não existe, tente novamente!!!');
              break;
        }
    }
}
function alterarPaciente(pacienteEncontrado){
    console.log("Obs: Se for o mesmo valor, basta colocar os dados novamente.")
    const novoNome = readline.question('Digite o novo Nome do Paciente: ');
    const novoCpf = readline.question('Digite o novo CPF do Paciente: ');
    const novaData = readline.question('Digite a nova Data do Paciente: ');
    if (novoNome) pacienteEncontrado.setNome(novoNome);
    if (novoCpf) pacienteEncontrado.setCpf(novoCpf);
    if (novaData) pacienteEncontrado.setData(novaData);
    console.log('Paciente Atualizado com Sucesso!!!'); 
}
function removerPaciente(pacientes){
    const cpfBusca = readline.question('Digite o CPF do paciente que deseja remover: ');
    const pacienteEncontrado = validarCpf(cpfBusca, pacientes);

    if (pacienteEncontrado) {
        const pacienteIndex = pacientes.findIndex(paciente => paciente.getCpf() === cpfBusca);
        pacientes.splice(pacienteIndex, 1);
        console.log('Paciente removido com sucesso!');
    } else {
        console.log('Paciente não encontrado.');
    }
}

const readline = require("readline-sync");
opcao = true;
const i = 0; //Teste
const pacientes = []; //Lista de pacientes
console.log('=== Bem vindo ao sistema Clínica Medica!!! ');

while(opcao == true){       
    console.log('=== Vamos ao menu do Paciente: ');
    console.log('=== 1 - Cadastrar um Paciente ');
    console.log('=== 2 - Listar um Paciente ');
    console.log('=== 3 - Remover um Paciente ');
    console.log('=== 4 - Alterar dados de um Paciente ');
    console.log('=== 5 - Sair do Programa ');
    let escolha = parseInt(readline.question('Qual a sua escolha: '));
  switch (escolha) {
    case 1: //Cadastrar um Paciente
      const novoPaciente = adicionarPaciente();
      pacientes.push(novoPaciente); // Por na lista
      console.log('Paciente foi Cadastrador com Sucesso!!!');
      break;
    case 2: //Listar um Paciente
      menuExibirPaciente(pacientes);
      break;
    case 3: //Remover um Paciente
      if(pacientes.length === 0){
        console.log('Nenhum Paciente esta Cadastrado. Adicione um Paciente primeiro.');
        break;
      }     
      removerPaciente(pacientes);
      break;
    case 4: //Alterar dados de um Paciente
      if(pacientes.length === 0){
        console.log('Nenhum Paciente esta Cadastrado. Adicione um Paciente primeiro.');
        break;
      }
      const cpfEscolhido = readline.question('Digite o CPF do Paciente: ');
      const pacienteEncontrado = validarCpf(cpfEscolhido, pacientes);
      if (pacienteEncontrado) {
        console.log('Paciente encontrado com Sucesso!!!');
        console.log(pacienteEncontrado.getPaciente());
        alterarPaciente(pacienteEncontrado);
      } else {
        console.log('Paciente não encontrado, tente novamente.');
      }
      break;
    case 5: //Sair do Programa
      opcao = false;
      break;
    default: //Se escolher Invalido
      console.log('Essa escolha não existe, tente novamente!!!');
      break;
  }
}