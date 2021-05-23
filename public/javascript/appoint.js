function newtab(id) {
    if (id == "0") {
        document.getElementById('0').className = "active";
        document.getElementById('1').className = "";
        document.getElementById("nMfOyStPrXdWcNfH").style.display = 'block';
        document.getElementById("ePvFrNcCkWqOsRrW").style.display = 'none';
    }
    else {
        document.getElementById('0').className = "";
        document.getElementById('1').className = "active";
        document.getElementById("nMfOyStPrXdWcNfH").style.display = 'none';
        document.getElementById("ePvFrNcCkWqOsRrW").style.display = 'block';
    }
}