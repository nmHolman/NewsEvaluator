function updateLayout() {
    if (document.getElementById('results').style.visibility == 'hidden' || document.getElementById('results').style.visibility == '') {
        console.log('This should show results');

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
}



function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('submission').value;

    Client.postData('http://localhost:8080/add', formText);


    console.log("::: Form Submitted :::")
    fetch('http://localhost:8080/sentiment')
        .then(res => res.json())
        .then(function (res) {
            document.getElementById('subjectivity').innerHTML = res.subjectivity;
            document.getElementById('agreement').innerHTML = res.agreement;

            let sub = [];

            res.sentence_list.forEach(s => {
                let sText = s.text;
                if (s.score_tag == 'P+') {
                    console.log(sub);
                    sub.push(`<span class='strongPos'>${sText}</span>`);
                } else if (s.score_tag == 'P') {
                    sub.push(`<span class='pos'>${sText}</span>`);
                } else if (s.score_tag == 'NEU') {
                    sub.push(`<span class='neu'>${sText}</span>`);
                } else if (s.score_tag == 'N') {
                    sub.push(`<span class='neg'>${sText}</span>`);
                } else if (s.score_tag == 'N+') {
                    sub.push(`<span class='strongNeg'>${sText}</span>`);
                } else {
                    sub.push(sText);
                }
            });

            let fullText = sub.join(' ');

            document.getElementById('submittedText').innerHTML = `<strong>${fullText}</strong>`;

            updateLayout();
            console.log(res);
        })
}

export {
    handleSubmit,
    updateLayout
}