$(document).ready(function() {

// Função para atualizar a assinatura gerada
    function updateGeneratedSignature() {
        var nome = $("#nomeInput").val();
        var setor = $("#setorInput").val();
        var funcao = $("#funcaoInput").val();
        var pa = $("#paInput").val();
        var uf = $("#ufInput").val();
        var ramal = $("#ramalInput").val();
        var telefone = $("#telefoneInput").val();
        var telefoneCorporativo = $("#telefoneCorporativoInput").val();
        var email = $("#emailInput").val();
        var cpa = [];
        $("input[name='cpa']:checked").each(function() {
            cpa.push($(this).val());
        });

        var imagensCPA = '';
        for (var i = 0; i < cpa.length; i++) {
            var cpaValue = cpa[i];
            if (cpaValue === "cpa10") {
                imagensCPA += '<img src="Imagens/cpa10.jpg" width="70" height="70">';
            } else if (cpaValue === "cpa20") {
                imagensCPA += '<img src="Imagens/cpa20.jpg" width="70" height="70">';
            } else if (cpaValue === "cea") {
                imagensCPA += '<img src="Imagens/cea.jpg" width="70" height="70">';
            } else if (cpaValue === "CPCS100") {
                imagensCPA += '<img src="Imagens/CPC S100.png" width="180" height="70">';
            }
        }

	// Verifica se o PA é '88' e ajusta o valor
    	var paDisplay = pa.toString() === "88" ? "Uad" : pa;

        var signature = '<p class="signature-title">' + nome + '</p>';
			signature += '<p class="signature-paragraph">' + setor + ' | ' + funcao + '</p>';
			signature += '<p class="signature-paragraph"><img src="Imagens/5024.png" width="350" height="70"> ' + imagensCPA + '</p>';
			signature += '<p class="signature-paragraph">Email: <a href="mailto:' + email + '">' + email + '</a></p>';
			signature += '<p class="signature-paragraph">Telefone: ' + telefone;

// Adiciona o ramal se existir
		if (ramal !== "") {
			signature += ' | Ramal: ' + ramal;
		}
			signature += '</p>';

// Adiciona o telefone corporativo se existir
		if (telefoneCorporativo.trim() !== "") {
			signature += '<p class="signature-paragraph">Telefone Corporativo: ' + telefoneCorporativo + '</p>';
		}
			signature += '<p class="signature-paragraph" style="font-weight: bold;">Sicoob UniCentro Norte Brasileiro - PA: ' + paDisplay + ' - ' + uf.toUpperCase() + '</p>';

			$("#generatedSignature").html(signature);
			checkRequiredFields();
    }
	
// Atualiza a assinatura gerada quando houver mudanças nos campos do formulário
	 $('#assinaturaForm input, #assinaturaForm select').on('input', function() {
        updateGeneratedSignature();
    });

// Função para deixar o e-mail em caixa baixa e validar sua entrada
    function transformAndValidateEmail() {
        var emailInput = document.getElementById('emailInput');
        var emailValidationMessage = document.getElementById('emailValidationMessage');

        emailInput.addEventListener('input', function() {
            var email = emailInput.value;
            var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(email)) {
                emailValidationMessage.textContent = 'Por favor, insira um endereço de e-mail válido.';
                $("#copySignatureButton").prop("disabled", true);
            } else {
                emailValidationMessage.textContent = '';
                $("#copySignatureButton").prop("disabled", false);
            }
        });

// Impedir a colagem se o e-mail não estiver no formato correto
        emailInput.addEventListener('paste', function(event) {
            var email = emailInput.value;
            var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regex.test(email)) {
                event.preventDefault();
                alert("Por favor, insira um endereço de e-mail válido.");
            }
        });
    }
    transformAndValidateEmail();

// Função para copiar a assinatura gerada
    $("#copySignatureButton").click(function() {
        if (checkRequiredFields()) {
            var email = $("#emailInput").val();
            var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (regex.test(email)) {
                var range = document.createRange();
                var assinaturaDiv = document.getElementById("generatedSignature");
                range.selectNode(assinaturaDiv);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
                document.execCommand("copy");
                window.getSelection().removeAllRanges();
                alert("Assinatura copiada para a área de transferência!");
            } else {
                alert("Por favor, insira um endereço de e-mail válido antes de copiar a assinatura.");
            }
        } else {
            alert("Por favor, preencha todos os campos obrigatórios antes de copiar a assinatura.");
        }
    });
	
function formatarTelefone(phoneInput) {
    var phone = phoneInput.val().replace(/\D/g, ""); // Remove todos os caracteres não numéricos

    // Lista de DDDs que têm o zero à frente e precisam removê-lo
    var dddsComZero = [
        "061", "062", "064", "065", "066", "067", // Centro-Oeste
        "082", "071", "073", "074", "075", "077", "085", "088", "098", "099", "083", "081", "087", "086", "089", "084", "079", // Nordeste
        "068", "096", "092", "097", "091", "093", "094", "069", "095", "063", // Norte
        "027", "028", "031", "032", "033", "034", "035", "037", "038", "021", "022", "024", "011", "012", "013", "014", "015", "016", "017", "018", "019", // Sudeste
        "041", "042", "043", "044", "045", "046", "051", "053", "054", "055", "047", "048", "049" // Sul
    ];

    // Verifica se o número começa com um DDD que está na lista e remove o zero inicial
    var ddd = phone.substring(0, 3);
    if (dddsComZero.includes(ddd)) {
        phone = phone.substring(1); // Remove o 0 inicial para DDDs que possuem o zero
    }

    if (phone.startsWith("0800")) {
        // Formatação específica para números 0800
        if (phone.length <= 4) {
            phoneInput.val(phone); // Apenas "0800"
        } else if (phone.length <= 7) {
            phoneInput.val(phone.substring(0, 4) + " " + phone.substring(4)); // "0800 123"
        } else if (phone.length <= 11) {
            phoneInput.val(phone.substring(0, 4) + " " + phone.substring(4, 7) + " " + phone.substring(7)); // "0800 123 4567"
        } else {
            // Limita a 11 dígitos no total
            phoneInput.val(phone.substring(0, 4) + " " + phone.substring(4, 7) + " " + phone.substring(7, 11)); // "0800 123 4567"
        }
    } else {
        // Formatação padrão para outros números
        if (phone.length <= 2) {
            phoneInput.val("(" + phone); // Apenas DDD inicial
        } else if (phone.length <= 6) {
            phoneInput.val("(" + phone.substring(0, 2) + ") " + phone.substring(2)); // Formato parcial com 2 dígitos de DDD
        } else if (phone.length === 10) {
            // Formato para números com 10 dígitos
            phoneInput.val("(" + phone.substring(0, 2) + ") " + phone.substring(2, 6) + "-" + phone.substring(6));
        } else if (phone.length === 11) {
            // Formato para números com 11 dígitos
            phoneInput.val("(" + phone.substring(0, 2) + ") " + phone.substring(2, 7) + "-" + phone.substring(7));
        } else if (phone.length > 11) {
            // Limita a 11 dígitos se mais do que 11 são digitados
            phoneInput.val("(" + phone.substring(0, 2) + ") " + phone.substring(2, 7) + "-" + phone.substring(7, 11));
        }
    }

    // Permite a remoção dos parênteses e hífen ao apagar
    var currentVal = phoneInput.val();
    if (currentVal.length > 0 && (currentVal[currentVal.length - 1] === ')' || currentVal[currentVal.length - 1] === '(' || currentVal[currentVal.length - 1] === '-')) {
        phoneInput.val(currentVal.substring(0, currentVal.length - 1)); // Remove parênteses e hífen
    }
}

	// Aplicar a função aos inputs de telefone e telefone corporativo
		$("#telefoneInput, #telefoneCorporativoInput").on("input", function() {
			formatarTelefone($(this));
			updateGeneratedSignature(); // Atualiza a assinatura quando o telefone é formatado
		});

	// Atualiza a assinatura gerada quando houver mudanças nos campos do formulário
		$('#assinaturaForm input, #assinaturaForm select').on('input', function() {
			updateGeneratedSignature();
		});

// Função para verificar campos obrigatórios
    function checkRequiredFields() {
        var isValid = true;
        $('#assinaturaForm input[required], #assinaturaForm select[required]').each(function() {
            if ($(this).val() === '') {
                isValid = false;
                return false;
            }
        });
        if (isValid) {
            $("#copySignatureButton").prop("disabled", false);
        } else {
            $("#copySignatureButton").prop("disabled", true);
        }
        return isValid;
    }
});

// Função para formatar apenas a primeira letra dos campos.
	function formatarPrimeiraLetra(inputId) {
		var input = document.getElementById(inputId);
		var valor = input.value.split(" ");

		for (var i = 0; i < valor.length; i++) {
			if (/^[A-Z]+$/.test(valor[i])) {
				valor[i] = valor[i].toUpperCase();
			} else {
				if (i === 0 || valor[i].length > 2) {
					valor[i] = valor[i].charAt(0).toUpperCase() + valor[i].slice(1);
				}
			}
		}
		input.value = valor.join(" ");
	}