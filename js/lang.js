function toggleLanguageMenu() {
    var menu = document.getElementById("language-menu");
    if (menu.style.display === "block") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}

function changeLanguage(language) {
    const currentPath = window.location.pathname; // e.g. /blender.html or /en-translation/en-blender.html
    const fileName = currentPath.split("/").pop(); // e.g. blender.html
    const baseName = fileName.replace(/^((en|hy)-)?/, "").replace(".html", ""); // e.g. blender
  
    let newFile = "";
  
    if (language === "ru") {
      newFile = "./" + baseName + ".html";
      document.getElementById("current-flag").src = "../Assets/ru_rounded_flag.png";
      document.getElementById("current-language").textContent = "русский";
    } else if (language === "en") {
      newFile = "./en-" + baseName + ".html";
      document.getElementById("current-flag").src = "../Assets/gb_rounded_flag.png";
      document.getElementById("current-language").textContent = "English";
    } else if (language === "hy") {
      newFile = "./hy-" + baseName + ".html";
      document.getElementById("current-flag").src = "../Assets/hy_rounded_flag.png";
      document.getElementById("current-language").textContent = "Հայերեն";
    }
  
    toggleLanguageMenu(); // закрыть меню
    window.location.href = newFile;
  }
  