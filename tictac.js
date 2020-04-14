const tic_tac_toe = {
    board: ['', '', '', '', '', '',  '', '', ''],
    simbols: {
        options: ['X','O'],
        turn_index: 0,
        change: function(){
            this.turn_index = (this.turn_index === 0 ? 1 : 0);
        }
    },
    jogador1: '',
    jogador2: 'CPU',
    vencedor: '',
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
    listaIndex: [],
    index: 0,

    init: function(container){
        this.container_element = container;
    },

    make_play: function(position){
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
                this.sleep(1000).then(() => {
                    this.jogada_cpu();
                });
                //jogada do bot com timer
            }
            return true;
            
        }else{
            return false;
        }
    },

    sleep: function(time){
        return new Promise((resolve) => setTimeout(resolve, time));
    },

    jogada_cpu: function(){
        for(i in this.winning_sequences){
            if(this.board[this.winning_sequences[i][0]] == 'X' && this.board[this.winning_sequences[i][1]] == 'X'){
                if(this.board[this.winning_sequences[i][2]] == ''){
                    this.listaIndex.push(this.winning_sequences[i][2]);
                }
            }else if(this.board[this.winning_sequences[i][1]] == 'X' && this.board[this.winning_sequences[i][2]] == 'X'){
                if(this.board[this.winning_sequences[i][0]] == ''){
                    this.listaIndex.push(this.winning_sequences[i][0]);
                }
            }
            else if(this.board[this.winning_sequences[i][0]] == 'X' && this.board[this.winning_sequences[i][2]] == 'X'){
                if(this.board[this.winning_sequences[i][1]] == ''){
                    this.listaIndex.push(this.winning_sequences[i][1]);
                }
            }
        }
        if(this.listaIndex.length != 0){
            this.index = this.listaIndex[this.listaIndex.length-1];
        }else{
            var min = Math.ceil(0);
            var max = Math.floor(9);
            this.index = Math.floor(Math.random() * (max - min + 1)) + min;
        }

        if (this.board[this.index] === ''){
            this.board[this.index] = this.simbols.options [ this.simbols.turn_index ];
            this.draw();
            let winning_sequences_index = this.check_winning_sequences(this.simbols.options [ this.simbols.turn_index ]);
            if(winning_sequences_index >= 0) {
                this.vencedor = (this.simbols.turn_index == 0 ? this.jogador1 : this.jogador2);
                this.game_is_over(this.vencedor);
            }else{
                this.simbols.change();
            }
            return true;
            
        }else{
            this.jogada_cpu();
        }
    },

    game_is_over: function(vencedor){
        alert('FIM DE JOGO! \n ' + vencedor + ' ganhou a partida!');
        this.simbols.turn_index = 0;
        this.gameover = true;
        this.start();
    },

    start: function(){
        this.board.fill('');
        this.draw();
        this.gameover = false;
        this.jogador1 = prompt('Digite o nome do jogador 1: ', 'Jogador 1');
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