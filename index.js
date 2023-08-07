const express = require("express");
const cors = require('cors');

const listenerPort = 8080;

const app = express();

app.use(cors({
    origin: '*'
}), express.json());

app.get('/', (req, res) =>{
    console.log('Deu certo!');
});

//Calculo se o numero eh impar ou par!

app.post('/imparPar', (req, res) => {
    let {numero} = req.body;
    let resultado = '';

    if(Number(numero) === 0){
        resultado = `O numero ${Number(numero)} eh 0`
    }
    else if(Number(numero) %2 === 0){
        resultado = `O numero ${Number(numero)} eh par`
    }
    else{
        resultado = `O numero ${Number(numero)} eh impar`
    }

    return res.json(resultado)
});

//Calcula a soma de dois numeros!

app.post('/soma', (req, res) =>{
    let {numero1, numero2} = req.body;
    let resultado = '';
    let soma = 0;

    if(!numero1 || !numero2){
        return res.status(401).send('Para efetuar a soma insira os dois valores!')
    }
    else{
        soma = Number(numero1) + Number(numero2);
        resultado = `${Number(numero1)} + ${Number(numero2)} = ${Number(soma)}`;
        return res.json(resultado)
    }
});

//Calcula a media entre 4 notas!

app.post('/media', (req, res) =>{
    let{numero1, numero2, numero3, numero4} = req.body;
    let media = 0;
    let resultado = '';

    if(!numero1 || !numero2 || !numero3 || !numero4){
        return res.status(401).send('Preencha todos os valores!');
    }
    else{
        media = (Number(numero1) + Number(numero2) + Number(numero3) + Number(numero4)) / 4;

        if(media >= 7){
            resultado = `Aluno Aprovado, media: ${Number(media)}`
            return res.json(resultado);
        }
        else if(media >= 4){
            resultado = `Aluno em Recuperação, media: ${Number(media)}`
            return res.json(resultado);
        }
        else{
            resultado = `Aluno Reprovado, media: ${Number(media)}`
            return res.json(resultado);
        }
    }
});

//Calcula o fatorial

app.post('/fatorial', (req, res) =>{
    let {fatorial} = req.body;
    let resultado = '';



    if(fatorial<0) {
        resultado = 'Valor deve ser maior ou igual a zero';
        return res.json(resultado);
    } 
    else if ( (fatorial == 0) || (fatorial == 1) ) {
        resultado = 'O fatorial eh: 1'
        return res.json(resultado);
       
      } 
    else {
        let acumula = 1;
        for(x = fatorial; x > 1; x--) {
          acumula = acumula * x;
        }
        resultado = `O fatorial eh: ${acumula}`
        return res.json(resultado);
    } 
})

//Conversor de temperatura

app.post('/temperatura', (req, res) =>{
    let {temperatura} = req.body;
    let {opcao} = req.body;
    let temperaturaConvertida = 0;
    let resultado = ''

    //Converte de Fahrenheit p/ Celcius

    if(opcao === 1){
        temperaturaConvertida = (temperatura - 32) / (9/5);
        temperaturaConvertida = temperaturaConvertida.toFixed(2);
        resultado = `${temperatura}F° eh ${temperaturaConvertida}°C`
        return res.json(resultado)
    }
    
    //Converte de Celcius p/ Fahrenheit

    else if(opcao === 2){
        temperaturaConvertida = temperatura * (9/5) + 32;
        temperaturaConvertida = temperaturaConvertida.toFixed(2);
        resultado = `${temperatura}°C eh ${temperaturaConvertida}F°`
        return res.json(resultado)
    }
    else{
        resultado = `Opção invalida`;
        return res.json(resultado)
    }
})

app.listen(listenerPort, () =>{
    console.log('rodando na porta: ', + listenerPort)
})
