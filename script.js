$(document).ready(function() {
    $("#assinaturaForm").submit(function(event) {
      event.preventDefault();

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
      
      //Modelo da assinatura Gerada
      var signature = '<p class="signature-title">' + nome + '</p>';
      signature += '<p class="signature-paragraph">' + setor + ' | ' + funcao + '</p>';
      signature += '<pclass="signature-paragraph"><img src="http://unisicoob.com.br/assinatura/imagem/5024.png" width="350" height="70"> ' + imagensCPA + '</p>';
      signature += '<p class="signature-paragraph">Email: <a href="mailto:' + email + '">' + email + '</a></p>';
      signature += '<p class="signature-paragraph">Telefone: ' + telefone;
        if (telefoneCorporativo !== "") {
            signature += ' | Telefone Corporativo: ' + telefoneCorporativo;
        }
        if (ramal !== "") {
            signature += ' | Ramal: ' + ramal;
        }
            signature += '</p>';
      signature += '<p class="signature-paragraph"; style="font-weight: bold;">Sicoob UniCentro Norte Brasileiro - PA: ' + pa + ' - ' + uf.toUpperCase() + '</p>';


      $("#generatedSignature").html(signature);
    });

    //Função para deixar em caixa baixo o email
    function transformToLowerCase(inputId) {
        const emailInput = document.getElementById(inputId);

        emailInput.addEventListener("input", function() {
            const start = this.selectionStart;
            const end = this.selectionEnd;
            this.value = this.value.toLowerCase();
            this.setSelectionRange(start, end);
        });
    }

    // Chame a função com o ID do campo de entrada desejado
    transformToLowerCase("emailInput");
  
    // Função para copiar a assinatura gerada
    $("#copySignatureButton").click(function() {
      var range = document.createRange();
      var assinaturaDiv = document.getElementById("generatedSignature");
      range.selectNode(assinaturaDiv);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      alert("Assinatura copiada para a área de transferência!");
    });

    // Regra telefone Fixo
    $("#telefoneInput").on("input", function() {
      var phoneInput = $(this);
      var phone = phoneInput.val().replace(/\D/g, ""); // Remove non-digit characters

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
    });

    // Regra telefone corporativo
    $("#telefoneCorporativoInput").on("input", function() {
      var phoneInput = $(this);
      var phone = phoneInput.val().replace(/\D/g, ""); // Remove non-digit characters

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
    });
  });

  function formatarNomesProprios() {
    var nomeInput = document.getElementById("nomeInput");
    var nome = nomeInput.value.toLowerCase().split(" ");

    for (var i = 0; i < nome.length; i++) {
      if (i === 0 || nome[i].length > 2) {
        nome[i] = nome[i].charAt(0).toUpperCase() + nome[i].slice(1);
      }
    }

    nomeInput.value = nome.join(" ");
  }
