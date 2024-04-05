let participantes = [
    {
      nome: "Felipe de Carvalho",
      email: "felipe@gmail.com",
      dataInscricao: new Date (2024, 2, 19, 22, 00),
      dataCheckIn: new Date (2024, 2, 22, 23, 00),
    },
    {
      nome: "Mayk Brito",
      email: "mayk@gmail.com",
      dataInscricao: new Date (2023, 2, 19, 22, 00),
      dataCheckIn: new Date (2023, 2, 22, 23, 00),
    },
    {
      nome: "Diego Fernandes",
      email: "diego@gmail.com",
      dataInscricao: new Date (2024, 2, 19, 22, 00),
      dataCheckIn: null,
    },
  ];
  
  const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now())
    .to(participante.dataInscricao);
  
    let dataCheckIn = dayjs(Date.now())
    .to(participante.dataCheckIn);
  
    if (participante.dataCheckIn == null) {
      dataCheckIn = `<button data-email="${participante.email}" onclick="fazerCheckIn(event)">Confirmar check-in</button>`;
    };
  
    return `<tr>
        <td>
          <strong>${participante.nome}</strong>
          <br>
          <small>${participante.email}</small>
        </td>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
      </tr>`;
  };
  
  const atualizarLista = (participantes) => {
    let output = "";
  
    for(let participante of participantes) {
      output = output + criarNovoParticipante(participante);
    }
  
    document.querySelector("tbody").innerHTML = output;
  };
  
  atualizarLista(participantes);
  
  const adicionarParticipante = (event) => {
    event.preventDefault();
    const dadosDoFormulario = new FormData(event.target);
  
    const participante = {
      nome: dadosDoFormulario.get("nome"),
      email: dadosDoFormulario.get("email"),
      dataInscricao: new Date(),
      dataCheckIn: null,
    };
  
    const participanteExiste = participantes.find(
      (p) => {
        return p.email == participante.email;
        }
      );
  
      if (participanteExiste) {
        alert("Email já cadastrado!");
        return;
      }
  
    participantes = [participante, ...participantes];
    atualizarLista(participantes);
  
    event.target.querySelector('[name="nome"]').value = "";
    event.target.querySelector('[name="email"]').value = "";
  };
  
  const fazerCheckIn = (event) => {
    const mensagemConfirmacao = "Tem certeza que deseja fazer o check-in?"
    if (confirm(mensagemConfirmacao) == false) {
      return
    }
    const participante = participantes.find((p) => {
      return p.email == event.target.dataset.email
    })
    participante.dataCheckIn = new Date();
    atualizarLista(participantes);
  }