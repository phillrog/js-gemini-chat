function openChatBox() {
    var x = document.getElementById("box");
    if (x.classList.contains('open')) {
      x.classList.remove("open");
    } else {
      x.classList.add("open");
      document.getElementById("user-input").focus();
    }
  }