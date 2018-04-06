$(document).ready(function() {
  var notas = [];

  /*let updateList = () => {
    console.log("[APP] start watch.");

    Array.observe(notas, function(changes) {
      let index = null;
      let value = "";
      let status = null;
    });
  };*/

  $("body").on("click", ".btnAddNota", function(event) {
    event.preventDefault();
    let nota = $("#nota").val();
    if (nota != "") {
      $("#listaNotas").append(
        `<li data-value="${nota}">${nota} <span class="btnRemove">remover</span></li>`
      );
      $("#nota").val("");
      notas.push(nota);
    } else {
      alert("Informe uma nota.");
    }
  });

  //updateList();

  $("body").on("click", ".btnRemove", function(event) {
    event.preventDefault();
    if (confirm("Deseja mesmo apagar esta nota?")) {
      let item = $(this).parents("li");
      notas.splice(item.index(), 1);
      $(this)
        .parents("li")
        .remove();
    }
  });
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./service-worker.js")
    .then(function(reg) {
      console.log("Service Worker Registered");
    })
    .catch(function(error) {
      console.log("erro: ", error);
    });
}
