function updateLayout() {
    if (document.getElementById('results').style.visibility == 'hidden' || document.getElementById('results').style.visibility == '') {
        document.getElementById('submission').value = '';
        document.getElementById('results').style.visibility = 'visible';
        document.getElementById('form').style.cssText = 'padding:0px 0px; border: none;';
        document.getElementById('submission').style.display = 'none';
        document.getElementById('button').style.display = 'none';
        document.getElementById('return').style.display = 'block';
    } else {
        document.getElementById('results').style.visibility = 'hidden';
        document.getElementById('form').style.cssText = '';
        document.getElementById('submission').style.display = 'block';
        document.getElementById('button').style.display = 'block';
        document.getElementById('return').style.display = 'none';
    }
    return 'Layout updated'
}

export {
    updateLayout
}