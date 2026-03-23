const info = document.getElementById("inp")
const receber= document.getElementById("inserir")
const total=document.getElementById("total")
const b=document.getElementById("btn")
const saldo=document.getElementById("vTotal")



//codigos supabase
const supabaseCliente = window.supabase.createClient(
  "https://ofxudymzwrgluaeppcnp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9meHVkeW16d3JnbHVhZXBwY25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMzg4MTMsImV4cCI6MjA3NjkxNDgxM30.D8O_WBcrBrZfbj84cerqjwFGFeUwWXVeOaD9jHPSBR4"
);

// forma correta v2


//evento de click quando o usuario digitar os valores e inserir
b.addEventListener("click" , async () =>{

        //convertendo os valores digitas de Strings para numeros flutuantes
        const valorDoDia=parseFloat(receber.value);
         //const valorTotal=parseFloat(total.value);

        //e.preventDefault(); //“Ei navegador, não faça sua ação padrão, eu vou cuidar disso!”  
        
        //informar valores corretor(no caso seria números)
        if (isNaN(valorDoDia)) {//|| isNaN(valorTotal)){
            alert("inserir valores validos");
            return;
        }

        //inserindo dados na tabela
        const {data, error} = await supabaseCliente
        //nome da tabela
        .from('anota')
        //inserindo o valores nas tabelas do banco
        .insert([
            {valor_inserido: valorDoDia }//, total_in_box:valorTotal}
        ]);

        //informa se consta algum erro
        if(error){
            console.log(error);
            alert("ocorreu um erro ao salvar os dados");
            return;
        }

        //Nesse codigo insere o valor o input e é adicionado abaixo dos que já estão
        //info.innerHTML += "Valor Inserido: " +valorDoDia ; //"<br>"+ "Valor Total em Caixa: " ;//+ valorTotal + "<br>" + new Date().toLocaleDateString() +"<br><br>";
        
        
        //Nesse codigo informa que apos ser adicionado o campo do input fica vazio
        receber.value=""
        //total.value=""
        location.reload()

});

//Nessa função lista todos os dados na div 
async function listarDados(){
    const {data , error} = await supabaseCliente
    .from('anota')
    .select('*')

    if(error){
        alert("erro ao consultar tabela");
        console.log("erro ao consultar tabela");
        return
    }

    console.log(data);
    
    //O forEach serve pra percorrer toodos os dados da tabela ou da coluna
    data.forEach(element => {
        info.innerHTML+= "Valor inserido :"+ +element.valor_inserido + "<br><br>"; //+ "<br>" +"Valor total do dia: " +element.total_in_box +"<br><br>";
        
    });

}
listarDados();


//nessa função é feito a soma de todos os dados da coluna total_insert
async function saldo_total() {
    const {data,error} = await supabaseCliente
    .from('anota')
    .select("valor_inserido")

    if(error){
        console.log(error)
    }
    
    
    let sum =0;
    data.forEach(element=>{    
        sum +=element.valor_inserido;
    });

    saldo.innerHTML=sum
    console.log(sum);
        
}
saldo_total();


/***
 * 
 
let valorSelect=document.getElementById("sele")
let dVazia=document.getElementById("vazio")

async function atualizarValor() {
    dVazia.innerHTML="";

    switch(valorSelect.value){

        case "atualizar":{

        const chavePrim=document.createElement('input');
        chavePrim.type="number";
        chavePrim.id="chave";
        chavePrim.placeholder="Digite o Id Desejado"


        const valorNew=document.createElement('input');
        valorNew.type="number";
        valorNew.id="valorNovo";
        valorNew.placeholder="Digite o Nome valor que Deseja";

    
        dVazia.appendChild(chavePrim);
        dVazia.appendChild(valorNew)
        break;
       }

       default:
        alert('Selecione a opção');
        break;
    }  
}


 */
