function newtab(id) {
  if (id === '0') {
    document.getElementById('0').className = 'active il-link';
    document.getElementById('1').className = 'il-link';
    document.getElementById('nMfOyStPrXdWcNfH').style.display = 'block';
    document.getElementById('ePvFrNcCkWqOsRrW').style.display = 'none';
  } else {
    document.getElementById('0').className = 'il-link';
    document.getElementById('1').className = 'active il-link';
    document.getElementById('nMfOyStPrXdWcNfH').style.display = 'none';
    document.getElementById('ePvFrNcCkWqOsRrW').style.display = 'block';
  }
}
