const info = document.getElementById("inp")
const receber= document.getElementById("inserir")
const total=document.getElementById("total")
const b=document.getElementById("btn")
const saldo=document.getElementById("vTotal")



//codigos supabase
const supabaseUrl = 'https://ofxudymzwrgluaeppcnp.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9meHVkeW16d3JnbHVhZXBwY25wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMzg4MTMsImV4cCI6MjA3NjkxNDgxM30.D8O_WBcrBrZfbj84cerqjwFGFeUwWXVeOaD9jHPSBR4';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

//eventos
b.addEventListener("click" , async () =>{

        //convertendo os valores digitas de Strings para numeros flutuantes
        const valorDoDia=parseFloat(receber.value);
        const valorTotal=parseFloat(total.value);

        //e.preventDefault(); //“Ei navegador, não faça sua ação padrão, eu vou cuidar disso!”  
        
        //informar valores corretore(no caso seria números)
        if (isNaN(valorDoDia) || isNaN(valorTotal)){
            alert("inserir valores validos");
            return;
        }

        //inserindo dados na tabela
        const {data, error} = await supabase
        .from('anota')
        .insert([
            {value_inserted: valorDoDia , total_in_box:valorTotal}
        ]);

        if(error){
            console.log("ocorreu um erro ao  salvar os dados");
            alert("ocorreu um erro ao salvar os dados");
            return;
        }

        //Nesse codigo insere o valor o input e é adicionado abaixo dos que já estão
        info.innerHTML += "Valor Inserido: " +valorDoDia + "<br>"+ "Valor Total em Caixa: " + valorTotal + "<br>" + new Date().toLocaleDateString() +"<br><br>";
        
        saldo.innerHTML="R$: "+total.value;
        //Nesse codigo informa que apos é adicionado o campo do input fica vazio
        receber.value=""
        total.value=""

        




});

