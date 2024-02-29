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
                imagensCPA += '<img src="http://unisicoob.com.br/assinatura/imagem/cpa10.jpg" width="70" height="70">';
            } else if (cpaValue === "cpa20") {
                imagensCPA += '<img src="http://unisicoob.com.br/assinatura/imagem/cpa20.jpg" width="70" height="70">';
            } else if (cpaValue === "cea") {
                imagensCPA += '<img src="http://unisicoob.com.br/assinatura/imagem/cea.jpg" width="70" height="70">';
            } else if (cpaValue === "CPCS100") {
                imagensCPA += '<img src="Imagens/CPC S100.png" width="180" height="70">';
            }
        }

        var signature = '<p class="signature-title">' + nome + '</p>';
			signature += '<p class="signature-paragraph">' + setor + ' | ' + funcao + '</p>';
			signature += '<p class="signature-paragraph"><img src="http://unisicoob.com.br/assinatura/imagem/5024.png" width="350" height="70"> ' + imagensCPA + '</p>';
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
			signature += '<p class="signature-paragraph" style="font-weight: bold;">Sicoob UniCentro Norte Brasileiro - PA: ' + pa + ' - ' + uf.toUpperCase() + '</p>';

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

// Função para formatar telefones
	function formatarTelefone(phoneInput) {
		var phone = phoneInput.val().replace(/\D/g, "");

		if (phone.length === 0) {
			phoneInput.val("");
		} else if (phone.length <= 2) {
			phoneInput.val("(" + phone);
		} else if (phone.length <= 6) {
			phoneInput.val("(" + phone.substring(0, 2) + ") " + phone.substring(2));
		} else if (phone.length <= 10) {
			phoneInput.val("(" + phone.substring(0, 2) + ") " + phone.substring(2, 6) + "-" + phone.substring(6));
		} else {
			phoneInput.val("(" + phone.substring(0, 2) + ") " + phone.substring(2, 7) + "-" + phone.substring(7, 11));
		}
	}

// Aplicar a função aos inputs de telefone e telefone corporativo
	$("#telefoneInput, #telefoneCorporativoInput").on("input", function() {
		formatarTelefone($(this));
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