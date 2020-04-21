const tic_tac_toe = {
    board: ['', '', '', '', '', '', '', '', ''],
    simbols: {
        options: ['X','O'],
        turn_index: 0,
        change: function(){
            this.turn_index = (this.turn_index === 0 ? 1 : 0);
            if(this.turn_index === 0){
                document.getElementById('turn').innerHTML = 'Sua vez!';
            }else{
                document.getElementById('turn').innerHTML = 'Vez do adversário!';
            }
            
        }
    },
    jogador1: 'Jogador 1',
    jogador2: 'CPU',
    vencedor: '',
    placar: {
        jogador1: 0,
        jogador2: 0
    },
    container_element: null,
    gameover: false,
    winning_sequences: [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ],
    listaBloqueio: [],
    listaGanha: [],
    index: 0,

    init: function(container){
        this.container_element = container;
    },

    verificaVelha: function(){
        var total = 0;
        for(i in this.board){
            if(this.board[i] != ''){
                total++;
                
                if(total == 9){
                    alert('Velha, fim de jogo!');
                    this.gameover = true;
                    this.start();  
                }

            }
        }
        console.log('total:: ', total);
    },

    make_play: function(position){
        if(this.simbols.turn_index == 0){
            if (this.gameover) return false;
            if (this.board[position] === ''){
                this.board[position] = this.simbols.options [ this.simbols.turn_index ];
                this.draw();
                let winning_sequences_index = this.check_winning_sequences(this.simbols.options [ this.simbols.turn_index ]);
                if(winning_sequences_index >= 0) {
                    this.vencedor = (this.simbols.turn_index == 0 ? this.jogador1 : this.jogador2);
                    this.game_is_over(this.vencedor);
                }else{
                    this.simbols.change();
                    this.verificaVelha();
                    this.sleep(1000).then(() => {
                        this.jogada_cpu();
                    });
                    //jogada do bot com timer
                }
                return true;
                
            }else{
                return false;
            }
        }
    },

    sleep: function(time){
        return new Promise((resolve) => setTimeout(resolve, time));
    },

    jogada_cpu: function(){
        //verifica sequencia ganhadora
        for(i in this.winning_sequences){
            if(this.board[this.winning_sequences[i][0]] == 'O' && this.board[this.winning_sequences[i][1]] == 'O'){
                if(this.board[this.winning_sequences[i][2]] == ''){
                    this.listaGanha.push(this.winning_sequences[i][2]);
                }
            }else if(this.board[this.winning_sequences[i][1]] == 'O' && this.board[this.winning_sequences[i][2]] == 'O'){
                if(this.board[this.winning_sequences[i][0]] == ''){
                    this.listaGanha.push(this.winning_sequences[i][0]);
                }
            }
            else if(this.board[this.winning_sequences[i][0]] == 'O' && this.board[this.winning_sequences[i][2]] == 'O'){
                if(this.board[this.winning_sequences[i][1]] == ''){
                    this.listaGanha.push(this.winning_sequences[i][1]);
                }
            }
        }
        //verifica sequencia de bloqueio
        for(i in this.winning_sequences){
            if(this.board[this.winning_sequences[i][0]] == 'X' && this.board[this.winning_sequences[i][1]] == 'X'){
                if(this.board[this.winning_sequences[i][2]] == ''){
                    this.listaBloqueio.push(this.winning_sequences[i][2]);
                }
            }else if(this.board[this.winning_sequences[i][1]] == 'X' && this.board[this.winning_sequences[i][2]] == 'X'){
                if(this.board[this.winning_sequences[i][0]] == ''){
                    this.listaBloqueio.push(this.winning_sequences[i][0]);
                }
            }
            else if(this.board[this.winning_sequences[i][0]] == 'X' && this.board[this.winning_sequences[i][2]] == 'X'){
                if(this.board[this.winning_sequences[i][1]] == ''){
                    this.listaBloqueio.push(this.winning_sequences[i][1]);
                }
            }
        }

        if(this.listaGanha.length != 0){
            this.index = this.listaGanha[this.listaGanha.length-1];
            console.log('listaGanha');
        }else if(this.listaBloqueio.length != 0){
            this.index = this.listaBloqueio[this.listaBloqueio.length-1];
            console.log('listaBloqueio');
        }else{
            this.gerarValorAleatorio();
        }

        this.executaJogada();
        
    },

    executaJogada: function(){
        if (this.board[this.index] === ''){
            this.board[this.index] = this.simbols.options [ this.simbols.turn_index ];
            this.draw();
            let winning_sequences_index = this.check_winning_sequences(this.simbols.options [ this.simbols.turn_index ]);
            if(winning_sequences_index >= 0) {
                this.vencedor = (this.simbols.turn_index == 0 ? this.jogador1 : this.jogador2);
                this.game_is_over(this.vencedor);
            }else{
                this.verificaVelha();
                this.simbols.change();
            }
            return true;
            
        }else{
            this.gerarValorAleatorio();
            this.executaJogada();
        }
    },

    gerarValorAleatorio: function(){
        console.log('Gerou Aleatório');
        var min = Math.ceil(0);
        var max = Math.floor(9);
        this.index = Math.floor(Math.random() * (max - min + 1)) + min;
    },

    game_is_over: function(vencedor){
        alert('FIM DE JOGO! \n ' + vencedor + ' ganhou a partida!');
        if(vencedor == this.jogador1){
            this.placar.jogador1++;
        }else{
            this.placar.jogador2++;
        }
        document.getElementById('placar1').innerHTML = this.jogador1 + ': ' + this.placar.jogador1;
        document.getElementById('placar2').innerHTML = this.jogador2 + ': ' + this.placar.jogador2;
        this.simbols.turn_index = 0;
        this.gameover = true;
        this.start();
    },

    start: function(){
        this.listaBloqueio=[];
        this.listaGanha=[];
        this.board.fill('');
        document.getElementById('turn').innerHTML = 'Sua vez!';
        this.draw();
        this.gameover = false;
        this.jogador1 = prompt('Digite o nome do jogador 1: ', this.jogador1);
        this.jogador1 = (this.jogador1 == null ? 'Jogador 1' : this.jogador1);
/*         this.jogador2 = prompt('Digite o nome do jogador 2: ', 'Jogador 2');
        this.jogador2 = (this.jogador2 == null ? 'Jogador 2' : this.jogador2); */
    },

    check_winning_sequences: function(simbol){
        for(i in this.winning_sequences){
            if(this.board[this.winning_sequences[i][0]] == simbol && 
               this.board[this.winning_sequences[i][1]] == simbol &&
               this.board[this.winning_sequences[i][2]] == simbol ){
                   console.log('ganhou ' + i);
                   return i;
               }
        }
        return -1;
    },

    draw: function(){
        let content = '';

        for (i in this.board){
            content += '<div onclick="tic_tac_toe.make_play('+i+')">' + this.board[i] + '</div>';
        }

        this.container_element.innerHTML = content;
    }

};