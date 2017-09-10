'use strict';

function jsonp_callback(data) {
    // returning from async callbacks is (generally) meaningless
    console.log(data.found);
}


// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', ['ngRoute', 'ngAnimate', 'ngTouch', 'myAppControllers'], function($provide) {
        // Prevent Angular from sniffing for the history API since it's not supported in packaged apps.
		// this prevents error "history.pushState is not available in packaged apps."
        $provide.decorator('$window', function($delegate) {
            //$delegate.history = null;
            Object.defineProperty($delegate, 'history', {get: () => null});
            return $delegate;
        });
    })
	.config( [
		'$compileProvider',
		function( $compileProvider ) {
			$compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|blob|mailto|chrome-extension):/);
			$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|file|blob|mailto|chrome-extension):/);
		}
	])
    .config([
        '$routeProvider', function ($routeProvider) {
            $routeProvider.when('/', { templateUrl: 'assets/partials/homeView.html' });
            $routeProvider.when('/impara', { templateUrl: 'assets/partials/imparaView.html' });
            $routeProvider.when('/gioca', { templateUrl: 'assets/partials/giocaView.html' });
            $routeProvider.when('/ascolta/:name', { templateUrl: 'assets/partials/ascoltaView.html' });
            $routeProvider.when('/scrittura/:name', { templateUrl: 'assets/partials/scritturaView.html' });
            $routeProvider.when('/preLettura/:name', { templateUrl: 'assets/partials/preLetturaView.html' });
            $routeProvider.when('/lettura/:name', { templateUrl: 'assets/partials/letturaView.html' });
            $routeProvider.when('/verifica/:name', { templateUrl: 'assets/partials/verificaView.html' });
            $routeProvider.when('/minuscoloPreScrittura', { templateUrl: 'assets/partials/minuscoloPreScritturaView.html' });
            $routeProvider.when('/minuscoloScrittura', { templateUrl: 'assets/partials/minuscoloScritturaView.html' });
            $routeProvider.when('/gioca/sillabe', { templateUrl: 'assets/partials/giocaSillabeView.html' });
            $routeProvider.when('/gioca/parole', { templateUrl: 'assets/partials/giocaParoleView.html' });
            $routeProvider.when('/leggi', { templateUrl: 'assets/partials/leggiView.html' });
            $routeProvider.when('/crediti', { templateUrl: 'assets/partials/creditiView.html' });
            $routeProvider.when('/versioni', { templateUrl: 'assets/partials/versioniView.html' });
            $routeProvider.otherwise({ redirectTo: '/' });
        }
    ])
;

var $VISITEHOMEPAGE = 1;

var $IMG_LETTERA = 'assets/images/lettera.png';
var $IMG_CARTA_CASO = 'assets/images/lettera-caso.png';
var $IMG_LETTERA_VUOTA = 'assets/images/lettera-vuota.png';

var $STR_ASCOLTO = 'ASCOLTO';
var $STR_SCRITTURA = 'SCRITTURA';
var $STR_PRELETTURA = 'PRE-LETTURA';
var $STR_LETTURA = 'LETTURA';
var $STR_VERIFICA = 'VERIFICA';
var $STR_MINUSCOLOPRESCRITTURA = 'MINUSCOLO PRE-SCRITTURA';
var $STR_MINUSCOLOSCRITTURA = 'MINUSCOLO SCRITTURA';
var $STR_GIOCAPAROLE = 'GIOCA CON LE PAROLE';
var $STR_GIOCASILLABE = 'GIOCA CON LE SILLABE';
var $STR_01 = 'LETTERE DOPPIE';
var $STR_02 = 'VOCALE INIZIALE';
var $STR_03 = 'DUE VOCALI';
var $STR_04 = 'SILLABA INVERSA';
var $STR_05 = 'CONSONANTE INTERMEDIA';
var $STR_06 = 'SC SP ST';
var $STR_07 = 'BR CR DR FR GR PR TR';
var $STR_08 = 'GN';
var $STR_09 = 'GLI';
var $STR_10 = 'SCE SCI';
var $STR_11 = 'minuscolo';

var $carteRiga1 = [
    { 'name': 'carta-01.png', 'imageUrl': 'assets/images/carte/carta-01.png', 'valore': '01' },
    { 'name': 'carta-02.png', 'imageUrl': 'assets/images/carte/carta-02.png', 'valore': '02' },
    { 'name': 'carta-03.png', 'imageUrl': 'assets/images/carte/carta-03.png', 'valore': '03' },
    { 'name': 'carta-04.png', 'imageUrl': 'assets/images/carte/carta-04.png', 'valore': '04' }
];
var $carteRiga2 = [
    { 'name': 'carta-05.png', 'imageUrl': 'assets/images/carte/carta-05.png', 'valore': '05' },
    { 'name': 'carta-06.png', 'imageUrl': 'assets/images/carte/carta-06.png', 'valore': '06' },
    { 'name': 'carta-07.png', 'imageUrl': 'assets/images/carte/carta-07.png', 'valore': '07' },
    { 'name': 'carta-08.png', 'imageUrl': 'assets/images/carte/carta-08.png', 'valore': '08' }
];
var $carteRiga3 = [
    { 'name': 'carta-09.png', 'imageUrl': 'assets/images/carte/carta-09.png', 'valore': '09' },
    { 'name': 'carta-10.png', 'imageUrl': 'assets/images/carte/carta-10.png', 'valore': '10' }
];
var $carteSpeciali = [
    { 'name': 'carta-11.png', 'imageUrl': 'assets/images/carte/carta-11.png', 'valore': '11' }
];

var $carteLivelli = $carteRiga1.concat($carteRiga2).concat($carteRiga3).concat($carteSpeciali);

var $paroleAscolto = [
    { 'group': '01', 'completa': 'POLLO', 'parti': ['PO', 'LLO'], 'audioParola': 'assets/sounds2/01-lettere-doppie/pollo-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/01-lettere-doppie/pollo-sillaba-01.mp3', 'assets/sounds2/01-lettere-doppie/pollo-sillaba-02.mp3'] },
    { 'group': '01', 'completa': 'CAFFÈ', 'parti': ['CA', 'FFÈ'], 'audioParola': 'assets/sounds2/01-lettere-doppie/caffe-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/01-lettere-doppie/caffe-sillaba-01.mp3', 'assets/sounds2/01-lettere-doppie/caffe-sillaba-02.mp3'] },

    { 'group': '02', 'completa': 'UNO', 'parti': ['U', 'NO'], 'audioParola': 'assets/sounds2/02-vocale-iniziale/uno-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/02-vocale-iniziale/uno-doppio-sillaba-01.mp3', 'assets/sounds2/02-vocale-iniziale/uno-doppio-sillaba-02.mp3'] },
    { 'group': '02', 'completa': 'ORA', 'parti': ['O', 'RA'], 'audioParola': 'assets/sounds2/02-vocale-iniziale/ora-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/02-vocale-iniziale/ora-sillaba-01.mp3', 'assets/sounds2/02-vocale-iniziale/ora-sillaba-02.mp3'] },

    { 'group': '03', 'completa': 'DUE', 'parti': [], 'audioParola': 'assets/sounds2/03-due-vocali/due-sillaba-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/03-due-vocali/due-sillaba-01.mp3'] },
    { 'group': '03', 'completa': 'FIORE', 'parti': ['FIO', 'RE'], 'audioParola': 'assets/sounds2/03-due-vocali/fiore-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/03-due-vocali/fiore-sillaba-01.mp3', 'assets/sounds2/03-due-vocali/fiore-sillaba-02.mp3'] },

    { 'group': '04', 'completa': 'UL', 'parti': ['AL', 'EL', 'IL', 'OL'], 'audioParola': 'assets/sounds2/04-sillaba-inversa/04-al-el-il-ol-ul.mp3', 'audioParti': ['assets/sounds2/04-sillaba-inversa/04-al.mp3', 'assets/sounds2/04-sillaba-inversa/04-el.mp3', 'assets/sounds2/04-sillaba-inversa/04-il.mp3', 'assets/sounds2/04-sillaba-inversa/04-ol.mp3', 'assets/sounds2/04-sillaba-inversa/04-ul.mp3'] },
    { 'group': '04', 'completa': 'UM', 'parti': ['AM', 'EM', 'IM', 'OM'], 'audioParola': 'assets/sounds2/04-sillaba-inversa/04-am-em-im-om-um.mp3', 'audioParti': ['assets/sounds2/04-sillaba-inversa/04-am.mp3', 'assets/sounds2/04-sillaba-inversa/04-em.mp3', 'assets/sounds2/04-sillaba-inversa/04-im.mp3', 'assets/sounds2/04-sillaba-inversa/04-om.mp3', 'assets/sounds2/04-sillaba-inversa/04-um.mp3'] },
    { 'group': '04', 'completa': 'UN', 'parti': ['AN', 'EN', 'IN', 'ON'], 'audioParola': 'assets/sounds2/04-sillaba-inversa/04-an-en-in-on-un.mp3', 'audioParti': ['assets/sounds2/04-sillaba-inversa/04-an.mp3', 'assets/sounds2/04-sillaba-inversa/04-en.mp3', 'assets/sounds2/04-sillaba-inversa/04-in.mp3', 'assets/sounds2/04-sillaba-inversa/04-on.mp3', 'assets/sounds2/04-sillaba-inversa/04-un.mp3'] },
    { 'group': '04', 'completa': 'UR', 'parti': ['AR', 'ER', 'IR', 'OR'], 'audioParola': 'assets/sounds2/04-sillaba-inversa/04-ar-er-ir-or-ur.mp3', 'audioParti': ['assets/sounds2/04-sillaba-inversa/04-ar.mp3', 'assets/sounds2/04-sillaba-inversa/04-er.mp3', 'assets/sounds2/04-sillaba-inversa/04-ir.mp3', 'assets/sounds2/04-sillaba-inversa/04-or.mp3', 'assets/sounds2/04-sillaba-inversa/04-ur.mp3'] },

    { 'group': '05', 'completa': 'PORTA', 'parti': ['POR', 'TA'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/r/porta-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/05-consonante-intermedia/r/porta-sillaba-01.mp3', 'assets/sounds2/05-consonante-intermedia/r/porta-sillaba-02.mp3'] },
    { 'group': '05', 'completa': 'BORSA', 'parti': ['BOR', 'SA'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/r/borsa-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/05-consonante-intermedia/r/borsa-sillaba-01.mp3', 'assets/sounds2/05-consonante-intermedia/r/borsa-sillaba-02.mp3'] },
    { 'group': '05', 'completa': 'CALZE', 'parti': ['CAL', 'ZE'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/l/calze-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/05-consonante-intermedia/l/calze-sillaba-01.mp3', 'assets/sounds2/05-consonante-intermedia/l/calze-sillaba-02.mp3'] },
    { 'group': '05', 'completa': 'SOLDI', 'parti': ['SOL', 'DI'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/l/soldi-sillabe-normale.mp3.mp3', 'audioParti': ['assets/sounds2/05-consonante-intermedia/l/soldi-sillaba-01.mp3', 'assets/sounds2/05-consonante-intermedia/l/soldi-sillaba-02.mp3'] },
    { 'group': '05', 'completa': 'BAMBINO', 'parti': ['BAM', 'BI', 'NO'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/m/bambino-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/05-consonante-intermedia/m/bambino-sillaba-01.mp3', 'assets/sounds2/05-consonante-intermedia/m/bambino-sillaba-02.mp3', 'assets/sounds2/05-consonante-intermedia/m/bambino-sillaba-03.mp3'] },
    { 'group': '05', 'completa': 'GAMBA', 'parti': ['GAM', 'BA'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/m/gamba-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/05-consonante-intermedia/m/gamba-sillaba-01.mp3', 'assets/sounds2/05-consonante-intermedia/m/gamba-sillaba-02.mp3'] },
    { 'group': '05', 'completa': 'VENTI', 'parti': ['VEN', 'TI'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/n/venti-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/05-consonante-intermedia/n/venti-sillaba-01.mp3', 'assets/sounds2/05-consonante-intermedia/n/venti-sillaba-02.mp3'] },
    { 'group': '05', 'completa': 'BANCA', 'parti': ['BAN', 'CA'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/n/banca-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/05-consonante-intermedia/n/banca-sillaba-01.mp3', 'assets/sounds2/05-consonante-intermedia/n/banca-sillaba-02.mp3'] },

    { 'group': '06', 'completa': 'SCHI', 'parti': ['SC', 'SCA', 'SCO', 'SCU', 'SCHE'], 'audioParola': 'assets/sounds2/06-sc-sp-st/06-sc-sca-sco-scu-sche-schi.mp3', 'audioParti': ['assets/sounds2/06-sc-sp-st/06-sc.mp3', 'assets/sounds2/06-sc-sp-st/06-sca.mp3', 'assets/sounds2/06-sc-sp-st/06-sche.mp3', 'assets/sounds2/06-sc-sp-st/06-schi.mp3', 'assets/sounds2/06-sc-sp-st/06-sco.mp3', 'assets/sounds2/06-sc-sp-st/06-sc-sca-sco-scu-sche-schi.mp3'] },
    { 'group': '06', 'completa': 'SPI', 'parti': ['SP', 'SPA', 'SPO', 'SPU', 'SPE'], 'audioParola': 'assets/sounds2/06-sc-sp-st/06-sp-spa-spo-spu-spe-spi.mp3', 'audioParti': ['assets/sounds2/06-sc-sp-st/06-sp.mp3', 'assets/sounds2/06-sc-sp-st/06-spa.mp3', 'assets/sounds2/06-sc-sp-st/06-spe.mp3', 'assets/sounds2/06-sc-sp-st/06-spi.mp3', 'assets/sounds2/06-sc-sp-st/06-spo.mp3'] },
    { 'group': '06', 'completa': 'STI', 'parti': ['ST', 'STA', 'STO', 'STU', 'STE'], 'audioParola': 'assets/sounds2/06-sc-sp-st/06-st-sta-sto-stu-ste-sti.mp3', 'audioParti': ['assets/sounds2/06-sc-sp-st/06-st.mp3', 'assets/sounds2/06-sc-sp-st/06-sta.mp3', 'assets/sounds2/06-sc-sp-st/06-ste.mp3', 'assets/sounds2/06-sc-sp-st/06-sti.mp3', 'assets/sounds2/06-sc-sp-st/06-sto.mp3'] },

    { 'group': '07', 'completa': 'BRU', 'parti': ['BR', 'BRA', 'BRE', 'BRI', 'BRO'], 'audioParola': 'assets/sounds2/07-br-fr-tr/07-br-bra-bre-bri-bro-bru.mp3', 'audioParti': ['assets/sounds2/07-br-fr-tr/07-br.mp3', 'assets/sounds2/07-br-fr-tr/07-bra.mp3', 'assets/sounds2/07-br-fr-tr/07-bre.mp3', 'assets/sounds2/07-br-fr-tr/07-bri.mp3', 'assets/sounds2/07-br-fr-tr/07-bro.mp3'] },
    { 'group': '07', 'completa': 'CRU', 'parti': ['CR', 'CRA', 'CRE', 'CRI', 'CRO'], 'audioParola': 'assets/sounds2/07-br-fr-tr/07-cr-cra-cre-cri-cro-cru.mp3', 'audioParti': ['assets/sounds2/07-br-fr-tr/07-cr.mp3', 'assets/sounds2/07-br-fr-tr/07-cra.mp3', 'assets/sounds2/07-br-fr-tr/07-cre.mp3', 'assets/sounds2/07-br-fr-tr/07-cri.mp3', 'assets/sounds2/07-br-fr-tr/07-cro.mp3'] },
    { 'group': '07', 'completa': 'DRU', 'parti': ['DR', 'DRA', 'DRE', 'DRI', 'DRO'], 'audioParola': 'assets/sounds2/07-br-fr-tr/07-dr-dra-dre-dri-dro-dru.mp3', 'audioParti': ['assets/sounds2/07-br-fr-tr/07-dr.mp3', 'assets/sounds2/07-br-fr-tr/07-dra.mp3', 'assets/sounds2/07-br-fr-tr/07-dre.mp3', 'assets/sounds2/07-br-fr-tr/07-dri.mp3', 'assets/sounds2/07-br-fr-tr/07-dro.mp3'] },
    { 'group': '07', 'completa': 'FRU', 'parti': ['FR', 'FRA', 'FRE', 'FRI', 'FRO'], 'audioParola': 'assets/sounds2/07-br-fr-tr/07-fr-fra-fre-fri-fro-fru.mp3', 'audioParti': ['assets/sounds2/07-br-fr-tr/07-fr.mp3', 'assets/sounds2/07-br-fr-tr/07-fra.mp3', 'assets/sounds2/07-br-fr-tr/07-fre.mp3', 'assets/sounds2/07-br-fr-tr/07-fri.mp3', 'assets/sounds2/07-br-fr-tr/07-fro.mp3'] },
    { 'group': '07', 'completa': 'GRU', 'parti': ['GR', 'GRA', 'GRE', 'GRI', 'GRO'], 'audioParola': 'assets/sounds2/07-br-fr-tr/07-gr-gra-gre-gri-gro-gru.mp3', 'audioParti': ['assets/sounds2/07-br-fr-tr/07-gr.mp3', 'assets/sounds2/07-br-fr-tr/07-gra.mp3', 'assets/sounds2/07-br-fr-tr/07-gre.mp3', 'assets/sounds2/07-br-fr-tr/07-gri.mp3', 'assets/sounds2/07-br-fr-tr/07-gro.mp3', ] },
    { 'group': '07', 'completa': 'PRU', 'parti': ['PR', 'PRA', 'PRE', 'PRI', 'PRO'], 'audioParola': 'assets/sounds2/07-br-fr-tr/07-pr-pra-pre-pri-pro-pru.mp3', 'audioParti': ['assets/sounds2/07-br-fr-tr/07-pr.mp3', 'assets/sounds2/07-br-fr-tr/07-pra.mp3', 'assets/sounds2/07-br-fr-tr/07-pre.mp3', 'assets/sounds2/07-br-fr-tr/07-pri.mp3', 'assets/sounds2/07-br-fr-tr/07-pro.mp3'] },
    { 'group': '07', 'completa': 'TRU', 'parti': ['TR', 'TRA', 'TRE', 'TRI', 'TRO'], 'audioParola': 'assets/sounds2/07-br-fr-tr/07-tr-tra-tre-tri-tro-tru.mp3', 'audioParti': ['assets/sounds2/07-br-fr-tr/07-tr.mp3', 'assets/sounds2/07-br-fr-tr/07-tra.mp3', 'assets/sounds2/07-br-fr-tr/07-tre.mp3', 'assets/sounds2/07-br-fr-tr/07-tri.mp3', 'assets/sounds2/07-br-fr-tr/07-tro.mp3'] },

    { 'group': '08', 'completa': 'GNU', 'parti': ['GN', 'GNA', 'GNE', 'GNI', 'GNO'], 'audioParola': 'assets/sounds2/08-gn/08-gn-gna-gne-gni-gno-gnu.mp3', 'audioParti': ['assets/sounds2/08-gn/08-gn.mp3', 'assets/sounds2/08-gn/08-gna.mp3', 'assets/sounds2/08-gn/08-gne.mp3', 'assets/sounds2/08-gn/08-gni.mp3', 'assets/sounds2/08-gn/08-gno.mp3'] },

    { 'group': '09', 'completa': '', 'parti': ['GLI', 'GLIE', 'GLIA', 'GLIO', 'GLIU'], 'audioParola': 'assets/sounds2/09-gli/09-gli-glie-glia-glio-gliu.mp3', 'audioParti': ['assets/sounds2/09-gli/09-gli-glie-glia-glio-gliu.mp3', 'assets/sounds2/09-gli/09-glie.mp3', 'assets/sounds2/09-gli/09-glia.mp3', 'assets/sounds2/09-gli/09-glio.mp3', 'assets/sounds2/09-gli/09-gliu.mp3'] },

    { 'group': '10', 'completa': '', 'parti': ['SCE', 'SCI', 'SCIA', 'SCIO', 'SCIU'], 'audioParola': 'assets/sounds2/10-sce-sci/10-sce-sci-scia-scio-sciu.mp3', 'audioParti': ['assets/sounds2/10-sce-sci/10-sce-sci-scia-scio-sciu.mp3', 'assets/sounds2/10-sce-sci/10-sci.mp3', 'assets/sounds2/10-sce-sci/10-scia.mp3', 'assets/sounds2/10-sce-sci/10-scio.mp3', 'assets/sounds2/10-sce-sci/10-sciu.mp3'] }
];

var $paroleScrittura = [
    { 'group': '01', 'completa': 'PIZZA', 'parti': ['PI', 'ZZA'], 'lettere': ['P', 'I', 'Z', 'Z', 'A'], 'audioParola': 'assets/sounds2/01-lettere-doppie/pizza.mp3', 'imageURL': 'assets/images/parole/disegno-pizza.png', 'audioParti': ['assets/sounds2/01-lettere-doppie/pizza-sillaba-01.mp3', 'assets/sounds2/01-lettere-doppie/pizza-sillaba-02.mp3'] },
    { 'group': '01', 'completa': 'MAMMA', 'parti': ['MA', 'MMA'], 'lettere': ['M', 'A', 'M', 'M', 'A'], 'audioParola': 'assets/sounds2/01-lettere-doppie/mamma.mp3', 'imageURL': 'assets/images/parole/disegno-mamma.png', 'audioParti': ['assets/sounds2/01-lettere-doppie/mamma-sillaba-01.mp3', 'assets/sounds2/01-lettere-doppie/mamma-sillaba-02.mp3'] },

    { 'group': '02', 'completa': 'UNO', 'parti': ['U', 'NO'], 'lettere': ['U', 'N', 'O'], 'audioParola': 'assets/sounds2/02-vocale-iniziale/uno.mp3', 'imageURL': 'assets/images/parole/disegno-uno.png', 'audioParti': ['assets/sounds2/02-vocale-iniziale/uno-sillaba-01.mp3', 'assets/sounds2/02-vocale-iniziale/uno-sillaba-02.mp3'] },
    { 'group': '02', 'completa': 'ORA', 'parti': ['O', 'RA'], 'lettere': ['O', 'R', 'A'], 'audioParola': 'assets/sounds2/02-vocale-iniziale/ora.mp3', 'imageURL': 'assets/images/parole/disegno-ora.png', 'audioParti': ['assets/sounds2/02-vocale-iniziale/ora-sillaba-01.mp3', 'assets/sounds2/02-vocale-iniziale/ora-sillaba-02.mp3'] },

    { 'group': '03', 'completa': 'SEDIA', 'parti': ['SE', 'DIA'], 'lettere': ['S', 'E', 'D', 'I', 'A'], 'audioParola': 'assets/sounds2/03-due-vocali/sedia.mp3', 'imageURL': 'assets/images/parole/disegno-sedia.png', 'audioParti': ['assets/sounds2/03-due-vocali/sedia-sillaba-01.mp3', 'assets/sounds2/03-due-vocali/sedia-sillaba-02.mp3'] },
    { 'group': '03', 'completa': 'SEI', 'parti': ['SEI'], 'lettere': ['S', 'E', 'I'], 'audioParola': 'assets/sounds2/03-due-vocali/sei.mp3', 'imageURL': 'assets/images/parole/disegno-sei.png', 'audioParti': ['assets/sounds2/03-due-vocali/sei-sillaba-01.mp3'] },

    { 'group': '04', 'completa': 'ERBA', 'parti': ['ER', 'BA'], 'lettere': ['E', 'R', 'B', 'A'], 'audioParola': 'assets/sounds2/04-sillaba-inversa/erba.mp3', 'imageURL': 'assets/images/parole/disegno-erba.png', 'audioParti': ['assets/sounds2/04-sillaba-inversa/erba-sillaba-01.mp3', 'assets/sounds2/04-sillaba-inversa/erba-sillaba-02.mp3'] },
    { 'group': '04', 'completa': 'ALBERO', 'parti': ['AL', 'BE', 'RO'], 'lettere': ['A', 'L', 'B', 'E', 'R', 'O'], 'audioParola': 'assets/sounds2/04-sillaba-inversa/albero.mp3', 'imageURL': 'assets/images/parole/disegno-albero.png', 'audioParti': ['assets/sounds2/04-sillaba-inversa/albero-sillaba-01.mp3', 'assets/sounds2/04-sillaba-inversa/albero-sillaba-02.mp3', 'assets/sounds2/04-sillaba-inversa/albero-sillaba-03.mp3'] },

    { 'group': '05', 'completa': 'PORTA', 'parti': ['POR', 'TA'], 'lettere': ['P', 'O', 'R', 'T', 'A'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/r/porta.mp3', 'imageURL': 'assets/images/parole/disegno-porta.png', 'audioParti': ['assets/sounds2/05-consonante-intermedia/r/porta-sillaba-01.mp3', 'assets/sounds2/05-consonante-intermedia/r/porta-sillaba-02.mp3'] },
    { 'group': '05', 'completa': 'BORSA', 'parti': ['BOR', 'SA'], 'lettere': ['B', 'O', 'R', 'S', 'A'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/r/borsa.mp3', 'imageURL': 'assets/images/parole/disegno-borsa.png', 'audioParti': ['assets/sounds2/05-consonante-intermedia/r/borsa-sillaba-01.mp3', 'assets/sounds2/05-consonante-intermedia/r/borsa-sillaba-02.mp3'] },
    { 'group': '05', 'completa': 'CALZE', 'parti': ['CAL', 'ZE'], 'lettere': ['C', 'A', 'L', 'Z', 'E'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/l/calze.mp3', 'imageURL': 'assets/images/parole/disegno-calze.png', 'audioParti': ['assets/sounds2/05-consonante-intermedia/l/calze-sillaba-01.mp3', 'assets/sounds2/05-consonante-intermedia/l/calze-sillaba-02.mp3'] },
    { 'group': '05', 'completa': 'SOLDI', 'parti': ['SOL', 'DI'], 'lettere': ['S', 'O', 'L', 'D', 'I'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/l/soldi.mp3', 'imageURL': 'assets/images/parole/disegno-soldi.png', 'audioParti': ['assets/sounds2/05-consonante-intermedia/l/soldi-sillaba-01.mp3', 'assets/sounds2/05-consonante-intermedia/l/soldi-sillaba-02.mp3'] },
    { 'group': '05', 'completa': 'BAMBINO', 'parti': ['BAM', 'BI', 'NO'], 'lettere': ['B', 'A', 'M', 'B', 'I', 'N', 'O'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/m/bambino.mp3', 'imageURL': 'assets/images/parole/disegno-bambino.png', 'audioParti': ['assets/sounds2/05-consonante-intermedia/m/bambino-sillaba-01.mp3', 'assets/sounds2/05-consonante-intermedia/m/bambino-sillaba-02.mp3', 'assets/sounds2/05-consonante-intermedia/m/bambino-sillaba-03.mp3'] },
    { 'group': '05', 'completa': 'GAMBA', 'parti': ['GAM', 'BA'], 'lettere': ['G', 'A', 'M', 'B', 'A'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/m/gamba.mp3', 'imageURL': 'assets/images/parole/disegno-gamba.png', 'audioParti': ['assets/sounds2/05-consonante-intermedia/m/gamba-sillaba-01.mp3', 'assets/sounds2/05-consonante-intermedia/m/gamba-sillaba-02.mp3'] },
    { 'group': '05', 'completa': 'VENTI', 'parti': ['VEN', 'TI'], 'lettere': ['V', 'E', 'N', 'T', 'I'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/n/venti.mp3', 'imageURL': 'assets/images/parole/disegno-venti.png', 'audioParti': ['assets/sounds2/05-consonante-intermedia/n/venti-sillaba-01.mp3', 'assets/sounds2/05-consonante-intermedia/n/venti-sillaba-02.mp3'] },
    { 'group': '05', 'completa': 'BANCA', 'parti': ['BAN', 'CA'], 'lettere': ['B', 'A', 'N', 'C', 'A'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/n/banca.mp3', 'imageURL': 'assets/images/parole/disegno-banca.png', 'audioParti': ['assets/sounds2/05-consonante-intermedia/n/banca-sillaba-01.mp3', 'assets/sounds2/05-consonante-intermedia/n/banca-sillaba-02.mp3'] },

    { 'group': '06', 'completa': 'SCALA', 'parti': ['SCA', 'LA'], 'lettere': ['S', 'C', 'A', 'L', 'A'], 'audioParola': 'assets/sounds2/06-sc-sp-st/scala.mp3', 'imageURL': 'assets/images/parole/disegno-scala.png', 'audioParti': ['assets/sounds2/06-sc-sp-st/scala-sillaba-01.mp3', 'assets/sounds2/06-sc-sp-st/scala-sillaba-02.mp3'] },
    { 'group': '06', 'completa': 'POSTA', 'parti': ['PO', 'STA'], 'lettere': ['P', 'O', 'S', 'T', 'A'], 'audioParola': 'assets/sounds2/06-sc-sp-st/posta.mp3', 'imageURL': 'assets/images/parole/disegno-posta.png', 'audioParti': ['assets/sounds2/06-sc-sp-st/posta-sillaba-01.mp3', 'assets/sounds2/06-sc-sp-st/posta-sillaba-02.mp3'] },

    { 'group': '07', 'completa': 'LIBRO', 'parti': ['LI', 'BRO'], 'lettere': ['L', 'I', 'B', 'R', 'O'], 'audioParola': 'assets/sounds2/07-br-fr-tr/libro.mp3', 'imageURL': 'assets/images/parole/disegno-libro.png', 'audioParti': ['assets/sounds2/07-br-fr-tr/libro-sillaba-01.mp3', 'assets/sounds2/07-br-fr-tr/libro-sillaba-02.mp3'] },
    { 'group': '07', 'completa': 'TRENO', 'parti': ['TRE', 'NO'], 'lettere': ['T', 'R', 'E', 'N', 'O'], 'audioParola': 'assets/sounds2/07-br-fr-tr/treno.mp3', 'imageURL': 'assets/images/parole/disegno-treno.png', 'audioParti': ['assets/sounds2/07-br-fr-tr/treno-sillaba-01.mp3', 'assets/sounds2/07-br-fr-tr/treno-sillaba-02.mp3'] },
    { 'group': '07', 'completa': 'SOPRA', 'parti': ['SO', 'PRA'], 'lettere': ['S', 'O', 'P', 'R', 'A'], 'audioParola': 'assets/sounds2/07-br-fr-tr/sopra.mp3', 'imageURL': 'assets/images/parole/disegno-sopra.png', 'audioParti': ['assets/sounds2/07-br-fr-tr/sopra-sillaba-01.mp3', 'assets/sounds2/07-br-fr-tr/sopra-sillaba-02.mp3'] },
    { 'group': '07', 'completa': 'MAGRO', 'parti': ['MA', 'GRO'], 'lettere': ['M', 'A', 'G', 'R', 'O'], 'audioParola': 'assets/sounds2/07-br-fr-tr/magro.mp3', 'imageURL': 'assets/images/parole/disegno-magro.png', 'audioParti': ['assets/sounds2/07-br-fr-tr/magro-sillaba-01.mp3', 'assets/sounds2/07-br-fr-tr/magro-sillaba-02.mp3'] },

    { 'group': '08', 'completa': 'BAGNO', 'parti': ['BA', 'GNO'], 'lettere': ['B', 'A', 'G', 'N', 'O'], 'audioParola': 'assets/sounds2/08-gn/bagno.mp3', 'imageURL': 'assets/images/parole/disegno-bagno.png', 'audioParti': ['assets/sounds2/08-gn/bagno-sillaba-01.mp3', 'assets/sounds2/08-gn/bagno-sillaba-02.mp3'] },
    { 'group': '08', 'completa': 'SIGNORA', 'parti': ['SI', 'GNO', 'RA'], 'lettere': ['S', 'I', 'G', 'N', 'O', 'R', 'A'], 'audioParola': 'assets/sounds2/08-gn/signora.mp3', 'imageURL': 'assets/images/parole/disegno-signora.png', 'audioParti': ['assets/sounds2/08-gn/signora-sillaba-01.mp3', 'assets/sounds2/08-gn/signora-sillaba-02.mp3', 'assets/sounds2/08-gn/signora-sillaba-03.mp3'] },

    { 'group': '09', 'completa': 'FIGLIO', 'parti': ['FI', 'GLIO'], 'lettere': ['F', 'I', 'G', 'L', 'I', 'O'], 'audioParola': 'assets/sounds2/09-gli/figlio.mp3', 'imageURL': 'assets/images/parole/disegno-figlio.png', 'audioParti': ['assets/sounds2/09-gli/figlio-sillaba-01.mp3', 'assets/sounds2/09-gli/figlio-sillaba-02.mp3'] },
    { 'group': '09', 'completa': 'FAMIGLIA', 'parti': ['FA', 'MI', 'GLIA'], 'lettere': ['F', 'A', 'M', 'I', 'G', 'L', 'I', 'A'], 'audioParola': 'assets/sounds2/09-gli/famiglia.mp3', 'imageURL': 'assets/images/parole/disegno-famiglia.png', 'audioParti': ['assets/sounds2/09-gli/famiglia-sillaba-01.mp3', 'assets/sounds2/09-gli/famiglia-sillaba-02.mp3', 'assets/sounds2/09-gli/famiglia-sillaba-03.mp3'] },

    { 'group': '10', 'completa': 'PESCE', 'parti': ['PE', 'SCE'], 'lettere': ['P', 'E', 'S', 'C', 'E'], 'audioParola': 'assets/sounds2/10-sce-sci/pesce.mp3', 'imageURL': 'assets/images/parole/disegno-pesce.png', 'audioParti': ['assets/sounds2/10-sce-sci/pesce-sillaba-01.mp3', 'assets/sounds2/10-sce-sci/pesce-sillaba-02.mp3'] },
    { 'group': '10', 'completa': 'USCITA', 'parti': ['U', 'SCI', 'TA'], 'lettere': ['U', 'S', 'C', 'I', 'T', 'A'], 'audioParola': 'assets/sounds2/10-sce-sci/uscita.mp3', 'imageURL': 'assets/images/parole/disegno-uscita.png', 'audioParti': ['assets/sounds2/10-sce-sci/uscita-sillaba-01.mp3', 'assets/sounds2/10-sce-sci/uscita-sillaba-02.mp3', 'assets/sounds2/10-sce-sci/uscita-sillaba-03.mp3'] }
];

var $parolePreLettura = [
    { 'group': '01', 'completa': 'MARRONE', 'parti': ['MA', 'RRO', 'NE'], 'audioParola': 'assets/sounds2/01-lettere-doppie/marrone-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/01-lettere-doppie/marrone-sillaba-01.mp3', 'assets/sounds2/01-lettere-doppie/marrone-sillaba-02.mp3', 'assets/sounds2/01-lettere-doppie/marrone-sillaba-03.mp3'], 'audioScandito': 'assets/sounds2/01-lettere-doppie/marrone-sillabe-normale.mp3', 'imageURL': 'assets/images/parole/disegno-marrone.png' },

    { 'group': '02', 'completa': 'AMORE', 'parti': ['A', 'MO', 'RE'], 'audioParola': 'assets/sounds2/02-vocale-iniziale/amore-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/02-vocale-iniziale/amore-sillaba-01.mp3', 'assets/sounds2/02-vocale-iniziale/amore-sillaba-02.mp3', 'assets/sounds2/02-vocale-iniziale/amore-sillaba-03.mp3'], 'audioScandito': 'assets/sounds2/02-vocale-iniziale/amore-sillabe-normale.mp3', 'imageURL': 'assets/images/parole/disegno-amore.png' },

    { 'group': '03', 'completa': 'CHIAVI', 'parti': ['CHIA', 'VI'], 'audioParola': 'assets/sounds2/03-due-vocali/chiavi-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/03-due-vocali/chiavi-sillaba-01.mp3', 'assets/sounds2/03-due-vocali/chiavi-sillaba-02.mp3'], 'audioScandito': 'assets/sounds2/03-due-vocali/chiavi-sillabe-normale.mp3', 'imageURL': 'assets/images/parole/disegno-chiavi.png' },

    { 'group': '04', 'completa': 'INSALATA', 'parti': ['IN', 'SA', 'LA', 'TA'], 'audioParola': 'assets/sounds2/04-sillaba-inversa/insalata-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/04-sillaba-inversa/insalata-sillaba-01.mp3', 'assets/sounds2/04-sillaba-inversa/insalata-sillaba-02.mp3', 'assets/sounds2/04-sillaba-inversa/insalata-sillaba-03.mp3', 'assets/sounds2/04-sillaba-inversa/insalata-sillaba-04.mp3'], 'audioScandito': 'assets/sounds2/04-sillaba-inversa/insalata-sillabe-normale.mp3', 'imageURL': 'assets/images/parole/disegno-insalata.png' },

    { 'group': '05', 'completa': 'MERCATO', 'parti': ['MER', 'CA', 'TO'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/r/mercato-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/05-consonante-intermedia/r/mercato-sillaba-01.mp3', 'assets/sounds2/05-consonante-intermedia/r/mercato-sillaba-02.mp3', 'assets/sounds2/05-consonante-intermedia/r/mercato-sillaba-03.mp3'], 'audioScandito': 'assets/sounds2/05-consonante-intermedia/r/mercato-sillabe-normale.mp3', 'imageURL': 'assets/images/parole/disegno-mercato.png' },
    { 'group': '05', 'completa': 'COLTELLO', 'parti': ['COL', 'TE', 'LLO'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/l/coltello-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/05-consonante-intermedia/l/coltello-sillaba-01.mp3', 'assets/sounds2/05-consonante-intermedia/l/coltello-sillaba-02.mp3', 'assets/sounds2/05-consonante-intermedia/l/coltello-sillaba-03.mp3'], 'audioScandito': 'assets/sounds2/05-consonante-intermedia/l/coltello-sillabe-normale.mp3', 'imageURL': 'assets/images/parole/disegno-coltello.png' },
    { 'group': '05', 'completa': 'LAMPADINA', 'parti': ['LAM', 'PA', 'DI', 'NA'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/m/lampadina-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/05-consonante-intermedia/m/lampadina-sillaba-01.mp3', 'assets/sounds2/05-consonante-intermedia/m/lampadina-sillaba-02.mp3', 'assets/sounds2/05-consonante-intermedia/m/lampadina-sillaba-03.mp3', 'assets/sounds2/05-consonante-intermedia/m/lampadina-sillaba-04.mp3'], 'audioScandito': 'assets/sounds2/05-consonante-intermedia/m/lampadina-sillabe-normale.mp3', 'imageURL': 'assets/images/parole/disegno-lampadina.png' },
    { 'group': '05', 'completa': 'DOCUMENTO', 'parti': ['DO', 'CU', 'MEN', 'TO'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/n/documento-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/05-consonante-intermedia/n/documento-sillaba-01.mp3', 'assets/sounds2/05-consonante-intermedia/n/documento-sillaba-02.mp3', 'assets/sounds2/05-consonante-intermedia/n/documento-sillaba-03.mp3', 'assets/sounds2/05-consonante-intermedia/n/documento-sillaba-04.mp3'], 'audioScandito': 'assets/sounds2/05-consonante-intermedia/m/documento-sillabe-normale.mp3', 'imageURL': 'assets/images/parole/disegno-documento.png' },

    { 'group': '06', 'completa': 'STAZIONE', 'parti': ['STA', 'ZIO', 'NE'], 'audioParola': 'assets/sounds2/06-sc-sp-st/stazione-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/06-sc-sp-st/stazione-sillaba-01.mp3', 'assets/sounds2/06-sc-sp-st/stazione-sillaba-02.mp3', 'assets/sounds2/06-sc-sp-st/stazione-sillaba-03.mp3'], 'audioScandito': 'assets/sounds2/06-sc-sp-st/stazione-sillabe-normale.mp3', 'imageURL': 'assets/images/parole/disegno-stazione.png' },

    { 'group': '07', 'completa': 'FRIGO', 'parti': ['FRI', 'GO'], 'audioParola': 'assets/sounds2/07-br-fr-tr/frigo-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/07-br-fr-tr/frigo-sillaba-01.mp3', 'assets/sounds2/07-br-fr-tr/frigo-sillaba-02.mp3'], 'audioScandito': 'assets/sounds2/07-br-fr-tr/frigo-sillabe-normale.mp3', 'imageURL': 'assets/images/parole/disegno-frigo.png' },

    { 'group': '08', 'completa': 'MONTAGNA', 'parti': ['MON', 'TA', 'GNA'], 'audioParola': 'assets/sounds2/08-gn/montagna-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/08-gn/montagna-sillaba-01.mp3', 'assets/sounds2/08-gn/montagna-sillaba-02.mp3', 'assets/sounds2/08-gn/montagna-sillaba-03.mp3'], 'audioScandito': 'assets/sounds2/08-gn/montagna-sillabe-normale.mp3', 'imageURL': 'assets/images/parole/disegno-montagna.png' },

    { 'group': '09', 'completa': 'BOTTIGLIA', 'parti': ['BO', 'TTI', 'GLIA'], 'audioParola': 'assets/sounds2/09-gli/bottiglia-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/09-gli/bottiglia-sillaba-01.mp3', 'assets/sounds2/09-gli/bottiglia-sillaba-02.mp3', 'assets/sounds2/09-gli/bottiglia-sillaba-03.mp3'], 'audioScandito': 'assets/sounds2/09-gli/bottiglia-sillabe-normale.mp3', 'imageURL': 'assets/images/parole/disegno-bottiglia.png' },

    { 'group': '10', 'completa': 'SCENDERE', 'parti': ['SCEN', 'DE', 'RE'], 'audioParola': 'assets/sounds2/10-sce-sci/scendere-sillabe-normale.mp3', 'audioParti': ['assets/sounds2/10-sce-sci/scendere-sillaba-01.mp3', 'assets/sounds2/10-sce-sci/scendere-sillaba-02.mp3', 'assets/sounds2/10-sce-sci/scendere-sillaba-03.mp3'], 'audioScandito': 'assets/sounds2/10-sce-sci/scendere-sillabe-normale.mp3', 'imageURL': 'assets/images/parole/disegno-scendere.png' }
];

var $paroleLettura = [
    { 'group': '01', 'completa': 'LATTE', 'parti': ['LA', 'TTE'], 'audioLungo': 'assets/sounds2/01-lettere-doppie/latte-lungo-normale.mp3', 'imageURL': 'assets/images/parole/disegno-latte.png' },
    { 'group': '01', 'completa': 'ROSSO', 'parti': ['RO', 'SSO'], 'audioLungo': 'assets/sounds2/01-lettere-doppie/rosso-lungo-normale.mp3', 'imageURL': 'assets/images/parole/disegno-rosso.png' },

    { 'group': '02', 'completa': 'AMICA', 'parti': ['A', 'MI', 'CA'], 'audioLungo': 'assets/sounds2/02-vocale-iniziale/amica-lungo-normale.mp3', 'imageURL': 'assets/images/parole/disegno-amica.png' },

    { 'group': '03', 'completa': 'PIEDE', 'parti': ['PIE', 'DE'], 'audioLungo': 'assets/sounds2/03-due-vocali/piede-lungo-normale.mp3', 'imageURL': 'assets/images/parole/disegno-piede.png' },
    { 'group': '03', 'completa': 'ITALIA', 'parti': ['I', 'TA', 'LIA'], 'audioLungo': 'assets/sounds2/03-due-vocali/italia-lungo-normale.mp3', 'imageURL': 'assets/images/parole/disegno-italia.png' },

    { 'group': '04', 'completa': 'INDIRIZZO', 'parti': ['IN', 'DI', 'RI', 'ZZO'], 'audioLungo': 'assets/sounds2/04-sillaba-inversa/indirizzo-lungo-normale.mp3', 'imageURL': 'assets/images/parole/disegno-indirizzo.png' },

    { 'group': '05', 'completa': 'FORNO', 'parti': ['FOR', 'NO'], 'audioLungo': 'assets/sounds2/05-consonante-intermedia/r/forno-lungo-normale.mp3', 'imageURL': 'assets/images/parole/disegno-forno.png' },
    { 'group': '05', 'completa': 'BALCONE', 'parti': ['BAL', 'CO', 'NE'], 'audioLungo': 'assets/sounds2/05-consonante-intermedia/l/balcone-lungo-normale.mp3', 'imageURL': 'assets/images/parole/disegno-balcone.png' },
    { 'group': '05', 'completa': 'BAMBOLA', 'parti': ['BAM', 'BO', 'LA'], 'audioLungo': 'assets/sounds2/05-consonante-intermedia/m/bambola-lungo-normale.mp3', 'imageURL': 'assets/images/parole/disegno-bambola.png' },
    { 'group': '05', 'completa': 'DENTI', 'parti': ['DEN', 'TI'], 'audioLungo': 'assets/sounds2/05-consonante-intermedia/n/denti-lungo-normale.mp3', 'imageURL': 'assets/images/parole/disegno-denti.png' },

    { 'group': '06', 'completa': 'OSPEDALE', 'parti': ['O', 'SPE', 'DA', 'LE'], 'audioLungo': 'assets/sounds2/06-sc-sp-st/ospedale-lungo-normale.mp3', 'imageURL': 'assets/images/parole/disegno-ospedale.png' },

    { 'group': '07', 'completa': 'MAGRO', 'parti': ['MA', 'GRO'], 'audioLungo': 'assets/sounds2/07-br-fr-tr/magro-lungo-normale.mp3', 'imageURL': 'assets/images/parole/disegno-magro.png' },
    { 'group': '07', 'completa': 'LITRO', 'parti': ['LI', 'TRO'], 'audioLungo': 'assets/sounds2/07-br-fr-tr/litro-lungo-normale.mp3', 'imageURL': 'assets/images/parole/disegno-litro.png' },

    { 'group': '08', 'completa': 'AGNELLO', 'parti': ['A', 'GNE', 'LLO'], 'audioLungo': 'assets/sounds2/08-gn/agnello-lungo-normale.mp3', 'imageURL': 'assets/images/parole/disegno-agnello.png' },

    { 'group': '09', 'completa': 'MAGLIA', 'parti': ['MA', 'GLIA'], 'audioLungo': 'assets/sounds2/09-gli/maglia-lungo-normale.mp3', 'imageURL': 'assets/images/parole/disegno-maglia.png' },

    { 'group': '10', 'completa': 'ASCIUGAMANO', 'parti': ['A', 'SCIU', 'GA', 'MA', 'NO'], 'audioLungo': 'assets/sounds2/10-sce-sci/asciugamano-lungo-normale.mp3', 'imageURL': 'assets/images/parole/disegno-asciugamano.png' }
];

var $paroleVerifica = [
    { 'group': '01', 'completa': 'POLLO', 'parti': ['PO', 'LLO'], 'audioParola': 'assets/sounds2/01-lettere-doppie/pollo.mp3', 'imageURL': 'assets/images/parole/disegno-pollo.png' },
    { 'group': '01', 'completa': 'LATTE', 'parti': ['LA', 'TTE'], 'audioParola': 'assets/sounds2/01-lettere-doppie/latte.mp3', 'imageURL': 'assets/images/parole/disegno-latte.png' },
    { 'group': '01', 'completa': 'MAMMA', 'parti': ['MA', 'MMA'], 'audioParola': 'assets/sounds2/01-lettere-doppie/mamma.mp3', 'imageURL': 'assets/images/parole/disegno-mamma.png' },

    { 'group': '02', 'completa': 'AMORE', 'parti': ['A', 'MO', 'RE'], 'audioParola': 'assets/sounds2/02-vocale-iniziale/amore.mp3', 'imageURL': 'assets/images/parole/disegno-amore.png' },
    { 'group': '02', 'completa': 'AMICA', 'parti': ['A', 'MI', 'CA'], 'audioParola': 'assets/sounds2/02-vocale-iniziale/amica.mp3', 'imageURL': 'assets/images/parole/disegno-amica.png' },
    { 'group': '02', 'completa': 'UNO', 'parti': ['U', 'NO'], 'audioParola': 'assets/sounds2/02-vocale-iniziale/uno.mp3', 'imageURL': 'assets/images/parole/disegno-uno.png' },

    { 'group': '03', 'completa': 'ITALIA', 'parti': ['I', 'TA', 'LIA'], 'audioParola': 'assets/sounds2/03-due-vocali/italia.mp3', 'imageURL': 'assets/images/parole/disegno-italia.png' },
    { 'group': '03', 'completa': 'FIORE', 'parti': ['FIO', 'RE'], 'audioParola': 'assets/sounds2/03-due-vocali/fiore.mp3', 'imageURL': 'assets/images/parole/disegno-fiore.png' },
    { 'group': '03', 'completa': 'POLIZIA', 'parti': ['PO', 'LI', 'ZIA'], 'audioParola': 'assets/sounds2/03-due-vocali/polizia.mp3', 'imageURL': 'assets/images/parole/disegno-polizia.png' },

    { 'group': '04', 'completa': 'ERBA', 'parti': ['ER', 'BA'], 'audioParola': 'assets/sounds2/04-sillaba-inversa/erba.mp3', 'imageURL': 'assets/images/parole/disegno-erba.png' },
    { 'group': '04', 'completa': 'INSALATA', 'parti': ['IN', 'SA', 'LA', 'TA'], 'audioParola': 'assets/sounds2/04-sillaba-inversa/insalata.mp3', 'imageURL': 'assets/images/parole/disegno-insalata.png' },
    { 'group': '04', 'completa': 'ALBERO', 'parti': ['AL', 'BE', 'RO'], 'audioParola': 'assets/sounds2/04-sillaba-inversa/albero.mp3', 'imageURL': 'assets/images/parole/disegno-albero.png' },

    { 'group': '05', 'completa': 'CALZE', 'parti': ['CAL', 'ZE'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/l/calze.mp3', 'imageURL': 'assets/images/parole/disegno-calze.png' },
    { 'group': '05', 'completa': 'MERCATO', 'parti': ['MER', 'CA', 'TO'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/r/mercato.mp3', 'imageURL': 'assets/images/parole/disegno-mercato.png' },
    { 'group': '05', 'completa': 'DOCUMENTO', 'parti': ['DO', 'CU', 'MEN', 'TO'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/n/documento.mp3', 'imageURL': 'assets/images/parole/disegno-documento.png' },
    { 'group': '05', 'completa': 'LAMPADINA', 'parti': ['LAM', 'PA', 'DI', 'NA'], 'audioParola': 'assets/sounds2/05-consonante-intermedia/m/lampadina.mp3', 'imageURL': 'assets/images/parole/disegno-lampadina.png' },

    { 'group': '06', 'completa': 'BISCOTTI', 'parti': ['BIS', 'COT', 'TI'], 'audioParola': 'assets/sounds2/06-sc-sp-st/biscotti.mp3', 'imageURL': 'assets/images/parole/disegno-biscotti.png' },
    { 'group': '06', 'completa': 'SCARPE', 'parti': ['SCA', 'RPE'], 'audioParola': 'assets/sounds2/06-sc-sp-st/scarpe.mp3', 'imageURL': 'assets/images/parole/disegno-scarpe.png' },
    { 'group': '06', 'completa': 'STUDENTE', 'parti': ['STU', 'DEN', 'TE'], 'audioParola': 'assets/sounds2/06-sc-sp-st/studente.mp3', 'imageURL': 'assets/images/parole/disegno-studente.png' },

    { 'group': '07', 'completa': 'FRUTTA', 'parti': ['FRU', 'TTA'], 'audioParola': 'assets/sounds2/07-br-fr-tr/frutta.mp3', 'imageURL': 'assets/images/parole/disegno-frutta.png' },
    { 'group': '07', 'completa': 'LIBRO', 'parti': ['LI', 'BRO'], 'audioParola': 'assets/sounds2/07-br-fr-tr/libro.mp3', 'imageURL': 'assets/images/parole/disegno-libro.png' },
    { 'group': '07', 'completa': 'SOPRA', 'parti': ['SO', 'PRA'], 'audioParola': 'assets/sounds2/07-br-fr-tr/sopra.mp3', 'imageURL': 'assets/images/parole/disegno-sopra.png' },

    { 'group': '08', 'completa': 'LAVAGNA', 'parti': ['LA', 'VA', 'GNA'], 'audioParola': 'assets/sounds2/08-gn/lavagna.mp3', 'imageURL': 'assets/images/parole/disegno-lavagna.png' },
    { 'group': '08', 'completa': 'SIGNORA', 'parti': ['SI', 'GNO', 'RA'], 'audioParola': 'assets/sounds2/08-gn/signora.mp3', 'imageURL': 'assets/images/parole/disegno-signora.png' },
    { 'group': '08', 'completa': 'BAGNO', 'parti': ['BA', 'GNO'], 'audioParola': 'assets/sounds2/08-gn/bagno.mp3', 'imageURL': 'assets/images/parole/disegno-bagno.png' },

    { 'group': '09', 'completa': 'BIGLIETTO', 'parti': ['BI', 'GLIE', 'TTO'], 'audioParola': 'assets/sounds2/09-gli/biglietto.mp3', 'imageURL': 'assets/images/parole/disegno-biglietto.png' },
    { 'group': '09', 'completa': 'MOGLIE', 'parti': ['MO', 'GLIE'], 'audioParola': 'assets/sounds2/09-gli/moglie.mp3', 'imageURL': 'assets/images/parole/disegno-moglie.png' },
    { 'group': '09', 'completa': 'FAMIGLIA', 'parti': ['FA', 'MI', 'GLIA'], 'audioParola': 'assets/sounds2/09-gli/famiglia.mp3', 'imageURL': 'assets/images/parole/disegno-famiglia.png' },

    { 'group': '10', 'completa': 'SCENDERE', 'parti': ['SCE', 'NDE', 'RE'], 'audioParola': 'assets/sounds2/10-sce-sci/scendere.mp3', 'imageURL': 'assets/images/parole/disegno-scendere.png' },
    { 'group': '10', 'completa': 'SCIARPA', 'parti': ['SCIA', 'RPA'], 'audioParola': 'assets/sounds2/10-sce-sci/ssciarpa.mp3', 'imageURL': 'assets/images/parole/disegno-sciarpa.png' },
    { 'group': '10', 'completa': 'USCITA', 'parti': ['U', 'SCI', 'TA'], 'audioParola': 'assets/sounds2/10-sce-sci/uscita.mp3', 'imageURL': 'assets/images/parole/disegno-uscita.png' },
];

var $paroleMinuscolo = [
    { 'completa': 'amore', 'parti': ['A', 'M', 'O', 'R', 'E'], 'audioParola': 'assets/sounds2/11-minuscolo/amore.mp3' },
    { 'completa': 'bambino', 'parti': ['B', 'A', 'M', 'B', 'I', 'N', 'O'], 'audioParola': 'assets/sounds2/11-minuscolo/bambino.mp3' },
    { 'completa': 'biro', 'parti': ['B', 'I', 'R', 'O'], 'audioParola': 'assets/sounds2/11-minuscolo/biro.mp3' },
    { 'completa': 'data', 'parti': ['D', 'A', 'T', 'A'], 'audioParola': 'assets/sounds2/11-minuscolo/data.mp3' },
    { 'completa': 'documento', 'parti': ['D', 'O', 'C', 'U', 'M', 'E', 'N', 'T', 'O'], 'audioParola': 'assets/sounds2/11-minuscolo/documento.mp3' },
    { 'completa': 'entrata', 'parti': ['E', 'N', 'T', 'R', 'A', 'T', 'A'], 'audioParola': 'assets/sounds2/11-minuscolo/entrata.mp3' },
    { 'completa': 'fame', 'parti': ['F', 'A', 'M', 'E'], 'audioParola': 'assets/sounds2/11-minuscolo/fame.mp3' },
    { 'completa': 'fiore', 'parti': ['F', 'I', 'O', 'R', 'E'], 'audioParola': 'assets/sounds2/11-minuscolo/fiore.mp3' },
    { 'completa': 'foto', 'parti': ['F', 'O', 'T', 'O'], 'audioParola': 'assets/sounds2/11-minuscolo/foto.mp3' },
    { 'completa': 'giovane', 'parti': ['G', 'I', 'O', 'V', 'A', 'N', 'E'], 'audioParola': 'assets/sounds2/11-minuscolo/giovane.mp3' },
    { 'completa': 'indirizzo', 'parti': ['I', 'N', 'D', 'I', 'R', 'I', 'Z', 'Z', 'O'], 'audioParola': 'assets/sounds2/11-minuscolo/indirizzo.mp3' },
    { 'completa': 'lavoro', 'parti': ['L', 'A', 'V', 'O', 'R', 'O'], 'audioParola': 'assets/sounds2/11-minuscolo/lavoro.mp3' },
    { 'completa': 'marito', 'parti': ['M', 'A', 'R', 'I', 'T', 'O'], 'audioParola': 'assets/sounds2/11-minuscolo/marito.mp3' },
    { 'completa': 'nove', 'parti': ['N', 'O', 'V', 'E'], 'audioParola': 'assets/sounds2/11-minuscolo/nove.mp3' },
    { 'completa': 'pane', 'parti': ['P', 'A', 'N', 'E'], 'audioParola': 'assets/sounds2/11-minuscolo/pane.mp3' },
    { 'completa': 'sapone', 'parti': ['S', 'A', 'P', 'O', 'N', 'E'], 'audioParola': 'assets/sounds2/11-minuscolo/sapone.mp3' },
    { 'completa': 'scuola', 'parti': ['S', 'C', 'U', 'O', 'L', 'A'], 'audioParola': 'assets/sounds2/11-minuscolo/scuola.mp3' },
    { 'completa': 'soldi', 'parti': ['S', 'O', 'L', 'D', 'I'], 'audioParola': 'assets/sounds2/11-minuscolo/soldi.mp3' },
    { 'completa': 'telefono', 'parti': ['T', 'E', 'L', 'E', 'F', 'O', 'N', 'O'], 'audioParola': 'assets/sounds2/11-minuscolo/telefono.mp3' },
    { 'completa': 'uscita ', 'parti': ['U', 'S', 'C', 'I', 'T', 'A'], 'audioParola': 'assets/sounds2/11-minuscolo/uscita.mp3' }
];

var $paroleMinuscoloScrittura = [
    { 'completa': 'amore', 'lettere': ['A', 'M', 'O', 'R', 'E'], 'audioParola': 'assets/sounds2/11-minuscolo/amore.mp3' },
    { 'completa': 'bambino', 'lettere': ['B', 'A', 'M', 'B', 'I', 'N', 'O'], 'audioParola': 'assets/sounds2/11-minuscolo/bambino.mp3' },
    { 'completa': 'biro', 'lettere': ['B', 'I', 'R', 'O'], 'audioParola': 'assets/sounds2/11-minuscolo/biro.mp3' },
    { 'completa': 'data', 'lettere': ['D', 'A', 'T', 'A'], 'audioParola': 'assets/sounds2/11-minuscolo/data.mp3' },
    { 'completa': 'documento', 'lettere': ['D', 'O', 'C', 'U', 'M', 'E', 'N', 'T', 'O'], 'audioParola': 'assets/sounds2/11-minuscolo/documento.mp3' },
    { 'completa': 'entrata', 'lettere': ['E', 'N', 'T', 'R', 'A', 'T', 'A'], 'audioParola': 'assets/sounds2/11-minuscolo/entrata.mp3' },
    { 'completa': 'fame', 'lettere': ['F', 'A', 'M', 'E'], 'audioParola': 'assets/sounds2/11-minuscolo/fame.mp3' },
    { 'completa': 'fiore', 'lettere': ['F', 'I', 'O', 'R', 'E'], 'audioParola': 'assets/sounds2/11-minuscolo/fiore.mp3' },
    { 'completa': 'foto', 'lettere': ['F', 'O', 'T', 'O'], 'audioParola': 'assets/sounds2/11-minuscolo/foto.mp3' },
    { 'completa': 'giovane', 'lettere': ['G', 'I', 'O', 'V', 'A', 'N', 'E'], 'audioParola': 'assets/sounds2/11-minuscolo/giovane.mp3' },
    { 'completa': 'indirizzo', 'lettere': ['I', 'N', 'D', 'I', 'R', 'I', 'Z', 'Z', 'O'], 'audioParola': 'assets/sounds2/11-minuscolo/indirizzo.mp3' },
    { 'completa': 'lavoro', 'lettere': ['L', 'A', 'V', 'O', 'R', 'O'], 'audioParola': 'assets/sounds2/11-minuscolo/lavoro.mp3' },
    { 'completa': 'marito', 'lettere': ['M', 'A', 'R', 'I', 'T', 'O'], 'audioParola': 'assets/sounds2/11-minuscolo/marito.mp3' },
    { 'completa': 'nove', 'lettere': ['N', 'O', 'V', 'E'], 'audioParola': 'assets/sounds2/11-minuscolo/nove.mp3' },
    { 'completa': 'pane', 'lettere': ['P', 'A', 'N', 'E'], 'audioParola': 'assets/sounds2/11-minuscolo/pane.mp3' },
    { 'completa': 'sapone', 'lettere': ['S', 'A', 'P', 'O', 'N', 'E'], 'audioParola': 'assets/sounds2/11-minuscolo/sapone.mp3' },
    { 'completa': 'scuola', 'lettere': ['S', 'C', 'U', 'O', 'L', 'A'], 'audioParola': 'assets/sounds2/11-minuscolo/scuola.mp3' },
    { 'completa': 'soldi', 'lettere': ['S', 'O', 'L', 'D', 'I'], 'audioParola': 'assets/sounds2/11-minuscolo/soldi.mp3' },
    { 'completa': 'telefono', 'lettere': ['T', 'E', 'L', 'E', 'F', 'O', 'N', 'O'], 'audioParola': 'assets/sounds2/11-minuscolo/telefono.mp3' },
    { 'completa': 'uscita', 'lettere': ['U', 'S', 'C', 'I', 'T', 'A'], 'audioParola': 'assets/sounds2/11-minuscolo/uscita.mp3' }
];

var $paroleGiocaParole = [
{ 'completa': 'ACQUA', 'lettere': ['A', 'C', 'Q', 'U', 'A'], 'parti': ['A', 'CQUA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-acqua.mp3', 'imageURL': 'assets/images/parole/disegno-acqua.png' },
{ 'completa': 'AGNELLO', 'lettere': ['A', 'G', 'N', 'E', 'L', 'L', 'O'], 'parti': ['A', 'GNE', 'LLO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-agnello.mp3', 'imageURL': 'assets/images/parole/disegno-agnello.png' },
{ 'completa': 'AGO', 'lettere': ['A', 'G', 'O'], 'parti': ['A', 'GO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-ago.mp3', 'imageURL': 'assets/images/parole/disegno-ago.png' },
{ 'completa': 'AMICA', 'lettere': ['A', 'M', 'I', 'C', 'A'], 'parti': ['A', 'MI', 'CA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-amica.mp3', 'imageURL': 'assets/images/parole/disegno-amica.png' },
{ 'completa': 'AMICI', 'lettere': ['A', 'M', 'I', 'C', 'I'], 'parti': ['A', 'MI', 'CI'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-amici.mp3', 'imageURL': 'assets/images/parole/disegno-amici.png' },
{ 'completa': 'AMORE', 'lettere': ['A', 'M', 'O', 'R', 'E'], 'parti': ['A', 'MO', 'RE'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-amore.mp3', 'imageURL': 'assets/images/parole/disegno-amore.png' },
{ 'completa': 'ARANCIA', 'lettere': ['A', 'R', 'A', 'N', 'C', 'I', 'A'], 'parti': ['A', 'RAN', 'CIA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-arancia.mp3', 'imageURL': 'assets/images/parole/disegno-arancia.png' },
{ 'completa': 'BAGNO', 'lettere': ['B', 'A', 'G', 'N', 'O'], 'parti': ['BA', 'GNO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-bagno.mp3', 'imageURL': 'assets/images/parole/disegno-bagno.png' },
{ 'completa': 'BAMBINO', 'lettere': ['B', 'A', 'M', 'B', 'I', 'N', 'O'], 'parti': ['BAM', 'BI', 'NO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-bambino.mp3', 'imageURL': 'assets/images/parole/disegno-bambino.png' },
{ 'completa': 'BANCA', 'lettere': ['B', 'A', 'N', 'C', 'A'], 'parti': ['BAN', 'CA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-banca.mp3', 'imageURL': 'assets/images/parole/disegno-banca.png' },
{ 'completa': 'BIGLIETTO', 'lettere': ['B', 'I', 'G', 'L', 'I', 'E', 'T', 'T', 'O'], 'parti': ['BI', 'GLIE', 'TTO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-biglietto.mp3', 'imageURL': 'assets/images/parole/disegno-biglietto.png' },
{ 'completa': 'BISCOTTI', 'lettere': ['B', 'I', 'S', 'C', 'O', 'T', 'T', 'I'], 'parti': ['BI', 'SCO', 'TTI'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-biscotti.mp3', 'imageURL': 'assets/images/parole/disegno-biscotti.png' },
{ 'completa': 'BORSA', 'lettere': ['B', 'O', 'R', 'S', 'A'], 'parti': ['BOR', 'SA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-borsa.mp3', 'imageURL': 'assets/images/parole/disegno-borsa.png' },
{ 'completa': 'BOTTIGLIA', 'lettere': ['B', 'O', 'T', 'T', 'I', 'G', 'L', 'I', 'A'], 'parti': ['BOT', 'TI', 'GLIA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-bottiglia.mp3', 'imageURL': 'assets/images/parole/disegno-bottiglia.png' },
{ 'completa': 'BRACCIO', 'lettere': ['B', 'R', 'A', 'C', 'C', 'I', 'O'], 'parti': ['BRA', 'CCIO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-braccio.mp3', 'imageURL': 'assets/images/parole/disegno-braccio.png' },
{ 'completa': 'CAFFÈ', 'lettere': ['C', 'A', 'F', 'F', 'È'], 'parti': ['CA', 'FFÈ'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-caffe.mp3', 'imageURL': 'assets/images/parole/disegno-caffe.png' },
{ 'completa': 'CALZE', 'lettere': ['C', 'A', 'L', 'Z', 'E'], 'parti': ['CAL', 'ZE'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-calze.mp3', 'imageURL': 'assets/images/parole/disegno-calze.png' },
{ 'completa': 'CAPELLI', 'lettere': ['C', 'A', 'P', 'E', 'L', 'L', 'I'], 'parti': ['CA', 'PE', 'LLI'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-capelli.mp3', 'imageURL': 'assets/images/parole/disegno-capelli.png' },
{ 'completa': 'CHIAVI', 'lettere': ['C', 'H', 'I', 'A', 'V', 'I'], 'parti': ['CHIA', 'VI'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-chiavi.mp3', 'imageURL': 'assets/images/parole/disegno-chiavi.png' },
{ 'completa': 'CHIESA', 'lettere': ['C', 'H', 'I', 'E', 'S', 'A'], 'parti': ['CHIA', 'VI'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-chiesa.mp3', 'imageURL': 'assets/images/parole/disegno-chiesa.png' },
{ 'completa': 'CINQUE', 'lettere': ['C', 'I', 'N', 'Q', 'U', 'E'], 'parti': ['CIN', 'QUE'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-cinque.mp3', 'imageURL': 'assets/images/parole/disegno-cinque.png' },
{ 'completa': 'COLLA', 'lettere': ['C', 'O', 'L', 'L', 'A'], 'parti': ['CO', 'LLA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-colla.mp3', 'imageURL': 'assets/images/parole/disegno-colla.png' },
{ 'completa': 'COLTELLO', 'lettere': ['C', 'O', 'L', 'T', 'E', 'L', 'L', 'O'], 'parti': ['COL', 'TE', 'LLO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-coltello.mp3', 'imageURL': 'assets/images/parole/disegno-coltello.png' },
{ 'completa': 'DENTI', 'lettere': ['D', 'E', 'N', 'T', 'I'], 'parti': ['DEN', 'TI'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-denti.mp3', 'imageURL': 'assets/images/parole/disegno-denti.png' },
{ 'completa': 'DESTRA', 'lettere': ['D', 'E', 'S', 'T', 'R', 'A'], 'parti': ['DES', 'TRA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-destra.mp3', 'imageURL': 'assets/images/parole/disegno-destra.png' },
{ 'completa': 'DOCCIA', 'lettere': ['D', 'O', 'C', 'C', 'I', 'A'], 'parti': ['DO', 'CCIA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-doccia.mp3', 'imageURL': 'assets/images/parole/disegno-doccia.png' },
{ 'completa': 'DOCUMENTO', 'lettere': ['D', 'O', 'C', 'U', 'M', 'E', 'N', 'T', 'O'], 'parti': ['DO', 'CU', 'MEN', 'TO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-documento.mp3', 'imageURL': 'assets/images/parole/disegno-documento.png' },
{ 'completa': 'DUE', 'lettere': ['D', 'U', 'E'], 'parti': ['DUE'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-due.mp3', 'imageURL': 'assets/images/parole/disegno-due.png' },
{ 'completa': 'ELEFANTE', 'lettere': ['E', 'L', 'E', 'F', 'A', 'N', 'T', 'E'], 'parti': ['E', 'LE', 'FAN', 'TE'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-elefante.mp3', 'imageURL': 'assets/images/parole/disegno-elefante.png' },
{ 'completa': 'ENTRATA', 'lettere': ['E', 'N', 'T', 'R', 'A', 'T', 'A'], 'parti': ['EN', 'TRA', 'TA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-entrata.mp3', 'imageURL': 'assets/images/parole/disegno-entrata.png' },
{ 'completa': 'ESAME', 'lettere': ['E', 'S', 'A', 'M', 'E'], 'parti': ['E', 'SA', 'ME'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-esame.mp3', 'imageURL': 'assets/images/parole/disegno-esame.png' },
{ 'completa': 'FAMIGLIA', 'lettere': ['F', 'A', 'M', 'I', 'G', 'L', 'I', 'A'], 'parti': ['FA', 'MI', 'GLIA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-famiglia.mp3', 'imageURL': 'assets/images/parole/disegno-famiglia.png' },
{ 'completa': 'FIGLIO', 'lettere': ['F', 'I', 'G', 'L', 'I', 'O'], 'parti': ['FI', 'GLIO'], 'lettere': ['F', 'I', 'G', 'L', 'I', 'O'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-figlio.mp3', 'imageURL': 'assets/images/parole/disegno-figlio.png' },
{ 'completa': 'FIORE', 'lettere': ['F', 'I', 'O', 'R', 'E'], 'parti': ['FIO', 'RE'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-fiore.mp3', 'imageURL': 'assets/images/parole/disegno-fiore.png' },
{ 'completa': 'FRUTTA', 'lettere': ['F', 'R', 'U', 'T', 'T', 'A'], 'parti': ['FRU', 'TTA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-frutta.mp3', 'imageURL': 'assets/images/parole/disegno-frutta.png' },
{ 'completa': 'GAMBA', 'lettere': ['G', 'A', 'M', 'B', 'A'], 'parti': ['GAM', 'BA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-gamba.mp3', 'imageURL': 'assets/images/parole/disegno-gamba.png' },
{ 'completa': 'GATTO', 'lettere': ['G', 'A', 'T', 'T', 'O'], 'parti': ['GA', 'TTO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-gatto.mp3', 'imageURL': 'assets/images/parole/disegno-gatto.png' },
{ 'completa': 'GIACCA', 'lettere': ['G', 'I', 'A', 'C', 'C', 'A'], 'parti': ['GIA', 'CCA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-giacca.mp3', 'imageURL': 'assets/images/parole/disegno-giacca.png' },
{ 'completa': 'GIORNALE', 'lettere': ['G', 'I', 'O', 'R', 'N', 'A', 'L', 'E'], 'parti': ['GIOR', 'NA', 'LE'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-giornale.mp3', 'imageURL': 'assets/images/parole/disegno-giornale.png'},
{ 'completa': 'GOMMA', 'lettere': ['G', 'O', 'M', 'M', 'A'], 'parti': ['GO', 'MMA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-gomma.mp3', 'imageURL': 'assets/images/parole/disegno-gomma.png'},
{ 'completa': 'GUANTI', 'lettere': ['G', 'U', 'A', 'N', 'T', 'I'], 'parti': ['GUANT', 'TI'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-guanti.mp3', 'imageURL': 'assets/images/parole/disegno-guanti.png'},
{ 'completa': 'INDIRIZZO', 'lettere': ['I', 'N', 'D', 'I', 'R', 'I', 'Z', 'Z', 'O'], 'parti': ['IN', 'DI', 'RI', 'ZZO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-indirizzo.mp3', 'imageURL': 'assets/images/parole/disegno-indirizzo.png' },
{ 'completa': 'INSALATA', 'lettere': ['I', 'N', 'S', 'A', 'L', 'A', 'T', 'A'], 'parti': ['IN', 'SA', 'LA', 'TA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-insalata.mp3', 'imageURL': 'assets/images/parole/disegno-insalata.png' },
{ 'completa': 'IO', 'lettere': ['I', 'O'], 'parti': ['I', 'O'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-io.mp3', 'imageURL': 'assets/images/parole/disegno-io.png' },
{ 'completa': 'LAMPADINA', 'lettere': ['L', 'A', 'M', 'P', 'A', 'D', 'I', 'N', 'A'], 'parti': ['LAM', 'PA', 'DI', 'NA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-lampadina.mp3', 'imageURL': 'assets/images/parole/disegno-lampadina.png' },
{ 'completa': 'LATTE', 'lettere': ['L', 'A', 'T', 'T', 'E'], 'parti': ['LA', 'TTE'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-latte.mp3', 'imageURL': 'assets/images/parole/disegno-latte.png' },
{ 'completa': 'LAVAGNA', 'lettere': ['L', 'A', 'V', 'A', 'G', 'N', 'A'], 'parti': ['LA', 'VA', 'GNA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-lavagna.mp3', 'imageURL': 'assets/images/parole/disegno-lavagna.png' },
{ 'completa': 'LIBRO', 'lettere': ['L', 'I', 'B', 'R', 'O'], 'parti': ['LI', 'BRO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-libro.mp3', 'imageURL': 'assets/images/parole/disegno-libro.png' },
{ 'completa': 'LITRO', 'lettere': ['L', 'I', 'T', 'R', 'O'], 'parti': ['LI', 'TRO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-litro.mp3', 'imageURL': 'assets/images/parole/disegno-litro.png' },
{ 'completa': 'LORO', 'lettere': ['L', 'O', 'R', 'O'], 'parti': ['LO', 'RO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-loro.mp3', 'imageURL': 'assets/images/parole/disegno-loro.png' },
{ 'completa': 'MACCHINA', 'lettere': ['M', 'A', 'G', 'L', 'I', 'A'], 'parti': ['MA', 'CCHI', 'NA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-macchina.mp3', 'imageURL': 'assets/images/parole/disegno-macchina.png' },
{ 'completa': 'MAGLIA', 'lettere': ['M', 'A', 'G', 'L', 'I', 'A'], 'parti': ['MA', 'GLIA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-maglia.mp3', 'imageURL': 'assets/images/parole/disegno-maglia.png' },
{ 'completa': 'MAGRO', 'lettere': ['M', 'A', 'G', 'R', 'O'], 'parti': ['MA', 'GRO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-magro.mp3', 'imageURL': 'assets/images/parole/disegno-magro.png' },
{ 'completa': 'MAMMA', 'lettere': ['M', 'A', 'M', 'M', 'A'], 'parti': ['MA', 'MMA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-mamma.mp3', 'imageURL': 'assets/images/parole/disegno-mamma.png' },
{ 'completa': 'MANGIARE', 'lettere': ['M', 'A', 'N', 'G', 'I', 'A', 'R', 'E'], 'parti': ['MAN', 'GIA', 'RE'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-mangiare.mp3', 'imageURL': 'assets/images/parole/disegno-mangiare.png' },
{ 'completa': 'MARRONE', 'lettere': ['M', 'A', 'R', 'R', 'O', 'N', 'E'], 'parti': ['MA', 'RRO', 'NE'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-marrone.mp3', 'imageURL': 'assets/images/parole/disegno-marrone.png' },
{ 'completa': 'MERCATO', 'lettere': ['M', 'E', 'R', 'C', 'A', 'T', 'O'], 'parti': ['MER', 'CA', 'TO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-mercato.mp3', 'imageURL': 'assets/images/parole/disegno-mercato.png' },
{ 'completa': 'MESE', 'lettere': ['M', 'E', 'S', 'E'], 'parti': ['ME', 'SE'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-mese.mp3', 'imageURL': 'assets/images/parole/disegno-mese.png' },
{ 'completa': 'MOGLIE', 'lettere': ['M', 'O', 'G', 'L', 'I', 'E'], 'parti': ['MO', 'GLIE'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-moglie.mp3', 'imageURL': 'assets/images/parole/disegno-moglie.png' },
{ 'completa': 'MONTAGNA', 'lettere': ['M', 'O', 'N', 'T', 'A', 'G', 'N', 'A'], 'parti': ['MON', 'TA', 'GNA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-montagna.mp3', 'imageURL': 'assets/images/parole/disegno-montagna.png' },
{ 'completa': 'OLIO', 'lettere': ['O', 'L', 'I', 'O'], 'parti': ['O', 'LIO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-olio.mp3', 'imageURL': 'assets/images/parole/disegno-olio.png' },
{ 'completa': 'ORA', 'lettere': ['O', 'R', 'A'], 'parti': ['O', 'RA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-ora.mp3', 'imageURL': 'assets/images/parole/disegno-ora.png' },
{ 'completa': 'OSPEDALE', 'lettere': ['O', 'S', 'P', 'E', 'D', 'A', 'L', 'E'], 'parti': ['O', 'SPE', 'DA', 'LE'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-ospedale.mp3', 'imageURL': 'assets/images/parole/disegno-ospedale.png', 'imageURL': 'assets/images/parole/disegno-ospedale.png' },
{ 'completa': 'OTTO', 'lettere': ['O', 'T', 'T', 'O'], 'parti': ['O', 'TTO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-otto.mp3', 'imageURL': 'assets/images/parole/disegno-otto.png' },
{ 'completa': 'PESCE', 'lettere': ['P', 'E', 'S', 'C', 'E'], 'parti': ['PE', 'SCE'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-pesce.mp3', 'imageURL': 'assets/images/parole/disegno-pesce.png' },
{ 'completa': 'PIEDE', 'lettere': ['P', 'I', 'E', 'D', 'E'], 'parti': ['PIE', 'DE'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-piede.mp3', 'imageURL': 'assets/images/parole/disegno-piede.png' },
{ 'completa': 'PIZZA', 'lettere': ['P', 'I', 'Z', 'Z', 'A'], 'parti': ['PI', 'ZZA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-pizza.mp3', 'imageURL': 'assets/images/parole/disegno-pizza.png' },
{ 'completa': 'POLIZIA', 'lettere': ['P', 'O', 'L', 'I', 'Z', 'I', 'A'], 'parti': ['PO', 'LI', 'ZIA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-polizia.mp3', 'imageURL': 'assets/images/parole/disegno-polizia.png' },
{ 'completa': 'POLLO', 'lettere': ['P', 'O', 'L', 'L', 'O'], 'parti': ['PO', 'LLO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-pollo.mp3', 'imageURL': 'assets/images/parole/disegno-pollo.png' },
{ 'completa': 'PORTA', 'lettere': ['P', 'O', 'R', 'T', 'A'], 'parti': ['POR', 'TA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-porta.mp3', 'imageURL': 'assets/images/parole/disegno-porta.png' },
{ 'completa': 'POSTA', 'lettere': ['P', 'O', 'S', 'T', 'A'], 'parti': ['PO', 'STA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-posta.mp3', 'imageURL': 'assets/images/parole/disegno-posta.png' },
{ 'completa': 'QUADERNO', 'lettere': ['Q', 'U', 'A', 'D', 'E', 'R', 'N', 'O'], 'parti': ['QUA', 'DER', 'NO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-quaderno.mp3', 'imageURL': 'assets/images/parole/disegno-quaderno.png' },
{ 'completa': 'RISTORANTE', 'lettere': ['R', 'I', 'S', 'T', 'O', 'R', 'A', 'N', 'T', 'E'], 'parti': ['RIS', 'TO', 'RAN', 'TE'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-ristorante.mp3', 'imageURL': 'assets/images/parole/disegno-ristorante.png' },
{ 'completa': 'ROSSO', 'lettere': ['R', 'O', 'S', 'S', 'O'], 'parti': ['RO', 'SSO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-rosso.mp3', 'imageURL': 'assets/images/parole/disegno-rosso.png' },
{ 'completa': 'SCALA', 'lettere': ['S', 'C', 'A', 'L', 'A'], 'parti': ['SCA', 'LA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-scala.mp3', 'imageURL': 'assets/images/parole/disegno-scala.png' },
{ 'completa': 'SCARPE', 'lettere': ['S', 'C', 'A', 'R', 'P', 'E'], 'parti': ['SCA', 'RPE'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-scarpe.mp3', 'imageURL': 'assets/images/parole/disegno-scarpe.png' },
{ 'completa': 'SCENDERE', 'lettere': ['S', 'C', 'E', 'N', 'D', 'E', 'R', 'E'], 'parti': ['SCE', 'NDE', 'RE'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-scendere.mp3', 'imageURL': 'assets/images/parole/disegno-scendere.png' },
{ 'completa': 'SCHIENA', 'lettere': ['S', 'C', 'H', 'I', 'E', 'N', 'A'], 'parti': ['SCHI', 'E', 'NA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-schiena.mp3', 'imageURL': 'assets/images/parole/disegno-schiena.png' },
{ 'completa': 'SCRIVERE', 'lettere': ['S', 'C', 'R', 'I', 'V', 'E', 'R', 'E'], 'parti': ['SCRI', 'VE', 'RE'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-scrivere.mp3', 'imageURL': 'assets/images/parole/disegno-scrivere.png' },
{ 'completa': 'SCUOLA', 'lettere': ['S', 'C', 'U', 'O', 'L', 'A'], 'parti': ['SCU', 'O', 'LA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-scuola.mp3', 'imageURL': 'assets/images/parole/disegno-scuola.png' },
{ 'completa': 'SEDIA', 'lettere': ['S', 'E', 'D', 'I', 'A'], 'parti': ['SE', 'DIA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-sedia.mp3', 'imageURL': 'assets/images/parole/disegno-sedia.png' },
{ 'completa': 'SEI', 'lettere': ['S', 'E', 'I'], 'parti': ['SEI'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-sei.mp3', 'imageURL': 'assets/images/parole/disegno-sei.png' },
{ 'completa': 'SIGARETTA', 'lettere': ['S', 'I', 'G', 'A', 'R', 'E', 'T', 'T', 'A'], 'parti': ['SI', 'GA', 'RE', 'TTA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-sigaretta.mp3', 'imageURL': 'assets/images/parole/disegno-sigaretta.png' },
{ 'completa': 'SIGNORA', 'lettere': ['S', 'I', 'G', 'N', 'O', 'R', 'A'], 'parti': ['SI', 'GNO', 'RA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-signora.mp3', 'imageURL': 'assets/images/parole/disegno-signora.png' },
{ 'completa': 'SINISTRA', 'lettere': ['S', 'I', 'N', 'I', 'S', 'T', 'R', 'A'], 'parti': ['SI', 'NI', 'STRA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-sinistra.mp3', 'imageURL': 'assets/images/parole/disegno-sinistra.png' },
{ 'completa': 'SOLDI', 'lettere': ['S', 'O', 'L', 'D', 'I'], 'parti': ['SO', 'LDI'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-soldi.mp3', 'imageURL': 'assets/images/parole/disegno-soldi.png' },
{ 'completa': 'SOPRA', 'lettere': ['S', 'O', 'P', 'R', 'A'], 'parti': ['SO', 'PRA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-sopra.mp3', 'imageURL': 'assets/images/parole/disegno-sopra.png' },
{ 'completa': 'SPAGHETTI', 'lettere': ['S', 'P', 'A', 'G', 'H', 'E', 'T', 'T', 'I'], 'parti': ['SO', 'PRA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-spaghetti.mp3', 'imageURL': 'assets/images/parole/disegno-spaghetti.png' },
{ 'completa': 'STAZIONE', 'lettere': ['S', 'T', 'A', 'Z', 'I', 'O', 'N', 'E'], 'parti': ['STA', 'ZIO', 'NE'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-stazione.mp3', 'imageURL': 'assets/images/parole/disegno-stazione.png' },
{ 'completa': 'STRADA', 'lettere': ['S', 'T', 'R', 'A', 'D', 'A'], 'parti': ['STRA', 'DA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-strada.mp3', 'imageURL': 'assets/images/parole/disegno-strada.png' },
{ 'completa': 'STUDENTE', 'lettere': ['S', 'T', 'U', 'D', 'E', 'N', 'T', 'E'], 'parti': ['STU', 'DEN', 'TE'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-studente.mp3', 'imageURL': 'assets/images/parole/disegno-studente.png' },
{ 'completa': 'TRENO', 'lettere': ['T', 'R', 'E', 'N', 'O'], 'parti': ['TRE', 'NO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-treno.mp3', 'imageURL': 'assets/images/parole/disegno-treno.png' },
{ 'completa': 'UNO', 'lettere': ['U', 'N', 'O'], 'parti': ['U', 'NO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-uno.mp3', 'imageURL': 'assets/images/parole/disegno-uno.png' },
{ 'completa': 'UOMO', 'lettere': ['U', 'O', 'M', 'O'], 'parti': ['UO', 'MO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-uomo.mp3', 'imageURL': 'assets/images/parole/disegno-uomo.png' },
{ 'completa': 'UOVO', 'lettere': ['U', 'O', 'V', 'O'], 'parti': ['UO', 'VO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-uovo.mp3', 'imageURL': 'assets/images/parole/disegno-uovo.png' },
{ 'completa': 'USCITA', 'lettere': ['U', 'S', 'C', 'I', 'T', 'A'], 'parti': ['U', 'SCI', 'TA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-uscita.mp3', 'imageURL': 'assets/images/parole/disegno-uscita.png' },
{ 'completa': 'VEDERE', 'lettere': ['V', 'E', 'D', 'E', 'R', 'E'], 'parti': ['VE', 'DE', 'RE'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-vedere.mp3', 'imageURL': 'assets/images/parole/disegno-vedere.png' },
{ 'completa': 'VENTI', 'lettere': ['V', 'E', 'N', 'T', 'I'], 'parti': ['VEN', 'TI'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-venti.mp3', 'imageURL': 'assets/images/parole/disegno-venti.png' },
{ 'completa': 'ZUCCHERO', 'lettere': ['Z', 'U', 'C', 'C', 'H', 'E', 'R', 'O'], 'parti': ['ZU', 'CCHE', 'RO'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-zucchero.mp3', 'imageURL': 'assets/images/parole/disegno-zucchero.png' },
{ 'completa': 'ZUPPA', 'lettere': ['Z', 'U', 'P', 'P', 'A'], 'parti': ['ZU', 'PPA'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-zuppa.mp3', 'imageURL': 'assets/images/parole/disegno-zuppa.png' }
]

var $paroleGiocaSillabe = [
    { 'completa': 'arancia', 'parti': ['A', 'RAN', 'CIA'], 'lettere': ['A', 'R', 'A', 'N', 'C', 'I', 'A'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-arancia.mp3', 'imageURL': 'assets/images/parole/disegno-arancia.png' },
    { 'completa': 'bambino', 'parti': ['BAM', 'BI', 'NO'], 'lettere': ['B', 'A', 'M', 'B', 'I', 'N', 'O'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-bambino.mp3', 'imageURL': 'assets/images/parole/disegno-bambino.png' },
    { 'completa': 'documento', 'parti': ['DO', 'CU', 'MEN', 'TO'], 'lettere': ['D', 'O', 'C', 'U', 'M', 'E', 'N', 'T', 'O'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-documento.mp3', 'imageURL': 'assets/images/parole/disegno-documento.png' },
    { 'completa': 'entrata', 'parti': ['EN', 'TRA', 'TA'], 'lettere': ['E', 'N', 'T', 'R', 'A', 'T', 'A'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-entrata.mp3', 'imageURL': 'assets/images/parole/disegno-entrata.png' },
    { 'completa': 'famiglia', 'parti': ['FA', 'MI', 'GLIA'], 'lettere': ['F', 'A', 'M', 'I', 'G', 'L', 'I', 'A'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-famiglia.mp3', 'imageURL': 'assets/images/parole/disegno-famiglia.png' },
    { 'completa': 'giornale', 'parti': ['GIOR', 'NA', 'LE'], 'lettere': ['G', 'I', 'O', 'R', 'N', 'A', 'L', 'E'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-giornale.mp3', 'imageURL': 'assets/images/parole/disegno-giornale.png' },
    { 'completa': 'insalata', 'parti': ['IN', 'SA', 'LA', 'TA'], 'lettere': ['I', 'N', 'S', 'A', 'L', 'A', 'T', 'A'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-insalata.mp3', 'imageURL': 'assets/images/parole/disegno-insalata.png' },
    { 'completa': 'ITALIA', 'parti': ['I', 'TA', 'LIA'], 'lettere': ['I', 'T', 'A', 'L', 'I', 'A'], 'audioParola': 'assets/sounds2/gioca-con-le-sillabe/italia.mp3', 'imageURL': 'assets/images/parole/disegno-italia.png' },
    { 'completa': 'lampadina', 'parti': ['LAM', 'PA', 'DI', 'NA'], 'lettere': ['L', 'A', 'M', 'P', 'A', 'D', 'I', 'N', 'A'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-lampadina.mp3', 'imageURL': 'assets/images/parole/disegno-lampadina.png' },
    { 'completa': 'lavoro', 'parti': ['LA', 'VO', 'RO'], 'lettere': ['L', 'A', 'V', 'O', 'R', 'O'], 'audioParola': 'assets/sounds2/gioca-con-le-sillabe/lavoro.mp3', 'imageURL': 'assets/images/parole/disegno-lavoro.png' },
    { 'completa': 'mangiare', 'parti': ['MAN', 'GIA', 'RE'], 'lettere': ['M', 'A', 'N', 'G', 'I', 'A', 'R', 'E'], 'audioParola': 'assets/sounds2/gioca-con-le-sillabe/mangiare.mp3', 'imageURL': 'assets/images/parole/disegno-mangiare.png' },
    { 'completa': 'monete', 'parti': ['MO', 'NE', 'TE'], 'lettere': ['M', 'O', 'N', 'E', 'T', 'E'], 'audioParola': 'assets/sounds2/gioca-con-le-sillabe/monete.mp3', 'imageURL': 'assets/images/parole/disegno-monete.png' },
    { 'completa': 'montagna', 'parti': ['MON', 'TA', 'GNA'], 'lettere': ['M', 'O', 'N', 'T', 'A', 'G', 'N', 'A'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-montagna.mp3', 'imageURL': 'assets/images/parole/disegno-montagna.png' },
    { 'completa': 'ospedale', 'parti': ['OS', 'PE', 'DA', 'LE'], 'lettere': ['O', 'S', 'P', 'E', 'D', 'A', 'L', 'E'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-ospedale.mp3', 'imageURL': 'assets/images/parole/disegno-ospedale.png' },
    { 'completa': 'polizia', 'parti': ['PO', 'LI', 'ZI', 'A'], 'lettere': ['P', 'O', 'L', 'I', 'Z', 'I', 'A'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-polizia.mp3', 'imageURL': 'assets/images/parole/disegno-polizia.png' },
    { 'completa': 'quaderno', 'parti': ['QUA', 'DER', 'NO'], 'lettere': ['Q', 'U', 'A', 'D', 'E', 'R', 'N', 'O'], 'audioParola': 'assets/sounds2/gioca-con-le-sillabe/quaderno.mp3', 'imageURL': 'assets/images/parole/disegno-quaderno.png' },
    { 'completa': 'ristorante', 'parti': ['RIS', 'TO', 'RAN', 'TE'], 'lettere': ['R', 'I', 'S', 'T', 'O', 'R', 'A', 'N', 'T', 'E'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-ristorante.mp3', 'imageURL': 'assets/images/parole/disegno-ristorante.png' },
    { 'completa': 'scendere', 'parti': ['SCEN', 'DE', 'RE'], 'lettere': ['S', 'C', 'E', 'N', 'D', 'E', 'R', 'E'], 'audioParola': 'assets/sounds2/gioca-con-le-sillabe/scendere.mp3', 'imageURL': 'assets/images/parole/disegno-scendere.png' },
    { 'completa': 'stazione', 'parti': ['STA', 'ZIO', 'NE'], 'lettere': ['S', 'T', 'A', 'Z', 'I', 'O', 'N', 'E'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-stazione.mp3', 'imageURL': 'assets/images/parole/disegno-stazione.png' },
    { 'completa': 'uscita', 'parti': ['U', 'SCI', 'TA'], 'lettere': ['U', 'S', 'C', 'I', 'T', 'A'], 'audioParola': 'assets/sounds2/gioca-con-le-parole/giocaconleparole-uscita.mp3', 'imageURL': 'assets/images/parole/disegno-uscita.png' }
]

