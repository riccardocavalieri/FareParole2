var myAppControllers = angular.module('myAppControllers', []);


myAppControllers.controller('HomeController', [
    '$scope', '$routeParams',
    function ($scope, $routeParams) {

        getAudioElementAndPlay('#audioFareParole');

        $scope.playAudioHint = function (selector) {
            getAudioElementAndPlay(selector);
        }
    }
]);

myAppControllers.controller('ImparaController', [
    '$scope', '$routeParams', '$location',
    function ($scope, $routeParams, $location) {

        //playAudioToccaUnaLettera();
        hintToccaUnaCarta();

        $scope.carteRiga1 = $carteRiga1;
        $scope.carteRiga2 = $carteRiga2;
        $scope.carteRiga3 = $carteRiga3;
        $scope.carteSpeciali = $carteSpeciali;
        $scope.carteLivelli = $carteLivelli;

        $scope.imgCartaRandom = $IMG_CARTA_CASO;
        $scope.cartaRandom = getRandomElemento($carteLivelli);
		
		$scope.changeLocation = function(path) {
			$location.path(path);
		}
    }
]);

myAppControllers.controller('AscoltaController', [
    '$scope', '$routeParams',
    function ($scope, $routeParams) {

        hintToccaBottoneAscolta();

        $scope.name = $routeParams.name;

        $scope.showPlayButton = false;
        function setSottotitolo()
        {
            var sottotitolo = $("#sottotitolo_ascolto")[0];
            var strSottotitolo = $STR_ASCOLTO;
            if ($routeParams.name === '01') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_01;
                $scope.showPlayButton = true;
            }
            if ($routeParams.name === '02') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_02;
                $scope.showPlayButton = true;
            }
            if ($routeParams.name === '03') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_03;
                $scope.showPlayButton = true;
            }
            if ($routeParams.name === '04') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_04;
            }
            if ($routeParams.name === '05') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_05;
                $scope.showPlayButton = true;
            }
            if ($routeParams.name === '06') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_06;
            }
            if ($routeParams.name === '07') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_07;
            }
            if ($routeParams.name === '08') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_08;
            }
            if ($routeParams.name === '09') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_09;
            }
            if ($routeParams.name === '10') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_10;
            }

            sottotitolo.innerHTML = strSottotitolo;
            sottotitolo.innerText = strSottotitolo;
        }
        setSottotitolo();

        $scope.parole = getParoleAscoltoPerLivello($routeParams.name);
        var audioRunning = false;
        var currentParte = 0;

        $scope.playParolaSillabata = function (parola)
        {
            if (audioRunning)
                return;
            audioRunning = true;

            $('.parte-evidenziata').removeClass('parte-evidenziata');

            $scope.currentParola = parola;

            var audioPlayer = getAudioPlayer('#audio-' + $scope.currentParola.completa);
            if (audioPlayer)
                playAudio(audioPlayer);

            evidenziaParti();
        }

        $scope.playParola = function (parola)
        {
            $scope.currentParola = parola;

            var audioPlayer = getAudioPlayer('#audio-' + $scope.currentParola.completa + '-2');
            if (audioPlayer)
                playAudio(audioPlayer);
        }

        var delayForAscolta = 2000;
        if ($routeParams.name === '01') {
            delayForAscolta = 2000;
        }
        if ($routeParams.name === '02') {
            delayForAscolta = 2000;
        }
        if ($routeParams.name === '03') {
            delayForAscolta = 2000;
        }
        if ($routeParams.name === '04') {
            delayForAscolta = 2000;
        }
        if ($routeParams.name === '05') {
            delayForAscolta = 2000;
        }
        if ($routeParams.name === '06') {
            delayForAscolta = 2500;
        }
        if ($routeParams.name === '07') {
            delayForAscolta = 2250;
        }
        if ($routeParams.name === '08') {
            delayForAscolta = 2500;
        }
        if ($routeParams.name === '09') {
            delayForAscolta = 2500;
        }
        if ($routeParams.name === '10') {
            delayForAscolta = 2500;
        }

        function evidenziaParti()
        {
            // Interrompo le chiamate ricorsive
            if (currentParte >= $scope.currentParola.parti.length)
            {
                audioRunning = false;
                currentParte = 0;

                var divElementIdFinale = "#sillaba-" + $scope.currentParola.completa;
                var divParteFinale = $(divElementIdFinale);
                divParteFinale.addClass('parte-evidenziata');
                return;
            }

            var divElementId = "#parte-" + $scope.currentParola.completa + "-" + currentParte;
            var divParte = $(divElementId);
            divParte.addClass('parte-evidenziata');
            currentParte++;

            setTimeout(function () { evidenziaParti(); }, delayForAscolta);
        }
    }
]);

myAppControllers.controller('ScritturaController', [
    '$scope', '$routeParams',
    function ($scope, $routeParams) {

        function setSottotitolo()
        {
            var sottotitolo = $("#sottotitolo_scrittura")[0];
            var strSottotitolo = $STR_SCRITTURA;
            if ($routeParams.name === '01') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_01;
            }
            if ($routeParams.name === '02') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_02;
            }
            if ($routeParams.name === '03') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_03;
            }
            if ($routeParams.name === '04') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_04;
            }
            if ($routeParams.name === '05') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_05;
            }
            if ($routeParams.name === '06') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_06;
            }
            if ($routeParams.name === '07') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_07;
            }
            if ($routeParams.name === '08') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_08;
            }
            if ($routeParams.name === '09') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_09;
            }
            if ($routeParams.name === '10') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_10;
            }

            sottotitolo.innerHTML = strSottotitolo;
            sottotitolo.innerText = strSottotitolo;
        }
        setSottotitolo();

        hintToccaBottoneScrivi();

        $scope.name = $routeParams.name;
        $scope.parole = getParoleScritturaPerLivello($routeParams.name);
        var currentParolaIndex = 0;
        $scope.parolaRandom = $scope.parole[currentParolaIndex];
        var currentLetter = 0;
        var currentParte = 0;
        var currentLetterOfSillaba = 0;
        var endOfLastSillaba = 0;
        var gameOver = false;
        var errori = 0;

        $scope.playParola = function (parola)
        {
            if (ignoreTouches)
                return;

            if (currentParte < $scope.parolaRandom.parti.length)
            {
                var audioElementId = "#sound-scrittura-" + currentParte;
                var audioPlayer = getAudioPlayer(audioElementId);
                playAudio(audioPlayer);
            }

            if (gameOver)
            {
                gameOver = false;

                angular.element('.lettera_scrittura_evidenziata').removeClass("lettera_scrittura_evidenziata");

                // Loop through the words
                currentParolaIndex++;
                if (currentParolaIndex >= $scope.parole.length)
                    currentParolaIndex = 0;

                // Reset game variables
                currentLetter = 0;
                currentParte = 0;
                currentLetterOfSillaba = 0;
                endOfLastSillaba = 0;

                $scope.parolaRandom = $scope.parole[currentParolaIndex];
                $scope.$apply();

                for (var i=0; i<$scope.parolaRandom.completa.length; i++)
                {
                    var letterDiv = $("#lettera-" + i);
                    if (letterDiv.length > 0)
                    {
                        letterDiv[0].innerHTML = '_';
                        letterDiv[0].innerText = '_';
                    }
                }
            }
        }

        var ignoreTouches = false;
        $scope.letteraPremuta = function (lettera)
        {
            if (gameOver)
                return;

            if (ignoreTouches)
                return;

            if (lettera.toUpperCase() === $scope.parolaRandom.lettere[currentLetter]) {
                letteraOk(lettera);
            }
            else {
                letteraKo();
                errori++;

                if (errori >= 2)
                {
                    ignoreTouches = true;
                    setTimeout(function () { completeCurrentSillaba(); }, 2000);
                }
            }
        }

        function letteraOk()
        {
            var letterDiv = $("#lettera-" + currentLetter);
            letterDiv[0].innerHTML = $scope.parolaRandom.lettere[currentLetter];
            letterDiv[0].innerText = $scope.parolaRandom.lettere[currentLetter];

            currentLetter++;
            // Check parola completa
            if (currentLetter >= $scope.parolaRandom.lettere.length)
            {
                ignoreTouches = true;

                if (errori < 2)
                {
                    var audioPlayer = getAudioPlayer('#audioVittoria');
                    playAudio(audioPlayer);
                }

                setTimeout(function () {
                    ignoreTouches = false;
                    hintToccaBottoneScrivi();
                    $scope.playParola();
                }, 3000);

                gameOver = true;
            }

            currentLetterOfSillaba++;
            // Check sillaba completata
            if (currentLetterOfSillaba >= $scope.parolaRandom.parti[currentParte].length) {
                for (var u = 0; u < $scope.parolaRandom.parti[currentParte].length; u++) {
                    var index = u + endOfLastSillaba;
                    angular.element('#lettera-' + index).addClass("lettera_scrittura_evidenziata");
                }

                currentParte++;
                endOfLastSillaba = currentLetter;
                currentLetterOfSillaba = 0;
                errori = 0;

                setTimeout(function () {
                    var audioElementId = "#sound-scrittura-" + currentParte;
                    var audioPlayer = getAudioPlayer(audioElementId);
                    playAudio(audioPlayer);
                }, 1500);

                if (!gameOver)
                    playAudioBene();
            }
        }

        function letteraKo()
        {
            /*
            for (var u = endOfLastSillaba; u < $scope.parolaRandom.completa.length; u++) {
                var letterDiv = $("#lettera-" + u);
                letterDiv[0].innerHTML = "_";
                letterDiv[0].innerText = "_";
            }
            currentLetter = endOfLastSillaba;
            currentLetterOfSillaba = 0;
            */

            //Change error management.On second error show only one letter
            var letterDiv = $("#lettera-" + currentLetter);
            letterDiv[0].innerHTML = "_";
            letterDiv[0].innerText = "_";

            playAudioNo();
        }

        function completeCurrentSillaba()
        {
            /*
            for (var u = endOfLastSillaba; u < $scope.parolaRandom.completa.length; u++) {
                var letterDiv = $("#lettera-" + u);
                letterDiv[0].innerHTML = "_";
                letterDiv[0].innerText = "_";
            }
            currentLetter = endOfLastSillaba;
            currentLetterOfSillaba = 0;

            var parteLength = $scope.parolaRandom.parti[currentParte].length;
            for (var u = 0; u < parteLength; u++)
            {
                letteraOk();
            }
            */

            //Change error management.On second error show only one letter
            var letterDiv = $("#lettera-" + currentLetter);
            letterDiv[0].innerHTML = "_";
            letterDiv[0].innerText = "_";
            letteraOk();

            errori = 0;

            ignoreTouches = false;
        }
    }
]);

myAppControllers.controller('PreLetturaController', [
    '$scope', '$routeParams',
    function ($scope, $routeParams) {

        function setSottotitolo()
        {
            var sottotitolo = $("#sottotitolo_prelettura")[0];
            var strSottotitolo = $STR_PRELETTURA;
            if ($routeParams.name === '01') {
                strSottotitolo = strSottotitolo  + ' - ' + $STR_01;
            }
            if ($routeParams.name === '02') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_02;
            }
            if ($routeParams.name === '03') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_03;
            }
            if ($routeParams.name === '04') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_04;
            }
            if ($routeParams.name === '05') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_05;
            }
            if ($routeParams.name === '06') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_06;
            }
            if ($routeParams.name === '07') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_07;
            }
            if ($routeParams.name === '08') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_08;
            }
            if ($routeParams.name === '09') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_09;
            }
            if ($routeParams.name === '10') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_10;
            }

            sottotitolo.innerHTML = strSottotitolo;
            sottotitolo.innerText = strSottotitolo;
        }
        setSottotitolo();

        hintToccaBottoneAscolta();

        $scope.name = $routeParams.name;

        $scope.parole = getParolePreLetturaPerLivello($routeParams.name);
        var currentParolaIndex = 0;
        $scope.parolaRandom = $scope.parole[currentParolaIndex];

        var audioRunning = false;
        var gameOver = false;

        $scope.playParolaPrelettura = function (parola)
        {
            if (audioRunning)
                return;
            audioRunning = true;

            // Get nuova parola
            if (gameOver)
            {
                gameOver = false,
                angular.element('#card_prelettura').addClass("hidden");

                // Loop through the words
                currentParolaIndex++;
                if (currentParolaIndex >= $scope.parole.length)
                    currentParolaIndex = 0;

                $scope.parolaRandom = $scope.parole[currentParolaIndex];
                $scope.$apply();
                setTimeout(function () { $scope.playParolaPrelettura(parola); }, 500);
            }

            var audioPlayer = getAudioPlayer('#audio-' + $scope.parolaRandom.completa + '-scandito');
            playAudio(audioPlayer);

            $('.parte-evidenziata').removeClass('parte-evidenziata');
            evidenziaPartiPrelettura();
        }

        var currentParte = 0;

        var delayForPrelettura = 1500;
        if ($routeParams.name === '01') {
            delayForPrelettura = 1500;
        }
        if ($routeParams.name === '02') {
            delayForPrelettura = 1500;
        }
        if ($routeParams.name === '03') {
            delayForPrelettura = 1500;
        }
        if ($routeParams.name === '04') {
            delayForPrelettura = 1500;
        }
        if ($routeParams.name === '05') {
            delayForPrelettura = 1500;
        }
        if ($routeParams.name === '06') {
            delayForPrelettura = 1500;
        }
        if ($routeParams.name === '07') {
            delayForPrelettura = 1500;
        }
        if ($routeParams.name === '08') {
            delayForPrelettura = 1500;
        }
        if ($routeParams.name === '09') {
            delayForPrelettura = 1500;
        }
        if ($routeParams.name === '10') {
            delayForPrelettura = 1500;
        }

        function evidenziaPartiPrelettura()
        {
            // Interrompo le chiamate ricorsive
            if (currentParte >= $scope.parolaRandom.parti.length)
            {
                // Reset and set flags
                audioRunning = false;
                currentParte = 0;
                gameOver = true;

                // Remove green highlight
                $('#card_prelettura').removeClass('hidden');

                // Play parola completa alla comparsa dell'immagine
                var audioPlayer = getAudioPlayer('#audio-' + $scope.parolaRandom.completa + '-completa');
                if (audioPlayer)
                    playAudio(audioPlayer);

                // Stop the recursive calls
                return;
            }

            var divElementId = "#parte-prelettura-" + currentParte;
            var divParte = $(divElementId);
            divParte.addClass('parte-evidenziata');
            currentParte++;

            setTimeout(function () { evidenziaPartiPrelettura(); }, delayForPrelettura);
        }
    }
]);

myAppControllers.controller('LetturaController', [
    '$scope', '$routeParams',
    function ($scope, $routeParams) {

        function setSottotitolo()
        {
            var sottotitolo = $("#sottotitolo_lettura")[0];
            var strSottotitolo = $STR_LETTURA;
            if ($routeParams.name === '01') {
                strSottotitolo = strSottotitolo  + ' - ' + $STR_01;
            }
            if ($routeParams.name === '02') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_02;
            }
            if ($routeParams.name === '03') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_03;
            }
            if ($routeParams.name === '04') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_04;
            }
            if ($routeParams.name === '05') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_05;
            }
            if ($routeParams.name === '06') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_06;
            }
            if ($routeParams.name === '07') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_07;
            }
            if ($routeParams.name === '08') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_08;
            }
            if ($routeParams.name === '09') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_09;
            }
            if ($routeParams.name === '10') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_10;
            }

            sottotitolo.innerHTML = strSottotitolo;
            sottotitolo.innerText = strSottotitolo;
        }
        setSottotitolo();

        hintToccaBottoneLeggi();

        $scope.name = $routeParams.name;

        $scope.parole = getParoleLetturaPerLivello($routeParams.name);
        var currentParolaIndex = 0;
        $scope.parolaRandom = $scope.parole[currentParolaIndex];
        var gameOver = false;

        $scope.playParolaLettura = function (parola)
        {
            if (audioRunning)
                return;
            audioRunning = true;

            // Get nuova parola
            if (gameOver) {
                gameOver = false,
                angular.element('#card_lettura').addClass("hidden");

                // Loop through the words
                currentParolaIndex++;
                if (currentParolaIndex >= $scope.parole.length)
                    currentParolaIndex = 0;

                $scope.parolaRandom = $scope.parole[currentParolaIndex];
                $scope.$apply();
                setTimeout(function () { $scope.playParolaLettura(parola); }, 500);
            }

            $('.parte-evidenziata').removeClass('parte-evidenziata');
            letturaPartiLettura();
        }

        $scope.playAudioParola = function (parola)
        {
            if (!canPlayAudio)
                return;

            currentParte = 0;
            audioRunning = false;
            var audioPlayer = getAudioPlayer('#audio-' + $scope.parolaRandom.completa);
            playAudio(audioPlayer);
            $('#card_lettura').removeClass('hidden');
            gameOver = true;
        }

        var currentParte = 0;
        var audioRunning = false;
        var canPlayAudio = false;

        function letturaPartiLettura() {
            // Interrompo le chiamate ricorsive
            if (currentParte >= $scope.parolaRandom.parti.length) {
                canPlayAudio = true;
                hintToccaIlBottone2();
                return;
            }

            var divElementId = "#parte-lettura-" + currentParte;
            var divParte = $(divElementId);
            divParte.addClass('parte-evidenziata');
            currentParte++;

            setTimeout(function () { letturaPartiLettura(); }, 2000);
        }
    }
]);

myAppControllers.controller('VerificaController', [
    '$scope', '$routeParams', '$timeout',
    function ($scope, $routeParams, $timeout) {

        function setSottotitolo()
        {
            var sottotitolo = $("#sottotitolo_verifica")[0];
            var strSottotitolo = $STR_VERIFICA;
            if ($routeParams.name === '01') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_01;
            }
            if ($routeParams.name === '02') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_02;
            }
            if ($routeParams.name === '03') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_03;
            }
            if ($routeParams.name === '04') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_04;
            }
            if ($routeParams.name === '05') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_05;
            }
            if ($routeParams.name === '06') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_06;
            }
            if ($routeParams.name === '07') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_07;
            }
            if ($routeParams.name === '08') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_08;
            }
            if ($routeParams.name === '09') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_09;
            }
            if ($routeParams.name === '10') {
                strSottotitolo = strSottotitolo + ' - ' + $STR_10;
            }

            sottotitolo.innerHTML = strSottotitolo;
            sottotitolo.innerText = strSottotitolo;
        }
        setSottotitolo();

        hintToccaBottoneAscolta();

        $scope.name = $routeParams.name;

        var paroleFiltrate = getParoleVerificaPerLivello($routeParams.name);
        $scope.parole = paroleFiltrate;
        var paroleRandom = [];
        var audioElem = getAudioPlayer();
        var suonoAscoltato = false;
        var lastImageShown;

        setCurrentParola();

        $scope.playSoundScrittura = function ()
        {
            clearSelection();
            suonoAscoltato = true;

            playAudio(audioElem);

            // suggerimento tocca la parola
            audioElem.onended = function () {
                $timeout(function () {
                    hintToccaLaParola();
                }, 700);
            };
            
            if (lastImageShown)
                lastImageShown.addClass("hidden");
        }

        $scope.checkSelection = function (parolaName)
        {
            if (!suonoAscoltato)
                return;

            var element = angular.element('#parola-' + parolaName + ' > .testo');

            if ($scope.currentParola.completa == parolaName)
            {
                rightAnswer(element);

                var imageElement = $("#carta-anteprima-" + $scope.currentParola.completa);
                imageElement.removeClass('hidden');
                lastImageShown = imageElement;

                setCurrentParola();
            }
            else
            {
                wrongAnswer(element);
            }
        }

        function rightAnswer(element) {
            element.addClass("bg-verde");
            playAudioVittoria();
            // Rimosso, andava in sovrapposizione all'hint successivo
            //setTimeout(function () { hintToccaBottoneAscolta(); }, 3000);
        }

        var errorsCount = 0;
        function wrongAnswer(element)
        {
            // TODO: dopo 2 errori mostrare soluzione e procedere 'ltra parola
            /*
            if (errorsCount >= 2)
            {
                errorsCount = 0;
                rightAnswer(element);
                return;
            }
            */

            errorsCount++;
            element.addClass("bg-rosso");
            playAudioNo();
        }

        function clearSelection() {
            suonoAscoltato = false;
            angular.element('.bg-rosso').removeClass("bg-rosso");
            angular.element('.bg-verde').removeClass("bg-verde");
        }

        function setCurrentParola() {
            if (paroleRandom.length == 0) {
                paroleRandom = shuffle(JSON.parse(JSON.stringify(paroleFiltrate)));
            }
            $scope.currentParola = paroleRandom.pop(0);

            audioElem.src = $scope.currentParola.audioParola;
            suonoAscoltato = false;
        }
    }
]);

myAppControllers.controller('MinuscoloPreScritturaController', [
    '$scope', '$routeParams',
    function ($scope, $routeParams) {

        var listenComplete = false;
        
        function setSottotitolo() {
            var sottotitolo = $("#sottotitolo_minuscoloprescrittura")[0];
            var strSottotitolo = $STR_MINUSCOLOPRESCRITTURA;
            sottotitolo.innerHTML = strSottotitolo;
            sottotitolo.innerText = strSottotitolo;
        }
        setSottotitolo();

        hintToccaBottoneLeggi();

        $scope.parole = $paroleMinuscolo;
        $scope.parolaRandom = getRandomElemento($scope.parole);

        var animationRunning = false;

        $scope.playParola = function (parola)
        {
            if (animationRunning)
                return;
            animationRunning = true;

            if (listenComplete)
                getNewParola();

            $('.parte-evidenziata').removeClass('parte-evidenziata');
            letturaPartiPrescrittura();
        }

        $scope.playSoundAfterAnimazioni = function()
        {
            if (!listenComplete)
                return;

            var audioPlayer = getAudioPlayer('#audio-' + $scope.parolaRandom.completa);
            playAudio(audioPlayer);
        }

        var currentParte = 0;

        function letturaPartiPrescrittura()
        {
            // Interrompo le chiamate ricorsive
            if (currentParte >= $scope.parolaRandom.parti.length) {
                animationRunning = false;
                currentParte = 0;
                listenComplete = true;
                hintToccaIlBottone2();
                return;
            }

            var divElementIdU = "#parte-u-" + currentParte;
            var divParteU = $(divElementIdU);
            divParteU.addClass('parte-evidenziata');
            var divElementIdL = "#parte-l-" + currentParte;
            var divParteL = $(divElementIdL);
            divParteL.addClass('parte-evidenziata');
            currentParte++;

            setTimeout(function () { letturaPartiPrescrittura(); }, 2000);
        }

        function getNewParola() 
        {
            $('.parte-evidenziata').removeClass('parte-evidenziata');
            $scope.parolaRandom = getRandomElemento($scope.parole);
            $scope.$apply();
        }
    }
]);

myAppControllers.controller('MinuscoloScritturaController', [
    '$scope', '$routeParams',
    function ($scope, $routeParams) {

        function setSottotitolo() {
            var sottotitolo = $("#sottotitolo_minuscoloscrittura")[0];
            var strSottotitolo = $STR_MINUSCOLOSCRITTURA;
            sottotitolo.innerHTML = strSottotitolo;
            sottotitolo.innerText = strSottotitolo;
        }
        setSottotitolo();

        hintToccaIlBottone();

        $scope.name = $routeParams.name;

        $scope.parole = $paroleMinuscoloScrittura;
        $scope.parolaRandom = getRandomElemento($scope.parole);

        $scope.playParola = function (parola)
        {
            if (gameOver)
            {
                gameOver = false;
                $scope.parolaRandom = getRandomElemento($scope.parole);
                $scope.$apply();
                for (var i = 0; i < $scope.parolaRandom.lettere.length; i++) {
                    var letterDiv = $("#lettera-l-" + i);
                    letterDiv[0].innerHTML = "_";
                    letterDiv[0].innerText = "_";
                }
                currentLetter = 0;
                setTimeout(function () {
                    $scope.playParola(parola);
                }, 500);
                return;
            }

            var audioPlayer = getAudioPlayer('#audio-' + parola.completa);
            playAudio(audioPlayer);
            if (currentLetter === 0)
                angular.element('#lettera-u-' + currentLetter).addClass("lettera_minuscoloscrittura_evidenziata");
        }

        var currentLetter = 0;
        var gameOver = false;
        var errori = 0;

        var ignoreTouches = false;
        $scope.letteraPremuta = function (lettera)
        {
            if (gameOver)
                return;

            if (ignoreTouches)
                return;

            if (lettera.toUpperCase() === $scope.parolaRandom.lettere[currentLetter])
            {
                letteraCorretta();
            }
            else
            {
                letteraErrata();
            }
        };

        function letteraCorretta()
        {
            var letterDiv = $("#lettera-l-" + currentLetter);
            letterDiv[0].innerHTML = $scope.parolaRandom.lettere[currentLetter].toUpperCase();
            letterDiv[0].innerText = $scope.parolaRandom.lettere[currentLetter].toUpperCase();

            currentLetter++;
            if (currentLetter >= $scope.parolaRandom.lettere.length)
            {
                gameOver = true;
                playAudioVittoria();
                angular.element('.lettera_minuscoloscrittura_evidenziata').removeClass("lettera_minuscoloscrittura_evidenziata");
                return;
            }
            else
            {
                angular.element('.lettera_minuscoloscrittura_evidenziata').removeClass("lettera_minuscoloscrittura_evidenziata");
                angular.element('#lettera-u-' + currentLetter).addClass("lettera_minuscoloscrittura_evidenziata");
            }

            playAudioBene();
            errori = 0;

            ignoreTouches = false;
        }

        function letteraErrata()
        {
            if (errori < 1)
            {
                playAudioNo();
                errori++;
                ignoreTouches = false;
            }
            else
            {
                playAudioNo();
                ignoreTouches = true;
                setTimeout(function () { letteraCorretta(); }, 2000);
            }
        }
    }
]);

myAppControllers.controller('GiocaController', [
    '$scope', '$routeParams', '$timeout',
    function ($scope, $routeParams, $timeout) {

        getAudioElementAndPlay('#audioGioca');

        $scope.playAudioHint = function (selector) {
            getAudioElementAndPlay(selector);
        }
    }
]);

myAppControllers.controller('GiocaParoleController', [
    '$scope', '$routeParams',
    function ($scope, $routeParams) {

        function setSottotitolo() {
            var sottotitolo = $("#sottotitolo_giocaparole")[0];
            var strSottotitolo = $STR_GIOCAPAROLE;
            sottotitolo.innerHTML = strSottotitolo;
            sottotitolo.innerText = strSottotitolo;
        }
        setSottotitolo();

        hintToccaIlBottone();

        $scope.name = $routeParams.name;

        var paroleRandom = shuffle(JSON.parse(JSON.stringify($paroleGiocaParole)));
        $scope.parolaRandom = paroleRandom.pop(0);
        var currentLetter = 0;
        var gameOver = false;
        var errori = 0;

        $scope.playParola = function (parola)
        {
            // Get nuova parola
            if (gameOver)
            {
                if (paroleRandom.length == 0) {
                    paroleRandom = shuffle(JSON.parse(JSON.stringify($paroleGiocaParole)));
                }
                $scope.parolaRandom = paroleRandom.pop(0);
                $scope.$apply();
                for (var i = 0; i < $scope.parolaRandom.lettere.length; i++) {
                    var letterDiv = $("#lettera-" + i);
                    letterDiv[0].innerHTML = "_";
                    letterDiv[0].innerText = "_";
                }
                currentLetter = 0;
                errori = 0;
                gameOver = false;
            }

            var audioPlayer = getAudioPlayer('#audio-' + parola.completa);
            playAudio(audioPlayer);
        }

        var ignoreTouches = false;
        $scope.letteraPremuta = function (lettera)
        {
            if (gameOver)
                return;

            if (ignoreTouches)
                return;

            if (lettera.toUpperCase() === $scope.parolaRandom.lettere[currentLetter]) {
                letteraCorretta();
            }
            else {
                letteraErrata();
            }
        }

        function letteraCorretta()
        {
            var letterDiv = $("#lettera-" + currentLetter);
            letterDiv[0].innerHTML = $scope.parolaRandom.lettere[currentLetter];
            letterDiv[0].innerText = $scope.parolaRandom.lettere[currentLetter];

            currentLetter++;
            if (currentLetter >= $scope.parolaRandom.lettere.length) {
                gameOver = true;
                if (errori <= 1)
                    playAudioVittoria();

                setTimeout(function () {
                    ignoreTouches = false;
                    hintToccaIlBottone();
                    $scope.playParola();
                }, 3000);
                return;
            }

            if (errori <= 1)
                playAudioBene();
            errori = 0;

            ignoreTouches = false;
        }

        function letteraErrata()
        {
            if (errori < 1) {
                playAudioNo();
                errori++;
            }
            else {
                playAudioNo();
                errori++;
                ignoreTouches = true;
                setTimeout(function () { letteraCorretta(); }, 2000);
            }
        }
    }
]);

myAppControllers.controller('GiocaSillabeController', [
    '$scope', '$routeParams',
    function ($scope, $routeParams) {

        function setSottotitolo() {
            var sottotitolo = $("#sottotitolo_giocasillabe")[0];
            var strSottotitolo = $STR_GIOCASILLABE;
            sottotitolo.innerHTML = strSottotitolo;
            sottotitolo.innerText = strSottotitolo;
        }
        setSottotitolo();

        hintToccaIlBottone();

        $scope.name = $routeParams.name;

        var paroleRandom = shuffle(JSON.parse(JSON.stringify($paroleGiocaSillabe)));
        $scope.parolaRandom = paroleRandom.pop(0);
        $scope.shuffledParti = shuffle(JSON.parse(JSON.stringify($scope.parolaRandom.parti)));
        var gameOver = false;
        var currentLettera = 0;
        var currentParte = 0;

        $scope.playParola = function (parola)
        {
            if (ignoreTouches)
                return;

            // Get nuova parola
            if (gameOver)
            {
                if (paroleRandom.length == 0) {
                    paroleRandom = shuffle(JSON.parse(JSON.stringify($paroleGiocaSillabe)));
                }
                $scope.parolaRandom = paroleRandom.pop(0);
                $scope.shuffledParti = shuffle(JSON.parse(JSON.stringify($scope.parolaRandom.parti)));
                $scope.$apply();
                gameOver = false;
                currentParte = 0;
                currentLettera = 0;
                for (var i = 0; i < $scope.parolaRandom.lettere.length; i++) {
                    var letterDiv = $("#lettera-" + i);
                    letterDiv[0].innerHTML = "_";
                    letterDiv[0].innerText = "_";
                }
            }

            var audioPlayer = getAudioPlayer('#audio-' + parola.completa);
            playAudio(audioPlayer);
        }

        var errore = false;
        var ignoreTouches = false;
        $scope.checkSillabaPressed = function (indexPressed)
        {
            if (ignoreTouches)
                return;

            var element = angular.element('#parte-' + indexPressed + ' > .testo');
            var choosen = $scope.shuffledParti[indexPressed];
            var wanted = $scope.parolaRandom.parti[currentParte];

            if (choosen.toUpperCase() == wanted.toUpperCase())
            {
                rightAnswer(element);

                playAudioBene();

                setTimeout(function () { clearSelection(); }, 500);

                ignoreTouches = false;

                currentParte++;
                if (currentParte >= $scope.parolaRandom.parti.length)
                {
                    ignoreTouches = true;
                    gameOver = true;
                    playAudioVittoria();
                    setTimeout(function () {
                        ignoreTouches = false;
                        hintToccaIlBottone();
                        $scope.playParola();
                    }, 3000);
                }

                errore = 0;
            }
            else 
            {
                wrongAnswer(element);
                errore++;

                playAudioNo();

                if (errore >= 2)
                {
                    ignoreTouches = true;

                    setTimeout(function () {
                        ignoreTouches = false;

                        // Duplicato codice di rightAnswer
                        var parte = $scope.parolaRandom.parti[currentParte];

                        for (var i = 0; i < parte.length; i++) {
                            var letterDiv = $("#lettera-" + currentLettera);
                            letterDiv[0].innerHTML = $scope.parolaRandom.lettere[currentLettera];
                            letterDiv[0].innerText = $scope.parolaRandom.lettere[currentLettera];
                            currentLettera++;
                        }

                        clearSelection();

                        currentParte++;
                        if (currentParte >= $scope.parolaRandom.parti.length) {
                            gameOver = true;
                            setTimeout(function () {
                                ignoreTouches = false;
                                hintToccaIlBottone();
                                $scope.playParola();
                            }, 3000);
                        }

                        errore = 0;
                    }, 2000);
                }
            }
        }

        function rightAnswer(element)
        {
            element.addClass("bg-verde");
            var parte = $scope.parolaRandom.parti[currentParte];

            for (var i = 0; i < parte.length; i++)
            {
                var letterDiv = $("#lettera-" + currentLettera);
                letterDiv[0].innerHTML = $scope.parolaRandom.lettere[currentLettera];
                letterDiv[0].innerText = $scope.parolaRandom.lettere[currentLettera];
                currentLettera++;
            }
        }

        function wrongAnswer(element)
        {
            element.addClass("bg-rosso");
        }

        function clearSelection()
        {
            suonoAscoltato = false;
            angular.element('.bg-rosso').removeClass("bg-rosso");
            angular.element('.bg-verde').removeClass("bg-verde");
        }
    }
]);

myAppControllers.controller('RandomController', [
    '$scope', '$routeParams',
    function ($scope, $routeParams) {

        function setSottotitolo() {
            var sottotitolo = $("#sottotitolo_random")[0];
            var strSottotitolo = $STR_RANDOM_MODE;
            sottotitolo.innerHTML = strSottotitolo;
            sottotitolo.innerText = strSottotitolo;
        }
        setSottotitolo();

        hintToccaIlBottone();

        $scope.name = $routeParams.name;

        $scope.parole = $paroleMinuscoloScrittura;
        $scope.parolaRandom = getRandomElemento($scope.parole);

        $scope.playParola = function (parola) {
            if (gameOver) {
                gameOver = false;
                $scope.parolaRandom = getRandomElemento($scope.parole);
                $scope.$apply();
                for (var i = 0; i < $scope.parolaRandom.lettere.length; i++) {
                    var letterDiv = $("#lettera-l-" + i);
                    letterDiv[0].innerHTML = "_";
                    letterDiv[0].innerText = "_";
                }
                currentLetter = 0;
                setTimeout(function () {
                    $scope.playParola(parola);
                }, 500);
                return;
            }

            var audioPlayer = getAudioPlayer('#audio-' + parola.completa);
            playAudio(audioPlayer);
            if (currentLetter === 0)
                angular.element('#lettera-u-' + currentLetter).addClass("lettera_minuscoloscrittura_evidenziata");
        }

        var currentLetter = 0;
        var gameOver = false;
        var errori = 0;

        var ignoreTouches = false;
        $scope.letteraPremuta = function (lettera) {
            if (gameOver)
                return;

            if (ignoreTouches)
                return;

            if (lettera.toUpperCase() === $scope.parolaRandom.lettere[currentLetter]) {
                letteraCorretta();
            }
            else {
                letteraErrata();
            }
        };

        function letteraCorretta() {
            var letterDiv = $("#lettera-l-" + currentLetter);
            letterDiv[0].innerHTML = $scope.parolaRandom.lettere[currentLetter].toUpperCase();
            letterDiv[0].innerText = $scope.parolaRandom.lettere[currentLetter].toUpperCase();

            currentLetter++;
            if (currentLetter >= $scope.parolaRandom.lettere.length) {
                gameOver = true;
                playAudioVittoria();
                angular.element('.lettera_minuscoloscrittura_evidenziata').removeClass("lettera_minuscoloscrittura_evidenziata");
                return;
            }
            else {
                angular.element('.lettera_minuscoloscrittura_evidenziata').removeClass("lettera_minuscoloscrittura_evidenziata");
                angular.element('#lettera-u-' + currentLetter).addClass("lettera_minuscoloscrittura_evidenziata");
            }

            playAudioBene();
            errori = 0;

            ignoreTouches = false;
        }

        function letteraErrata() {
            if (errori < 1) {
                playAudioNo();
                errori++;
                ignoreTouches = false;
            }
            else {
                playAudioNo();
                ignoreTouches = true;
                setTimeout(function () { letteraCorretta(); }, 2000);
            }
        }
    }
]);